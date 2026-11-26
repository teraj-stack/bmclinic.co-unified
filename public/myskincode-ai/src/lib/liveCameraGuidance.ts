import { assessPhotoQualityFromImageData } from "/myskincode-ai/src/lib/photoQuality.ts";
import { POSE_THRESHOLDS } from "/myskincode-ai/src/lib/mediapipeFaceLandmarker.ts";
import { detectCosmeticsOnImage } from "/myskincode-ai/src/lib/cosmeticsDetection.ts";
export function estimateColorTemperatureKelvin(red, green, blue) {
	if (!Number.isFinite(red) || !Number.isFinite(green) || !Number.isFinite(blue)) {
		return null;
	}
	const sum8 = red + green + blue;
	if (sum8 < 30) return null;
	if (sum8 > 740) return null;
	const linearize = (c) => {
		const normalized = c / 255;
		return normalized <= .04045 ? normalized / 12.92 : Math.pow((normalized + .055) / 1.055, 2.4);
	};
	const rl = linearize(red);
	const gl = linearize(green);
	const bl = linearize(blue);
	const X = .4124564 * rl + .3575761 * gl + .1804375 * bl;
	const Y = .2126729 * rl + .7151522 * gl + .072175 * bl;
	const Z = .0193339 * rl + .119192 * gl + .9503041 * bl;
	const total = X + Y + Z;
	if (total < 1e-6) return null;
	const x = X / total;
	const y = Y / total;
	const denominator = .1858 - y;
	if (Math.abs(denominator) < 1e-4) return null;
	const n = (x - .332) / denominator;
	const cct = 437 * n * n * n + 3601 * n * n + 6861 * n + 5514.31;
	if (!Number.isFinite(cct)) return null;
	if (cct < 1500 || cct > 12e3) return null;
	return Math.round(cct);
}
export function describeColorTemperature(kelvin) {
	if (kelvin === null) return "nieokreślona";
	if (kelvin < 2700) return "bardzo ciepła";
	if (kelvin < 3500) return "ciepła";
	if (kelvin < 4500) return "lekko ciepła";
	if (kelvin <= 6500) return "dzienna";
	if (kelvin <= 7500) return "lekko chłodna";
	if (kelvin <= 9e3) return "chłodna";
	return "bardzo chłodna";
}
export const CLINICAL_CCT_RANGE = [5e3, 6800];
export const AUTO_CAPTURE_DELAY_MS = 2e3;
export const COLOR_CARD_CONFIRMATION_HOLD_MS = AUTO_CAPTURE_DELAY_MS;
const AUTO_CAPTURE_POSITION_DELTA = .028;
const AUTO_CAPTURE_COVERAGE_DELTA = .03;
const COLOR_CARD_POSITION_DELTA = .03;
const COLOR_CARD_SIZE_DELTA = .03;
export function createAutoCaptureTracker() {
	return {
		stableSince: null,
		snapshot: null
	};
}
export function createColorCardStabilityTracker() {
	return {
		stableSince: null,
		snapshot: null
	};
}
function clamp(value, min, max) {
	return Math.min(max, Math.max(min, value));
}
function round(value, precision = 2) {
	const factor = 10 ** precision;
	return Math.round(value * factor) / factor;
}
function scoreFromStatus(status) {
	if (status === "ready") return 100;
	if (status === "warning") return 64;
	return 24;
}
function labelFromStatus(status) {
	if (status === "ready") return "Kadr gotowy";
	if (status === "warning") return "Prawie gotowe";
	return "Wymaga korekty";
}
const MIN_FACE_COVERAGE = .02;
function isLikelySkinPixel(red, green, blue) {
	const max = Math.max(red, green, blue);
	const min = Math.min(red, green, blue);
	const rgbGate = red > 60 && green > 35 && blue > 20 && red > green && red > blue && max - min > 20;
	const cb = 128 - .168736 * red - .331264 * green + .5 * blue;
	const cr = 128 + .5 * red - .418688 * green - .081312 * blue;
	return rgbGate && cb >= 77 && cb <= 127 && cr >= 133 && cr <= 173;
}
function pixelLuma(red, green, blue) {
	return .2126 * red + .7152 * green + .0722 * blue;
}
function colorDistance(left, right) {
	const deltaRed = left.red - right.red;
	const deltaGreen = left.green - right.green;
	const deltaBlue = left.blue - right.blue;
	return Math.sqrt(deltaRed * deltaRed + deltaGreen * deltaGreen + deltaBlue * deltaBlue);
}
function resolveHueBucket(red, green, blue) {
	const max = Math.max(red, green, blue);
	const min = Math.min(red, green, blue);
	const delta = max - min;
	if (delta < 18) return null;
	let hue = 0;
	if (max === red) {
		hue = (green - blue) / delta % 6;
	} else if (max === green) {
		hue = (blue - red) / delta + 2;
	} else {
		hue = (red - green) / delta + 4;
	}
	const normalizedHue = (hue * 60 + 360) % 360;
	return Math.floor(normalizedHue / 60);
}
function analyzeColorCardCandidate(imageData, startX, startY, regionWidth, regionHeight) {
	const x1 = clamp(Math.floor(startX), 0, imageData.width);
	const y1 = clamp(Math.floor(startY), 0, imageData.height);
	const x2 = clamp(Math.ceil(startX + regionWidth), 0, imageData.width);
	const y2 = clamp(Math.ceil(startY + regionHeight), 0, imageData.height);
	const segmentCount = 6;
	const segmentSums = Array.from({ length: segmentCount }, () => ({
		red: 0,
		green: 0,
		blue: 0,
		count: 0
	}));
	const hueBuckets = new Set();
	let totalPixels = 0;
	let saturatedPixels = 0;
	let neutralPixels = 0;
	const safeWidth = Math.max(1, x2 - x1);
	for (let y = y1; y < y2; y += 1) {
		for (let x = x1; x < x2; x += 1) {
			const offset = (y * imageData.width + x) * 4;
			const red = imageData.data[offset] ?? 0;
			const green = imageData.data[offset + 1] ?? 0;
			const blue = imageData.data[offset + 2] ?? 0;
			const luma = pixelLuma(red, green, blue);
			const saturation = Math.max(red, green, blue) - Math.min(red, green, blue);
			const segmentIndex = Math.min(segmentCount - 1, Math.floor((x - x1) / safeWidth * segmentCount));
			const segment = segmentSums[segmentIndex];
			segment.red += red;
			segment.green += green;
			segment.blue += blue;
			segment.count += 1;
			if (saturation >= 18 && luma >= 28 && luma <= 240) {
				saturatedPixels += 1;
			}
			if (saturation <= 16 && luma >= 40 && luma <= 225) {
				neutralPixels += 1;
			}
			const hueBucket = resolveHueBucket(red, green, blue);
			if (hueBucket !== null) {
				hueBuckets.add(hueBucket);
			}
			totalPixels += 1;
		}
	}
	let transitionCount = 0;
	let transitionStrength = 0;
	let transitionSamples = 0;
	for (let index = 0; index < segmentSums.length - 1; index += 1) {
		const current = segmentSums[index];
		const next = segmentSums[index + 1];
		if (current.count === 0 || next.count === 0) continue;
		const currentMean = {
			red: current.red / current.count,
			green: current.green / current.count,
			blue: current.blue / current.count
		};
		const nextMean = {
			red: next.red / next.count,
			green: next.green / next.count,
			blue: next.blue / next.count
		};
		const difference = colorDistance(currentMean, nextMean);
		if (difference >= 24) {
			transitionCount += 1;
		}
		transitionStrength += difference;
		transitionSamples += 1;
	}
	return {
		bucketCount: hueBuckets.size,
		transitionCount,
		saturatedShare: totalPixels > 0 ? saturatedPixels / totalPixels : 0,
		neutralShare: totalPixels > 0 ? neutralPixels / totalPixels : 0,
		contrast: transitionSamples > 0 ? transitionStrength / transitionSamples : 0
	};
}
function buildColorCardDetection(imageData, faceSignal) {
	if (!faceSignal.detected || faceSignal.faceBounds === null) {
		return {
			status: "blocked",
			score: 0,
			detected: false,
			label: "MySkinCode Color Card",
			value: "Najpierw ustaw twarz",
			summary: "Wskaźnik karty kalibracyjnej pojawi się, gdy twarz będzie czytelnie widoczna w kadrze.",
			message: "Najpierw ustaw twarz centralnie, a potem pokaż kartę pod brodą.",
			alignment: 0,
			paletteVariety: 0,
			contrastPattern: 0,
			bounds: null
		};
	}
	const faceLeft = faceSignal.faceBounds.left * imageData.width;
	const faceTop = faceSignal.faceBounds.top * imageData.height;
	const faceWidth = faceSignal.faceBounds.width * imageData.width;
	const faceHeight = faceSignal.faceBounds.height * imageData.height;
	const faceCenterX = faceLeft + faceWidth / 2;
	const jawAnchorY = faceTop + faceHeight * .82;
	const regionWidth = clamp(Math.round(faceWidth * .74), 18, Math.round(imageData.width * .76));
	const regionHeight = clamp(Math.round(faceHeight * .2), 12, Math.round(imageData.height * .22));
	const idealTop = jawAnchorY + faceHeight * .14;
	const xOffsets = [
		-.16,
		-.08,
		0,
		.08,
		.16
	];
	const yOffsets = [
		-.04,
		.02,
		.08,
		.14,
		.2
	];
	let bestCandidate = null;
	for (const xOffset of xOffsets) {
		for (const yOffset of yOffsets) {
			const left = clamp(Math.round(faceCenterX - regionWidth / 2 + xOffset * faceWidth), 0, Math.max(0, imageData.width - regionWidth));
			const top = clamp(Math.round(jawAnchorY + yOffset * faceHeight), 0, Math.max(0, imageData.height - regionHeight));
			const metrics = analyzeColorCardCandidate(imageData, left, top, regionWidth, regionHeight);
			const centerAlignment = 1 - Math.min(Math.abs(left + regionWidth / 2 - faceCenterX) / Math.max(faceWidth * .48, 1), 1);
			const verticalAlignment = 1 - Math.min(Math.abs(top - idealTop) / Math.max(faceHeight * .18, 1), 1);
			const alignment = clamp(centerAlignment * .62 + verticalAlignment * .38, 0, 1);
			const paletteVariety = clamp((metrics.bucketCount - 1) / 3, 0, 1);
			const transitionPattern = clamp(metrics.transitionCount / 4, 0, 1);
			const saturationBalance = 1 - Math.min(Math.abs(metrics.saturatedShare - .42) / .42, 1);
			const neutralBalance = 1 - Math.min(Math.abs(metrics.neutralShare - .24) / .24, 1);
			const contrastPattern = clamp(metrics.contrast / 42, 0, 1);
			const score = Math.round((paletteVariety * .28 + transitionPattern * .22 + saturationBalance * .16 + neutralBalance * .12 + contrastPattern * .12 + alignment * .1) * 100);
			if (!bestCandidate || score > bestCandidate.score) {
				bestCandidate = {
					score,
					alignment,
					paletteVariety,
					contrastPattern,
					bucketCount: metrics.bucketCount,
					transitionCount: metrics.transitionCount,
					saturatedShare: metrics.saturatedShare,
					neutralShare: metrics.neutralShare,
					bounds: {
						left: left / imageData.width,
						top: top / imageData.height,
						width: regionWidth / imageData.width,
						height: regionHeight / imageData.height
					}
				};
			}
		}
	}
	if (!bestCandidate) {
		return {
			status: "blocked",
			score: 0,
			detected: false,
			label: "MySkinCode Color Card",
			value: "Karta niewidoczna",
			summary: "Nie udało się ocenić położenia karty kalibracyjnej w tym kadrze.",
			message: "Pokaż kartę wyraźnie pod brodą i skieruj ją przodem do aparatu.",
			alignment: 0,
			paletteVariety: 0,
			contrastPattern: 0,
			bounds: null
		};
	}
	const status = bestCandidate.score >= 78 ? "ready" : bestCandidate.score >= 48 ? "warning" : "blocked";
	const detected = bestCandidate.score >= 48;
	const value = status === "ready" ? "Karta wykryta stabilnie" : status === "warning" ? "Karta częściowo widoczna" : "Karta niewidoczna";
	const summary = status === "ready" ? "MySkinCode Color Card jest czytelnie widoczna pod brodą i może pełnić rolę referencji kolorystycznej." : status === "warning" ? "Widać część MySkinCode Color Card, ale jej pozycja lub czytelność może być za słaba do pełnej kalibracji." : "Nie widzę wystarczająco czytelnej MySkinCode Color Card pod brodą, więc kalibracja koloru będzie mniej wiarygodna.";
	let message = "Utrzymaj kartę nieruchomo i równolegle do linii żuchwy podczas wykonywania zdjęcia.";
	if (!detected) {
		message = "Pokaż kartę wyraźnie pod brodą i skieruj ją przodem do aparatu.";
	} else if (bestCandidate.alignment < .55) {
		message = "Przesuń kartę bliżej środka pod brodą, aby algorytm mógł lepiej uchwycić referencję kolorystyczną.";
	} else if (bestCandidate.bucketCount < 3 || bestCandidate.transitionCount < 2) {
		message = "Pokaż cały przód karty i nie zasłaniaj pól barwnych palcami ani cieniem pod brodą.";
	} else if (bestCandidate.saturatedShare < .18 || bestCandidate.contrastPattern < .34) {
		message = "Przechyl kartę delikatnie do światła, aby kolorowe pola były czytelniejsze dla kamery.";
	} else if (status === "ready") {
		message = "Karta wygląda dobrze — możesz utrzymać ją w tym miejscu podczas zdjęcia referencyjnego.";
	}
	return {
		status,
		score: bestCandidate.score,
		detected,
		label: "MySkinCode Color Card",
		value,
		summary,
		message,
		alignment: Math.round(bestCandidate.alignment * 100),
		paletteVariety: Math.round(bestCandidate.paletteVariety * 100),
		contrastPattern: Math.round(bestCandidate.contrastPattern * 100),
		bounds: {
			left: round(bestCandidate.bounds.left, 3),
			top: round(bestCandidate.bounds.top, 3),
			width: round(bestCandidate.bounds.width, 3),
			height: round(bestCandidate.bounds.height, 3)
		}
	};
}
function sampleMeanColor(imageData, startX, endX, startY, endY, preferSkin = false) {
	const x1 = clamp(Math.floor(startX), 0, imageData.width);
	const x2 = clamp(Math.ceil(endX), 0, imageData.width);
	const y1 = clamp(Math.floor(startY), 0, imageData.height);
	const y2 = clamp(Math.ceil(endY), 0, imageData.height);
	let totalRed = 0;
	let totalGreen = 0;
	let totalBlue = 0;
	let totalLuma = 0;
	let totalSamples = 0;
	let skinRed = 0;
	let skinGreen = 0;
	let skinBlue = 0;
	let skinLuma = 0;
	let skinSamples = 0;
	for (let y = y1; y < y2; y += 1) {
		for (let x = x1; x < x2; x += 1) {
			const offset = (y * imageData.width + x) * 4;
			const red = imageData.data[offset] ?? 0;
			const green = imageData.data[offset + 1] ?? 0;
			const blue = imageData.data[offset + 2] ?? 0;
			const luma = pixelLuma(red, green, blue);
			totalRed += red;
			totalGreen += green;
			totalBlue += blue;
			totalLuma += luma;
			totalSamples += 1;
			if (isLikelySkinPixel(red, green, blue)) {
				skinRed += red;
				skinGreen += green;
				skinBlue += blue;
				skinLuma += luma;
				skinSamples += 1;
			}
		}
	}
	if (preferSkin && skinSamples >= Math.max(24, totalSamples * .18)) {
		return {
			red: skinRed / skinSamples,
			green: skinGreen / skinSamples,
			blue: skinBlue / skinSamples,
			luma: skinLuma / skinSamples,
			samples: skinSamples
		};
	}
	if (totalSamples === 0) {
		return {
			red: 0,
			green: 0,
			blue: 0,
			luma: 0,
			samples: 0
		};
	}
	return {
		red: totalRed / totalSamples,
		green: totalGreen / totalSamples,
		blue: totalBlue / totalSamples,
		luma: totalLuma / totalSamples,
		samples: totalSamples
	};
}
function buildLightColorAssessment(imageData, faceSignal, colorCard) {
	if (!faceSignal.detected || faceSignal.faceBounds === null) {
		return {
			status: "blocked",
			colorCast: "neutral",
			castStrength: 0,
			score: 0,
			label: "Barwa światła",
			value: "Najpierw ustaw twarz",
			message: "Najpierw ustaw twarz centralnie, abym mógł ocenić barwę i równomierność światła na skórze.",
			colorTemperature: {
				kelvin: null,
				descriptor: "nieokreślona",
				isClinicallyOptimal: false
			}
		};
	}
	const faceLeft = faceSignal.faceBounds.left * imageData.width;
	const faceTop = faceSignal.faceBounds.top * imageData.height;
	const faceWidth = faceSignal.faceBounds.width * imageData.width;
	const faceHeight = faceSignal.faceBounds.height * imageData.height;
	const leftCheek = sampleMeanColor(imageData, faceLeft + faceWidth * .08, faceLeft + faceWidth * .36, faceTop + faceHeight * .34, faceTop + faceHeight * .78, true);
	const centerFace = sampleMeanColor(imageData, faceLeft + faceWidth * .34, faceLeft + faceWidth * .66, faceTop + faceHeight * .24, faceTop + faceHeight * .74, true);
	const rightCheek = sampleMeanColor(imageData, faceLeft + faceWidth * .64, faceLeft + faceWidth * .92, faceTop + faceHeight * .34, faceTop + faceHeight * .78, true);
	const forehead = sampleMeanColor(imageData, faceLeft + faceWidth * .22, faceLeft + faceWidth * .78, faceTop + faceHeight * .12, faceTop + faceHeight * .34, true);
	const regions = [
		leftCheek,
		centerFace,
		rightCheek,
		forehead
	].filter((region) => region.samples > 0);
	const averageWarmth = regions.reduce((sum, region) => sum + (region.red - region.blue) / Math.max(region.luma, 1), 0) / Math.max(regions.length, 1);
	const warmthValues = regions.map((region) => (region.red - region.blue) / Math.max(region.luma, 1));
	const warmthSpan = warmthValues.length > 0 ? Math.max(...warmthValues) - Math.min(...warmthValues) : 0;
	const leftRightWarmthDelta = Math.abs((leftCheek.red - leftCheek.blue) / Math.max(leftCheek.luma, 1) - (rightCheek.red - rightCheek.blue) / Math.max(rightCheek.luma, 1));
	const leftRightColorDelta = colorDistance(leftCheek, rightCheek);
	const leftRightLumaDelta = Math.abs(leftCheek.luma - rightCheek.luma);
	const warmSeverity = clamp((averageWarmth - .48) / .16, 0, 1);
	const coolSeverity = clamp((.29 - averageWarmth) / .14, 0, 1);
	const regionCastSet = new Set(warmthValues.map((value) => {
		if (value >= .5) return "warm";
		if (value <= .28) return "cool";
		return "neutral";
	}).filter((value) => value !== "neutral"));
	const mixedDetected = regionCastSet.size > 1 || leftRightWarmthDelta > .12 && (leftRightColorDelta > 22 || leftRightLumaDelta > 16) || leftRightLumaDelta > 24;
	const mixedSeverity = mixedDetected ? clamp(Math.max((warmthSpan - .13) / .18, (leftRightColorDelta - 22) / 30, (leftRightLumaDelta - 14) / 20), 0, 1) : 0;
	let colorCast = "neutral";
	let severity = 0;
	if (mixedSeverity >= .28) {
		colorCast = "mixed";
		severity = mixedSeverity;
	} else if (warmSeverity >= coolSeverity && warmSeverity >= .16) {
		colorCast = "warm";
		severity = warmSeverity;
	} else if (coolSeverity > warmSeverity && coolSeverity >= .16) {
		colorCast = "cool";
		severity = coolSeverity;
	}
	const status = colorCast === "mixed" ? severity >= .66 ? "blocked" : "warning" : colorCast === "neutral" ? "ready" : severity >= .72 ? "blocked" : "warning";
	const confidenceBoost = colorCard.detected && colorCard.status === "ready" ? 6 : colorCard.detected ? 3 : 0;
	const score = clamp(Math.round(100 - severity * 70 + confidenceBoost), 0, 100);
	const castStrength = Math.round(severity * 100);
	const cctSampleRegion = centerFace.samples >= 120 ? centerFace : regions.length > 0 ? {
		red: regions.reduce((sum, r) => sum + r.red * r.samples, 0) / Math.max(1, regions.reduce((sum, r) => sum + r.samples, 0)),
		green: regions.reduce((sum, r) => sum + r.green * r.samples, 0) / Math.max(1, regions.reduce((sum, r) => sum + r.samples, 0)),
		blue: regions.reduce((sum, r) => sum + r.blue * r.samples, 0) / Math.max(1, regions.reduce((sum, r) => sum + r.samples, 0)),
		samples: regions.reduce((sum, r) => sum + r.samples, 0)
	} : {
		red: 0,
		green: 0,
		blue: 0,
		samples: 0
	};
	const kelvin = cctSampleRegion.samples > 0 ? estimateColorTemperatureKelvin(cctSampleRegion.red, cctSampleRegion.green, cctSampleRegion.blue) : null;
	const descriptor = describeColorTemperature(kelvin);
	const isClinicallyOptimal = kelvin !== null && kelvin >= CLINICAL_CCT_RANGE[0] && kelvin <= CLINICAL_CCT_RANGE[1];
	const kelvinSuffix = kelvin !== null ? ` (~${kelvin} K)` : "";
	const baseValue = status === "ready" ? colorCard.detected && colorCard.status === "ready" ? "Neutralne i równomierne" : "Barwa wygląda poprawnie" : colorCast === "warm" ? "Światło jest zbyt ciepłe" : colorCast === "cool" ? "Światło jest zbyt chłodne" : leftRightLumaDelta > 18 ? "Jedna strona twarzy jest jaśniejsza" : "W kadrze miesza się światło";
	const value = `${baseValue}${kelvinSuffix}`;
	let message = "Barwa światła wygląda neutralnie i nie widać silnej dominanty kolorystycznej na twarzy.";
	if (status === "ready" && colorCard.detected && colorCard.status === "ready") {
		message = "Barwa światła wygląda neutralnie, a karta referencyjna pozostaje czytelna w tym ustawieniu.";
	} else if (colorCast === "warm") {
		message = status === "blocked" ? "Światło jest mocno ocieplone. Wyłącz żółtą lampę albo ustaw twarz bliżej rozproszonego światła dziennego przed zdjęciem." : "Światło wpada w ciepły, żółty odcień. Jeśli możesz, wyłącz ciepłą lampę lub podejdź do bardziej neutralnego światła.";
	} else if (colorCast === "cool") {
		message = status === "blocked" ? "Światło jest zbyt chłodne. Zmień miejsce albo usuń niebieskie źródło światła, aby kolory skóry nie były przekłamane." : "W świetle widać chłodny, niebieskawy odcień. Unikaj mocnego ekranu lub zimnej lampy skierowanej na twarz.";
	} else if (colorCast === "mixed") {
		message = leftRightLumaDelta > 18 ? "Jedna strona twarzy jest oświetlona inaczej niż druga. Ustaw twarz frontem do jednego źródła światła i unikaj bocznej lampy." : "W kadrze mieszają się różne odcienie światła. Stań frontem do jednego źródła i usuń dodatkowe ekrany albo lampy z boku.";
	}
	return {
		status,
		colorCast,
		castStrength,
		score,
		label: "Barwa światła",
		value,
		message,
		colorTemperature: {
			kelvin,
			descriptor,
			isClinicallyOptimal
		}
	};
}
function buildLightColorIndicator(lightColor) {
	return {
		key: "light_color",
		label: "Barwa",
		status: lightColor.status,
		value: lightColor.value,
		message: lightColor.message
	};
}
function buildLightingIndicator(quality, darkBackground) {
	const { averageLuma, contrast, sharpness } = quality.metrics;
	const severeExposure = averageLuma < 58 || averageLuma > 238;
	const weakExposure = averageLuma < 92 || averageLuma > 210;
	const severeClarity = contrast < 8 || sharpness < .4;
	const weakClarity = contrast < 18 || sharpness < .8;
	const status = severeExposure || severeClarity || darkBackground ? "blocked" : weakExposure || weakClarity ? "warning" : "ready";
	const value = darkBackground && status === "blocked" ? "Tło jest zbyt ciemne" : status === "ready" ? "Światło stabilne" : status === "warning" ? "Lekko skoryguj warunki" : "Popraw światło i stabilność";
	const message = darkBackground && status === "blocked" ? "Tło za twarzą jest zbyt ciemne. Podejdź bliżej okna albo ustaw się na jaśniejszym tle, aby kontury twarzy były czytelne." : status === "ready" ? "Podgląd wygląda wystarczająco jasno i czytelnie do wykonania zdjęcia." : status === "warning" ? "Dodaj odrobinę więcej światła lub ustabilizuj telefon, aby detale skóry były wyraźniejsze." : "Przejdź do jaśniejszego, rozproszonego światła i zatrzymaj telefon stabilniej przed wykonaniem zdjęcia.";
	return {
		key: "lighting",
		label: "Światło",
		status,
		value,
		message
	};
}
function sampleRegionSkinCoverage(imageData, startX, endX, startY, endY) {
	const x1 = clamp(Math.floor(startX), 0, imageData.width);
	const x2 = clamp(Math.ceil(endX), 0, imageData.width);
	const y1 = clamp(Math.floor(startY), 0, imageData.height);
	const y2 = clamp(Math.ceil(endY), 0, imageData.height);
	let skinPixels = 0;
	let totalPixels = 0;
	for (let y = y1; y < y2; y += 1) {
		for (let x = x1; x < x2; x += 1) {
			const offset = (y * imageData.width + x) * 4;
			const red = imageData.data[offset] ?? 0;
			const green = imageData.data[offset + 1] ?? 0;
			const blue = imageData.data[offset + 2] ?? 0;
			if (isLikelySkinPixel(red, green, blue)) {
				skinPixels += 1;
			}
			totalPixels += 1;
		}
	}
	return totalPixels > 0 ? skinPixels / totalPixels : 0;
}
function buildFaceSignal(imageData) {
	let minX = imageData.width;
	let minY = imageData.height;
	let maxX = -1;
	let maxY = -1;
	let skinPixels = 0;
	for (let y = 0; y < imageData.height; y += 1) {
		for (let x = 0; x < imageData.width; x += 1) {
			const offset = (y * imageData.width + x) * 4;
			const red = imageData.data[offset] ?? 0;
			const green = imageData.data[offset + 1] ?? 0;
			const blue = imageData.data[offset + 2] ?? 0;
			if (!isLikelySkinPixel(red, green, blue)) continue;
			skinPixels += 1;
			if (x < minX) minX = x;
			if (y < minY) minY = y;
			if (x > maxX) maxX = x;
			if (y > maxY) maxY = y;
		}
	}
	const totalPixels = imageData.width * imageData.height;
	const coverage = totalPixels > 0 ? skinPixels / totalPixels : 0;
	if (skinPixels === 0 || maxX < minX || maxY < minY) {
		return {
			detected: false,
			coverage,
			centerOffsetX: 1,
			centerOffsetY: 1,
			darkBackground: false,
			backgroundLuma: 0,
			cheeksObscured: false,
			faceBounds: null
		};
	}
	const width = (maxX - minX + 1) / imageData.width;
	const height = (maxY - minY + 1) / imageData.height;
	const centerX = (minX + maxX + 1) / 2 / imageData.width;
	const centerY = (minY + maxY + 1) / 2 / imageData.height;
	const faceBounds = {
		left: minX / imageData.width,
		top: minY / imageData.height,
		width,
		height
	};
	const expandX = Math.floor((maxX - minX + 1) * .22);
	const expandY = Math.floor((maxY - minY + 1) * .18);
	const outerLeft = Math.max(0, minX - expandX);
	const outerRight = Math.min(imageData.width - 1, maxX + expandX);
	const outerTop = Math.max(0, minY - expandY);
	const outerBottom = Math.min(imageData.height - 1, maxY + expandY);
	let backgroundLumaSum = 0;
	let backgroundPixels = 0;
	for (let y = outerTop; y <= outerBottom; y += 1) {
		for (let x = outerLeft; x <= outerRight; x += 1) {
			const insideFace = x >= minX && x <= maxX && y >= minY && y <= maxY;
			if (insideFace) continue;
			const offset = (y * imageData.width + x) * 4;
			const red = imageData.data[offset] ?? 0;
			const green = imageData.data[offset + 1] ?? 0;
			const blue = imageData.data[offset + 2] ?? 0;
			backgroundLumaSum += pixelLuma(red, green, blue);
			backgroundPixels += 1;
		}
	}
	const backgroundLuma = backgroundPixels > 0 ? backgroundLumaSum / backgroundPixels : 0;
	const darkBackground = coverage >= MIN_FACE_COVERAGE && backgroundPixels > 0 && backgroundLuma < 52;
	const cheekTop = minY + (maxY - minY + 1) * .34;
	const cheekBottom = minY + (maxY - minY + 1) * .78;
	const leftCheekCoverage = sampleRegionSkinCoverage(imageData, minX + (maxX - minX + 1) * .04, minX + (maxX - minX + 1) * .32, cheekTop, cheekBottom);
	const centerCoverage = sampleRegionSkinCoverage(imageData, minX + (maxX - minX + 1) * .34, minX + (maxX - minX + 1) * .66, cheekTop, cheekBottom);
	const rightCheekCoverage = sampleRegionSkinCoverage(imageData, minX + (maxX - minX + 1) * .68, minX + (maxX - minX + 1) * .96, cheekTop, cheekBottom);
	const cheeksObscured = coverage >= .08 && centerCoverage > .14 && (leftCheekCoverage < .2 || rightCheekCoverage < .2 || Math.abs(leftCheekCoverage - rightCheekCoverage) > .18);
	return {
		detected: coverage >= MIN_FACE_COVERAGE,
		coverage,
		centerOffsetX: centerX - .5,
		centerOffsetY: centerY - .5,
		darkBackground,
		backgroundLuma,
		cheeksObscured,
		faceBounds
	};
}
export const DISTANCE_ESTIMATE_FOV_DEGREES = 77;
export const DISTANCE_ESTIMATE_FACE_WIDTH_CM = 14;
export const DISTANCE_ESTIMATE_TARGET_RANGE_CM = [25, 40];
const DEG_TO_RAD = Math.PI / 180;
const DISTANCE_ESTIMATE_HALF_FOV_TAN = Math.tan(DISTANCE_ESTIMATE_FOV_DEGREES / 2 * DEG_TO_RAD);
export function estimateDistanceFromFaceWidthRatio(faceWidthRatio, options = {}) {
	if (!Number.isFinite(faceWidthRatio)) return null;
	if (faceWidthRatio <= .02) return null;
	if (faceWidthRatio >= .98) return null;
	const halfFovTan = options.fovDegrees ? Math.tan(options.fovDegrees / 2 * DEG_TO_RAD) : DISTANCE_ESTIMATE_HALF_FOV_TAN;
	const faceWidthCm = options.faceWidthCm ?? DISTANCE_ESTIMATE_FACE_WIDTH_CM;
	const distance = faceWidthCm / (2 * faceWidthRatio * halfFovTan);
	if (!Number.isFinite(distance) || distance <= 0) return null;
	return distance;
}
export function estimateDistanceFromFaceSignal(faceBounds, faceDetected) {
	const targetRange = DISTANCE_ESTIMATE_TARGET_RANGE_CM;
	if (!faceDetected || !faceBounds) {
		return {
			status: "blocked",
			distanceStatus: "unknown",
			distanceCm: null,
			targetRangeCm: targetRange,
			assumedFovDegrees: DISTANCE_ESTIMATE_FOV_DEGREES,
			assumedFaceWidthCm: DISTANCE_ESTIMATE_FACE_WIDTH_CM,
			label: "Odległość od kamery",
			value: "Nie widzę twarzy",
			message: "Ustaw twarz w owalnej prowadnicy — szacowanie odległości zacznie się, gdy zobaczymy pełny owal."
		};
	}
	const distanceCm = estimateDistanceFromFaceWidthRatio(faceBounds.width);
	if (distanceCm === null) {
		return {
			status: "warning",
			distanceStatus: "unknown",
			distanceCm: null,
			targetRangeCm: targetRange,
			assumedFovDegrees: DISTANCE_ESTIMATE_FOV_DEGREES,
			assumedFaceWidthCm: DISTANCE_ESTIMATE_FACE_WIDTH_CM,
			label: "Odległość od kamery",
			value: "Nie mogę oszacować",
			message: "Pokaż twarz w centralnej części kadru, aby pomiar odległości był wiarygodny."
		};
	}
	const rounded = Math.round(distanceCm);
	const [minTarget, maxTarget] = targetRange;
	let status;
	let distanceStatus;
	let value;
	let message;
	if (distanceCm < 18) {
		status = "blocked";
		distanceStatus = "too_close";
		value = `~${rounded} cm — zbyt blisko`;
		message = `Oddal telefon o około ${Math.max(5, minTarget + 5 - rounded)} cm. Kamera selfie traci ostrość poniżej 20 cm, a skóra w makrozbliżeniu może wyglądać nierealnie.`;
	} else if (distanceCm < minTarget) {
		status = "warning";
		distanceStatus = "slightly_close";
		value = `~${rounded} cm — trochę za blisko`;
		message = `Odsuń telefon o około ${Math.max(2, minTarget - rounded + 3)} cm, żeby zmieścić cały owal twarzy i uniknąć zniekształceń optycznych.`;
	} else if (distanceCm <= maxTarget) {
		status = "ready";
		distanceStatus = "optimal";
		value = `~${rounded} cm — optymalnie`;
		message = `Trzymaj telefon w tej odległości (docelowo ${minTarget}–${maxTarget} cm). To zakres, w którym skóra jest jednocześnie ostra i ma zachowaną perspektywę.`;
	} else if (distanceCm <= 60) {
		status = "warning";
		distanceStatus = "slightly_far";
		value = `~${rounded} cm — trochę za daleko`;
		message = `Podejdź o około ${Math.max(2, rounded - maxTarget + 3)} cm bliżej, żeby szczegóły skóry (pory, tekstura, rumień) były czytelne dla analizy.`;
	} else {
		status = "blocked";
		distanceStatus = "too_far";
		value = `~${rounded} cm — zbyt daleko`;
		message = `Podejdź bliżej do telefonu, docelowo ${minTarget}–${maxTarget} cm. Z tej odległości twarz jest za mała, aby ocenić naczynka, teksturę i drobne cechy skóry.`;
	}
	return {
		status,
		distanceStatus,
		distanceCm: rounded,
		targetRangeCm: targetRange,
		assumedFovDegrees: DISTANCE_ESTIMATE_FOV_DEGREES,
		assumedFaceWidthCm: DISTANCE_ESTIMATE_FACE_WIDTH_CM,
		label: "Odległość od kamery",
		value,
		message
	};
}
function classifyPoseAxis(absDegrees, readyThreshold, warningThreshold) {
	if (absDegrees <= readyThreshold) return "ready";
	if (absDegrees <= warningThreshold) return "warning";
	return "blocked";
}
const statusSeverity = {
	ready: 0,
	warning: 1,
	blocked: 2
};
export function buildPoseEstimate(pose, mediapipeAvailable) {
	if (!mediapipeAvailable || !pose) {
		return {
			available: false,
			status: "ready",
			yawDegrees: null,
			pitchDegrees: null,
			rollDegrees: null,
			label: "Ustawienie głowy",
			value: mediapipeAvailable ? "Nie widzę pozy" : "Niedostępne",
			message: mediapipeAvailable ? "Pokaż twarz w centralnej części kadru, aby ocenić ustawienie głowy." : "Precyzyjna detekcja pozy głowy nie jest aktywna w tej sesji."
		};
	}
	const yawAbs = Math.abs(pose.yawDegrees);
	const pitchAbs = Math.abs(pose.pitchDegrees);
	const rollAbs = Math.abs(pose.rollDegrees);
	const yawStatus = classifyPoseAxis(yawAbs, POSE_THRESHOLDS.yawReady, POSE_THRESHOLDS.yawWarning);
	const pitchStatus = classifyPoseAxis(pitchAbs, POSE_THRESHOLDS.pitchReady, POSE_THRESHOLDS.pitchWarning);
	const rollStatus = classifyPoseAxis(rollAbs, POSE_THRESHOLDS.rollReady, POSE_THRESHOLDS.rollWarning);
	const axes = [
		{
			axis: "yaw",
			status: yawStatus,
			absDeg: yawAbs,
			signedDeg: pose.yawDegrees
		},
		{
			axis: "pitch",
			status: pitchStatus,
			absDeg: pitchAbs,
			signedDeg: pose.pitchDegrees
		},
		{
			axis: "roll",
			status: rollStatus,
			absDeg: rollAbs,
			signedDeg: pose.rollDegrees
		}
	];
	const dominant = axes.reduce((acc, candidate) => {
		const accSev = statusSeverity[acc.status];
		const candSev = statusSeverity[candidate.status];
		if (candSev > accSev) return candidate;
		if (candSev === accSev && candidate.absDeg > acc.absDeg) return candidate;
		return acc;
	});
	const combinedStatus = statusSeverity[yawStatus] >= statusSeverity[pitchStatus] && statusSeverity[yawStatus] >= statusSeverity[rollStatus] ? yawStatus : statusSeverity[pitchStatus] >= statusSeverity[rollStatus] ? pitchStatus : rollStatus;
	let value;
	let message;
	if (combinedStatus === "ready") {
		value = "Głowa prosto";
		message = "Ustawienie twarzy jest frontalne — idealnie dla oceny skóry.";
	} else {
		const direction = dominant.axis === "yaw" ? dominant.signedDeg > 0 ? "obrócona w prawo" : "obrócona w lewo" : dominant.axis === "pitch" ? dominant.signedDeg > 0 ? "odchylona do tyłu (broda w górę)" : "pochylona do przodu (broda w dół)" : dominant.signedDeg > 0 ? "przechylona ku prawemu ramieniu" : "przechylona ku lewemu ramieniu";
		const correction = dominant.axis === "yaw" ? dominant.signedDeg > 0 ? "Obróć twarz lekko w lewo, żeby patrzyła prosto w obiektyw." : "Obróć twarz lekko w prawo, żeby patrzyła prosto w obiektyw." : dominant.axis === "pitch" ? dominant.signedDeg > 0 ? "Opuść brodę, żeby czoło i policzki były równomiernie oświetlone." : "Podnieś brodę, żeby aparat miał frontalny widok twarzy." : dominant.signedDeg > 0 ? "Wyprostuj głowę — przechyła się w prawo, asymetria zaburza ocenę skóry." : "Wyprostuj głowę — przechyła się w lewo, asymetria zaburza ocenę skóry.";
		const severity = combinedStatus === "warning" ? "lekko" : "wyraźnie";
		value = `Głowa ${severity} ${direction} (${Math.round(dominant.absDeg)}°)`;
		message = correction;
	}
	return {
		available: true,
		status: combinedStatus,
		yawDegrees: round(pose.yawDegrees, 1),
		pitchDegrees: round(pose.pitchDegrees, 1),
		rollDegrees: round(pose.rollDegrees, 1),
		label: "Ustawienie głowy",
		value,
		message
	};
}
function buildCosmeticsIndicator(cosmetics) {
	return {
		key: "cosmetics",
		label: cosmetics.label,
		status: cosmetics.status === "warning" ? "warning" : "ready",
		value: cosmetics.value,
		message: cosmetics.message
	};
}
function buildPoseIndicator(pose) {
	return {
		key: "pose",
		label: pose.label,
		status: pose.status,
		value: pose.value,
		message: pose.message
	};
}
function buildDistanceIndicator(distance) {
	return {
		key: "distance",
		label: distance.label,
		status: distance.status,
		value: distance.value,
		message: distance.message
	};
}
function buildFramingIndicator(faceDetected, faceCoverage, cheeksObscured) {
	let status;
	let value;
	let message;
	if (!faceDetected || faceCoverage < MIN_FACE_COVERAGE) {
		status = "blocked";
		value = "Nie widzę twarzy";
		message = "Ustaw twarz wyraźnie w centralnej ramce i pokaż cały owal bez zasłaniania policzków.";
	} else if (cheeksObscured) {
		status = "warning";
		value = "Policzki są zasłonięte";
		message = "Odsuń włosy, dłoń albo telefon tak, aby oba policzki były w pełni widoczne przed analizą.";
	} else if (faceCoverage < .09) {
		status = "warning";
		value = "Podejdź bliżej";
		message = "Twarz jest dość mała w kadrze. Zbliż telefon lub podejdź nieco bliżej do obiektywu.";
	} else if (faceCoverage > .42) {
		status = "blocked";
		value = "Kadr zbyt ciasny";
		message = "Oddal telefon od twarzy, aby w kadrze zmieściły się czoło, policzki i linia żuchwy.";
	} else if (faceCoverage > .32) {
		status = "warning";
		value = "Minimalnie za blisko";
		message = "Kadr jest już czytelny, ale niewielkie odsunięcie telefonu pomoże objąć całą twarz bardziej równomiernie.";
	} else {
		status = "ready";
		value = "Proporcja portretowa";
		message = "Wielkość twarzy w kadrze wygląda odpowiednio do wykonania selfie konsultacyjnego.";
	}
	return {
		key: "framing",
		label: "Kadr",
		status,
		value,
		message
	};
}
function buildPositionIndicator(faceDetected, centerOffsetX, centerOffsetY) {
	const distanceX = Math.abs(centerOffsetX);
	const distanceY = Math.abs(centerOffsetY);
	let status;
	let value;
	let message;
	if (!faceDetected) {
		status = "blocked";
		value = "Ustaw twarz centralnie";
		message = "Najpierw ustaw twarz na wprost wewnątrz owalnej prowadnicy.";
	} else if (distanceX > .2 || distanceY > .22) {
		status = "blocked";
		value = "Twarz poza środkiem";
		message = "Przesuń telefon lub głowę tak, aby nos znalazł się bliżej środka ramki.";
	} else if (distanceX > .11 || distanceY > .13) {
		status = "warning";
		value = "Delikatnie skoryguj";
		message = "Twarz jest prawie poprawnie ustawiona. Drobne wyrównanie poprawi symetrię kadru.";
	} else {
		status = "ready";
		value = "Ustawienie centralne";
		message = "Twarz znajduje się blisko środka i dobrze wpisuje się w prowadnicę.";
	}
	return {
		key: "position",
		label: "Pozycja",
		status,
		value,
		message
	};
}
export function buildLiveCaptureChecklist(guidance) {
	const centered = Math.abs(guidance.centerOffsetX) <= .11 && Math.abs(guidance.centerOffsetY) <= .13;
	const balancedFraming = guidance.faceCoverage >= .09 && guidance.faceCoverage <= .32;
	const stableEnough = guidance.quality.metrics.sharpness >= .8;
	const brightEnough = guidance.quality.metrics.averageLuma >= 92 && guidance.quality.metrics.averageLuma <= 210 && !guidance.darkBackground;
	const lightColorReady = guidance.lightColor.status === "ready";
	const lightReady = brightEnough && lightColorReady;
	const cheeksVisible = guidance.faceDetected && !guidance.cheeksObscured;
	return [
		{
			id: "light",
			label: "Światło ma prawidłową jasność i barwę",
			passed: lightReady,
			hint: lightReady ? "Warunki świetlne są gotowe." : !brightEnough ? "Ustaw się bliżej okna lub na jaśniejszym tle." : guidance.lightColor.message
		},
		{
			id: "cheeks",
			label: "Twarz i oba policzki są dobrze widoczne",
			passed: cheeksVisible,
			hint: cheeksVisible ? "Owal twarzy jest czytelny." : "Odsuń włosy, dłoń lub telefon od policzków."
		},
		{
			id: "framing",
			label: "Twarz ma właściwy rozmiar w kadrze",
			passed: balancedFraming,
			hint: balancedFraming ? "Kadr obejmuje twarz prawidłowo." : "Przybliż lub oddal telefon, aby objąć całą twarz."
		},
		{
			id: "position",
			label: "Twarz jest ustawiona centralnie",
			passed: centered,
			hint: centered ? "Pozycja wygląda dobrze." : "Wyrównaj głowę do środka prowadnicy."
		},
		{
			id: "stability",
			label: "Telefon jest ustawiony stabilnie",
			passed: stableEnough,
			hint: stableEnough ? "Obraz jest wystarczająco czytelny." : "Przytrzymaj telefon spokojniej przed zdjęciem."
		}
	];
}
export function isLiveCaptureReady(guidance) {
	if (!guidance) return false;
	return buildLiveCaptureChecklist(guidance).every((item) => item.passed);
}
function describeAutoCaptureResetReason(previousSnapshot, currentSnapshot) {
	const deltaX = currentSnapshot.centerOffsetX - previousSnapshot.centerOffsetX;
	const deltaY = currentSnapshot.centerOffsetY - previousSnapshot.centerOffsetY;
	const deltaCoverage = currentSnapshot.faceCoverage - previousSnapshot.faceCoverage;
	const horizontalRatio = Math.abs(deltaX) / AUTO_CAPTURE_POSITION_DELTA;
	const verticalRatio = Math.abs(deltaY) / AUTO_CAPTURE_POSITION_DELTA;
	const distanceRatio = Math.abs(deltaCoverage) / AUTO_CAPTURE_COVERAGE_DELTA;
	if (verticalRatio >= horizontalRatio && verticalRatio >= distanceRatio) {
		return deltaY > 0 ? "twarz opadła niżej w kadrze" : "twarz przesunęła się zbyt wysoko w kadrze";
	}
	if (horizontalRatio >= verticalRatio && horizontalRatio >= distanceRatio) {
		return deltaX > 0 ? "twarz przesunęła się za bardzo w prawo" : "twarz przesunęła się za bardzo w lewo";
	}
	return deltaCoverage > 0 ? "telefon zbliżył się zbyt mocno do twarzy" : "telefon oddalił się od twarzy";
}
export function evaluateAutoCaptureProgress({ enabled, guidance, tracker, now }) {
	if (!enabled || guidance === null || !isLiveCaptureReady(guidance)) {
		return {
			tracker: createAutoCaptureTracker(),
			countdownMs: null,
			shouldCapture: false,
			resetReason: null
		};
	}
	const currentSnapshot = {
		centerOffsetX: guidance.centerOffsetX,
		centerOffsetY: guidance.centerOffsetY,
		faceCoverage: guidance.faceCoverage
	};
	const previousSnapshot = tracker.snapshot;
	const stableComparedToSnapshot = previousSnapshot !== null && Math.abs(currentSnapshot.centerOffsetX - previousSnapshot.centerOffsetX) <= AUTO_CAPTURE_POSITION_DELTA && Math.abs(currentSnapshot.centerOffsetY - previousSnapshot.centerOffsetY) <= AUTO_CAPTURE_POSITION_DELTA && Math.abs(currentSnapshot.faceCoverage - previousSnapshot.faceCoverage) <= AUTO_CAPTURE_COVERAGE_DELTA;
	if (tracker.stableSince === null || previousSnapshot === null) {
		return {
			tracker: {
				stableSince: now,
				snapshot: currentSnapshot
			},
			countdownMs: AUTO_CAPTURE_DELAY_MS,
			shouldCapture: false,
			resetReason: null
		};
	}
	if (!stableComparedToSnapshot) {
		return {
			tracker: {
				stableSince: now,
				snapshot: currentSnapshot
			},
			countdownMs: AUTO_CAPTURE_DELAY_MS,
			shouldCapture: false,
			resetReason: describeAutoCaptureResetReason(previousSnapshot, currentSnapshot)
		};
	}
	const remainingMs = AUTO_CAPTURE_DELAY_MS - (now - tracker.stableSince);
	if (remainingMs <= 0) {
		return {
			tracker: createAutoCaptureTracker(),
			countdownMs: 0,
			shouldCapture: true,
			resetReason: null
		};
	}
	return {
		tracker: {
			stableSince: tracker.stableSince,
			snapshot: {
				centerOffsetX: (previousSnapshot.centerOffsetX + currentSnapshot.centerOffsetX) / 2,
				centerOffsetY: (previousSnapshot.centerOffsetY + currentSnapshot.centerOffsetY) / 2,
				faceCoverage: (previousSnapshot.faceCoverage + currentSnapshot.faceCoverage) / 2
			}
		},
		countdownMs: remainingMs,
		shouldCapture: false,
		resetReason: null
	};
}
export function evaluateLiveCameraGuidance(imageData, sourceWidth = imageData.width, sourceHeight = imageData.height, options = {}) {
	const quality = assessPhotoQualityFromImageData(imageData, sourceWidth, sourceHeight);
	const heuristicFaceSignal = buildFaceSignal(imageData);
	const mediapipe = options.mediapipeFaceSignal;
	const faceSignal = mediapipe?.detected && mediapipe.bounds ? {
		...heuristicFaceSignal,
		detected: true,
		faceBounds: mediapipe.bounds,
		coverage: Math.max(heuristicFaceSignal.coverage, mediapipe.bounds.width * mediapipe.bounds.height)
	} : heuristicFaceSignal;
	const detectionSource = mediapipe?.detected ? "mediapipe" : "skin-pixel-heuristic";
	const colorCard = buildColorCardDetection(imageData, faceSignal);
	const lightColor = buildLightColorAssessment(imageData, faceSignal, colorCard);
	const distance = estimateDistanceFromFaceSignal(faceSignal.faceBounds ? {
		left: faceSignal.faceBounds.left,
		top: faceSignal.faceBounds.top,
		width: faceSignal.faceBounds.width,
		height: faceSignal.faceBounds.height
	} : null, faceSignal.detected);
	const pose = buildPoseEstimate(mediapipe?.pose ?? null, Boolean(mediapipe));
	const cosmetics = faceSignal.detected && faceSignal.faceBounds ? detectCosmeticsOnImage(imageData, faceSignal.faceBounds) : {
		status: "ready",
		confidence: 0,
		signals: {
			foundationScore: 0,
			eyeMakeupScore: 0,
			freshCreamScore: 0
		},
		detectedKinds: [],
		label: "Kosmetyki na skórze",
		value: "Nieokreślone",
		message: "Pokaż twarz w kadrze, żeby sprawdzić obecność kosmetyków."
	};
	const indicators = [
		buildLightingIndicator(quality, faceSignal.darkBackground),
		buildLightColorIndicator(lightColor),
		buildFramingIndicator(faceSignal.detected, faceSignal.coverage, faceSignal.cheeksObscured),
		buildPositionIndicator(faceSignal.detected, faceSignal.centerOffsetX, faceSignal.centerOffsetY),
		buildDistanceIndicator(distance)
	];
	if (cosmetics.status === "warning") {
		indicators.push(buildCosmeticsIndicator(cosmetics));
	}
	if (pose.available) {
		indicators.push(buildPoseIndicator(pose));
	}
	const status = indicators.some((item) => item.status === "blocked") ? "blocked" : indicators.some((item) => item.status === "warning") || quality.status === "warning" ? "warning" : "ready";
	const score = Math.round(quality.score * .42 + scoreFromStatus(indicators[0].status) * .16 + scoreFromStatus(indicators[1].status) * .13 + scoreFromStatus(indicators[2].status) * .12 + scoreFromStatus(indicators[3].status) * .09 + scoreFromStatus(indicators[4].status) * .08);
	const summary = status === "ready" ? "Światło i ustawienie twarzy wyglądają stabilnie. Możesz wykonać zdjęcie." : !faceSignal.detected ? "Najpierw popraw ustawienie twarzy albo oświetlenie, aby zdjęcie nadawało się do analizy." : lightColor.status === "blocked" ? "Barwa albo równomierność światła może zafałszować ocenę skóry. Ustaw twarz frontem do jednego, bardziej neutralnego źródła światła." : status === "warning" ? "Kadr jest blisko gotowości. Niewielka korekta światła lub położenia twarzy poprawi jakość zdjęcia." : "Najpierw popraw ustawienie twarzy albo oświetlenie, aby zdjęcie nadawało się do analizy.";
	return {
		status,
		score: clamp(score, 0, 100),
		label: labelFromStatus(status),
		summary,
		indicators,
		quality,
		faceDetected: faceSignal.detected,
		faceCoverage: round(faceSignal.coverage, 3),
		centerOffsetX: round(faceSignal.centerOffsetX, 3),
		centerOffsetY: round(faceSignal.centerOffsetY, 3),
		backgroundLuma: round(faceSignal.backgroundLuma, 1),
		darkBackground: faceSignal.darkBackground,
		cheeksObscured: faceSignal.cheeksObscured,
		faceBounds: faceSignal.faceBounds ? {
			left: round(faceSignal.faceBounds.left, 3),
			top: round(faceSignal.faceBounds.top, 3),
			width: round(faceSignal.faceBounds.width, 3),
			height: round(faceSignal.faceBounds.height, 3)
		} : null,
		lightColor,
		colorCard,
		distance,
		pose,
		detectionSource,
		cosmetics
	};
}

//# sourceMappingURL=data:application/json;base64,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O0VBQzlDLElBQ0M7RUFDSjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7Q0FDRjtBQUNGIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbImxpdmVDYW1lcmFHdWlkYW5jZS50cyJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBhc3Nlc3NQaG90b1F1YWxpdHlGcm9tSW1hZ2VEYXRhLFxuICB0eXBlIFBob3RvUXVhbGl0eUFzc2Vzc21lbnQsXG4gIHR5cGUgUGhvdG9RdWFsaXR5SXNzdWUsXG59IGZyb20gXCIuL3Bob3RvUXVhbGl0eVwiO1xuaW1wb3J0IHR5cGUge1xuICBNZWRpYVBpcGVGYWNlU2lnbmFsLFxuICBNZWRpYVBpcGVQb3NlRXN0aW1hdGUsXG59IGZyb20gXCIuL21lZGlhcGlwZUZhY2VMYW5kbWFya2VyXCI7XG5pbXBvcnQgeyBQT1NFX1RIUkVTSE9MRFMgfSBmcm9tIFwiLi9tZWRpYXBpcGVGYWNlTGFuZG1hcmtlclwiO1xuaW1wb3J0IHtcbiAgZGV0ZWN0Q29zbWV0aWNzT25JbWFnZSxcbiAgdHlwZSBDb3NtZXRpY3NEZXRlY3Rpb24sXG59IGZyb20gXCIuL2Nvc21ldGljc0RldGVjdGlvblwiO1xuXG5leHBvcnQgdHlwZSBMaXZlR3VpZGFuY2VTdGF0dXMgPSBcInJlYWR5XCIgfCBcIndhcm5pbmdcIiB8IFwiYmxvY2tlZFwiO1xuZXhwb3J0IHR5cGUgTGl2ZUd1aWRhbmNlSW5kaWNhdG9yS2V5ID1cbiAgfCBcImxpZ2h0aW5nXCJcbiAgfCBcImxpZ2h0X2NvbG9yXCJcbiAgfCBcImZyYW1pbmdcIlxuICB8IFwicG9zaXRpb25cIlxuICB8IFwiZGlzdGFuY2VcIlxuICB8IFwicG9zZVwiXG4gIHwgXCJjb3NtZXRpY3NcIjtcblxuZXhwb3J0IHR5cGUgTGl2ZUd1aWRhbmNlSW5kaWNhdG9yID0ge1xuICBrZXk6IExpdmVHdWlkYW5jZUluZGljYXRvcktleTtcbiAgbGFiZWw6IHN0cmluZztcbiAgc3RhdHVzOiBMaXZlR3VpZGFuY2VTdGF0dXM7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG1lc3NhZ2U6IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIExpdmVDb2xvckNhcmRHdWlkYW5jZSA9IHtcbiAgc3RhdHVzOiBMaXZlR3VpZGFuY2VTdGF0dXM7XG4gIHNjb3JlOiBudW1iZXI7XG4gIGRldGVjdGVkOiBib29sZWFuO1xuICBsYWJlbDogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBzdW1tYXJ5OiBzdHJpbmc7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgYWxpZ25tZW50OiBudW1iZXI7XG4gIHBhbGV0dGVWYXJpZXR5OiBudW1iZXI7XG4gIGNvbnRyYXN0UGF0dGVybjogbnVtYmVyO1xuICBib3VuZHM6IHtcbiAgICBsZWZ0OiBudW1iZXI7XG4gICAgdG9wOiBudW1iZXI7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcbiAgfSB8IG51bGw7XG59O1xuXG5leHBvcnQgdHlwZSBMaXZlRGlzdGFuY2VTdGF0dXMgPVxuICB8IFwidW5rbm93blwiXG4gIHwgXCJ0b29fY2xvc2VcIlxuICB8IFwic2xpZ2h0bHlfY2xvc2VcIlxuICB8IFwib3B0aW1hbFwiXG4gIHwgXCJzbGlnaHRseV9mYXJcIlxuICB8IFwidG9vX2ZhclwiO1xuXG5leHBvcnQgdHlwZSBMaXZlRGlzdGFuY2VFc3RpbWF0ZSA9IHtcbiAgc3RhdHVzOiBMaXZlR3VpZGFuY2VTdGF0dXM7XG4gIGRpc3RhbmNlU3RhdHVzOiBMaXZlRGlzdGFuY2VTdGF0dXM7XG4gIGRpc3RhbmNlQ206IG51bWJlciB8IG51bGw7XG4gIHRhcmdldFJhbmdlQ206IFtudW1iZXIsIG51bWJlcl07XG4gIGFzc3VtZWRGb3ZEZWdyZWVzOiBudW1iZXI7XG4gIGFzc3VtZWRGYWNlV2lkdGhDbTogbnVtYmVyO1xuICBsYWJlbDogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBtZXNzYWdlOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBMaXZlUG9zZUVzdGltYXRlID0ge1xuICBhdmFpbGFibGU6IGJvb2xlYW47XG4gIHN0YXR1czogTGl2ZUd1aWRhbmNlU3RhdHVzO1xuICB5YXdEZWdyZWVzOiBudW1iZXIgfCBudWxsO1xuICBwaXRjaERlZ3JlZXM6IG51bWJlciB8IG51bGw7XG4gIHJvbGxEZWdyZWVzOiBudW1iZXIgfCBudWxsO1xuICBsYWJlbDogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBtZXNzYWdlOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBMaXZlRmFjZURldGVjdGlvblNvdXJjZSA9IFwic2tpbi1waXhlbC1oZXVyaXN0aWNcIiB8IFwibWVkaWFwaXBlXCI7XG5cbmV4cG9ydCB0eXBlIExpdmVMaWdodENvbG9yQ2FzdCA9IFwibmV1dHJhbFwiIHwgXCJ3YXJtXCIgfCBcImNvb2xcIiB8IFwibWl4ZWRcIjtcblxuZXhwb3J0IHR5cGUgTGl2ZUNvbG9yVGVtcGVyYXR1cmVFc3RpbWF0ZSA9IHtcbiAga2VsdmluOiBudW1iZXIgfCBudWxsO1xuICBkZXNjcmlwdG9yOiBMaXZlQ29sb3JUZW1wZXJhdHVyZURlc2NyaXB0b3I7XG4gIGlzQ2xpbmljYWxseU9wdGltYWw6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgdHlwZSBMaXZlQ29sb3JUZW1wZXJhdHVyZURlc2NyaXB0b3IgPVxuICB8IFwibmllb2tyZcWbbG9uYVwiXG4gIHwgXCJiYXJkem8gY2llcMWCYVwiXG4gIHwgXCJjaWVwxYJhXCJcbiAgfCBcImxla2tvIGNpZXDFgmFcIlxuICB8IFwiZHppZW5uYVwiXG4gIHwgXCJsZWtrbyBjaMWCb2RuYVwiXG4gIHwgXCJjaMWCb2RuYVwiXG4gIHwgXCJiYXJkem8gY2jFgm9kbmFcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGVzdGltYXRlQ29sb3JUZW1wZXJhdHVyZUtlbHZpbihcbiAgcmVkOiBudW1iZXIsXG4gIGdyZWVuOiBudW1iZXIsXG4gIGJsdWU6IG51bWJlclxuKTogbnVtYmVyIHwgbnVsbCB7XG4gIGlmICghTnVtYmVyLmlzRmluaXRlKHJlZCkgfHwgIU51bWJlci5pc0Zpbml0ZShncmVlbikgfHwgIU51bWJlci5pc0Zpbml0ZShibHVlKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3Qgc3VtOCA9IHJlZCArIGdyZWVuICsgYmx1ZTtcbiAgaWYgKHN1bTggPCAzMCkgcmV0dXJuIG51bGw7XG4gIGlmIChzdW04ID4gNzQwKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBsaW5lYXJpemUgPSAoYzogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBub3JtYWxpemVkID0gYyAvIDI1NTtcbiAgICByZXR1cm4gbm9ybWFsaXplZCA8PSAwLjA0MDQ1XG4gICAgICA/IG5vcm1hbGl6ZWQgLyAxMi45MlxuICAgICAgOiBNYXRoLnBvdygobm9ybWFsaXplZCArIDAuMDU1KSAvIDEuMDU1LCAyLjQpO1xuICB9O1xuXG4gIGNvbnN0IHJsID0gbGluZWFyaXplKHJlZCk7XG4gIGNvbnN0IGdsID0gbGluZWFyaXplKGdyZWVuKTtcbiAgY29uc3QgYmwgPSBsaW5lYXJpemUoYmx1ZSk7XG5cbiAgY29uc3QgWCA9IDAuNDEyNDU2NCAqIHJsICsgMC4zNTc1NzYxICogZ2wgKyAwLjE4MDQzNzUgKiBibDtcbiAgY29uc3QgWSA9IDAuMjEyNjcyOSAqIHJsICsgMC43MTUxNTIyICogZ2wgKyAwLjA3MjE3NSAqIGJsO1xuICBjb25zdCBaID0gMC4wMTkzMzM5ICogcmwgKyAwLjExOTE5MiAqIGdsICsgMC45NTAzMDQxICogYmw7XG5cbiAgY29uc3QgdG90YWwgPSBYICsgWSArIFo7XG4gIGlmICh0b3RhbCA8IDFlLTYpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHggPSBYIC8gdG90YWw7XG4gIGNvbnN0IHkgPSBZIC8gdG90YWw7XG5cbiAgY29uc3QgZGVub21pbmF0b3IgPSAwLjE4NTggLSB5O1xuICBpZiAoTWF0aC5hYnMoZGVub21pbmF0b3IpIDwgMWUtNCkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgbiA9ICh4IC0gMC4zMzIpIC8gZGVub21pbmF0b3I7XG4gIGNvbnN0IGNjdCA9IDQzNyAqIG4gKiBuICogbiArIDM2MDEgKiBuICogbiArIDY4NjEgKiBuICsgNTUxNC4zMTtcblxuICBpZiAoIU51bWJlci5pc0Zpbml0ZShjY3QpKSByZXR1cm4gbnVsbDtcbiAgaWYgKGNjdCA8IDE1MDAgfHwgY2N0ID4gMTIwMDApIHJldHVybiBudWxsO1xuXG4gIHJldHVybiBNYXRoLnJvdW5kKGNjdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXNjcmliZUNvbG9yVGVtcGVyYXR1cmUoXG4gIGtlbHZpbjogbnVtYmVyIHwgbnVsbFxuKTogTGl2ZUNvbG9yVGVtcGVyYXR1cmVEZXNjcmlwdG9yIHtcbiAgaWYgKGtlbHZpbiA9PT0gbnVsbCkgcmV0dXJuIFwibmllb2tyZcWbbG9uYVwiO1xuICBpZiAoa2VsdmluIDwgMjcwMCkgcmV0dXJuIFwiYmFyZHpvIGNpZXDFgmFcIjtcbiAgaWYgKGtlbHZpbiA8IDM1MDApIHJldHVybiBcImNpZXDFgmFcIjtcbiAgaWYgKGtlbHZpbiA8IDQ1MDApIHJldHVybiBcImxla2tvIGNpZXDFgmFcIjtcbiAgaWYgKGtlbHZpbiA8PSA2NTAwKSByZXR1cm4gXCJkemllbm5hXCI7XG4gIGlmIChrZWx2aW4gPD0gNzUwMCkgcmV0dXJuIFwibGVra28gY2jFgm9kbmFcIjtcbiAgaWYgKGtlbHZpbiA8PSA5MDAwKSByZXR1cm4gXCJjaMWCb2RuYVwiO1xuICByZXR1cm4gXCJiYXJkem8gY2jFgm9kbmFcIjtcbn1cblxuZXhwb3J0IGNvbnN0IENMSU5JQ0FMX0NDVF9SQU5HRTogcmVhZG9ubHkgW251bWJlciwgbnVtYmVyXSA9IFs1MDAwLCA2ODAwXTtcblxuZXhwb3J0IHR5cGUgTGl2ZUxpZ2h0Q29sb3JBc3Nlc3NtZW50ID0ge1xuICBzdGF0dXM6IExpdmVHdWlkYW5jZVN0YXR1cztcbiAgY29sb3JDYXN0OiBMaXZlTGlnaHRDb2xvckNhc3Q7XG4gIGNhc3RTdHJlbmd0aDogbnVtYmVyO1xuICBzY29yZTogbnVtYmVyO1xuICBsYWJlbDogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIGNvbG9yVGVtcGVyYXR1cmU6IExpdmVDb2xvclRlbXBlcmF0dXJlRXN0aW1hdGU7XG59O1xuXG5leHBvcnQgdHlwZSBMaXZlQ2FtZXJhR3VpZGFuY2UgPSB7XG4gIHN0YXR1czogTGl2ZUd1aWRhbmNlU3RhdHVzO1xuICBzY29yZTogbnVtYmVyO1xuICBsYWJlbDogc3RyaW5nO1xuICBzdW1tYXJ5OiBzdHJpbmc7XG4gIGluZGljYXRvcnM6IExpdmVHdWlkYW5jZUluZGljYXRvcltdO1xuICBxdWFsaXR5OiBQaG90b1F1YWxpdHlBc3Nlc3NtZW50O1xuICBmYWNlRGV0ZWN0ZWQ6IGJvb2xlYW47XG4gIGZhY2VDb3ZlcmFnZTogbnVtYmVyO1xuICBjZW50ZXJPZmZzZXRYOiBudW1iZXI7XG4gIGNlbnRlck9mZnNldFk6IG51bWJlcjtcbiAgYmFja2dyb3VuZEx1bWE6IG51bWJlcjtcbiAgZGFya0JhY2tncm91bmQ6IGJvb2xlYW47XG4gIGNoZWVrc09ic2N1cmVkOiBib29sZWFuO1xuICBmYWNlQm91bmRzOiB7XG4gICAgbGVmdDogbnVtYmVyO1xuICAgIHRvcDogbnVtYmVyO1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG4gIH0gfCBudWxsO1xuICBsaWdodENvbG9yOiBMaXZlTGlnaHRDb2xvckFzc2Vzc21lbnQ7XG4gIGNvbG9yQ2FyZDogTGl2ZUNvbG9yQ2FyZEd1aWRhbmNlO1xuICBkaXN0YW5jZTogTGl2ZURpc3RhbmNlRXN0aW1hdGU7XG4gIHBvc2U6IExpdmVQb3NlRXN0aW1hdGU7XG4gIGRldGVjdGlvblNvdXJjZTogTGl2ZUZhY2VEZXRlY3Rpb25Tb3VyY2U7XG4gIGNvc21ldGljczogQ29zbWV0aWNzRGV0ZWN0aW9uO1xufTtcblxuZXhwb3J0IHR5cGUgTGl2ZUNhcHR1cmVDaGVja2xpc3RJdGVtID0ge1xuICBpZDogXCJsaWdodFwiIHwgXCJjaGVla3NcIiB8IFwiZnJhbWluZ1wiIHwgXCJwb3NpdGlvblwiIHwgXCJzdGFiaWxpdHlcIjtcbiAgbGFiZWw6IHN0cmluZztcbiAgcGFzc2VkOiBib29sZWFuO1xuICBoaW50OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBBdXRvQ2FwdHVyZVNuYXBzaG90ID0ge1xuICBjZW50ZXJPZmZzZXRYOiBudW1iZXI7XG4gIGNlbnRlck9mZnNldFk6IG51bWJlcjtcbiAgZmFjZUNvdmVyYWdlOiBudW1iZXI7XG59O1xuXG5leHBvcnQgdHlwZSBBdXRvQ2FwdHVyZVRyYWNrZXIgPSB7XG4gIHN0YWJsZVNpbmNlOiBudW1iZXIgfCBudWxsO1xuICBzbmFwc2hvdDogQXV0b0NhcHR1cmVTbmFwc2hvdCB8IG51bGw7XG59O1xuXG5leHBvcnQgdHlwZSBBdXRvQ2FwdHVyZUV2YWx1YXRpb24gPSB7XG4gIHRyYWNrZXI6IEF1dG9DYXB0dXJlVHJhY2tlcjtcbiAgY291bnRkb3duTXM6IG51bWJlciB8IG51bGw7XG4gIHNob3VsZENhcHR1cmU6IGJvb2xlYW47XG4gIHJlc2V0UmVhc29uOiBzdHJpbmcgfCBudWxsO1xufTtcblxuZXhwb3J0IHR5cGUgQ29sb3JDYXJkU3RhYmlsaXR5U25hcHNob3QgPSB7XG4gIGNlbnRlclg6IG51bWJlcjtcbiAgY2VudGVyWTogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbn07XG5cbmV4cG9ydCB0eXBlIENvbG9yQ2FyZFN0YWJpbGl0eVRyYWNrZXIgPSB7XG4gIHN0YWJsZVNpbmNlOiBudW1iZXIgfCBudWxsO1xuICBzbmFwc2hvdDogQ29sb3JDYXJkU3RhYmlsaXR5U25hcHNob3QgfCBudWxsO1xufTtcblxuZXhwb3J0IHR5cGUgQ29sb3JDYXJkU3RhYmlsaXR5RXZhbHVhdGlvbiA9IHtcbiAgdHJhY2tlcjogQ29sb3JDYXJkU3RhYmlsaXR5VHJhY2tlcjtcbiAgY291bnRkb3duTXM6IG51bWJlciB8IG51bGw7XG4gIGNvbmZpcm1lZDogYm9vbGVhbjtcbiAgcmVzZXRSZWFzb246IHN0cmluZyB8IG51bGw7XG59O1xuXG5leHBvcnQgdHlwZSBBdXRvQ2FwdHVyZVNpZ25hbCA9IFwiY291bnRkb3duLXN0YXJ0XCIgfCBcImNhcHR1cmUtY29tcGxldGVcIiB8IG51bGw7XG5cbmV4cG9ydCBjb25zdCBBVVRPX0NBUFRVUkVfREVMQVlfTVMgPSAyMDAwO1xuZXhwb3J0IGNvbnN0IENPTE9SX0NBUkRfQ09ORklSTUFUSU9OX0hPTERfTVMgPSBBVVRPX0NBUFRVUkVfREVMQVlfTVM7XG5jb25zdCBBVVRPX0NBUFRVUkVfUE9TSVRJT05fREVMVEEgPSAwLjAyODtcbmNvbnN0IEFVVE9fQ0FQVFVSRV9DT1ZFUkFHRV9ERUxUQSA9IDAuMDM7XG5jb25zdCBDT0xPUl9DQVJEX1BPU0lUSU9OX0RFTFRBID0gMC4wMztcbmNvbnN0IENPTE9SX0NBUkRfU0laRV9ERUxUQSA9IDAuMDM7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBdXRvQ2FwdHVyZVRyYWNrZXIoKTogQXV0b0NhcHR1cmVUcmFja2VyIHtcbiAgcmV0dXJuIHsgc3RhYmxlU2luY2U6IG51bGwsIHNuYXBzaG90OiBudWxsIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb2xvckNhcmRTdGFiaWxpdHlUcmFja2VyKCk6IENvbG9yQ2FyZFN0YWJpbGl0eVRyYWNrZXIge1xuICByZXR1cm4geyBzdGFibGVTaW5jZTogbnVsbCwgc25hcHNob3Q6IG51bGwgfTtcbn1cblxuZnVuY3Rpb24gY2xhbXAodmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG4gIHJldHVybiBNYXRoLm1pbihtYXgsIE1hdGgubWF4KG1pbiwgdmFsdWUpKTtcbn1cblxuZnVuY3Rpb24gcm91bmQodmFsdWU6IG51bWJlciwgcHJlY2lzaW9uID0gMikge1xuICBjb25zdCBmYWN0b3IgPSAxMCAqKiBwcmVjaXNpb247XG4gIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogZmFjdG9yKSAvIGZhY3Rvcjtcbn1cblxuZnVuY3Rpb24gc2NvcmVGcm9tU3RhdHVzKHN0YXR1czogTGl2ZUd1aWRhbmNlU3RhdHVzKSB7XG4gIGlmIChzdGF0dXMgPT09IFwicmVhZHlcIikgcmV0dXJuIDEwMDtcbiAgaWYgKHN0YXR1cyA9PT0gXCJ3YXJuaW5nXCIpIHJldHVybiA2NDtcbiAgcmV0dXJuIDI0O1xufVxuXG5mdW5jdGlvbiBsYWJlbEZyb21TdGF0dXMoc3RhdHVzOiBMaXZlR3VpZGFuY2VTdGF0dXMpIHtcbiAgaWYgKHN0YXR1cyA9PT0gXCJyZWFkeVwiKSByZXR1cm4gXCJLYWRyIGdvdG93eVwiO1xuICBpZiAoc3RhdHVzID09PSBcIndhcm5pbmdcIikgcmV0dXJuIFwiUHJhd2llIGdvdG93ZVwiO1xuICByZXR1cm4gXCJXeW1hZ2Ega29yZWt0eVwiO1xufVxuXG5jb25zdCBNSU5fRkFDRV9DT1ZFUkFHRSA9IDAuMDI7XG5cbnR5cGUgRmFjZUJvdW5kcyA9IHtcbiAgbGVmdDogbnVtYmVyO1xuICB0b3A6IG51bWJlcjtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG59O1xuXG50eXBlIEZhY2VTaWduYWwgPSB7XG4gIGRldGVjdGVkOiBib29sZWFuO1xuICBjb3ZlcmFnZTogbnVtYmVyO1xuICBjZW50ZXJPZmZzZXRYOiBudW1iZXI7XG4gIGNlbnRlck9mZnNldFk6IG51bWJlcjtcbiAgZGFya0JhY2tncm91bmQ6IGJvb2xlYW47XG4gIGJhY2tncm91bmRMdW1hOiBudW1iZXI7XG4gIGNoZWVrc09ic2N1cmVkOiBib29sZWFuO1xuICBmYWNlQm91bmRzOiBGYWNlQm91bmRzIHwgbnVsbDtcbn07XG5cbnR5cGUgQ29sb3JDYXJkQ2FuZGlkYXRlTWV0cmljcyA9IHtcbiAgYnVja2V0Q291bnQ6IG51bWJlcjtcbiAgdHJhbnNpdGlvbkNvdW50OiBudW1iZXI7XG4gIHNhdHVyYXRlZFNoYXJlOiBudW1iZXI7XG4gIG5ldXRyYWxTaGFyZTogbnVtYmVyO1xuICBjb250cmFzdDogbnVtYmVyO1xufTtcblxudHlwZSBNZWFuQ29sb3JTYW1wbGUgPSB7XG4gIHJlZDogbnVtYmVyO1xuICBncmVlbjogbnVtYmVyO1xuICBibHVlOiBudW1iZXI7XG4gIGx1bWE6IG51bWJlcjtcbiAgc2FtcGxlczogbnVtYmVyO1xufTtcblxuZnVuY3Rpb24gaXNMaWtlbHlTa2luUGl4ZWwocmVkOiBudW1iZXIsIGdyZWVuOiBudW1iZXIsIGJsdWU6IG51bWJlcikge1xuICBjb25zdCBtYXggPSBNYXRoLm1heChyZWQsIGdyZWVuLCBibHVlKTtcbiAgY29uc3QgbWluID0gTWF0aC5taW4ocmVkLCBncmVlbiwgYmx1ZSk7XG4gIGNvbnN0IHJnYkdhdGUgPSByZWQgPiA2MCAmJiBncmVlbiA+IDM1ICYmIGJsdWUgPiAyMCAmJiByZWQgPiBncmVlbiAmJiByZWQgPiBibHVlICYmIG1heCAtIG1pbiA+IDIwO1xuICBjb25zdCBjYiA9IDEyOCAtIDAuMTY4NzM2ICogcmVkIC0gMC4zMzEyNjQgKiBncmVlbiArIDAuNSAqIGJsdWU7XG4gIGNvbnN0IGNyID0gMTI4ICsgMC41ICogcmVkIC0gMC40MTg2ODggKiBncmVlbiAtIDAuMDgxMzEyICogYmx1ZTtcbiAgcmV0dXJuIHJnYkdhdGUgJiYgY2IgPj0gNzcgJiYgY2IgPD0gMTI3ICYmIGNyID49IDEzMyAmJiBjciA8PSAxNzM7XG59XG5cbmZ1bmN0aW9uIHBpeGVsTHVtYShyZWQ6IG51bWJlciwgZ3JlZW46IG51bWJlciwgYmx1ZTogbnVtYmVyKSB7XG4gIHJldHVybiAwLjIxMjYgKiByZWQgKyAwLjcxNTIgKiBncmVlbiArIDAuMDcyMiAqIGJsdWU7XG59XG5cbmZ1bmN0aW9uIGNvbG9yRGlzdGFuY2UoXG4gIGxlZnQ6IHsgcmVkOiBudW1iZXI7IGdyZWVuOiBudW1iZXI7IGJsdWU6IG51bWJlciB9LFxuICByaWdodDogeyByZWQ6IG51bWJlcjsgZ3JlZW46IG51bWJlcjsgYmx1ZTogbnVtYmVyIH1cbikge1xuICBjb25zdCBkZWx0YVJlZCA9IGxlZnQucmVkIC0gcmlnaHQucmVkO1xuICBjb25zdCBkZWx0YUdyZWVuID0gbGVmdC5ncmVlbiAtIHJpZ2h0LmdyZWVuO1xuICBjb25zdCBkZWx0YUJsdWUgPSBsZWZ0LmJsdWUgLSByaWdodC5ibHVlO1xuICByZXR1cm4gTWF0aC5zcXJ0KGRlbHRhUmVkICogZGVsdGFSZWQgKyBkZWx0YUdyZWVuICogZGVsdGFHcmVlbiArIGRlbHRhQmx1ZSAqIGRlbHRhQmx1ZSk7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVIdWVCdWNrZXQocmVkOiBudW1iZXIsIGdyZWVuOiBudW1iZXIsIGJsdWU6IG51bWJlcikge1xuICBjb25zdCBtYXggPSBNYXRoLm1heChyZWQsIGdyZWVuLCBibHVlKTtcbiAgY29uc3QgbWluID0gTWF0aC5taW4ocmVkLCBncmVlbiwgYmx1ZSk7XG4gIGNvbnN0IGRlbHRhID0gbWF4IC0gbWluO1xuICBpZiAoZGVsdGEgPCAxOCkgcmV0dXJuIG51bGw7XG5cbiAgbGV0IGh1ZSA9IDA7XG4gIGlmIChtYXggPT09IHJlZCkge1xuICAgIGh1ZSA9ICgoZ3JlZW4gLSBibHVlKSAvIGRlbHRhKSAlIDY7XG4gIH0gZWxzZSBpZiAobWF4ID09PSBncmVlbikge1xuICAgIGh1ZSA9IChibHVlIC0gcmVkKSAvIGRlbHRhICsgMjtcbiAgfSBlbHNlIHtcbiAgICBodWUgPSAocmVkIC0gZ3JlZW4pIC8gZGVsdGEgKyA0O1xuICB9XG5cbiAgY29uc3Qgbm9ybWFsaXplZEh1ZSA9IChodWUgKiA2MCArIDM2MCkgJSAzNjA7XG4gIHJldHVybiBNYXRoLmZsb29yKG5vcm1hbGl6ZWRIdWUgLyA2MCk7XG59XG5cbmZ1bmN0aW9uIGFuYWx5emVDb2xvckNhcmRDYW5kaWRhdGUoXG4gIGltYWdlRGF0YTogUGljazxJbWFnZURhdGEsIFwiZGF0YVwiIHwgXCJ3aWR0aFwiIHwgXCJoZWlnaHRcIj4sXG4gIHN0YXJ0WDogbnVtYmVyLFxuICBzdGFydFk6IG51bWJlcixcbiAgcmVnaW9uV2lkdGg6IG51bWJlcixcbiAgcmVnaW9uSGVpZ2h0OiBudW1iZXJcbik6IENvbG9yQ2FyZENhbmRpZGF0ZU1ldHJpY3Mge1xuICBjb25zdCB4MSA9IGNsYW1wKE1hdGguZmxvb3Ioc3RhcnRYKSwgMCwgaW1hZ2VEYXRhLndpZHRoKTtcbiAgY29uc3QgeTEgPSBjbGFtcChNYXRoLmZsb29yKHN0YXJ0WSksIDAsIGltYWdlRGF0YS5oZWlnaHQpO1xuICBjb25zdCB4MiA9IGNsYW1wKE1hdGguY2VpbChzdGFydFggKyByZWdpb25XaWR0aCksIDAsIGltYWdlRGF0YS53aWR0aCk7XG4gIGNvbnN0IHkyID0gY2xhbXAoTWF0aC5jZWlsKHN0YXJ0WSArIHJlZ2lvbkhlaWdodCksIDAsIGltYWdlRGF0YS5oZWlnaHQpO1xuXG4gIGNvbnN0IHNlZ21lbnRDb3VudCA9IDY7XG4gIGNvbnN0IHNlZ21lbnRTdW1zID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogc2VnbWVudENvdW50IH0sICgpID0+ICh7IHJlZDogMCwgZ3JlZW46IDAsIGJsdWU6IDAsIGNvdW50OiAwIH0pKTtcbiAgY29uc3QgaHVlQnVja2V0cyA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuXG4gIGxldCB0b3RhbFBpeGVscyA9IDA7XG4gIGxldCBzYXR1cmF0ZWRQaXhlbHMgPSAwO1xuICBsZXQgbmV1dHJhbFBpeGVscyA9IDA7XG5cbiAgY29uc3Qgc2FmZVdpZHRoID0gTWF0aC5tYXgoMSwgeDIgLSB4MSk7XG5cbiAgZm9yIChsZXQgeSA9IHkxOyB5IDwgeTI7IHkgKz0gMSkge1xuICAgIGZvciAobGV0IHggPSB4MTsgeCA8IHgyOyB4ICs9IDEpIHtcbiAgICAgIGNvbnN0IG9mZnNldCA9ICh5ICogaW1hZ2VEYXRhLndpZHRoICsgeCkgKiA0O1xuICAgICAgY29uc3QgcmVkID0gaW1hZ2VEYXRhLmRhdGFbb2Zmc2V0XSA/PyAwO1xuICAgICAgY29uc3QgZ3JlZW4gPSBpbWFnZURhdGEuZGF0YVtvZmZzZXQgKyAxXSA/PyAwO1xuICAgICAgY29uc3QgYmx1ZSA9IGltYWdlRGF0YS5kYXRhW29mZnNldCArIDJdID8/IDA7XG4gICAgICBjb25zdCBsdW1hID0gcGl4ZWxMdW1hKHJlZCwgZ3JlZW4sIGJsdWUpO1xuICAgICAgY29uc3Qgc2F0dXJhdGlvbiA9IE1hdGgubWF4KHJlZCwgZ3JlZW4sIGJsdWUpIC0gTWF0aC5taW4ocmVkLCBncmVlbiwgYmx1ZSk7XG4gICAgICBjb25zdCBzZWdtZW50SW5kZXggPSBNYXRoLm1pbihzZWdtZW50Q291bnQgLSAxLCBNYXRoLmZsb29yKCgoeCAtIHgxKSAvIHNhZmVXaWR0aCkgKiBzZWdtZW50Q291bnQpKTtcbiAgICAgIGNvbnN0IHNlZ21lbnQgPSBzZWdtZW50U3Vtc1tzZWdtZW50SW5kZXhdO1xuXG4gICAgICBzZWdtZW50LnJlZCArPSByZWQ7XG4gICAgICBzZWdtZW50LmdyZWVuICs9IGdyZWVuO1xuICAgICAgc2VnbWVudC5ibHVlICs9IGJsdWU7XG4gICAgICBzZWdtZW50LmNvdW50ICs9IDE7XG5cbiAgICAgIGlmIChzYXR1cmF0aW9uID49IDE4ICYmIGx1bWEgPj0gMjggJiYgbHVtYSA8PSAyNDApIHtcbiAgICAgICAgc2F0dXJhdGVkUGl4ZWxzICs9IDE7XG4gICAgICB9XG4gICAgICBpZiAoc2F0dXJhdGlvbiA8PSAxNiAmJiBsdW1hID49IDQwICYmIGx1bWEgPD0gMjI1KSB7XG4gICAgICAgIG5ldXRyYWxQaXhlbHMgKz0gMTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaHVlQnVja2V0ID0gcmVzb2x2ZUh1ZUJ1Y2tldChyZWQsIGdyZWVuLCBibHVlKTtcbiAgICAgIGlmIChodWVCdWNrZXQgIT09IG51bGwpIHtcbiAgICAgICAgaHVlQnVja2V0cy5hZGQoaHVlQnVja2V0KTtcbiAgICAgIH1cblxuICAgICAgdG90YWxQaXhlbHMgKz0gMTtcbiAgICB9XG4gIH1cblxuICBsZXQgdHJhbnNpdGlvbkNvdW50ID0gMDtcbiAgbGV0IHRyYW5zaXRpb25TdHJlbmd0aCA9IDA7XG4gIGxldCB0cmFuc2l0aW9uU2FtcGxlcyA9IDA7XG5cbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNlZ21lbnRTdW1zLmxlbmd0aCAtIDE7IGluZGV4ICs9IDEpIHtcbiAgICBjb25zdCBjdXJyZW50ID0gc2VnbWVudFN1bXNbaW5kZXhdO1xuICAgIGNvbnN0IG5leHQgPSBzZWdtZW50U3Vtc1tpbmRleCArIDFdO1xuICAgIGlmIChjdXJyZW50LmNvdW50ID09PSAwIHx8IG5leHQuY291bnQgPT09IDApIGNvbnRpbnVlO1xuXG4gICAgY29uc3QgY3VycmVudE1lYW4gPSB7XG4gICAgICByZWQ6IGN1cnJlbnQucmVkIC8gY3VycmVudC5jb3VudCxcbiAgICAgIGdyZWVuOiBjdXJyZW50LmdyZWVuIC8gY3VycmVudC5jb3VudCxcbiAgICAgIGJsdWU6IGN1cnJlbnQuYmx1ZSAvIGN1cnJlbnQuY291bnQsXG4gICAgfTtcbiAgICBjb25zdCBuZXh0TWVhbiA9IHtcbiAgICAgIHJlZDogbmV4dC5yZWQgLyBuZXh0LmNvdW50LFxuICAgICAgZ3JlZW46IG5leHQuZ3JlZW4gLyBuZXh0LmNvdW50LFxuICAgICAgYmx1ZTogbmV4dC5ibHVlIC8gbmV4dC5jb3VudCxcbiAgICB9O1xuXG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IGNvbG9yRGlzdGFuY2UoY3VycmVudE1lYW4sIG5leHRNZWFuKTtcbiAgICBpZiAoZGlmZmVyZW5jZSA+PSAyNCkge1xuICAgICAgdHJhbnNpdGlvbkNvdW50ICs9IDE7XG4gICAgfVxuICAgIHRyYW5zaXRpb25TdHJlbmd0aCArPSBkaWZmZXJlbmNlO1xuICAgIHRyYW5zaXRpb25TYW1wbGVzICs9IDE7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGJ1Y2tldENvdW50OiBodWVCdWNrZXRzLnNpemUsXG4gICAgdHJhbnNpdGlvbkNvdW50LFxuICAgIHNhdHVyYXRlZFNoYXJlOiB0b3RhbFBpeGVscyA+IDAgPyBzYXR1cmF0ZWRQaXhlbHMgLyB0b3RhbFBpeGVscyA6IDAsXG4gICAgbmV1dHJhbFNoYXJlOiB0b3RhbFBpeGVscyA+IDAgPyBuZXV0cmFsUGl4ZWxzIC8gdG90YWxQaXhlbHMgOiAwLFxuICAgIGNvbnRyYXN0OiB0cmFuc2l0aW9uU2FtcGxlcyA+IDAgPyB0cmFuc2l0aW9uU3RyZW5ndGggLyB0cmFuc2l0aW9uU2FtcGxlcyA6IDAsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGJ1aWxkQ29sb3JDYXJkRGV0ZWN0aW9uKFxuICBpbWFnZURhdGE6IFBpY2s8SW1hZ2VEYXRhLCBcImRhdGFcIiB8IFwid2lkdGhcIiB8IFwiaGVpZ2h0XCI+LFxuICBmYWNlU2lnbmFsOiBGYWNlU2lnbmFsXG4pOiBMaXZlQ29sb3JDYXJkR3VpZGFuY2Uge1xuICBpZiAoIWZhY2VTaWduYWwuZGV0ZWN0ZWQgfHwgZmFjZVNpZ25hbC5mYWNlQm91bmRzID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogXCJibG9ja2VkXCIsXG4gICAgICBzY29yZTogMCxcbiAgICAgIGRldGVjdGVkOiBmYWxzZSxcbiAgICAgIGxhYmVsOiBcIk15U2tpbkNvZGUgQ29sb3IgQ2FyZFwiLFxuICAgICAgdmFsdWU6IFwiTmFqcGllcncgdXN0YXcgdHdhcnpcIixcbiAgICAgIHN1bW1hcnk6IFwiV3NrYcW6bmlrIGthcnR5IGthbGlicmFjeWpuZWogcG9qYXdpIHNpxJksIGdkeSB0d2FyeiBixJlkemllIGN6eXRlbG5pZSB3aWRvY3puYSB3IGthZHJ6ZS5cIixcbiAgICAgIG1lc3NhZ2U6IFwiTmFqcGllcncgdXN0YXcgdHdhcnogY2VudHJhbG5pZSwgYSBwb3RlbSBwb2thxbwga2FydMSZIHBvZCBicm9kxIUuXCIsXG4gICAgICBhbGlnbm1lbnQ6IDAsXG4gICAgICBwYWxldHRlVmFyaWV0eTogMCxcbiAgICAgIGNvbnRyYXN0UGF0dGVybjogMCxcbiAgICAgIGJvdW5kczogbnVsbCxcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgZmFjZUxlZnQgPSBmYWNlU2lnbmFsLmZhY2VCb3VuZHMubGVmdCAqIGltYWdlRGF0YS53aWR0aDtcbiAgY29uc3QgZmFjZVRvcCA9IGZhY2VTaWduYWwuZmFjZUJvdW5kcy50b3AgKiBpbWFnZURhdGEuaGVpZ2h0O1xuICBjb25zdCBmYWNlV2lkdGggPSBmYWNlU2lnbmFsLmZhY2VCb3VuZHMud2lkdGggKiBpbWFnZURhdGEud2lkdGg7XG4gIGNvbnN0IGZhY2VIZWlnaHQgPSBmYWNlU2lnbmFsLmZhY2VCb3VuZHMuaGVpZ2h0ICogaW1hZ2VEYXRhLmhlaWdodDtcbiAgY29uc3QgZmFjZUNlbnRlclggPSBmYWNlTGVmdCArIGZhY2VXaWR0aCAvIDI7XG4gIGNvbnN0IGphd0FuY2hvclkgPSBmYWNlVG9wICsgZmFjZUhlaWdodCAqIDAuODI7XG5cbiAgY29uc3QgcmVnaW9uV2lkdGggPSBjbGFtcChNYXRoLnJvdW5kKGZhY2VXaWR0aCAqIDAuNzQpLCAxOCwgTWF0aC5yb3VuZChpbWFnZURhdGEud2lkdGggKiAwLjc2KSk7XG4gIGNvbnN0IHJlZ2lvbkhlaWdodCA9IGNsYW1wKE1hdGgucm91bmQoZmFjZUhlaWdodCAqIDAuMiksIDEyLCBNYXRoLnJvdW5kKGltYWdlRGF0YS5oZWlnaHQgKiAwLjIyKSk7XG4gIGNvbnN0IGlkZWFsVG9wID0gamF3QW5jaG9yWSArIGZhY2VIZWlnaHQgKiAwLjE0O1xuICBjb25zdCB4T2Zmc2V0cyA9IFstMC4xNiwgLTAuMDgsIDAsIDAuMDgsIDAuMTZdO1xuICBjb25zdCB5T2Zmc2V0cyA9IFstMC4wNCwgMC4wMiwgMC4wOCwgMC4xNCwgMC4yXTtcblxuICBsZXQgYmVzdENhbmRpZGF0ZTpcbiAgICB8IHtcbiAgICAgIHNjb3JlOiBudW1iZXI7XG4gICAgICBhbGlnbm1lbnQ6IG51bWJlcjtcbiAgICAgIHBhbGV0dGVWYXJpZXR5OiBudW1iZXI7XG4gICAgICBjb250cmFzdFBhdHRlcm46IG51bWJlcjtcbiAgICAgIGJ1Y2tldENvdW50OiBudW1iZXI7XG4gICAgICB0cmFuc2l0aW9uQ291bnQ6IG51bWJlcjtcbiAgICAgIHNhdHVyYXRlZFNoYXJlOiBudW1iZXI7XG4gICAgICBuZXV0cmFsU2hhcmU6IG51bWJlcjtcbiAgICAgIGJvdW5kczogeyBsZWZ0OiBudW1iZXI7IHRvcDogbnVtYmVyOyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlciB9O1xuICAgIH1cbiAgICB8IG51bGwgPSBudWxsO1xuXG4gIGZvciAoY29uc3QgeE9mZnNldCBvZiB4T2Zmc2V0cykge1xuICAgIGZvciAoY29uc3QgeU9mZnNldCBvZiB5T2Zmc2V0cykge1xuICAgICAgY29uc3QgbGVmdCA9IGNsYW1wKE1hdGgucm91bmQoZmFjZUNlbnRlclggLSByZWdpb25XaWR0aCAvIDIgKyB4T2Zmc2V0ICogZmFjZVdpZHRoKSwgMCwgTWF0aC5tYXgoMCwgaW1hZ2VEYXRhLndpZHRoIC0gcmVnaW9uV2lkdGgpKTtcbiAgICAgIGNvbnN0IHRvcCA9IGNsYW1wKE1hdGgucm91bmQoamF3QW5jaG9yWSArIHlPZmZzZXQgKiBmYWNlSGVpZ2h0KSwgMCwgTWF0aC5tYXgoMCwgaW1hZ2VEYXRhLmhlaWdodCAtIHJlZ2lvbkhlaWdodCkpO1xuXG4gICAgICBjb25zdCBtZXRyaWNzID0gYW5hbHl6ZUNvbG9yQ2FyZENhbmRpZGF0ZShpbWFnZURhdGEsIGxlZnQsIHRvcCwgcmVnaW9uV2lkdGgsIHJlZ2lvbkhlaWdodCk7XG4gICAgICBjb25zdCBjZW50ZXJBbGlnbm1lbnQgPSAxIC0gTWF0aC5taW4oTWF0aC5hYnMobGVmdCArIHJlZ2lvbldpZHRoIC8gMiAtIGZhY2VDZW50ZXJYKSAvIE1hdGgubWF4KGZhY2VXaWR0aCAqIDAuNDgsIDEpLCAxKTtcbiAgICAgIGNvbnN0IHZlcnRpY2FsQWxpZ25tZW50ID0gMSAtIE1hdGgubWluKE1hdGguYWJzKHRvcCAtIGlkZWFsVG9wKSAvIE1hdGgubWF4KGZhY2VIZWlnaHQgKiAwLjE4LCAxKSwgMSk7XG4gICAgICBjb25zdCBhbGlnbm1lbnQgPSBjbGFtcChjZW50ZXJBbGlnbm1lbnQgKiAwLjYyICsgdmVydGljYWxBbGlnbm1lbnQgKiAwLjM4LCAwLCAxKTtcbiAgICAgIGNvbnN0IHBhbGV0dGVWYXJpZXR5ID0gY2xhbXAoKG1ldHJpY3MuYnVja2V0Q291bnQgLSAxKSAvIDMsIDAsIDEpO1xuICAgICAgY29uc3QgdHJhbnNpdGlvblBhdHRlcm4gPSBjbGFtcChtZXRyaWNzLnRyYW5zaXRpb25Db3VudCAvIDQsIDAsIDEpO1xuICAgICAgY29uc3Qgc2F0dXJhdGlvbkJhbGFuY2UgPSAxIC0gTWF0aC5taW4oTWF0aC5hYnMobWV0cmljcy5zYXR1cmF0ZWRTaGFyZSAtIDAuNDIpIC8gMC40MiwgMSk7XG4gICAgICBjb25zdCBuZXV0cmFsQmFsYW5jZSA9IDEgLSBNYXRoLm1pbihNYXRoLmFicyhtZXRyaWNzLm5ldXRyYWxTaGFyZSAtIDAuMjQpIC8gMC4yNCwgMSk7XG4gICAgICBjb25zdCBjb250cmFzdFBhdHRlcm4gPSBjbGFtcChtZXRyaWNzLmNvbnRyYXN0IC8gNDIsIDAsIDEpO1xuICAgICAgY29uc3Qgc2NvcmUgPSBNYXRoLnJvdW5kKFxuICAgICAgICAocGFsZXR0ZVZhcmlldHkgKiAwLjI4ICtcbiAgICAgICAgICB0cmFuc2l0aW9uUGF0dGVybiAqIDAuMjIgK1xuICAgICAgICAgIHNhdHVyYXRpb25CYWxhbmNlICogMC4xNiArXG4gICAgICAgICAgbmV1dHJhbEJhbGFuY2UgKiAwLjEyICtcbiAgICAgICAgICBjb250cmFzdFBhdHRlcm4gKiAwLjEyICtcbiAgICAgICAgICBhbGlnbm1lbnQgKiAwLjEpICpcbiAgICAgICAgICAxMDBcbiAgICAgICk7XG5cbiAgICAgIGlmICghYmVzdENhbmRpZGF0ZSB8fCBzY29yZSA+IGJlc3RDYW5kaWRhdGUuc2NvcmUpIHtcbiAgICAgICAgYmVzdENhbmRpZGF0ZSA9IHtcbiAgICAgICAgICBzY29yZSxcbiAgICAgICAgICBhbGlnbm1lbnQsXG4gICAgICAgICAgcGFsZXR0ZVZhcmlldHksXG4gICAgICAgICAgY29udHJhc3RQYXR0ZXJuLFxuICAgICAgICAgIGJ1Y2tldENvdW50OiBtZXRyaWNzLmJ1Y2tldENvdW50LFxuICAgICAgICAgIHRyYW5zaXRpb25Db3VudDogbWV0cmljcy50cmFuc2l0aW9uQ291bnQsXG4gICAgICAgICAgc2F0dXJhdGVkU2hhcmU6IG1ldHJpY3Muc2F0dXJhdGVkU2hhcmUsXG4gICAgICAgICAgbmV1dHJhbFNoYXJlOiBtZXRyaWNzLm5ldXRyYWxTaGFyZSxcbiAgICAgICAgICBib3VuZHM6IHtcbiAgICAgICAgICAgIGxlZnQ6IGxlZnQgLyBpbWFnZURhdGEud2lkdGgsXG4gICAgICAgICAgICB0b3A6IHRvcCAvIGltYWdlRGF0YS5oZWlnaHQsXG4gICAgICAgICAgICB3aWR0aDogcmVnaW9uV2lkdGggLyBpbWFnZURhdGEud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlZ2lvbkhlaWdodCAvIGltYWdlRGF0YS5oZWlnaHQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoIWJlc3RDYW5kaWRhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiBcImJsb2NrZWRcIixcbiAgICAgIHNjb3JlOiAwLFxuICAgICAgZGV0ZWN0ZWQ6IGZhbHNlLFxuICAgICAgbGFiZWw6IFwiTXlTa2luQ29kZSBDb2xvciBDYXJkXCIsXG4gICAgICB2YWx1ZTogXCJLYXJ0YSBuaWV3aWRvY3puYVwiLFxuICAgICAgc3VtbWFyeTogXCJOaWUgdWRhxYJvIHNpxJkgb2NlbmnEhyBwb8WCb8W8ZW5pYSBrYXJ0eSBrYWxpYnJhY3lqbmVqIHcgdHltIGthZHJ6ZS5cIixcbiAgICAgIG1lc3NhZ2U6IFwiUG9rYcW8IGthcnTEmSB3eXJhxbpuaWUgcG9kIGJyb2TEhSBpIHNraWVydWogasSFIHByem9kZW0gZG8gYXBhcmF0dS5cIixcbiAgICAgIGFsaWdubWVudDogMCxcbiAgICAgIHBhbGV0dGVWYXJpZXR5OiAwLFxuICAgICAgY29udHJhc3RQYXR0ZXJuOiAwLFxuICAgICAgYm91bmRzOiBudWxsLFxuICAgIH07XG4gIH1cblxuICBjb25zdCBzdGF0dXM6IExpdmVHdWlkYW5jZVN0YXR1cyA9IGJlc3RDYW5kaWRhdGUuc2NvcmUgPj0gNzggPyBcInJlYWR5XCIgOiBiZXN0Q2FuZGlkYXRlLnNjb3JlID49IDQ4ID8gXCJ3YXJuaW5nXCIgOiBcImJsb2NrZWRcIjtcbiAgY29uc3QgZGV0ZWN0ZWQgPSBiZXN0Q2FuZGlkYXRlLnNjb3JlID49IDQ4O1xuICBjb25zdCB2YWx1ZSA9XG4gICAgc3RhdHVzID09PSBcInJlYWR5XCJcbiAgICAgID8gXCJLYXJ0YSB3eWtyeXRhIHN0YWJpbG5pZVwiXG4gICAgICA6IHN0YXR1cyA9PT0gXCJ3YXJuaW5nXCJcbiAgICAgICAgPyBcIkthcnRhIGN6xJnFm2Npb3dvIHdpZG9jem5hXCJcbiAgICAgICAgOiBcIkthcnRhIG5pZXdpZG9jem5hXCI7XG4gIGNvbnN0IHN1bW1hcnkgPVxuICAgIHN0YXR1cyA9PT0gXCJyZWFkeVwiXG4gICAgICA/IFwiTXlTa2luQ29kZSBDb2xvciBDYXJkIGplc3QgY3p5dGVsbmllIHdpZG9jem5hIHBvZCBicm9kxIUgaSBtb8W8ZSBwZcWCbmnEhyByb2zEmSByZWZlcmVuY2ppIGtvbG9yeXN0eWN6bmVqLlwiXG4gICAgICA6IHN0YXR1cyA9PT0gXCJ3YXJuaW5nXCJcbiAgICAgICAgPyBcIldpZGHEhyBjesSZxZvEhyBNeVNraW5Db2RlIENvbG9yIENhcmQsIGFsZSBqZWogcG96eWNqYSBsdWIgY3p5dGVsbm/Fm8SHIG1vxbxlIGJ5xIcgemEgc8WCYWJhIGRvIHBlxYJuZWoga2FsaWJyYWNqaS5cIlxuICAgICAgICA6IFwiTmllIHdpZHrEmSB3eXN0YXJjemFqxIVjbyBjenl0ZWxuZWogTXlTa2luQ29kZSBDb2xvciBDYXJkIHBvZCBicm9kxIUsIHdpxJljIGthbGlicmFjamEga29sb3J1IGLEmWR6aWUgbW5pZWogd2lhcnlnb2RuYS5cIjtcblxuICBsZXQgbWVzc2FnZSA9IFwiVXRyenltYWoga2FydMSZIG5pZXJ1Y2hvbW8gaSByw7N3bm9sZWdsZSBkbyBsaW5paSDFvHVjaHd5IHBvZGN6YXMgd3lrb255d2FuaWEgemRqxJljaWEuXCI7XG4gIGlmICghZGV0ZWN0ZWQpIHtcbiAgICBtZXNzYWdlID0gXCJQb2thxbwga2FydMSZIHd5cmHFum5pZSBwb2QgYnJvZMSFIGkgc2tpZXJ1aiBqxIUgcHJ6b2RlbSBkbyBhcGFyYXR1LlwiO1xuICB9IGVsc2UgaWYgKGJlc3RDYW5kaWRhdGUuYWxpZ25tZW50IDwgMC41NSkge1xuICAgIG1lc3NhZ2UgPSBcIlByemVzdcWEIGthcnTEmSBibGnFvGVqIMWbcm9ka2EgcG9kIGJyb2TEhSwgYWJ5IGFsZ29yeXRtIG3Ds2fFgiBsZXBpZWogdWNod3ljacSHIHJlZmVyZW5jasSZIGtvbG9yeXN0eWN6bsSFLlwiO1xuICB9IGVsc2UgaWYgKGJlc3RDYW5kaWRhdGUuYnVja2V0Q291bnQgPCAzIHx8IGJlc3RDYW5kaWRhdGUudHJhbnNpdGlvbkNvdW50IDwgMikge1xuICAgIG1lc3NhZ2UgPSBcIlBva2HFvCBjYcWCeSBwcnrDs2Qga2FydHkgaSBuaWUgemFzxYJhbmlhaiBww7NsIGJhcndueWNoIHBhbGNhbWkgYW5pIGNpZW5pZW0gcG9kIGJyb2TEhS5cIjtcbiAgfSBlbHNlIGlmIChiZXN0Q2FuZGlkYXRlLnNhdHVyYXRlZFNoYXJlIDwgMC4xOCB8fCBiZXN0Q2FuZGlkYXRlLmNvbnRyYXN0UGF0dGVybiA8IDAuMzQpIHtcbiAgICBtZXNzYWdlID0gXCJQcnplY2h5bCBrYXJ0xJkgZGVsaWthdG5pZSBkbyDFm3dpYXTFgmEsIGFieSBrb2xvcm93ZSBwb2xhIGJ5xYJ5IGN6eXRlbG5pZWpzemUgZGxhIGthbWVyeS5cIjtcbiAgfSBlbHNlIGlmIChzdGF0dXMgPT09IFwicmVhZHlcIikge1xuICAgIG1lc3NhZ2UgPSBcIkthcnRhIHd5Z2zEhWRhIGRvYnJ6ZSDigJQgbW/FvGVzeiB1dHJ6eW1hxIcgasSFIHcgdHltIG1pZWpzY3UgcG9kY3phcyB6ZGrEmWNpYSByZWZlcmVuY3lqbmVnby5cIjtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc3RhdHVzLFxuICAgIHNjb3JlOiBiZXN0Q2FuZGlkYXRlLnNjb3JlLFxuICAgIGRldGVjdGVkLFxuICAgIGxhYmVsOiBcIk15U2tpbkNvZGUgQ29sb3IgQ2FyZFwiLFxuICAgIHZhbHVlLFxuICAgIHN1bW1hcnksXG4gICAgbWVzc2FnZSxcbiAgICBhbGlnbm1lbnQ6IE1hdGgucm91bmQoYmVzdENhbmRpZGF0ZS5hbGlnbm1lbnQgKiAxMDApLFxuICAgIHBhbGV0dGVWYXJpZXR5OiBNYXRoLnJvdW5kKGJlc3RDYW5kaWRhdGUucGFsZXR0ZVZhcmlldHkgKiAxMDApLFxuICAgIGNvbnRyYXN0UGF0dGVybjogTWF0aC5yb3VuZChiZXN0Q2FuZGlkYXRlLmNvbnRyYXN0UGF0dGVybiAqIDEwMCksXG4gICAgYm91bmRzOiB7XG4gICAgICBsZWZ0OiByb3VuZChiZXN0Q2FuZGlkYXRlLmJvdW5kcy5sZWZ0LCAzKSxcbiAgICAgIHRvcDogcm91bmQoYmVzdENhbmRpZGF0ZS5ib3VuZHMudG9wLCAzKSxcbiAgICAgIHdpZHRoOiByb3VuZChiZXN0Q2FuZGlkYXRlLmJvdW5kcy53aWR0aCwgMyksXG4gICAgICBoZWlnaHQ6IHJvdW5kKGJlc3RDYW5kaWRhdGUuYm91bmRzLmhlaWdodCwgMyksXG4gICAgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2FtcGxlTWVhbkNvbG9yKFxuICBpbWFnZURhdGE6IFBpY2s8SW1hZ2VEYXRhLCBcImRhdGFcIiB8IFwid2lkdGhcIiB8IFwiaGVpZ2h0XCI+LFxuICBzdGFydFg6IG51bWJlcixcbiAgZW5kWDogbnVtYmVyLFxuICBzdGFydFk6IG51bWJlcixcbiAgZW5kWTogbnVtYmVyLFxuICBwcmVmZXJTa2luID0gZmFsc2Vcbik6IE1lYW5Db2xvclNhbXBsZSB7XG4gIGNvbnN0IHgxID0gY2xhbXAoTWF0aC5mbG9vcihzdGFydFgpLCAwLCBpbWFnZURhdGEud2lkdGgpO1xuICBjb25zdCB4MiA9IGNsYW1wKE1hdGguY2VpbChlbmRYKSwgMCwgaW1hZ2VEYXRhLndpZHRoKTtcbiAgY29uc3QgeTEgPSBjbGFtcChNYXRoLmZsb29yKHN0YXJ0WSksIDAsIGltYWdlRGF0YS5oZWlnaHQpO1xuICBjb25zdCB5MiA9IGNsYW1wKE1hdGguY2VpbChlbmRZKSwgMCwgaW1hZ2VEYXRhLmhlaWdodCk7XG5cbiAgbGV0IHRvdGFsUmVkID0gMDtcbiAgbGV0IHRvdGFsR3JlZW4gPSAwO1xuICBsZXQgdG90YWxCbHVlID0gMDtcbiAgbGV0IHRvdGFsTHVtYSA9IDA7XG4gIGxldCB0b3RhbFNhbXBsZXMgPSAwO1xuXG4gIGxldCBza2luUmVkID0gMDtcbiAgbGV0IHNraW5HcmVlbiA9IDA7XG4gIGxldCBza2luQmx1ZSA9IDA7XG4gIGxldCBza2luTHVtYSA9IDA7XG4gIGxldCBza2luU2FtcGxlcyA9IDA7XG5cbiAgZm9yIChsZXQgeSA9IHkxOyB5IDwgeTI7IHkgKz0gMSkge1xuICAgIGZvciAobGV0IHggPSB4MTsgeCA8IHgyOyB4ICs9IDEpIHtcbiAgICAgIGNvbnN0IG9mZnNldCA9ICh5ICogaW1hZ2VEYXRhLndpZHRoICsgeCkgKiA0O1xuICAgICAgY29uc3QgcmVkID0gaW1hZ2VEYXRhLmRhdGFbb2Zmc2V0XSA/PyAwO1xuICAgICAgY29uc3QgZ3JlZW4gPSBpbWFnZURhdGEuZGF0YVtvZmZzZXQgKyAxXSA/PyAwO1xuICAgICAgY29uc3QgYmx1ZSA9IGltYWdlRGF0YS5kYXRhW29mZnNldCArIDJdID8/IDA7XG4gICAgICBjb25zdCBsdW1hID0gcGl4ZWxMdW1hKHJlZCwgZ3JlZW4sIGJsdWUpO1xuXG4gICAgICB0b3RhbFJlZCArPSByZWQ7XG4gICAgICB0b3RhbEdyZWVuICs9IGdyZWVuO1xuICAgICAgdG90YWxCbHVlICs9IGJsdWU7XG4gICAgICB0b3RhbEx1bWEgKz0gbHVtYTtcbiAgICAgIHRvdGFsU2FtcGxlcyArPSAxO1xuXG4gICAgICBpZiAoaXNMaWtlbHlTa2luUGl4ZWwocmVkLCBncmVlbiwgYmx1ZSkpIHtcbiAgICAgICAgc2tpblJlZCArPSByZWQ7XG4gICAgICAgIHNraW5HcmVlbiArPSBncmVlbjtcbiAgICAgICAgc2tpbkJsdWUgKz0gYmx1ZTtcbiAgICAgICAgc2tpbkx1bWEgKz0gbHVtYTtcbiAgICAgICAgc2tpblNhbXBsZXMgKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAocHJlZmVyU2tpbiAmJiBza2luU2FtcGxlcyA+PSBNYXRoLm1heCgyNCwgdG90YWxTYW1wbGVzICogMC4xOCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVkOiBza2luUmVkIC8gc2tpblNhbXBsZXMsXG4gICAgICBncmVlbjogc2tpbkdyZWVuIC8gc2tpblNhbXBsZXMsXG4gICAgICBibHVlOiBza2luQmx1ZSAvIHNraW5TYW1wbGVzLFxuICAgICAgbHVtYTogc2tpbkx1bWEgLyBza2luU2FtcGxlcyxcbiAgICAgIHNhbXBsZXM6IHNraW5TYW1wbGVzLFxuICAgIH07XG4gIH1cblxuICBpZiAodG90YWxTYW1wbGVzID09PSAwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlZDogMCxcbiAgICAgIGdyZWVuOiAwLFxuICAgICAgYmx1ZTogMCxcbiAgICAgIGx1bWE6IDAsXG4gICAgICBzYW1wbGVzOiAwLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlZDogdG90YWxSZWQgLyB0b3RhbFNhbXBsZXMsXG4gICAgZ3JlZW46IHRvdGFsR3JlZW4gLyB0b3RhbFNhbXBsZXMsXG4gICAgYmx1ZTogdG90YWxCbHVlIC8gdG90YWxTYW1wbGVzLFxuICAgIGx1bWE6IHRvdGFsTHVtYSAvIHRvdGFsU2FtcGxlcyxcbiAgICBzYW1wbGVzOiB0b3RhbFNhbXBsZXMsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGJ1aWxkTGlnaHRDb2xvckFzc2Vzc21lbnQoXG4gIGltYWdlRGF0YTogUGljazxJbWFnZURhdGEsIFwiZGF0YVwiIHwgXCJ3aWR0aFwiIHwgXCJoZWlnaHRcIj4sXG4gIGZhY2VTaWduYWw6IEZhY2VTaWduYWwsXG4gIGNvbG9yQ2FyZDogTGl2ZUNvbG9yQ2FyZEd1aWRhbmNlXG4pOiBMaXZlTGlnaHRDb2xvckFzc2Vzc21lbnQge1xuICBpZiAoIWZhY2VTaWduYWwuZGV0ZWN0ZWQgfHwgZmFjZVNpZ25hbC5mYWNlQm91bmRzID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogXCJibG9ja2VkXCIsXG4gICAgICBjb2xvckNhc3Q6IFwibmV1dHJhbFwiLFxuICAgICAgY2FzdFN0cmVuZ3RoOiAwLFxuICAgICAgc2NvcmU6IDAsXG4gICAgICBsYWJlbDogXCJCYXJ3YSDFm3dpYXTFgmFcIixcbiAgICAgIHZhbHVlOiBcIk5hanBpZXJ3IHVzdGF3IHR3YXJ6XCIsXG4gICAgICBtZXNzYWdlOiBcIk5hanBpZXJ3IHVzdGF3IHR3YXJ6IGNlbnRyYWxuaWUsIGFieW0gbcOzZ8WCIG9jZW5pxIcgYmFyd8SZIGkgcsOzd25vbWllcm5vxZvEhyDFm3dpYXTFgmEgbmEgc2vDs3J6ZS5cIixcbiAgICAgIGNvbG9yVGVtcGVyYXR1cmU6IHtcbiAgICAgICAga2VsdmluOiBudWxsLFxuICAgICAgICBkZXNjcmlwdG9yOiBcIm5pZW9rcmXFm2xvbmFcIixcbiAgICAgICAgaXNDbGluaWNhbGx5T3B0aW1hbDogZmFsc2UsXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBjb25zdCBmYWNlTGVmdCA9IGZhY2VTaWduYWwuZmFjZUJvdW5kcy5sZWZ0ICogaW1hZ2VEYXRhLndpZHRoO1xuICBjb25zdCBmYWNlVG9wID0gZmFjZVNpZ25hbC5mYWNlQm91bmRzLnRvcCAqIGltYWdlRGF0YS5oZWlnaHQ7XG4gIGNvbnN0IGZhY2VXaWR0aCA9IGZhY2VTaWduYWwuZmFjZUJvdW5kcy53aWR0aCAqIGltYWdlRGF0YS53aWR0aDtcbiAgY29uc3QgZmFjZUhlaWdodCA9IGZhY2VTaWduYWwuZmFjZUJvdW5kcy5oZWlnaHQgKiBpbWFnZURhdGEuaGVpZ2h0O1xuXG4gIGNvbnN0IGxlZnRDaGVlayA9IHNhbXBsZU1lYW5Db2xvcihcbiAgICBpbWFnZURhdGEsXG4gICAgZmFjZUxlZnQgKyBmYWNlV2lkdGggKiAwLjA4LFxuICAgIGZhY2VMZWZ0ICsgZmFjZVdpZHRoICogMC4zNixcbiAgICBmYWNlVG9wICsgZmFjZUhlaWdodCAqIDAuMzQsXG4gICAgZmFjZVRvcCArIGZhY2VIZWlnaHQgKiAwLjc4LFxuICAgIHRydWVcbiAgKTtcbiAgY29uc3QgY2VudGVyRmFjZSA9IHNhbXBsZU1lYW5Db2xvcihcbiAgICBpbWFnZURhdGEsXG4gICAgZmFjZUxlZnQgKyBmYWNlV2lkdGggKiAwLjM0LFxuICAgIGZhY2VMZWZ0ICsgZmFjZVdpZHRoICogMC42NixcbiAgICBmYWNlVG9wICsgZmFjZUhlaWdodCAqIDAuMjQsXG4gICAgZmFjZVRvcCArIGZhY2VIZWlnaHQgKiAwLjc0LFxuICAgIHRydWVcbiAgKTtcbiAgY29uc3QgcmlnaHRDaGVlayA9IHNhbXBsZU1lYW5Db2xvcihcbiAgICBpbWFnZURhdGEsXG4gICAgZmFjZUxlZnQgKyBmYWNlV2lkdGggKiAwLjY0LFxuICAgIGZhY2VMZWZ0ICsgZmFjZVdpZHRoICogMC45MixcbiAgICBmYWNlVG9wICsgZmFjZUhlaWdodCAqIDAuMzQsXG4gICAgZmFjZVRvcCArIGZhY2VIZWlnaHQgKiAwLjc4LFxuICAgIHRydWVcbiAgKTtcbiAgY29uc3QgZm9yZWhlYWQgPSBzYW1wbGVNZWFuQ29sb3IoXG4gICAgaW1hZ2VEYXRhLFxuICAgIGZhY2VMZWZ0ICsgZmFjZVdpZHRoICogMC4yMixcbiAgICBmYWNlTGVmdCArIGZhY2VXaWR0aCAqIDAuNzgsXG4gICAgZmFjZVRvcCArIGZhY2VIZWlnaHQgKiAwLjEyLFxuICAgIGZhY2VUb3AgKyBmYWNlSGVpZ2h0ICogMC4zNCxcbiAgICB0cnVlXG4gICk7XG5cbiAgY29uc3QgcmVnaW9ucyA9IFtsZWZ0Q2hlZWssIGNlbnRlckZhY2UsIHJpZ2h0Q2hlZWssIGZvcmVoZWFkXS5maWx0ZXIocmVnaW9uID0+IHJlZ2lvbi5zYW1wbGVzID4gMCk7XG4gIGNvbnN0IGF2ZXJhZ2VXYXJtdGggPVxuICAgIHJlZ2lvbnMucmVkdWNlKChzdW0sIHJlZ2lvbikgPT4gc3VtICsgKHJlZ2lvbi5yZWQgLSByZWdpb24uYmx1ZSkgLyBNYXRoLm1heChyZWdpb24ubHVtYSwgMSksIDApIC8gTWF0aC5tYXgocmVnaW9ucy5sZW5ndGgsIDEpO1xuICBjb25zdCB3YXJtdGhWYWx1ZXMgPSByZWdpb25zLm1hcChyZWdpb24gPT4gKHJlZ2lvbi5yZWQgLSByZWdpb24uYmx1ZSkgLyBNYXRoLm1heChyZWdpb24ubHVtYSwgMSkpO1xuICBjb25zdCB3YXJtdGhTcGFuID0gd2FybXRoVmFsdWVzLmxlbmd0aCA+IDAgPyBNYXRoLm1heCguLi53YXJtdGhWYWx1ZXMpIC0gTWF0aC5taW4oLi4ud2FybXRoVmFsdWVzKSA6IDA7XG4gIGNvbnN0IGxlZnRSaWdodFdhcm10aERlbHRhID0gTWF0aC5hYnMoKGxlZnRDaGVlay5yZWQgLSBsZWZ0Q2hlZWsuYmx1ZSkgLyBNYXRoLm1heChsZWZ0Q2hlZWsubHVtYSwgMSkgLSAocmlnaHRDaGVlay5yZWQgLSByaWdodENoZWVrLmJsdWUpIC8gTWF0aC5tYXgocmlnaHRDaGVlay5sdW1hLCAxKSk7XG4gIGNvbnN0IGxlZnRSaWdodENvbG9yRGVsdGEgPSBjb2xvckRpc3RhbmNlKGxlZnRDaGVlaywgcmlnaHRDaGVlayk7XG4gIGNvbnN0IGxlZnRSaWdodEx1bWFEZWx0YSA9IE1hdGguYWJzKGxlZnRDaGVlay5sdW1hIC0gcmlnaHRDaGVlay5sdW1hKTtcblxuICBjb25zdCB3YXJtU2V2ZXJpdHkgPSBjbGFtcCgoYXZlcmFnZVdhcm10aCAtIDAuNDgpIC8gMC4xNiwgMCwgMSk7XG4gIGNvbnN0IGNvb2xTZXZlcml0eSA9IGNsYW1wKCgwLjI5IC0gYXZlcmFnZVdhcm10aCkgLyAwLjE0LCAwLCAxKTtcbiAgY29uc3QgcmVnaW9uQ2FzdFNldCA9IG5ldyBTZXQoXG4gICAgd2FybXRoVmFsdWVzXG4gICAgICAubWFwKHZhbHVlID0+IHtcbiAgICAgICAgaWYgKHZhbHVlID49IDAuNSkgcmV0dXJuIFwid2FybVwiO1xuICAgICAgICBpZiAodmFsdWUgPD0gMC4yOCkgcmV0dXJuIFwiY29vbFwiO1xuICAgICAgICByZXR1cm4gXCJuZXV0cmFsXCI7XG4gICAgICB9KVxuICAgICAgLmZpbHRlcih2YWx1ZSA9PiB2YWx1ZSAhPT0gXCJuZXV0cmFsXCIpXG4gICk7XG4gIGNvbnN0IG1peGVkRGV0ZWN0ZWQgPVxuICAgIHJlZ2lvbkNhc3RTZXQuc2l6ZSA+IDEgfHxcbiAgICAobGVmdFJpZ2h0V2FybXRoRGVsdGEgPiAwLjEyICYmIChsZWZ0UmlnaHRDb2xvckRlbHRhID4gMjIgfHwgbGVmdFJpZ2h0THVtYURlbHRhID4gMTYpKSB8fFxuICAgIGxlZnRSaWdodEx1bWFEZWx0YSA+IDI0O1xuICBjb25zdCBtaXhlZFNldmVyaXR5ID0gbWl4ZWREZXRlY3RlZFxuICAgID8gY2xhbXAoTWF0aC5tYXgoKHdhcm10aFNwYW4gLSAwLjEzKSAvIDAuMTgsIChsZWZ0UmlnaHRDb2xvckRlbHRhIC0gMjIpIC8gMzAsIChsZWZ0UmlnaHRMdW1hRGVsdGEgLSAxNCkgLyAyMCksIDAsIDEpXG4gICAgOiAwO1xuXG4gIGxldCBjb2xvckNhc3Q6IExpdmVMaWdodENvbG9yQ2FzdCA9IFwibmV1dHJhbFwiO1xuICBsZXQgc2V2ZXJpdHkgPSAwO1xuXG4gIGlmIChtaXhlZFNldmVyaXR5ID49IDAuMjgpIHtcbiAgICBjb2xvckNhc3QgPSBcIm1peGVkXCI7XG4gICAgc2V2ZXJpdHkgPSBtaXhlZFNldmVyaXR5O1xuICB9IGVsc2UgaWYgKHdhcm1TZXZlcml0eSA+PSBjb29sU2V2ZXJpdHkgJiYgd2FybVNldmVyaXR5ID49IDAuMTYpIHtcbiAgICBjb2xvckNhc3QgPSBcIndhcm1cIjtcbiAgICBzZXZlcml0eSA9IHdhcm1TZXZlcml0eTtcbiAgfSBlbHNlIGlmIChjb29sU2V2ZXJpdHkgPiB3YXJtU2V2ZXJpdHkgJiYgY29vbFNldmVyaXR5ID49IDAuMTYpIHtcbiAgICBjb2xvckNhc3QgPSBcImNvb2xcIjtcbiAgICBzZXZlcml0eSA9IGNvb2xTZXZlcml0eTtcbiAgfVxuXG4gIGNvbnN0IHN0YXR1czogTGl2ZUd1aWRhbmNlU3RhdHVzID1cbiAgICBjb2xvckNhc3QgPT09IFwibWl4ZWRcIlxuICAgICAgPyBzZXZlcml0eSA+PSAwLjY2XG4gICAgICAgID8gXCJibG9ja2VkXCJcbiAgICAgICAgOiBcIndhcm5pbmdcIlxuICAgICAgOiBjb2xvckNhc3QgPT09IFwibmV1dHJhbFwiXG4gICAgICAgID8gXCJyZWFkeVwiXG4gICAgICAgIDogc2V2ZXJpdHkgPj0gMC43MlxuICAgICAgICAgID8gXCJibG9ja2VkXCJcbiAgICAgICAgICA6IFwid2FybmluZ1wiO1xuXG4gIGNvbnN0IGNvbmZpZGVuY2VCb29zdCA9IGNvbG9yQ2FyZC5kZXRlY3RlZCAmJiBjb2xvckNhcmQuc3RhdHVzID09PSBcInJlYWR5XCIgPyA2IDogY29sb3JDYXJkLmRldGVjdGVkID8gMyA6IDA7XG4gIGNvbnN0IHNjb3JlID0gY2xhbXAoTWF0aC5yb3VuZCgxMDAgLSBzZXZlcml0eSAqIDcwICsgY29uZmlkZW5jZUJvb3N0KSwgMCwgMTAwKTtcbiAgY29uc3QgY2FzdFN0cmVuZ3RoID0gTWF0aC5yb3VuZChzZXZlcml0eSAqIDEwMCk7XG5cbiAgY29uc3QgY2N0U2FtcGxlUmVnaW9uID1cbiAgICBjZW50ZXJGYWNlLnNhbXBsZXMgPj0gMTIwXG4gICAgICA/IGNlbnRlckZhY2VcbiAgICAgIDogcmVnaW9ucy5sZW5ndGggPiAwXG4gICAgICAgID8ge1xuICAgICAgICAgIHJlZDogcmVnaW9ucy5yZWR1Y2UoKHN1bSwgcikgPT4gc3VtICsgci5yZWQgKiByLnNhbXBsZXMsIDApIC8gTWF0aC5tYXgoMSwgcmVnaW9ucy5yZWR1Y2UoKHN1bSwgcikgPT4gc3VtICsgci5zYW1wbGVzLCAwKSksXG4gICAgICAgICAgZ3JlZW46IHJlZ2lvbnMucmVkdWNlKChzdW0sIHIpID0+IHN1bSArIHIuZ3JlZW4gKiByLnNhbXBsZXMsIDApIC8gTWF0aC5tYXgoMSwgcmVnaW9ucy5yZWR1Y2UoKHN1bSwgcikgPT4gc3VtICsgci5zYW1wbGVzLCAwKSksXG4gICAgICAgICAgYmx1ZTogcmVnaW9ucy5yZWR1Y2UoKHN1bSwgcikgPT4gc3VtICsgci5ibHVlICogci5zYW1wbGVzLCAwKSAvIE1hdGgubWF4KDEsIHJlZ2lvbnMucmVkdWNlKChzdW0sIHIpID0+IHN1bSArIHIuc2FtcGxlcywgMCkpLFxuICAgICAgICAgIHNhbXBsZXM6IHJlZ2lvbnMucmVkdWNlKChzdW0sIHIpID0+IHN1bSArIHIuc2FtcGxlcywgMCksXG4gICAgICAgICB9XG4gICAgICAgIDogeyByZWQ6IDAsIGdyZWVuOiAwLCBibHVlOiAwLCBzYW1wbGVzOiAwIH07XG5cbiAgY29uc3Qga2VsdmluID1cbiAgICBjY3RTYW1wbGVSZWdpb24uc2FtcGxlcyA+IDBcbiAgICAgID8gZXN0aW1hdGVDb2xvclRlbXBlcmF0dXJlS2VsdmluKGNjdFNhbXBsZVJlZ2lvbi5yZWQsIGNjdFNhbXBsZVJlZ2lvbi5ncmVlbiwgY2N0U2FtcGxlUmVnaW9uLmJsdWUpXG4gICAgICA6IG51bGw7XG4gIGNvbnN0IGRlc2NyaXB0b3IgPSBkZXNjcmliZUNvbG9yVGVtcGVyYXR1cmUoa2VsdmluKTtcbiAgY29uc3QgaXNDbGluaWNhbGx5T3B0aW1hbCA9XG4gICAga2VsdmluICE9PSBudWxsICYmIGtlbHZpbiA+PSBDTElOSUNBTF9DQ1RfUkFOR0VbMF0gJiYga2VsdmluIDw9IENMSU5JQ0FMX0NDVF9SQU5HRVsxXTtcblxuICBjb25zdCBrZWx2aW5TdWZmaXggPSBrZWx2aW4gIT09IG51bGwgPyBgICh+JHtrZWx2aW59IEspYCA6IFwiXCI7XG5cbiAgY29uc3QgYmFzZVZhbHVlID1cbiAgICBzdGF0dXMgPT09IFwicmVhZHlcIlxuICAgICAgPyBjb2xvckNhcmQuZGV0ZWN0ZWQgJiYgY29sb3JDYXJkLnN0YXR1cyA9PT0gXCJyZWFkeVwiXG4gICAgICAgID8gXCJOZXV0cmFsbmUgaSByw7N3bm9taWVybmVcIlxuICAgICAgICA6IFwiQmFyd2Egd3lnbMSFZGEgcG9wcmF3bmllXCJcbiAgICAgIDogY29sb3JDYXN0ID09PSBcIndhcm1cIlxuICAgICAgICA/IFwixZp3aWF0xYJvIGplc3QgemJ5dCBjaWVwxYJlXCJcbiAgICAgICAgOiBjb2xvckNhc3QgPT09IFwiY29vbFwiXG4gICAgICAgICAgPyBcIsWad2lhdMWCbyBqZXN0IHpieXQgY2jFgm9kbmVcIlxuICAgICAgICAgIDogbGVmdFJpZ2h0THVtYURlbHRhID4gMThcbiAgICAgICAgICAgID8gXCJKZWRuYSBzdHJvbmEgdHdhcnp5IGplc3QgamHFm25pZWpzemFcIlxuICAgICAgICAgICAgOiBcIlcga2FkcnplIG1pZXN6YSBzacSZIMWbd2lhdMWCb1wiO1xuXG4gIGNvbnN0IHZhbHVlID0gYCR7YmFzZVZhbHVlfSR7a2VsdmluU3VmZml4fWA7XG5cbiAgbGV0IG1lc3NhZ2UgPSBcIkJhcndhIMWbd2lhdMWCYSB3eWdsxIVkYSBuZXV0cmFsbmllIGkgbmllIHdpZGHEhyBzaWxuZWogZG9taW5hbnR5IGtvbG9yeXN0eWN6bmVqIG5hIHR3YXJ6eS5cIjtcbiAgaWYgKHN0YXR1cyA9PT0gXCJyZWFkeVwiICYmIGNvbG9yQ2FyZC5kZXRlY3RlZCAmJiBjb2xvckNhcmQuc3RhdHVzID09PSBcInJlYWR5XCIpIHtcbiAgICBtZXNzYWdlID0gXCJCYXJ3YSDFm3dpYXTFgmEgd3lnbMSFZGEgbmV1dHJhbG5pZSwgYSBrYXJ0YSByZWZlcmVuY3lqbmEgcG96b3N0YWplIGN6eXRlbG5hIHcgdHltIHVzdGF3aWVuaXUuXCI7XG4gIH0gZWxzZSBpZiAoY29sb3JDYXN0ID09PSBcIndhcm1cIikge1xuICAgIG1lc3NhZ2UgPVxuICAgICAgc3RhdHVzID09PSBcImJsb2NrZWRcIlxuICAgICAgICA/IFwixZp3aWF0xYJvIGplc3QgbW9jbm8gb2NpZXBsb25lLiBXecWCxIVjeiDFvMOzxYJ0xIUgbGFtcMSZIGFsYm8gdXN0YXcgdHdhcnogYmxpxbxlaiByb3pwcm9zem9uZWdvIMWbd2lhdMWCYSBkemllbm5lZ28gcHJ6ZWQgemRqxJljaWVtLlwiXG4gICAgICAgIDogXCLFmndpYXTFgm8gd3BhZGEgdyBjaWVwxYJ5LCDFvMOzxYJ0eSBvZGNpZcWELiBKZcWbbGkgbW/FvGVzeiwgd3nFgsSFY3ogY2llcMWCxIUgbGFtcMSZIGx1YiBwb2RlamTFuiBkbyBiYXJkemllaiBuZXV0cmFsbmVnbyDFm3dpYXTFgmEuXCI7XG4gIH0gZWxzZSBpZiAoY29sb3JDYXN0ID09PSBcImNvb2xcIikge1xuICAgIG1lc3NhZ2UgPVxuICAgICAgc3RhdHVzID09PSBcImJsb2NrZWRcIlxuICAgICAgICA/IFwixZp3aWF0xYJvIGplc3QgemJ5dCBjaMWCb2RuZS4gWm1pZcWEIG1pZWpzY2UgYWxibyB1c3XFhCBuaWViaWVza2llIMW6csOzZMWCbyDFm3dpYXTFgmEsIGFieSBrb2xvcnkgc2vDs3J5IG5pZSBiecWCeSBwcnpla8WCYW1hbmUuXCJcbiAgICAgICAgOiBcIlcgxZt3aWV0bGUgd2lkYcSHIGNoxYJvZG55LCBuaWViaWVza2F3eSBvZGNpZcWELiBVbmlrYWogbW9jbmVnbyBla3JhbnUgbHViIHppbW5laiBsYW1weSBza2llcm93YW5laiBuYSB0d2Fyei5cIjtcbiAgfSBlbHNlIGlmIChjb2xvckNhc3QgPT09IFwibWl4ZWRcIikge1xuICAgIG1lc3NhZ2UgPVxuICAgICAgbGVmdFJpZ2h0THVtYURlbHRhID4gMThcbiAgICAgICAgPyBcIkplZG5hIHN0cm9uYSB0d2FyenkgamVzdCBvxZt3aWV0bG9uYSBpbmFjemVqIG5pxbwgZHJ1Z2EuIFVzdGF3IHR3YXJ6IGZyb250ZW0gZG8gamVkbmVnbyDFunLDs2TFgmEgxZt3aWF0xYJhIGkgdW5pa2FqIGJvY3puZWogbGFtcHkuXCJcbiAgICAgICAgOiBcIlcga2FkcnplIG1pZXN6YWrEhSBzacSZIHLDs8W8bmUgb2RjaWVuaWUgxZt3aWF0xYJhLiBTdGHFhCBmcm9udGVtIGRvIGplZG5lZ28gxbpyw7NkxYJhIGkgdXN1xYQgZG9kYXRrb3dlIGVrcmFueSBhbGJvIGxhbXB5IHogYm9rdS5cIjtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc3RhdHVzLFxuICAgIGNvbG9yQ2FzdCxcbiAgICBjYXN0U3RyZW5ndGgsXG4gICAgc2NvcmUsXG4gICAgbGFiZWw6IFwiQmFyd2EgxZt3aWF0xYJhXCIsXG4gICAgdmFsdWUsXG4gICAgbWVzc2FnZSxcbiAgICBjb2xvclRlbXBlcmF0dXJlOiB7XG4gICAgICBrZWx2aW4sXG4gICAgICBkZXNjcmlwdG9yLFxuICAgICAgaXNDbGluaWNhbGx5T3B0aW1hbCxcbiAgICB9LFxuICB9O1xufVxuXG5mdW5jdGlvbiBidWlsZExpZ2h0Q29sb3JJbmRpY2F0b3IobGlnaHRDb2xvcjogTGl2ZUxpZ2h0Q29sb3JBc3Nlc3NtZW50KTogTGl2ZUd1aWRhbmNlSW5kaWNhdG9yIHtcbiAgcmV0dXJuIHtcbiAgICBrZXk6IFwibGlnaHRfY29sb3JcIixcbiAgICBsYWJlbDogXCJCYXJ3YVwiLFxuICAgIHN0YXR1czogbGlnaHRDb2xvci5zdGF0dXMsXG4gICAgdmFsdWU6IGxpZ2h0Q29sb3IudmFsdWUsXG4gICAgbWVzc2FnZTogbGlnaHRDb2xvci5tZXNzYWdlLFxuICB9O1xufVxuXG5mdW5jdGlvbiBidWlsZExpZ2h0aW5nSW5kaWNhdG9yKHF1YWxpdHk6IFBob3RvUXVhbGl0eUFzc2Vzc21lbnQsIGRhcmtCYWNrZ3JvdW5kOiBib29sZWFuKTogTGl2ZUd1aWRhbmNlSW5kaWNhdG9yIHtcbiAgY29uc3QgeyBhdmVyYWdlTHVtYSwgY29udHJhc3QsIHNoYXJwbmVzcyB9ID0gcXVhbGl0eS5tZXRyaWNzO1xuXG4gIGNvbnN0IHNldmVyZUV4cG9zdXJlID0gYXZlcmFnZUx1bWEgPCA1OCB8fCBhdmVyYWdlTHVtYSA+IDIzODtcbiAgY29uc3Qgd2Vha0V4cG9zdXJlID0gYXZlcmFnZUx1bWEgPCA5MiB8fCBhdmVyYWdlTHVtYSA+IDIxMDtcbiAgY29uc3Qgc2V2ZXJlQ2xhcml0eSA9IGNvbnRyYXN0IDwgOCB8fCBzaGFycG5lc3MgPCAwLjQ7XG4gIGNvbnN0IHdlYWtDbGFyaXR5ID0gY29udHJhc3QgPCAxOCB8fCBzaGFycG5lc3MgPCAwLjg7XG5cbiAgY29uc3Qgc3RhdHVzOiBMaXZlR3VpZGFuY2VTdGF0dXMgPVxuICAgIHNldmVyZUV4cG9zdXJlIHx8IHNldmVyZUNsYXJpdHkgfHwgZGFya0JhY2tncm91bmQgPyBcImJsb2NrZWRcIiA6IHdlYWtFeHBvc3VyZSB8fCB3ZWFrQ2xhcml0eSA/IFwid2FybmluZ1wiIDogXCJyZWFkeVwiO1xuXG4gIGNvbnN0IHZhbHVlID1cbiAgICBkYXJrQmFja2dyb3VuZCAmJiBzdGF0dXMgPT09IFwiYmxvY2tlZFwiXG4gICAgICA/IFwiVMWCbyBqZXN0IHpieXQgY2llbW5lXCJcbiAgICAgIDogc3RhdHVzID09PSBcInJlYWR5XCJcbiAgICAgICAgPyBcIsWad2lhdMWCbyBzdGFiaWxuZVwiXG4gICAgICAgIDogc3RhdHVzID09PSBcIndhcm5pbmdcIlxuICAgICAgICAgID8gXCJMZWtrbyBza29yeWd1aiB3YXJ1bmtpXCJcbiAgICAgICAgICA6IFwiUG9wcmF3IMWbd2lhdMWCbyBpIHN0YWJpbG5vxZvEh1wiO1xuXG4gIGNvbnN0IG1lc3NhZ2UgPVxuICAgIGRhcmtCYWNrZ3JvdW5kICYmIHN0YXR1cyA9PT0gXCJibG9ja2VkXCJcbiAgICAgID8gXCJUxYJvIHphIHR3YXJ6xIUgamVzdCB6Ynl0IGNpZW1uZS4gUG9kZWpkxbogYmxpxbxlaiBva25hIGFsYm8gdXN0YXcgc2nEmSBuYSBqYcWbbmllanN6eW0gdGxlLCBhYnkga29udHVyeSB0d2FyenkgYnnFgnkgY3p5dGVsbmUuXCJcbiAgICAgIDogc3RhdHVzID09PSBcInJlYWR5XCJcbiAgICAgICAgPyBcIlBvZGdsxIVkIHd5Z2zEhWRhIHd5c3RhcmN6YWrEhWNvIGphc25vIGkgY3p5dGVsbmllIGRvIHd5a29uYW5pYSB6ZGrEmWNpYS5cIlxuICAgICAgICA6IHN0YXR1cyA9PT0gXCJ3YXJuaW5nXCJcbiAgICAgICAgICA/IFwiRG9kYWogb2Ryb2JpbsSZIHdpxJljZWogxZt3aWF0xYJhIGx1YiB1c3RhYmlsaXp1aiB0ZWxlZm9uLCBhYnkgZGV0YWxlIHNrw7NyeSBiecWCeSB3eXJhxbpuaWVqc3plLlwiXG4gICAgICAgICAgOiBcIlByemVqZMW6IGRvIGphxZtuaWVqc3plZ28sIHJvenByb3N6b25lZ28gxZt3aWF0xYJhIGkgemF0cnp5bWFqIHRlbGVmb24gc3RhYmlsbmllaiBwcnplZCB3eWtvbmFuaWVtIHpkasSZY2lhLlwiO1xuXG4gIHJldHVybiB7XG4gICAga2V5OiBcImxpZ2h0aW5nXCIsXG4gICAgbGFiZWw6IFwixZp3aWF0xYJvXCIsXG4gICAgc3RhdHVzLFxuICAgIHZhbHVlLFxuICAgIG1lc3NhZ2UsXG4gIH07XG59XG5cbmZ1bmN0aW9uIHNhbXBsZVJlZ2lvblNraW5Db3ZlcmFnZShcbiAgaW1hZ2VEYXRhOiBQaWNrPEltYWdlRGF0YSwgXCJkYXRhXCIgfCBcIndpZHRoXCIgfCBcImhlaWdodFwiPixcbiAgc3RhcnRYOiBudW1iZXIsXG4gIGVuZFg6IG51bWJlcixcbiAgc3RhcnRZOiBudW1iZXIsXG4gIGVuZFk6IG51bWJlclxuKSB7XG4gIGNvbnN0IHgxID0gY2xhbXAoTWF0aC5mbG9vcihzdGFydFgpLCAwLCBpbWFnZURhdGEud2lkdGgpO1xuICBjb25zdCB4MiA9IGNsYW1wKE1hdGguY2VpbChlbmRYKSwgMCwgaW1hZ2VEYXRhLndpZHRoKTtcbiAgY29uc3QgeTEgPSBjbGFtcChNYXRoLmZsb29yKHN0YXJ0WSksIDAsIGltYWdlRGF0YS5oZWlnaHQpO1xuICBjb25zdCB5MiA9IGNsYW1wKE1hdGguY2VpbChlbmRZKSwgMCwgaW1hZ2VEYXRhLmhlaWdodCk7XG5cbiAgbGV0IHNraW5QaXhlbHMgPSAwO1xuICBsZXQgdG90YWxQaXhlbHMgPSAwO1xuXG4gIGZvciAobGV0IHkgPSB5MTsgeSA8IHkyOyB5ICs9IDEpIHtcbiAgICBmb3IgKGxldCB4ID0geDE7IHggPCB4MjsgeCArPSAxKSB7XG4gICAgICBjb25zdCBvZmZzZXQgPSAoeSAqIGltYWdlRGF0YS53aWR0aCArIHgpICogNDtcbiAgICAgIGNvbnN0IHJlZCA9IGltYWdlRGF0YS5kYXRhW29mZnNldF0gPz8gMDtcbiAgICAgIGNvbnN0IGdyZWVuID0gaW1hZ2VEYXRhLmRhdGFbb2Zmc2V0ICsgMV0gPz8gMDtcbiAgICAgIGNvbnN0IGJsdWUgPSBpbWFnZURhdGEuZGF0YVtvZmZzZXQgKyAyXSA/PyAwO1xuICAgICAgaWYgKGlzTGlrZWx5U2tpblBpeGVsKHJlZCwgZ3JlZW4sIGJsdWUpKSB7XG4gICAgICAgIHNraW5QaXhlbHMgKz0gMTtcbiAgICAgIH1cbiAgICAgIHRvdGFsUGl4ZWxzICs9IDE7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRvdGFsUGl4ZWxzID4gMCA/IHNraW5QaXhlbHMgLyB0b3RhbFBpeGVscyA6IDA7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRmFjZVNpZ25hbChpbWFnZURhdGE6IFBpY2s8SW1hZ2VEYXRhLCBcImRhdGFcIiB8IFwid2lkdGhcIiB8IFwiaGVpZ2h0XCI+KTogRmFjZVNpZ25hbCB7XG4gIGxldCBtaW5YID0gaW1hZ2VEYXRhLndpZHRoO1xuICBsZXQgbWluWSA9IGltYWdlRGF0YS5oZWlnaHQ7XG4gIGxldCBtYXhYID0gLTE7XG4gIGxldCBtYXhZID0gLTE7XG4gIGxldCBza2luUGl4ZWxzID0gMDtcblxuICBmb3IgKGxldCB5ID0gMDsgeSA8IGltYWdlRGF0YS5oZWlnaHQ7IHkgKz0gMSkge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgaW1hZ2VEYXRhLndpZHRoOyB4ICs9IDEpIHtcbiAgICAgIGNvbnN0IG9mZnNldCA9ICh5ICogaW1hZ2VEYXRhLndpZHRoICsgeCkgKiA0O1xuICAgICAgY29uc3QgcmVkID0gaW1hZ2VEYXRhLmRhdGFbb2Zmc2V0XSA/PyAwO1xuICAgICAgY29uc3QgZ3JlZW4gPSBpbWFnZURhdGEuZGF0YVtvZmZzZXQgKyAxXSA/PyAwO1xuICAgICAgY29uc3QgYmx1ZSA9IGltYWdlRGF0YS5kYXRhW29mZnNldCArIDJdID8/IDA7XG5cbiAgICAgIGlmICghaXNMaWtlbHlTa2luUGl4ZWwocmVkLCBncmVlbiwgYmx1ZSkpIGNvbnRpbnVlO1xuXG4gICAgICBza2luUGl4ZWxzICs9IDE7XG4gICAgICBpZiAoeCA8IG1pblgpIG1pblggPSB4O1xuICAgICAgaWYgKHkgPCBtaW5ZKSBtaW5ZID0geTtcbiAgICAgIGlmICh4ID4gbWF4WCkgbWF4WCA9IHg7XG4gICAgICBpZiAoeSA+IG1heFkpIG1heFkgPSB5O1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHRvdGFsUGl4ZWxzID0gaW1hZ2VEYXRhLndpZHRoICogaW1hZ2VEYXRhLmhlaWdodDtcbiAgY29uc3QgY292ZXJhZ2UgPSB0b3RhbFBpeGVscyA+IDAgPyBza2luUGl4ZWxzIC8gdG90YWxQaXhlbHMgOiAwO1xuXG4gIGlmIChza2luUGl4ZWxzID09PSAwIHx8IG1heFggPCBtaW5YIHx8IG1heFkgPCBtaW5ZKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRldGVjdGVkOiBmYWxzZSxcbiAgICAgIGNvdmVyYWdlLFxuICAgICAgY2VudGVyT2Zmc2V0WDogMSxcbiAgICAgIGNlbnRlck9mZnNldFk6IDEsXG4gICAgICBkYXJrQmFja2dyb3VuZDogZmFsc2UsXG4gICAgICBiYWNrZ3JvdW5kTHVtYTogMCxcbiAgICAgIGNoZWVrc09ic2N1cmVkOiBmYWxzZSxcbiAgICAgIGZhY2VCb3VuZHM6IG51bGwsXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IHdpZHRoID0gKG1heFggLSBtaW5YICsgMSkgLyBpbWFnZURhdGEud2lkdGg7XG4gIGNvbnN0IGhlaWdodCA9IChtYXhZIC0gbWluWSArIDEpIC8gaW1hZ2VEYXRhLmhlaWdodDtcbiAgY29uc3QgY2VudGVyWCA9IChtaW5YICsgbWF4WCArIDEpIC8gMiAvIGltYWdlRGF0YS53aWR0aDtcbiAgY29uc3QgY2VudGVyWSA9IChtaW5ZICsgbWF4WSArIDEpIC8gMiAvIGltYWdlRGF0YS5oZWlnaHQ7XG4gIGNvbnN0IGZhY2VCb3VuZHMgPSB7XG4gICAgbGVmdDogbWluWCAvIGltYWdlRGF0YS53aWR0aCxcbiAgICB0b3A6IG1pblkgLyBpbWFnZURhdGEuaGVpZ2h0LFxuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgfTtcblxuICBjb25zdCBleHBhbmRYID0gTWF0aC5mbG9vcigobWF4WCAtIG1pblggKyAxKSAqIDAuMjIpO1xuICBjb25zdCBleHBhbmRZID0gTWF0aC5mbG9vcigobWF4WSAtIG1pblkgKyAxKSAqIDAuMTgpO1xuICBjb25zdCBvdXRlckxlZnQgPSBNYXRoLm1heCgwLCBtaW5YIC0gZXhwYW5kWCk7XG4gIGNvbnN0IG91dGVyUmlnaHQgPSBNYXRoLm1pbihpbWFnZURhdGEud2lkdGggLSAxLCBtYXhYICsgZXhwYW5kWCk7XG4gIGNvbnN0IG91dGVyVG9wID0gTWF0aC5tYXgoMCwgbWluWSAtIGV4cGFuZFkpO1xuICBjb25zdCBvdXRlckJvdHRvbSA9IE1hdGgubWluKGltYWdlRGF0YS5oZWlnaHQgLSAxLCBtYXhZICsgZXhwYW5kWSk7XG5cbiAgbGV0IGJhY2tncm91bmRMdW1hU3VtID0gMDtcbiAgbGV0IGJhY2tncm91bmRQaXhlbHMgPSAwO1xuICBmb3IgKGxldCB5ID0gb3V0ZXJUb3A7IHkgPD0gb3V0ZXJCb3R0b207IHkgKz0gMSkge1xuICAgIGZvciAobGV0IHggPSBvdXRlckxlZnQ7IHggPD0gb3V0ZXJSaWdodDsgeCArPSAxKSB7XG4gICAgICBjb25zdCBpbnNpZGVGYWNlID0geCA+PSBtaW5YICYmIHggPD0gbWF4WCAmJiB5ID49IG1pblkgJiYgeSA8PSBtYXhZO1xuICAgICAgaWYgKGluc2lkZUZhY2UpIGNvbnRpbnVlO1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gKHkgKiBpbWFnZURhdGEud2lkdGggKyB4KSAqIDQ7XG4gICAgICBjb25zdCByZWQgPSBpbWFnZURhdGEuZGF0YVtvZmZzZXRdID8/IDA7XG4gICAgICBjb25zdCBncmVlbiA9IGltYWdlRGF0YS5kYXRhW29mZnNldCArIDFdID8/IDA7XG4gICAgICBjb25zdCBibHVlID0gaW1hZ2VEYXRhLmRhdGFbb2Zmc2V0ICsgMl0gPz8gMDtcbiAgICAgIGJhY2tncm91bmRMdW1hU3VtICs9IHBpeGVsTHVtYShyZWQsIGdyZWVuLCBibHVlKTtcbiAgICAgIGJhY2tncm91bmRQaXhlbHMgKz0gMTtcbiAgICB9XG4gIH1cbiAgY29uc3QgYmFja2dyb3VuZEx1bWEgPSBiYWNrZ3JvdW5kUGl4ZWxzID4gMCA/IGJhY2tncm91bmRMdW1hU3VtIC8gYmFja2dyb3VuZFBpeGVscyA6IDA7XG4gIGNvbnN0IGRhcmtCYWNrZ3JvdW5kID0gY292ZXJhZ2UgPj0gTUlOX0ZBQ0VfQ09WRVJBR0UgJiYgYmFja2dyb3VuZFBpeGVscyA+IDAgJiYgYmFja2dyb3VuZEx1bWEgPCA1MjtcblxuICBjb25zdCBjaGVla1RvcCA9IG1pblkgKyAobWF4WSAtIG1pblkgKyAxKSAqIDAuMzQ7XG4gIGNvbnN0IGNoZWVrQm90dG9tID0gbWluWSArIChtYXhZIC0gbWluWSArIDEpICogMC43ODtcbiAgY29uc3QgbGVmdENoZWVrQ292ZXJhZ2UgPSBzYW1wbGVSZWdpb25Ta2luQ292ZXJhZ2UoXG4gICAgaW1hZ2VEYXRhLFxuICAgIG1pblggKyAobWF4WCAtIG1pblggKyAxKSAqIDAuMDQsXG4gICAgbWluWCArIChtYXhYIC0gbWluWCArIDEpICogMC4zMixcbiAgICBjaGVla1RvcCxcbiAgICBjaGVla0JvdHRvbVxuICApO1xuICBjb25zdCBjZW50ZXJDb3ZlcmFnZSA9IHNhbXBsZVJlZ2lvblNraW5Db3ZlcmFnZShcbiAgICBpbWFnZURhdGEsXG4gICAgbWluWCArIChtYXhYIC0gbWluWCArIDEpICogMC4zNCxcbiAgICBtaW5YICsgKG1heFggLSBtaW5YICsgMSkgKiAwLjY2LFxuICAgIGNoZWVrVG9wLFxuICAgIGNoZWVrQm90dG9tXG4gICk7XG4gIGNvbnN0IHJpZ2h0Q2hlZWtDb3ZlcmFnZSA9IHNhbXBsZVJlZ2lvblNraW5Db3ZlcmFnZShcbiAgICBpbWFnZURhdGEsXG4gICAgbWluWCArIChtYXhYIC0gbWluWCArIDEpICogMC42OCxcbiAgICBtaW5YICsgKG1heFggLSBtaW5YICsgMSkgKiAwLjk2LFxuICAgIGNoZWVrVG9wLFxuICAgIGNoZWVrQm90dG9tXG4gICk7XG5cbiAgY29uc3QgY2hlZWtzT2JzY3VyZWQgPVxuICAgIGNvdmVyYWdlID49IDAuMDggJiZcbiAgICBjZW50ZXJDb3ZlcmFnZSA+IDAuMTQgJiZcbiAgICAobGVmdENoZWVrQ292ZXJhZ2UgPCAwLjIgfHwgcmlnaHRDaGVla0NvdmVyYWdlIDwgMC4yIHx8IE1hdGguYWJzKGxlZnRDaGVla0NvdmVyYWdlIC0gcmlnaHRDaGVla0NvdmVyYWdlKSA+IDAuMTgpO1xuXG4gIHJldHVybiB7XG4gICAgZGV0ZWN0ZWQ6IGNvdmVyYWdlID49IE1JTl9GQUNFX0NPVkVSQUdFLFxuICAgIGNvdmVyYWdlLFxuICAgIGNlbnRlck9mZnNldFg6IGNlbnRlclggLSAwLjUsXG4gICAgY2VudGVyT2Zmc2V0WTogY2VudGVyWSAtIDAuNSxcbiAgICBkYXJrQmFja2dyb3VuZCxcbiAgICBiYWNrZ3JvdW5kTHVtYSxcbiAgICBjaGVla3NPYnNjdXJlZCxcbiAgICBmYWNlQm91bmRzLFxuICB9O1xufVxuXG5leHBvcnQgY29uc3QgRElTVEFOQ0VfRVNUSU1BVEVfRk9WX0RFR1JFRVMgPSA3NztcbmV4cG9ydCBjb25zdCBESVNUQU5DRV9FU1RJTUFURV9GQUNFX1dJRFRIX0NNID0gMTQ7XG5leHBvcnQgY29uc3QgRElTVEFOQ0VfRVNUSU1BVEVfVEFSR0VUX1JBTkdFX0NNOiBbbnVtYmVyLCBudW1iZXJdID0gWzI1LCA0MF07XG5cbmNvbnN0IERFR19UT19SQUQgPSBNYXRoLlBJIC8gMTgwO1xuY29uc3QgRElTVEFOQ0VfRVNUSU1BVEVfSEFMRl9GT1ZfVEFOID0gTWF0aC50YW4oXG4gIChESVNUQU5DRV9FU1RJTUFURV9GT1ZfREVHUkVFUyAvIDIpICogREVHX1RPX1JBRFxuKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGVzdGltYXRlRGlzdGFuY2VGcm9tRmFjZVdpZHRoUmF0aW8oXG4gIGZhY2VXaWR0aFJhdGlvOiBudW1iZXIsXG4gIG9wdGlvbnM6IHtcbiAgICBmb3ZEZWdyZWVzPzogbnVtYmVyO1xuICAgIGZhY2VXaWR0aENtPzogbnVtYmVyO1xuICB9ID0ge31cbik6IG51bWJlciB8IG51bGwge1xuICBpZiAoIU51bWJlci5pc0Zpbml0ZShmYWNlV2lkdGhSYXRpbykpIHJldHVybiBudWxsO1xuICBpZiAoZmFjZVdpZHRoUmF0aW8gPD0gMC4wMikgcmV0dXJuIG51bGw7XG4gIGlmIChmYWNlV2lkdGhSYXRpbyA+PSAwLjk4KSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBoYWxmRm92VGFuID0gb3B0aW9ucy5mb3ZEZWdyZWVzXG4gICAgPyBNYXRoLnRhbigob3B0aW9ucy5mb3ZEZWdyZWVzIC8gMikgKiBERUdfVE9fUkFEKVxuICAgIDogRElTVEFOQ0VfRVNUSU1BVEVfSEFMRl9GT1ZfVEFOO1xuICBjb25zdCBmYWNlV2lkdGhDbSA9IG9wdGlvbnMuZmFjZVdpZHRoQ20gPz8gRElTVEFOQ0VfRVNUSU1BVEVfRkFDRV9XSURUSF9DTTtcblxuICBjb25zdCBkaXN0YW5jZSA9IGZhY2VXaWR0aENtIC8gKDIgKiBmYWNlV2lkdGhSYXRpbyAqIGhhbGZGb3ZUYW4pO1xuICBpZiAoIU51bWJlci5pc0Zpbml0ZShkaXN0YW5jZSkgfHwgZGlzdGFuY2UgPD0gMCkgcmV0dXJuIG51bGw7XG4gIHJldHVybiBkaXN0YW5jZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVzdGltYXRlRGlzdGFuY2VGcm9tRmFjZVNpZ25hbChcbiAgZmFjZUJvdW5kczogeyBsZWZ0OiBudW1iZXI7IHRvcDogbnVtYmVyOyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlciB9IHwgbnVsbCxcbiAgZmFjZURldGVjdGVkOiBib29sZWFuXG4pOiBMaXZlRGlzdGFuY2VFc3RpbWF0ZSB7XG4gIGNvbnN0IHRhcmdldFJhbmdlID0gRElTVEFOQ0VfRVNUSU1BVEVfVEFSR0VUX1JBTkdFX0NNO1xuXG4gIGlmICghZmFjZURldGVjdGVkIHx8ICFmYWNlQm91bmRzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogXCJibG9ja2VkXCIsXG4gICAgICBkaXN0YW5jZVN0YXR1czogXCJ1bmtub3duXCIsXG4gICAgICBkaXN0YW5jZUNtOiBudWxsLFxuICAgICAgdGFyZ2V0UmFuZ2VDbTogdGFyZ2V0UmFuZ2UsXG4gICAgICBhc3N1bWVkRm92RGVncmVlczogRElTVEFOQ0VfRVNUSU1BVEVfRk9WX0RFR1JFRVMsXG4gICAgICBhc3N1bWVkRmFjZVdpZHRoQ206IERJU1RBTkNFX0VTVElNQVRFX0ZBQ0VfV0lEVEhfQ00sXG4gICAgICBsYWJlbDogXCJPZGxlZ8WCb8WbxIcgb2Qga2FtZXJ5XCIsXG4gICAgICB2YWx1ZTogXCJOaWUgd2lkesSZIHR3YXJ6eVwiLFxuICAgICAgbWVzc2FnZTpcbiAgICAgICAgXCJVc3RhdyB0d2FyeiB3IG93YWxuZWogcHJvd2FkbmljeSDigJQgc3phY293YW5pZSBvZGxlZ8WCb8WbY2kgemFjem5pZSBzacSZLCBnZHkgem9iYWN6eW15IHBlxYJueSBvd2FsLlwiLFxuICAgIH07XG4gIH1cblxuICBjb25zdCBkaXN0YW5jZUNtID0gZXN0aW1hdGVEaXN0YW5jZUZyb21GYWNlV2lkdGhSYXRpbyhmYWNlQm91bmRzLndpZHRoKTtcbiAgaWYgKGRpc3RhbmNlQ20gPT09IG51bGwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiBcIndhcm5pbmdcIixcbiAgICAgIGRpc3RhbmNlU3RhdHVzOiBcInVua25vd25cIixcbiAgICAgIGRpc3RhbmNlQ206IG51bGwsXG4gICAgICB0YXJnZXRSYW5nZUNtOiB0YXJnZXRSYW5nZSxcbiAgICAgIGFzc3VtZWRGb3ZEZWdyZWVzOiBESVNUQU5DRV9FU1RJTUFURV9GT1ZfREVHUkVFUyxcbiAgICAgIGFzc3VtZWRGYWNlV2lkdGhDbTogRElTVEFOQ0VfRVNUSU1BVEVfRkFDRV9XSURUSF9DTSxcbiAgICAgIGxhYmVsOiBcIk9kbGVnxYJvxZvEhyBvZCBrYW1lcnlcIixcbiAgICAgIHZhbHVlOiBcIk5pZSBtb2fEmSBvc3phY293YcSHXCIsXG4gICAgICBtZXNzYWdlOlxuICAgICAgICBcIlBva2HFvCB0d2FyeiB3IGNlbnRyYWxuZWogY3rEmcWbY2kga2FkcnUsIGFieSBwb21pYXIgb2RsZWfFgm/Fm2NpIGJ5xYIgd2lhcnlnb2RueS5cIixcbiAgICB9O1xuICB9XG5cbiAgY29uc3Qgcm91bmRlZCA9IE1hdGgucm91bmQoZGlzdGFuY2VDbSk7XG4gIGNvbnN0IFttaW5UYXJnZXQsIG1heFRhcmdldF0gPSB0YXJnZXRSYW5nZTtcblxuICBsZXQgc3RhdHVzOiBMaXZlR3VpZGFuY2VTdGF0dXM7XG4gIGxldCBkaXN0YW5jZVN0YXR1czogTGl2ZURpc3RhbmNlU3RhdHVzO1xuICBsZXQgdmFsdWU6IHN0cmluZztcbiAgbGV0IG1lc3NhZ2U6IHN0cmluZztcblxuICBpZiAoZGlzdGFuY2VDbSA8IDE4KSB7XG4gICAgc3RhdHVzID0gXCJibG9ja2VkXCI7XG4gICAgZGlzdGFuY2VTdGF0dXMgPSBcInRvb19jbG9zZVwiO1xuICAgIHZhbHVlID0gYH4ke3JvdW5kZWR9IGNtIOKAlCB6Ynl0IGJsaXNrb2A7XG4gICAgbWVzc2FnZSA9IGBPZGRhbCB0ZWxlZm9uIG8gb2tvxYJvICR7TWF0aC5tYXgoNSwgbWluVGFyZ2V0ICsgNSAtIHJvdW5kZWQpfSBjbS4gS2FtZXJhIHNlbGZpZSB0cmFjaSBvc3Ryb8WbxIcgcG9uacW8ZWogMjAgY20sIGEgc2vDs3JhIHcgbWFrcm96Ymxpxbxlbml1IG1vxbxlIHd5Z2zEhWRhxIcgbmllcmVhbG5pZS5gO1xuICB9IGVsc2UgaWYgKGRpc3RhbmNlQ20gPCBtaW5UYXJnZXQpIHtcbiAgICBzdGF0dXMgPSBcIndhcm5pbmdcIjtcbiAgICBkaXN0YW5jZVN0YXR1cyA9IFwic2xpZ2h0bHlfY2xvc2VcIjtcbiAgICB2YWx1ZSA9IGB+JHtyb3VuZGVkfSBjbSDigJQgdHJvY2jEmSB6YSBibGlza29gO1xuICAgIG1lc3NhZ2UgPSBgT2RzdcWEIHRlbGVmb24gbyBva2/Fgm8gJHtNYXRoLm1heCgyLCBtaW5UYXJnZXQgLSByb3VuZGVkICsgMyl9IGNtLCDFvGVieSB6bWllxZtjacSHIGNhxYJ5IG93YWwgdHdhcnp5IGkgdW5pa27EhcSHIHpuaWVrc3p0YcWCY2XFhCBvcHR5Y3pueWNoLmA7XG4gIH0gZWxzZSBpZiAoZGlzdGFuY2VDbSA8PSBtYXhUYXJnZXQpIHtcbiAgICBzdGF0dXMgPSBcInJlYWR5XCI7XG4gICAgZGlzdGFuY2VTdGF0dXMgPSBcIm9wdGltYWxcIjtcbiAgICB2YWx1ZSA9IGB+JHtyb3VuZGVkfSBjbSDigJQgb3B0eW1hbG5pZWA7XG4gICAgbWVzc2FnZSA9IGBUcnp5bWFqIHRlbGVmb24gdyB0ZWogb2RsZWfFgm/Fm2NpIChkb2NlbG93byAke21pblRhcmdldH3igJMke21heFRhcmdldH0gY20pLiBUbyB6YWtyZXMsIHcga3TDs3J5bSBza8OzcmEgamVzdCBqZWRub2N6ZcWbbmllIG9zdHJhIGkgbWEgemFjaG93YW7EhSBwZXJzcGVrdHl3xJkuYDtcbiAgfSBlbHNlIGlmIChkaXN0YW5jZUNtIDw9IDYwKSB7XG4gICAgc3RhdHVzID0gXCJ3YXJuaW5nXCI7XG4gICAgZGlzdGFuY2VTdGF0dXMgPSBcInNsaWdodGx5X2ZhclwiO1xuICAgIHZhbHVlID0gYH4ke3JvdW5kZWR9IGNtIOKAlCB0cm9jaMSZIHphIGRhbGVrb2A7XG4gICAgbWVzc2FnZSA9IGBQb2RlamTFuiBvIG9rb8WCbyAke01hdGgubWF4KDIsIHJvdW5kZWQgLSBtYXhUYXJnZXQgKyAzKX0gY20gYmxpxbxlaiwgxbxlYnkgc3pjemVnw7PFgnkgc2vDs3J5IChwb3J5LCB0ZWtzdHVyYSwgcnVtaWXFhCkgYnnFgnkgY3p5dGVsbmUgZGxhIGFuYWxpenkuYDtcbiAgfSBlbHNlIHtcbiAgICBzdGF0dXMgPSBcImJsb2NrZWRcIjtcbiAgICBkaXN0YW5jZVN0YXR1cyA9IFwidG9vX2ZhclwiO1xuICAgIHZhbHVlID0gYH4ke3JvdW5kZWR9IGNtIOKAlCB6Ynl0IGRhbGVrb2A7XG4gICAgbWVzc2FnZSA9IGBQb2RlamTFuiBibGnFvGVqIGRvIHRlbGVmb251LCBkb2NlbG93byAke21pblRhcmdldH3igJMke21heFRhcmdldH0gY20uIFogdGVqIG9kbGVnxYJvxZtjaSB0d2FyeiBqZXN0IHphIG1hxYJhLCBhYnkgb2NlbmnEhyBuYWN6eW5rYSwgdGVrc3R1csSZIGkgZHJvYm5lIGNlY2h5IHNrw7NyeS5gO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzdGF0dXMsXG4gICAgZGlzdGFuY2VTdGF0dXMsXG4gICAgZGlzdGFuY2VDbTogcm91bmRlZCxcbiAgICB0YXJnZXRSYW5nZUNtOiB0YXJnZXRSYW5nZSxcbiAgICBhc3N1bWVkRm92RGVncmVlczogRElTVEFOQ0VfRVNUSU1BVEVfRk9WX0RFR1JFRVMsXG4gICAgYXNzdW1lZEZhY2VXaWR0aENtOiBESVNUQU5DRV9FU1RJTUFURV9GQUNFX1dJRFRIX0NNLFxuICAgIGxhYmVsOiBcIk9kbGVnxYJvxZvEhyBvZCBrYW1lcnlcIixcbiAgICB2YWx1ZSxcbiAgICBtZXNzYWdlLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjbGFzc2lmeVBvc2VBeGlzKFxuICBhYnNEZWdyZWVzOiBudW1iZXIsXG4gIHJlYWR5VGhyZXNob2xkOiBudW1iZXIsXG4gIHdhcm5pbmdUaHJlc2hvbGQ6IG51bWJlclxuKTogTGl2ZUd1aWRhbmNlU3RhdHVzIHtcbiAgaWYgKGFic0RlZ3JlZXMgPD0gcmVhZHlUaHJlc2hvbGQpIHJldHVybiBcInJlYWR5XCI7XG4gIGlmIChhYnNEZWdyZWVzIDw9IHdhcm5pbmdUaHJlc2hvbGQpIHJldHVybiBcIndhcm5pbmdcIjtcbiAgcmV0dXJuIFwiYmxvY2tlZFwiO1xufVxuXG5jb25zdCBzdGF0dXNTZXZlcml0eTogUmVjb3JkPExpdmVHdWlkYW5jZVN0YXR1cywgbnVtYmVyPiA9IHtcbiAgcmVhZHk6IDAsXG4gIHdhcm5pbmc6IDEsXG4gIGJsb2NrZWQ6IDIsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRQb3NlRXN0aW1hdGUoXG4gIHBvc2U6IE1lZGlhUGlwZVBvc2VFc3RpbWF0ZSB8IG51bGwsXG4gIG1lZGlhcGlwZUF2YWlsYWJsZTogYm9vbGVhblxuKTogTGl2ZVBvc2VFc3RpbWF0ZSB7XG4gIGlmICghbWVkaWFwaXBlQXZhaWxhYmxlIHx8ICFwb3NlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGF2YWlsYWJsZTogZmFsc2UsXG4gICAgICBzdGF0dXM6IFwicmVhZHlcIixcbiAgICAgIHlhd0RlZ3JlZXM6IG51bGwsXG4gICAgICBwaXRjaERlZ3JlZXM6IG51bGwsXG4gICAgICByb2xsRGVncmVlczogbnVsbCxcbiAgICAgIGxhYmVsOiBcIlVzdGF3aWVuaWUgZ8WCb3d5XCIsXG4gICAgICB2YWx1ZTogbWVkaWFwaXBlQXZhaWxhYmxlID8gXCJOaWUgd2lkesSZIHBvenlcIiA6IFwiTmllZG9zdMSZcG5lXCIsXG4gICAgICBtZXNzYWdlOiBtZWRpYXBpcGVBdmFpbGFibGVcbiAgICAgICAgPyBcIlBva2HFvCB0d2FyeiB3IGNlbnRyYWxuZWogY3rEmcWbY2kga2FkcnUsIGFieSBvY2VuacSHIHVzdGF3aWVuaWUgZ8WCb3d5LlwiXG4gICAgICAgIDogXCJQcmVjeXp5am5hIGRldGVrY2phIHBvenkgZ8WCb3d5IG5pZSBqZXN0IGFrdHl3bmEgdyB0ZWogc2VzamkuXCIsXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IHlhd0FicyA9IE1hdGguYWJzKHBvc2UueWF3RGVncmVlcyk7XG4gIGNvbnN0IHBpdGNoQWJzID0gTWF0aC5hYnMocG9zZS5waXRjaERlZ3JlZXMpO1xuICBjb25zdCByb2xsQWJzID0gTWF0aC5hYnMocG9zZS5yb2xsRGVncmVlcyk7XG5cbiAgY29uc3QgeWF3U3RhdHVzID0gY2xhc3NpZnlQb3NlQXhpcyh5YXdBYnMsIFBPU0VfVEhSRVNIT0xEUy55YXdSZWFkeSwgUE9TRV9USFJFU0hPTERTLnlhd1dhcm5pbmcpO1xuICBjb25zdCBwaXRjaFN0YXR1cyA9IGNsYXNzaWZ5UG9zZUF4aXMoXG4gICAgcGl0Y2hBYnMsXG4gICAgUE9TRV9USFJFU0hPTERTLnBpdGNoUmVhZHksXG4gICAgUE9TRV9USFJFU0hPTERTLnBpdGNoV2FybmluZ1xuICApO1xuICBjb25zdCByb2xsU3RhdHVzID0gY2xhc3NpZnlQb3NlQXhpcyhcbiAgICByb2xsQWJzLFxuICAgIFBPU0VfVEhSRVNIT0xEUy5yb2xsUmVhZHksXG4gICAgUE9TRV9USFJFU0hPTERTLnJvbGxXYXJuaW5nXG4gICk7XG5cbiAgY29uc3QgYXhlcyA9IFtcbiAgICB7IGF4aXM6IFwieWF3XCIgYXMgY29uc3QsIHN0YXR1czogeWF3U3RhdHVzLCBhYnNEZWc6IHlhd0Ficywgc2lnbmVkRGVnOiBwb3NlLnlhd0RlZ3JlZXMgfSxcbiAgICB7IGF4aXM6IFwicGl0Y2hcIiBhcyBjb25zdCwgc3RhdHVzOiBwaXRjaFN0YXR1cywgYWJzRGVnOiBwaXRjaEFicywgc2lnbmVkRGVnOiBwb3NlLnBpdGNoRGVncmVlcyB9LFxuICAgIHsgYXhpczogXCJyb2xsXCIgYXMgY29uc3QsIHN0YXR1czogcm9sbFN0YXR1cywgYWJzRGVnOiByb2xsQWJzLCBzaWduZWREZWc6IHBvc2Uucm9sbERlZ3JlZXMgfSxcbiAgXTtcbiAgY29uc3QgZG9taW5hbnQgPSBheGVzLnJlZHVjZSgoYWNjLCBjYW5kaWRhdGUpID0+IHtcbiAgICBjb25zdCBhY2NTZXYgPSBzdGF0dXNTZXZlcml0eVthY2Muc3RhdHVzXTtcbiAgICBjb25zdCBjYW5kU2V2ID0gc3RhdHVzU2V2ZXJpdHlbY2FuZGlkYXRlLnN0YXR1c107XG4gICAgaWYgKGNhbmRTZXYgPiBhY2NTZXYpIHJldHVybiBjYW5kaWRhdGU7XG4gICAgaWYgKGNhbmRTZXYgPT09IGFjY1NldiAmJiBjYW5kaWRhdGUuYWJzRGVnID4gYWNjLmFic0RlZykgcmV0dXJuIGNhbmRpZGF0ZTtcbiAgICByZXR1cm4gYWNjO1xuICB9KTtcblxuICBjb25zdCBjb21iaW5lZFN0YXR1czogTGl2ZUd1aWRhbmNlU3RhdHVzID1cbiAgICBzdGF0dXNTZXZlcml0eVt5YXdTdGF0dXNdID49IHN0YXR1c1NldmVyaXR5W3BpdGNoU3RhdHVzXSAmJlxuICAgIHN0YXR1c1NldmVyaXR5W3lhd1N0YXR1c10gPj0gc3RhdHVzU2V2ZXJpdHlbcm9sbFN0YXR1c11cbiAgICAgID8geWF3U3RhdHVzXG4gICAgICA6IHN0YXR1c1NldmVyaXR5W3BpdGNoU3RhdHVzXSA+PSBzdGF0dXNTZXZlcml0eVtyb2xsU3RhdHVzXVxuICAgICAgICA/IHBpdGNoU3RhdHVzXG4gICAgICAgIDogcm9sbFN0YXR1cztcblxuICBsZXQgdmFsdWU6IHN0cmluZztcbiAgbGV0IG1lc3NhZ2U6IHN0cmluZztcblxuICBpZiAoY29tYmluZWRTdGF0dXMgPT09IFwicmVhZHlcIikge1xuICAgIHZhbHVlID0gXCJHxYJvd2EgcHJvc3RvXCI7XG4gICAgbWVzc2FnZSA9IFwiVXN0YXdpZW5pZSB0d2FyenkgamVzdCBmcm9udGFsbmUg4oCUIGlkZWFsbmllIGRsYSBvY2VueSBza8OzcnkuXCI7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGlyZWN0aW9uID1cbiAgICAgIGRvbWluYW50LmF4aXMgPT09IFwieWF3XCJcbiAgICAgICAgPyBkb21pbmFudC5zaWduZWREZWcgPiAwXG4gICAgICAgICAgPyBcIm9icsOzY29uYSB3IHByYXdvXCJcbiAgICAgICAgICA6IFwib2Jyw7Njb25hIHcgbGV3b1wiXG4gICAgICAgIDogZG9taW5hbnQuYXhpcyA9PT0gXCJwaXRjaFwiXG4gICAgICAgICAgPyBkb21pbmFudC5zaWduZWREZWcgPiAwXG4gICAgICAgICAgICA/IFwib2RjaHlsb25hIGRvIHR5xYJ1IChicm9kYSB3IGfDs3LEmSlcIlxuICAgICAgICAgICAgOiBcInBvY2h5bG9uYSBkbyBwcnpvZHUgKGJyb2RhIHcgZMOzxYIpXCJcbiAgICAgICAgICA6IGRvbWluYW50LnNpZ25lZERlZyA+IDBcbiAgICAgICAgICAgID8gXCJwcnplY2h5bG9uYSBrdSBwcmF3ZW11IHJhbWllbml1XCJcbiAgICAgICAgICAgIDogXCJwcnplY2h5bG9uYSBrdSBsZXdlbXUgcmFtaWVuaXVcIjtcblxuICAgIGNvbnN0IGNvcnJlY3Rpb24gPVxuICAgICAgZG9taW5hbnQuYXhpcyA9PT0gXCJ5YXdcIlxuICAgICAgICA/IGRvbWluYW50LnNpZ25lZERlZyA+IDBcbiAgICAgICAgICA/IFwiT2Jyw7PEhyB0d2FyeiBsZWtrbyB3IGxld28sIMW8ZWJ5IHBhdHJ6ecWCYSBwcm9zdG8gdyBvYmlla3R5dy5cIlxuICAgICAgICAgIDogXCJPYnLDs8SHIHR3YXJ6IGxla2tvIHcgcHJhd28sIMW8ZWJ5IHBhdHJ6ecWCYSBwcm9zdG8gdyBvYmlla3R5dy5cIlxuICAgICAgICA6IGRvbWluYW50LmF4aXMgPT09IFwicGl0Y2hcIlxuICAgICAgICAgID8gZG9taW5hbnQuc2lnbmVkRGVnID4gMFxuICAgICAgICAgICAgPyBcIk9wdcWbxIcgYnJvZMSZLCDFvGVieSBjem/Fgm8gaSBwb2xpY3praSBiecWCeSByw7N3bm9taWVybmllIG/Fm3dpZXRsb25lLlwiXG4gICAgICAgICAgICA6IFwiUG9kbmllxZsgYnJvZMSZLCDFvGVieSBhcGFyYXQgbWlhxYIgZnJvbnRhbG55IHdpZG9rIHR3YXJ6eS5cIlxuICAgICAgICAgIDogZG9taW5hbnQuc2lnbmVkRGVnID4gMFxuICAgICAgICAgICAgPyBcIld5cHJvc3R1aiBnxYJvd8SZIOKAlCBwcnplY2h5xYJhIHNpxJkgdyBwcmF3bywgYXN5bWV0cmlhIHphYnVyemEgb2NlbsSZIHNrw7NyeS5cIlxuICAgICAgICAgICAgOiBcIld5cHJvc3R1aiBnxYJvd8SZIOKAlCBwcnplY2h5xYJhIHNpxJkgdyBsZXdvLCBhc3ltZXRyaWEgemFidXJ6YSBvY2VuxJkgc2vDs3J5LlwiO1xuXG4gICAgY29uc3Qgc2V2ZXJpdHkgPSBjb21iaW5lZFN0YXR1cyA9PT0gXCJ3YXJuaW5nXCIgPyBcImxla2tvXCIgOiBcInd5cmHFum5pZVwiO1xuICAgIHZhbHVlID0gYEfFgm93YSAke3NldmVyaXR5fSAke2RpcmVjdGlvbn0gKCR7TWF0aC5yb3VuZChkb21pbmFudC5hYnNEZWcpfcKwKWA7XG4gICAgbWVzc2FnZSA9IGNvcnJlY3Rpb247XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGF2YWlsYWJsZTogdHJ1ZSxcbiAgICBzdGF0dXM6IGNvbWJpbmVkU3RhdHVzLFxuICAgIHlhd0RlZ3JlZXM6IHJvdW5kKHBvc2UueWF3RGVncmVlcywgMSksXG4gICAgcGl0Y2hEZWdyZWVzOiByb3VuZChwb3NlLnBpdGNoRGVncmVlcywgMSksXG4gICAgcm9sbERlZ3JlZXM6IHJvdW5kKHBvc2Uucm9sbERlZ3JlZXMsIDEpLFxuICAgIGxhYmVsOiBcIlVzdGF3aWVuaWUgZ8WCb3d5XCIsXG4gICAgdmFsdWUsXG4gICAgbWVzc2FnZSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gYnVpbGRDb3NtZXRpY3NJbmRpY2F0b3IoY29zbWV0aWNzOiBDb3NtZXRpY3NEZXRlY3Rpb24pOiBMaXZlR3VpZGFuY2VJbmRpY2F0b3Ige1xuICByZXR1cm4ge1xuICAgIGtleTogXCJjb3NtZXRpY3NcIixcbiAgICBsYWJlbDogY29zbWV0aWNzLmxhYmVsLFxuICAgIHN0YXR1czogY29zbWV0aWNzLnN0YXR1cyA9PT0gXCJ3YXJuaW5nXCIgPyBcIndhcm5pbmdcIiA6IFwicmVhZHlcIixcbiAgICB2YWx1ZTogY29zbWV0aWNzLnZhbHVlLFxuICAgIG1lc3NhZ2U6IGNvc21ldGljcy5tZXNzYWdlLFxuICB9O1xufVxuXG5mdW5jdGlvbiBidWlsZFBvc2VJbmRpY2F0b3IocG9zZTogTGl2ZVBvc2VFc3RpbWF0ZSk6IExpdmVHdWlkYW5jZUluZGljYXRvciB7XG4gIHJldHVybiB7XG4gICAga2V5OiBcInBvc2VcIixcbiAgICBsYWJlbDogcG9zZS5sYWJlbCxcbiAgICBzdGF0dXM6IHBvc2Uuc3RhdHVzLFxuICAgIHZhbHVlOiBwb3NlLnZhbHVlLFxuICAgIG1lc3NhZ2U6IHBvc2UubWVzc2FnZSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gYnVpbGREaXN0YW5jZUluZGljYXRvcihkaXN0YW5jZTogTGl2ZURpc3RhbmNlRXN0aW1hdGUpOiBMaXZlR3VpZGFuY2VJbmRpY2F0b3Ige1xuICByZXR1cm4ge1xuICAgIGtleTogXCJkaXN0YW5jZVwiLFxuICAgIGxhYmVsOiBkaXN0YW5jZS5sYWJlbCxcbiAgICBzdGF0dXM6IGRpc3RhbmNlLnN0YXR1cyxcbiAgICB2YWx1ZTogZGlzdGFuY2UudmFsdWUsXG4gICAgbWVzc2FnZTogZGlzdGFuY2UubWVzc2FnZSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gYnVpbGRGcmFtaW5nSW5kaWNhdG9yKGZhY2VEZXRlY3RlZDogYm9vbGVhbiwgZmFjZUNvdmVyYWdlOiBudW1iZXIsIGNoZWVrc09ic2N1cmVkOiBib29sZWFuKTogTGl2ZUd1aWRhbmNlSW5kaWNhdG9yIHtcbiAgbGV0IHN0YXR1czogTGl2ZUd1aWRhbmNlU3RhdHVzO1xuICBsZXQgdmFsdWU6IHN0cmluZztcbiAgbGV0IG1lc3NhZ2U6IHN0cmluZztcblxuICBpZiAoIWZhY2VEZXRlY3RlZCB8fCBmYWNlQ292ZXJhZ2UgPCBNSU5fRkFDRV9DT1ZFUkFHRSkge1xuICAgIHN0YXR1cyA9IFwiYmxvY2tlZFwiO1xuICAgIHZhbHVlID0gXCJOaWUgd2lkesSZIHR3YXJ6eVwiO1xuICAgIG1lc3NhZ2UgPSBcIlVzdGF3IHR3YXJ6IHd5cmHFum5pZSB3IGNlbnRyYWxuZWogcmFtY2UgaSBwb2thxbwgY2HFgnkgb3dhbCBiZXogemFzxYJhbmlhbmlhIHBvbGljemvDs3cuXCI7XG4gIH0gZWxzZSBpZiAoY2hlZWtzT2JzY3VyZWQpIHtcbiAgICBzdGF0dXMgPSBcIndhcm5pbmdcIjtcbiAgICB2YWx1ZSA9IFwiUG9saWN6a2kgc8SFIHphc8WCb25pxJl0ZVwiO1xuICAgIG1lc3NhZ2UgPSBcIk9kc3XFhCB3xYJvc3ksIGTFgm/FhCBhbGJvIHRlbGVmb24gdGFrLCBhYnkgb2JhIHBvbGljemtpIGJ5xYJ5IHcgcGXFgm5pIHdpZG9jem5lIHByemVkIGFuYWxpesSFLlwiO1xuICB9IGVsc2UgaWYgKGZhY2VDb3ZlcmFnZSA8IDAuMDkpIHtcbiAgICBzdGF0dXMgPSBcIndhcm5pbmdcIjtcbiAgICB2YWx1ZSA9IFwiUG9kZWpkxbogYmxpxbxlalwiO1xuICAgIG1lc3NhZ2UgPSBcIlR3YXJ6IGplc3QgZG/Fm8SHIG1hxYJhIHcga2FkcnplLiBaYmxpxbwgdGVsZWZvbiBsdWIgcG9kZWpkxbogbmllY28gYmxpxbxlaiBkbyBvYmlla3R5d3UuXCI7XG4gIH0gZWxzZSBpZiAoZmFjZUNvdmVyYWdlID4gMC40Mikge1xuICAgIHN0YXR1cyA9IFwiYmxvY2tlZFwiO1xuICAgIHZhbHVlID0gXCJLYWRyIHpieXQgY2lhc255XCI7XG4gICAgbWVzc2FnZSA9IFwiT2RkYWwgdGVsZWZvbiBvZCB0d2FyenksIGFieSB3IGthZHJ6ZSB6bWllxZtjacWCeSBzacSZIGN6b8WCbywgcG9saWN6a2kgaSBsaW5pYSDFvHVjaHd5LlwiO1xuICB9IGVsc2UgaWYgKGZhY2VDb3ZlcmFnZSA+IDAuMzIpIHtcbiAgICBzdGF0dXMgPSBcIndhcm5pbmdcIjtcbiAgICB2YWx1ZSA9IFwiTWluaW1hbG5pZSB6YSBibGlza29cIjtcbiAgICBtZXNzYWdlID0gXCJLYWRyIGplc3QganXFvCBjenl0ZWxueSwgYWxlIG5pZXdpZWxraWUgb2RzdW5pxJljaWUgdGVsZWZvbnUgcG9tb8W8ZSBvYmrEhcSHIGNhxYLEhSB0d2FyeiBiYXJkemllaiByw7N3bm9taWVybmllLlwiO1xuICB9IGVsc2Uge1xuICAgIHN0YXR1cyA9IFwicmVhZHlcIjtcbiAgICB2YWx1ZSA9IFwiUHJvcG9yY2phIHBvcnRyZXRvd2FcIjtcbiAgICBtZXNzYWdlID0gXCJXaWVsa2/Fm8SHIHR3YXJ6eSB3IGthZHJ6ZSB3eWdsxIVkYSBvZHBvd2llZG5pbyBkbyB3eWtvbmFuaWEgc2VsZmllIGtvbnN1bHRhY3lqbmVnby5cIjtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAga2V5OiBcImZyYW1pbmdcIixcbiAgICBsYWJlbDogXCJLYWRyXCIsXG4gICAgc3RhdHVzLFxuICAgIHZhbHVlLFxuICAgIG1lc3NhZ2UsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGJ1aWxkUG9zaXRpb25JbmRpY2F0b3IoZmFjZURldGVjdGVkOiBib29sZWFuLCBjZW50ZXJPZmZzZXRYOiBudW1iZXIsIGNlbnRlck9mZnNldFk6IG51bWJlcik6IExpdmVHdWlkYW5jZUluZGljYXRvciB7XG4gIGNvbnN0IGRpc3RhbmNlWCA9IE1hdGguYWJzKGNlbnRlck9mZnNldFgpO1xuICBjb25zdCBkaXN0YW5jZVkgPSBNYXRoLmFicyhjZW50ZXJPZmZzZXRZKTtcblxuICBsZXQgc3RhdHVzOiBMaXZlR3VpZGFuY2VTdGF0dXM7XG4gIGxldCB2YWx1ZTogc3RyaW5nO1xuICBsZXQgbWVzc2FnZTogc3RyaW5nO1xuXG4gIGlmICghZmFjZURldGVjdGVkKSB7XG4gICAgc3RhdHVzID0gXCJibG9ja2VkXCI7XG4gICAgdmFsdWUgPSBcIlVzdGF3IHR3YXJ6IGNlbnRyYWxuaWVcIjtcbiAgICBtZXNzYWdlID0gXCJOYWpwaWVydyB1c3RhdyB0d2FyeiBuYSB3cHJvc3Qgd2V3bsSFdHJ6IG93YWxuZWogcHJvd2FkbmljeS5cIjtcbiAgfSBlbHNlIGlmIChkaXN0YW5jZVggPiAwLjIgfHwgZGlzdGFuY2VZID4gMC4yMikge1xuICAgIHN0YXR1cyA9IFwiYmxvY2tlZFwiO1xuICAgIHZhbHVlID0gXCJUd2FyeiBwb3phIMWbcm9ka2llbVwiO1xuICAgIG1lc3NhZ2UgPSBcIlByemVzdcWEIHRlbGVmb24gbHViIGfFgm93xJkgdGFrLCBhYnkgbm9zIHpuYWxhesWCIHNpxJkgYmxpxbxlaiDFm3JvZGthIHJhbWtpLlwiO1xuICB9IGVsc2UgaWYgKGRpc3RhbmNlWCA+IDAuMTEgfHwgZGlzdGFuY2VZID4gMC4xMykge1xuICAgIHN0YXR1cyA9IFwid2FybmluZ1wiO1xuICAgIHZhbHVlID0gXCJEZWxpa2F0bmllIHNrb3J5Z3VqXCI7XG4gICAgbWVzc2FnZSA9IFwiVHdhcnogamVzdCBwcmF3aWUgcG9wcmF3bmllIHVzdGF3aW9uYS4gRHJvYm5lIHd5csOzd25hbmllIHBvcHJhd2kgc3ltZXRyacSZIGthZHJ1LlwiO1xuICB9IGVsc2Uge1xuICAgIHN0YXR1cyA9IFwicmVhZHlcIjtcbiAgICB2YWx1ZSA9IFwiVXN0YXdpZW5pZSBjZW50cmFsbmVcIjtcbiAgICBtZXNzYWdlID0gXCJUd2FyeiB6bmFqZHVqZSBzacSZIGJsaXNrbyDFm3JvZGthIGkgZG9icnplIHdwaXN1amUgc2nEmSB3IHByb3dhZG5pY8SZLlwiO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBrZXk6IFwicG9zaXRpb25cIixcbiAgICBsYWJlbDogXCJQb3p5Y2phXCIsXG4gICAgc3RhdHVzLFxuICAgIHZhbHVlLFxuICAgIG1lc3NhZ2UsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZExpdmVDYXB0dXJlQ2hlY2tsaXN0KGd1aWRhbmNlOiBMaXZlQ2FtZXJhR3VpZGFuY2UpOiBMaXZlQ2FwdHVyZUNoZWNrbGlzdEl0ZW1bXSB7XG4gIGNvbnN0IGNlbnRlcmVkID0gTWF0aC5hYnMoZ3VpZGFuY2UuY2VudGVyT2Zmc2V0WCkgPD0gMC4xMSAmJiBNYXRoLmFicyhndWlkYW5jZS5jZW50ZXJPZmZzZXRZKSA8PSAwLjEzO1xuICBjb25zdCBiYWxhbmNlZEZyYW1pbmcgPSBndWlkYW5jZS5mYWNlQ292ZXJhZ2UgPj0gMC4wOSAmJiBndWlkYW5jZS5mYWNlQ292ZXJhZ2UgPD0gMC4zMjtcbiAgY29uc3Qgc3RhYmxlRW5vdWdoID0gZ3VpZGFuY2UucXVhbGl0eS5tZXRyaWNzLnNoYXJwbmVzcyA+PSAwLjg7XG4gIGNvbnN0IGJyaWdodEVub3VnaCA9IGd1aWRhbmNlLnF1YWxpdHkubWV0cmljcy5hdmVyYWdlTHVtYSA+PSA5MiAmJiBndWlkYW5jZS5xdWFsaXR5Lm1ldHJpY3MuYXZlcmFnZUx1bWEgPD0gMjEwICYmICFndWlkYW5jZS5kYXJrQmFja2dyb3VuZDtcbiAgY29uc3QgbGlnaHRDb2xvclJlYWR5ID0gZ3VpZGFuY2UubGlnaHRDb2xvci5zdGF0dXMgPT09IFwicmVhZHlcIjtcbiAgY29uc3QgbGlnaHRSZWFkeSA9IGJyaWdodEVub3VnaCAmJiBsaWdodENvbG9yUmVhZHk7XG4gIGNvbnN0IGNoZWVrc1Zpc2libGUgPSBndWlkYW5jZS5mYWNlRGV0ZWN0ZWQgJiYgIWd1aWRhbmNlLmNoZWVrc09ic2N1cmVkO1xuXG4gIHJldHVybiBbXG4gICAge1xuICAgICAgaWQ6IFwibGlnaHRcIixcbiAgICAgIGxhYmVsOiBcIsWad2lhdMWCbyBtYSBwcmF3aWTFgm93xIUgamFzbm/Fm8SHIGkgYmFyd8SZXCIsXG4gICAgICBwYXNzZWQ6IGxpZ2h0UmVhZHksXG4gICAgICBoaW50OiBsaWdodFJlYWR5XG4gICAgICAgID8gXCJXYXJ1bmtpIMWbd2lldGxuZSBzxIUgZ290b3dlLlwiXG4gICAgICAgIDogIWJyaWdodEVub3VnaFxuICAgICAgICAgID8gXCJVc3RhdyBzacSZIGJsacW8ZWogb2tuYSBsdWIgbmEgamHFm25pZWpzenltIHRsZS5cIlxuICAgICAgICAgIDogZ3VpZGFuY2UubGlnaHRDb2xvci5tZXNzYWdlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IFwiY2hlZWtzXCIsXG4gICAgICBsYWJlbDogXCJUd2FyeiBpIG9iYSBwb2xpY3praSBzxIUgZG9icnplIHdpZG9jem5lXCIsXG4gICAgICBwYXNzZWQ6IGNoZWVrc1Zpc2libGUsXG4gICAgICBoaW50OiBjaGVla3NWaXNpYmxlID8gXCJPd2FsIHR3YXJ6eSBqZXN0IGN6eXRlbG55LlwiIDogXCJPZHN1xYQgd8WCb3N5LCBkxYJvxYQgbHViIHRlbGVmb24gb2QgcG9saWN6a8Ozdy5cIixcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiBcImZyYW1pbmdcIixcbiAgICAgIGxhYmVsOiBcIlR3YXJ6IG1hIHfFgmHFm2Npd3kgcm96bWlhciB3IGthZHJ6ZVwiLFxuICAgICAgcGFzc2VkOiBiYWxhbmNlZEZyYW1pbmcsXG4gICAgICBoaW50OiBiYWxhbmNlZEZyYW1pbmcgPyBcIkthZHIgb2Jlam11amUgdHdhcnogcHJhd2lkxYJvd28uXCIgOiBcIlByenlibGnFvCBsdWIgb2RkYWwgdGVsZWZvbiwgYWJ5IG9iasSFxIcgY2HFgsSFIHR3YXJ6LlwiLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IFwicG9zaXRpb25cIixcbiAgICAgIGxhYmVsOiBcIlR3YXJ6IGplc3QgdXN0YXdpb25hIGNlbnRyYWxuaWVcIixcbiAgICAgIHBhc3NlZDogY2VudGVyZWQsXG4gICAgICBoaW50OiBjZW50ZXJlZCA/IFwiUG96eWNqYSB3eWdsxIVkYSBkb2JyemUuXCIgOiBcIld5csOzd25haiBnxYJvd8SZIGRvIMWbcm9ka2EgcHJvd2FkbmljeS5cIixcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiBcInN0YWJpbGl0eVwiLFxuICAgICAgbGFiZWw6IFwiVGVsZWZvbiBqZXN0IHVzdGF3aW9ueSBzdGFiaWxuaWVcIixcbiAgICAgIHBhc3NlZDogc3RhYmxlRW5vdWdoLFxuICAgICAgaGludDogc3RhYmxlRW5vdWdoID8gXCJPYnJheiBqZXN0IHd5c3RhcmN6YWrEhWNvIGN6eXRlbG55LlwiIDogXCJQcnp5dHJ6eW1haiB0ZWxlZm9uIHNwb2tvam5pZWogcHJ6ZWQgemRqxJljaWVtLlwiLFxuICAgIH0sXG4gIF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xpdmVDYXB0dXJlUmVhZHkoZ3VpZGFuY2U6IExpdmVDYW1lcmFHdWlkYW5jZSB8IG51bGwpIHtcbiAgaWYgKCFndWlkYW5jZSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gYnVpbGRMaXZlQ2FwdHVyZUNoZWNrbGlzdChndWlkYW5jZSkuZXZlcnkoaXRlbSA9PiBpdGVtLnBhc3NlZCk7XG59XG5cbmZ1bmN0aW9uIGRlc2NyaWJlQXV0b0NhcHR1cmVSZXNldFJlYXNvbihwcmV2aW91c1NuYXBzaG90OiBBdXRvQ2FwdHVyZVNuYXBzaG90LCBjdXJyZW50U25hcHNob3Q6IEF1dG9DYXB0dXJlU25hcHNob3QpIHtcbiAgY29uc3QgZGVsdGFYID0gY3VycmVudFNuYXBzaG90LmNlbnRlck9mZnNldFggLSBwcmV2aW91c1NuYXBzaG90LmNlbnRlck9mZnNldFg7XG4gIGNvbnN0IGRlbHRhWSA9IGN1cnJlbnRTbmFwc2hvdC5jZW50ZXJPZmZzZXRZIC0gcHJldmlvdXNTbmFwc2hvdC5jZW50ZXJPZmZzZXRZO1xuICBjb25zdCBkZWx0YUNvdmVyYWdlID0gY3VycmVudFNuYXBzaG90LmZhY2VDb3ZlcmFnZSAtIHByZXZpb3VzU25hcHNob3QuZmFjZUNvdmVyYWdlO1xuXG4gIGNvbnN0IGhvcml6b250YWxSYXRpbyA9IE1hdGguYWJzKGRlbHRhWCkgLyBBVVRPX0NBUFRVUkVfUE9TSVRJT05fREVMVEE7XG4gIGNvbnN0IHZlcnRpY2FsUmF0aW8gPSBNYXRoLmFicyhkZWx0YVkpIC8gQVVUT19DQVBUVVJFX1BPU0lUSU9OX0RFTFRBO1xuICBjb25zdCBkaXN0YW5jZVJhdGlvID0gTWF0aC5hYnMoZGVsdGFDb3ZlcmFnZSkgLyBBVVRPX0NBUFRVUkVfQ09WRVJBR0VfREVMVEE7XG5cbiAgaWYgKHZlcnRpY2FsUmF0aW8gPj0gaG9yaXpvbnRhbFJhdGlvICYmIHZlcnRpY2FsUmF0aW8gPj0gZGlzdGFuY2VSYXRpbykge1xuICAgIHJldHVybiBkZWx0YVkgPiAwID8gXCJ0d2FyeiBvcGFkxYJhIG5pxbxlaiB3IGthZHJ6ZVwiIDogXCJ0d2FyeiBwcnplc3VuxJnFgmEgc2nEmSB6Ynl0IHd5c29rbyB3IGthZHJ6ZVwiO1xuICB9XG5cbiAgaWYgKGhvcml6b250YWxSYXRpbyA+PSB2ZXJ0aWNhbFJhdGlvICYmIGhvcml6b250YWxSYXRpbyA+PSBkaXN0YW5jZVJhdGlvKSB7XG4gICAgcmV0dXJuIGRlbHRhWCA+IDAgPyBcInR3YXJ6IHByemVzdW7EmcWCYSBzacSZIHphIGJhcmR6byB3IHByYXdvXCIgOiBcInR3YXJ6IHByemVzdW7EmcWCYSBzacSZIHphIGJhcmR6byB3IGxld29cIjtcbiAgfVxuXG4gIHJldHVybiBkZWx0YUNvdmVyYWdlID4gMCA/IFwidGVsZWZvbiB6Ymxpxbx5xYIgc2nEmSB6Ynl0IG1vY25vIGRvIHR3YXJ6eVwiIDogXCJ0ZWxlZm9uIG9kZGFsacWCIHNpxJkgb2QgdHdhcnp5XCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsdWF0ZUF1dG9DYXB0dXJlUHJvZ3Jlc3Moe1xuICBlbmFibGVkLFxuICBndWlkYW5jZSxcbiAgdHJhY2tlcixcbiAgbm93LFxufToge1xuICBlbmFibGVkOiBib29sZWFuO1xuICBndWlkYW5jZTogTGl2ZUNhbWVyYUd1aWRhbmNlIHwgbnVsbDtcbiAgdHJhY2tlcjogQXV0b0NhcHR1cmVUcmFja2VyO1xuICBub3c6IG51bWJlcjtcbn0pOiBBdXRvQ2FwdHVyZUV2YWx1YXRpb24ge1xuICBpZiAoIWVuYWJsZWQgfHwgZ3VpZGFuY2UgPT09IG51bGwgfHwgIWlzTGl2ZUNhcHR1cmVSZWFkeShndWlkYW5jZSkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHJhY2tlcjogY3JlYXRlQXV0b0NhcHR1cmVUcmFja2VyKCksXG4gICAgICBjb3VudGRvd25NczogbnVsbCxcbiAgICAgIHNob3VsZENhcHR1cmU6IGZhbHNlLFxuICAgICAgcmVzZXRSZWFzb246IG51bGwsXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IGN1cnJlbnRTbmFwc2hvdDogQXV0b0NhcHR1cmVTbmFwc2hvdCA9IHtcbiAgICBjZW50ZXJPZmZzZXRYOiBndWlkYW5jZS5jZW50ZXJPZmZzZXRYLFxuICAgIGNlbnRlck9mZnNldFk6IGd1aWRhbmNlLmNlbnRlck9mZnNldFksXG4gICAgZmFjZUNvdmVyYWdlOiBndWlkYW5jZS5mYWNlQ292ZXJhZ2UsXG4gIH07XG4gIGNvbnN0IHByZXZpb3VzU25hcHNob3QgPSB0cmFja2VyLnNuYXBzaG90O1xuICBjb25zdCBzdGFibGVDb21wYXJlZFRvU25hcHNob3QgPVxuICAgIHByZXZpb3VzU25hcHNob3QgIT09IG51bGwgJiZcbiAgICBNYXRoLmFicyhjdXJyZW50U25hcHNob3QuY2VudGVyT2Zmc2V0WCAtIHByZXZpb3VzU25hcHNob3QuY2VudGVyT2Zmc2V0WCkgPD0gQVVUT19DQVBUVVJFX1BPU0lUSU9OX0RFTFRBICYmXG4gICAgTWF0aC5hYnMoY3VycmVudFNuYXBzaG90LmNlbnRlck9mZnNldFkgLSBwcmV2aW91c1NuYXBzaG90LmNlbnRlck9mZnNldFkpIDw9IEFVVE9fQ0FQVFVSRV9QT1NJVElPTl9ERUxUQSAmJlxuICAgIE1hdGguYWJzKGN1cnJlbnRTbmFwc2hvdC5mYWNlQ292ZXJhZ2UgLSBwcmV2aW91c1NuYXBzaG90LmZhY2VDb3ZlcmFnZSkgPD0gQVVUT19DQVBUVVJFX0NPVkVSQUdFX0RFTFRBO1xuXG4gIGlmICh0cmFja2VyLnN0YWJsZVNpbmNlID09PSBudWxsIHx8IHByZXZpb3VzU25hcHNob3QgPT09IG51bGwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHJhY2tlcjoge1xuICAgICAgICBzdGFibGVTaW5jZTogbm93LFxuICAgICAgICBzbmFwc2hvdDogY3VycmVudFNuYXBzaG90LFxuICAgICAgfSxcbiAgICAgIGNvdW50ZG93bk1zOiBBVVRPX0NBUFRVUkVfREVMQVlfTVMsXG4gICAgICBzaG91bGRDYXB0dXJlOiBmYWxzZSxcbiAgICAgIHJlc2V0UmVhc29uOiBudWxsLFxuICAgIH07XG4gIH1cblxuICBpZiAoIXN0YWJsZUNvbXBhcmVkVG9TbmFwc2hvdCkge1xuICAgIHJldHVybiB7XG4gICAgICB0cmFja2VyOiB7XG4gICAgICAgIHN0YWJsZVNpbmNlOiBub3csXG4gICAgICAgIHNuYXBzaG90OiBjdXJyZW50U25hcHNob3QsXG4gICAgICB9LFxuICAgICAgY291bnRkb3duTXM6IEFVVE9fQ0FQVFVSRV9ERUxBWV9NUyxcbiAgICAgIHNob3VsZENhcHR1cmU6IGZhbHNlLFxuICAgICAgcmVzZXRSZWFzb246IGRlc2NyaWJlQXV0b0NhcHR1cmVSZXNldFJlYXNvbihwcmV2aW91c1NuYXBzaG90LCBjdXJyZW50U25hcHNob3QpLFxuICAgIH07XG4gIH1cblxuICBjb25zdCByZW1haW5pbmdNcyA9IEFVVE9fQ0FQVFVSRV9ERUxBWV9NUyAtIChub3cgLSB0cmFja2VyLnN0YWJsZVNpbmNlKTtcbiAgaWYgKHJlbWFpbmluZ01zIDw9IDApIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHJhY2tlcjogY3JlYXRlQXV0b0NhcHR1cmVUcmFja2VyKCksXG4gICAgICBjb3VudGRvd25NczogMCxcbiAgICAgIHNob3VsZENhcHR1cmU6IHRydWUsXG4gICAgICByZXNldFJlYXNvbjogbnVsbCxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0cmFja2VyOiB7XG4gICAgICBzdGFibGVTaW5jZTogdHJhY2tlci5zdGFibGVTaW5jZSxcbiAgICAgIHNuYXBzaG90OiB7XG4gICAgICAgIGNlbnRlck9mZnNldFg6IChwcmV2aW91c1NuYXBzaG90LmNlbnRlck9mZnNldFggKyBjdXJyZW50U25hcHNob3QuY2VudGVyT2Zmc2V0WCkgLyAyLFxuICAgICAgICBjZW50ZXJPZmZzZXRZOiAocHJldmlvdXNTbmFwc2hvdC5jZW50ZXJPZmZzZXRZICsgY3VycmVudFNuYXBzaG90LmNlbnRlck9mZnNldFkpIC8gMixcbiAgICAgICAgZmFjZUNvdmVyYWdlOiAocHJldmlvdXNTbmFwc2hvdC5mYWNlQ292ZXJhZ2UgKyBjdXJyZW50U25hcHNob3QuZmFjZUNvdmVyYWdlKSAvIDIsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY291bnRkb3duTXM6IHJlbWFpbmluZ01zLFxuICAgIHNob3VsZENhcHR1cmU6IGZhbHNlLFxuICAgIHJlc2V0UmVhc29uOiBudWxsLFxuICB9O1xufVxuXG5leHBvcnQgdHlwZSBFdmFsdWF0ZUxpdmVDYW1lcmFHdWlkYW5jZU9wdGlvbnMgPSB7XG4gIG1lZGlhcGlwZUZhY2VTaWduYWw/OiBNZWRpYVBpcGVGYWNlU2lnbmFsIHwgbnVsbDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsdWF0ZUxpdmVDYW1lcmFHdWlkYW5jZShcbiAgaW1hZ2VEYXRhOiBQaWNrPEltYWdlRGF0YSwgXCJkYXRhXCIgfCBcIndpZHRoXCIgfCBcImhlaWdodFwiPixcbiAgc291cmNlV2lkdGggPSBpbWFnZURhdGEud2lkdGgsXG4gIHNvdXJjZUhlaWdodCA9IGltYWdlRGF0YS5oZWlnaHQsXG4gIG9wdGlvbnM6IEV2YWx1YXRlTGl2ZUNhbWVyYUd1aWRhbmNlT3B0aW9ucyA9IHt9XG4pOiBMaXZlQ2FtZXJhR3VpZGFuY2Uge1xuICBjb25zdCBxdWFsaXR5ID0gYXNzZXNzUGhvdG9RdWFsaXR5RnJvbUltYWdlRGF0YShpbWFnZURhdGEsIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQpO1xuICBjb25zdCBoZXVyaXN0aWNGYWNlU2lnbmFsID0gYnVpbGRGYWNlU2lnbmFsKGltYWdlRGF0YSk7XG4gIGNvbnN0IG1lZGlhcGlwZSA9IG9wdGlvbnMubWVkaWFwaXBlRmFjZVNpZ25hbDtcblxuICBjb25zdCBmYWNlU2lnbmFsID0gbWVkaWFwaXBlPy5kZXRlY3RlZCAmJiBtZWRpYXBpcGUuYm91bmRzXG4gICAgPyB7XG4gICAgICAuLi5oZXVyaXN0aWNGYWNlU2lnbmFsLFxuICAgICAgZGV0ZWN0ZWQ6IHRydWUsXG4gICAgICBmYWNlQm91bmRzOiBtZWRpYXBpcGUuYm91bmRzLFxuICAgICAgY292ZXJhZ2U6IE1hdGgubWF4KFxuICAgICAgICBoZXVyaXN0aWNGYWNlU2lnbmFsLmNvdmVyYWdlLFxuICAgICAgICBtZWRpYXBpcGUuYm91bmRzLndpZHRoICogbWVkaWFwaXBlLmJvdW5kcy5oZWlnaHRcbiAgICAgICksXG4gICAgIH1cbiAgICA6IGhldXJpc3RpY0ZhY2VTaWduYWw7XG5cbiAgY29uc3QgZGV0ZWN0aW9uU291cmNlOiBMaXZlRmFjZURldGVjdGlvblNvdXJjZSA9IG1lZGlhcGlwZT8uZGV0ZWN0ZWRcbiAgICA/IFwibWVkaWFwaXBlXCJcbiAgICA6IFwic2tpbi1waXhlbC1oZXVyaXN0aWNcIjtcblxuICBjb25zdCBjb2xvckNhcmQgPSBidWlsZENvbG9yQ2FyZERldGVjdGlvbihpbWFnZURhdGEsIGZhY2VTaWduYWwpO1xuICBjb25zdCBsaWdodENvbG9yID0gYnVpbGRMaWdodENvbG9yQXNzZXNzbWVudChpbWFnZURhdGEsIGZhY2VTaWduYWwsIGNvbG9yQ2FyZCk7XG5cbiAgY29uc3QgZGlzdGFuY2UgPSBlc3RpbWF0ZURpc3RhbmNlRnJvbUZhY2VTaWduYWwoXG4gICAgZmFjZVNpZ25hbC5mYWNlQm91bmRzXG4gICAgICA/IHtcbiAgICAgICAgbGVmdDogZmFjZVNpZ25hbC5mYWNlQm91bmRzLmxlZnQsXG4gICAgICAgIHRvcDogZmFjZVNpZ25hbC5mYWNlQm91bmRzLnRvcCxcbiAgICAgICAgd2lkdGg6IGZhY2VTaWduYWwuZmFjZUJvdW5kcy53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBmYWNlU2lnbmFsLmZhY2VCb3VuZHMuaGVpZ2h0LFxuICAgICAgIH1cbiAgICAgIDogbnVsbCxcbiAgICBmYWNlU2lnbmFsLmRldGVjdGVkXG4gICk7XG5cbiAgY29uc3QgcG9zZSA9IGJ1aWxkUG9zZUVzdGltYXRlKG1lZGlhcGlwZT8ucG9zZSA/PyBudWxsLCBCb29sZWFuKG1lZGlhcGlwZSkpO1xuXG4gIGNvbnN0IGNvc21ldGljcyA9IGZhY2VTaWduYWwuZGV0ZWN0ZWQgJiYgZmFjZVNpZ25hbC5mYWNlQm91bmRzXG4gICAgPyBkZXRlY3RDb3NtZXRpY3NPbkltYWdlKGltYWdlRGF0YSwgZmFjZVNpZ25hbC5mYWNlQm91bmRzKVxuICAgIDogKHtcbiAgICAgIHN0YXR1czogXCJyZWFkeVwiLFxuICAgICAgY29uZmlkZW5jZTogMCxcbiAgICAgIHNpZ25hbHM6IHsgZm91bmRhdGlvblNjb3JlOiAwLCBleWVNYWtldXBTY29yZTogMCwgZnJlc2hDcmVhbVNjb3JlOiAwIH0sXG4gICAgICBkZXRlY3RlZEtpbmRzOiBbXSxcbiAgICAgIGxhYmVsOiBcIktvc21ldHlraSBuYSBza8OzcnplXCIsXG4gICAgICB2YWx1ZTogXCJOaWVva3JlxZtsb25lXCIsXG4gICAgICBtZXNzYWdlOiBcIlBva2HFvCB0d2FyeiB3IGthZHJ6ZSwgxbxlYnkgc3ByYXdkemnEhyBvYmVjbm/Fm8SHIGtvc21ldHlrw7N3LlwiLFxuICAgICB9IGFzIENvc21ldGljc0RldGVjdGlvbik7XG5cbiAgY29uc3QgaW5kaWNhdG9yczogTGl2ZUd1aWRhbmNlSW5kaWNhdG9yW10gPSBbXG4gICAgYnVpbGRMaWdodGluZ0luZGljYXRvcihxdWFsaXR5LCBmYWNlU2lnbmFsLmRhcmtCYWNrZ3JvdW5kKSxcbiAgICBidWlsZExpZ2h0Q29sb3JJbmRpY2F0b3IobGlnaHRDb2xvciksXG4gICAgYnVpbGRGcmFtaW5nSW5kaWNhdG9yKGZhY2VTaWduYWwuZGV0ZWN0ZWQsIGZhY2VTaWduYWwuY292ZXJhZ2UsIGZhY2VTaWduYWwuY2hlZWtzT2JzY3VyZWQpLFxuICAgIGJ1aWxkUG9zaXRpb25JbmRpY2F0b3IoZmFjZVNpZ25hbC5kZXRlY3RlZCwgZmFjZVNpZ25hbC5jZW50ZXJPZmZzZXRYLCBmYWNlU2lnbmFsLmNlbnRlck9mZnNldFkpLFxuICAgIGJ1aWxkRGlzdGFuY2VJbmRpY2F0b3IoZGlzdGFuY2UpLFxuICBdO1xuXG4gIGlmIChjb3NtZXRpY3Muc3RhdHVzID09PSBcIndhcm5pbmdcIikge1xuICAgIGluZGljYXRvcnMucHVzaChidWlsZENvc21ldGljc0luZGljYXRvcihjb3NtZXRpY3MpKTtcbiAgfVxuXG4gIGlmIChwb3NlLmF2YWlsYWJsZSkge1xuICAgIGluZGljYXRvcnMucHVzaChidWlsZFBvc2VJbmRpY2F0b3IocG9zZSkpO1xuICB9XG5cbiAgY29uc3Qgc3RhdHVzOiBMaXZlR3VpZGFuY2VTdGF0dXMgPSBpbmRpY2F0b3JzLnNvbWUoaXRlbSA9PiBpdGVtLnN0YXR1cyA9PT0gXCJibG9ja2VkXCIpXG4gICAgPyBcImJsb2NrZWRcIlxuICAgIDogaW5kaWNhdG9ycy5zb21lKGl0ZW0gPT4gaXRlbS5zdGF0dXMgPT09IFwid2FybmluZ1wiKSB8fCBxdWFsaXR5LnN0YXR1cyA9PT0gXCJ3YXJuaW5nXCJcbiAgICAgID8gXCJ3YXJuaW5nXCJcbiAgICAgIDogXCJyZWFkeVwiO1xuXG4gIGNvbnN0IHNjb3JlID0gTWF0aC5yb3VuZChcbiAgICBxdWFsaXR5LnNjb3JlICogMC40MiArXG4gICAgICBzY29yZUZyb21TdGF0dXMoaW5kaWNhdG9yc1swXS5zdGF0dXMpICogMC4xNiArXG4gICAgICBzY29yZUZyb21TdGF0dXMoaW5kaWNhdG9yc1sxXS5zdGF0dXMpICogMC4xMyArXG4gICAgICBzY29yZUZyb21TdGF0dXMoaW5kaWNhdG9yc1syXS5zdGF0dXMpICogMC4xMiArXG4gICAgICBzY29yZUZyb21TdGF0dXMoaW5kaWNhdG9yc1szXS5zdGF0dXMpICogMC4wOSArXG4gICAgICBzY29yZUZyb21TdGF0dXMoaW5kaWNhdG9yc1s0XS5zdGF0dXMpICogMC4wOFxuICApO1xuXG4gIGNvbnN0IHN1bW1hcnkgPVxuICAgIHN0YXR1cyA9PT0gXCJyZWFkeVwiXG4gICAgICA/IFwixZp3aWF0xYJvIGkgdXN0YXdpZW5pZSB0d2Fyenkgd3lnbMSFZGFqxIUgc3RhYmlsbmllLiBNb8W8ZXN6IHd5a29uYcSHIHpkasSZY2llLlwiXG4gICAgICA6ICFmYWNlU2lnbmFsLmRldGVjdGVkXG4gICAgICAgID8gXCJOYWpwaWVydyBwb3ByYXcgdXN0YXdpZW5pZSB0d2FyenkgYWxibyBvxZt3aWV0bGVuaWUsIGFieSB6ZGrEmWNpZSBuYWRhd2HFgm8gc2nEmSBkbyBhbmFsaXp5LlwiXG4gICAgICAgIDogbGlnaHRDb2xvci5zdGF0dXMgPT09IFwiYmxvY2tlZFwiXG4gICAgICAgICAgPyBcIkJhcndhIGFsYm8gcsOzd25vbWllcm5vxZvEhyDFm3dpYXTFgmEgbW/FvGUgemFmYcWCc3pvd2HEhyBvY2VuxJkgc2vDs3J5LiBVc3RhdyB0d2FyeiBmcm9udGVtIGRvIGplZG5lZ28sIGJhcmR6aWVqIG5ldXRyYWxuZWdvIMW6csOzZMWCYSDFm3dpYXTFgmEuXCJcbiAgICAgICAgICA6IHN0YXR1cyA9PT0gXCJ3YXJuaW5nXCJcbiAgICAgICAgICAgID8gXCJLYWRyIGplc3QgYmxpc2tvIGdvdG93b8WbY2kuIE5pZXdpZWxrYSBrb3Jla3RhIMWbd2lhdMWCYSBsdWIgcG/Fgm/FvGVuaWEgdHdhcnp5IHBvcHJhd2kgamFrb8WbxIcgemRqxJljaWEuXCJcbiAgICAgICAgICAgIDogXCJOYWpwaWVydyBwb3ByYXcgdXN0YXdpZW5pZSB0d2FyenkgYWxibyBvxZt3aWV0bGVuaWUsIGFieSB6ZGrEmWNpZSBuYWRhd2HFgm8gc2nEmSBkbyBhbmFsaXp5LlwiO1xuXG4gIHJldHVybiB7XG4gICAgc3RhdHVzLFxuICAgIHNjb3JlOiBjbGFtcChzY29yZSwgMCwgMTAwKSxcbiAgICBsYWJlbDogbGFiZWxGcm9tU3RhdHVzKHN0YXR1cyksXG4gICAgc3VtbWFyeSxcbiAgICBpbmRpY2F0b3JzLFxuICAgIHF1YWxpdHksXG4gICAgZmFjZURldGVjdGVkOiBmYWNlU2lnbmFsLmRldGVjdGVkLFxuICAgIGZhY2VDb3ZlcmFnZTogcm91bmQoZmFjZVNpZ25hbC5jb3ZlcmFnZSwgMyksXG4gICAgY2VudGVyT2Zmc2V0WDogcm91bmQoZmFjZVNpZ25hbC5jZW50ZXJPZmZzZXRYLCAzKSxcbiAgICBjZW50ZXJPZmZzZXRZOiByb3VuZChmYWNlU2lnbmFsLmNlbnRlck9mZnNldFksIDMpLFxuICAgIGJhY2tncm91bmRMdW1hOiByb3VuZChmYWNlU2lnbmFsLmJhY2tncm91bmRMdW1hLCAxKSxcbiAgICBkYXJrQmFja2dyb3VuZDogZmFjZVNpZ25hbC5kYXJrQmFja2dyb3VuZCxcbiAgICBjaGVla3NPYnNjdXJlZDogZmFjZVNpZ25hbC5jaGVla3NPYnNjdXJlZCxcbiAgICBmYWNlQm91bmRzOiBmYWNlU2lnbmFsLmZhY2VCb3VuZHNcbiAgICAgID8ge1xuICAgICAgICBsZWZ0OiByb3VuZChmYWNlU2lnbmFsLmZhY2VCb3VuZHMubGVmdCwgMyksXG4gICAgICAgIHRvcDogcm91bmQoZmFjZVNpZ25hbC5mYWNlQm91bmRzLnRvcCwgMyksXG4gICAgICAgIHdpZHRoOiByb3VuZChmYWNlU2lnbmFsLmZhY2VCb3VuZHMud2lkdGgsIDMpLFxuICAgICAgICBoZWlnaHQ6IHJvdW5kKGZhY2VTaWduYWwuZmFjZUJvdW5kcy5oZWlnaHQsIDMpLFxuICAgICAgIH1cbiAgICAgIDogbnVsbCxcbiAgICBsaWdodENvbG9yLFxuICAgIGNvbG9yQ2FyZCxcbiAgICBkaXN0YW5jZSxcbiAgICBwb3NlLFxuICAgIGRldGVjdGlvblNvdXJjZSxcbiAgICBjb3NtZXRpY3MsXG4gIH07XG59XG4iXX0=