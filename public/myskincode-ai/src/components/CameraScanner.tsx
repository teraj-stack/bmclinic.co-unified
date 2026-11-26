import { createHotContext as __vite__createHotContext } from "/myskincode-ai/@vite/client";import.meta.hot = __vite__createHotContext("/myskincode-ai/src/components/CameraScanner.tsx");const React = __vite__cjsImport0_react; const useEffect = __vite__cjsImport0_react["useEffect"]; const useRef = __vite__cjsImport0_react["useRef"]; const useState = __vite__cjsImport0_react["useState"]; const useCallback = __vite__cjsImport0_react["useCallback"];const _jsxDEV = __vite__cjsImport5_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/myskincode-ai/node_modules/.vite/deps/react.js?v=5f77a7b6";
import { AlertCircle, CheckCircle2, Loader2, Volume2, VolumeX, Activity, Thermometer, Sparkles } from "/myskincode-ai/node_modules/.vite/deps/lucide-react.js?v=c90b8d26";
import { useMediaPipeFaceLandmarker } from "/myskincode-ai/src/hooks/useMediaPipeFaceLandmarker.ts";
import { useVoiceCoaching } from "/myskincode-ai/src/hooks/useVoiceCoaching.ts";
import { evaluateLiveCameraGuidance, createAutoCaptureTracker, evaluateAutoCaptureProgress, buildLiveCaptureChecklist, CLINICAL_CCT_RANGE } from "/myskincode-ai/src/lib/liveCameraGuidance.ts";
var _jsxFileName = "/app/applet/src/components/CameraScanner.tsx";
import __vite__cjsImport5_react_jsxDevRuntime from "/myskincode-ai/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=5f77a7b6";
var _s = $RefreshSig$();
export const CameraScanner = ({ onComplete }) => {
	_s();
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const [hasPermission, setHasPermission] = useState(null);
	const [voiceEnabled, setVoiceEnabled] = useState(true);
	const voiceCoach = useVoiceCoaching({
		enabled: voiceEnabled,
		rate: .95
	});
	const mediapipe = useMediaPipeFaceLandmarker({ enabled: true });
	const [guidance, setGuidance] = useState(null);
	const [autoCaptureTracker, setAutoCaptureTracker] = useState(createAutoCaptureTracker());
	const [countdown, setCountdown] = useState(null);
	const capturedRef = useRef(false);
	const analyzeFrame = useCallback(() => {
		if (capturedRef.current) return;
		if (!videoRef.current || !canvasRef.current) return;
		const video = videoRef.current;
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d", { willReadFrequently: true });
		if (!ctx || video.videoWidth === 0) return;
		if (canvas.width !== video.videoWidth) {
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
		}
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const mediapipeSignal = mediapipe.status === "ready" ? mediapipe.detect(video, performance.now()) : null;
		const newGuidance = evaluateLiveCameraGuidance(imageData, canvas.width, canvas.height, { mediapipeFaceSignal: mediapipeSignal });
		setGuidance(newGuidance);
		voiceCoach.speak(newGuidance.indicators[0]?.message || "", newGuidance.indicators[0]?.key || "");
		const evalResult = evaluateAutoCaptureProgress({
			enabled: true,
			guidance: newGuidance,
			tracker: autoCaptureTracker,
			now: performance.now()
		});
		setAutoCaptureTracker(evalResult.tracker);
		setCountdown(evalResult.countdownMs);
		if (evalResult.shouldCapture && !capturedRef.current) {
			capturedRef.current = true;
			const finalSnapshot = {
				liveGuidanceScore: newGuidance.score,
				distanceCm: newGuidance.distance.distanceCm || undefined,
				poseYawDegrees: newGuidance.pose.yawDegrees || undefined,
				posePitchDegrees: newGuidance.pose.pitchDegrees || undefined,
				poseRollDegrees: newGuidance.pose.rollDegrees || undefined,
				cosmeticsConfidence: newGuidance.cosmetics.confidence,
				cosmeticsDetectedKinds: newGuidance.cosmetics.detectedKinds,
				colorTemperatureKelvin: newGuidance.lightColor.colorTemperature.kelvin || undefined,
				colorCardDetected: newGuidance.colorCard.detected
			};
			onComplete(finalSnapshot);
		}
	}, [
		mediapipe,
		voiceCoach,
		autoCaptureTracker,
		onComplete
	]);
	useEffect(() => {
		let stream = null;
		let intervalId;
		const startCamera = async () => {
			try {
				stream = await navigator.mediaDevices.getUserMedia({ video: {
					facingMode: "user",
					width: { ideal: 1280 },
					height: { ideal: 720 }
				} });
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
				}
				setHasPermission(true);
				intervalId = window.setInterval(analyzeFrame, 150);
			} catch (err) {
				console.error("Camera access denied:", err);
				setHasPermission(false);
			}
		};
		startCamera();
		return () => {
			if (stream) stream.getTracks().forEach((track) => track.stop());
			if (intervalId) clearInterval(intervalId);
			voiceCoach.cancel();
		};
	}, [analyzeFrame, voiceCoach]);
	if (hasPermission === false) {
		return /* @__PURE__ */ _jsxDEV("div", {
			className: "min-h-screen flex items-center justify-center p-6 bg-navy-950",
			children: /* @__PURE__ */ _jsxDEV("div", {
				className: "bg-navy-900 p-10 rounded-3xl max-w-md w-full text-center shadow-silver-glow-strong border border-silver-500/30",
				children: [
					/* @__PURE__ */ _jsxDEV(AlertCircle, {
						className: "w-16 h-16 text-red-500 mx-auto mb-6",
						strokeWidth: 1.5
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 108,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("h2", {
						className: "text-3xl font-serif font-light text-white mb-4",
						children: "Brak dostępu do kamery"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 109,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("p", {
						className: "text-graphite-400 mb-8 font-light leading-relaxed",
						children: "Aplikacja MySkinCode wymaga dostępu do kamery w celu przeprowadzenia analizy standaryzacji zdjęcia."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 110,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						onClick: () => window.location.reload(),
						className: "px-10 py-4 bg-navy-950 text-silver-300 rounded-full font-sans font-medium tracking-widest uppercase hover:text-silver-100 hover:shadow-silver-glow transition-all border border-silver-500/40",
						children: "Spróbuj ponownie"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 113,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 107,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 106,
			columnNumber: 7
		}, this);
	}
	const checklist = guidance ? buildLiveCaptureChecklist(guidance) : [];
	const currentCCT = guidance?.lightColor.colorTemperature.kelvin;
	const isClinicallyOptimalCCT = currentCCT ? currentCCT >= CLINICAL_CCT_RANGE[0] && currentCCT <= CLINICAL_CCT_RANGE[1] : false;
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "min-h-screen bg-navy-950 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden",
		children: /* @__PURE__ */ _jsxDEV("div", {
			className: "w-full max-w-5xl relative rounded-[2.5rem] overflow-hidden bg-black shadow-2xl border border-silver-500/20 aspect-[4/3] md:aspect-video",
			children: [
				/* @__PURE__ */ _jsxDEV("canvas", {
					ref: canvasRef,
					className: "hidden"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 132,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("video", {
					ref: videoRef,
					autoPlay: true,
					playsInline: true,
					muted: true,
					className: "w-full h-full object-cover opacity-70 grayscale-[20%]"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 134,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "absolute inset-0 pointer-events-none",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "absolute inset-0 flex items-center justify-center",
						children: /* @__PURE__ */ _jsxDEV("div", {
							className: `w-56 h-72 md:w-72 md:h-96 border-2 rounded-[100%] relative transition-colors duration-500 ${guidance?.status === "ready" ? "border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)]" : "border-silver-500/40 shadow-silver-glow-inner"}`,
							children: [
								/* @__PURE__ */ _jsxDEV("div", { className: `absolute -top-2 -left-2 w-6 h-6 border-t-[3px] border-l-[3px] transition-colors duration-500 ${guidance?.status === "ready" ? "border-emerald-400" : "border-silver-400"}` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 146,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("div", { className: `absolute -top-2 -right-2 w-6 h-6 border-t-[3px] border-r-[3px] transition-colors duration-500 ${guidance?.status === "ready" ? "border-emerald-400" : "border-silver-400"}` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 147,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("div", { className: `absolute -bottom-2 -left-2 w-6 h-6 border-b-[3px] border-l-[3px] transition-colors duration-500 ${guidance?.status === "ready" ? "border-emerald-400" : "border-silver-400"}` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 148,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("div", { className: `absolute -bottom-2 -right-2 w-6 h-6 border-b-[3px] border-r-[3px] transition-colors duration-500 ${guidance?.status === "ready" ? "border-emerald-400" : "border-silver-400"}` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 149,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 145,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 144,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", { className: "absolute top-0 left-0 w-full h-[1px] bg-silver-400 shadow-[0_0_20px_rgba(203,213,225,1)] animate-scan" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 152,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 143,
					columnNumber: 9
				}, this),
				countdown !== null && countdown < 2e3 && /* @__PURE__ */ _jsxDEV("div", {
					className: "absolute inset-0 flex items-center justify-center z-30 bg-navy-950/40 backdrop-blur-sm",
					children: /* @__PURE__ */ _jsxDEV("div", {
						className: "text-8xl font-serif text-silver-400 animate-pulse",
						children: Math.ceil(countdown / 1e3)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 158,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 157,
					columnNumber: 11
				}, this),
				voiceCoach.supported && /* @__PURE__ */ _jsxDEV("div", {
					className: "absolute top-8 left-8 z-20 pointer-events-auto",
					children: /* @__PURE__ */ _jsxDEV("div", {
						className: "bg-navy-950/90 backdrop-blur-xl border border-silver-500/30 rounded-2xl p-4 flex items-center gap-5 shadow-silver-glow",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-4",
							children: [voiceEnabled ? /* @__PURE__ */ _jsxDEV(Volume2, {
								className: "w-5 h-5 text-silver-400",
								strokeWidth: 1.5
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 169,
								columnNumber: 33
							}, this) : /* @__PURE__ */ _jsxDEV(VolumeX, {
								className: "w-5 h-5 text-graphite-500",
								strokeWidth: 1.5
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 169,
								columnNumber: 101
							}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[9px] text-silver-500/80 font-sans tracking-[0.2em] uppercase mb-0.5",
								children: "Asystent Głosowy"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 171,
								columnNumber: 19
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "text-xs font-medium text-graphite-300",
								children: "Wskazówki na żywo"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 172,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 170,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 168,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setVoiceEnabled(!voiceEnabled),
							className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${voiceEnabled ? "bg-silver-600" : "bg-navy-700"}`,
							children: /* @__PURE__ */ _jsxDEV("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${voiceEnabled ? "translate-x-6" : "translate-x-1"}` }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 179,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 175,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 167,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 166,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "absolute top-8 right-8 flex flex-col gap-4 z-20",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "bg-navy-950/90 backdrop-blur-xl border border-silver-500/30 rounded-2xl p-4 flex items-center gap-4 shadow-silver-glow",
							children: [/* @__PURE__ */ _jsxDEV(Activity, {
								className: `w-5 h-5 ${mediapipe.status === "ready" ? "text-emerald-400" : mediapipe.status === "failed" ? "text-red-400" : "text-silver-400"}`,
								strokeWidth: 1.5
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 189,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[9px] text-silver-500/80 font-sans tracking-[0.2em] uppercase mb-0.5",
								children: "MediaPipe Pose"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 191,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "text-sm font-serif font-light text-white",
								children: mediapipe.status === "ready" ? "Aktywny" : mediapipe.status === "failed" ? "Błąd (Fallback)" : "Ładowanie..."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 192,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 190,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 188,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "bg-navy-950/90 backdrop-blur-xl border border-silver-500/30 rounded-2xl p-4 flex items-center gap-4 shadow-silver-glow",
							children: [/* @__PURE__ */ _jsxDEV(Thermometer, {
								className: `w-5 h-5 ${isClinicallyOptimalCCT ? "text-emerald-400" : "text-silver-400"}`,
								strokeWidth: 1.5
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 200,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[9px] text-silver-500/80 font-sans tracking-[0.2em] uppercase mb-0.5",
								children: "CCT Kelvin"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 202,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "text-sm font-serif font-light text-white",
								children: currentCCT ? `${currentCCT}K` : "Analiza..."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 203,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 201,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 199,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "bg-navy-950/90 backdrop-blur-xl border border-silver-500/30 rounded-2xl p-4 flex items-center gap-4 shadow-silver-glow",
							children: [/* @__PURE__ */ _jsxDEV(Sparkles, {
								className: `w-5 h-5 ${guidance?.cosmetics.status === "warning" ? "text-amber-500" : "text-silver-400"}`,
								strokeWidth: 1.5
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 211,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[9px] text-silver-500/80 font-sans tracking-[0.2em] uppercase mb-0.5",
								children: "Kosmetyki"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 213,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "text-sm font-serif font-light text-white",
								children: guidance?.cosmetics ? `${(guidance.cosmetics.confidence * 100).toFixed(1)}%` : "Analiza..."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 214,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 212,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 210,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 186,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "absolute top-8 right-8 flex flex-col gap-3 z-20 mt-64",
					children: guidance?.indicators.map((ind) => /* @__PURE__ */ _jsxDEV("div", {
						className: "bg-navy-950/90 backdrop-blur-xl border border-silver-500/30 rounded-2xl p-3 flex items-center gap-4 shadow-silver-glow w-64",
						children: [/* @__PURE__ */ _jsxDEV("div", { className: `w-2.5 h-2.5 rounded-full shadow-sm shrink-0 ${ind.status === "ready" ? "bg-emerald-400 shadow-emerald-400/50" : ind.status === "warning" ? "bg-amber-400 shadow-amber-400/50" : "bg-red-400 shadow-red-400/50"}` }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 225,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[9px] text-silver-500/80 font-sans tracking-[0.2em] uppercase mb-0.5",
								children: ind.label
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 227,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "text-xs font-serif font-light text-white truncate",
								children: ind.value
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 228,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 226,
							columnNumber: 15
						}, this)]
					}, ind.key, true, {
						fileName: _jsxFileName,
						lineNumber: 224,
						columnNumber: 13
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 222,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-navy-950 via-navy-950/90 to-transparent",
					children: /* @__PURE__ */ _jsxDEV("div", {
						className: "max-w-3xl mx-auto bg-navy-900/90 backdrop-blur-xl p-6 rounded-3xl border border-silver-500/30 shadow-silver-glow-strong",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[10px] text-silver-500/80 font-sans tracking-[0.2em] uppercase mb-4 text-center",
								children: "Status Kadru"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 237,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-2 md:grid-cols-3 gap-4",
								children: checklist.map((item) => /* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-3",
									children: [item.passed ? /* @__PURE__ */ _jsxDEV(CheckCircle2, { className: "w-4 h-4 text-emerald-400 shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 241,
										columnNumber: 34
									}, this) : /* @__PURE__ */ _jsxDEV(Loader2, { className: "w-4 h-4 text-silver-500/50 animate-spin shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 241,
										columnNumber: 99
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: `text-[10px] font-sans uppercase tracking-wider leading-tight ${item.passed ? "text-silver-100" : "text-graphite-500"}`,
										children: item.label
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 242,
										columnNumber: 19
									}, this)]
								}, item.id, true, {
									fileName: _jsxFileName,
									lineNumber: 240,
									columnNumber: 17
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 238,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "mt-5 text-center text-sm font-serif text-silver-300 italic",
								children: guidance?.summary || "Inicjalizacja kamery..."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 246,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 236,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 235,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 130,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 129,
		columnNumber: 5
	}, this);
};
_s(CameraScanner, "+RJp0j+5YttOD8rG3EtqymEfipQ=", false, function() {
	return [useVoiceCoaching, useMediaPipeFaceLandmarker];
});
_c = CameraScanner;
var _c;
$RefreshReg$(_c, "CameraScanner");
import * as RefreshRuntime from "/myskincode-ai/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/myskincode-ai/src/components/CameraScanner.tsx";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("/app/applet/src/components/CameraScanner.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/applet/src/components/CameraScanner.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "/app/applet/src/components/CameraScanner.tsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLFdBQVcsUUFBUSxVQUFVLG1CQUFtQjtBQUNoRSxTQUFTLGFBQWEsY0FBYyxTQUFTLFNBQVMsU0FBUyxVQUFVLGFBQWEsZ0JBQWdCO0FBRXRHLFNBQVMsa0NBQWtDO0FBQzNDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsNEJBQWdELDBCQUEwQiw2QkFBNkIsMkJBQTJCLDBCQUEwQjs7OztBQU1ySyxPQUFPLE1BQU0saUJBQStDLEVBQUUsaUJBQWlCOztDQUM3RSxNQUFNLFdBQVcsT0FBeUIsSUFBSTtDQUM5QyxNQUFNLFlBQVksT0FBMEIsSUFBSTtDQUNoRCxNQUFNLENBQUMsZUFBZSxvQkFBb0IsU0FBeUIsSUFBSTtDQUV2RSxNQUFNLENBQUMsY0FBYyxtQkFBbUIsU0FBa0IsSUFBSTtDQUM5RCxNQUFNLGFBQWEsaUJBQWlCO0VBQUUsU0FBUztFQUFjLE1BQU07Q0FBSyxDQUFDO0NBQ3pFLE1BQU0sWUFBWSwyQkFBMkIsRUFBRSxTQUFTLEtBQUssQ0FBQztDQUU5RCxNQUFNLENBQUMsVUFBVSxlQUFlLFNBQW9DLElBQUk7Q0FDeEUsTUFBTSxDQUFDLG9CQUFvQix5QkFBeUIsU0FBUyx5QkFBeUIsQ0FBQztDQUN2RixNQUFNLENBQUMsV0FBVyxnQkFBZ0IsU0FBd0IsSUFBSTtDQUM5RCxNQUFNLGNBQWMsT0FBTyxLQUFLO0NBRWhDLE1BQU0sZUFBZSxrQkFBa0I7RUFDckMsSUFBSSxZQUFZLFNBQVM7RUFDekIsSUFBSSxDQUFDLFNBQVMsV0FBVyxDQUFDLFVBQVUsU0FBUztFQUM3QyxNQUFNLFFBQVEsU0FBUztFQUN2QixNQUFNLFNBQVMsVUFBVTtFQUN6QixNQUFNLE1BQU0sT0FBTyxXQUFXLE1BQU0sRUFBRSxvQkFBb0IsS0FBSyxDQUFDO0VBQ2hFLElBQUksQ0FBQyxPQUFPLE1BQU0sZUFBZSxHQUFHO0VBRXBDLElBQUksT0FBTyxVQUFVLE1BQU0sWUFBWTtHQUNyQyxPQUFPLFFBQVEsTUFBTTtHQUNyQixPQUFPLFNBQVMsTUFBTTtFQUN4QjtFQUVBLElBQUksVUFBVSxPQUFPLEdBQUcsR0FBRyxPQUFPLE9BQU8sT0FBTyxNQUFNO0VBQ3RELE1BQU0sWUFBWSxJQUFJLGFBQWEsR0FBRyxHQUFHLE9BQU8sT0FBTyxPQUFPLE1BQU07RUFFcEUsTUFBTSxrQkFBa0IsVUFBVSxXQUFXLFVBQVUsVUFBVSxPQUFPLE9BQU8sWUFBWSxJQUFJLENBQUMsSUFBSTtFQUVwRyxNQUFNLGNBQWMsMkJBQTJCLFdBQVcsT0FBTyxPQUFPLE9BQU8sUUFBUSxFQUFFLHFCQUFxQixnQkFBZ0IsQ0FBQztFQUMvSCxZQUFZLFdBQVc7RUFDdkIsV0FBVyxNQUFNLFlBQVksV0FBVyxFQUFFLEVBQUUsV0FBVyxJQUFJLFlBQVksV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFO0VBRS9GLE1BQU0sYUFBYSw0QkFBNEI7R0FDN0MsU0FBUztHQUNULFVBQVU7R0FDVixTQUFTO0dBQ1QsS0FBSyxZQUFZLElBQUk7RUFDdkIsQ0FBQztFQUVELHNCQUFzQixXQUFXLE9BQU87RUFDeEMsYUFBYSxXQUFXLFdBQVc7RUFFbkMsSUFBSSxXQUFXLGlCQUFpQixDQUFDLFlBQVksU0FBUztHQUNwRCxZQUFZLFVBQVU7R0FDdEIsTUFBTSxnQkFBc0M7SUFDMUMsbUJBQW1CLFlBQVk7SUFDL0IsWUFBWSxZQUFZLFNBQVMsY0FBYztJQUMvQyxnQkFBZ0IsWUFBWSxLQUFLLGNBQWM7SUFDL0Msa0JBQWtCLFlBQVksS0FBSyxnQkFBZ0I7SUFDbkQsaUJBQWlCLFlBQVksS0FBSyxlQUFlO0lBQ2pELHFCQUFxQixZQUFZLFVBQVU7SUFDM0Msd0JBQXdCLFlBQVksVUFBVTtJQUM5Qyx3QkFBd0IsWUFBWSxXQUFXLGlCQUFpQixVQUFVO0lBQzFFLG1CQUFtQixZQUFZLFVBQVU7R0FDM0M7R0FDQSxXQUFXLGFBQWE7RUFDMUI7Q0FDRixHQUFHO0VBQUM7RUFBVztFQUFZO0VBQW9CO0NBQVUsQ0FBQztDQUUxRCxnQkFBZ0I7RUFDZCxJQUFJLFNBQTZCO0VBQ2pDLElBQUk7RUFFSixNQUFNLGNBQWMsWUFBWTtHQUM5QixJQUFJO0lBQ0YsU0FBUyxNQUFNLFVBQVUsYUFBYSxhQUFhLEVBQ2pELE9BQU87S0FBRSxZQUFZO0tBQVEsT0FBTyxFQUFFLE9BQU8sS0FBSztLQUFHLFFBQVEsRUFBRSxPQUFPLElBQUk7SUFBRSxFQUM5RSxDQUFDO0lBQ0QsSUFBSSxTQUFTLFNBQVM7S0FDcEIsU0FBUyxRQUFRLFlBQVk7SUFDL0I7SUFDQSxpQkFBaUIsSUFBSTtJQUNyQixhQUFhLE9BQU8sWUFBWSxjQUFjLEdBQUc7R0FDbkQsU0FBUyxLQUFLO0lBQ1osUUFBUSxNQUFNLHlCQUF5QixHQUFHO0lBQzFDLGlCQUFpQixLQUFLO0dBQ3hCO0VBQ0Y7RUFFQSxZQUFZO0VBRVosYUFBYTtHQUNYLElBQUksUUFBUSxPQUFPLFVBQVUsQ0FBQyxDQUFDLFNBQVEsVUFBUyxNQUFNLEtBQUssQ0FBQztHQUM1RCxJQUFJLFlBQVksY0FBYyxVQUFVO0dBQ3hDLFdBQVcsT0FBTztFQUNwQjtDQUNGLEdBQUcsQ0FBQyxjQUFjLFVBQVUsQ0FBQztDQUU3QixJQUFJLGtCQUFrQixPQUFPO0VBQzNCLE9BQ0Usd0JBQUMsT0FBRDtHQUFLLFdBQVU7YUFDYix3QkFBQyxPQUFEO0lBQUssV0FBVTtjQUFmO0tBQ0Usd0JBQUMsYUFBRDtNQUFhLFdBQVU7TUFBc0MsYUFBYTtLQUFNOzs7OztLQUNoRix3QkFBQyxNQUFEO01BQUksV0FBVTtnQkFBaUQ7S0FBMEI7Ozs7O0tBQ3pGLHdCQUFDLEtBQUQ7TUFBRyxXQUFVO2dCQUFvRDtLQUU5RDs7Ozs7S0FDSCx3QkFBQyxVQUFEO01BQ0UsZUFBZSxPQUFPLFNBQVMsT0FBTztNQUN0QyxXQUFVO2dCQUNYO0tBRU87Ozs7O0lBQ0w7Ozs7OztFQUNGOzs7OztDQUVUO0NBRUEsTUFBTSxZQUFZLFdBQVcsMEJBQTBCLFFBQVEsSUFBSSxDQUFDO0NBQ3BFLE1BQU0sYUFBYSxVQUFVLFdBQVcsaUJBQWlCO0NBQ3pELE1BQU0seUJBQXlCLGFBQWEsY0FBYyxtQkFBbUIsTUFBTSxjQUFjLG1CQUFtQixLQUFLO0NBRXpILE9BQ0Usd0JBQUMsT0FBRDtFQUFLLFdBQVU7WUFDYix3QkFBQyxPQUFEO0dBQUssV0FBVTthQUFmO0lBRUUsd0JBQUMsVUFBRDtLQUFRLEtBQUs7S0FBVyxXQUFVO0lBQVU7Ozs7O0lBRTVDLHdCQUFDLFNBQUQ7S0FDRSxLQUFLO0tBQ0w7S0FDQTtLQUNBO0tBQ0EsV0FBVTtJQUNYOzs7OztJQUdELHdCQUFDLE9BQUQ7S0FBSyxXQUFVO2VBQWYsQ0FDRSx3QkFBQyxPQUFEO01BQUssV0FBVTtnQkFDYix3QkFBQyxPQUFEO09BQUssV0FBVyw2RkFBNkYsVUFBVSxXQUFXLFVBQVUsOERBQThEO2lCQUExTTtRQUNFLHdCQUFDLE9BQUQsRUFBSyxXQUFXLGdHQUFnRyxVQUFVLFdBQVcsVUFBVSx1QkFBdUIsc0JBQTRCOzs7OztRQUNsTSx3QkFBQyxPQUFELEVBQUssV0FBVyxpR0FBaUcsVUFBVSxXQUFXLFVBQVUsdUJBQXVCLHNCQUE0Qjs7Ozs7UUFDbk0sd0JBQUMsT0FBRCxFQUFLLFdBQVcsbUdBQW1HLFVBQVUsV0FBVyxVQUFVLHVCQUF1QixzQkFBNEI7Ozs7O1FBQ3JNLHdCQUFDLE9BQUQsRUFBSyxXQUFXLG9HQUFvRyxVQUFVLFdBQVcsVUFBVSx1QkFBdUIsc0JBQTRCOzs7OztPQUNuTTs7Ozs7O0tBQ0Y7Ozs7ZUFDTCx3QkFBQyxPQUFELEVBQUssV0FBVSx3R0FBNkc7Ozs7YUFDekg7Ozs7OztJQUdKLGNBQWMsUUFBUSxZQUFZLE9BQ2pDLHdCQUFDLE9BQUQ7S0FBSyxXQUFVO2VBQ2Isd0JBQUMsT0FBRDtNQUFLLFdBQVU7Z0JBQ1osS0FBSyxLQUFLLFlBQVksR0FBSTtLQUN4Qjs7Ozs7SUFDRjs7Ozs7SUFJTixXQUFXLGFBQ1Ysd0JBQUMsT0FBRDtLQUFLLFdBQVU7ZUFDYix3QkFBQyxPQUFEO01BQUssV0FBVTtnQkFBZixDQUNFLHdCQUFDLE9BQUQ7T0FBSyxXQUFVO2lCQUFmLENBQ0csZUFBZSx3QkFBQyxTQUFEO1FBQVMsV0FBVTtRQUEwQixhQUFhO09BQU07Ozs7a0JBQUksd0JBQUMsU0FBRDtRQUFTLFdBQVU7UUFBNEIsYUFBYTtPQUFNOzs7O2lCQUN0Six3QkFBQyxPQUFELGFBQ0Usd0JBQUMsT0FBRDtRQUFLLFdBQVU7a0JBQTRFO09BQXFCOzs7O2lCQUNoSCx3QkFBQyxPQUFEO1FBQUssV0FBVTtrQkFBd0M7T0FBc0I7Ozs7ZUFDMUU7Ozs7ZUFDRjs7Ozs7Z0JBQ0wsd0JBQUMsVUFBRDtPQUNFLGVBQWUsZ0JBQWdCLENBQUMsWUFBWTtPQUM1QyxXQUFXLGdHQUFnRyxlQUFlLGtCQUFrQjtpQkFFNUksd0JBQUMsUUFBRCxFQUFNLFdBQVcsNkVBQTZFLGVBQWUsa0JBQWtCLGtCQUFvQjs7Ozs7TUFDN0k7Ozs7Y0FDTDs7Ozs7O0lBQ0Y7Ozs7O0lBSVAsd0JBQUMsT0FBRDtLQUFLLFdBQVU7ZUFBZjtNQUVFLHdCQUFDLE9BQUQ7T0FBSyxXQUFVO2lCQUFmLENBQ0Usd0JBQUMsVUFBRDtRQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsVUFBVSxxQkFBcUIsVUFBVSxXQUFXLFdBQVcsaUJBQWlCO1FBQXFCLGFBQWE7T0FBTTs7OztpQkFDN0ssd0JBQUMsT0FBRCxhQUNFLHdCQUFDLE9BQUQ7UUFBSyxXQUFVO2tCQUE0RTtPQUFtQjs7OztpQkFDOUcsd0JBQUMsT0FBRDtRQUFLLFdBQVU7a0JBQ1osVUFBVSxXQUFXLFVBQVUsWUFBWSxVQUFVLFdBQVcsV0FBVyxvQkFBb0I7T0FDN0Y7Ozs7ZUFDRjs7OztlQUNGOzs7Ozs7TUFHTCx3QkFBQyxPQUFEO09BQUssV0FBVTtpQkFBZixDQUNFLHdCQUFDLGFBQUQ7UUFBYSxXQUFXLFdBQVcseUJBQXlCLHFCQUFxQjtRQUFxQixhQUFhO09BQU07Ozs7aUJBQ3pILHdCQUFDLE9BQUQsYUFDRSx3QkFBQyxPQUFEO1FBQUssV0FBVTtrQkFBNEU7T0FBZTs7OztpQkFDMUcsd0JBQUMsT0FBRDtRQUFLLFdBQVU7a0JBQ1osYUFBYSxHQUFHLFdBQVcsS0FBSztPQUM5Qjs7OztlQUNGOzs7O2VBQ0Y7Ozs7OztNQUdMLHdCQUFDLE9BQUQ7T0FBSyxXQUFVO2lCQUFmLENBQ0Usd0JBQUMsVUFBRDtRQUFVLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxZQUFZLG1CQUFtQjtRQUFxQixhQUFhO09BQU07Ozs7aUJBQ3RJLHdCQUFDLE9BQUQsYUFDRSx3QkFBQyxPQUFEO1FBQUssV0FBVTtrQkFBNEU7T0FBYzs7OztpQkFDekcsd0JBQUMsT0FBRDtRQUFLLFdBQVU7a0JBQ1osVUFBVSxZQUFZLElBQUksU0FBUyxVQUFVLGFBQWEsSUFBRyxDQUFFLFFBQVEsQ0FBQyxFQUFFLEtBQUs7T0FDN0U7Ozs7ZUFDRjs7OztlQUNGOzs7Ozs7S0FDRjs7Ozs7O0lBR0wsd0JBQUMsT0FBRDtLQUFLLFdBQVU7ZUFDWixVQUFVLFdBQVcsS0FBSSxRQUN4Qix3QkFBQyxPQUFEO01BQW1CLFdBQVU7Z0JBQTdCLENBQ0Usd0JBQUMsT0FBRCxFQUFLLFdBQVcsK0NBQStDLElBQUksV0FBVyxVQUFVLHlDQUF5QyxJQUFJLFdBQVcsWUFBWSxxQ0FBcUMsaUNBQW1DOzs7O2dCQUNwTyx3QkFBQyxPQUFEO09BQUssV0FBVTtpQkFBZixDQUNFLHdCQUFDLE9BQUQ7UUFBSyxXQUFVO2tCQUE2RSxJQUFJO09BQVc7Ozs7aUJBQzNHLHdCQUFDLE9BQUQ7UUFBSyxXQUFVO2tCQUFxRCxJQUFJO09BQVc7Ozs7ZUFDaEY7Ozs7O2NBQ0Y7UUFOSyxJQUFJOzs7O1lBTVQsQ0FDTjtJQUNFOzs7OztJQUdMLHdCQUFDLE9BQUQ7S0FBSyxXQUFVO2VBQ2Isd0JBQUMsT0FBRDtNQUFLLFdBQVU7Z0JBQWY7T0FDRSx3QkFBQyxPQUFEO1FBQUssV0FBVTtrQkFBdUY7T0FBaUI7Ozs7O09BQ3ZILHdCQUFDLE9BQUQ7UUFBSyxXQUFVO2tCQUNaLFVBQVUsS0FBSSxTQUNiLHdCQUFDLE9BQUQ7U0FBbUIsV0FBVTttQkFBN0IsQ0FDRyxLQUFLLFNBQVMsd0JBQUMsY0FBRCxFQUFjLFdBQVUsb0NBQXFDOzs7O29CQUFJLHdCQUFDLFNBQUQsRUFBUyxXQUFVLG1EQUFvRDs7OzttQkFDdkosd0JBQUMsUUFBRDtVQUFNLFdBQVcsZ0VBQWdFLEtBQUssU0FBUyxvQkFBb0I7b0JBQXdCLEtBQUs7U0FBWTs7OztpQkFDeko7V0FISyxLQUFLOzs7O2VBR1YsQ0FDTjtPQUNFOzs7OztPQUNMLHdCQUFDLE9BQUQ7UUFBSyxXQUFVO2tCQUNaLFVBQVUsV0FBVztPQUNuQjs7Ozs7TUFDRjs7Ozs7O0lBQ0Y7Ozs7O0dBRUY7Ozs7OztDQUNGOzs7OztBQUVUIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkNhbWVyYVNjYW5uZXIudHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQWxlcnRDaXJjbGUsIENoZWNrQ2lyY2xlMiwgTG9hZGVyMiwgVm9sdW1lMiwgVm9sdW1lWCwgQWN0aXZpdHksIFRoZXJtb21ldGVyLCBTcGFya2xlcyB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBMaXZlR3VpZGFuY2VTbmFwc2hvdCB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHVzZU1lZGlhUGlwZUZhY2VMYW5kbWFya2VyIH0gZnJvbSAnLi4vaG9va3MvdXNlTWVkaWFQaXBlRmFjZUxhbmRtYXJrZXInO1xuaW1wb3J0IHsgdXNlVm9pY2VDb2FjaGluZyB9IGZyb20gJy4uL2hvb2tzL3VzZVZvaWNlQ29hY2hpbmcnO1xuaW1wb3J0IHsgZXZhbHVhdGVMaXZlQ2FtZXJhR3VpZGFuY2UsIExpdmVDYW1lcmFHdWlkYW5jZSwgY3JlYXRlQXV0b0NhcHR1cmVUcmFja2VyLCBldmFsdWF0ZUF1dG9DYXB0dXJlUHJvZ3Jlc3MsIGJ1aWxkTGl2ZUNhcHR1cmVDaGVja2xpc3QsIENMSU5JQ0FMX0NDVF9SQU5HRSB9IGZyb20gJy4uL2xpYi9saXZlQ2FtZXJhR3VpZGFuY2UnO1xuXG5pbnRlcmZhY2UgQ2FtZXJhU2Nhbm5lclByb3BzIHtcbiAgb25Db21wbGV0ZTogKHNuYXBzaG90OiBMaXZlR3VpZGFuY2VTbmFwc2hvdCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IENhbWVyYVNjYW5uZXI6IFJlYWN0LkZDPENhbWVyYVNjYW5uZXJQcm9wcz4gPSAoeyBvbkNvbXBsZXRlIH0pID0+IHtcbiAgY29uc3QgdmlkZW9SZWYgPSB1c2VSZWY8SFRNTFZpZGVvRWxlbWVudD4obnVsbCk7XG4gIGNvbnN0IGNhbnZhc1JlZiA9IHVzZVJlZjxIVE1MQ2FudmFzRWxlbWVudD4obnVsbCk7XG4gIGNvbnN0IFtoYXNQZXJtaXNzaW9uLCBzZXRIYXNQZXJtaXNzaW9uXSA9IHVzZVN0YXRlPGJvb2xlYW4gfCBudWxsPihudWxsKTtcbiAgXG4gIGNvbnN0IFt2b2ljZUVuYWJsZWQsIHNldFZvaWNlRW5hYmxlZF0gPSB1c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcbiAgY29uc3Qgdm9pY2VDb2FjaCA9IHVzZVZvaWNlQ29hY2hpbmcoeyBlbmFibGVkOiB2b2ljZUVuYWJsZWQsIHJhdGU6IDAuOTUgfSk7XG4gIGNvbnN0IG1lZGlhcGlwZSA9IHVzZU1lZGlhUGlwZUZhY2VMYW5kbWFya2VyKHsgZW5hYmxlZDogdHJ1ZSB9KTtcblxuICBjb25zdCBbZ3VpZGFuY2UsIHNldEd1aWRhbmNlXSA9IHVzZVN0YXRlPExpdmVDYW1lcmFHdWlkYW5jZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbYXV0b0NhcHR1cmVUcmFja2VyLCBzZXRBdXRvQ2FwdHVyZVRyYWNrZXJdID0gdXNlU3RhdGUoY3JlYXRlQXV0b0NhcHR1cmVUcmFja2VyKCkpO1xuICBjb25zdCBbY291bnRkb3duLCBzZXRDb3VudGRvd25dID0gdXNlU3RhdGU8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGNhcHR1cmVkUmVmID0gdXNlUmVmKGZhbHNlKTtcblxuICBjb25zdCBhbmFseXplRnJhbWUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGNhcHR1cmVkUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBpZiAoIXZpZGVvUmVmLmN1cnJlbnQgfHwgIWNhbnZhc1JlZi5jdXJyZW50KSByZXR1cm47XG4gICAgY29uc3QgdmlkZW8gPSB2aWRlb1JlZi5jdXJyZW50O1xuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcsIHsgd2lsbFJlYWRGcmVxdWVudGx5OiB0cnVlIH0pO1xuICAgIGlmICghY3R4IHx8IHZpZGVvLnZpZGVvV2lkdGggPT09IDApIHJldHVybjtcblxuICAgIGlmIChjYW52YXMud2lkdGggIT09IHZpZGVvLnZpZGVvV2lkdGgpIHtcbiAgICAgIGNhbnZhcy53aWR0aCA9IHZpZGVvLnZpZGVvV2lkdGg7XG4gICAgICBjYW52YXMuaGVpZ2h0ID0gdmlkZW8udmlkZW9IZWlnaHQ7XG4gICAgfVxuXG4gICAgY3R4LmRyYXdJbWFnZSh2aWRlbywgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBjb25zdCBpbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgXG4gICAgY29uc3QgbWVkaWFwaXBlU2lnbmFsID0gbWVkaWFwaXBlLnN0YXR1cyA9PT0gJ3JlYWR5JyA/IG1lZGlhcGlwZS5kZXRlY3QodmlkZW8sIHBlcmZvcm1hbmNlLm5vdygpKSA6IG51bGw7XG4gICAgXG4gICAgY29uc3QgbmV3R3VpZGFuY2UgPSBldmFsdWF0ZUxpdmVDYW1lcmFHdWlkYW5jZShpbWFnZURhdGEsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCwgeyBtZWRpYXBpcGVGYWNlU2lnbmFsOiBtZWRpYXBpcGVTaWduYWwgfSk7XG4gICAgc2V0R3VpZGFuY2UobmV3R3VpZGFuY2UpO1xuICAgIHZvaWNlQ29hY2guc3BlYWsobmV3R3VpZGFuY2UuaW5kaWNhdG9yc1swXT8ubWVzc2FnZSB8fCBcIlwiLCBuZXdHdWlkYW5jZS5pbmRpY2F0b3JzWzBdPy5rZXkgfHwgXCJcIik7XG5cbiAgICBjb25zdCBldmFsUmVzdWx0ID0gZXZhbHVhdGVBdXRvQ2FwdHVyZVByb2dyZXNzKHtcbiAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICBndWlkYW5jZTogbmV3R3VpZGFuY2UsXG4gICAgICB0cmFja2VyOiBhdXRvQ2FwdHVyZVRyYWNrZXIsXG4gICAgICBub3c6IHBlcmZvcm1hbmNlLm5vdygpXG4gICAgfSk7XG4gICAgXG4gICAgc2V0QXV0b0NhcHR1cmVUcmFja2VyKGV2YWxSZXN1bHQudHJhY2tlcik7XG4gICAgc2V0Q291bnRkb3duKGV2YWxSZXN1bHQuY291bnRkb3duTXMpO1xuXG4gICAgaWYgKGV2YWxSZXN1bHQuc2hvdWxkQ2FwdHVyZSAmJiAhY2FwdHVyZWRSZWYuY3VycmVudCkge1xuICAgICAgY2FwdHVyZWRSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICBjb25zdCBmaW5hbFNuYXBzaG90OiBMaXZlR3VpZGFuY2VTbmFwc2hvdCA9IHtcbiAgICAgICAgbGl2ZUd1aWRhbmNlU2NvcmU6IG5ld0d1aWRhbmNlLnNjb3JlLFxuICAgICAgICBkaXN0YW5jZUNtOiBuZXdHdWlkYW5jZS5kaXN0YW5jZS5kaXN0YW5jZUNtIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgcG9zZVlhd0RlZ3JlZXM6IG5ld0d1aWRhbmNlLnBvc2UueWF3RGVncmVlcyB8fCB1bmRlZmluZWQsXG4gICAgICAgIHBvc2VQaXRjaERlZ3JlZXM6IG5ld0d1aWRhbmNlLnBvc2UucGl0Y2hEZWdyZWVzIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgcG9zZVJvbGxEZWdyZWVzOiBuZXdHdWlkYW5jZS5wb3NlLnJvbGxEZWdyZWVzIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgY29zbWV0aWNzQ29uZmlkZW5jZTogbmV3R3VpZGFuY2UuY29zbWV0aWNzLmNvbmZpZGVuY2UsXG4gICAgICAgIGNvc21ldGljc0RldGVjdGVkS2luZHM6IG5ld0d1aWRhbmNlLmNvc21ldGljcy5kZXRlY3RlZEtpbmRzLFxuICAgICAgICBjb2xvclRlbXBlcmF0dXJlS2VsdmluOiBuZXdHdWlkYW5jZS5saWdodENvbG9yLmNvbG9yVGVtcGVyYXR1cmUua2VsdmluIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgY29sb3JDYXJkRGV0ZWN0ZWQ6IG5ld0d1aWRhbmNlLmNvbG9yQ2FyZC5kZXRlY3RlZFxuICAgICAgfTtcbiAgICAgIG9uQ29tcGxldGUoZmluYWxTbmFwc2hvdCk7XG4gICAgfVxuICB9LCBbbWVkaWFwaXBlLCB2b2ljZUNvYWNoLCBhdXRvQ2FwdHVyZVRyYWNrZXIsIG9uQ29tcGxldGVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBzdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IGludGVydmFsSWQ6IG51bWJlcjtcblxuICAgIGNvbnN0IHN0YXJ0Q2FtZXJhID0gYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoeyBcbiAgICAgICAgICB2aWRlbzogeyBmYWNpbmdNb2RlOiAndXNlcicsIHdpZHRoOiB7IGlkZWFsOiAxMjgwIH0sIGhlaWdodDogeyBpZGVhbDogNzIwIH0gfSBcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh2aWRlb1JlZi5jdXJyZW50KSB7XG4gICAgICAgICAgdmlkZW9SZWYuY3VycmVudC5zcmNPYmplY3QgPSBzdHJlYW07XG4gICAgICAgIH1cbiAgICAgICAgc2V0SGFzUGVybWlzc2lvbih0cnVlKTtcbiAgICAgICAgaW50ZXJ2YWxJZCA9IHdpbmRvdy5zZXRJbnRlcnZhbChhbmFseXplRnJhbWUsIDE1MCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbWVyYSBhY2Nlc3MgZGVuaWVkOlwiLCBlcnIpO1xuICAgICAgICBzZXRIYXNQZXJtaXNzaW9uKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc3RhcnRDYW1lcmEoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoc3RyZWFtKSBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaCh0cmFjayA9PiB0cmFjay5zdG9wKCkpO1xuICAgICAgaWYgKGludGVydmFsSWQpIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG4gICAgICB2b2ljZUNvYWNoLmNhbmNlbCgpO1xuICAgIH07XG4gIH0sIFthbmFseXplRnJhbWUsIHZvaWNlQ29hY2hdKTtcblxuICBpZiAoaGFzUGVybWlzc2lvbiA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC02IGJnLW5hdnktOTUwXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctbmF2eS05MDAgcC0xMCByb3VuZGVkLTN4bCBtYXgtdy1tZCB3LWZ1bGwgdGV4dC1jZW50ZXIgc2hhZG93LXNpbHZlci1nbG93LXN0cm9uZyBib3JkZXIgYm9yZGVyLXNpbHZlci01MDAvMzBcIj5cbiAgICAgICAgICA8QWxlcnRDaXJjbGUgY2xhc3NOYW1lPVwidy0xNiBoLTE2IHRleHQtcmVkLTUwMCBteC1hdXRvIG1iLTZcIiBzdHJva2VXaWR0aD17MS41fSAvPlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBmb250LXNlcmlmIGZvbnQtbGlnaHQgdGV4dC13aGl0ZSBtYi00XCI+QnJhayBkb3N0xJlwdSBkbyBrYW1lcnk8L2gyPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JhcGhpdGUtNDAwIG1iLTggZm9udC1saWdodCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgIEFwbGlrYWNqYSBNeVNraW5Db2RlIHd5bWFnYSBkb3N0xJlwdSBkbyBrYW1lcnkgdyBjZWx1IHByemVwcm93YWR6ZW5pYSBhbmFsaXp5IHN0YW5kYXJ5emFjamkgemRqxJljaWEuXG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC0xMCBweS00IGJnLW5hdnktOTUwIHRleHQtc2lsdmVyLTMwMCByb3VuZGVkLWZ1bGwgZm9udC1zYW5zIGZvbnQtbWVkaXVtIHRyYWNraW5nLXdpZGVzdCB1cHBlcmNhc2UgaG92ZXI6dGV4dC1zaWx2ZXItMTAwIGhvdmVyOnNoYWRvdy1zaWx2ZXItZ2xvdyB0cmFuc2l0aW9uLWFsbCBib3JkZXIgYm9yZGVyLXNpbHZlci01MDAvNDBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIFNwcsOzYnVqIHBvbm93bmllXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGNoZWNrbGlzdCA9IGd1aWRhbmNlID8gYnVpbGRMaXZlQ2FwdHVyZUNoZWNrbGlzdChndWlkYW5jZSkgOiBbXTtcbiAgY29uc3QgY3VycmVudENDVCA9IGd1aWRhbmNlPy5saWdodENvbG9yLmNvbG9yVGVtcGVyYXR1cmUua2VsdmluO1xuICBjb25zdCBpc0NsaW5pY2FsbHlPcHRpbWFsQ0NUID0gY3VycmVudENDVCA/IGN1cnJlbnRDQ1QgPj0gQ0xJTklDQUxfQ0NUX1JBTkdFWzBdICYmIGN1cnJlbnRDQ1QgPD0gQ0xJTklDQUxfQ0NUX1JBTkdFWzFdIDogZmFsc2U7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1uYXZ5LTk1MCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTQgbWQ6cC04IHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctNXhsIHJlbGF0aXZlIHJvdW5kZWQtWzIuNXJlbV0gb3ZlcmZsb3ctaGlkZGVuIGJnLWJsYWNrIHNoYWRvdy0yeGwgYm9yZGVyIGJvcmRlci1zaWx2ZXItNTAwLzIwIGFzcGVjdC1bNC8zXSBtZDphc3BlY3QtdmlkZW9cIj5cbiAgICAgICAgXG4gICAgICAgIDxjYW52YXMgcmVmPXtjYW52YXNSZWZ9IGNsYXNzTmFtZT1cImhpZGRlblwiIC8+XG5cbiAgICAgICAgPHZpZGVvIFxuICAgICAgICAgIHJlZj17dmlkZW9SZWZ9IFxuICAgICAgICAgIGF1dG9QbGF5IFxuICAgICAgICAgIHBsYXlzSW5saW5lIFxuICAgICAgICAgIG11dGVkIFxuICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyIG9wYWNpdHktNzAgZ3JheXNjYWxlLVsyMCVdXCJcbiAgICAgICAgLz5cblxuICAgICAgICB7LyogU2Nhbm5pbmcgT3ZlcmxheSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHBvaW50ZXItZXZlbnRzLW5vbmVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdy01NiBoLTcyIG1kOnctNzIgbWQ6aC05NiBib3JkZXItMiByb3VuZGVkLVsxMDAlXSByZWxhdGl2ZSB0cmFuc2l0aW9uLWNvbG9ycyBkdXJhdGlvbi01MDAgJHtndWlkYW5jZT8uc3RhdHVzID09PSAncmVhZHknID8gJ2JvcmRlci1lbWVyYWxkLTQwMCBzaGFkb3ctWzBfMF8zMHB4X3JnYmEoNTIsMjExLDE1MywwLjMpXScgOiAnYm9yZGVyLXNpbHZlci01MDAvNDAgc2hhZG93LXNpbHZlci1nbG93LWlubmVyJ31gfT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BhYnNvbHV0ZSAtdG9wLTIgLWxlZnQtMiB3LTYgaC02IGJvcmRlci10LVszcHhdIGJvcmRlci1sLVszcHhdIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTUwMCAke2d1aWRhbmNlPy5zdGF0dXMgPT09ICdyZWFkeScgPyAnYm9yZGVyLWVtZXJhbGQtNDAwJyA6ICdib3JkZXItc2lsdmVyLTQwMCd9YH0+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYWJzb2x1dGUgLXRvcC0yIC1yaWdodC0yIHctNiBoLTYgYm9yZGVyLXQtWzNweF0gYm9yZGVyLXItWzNweF0gdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tNTAwICR7Z3VpZGFuY2U/LnN0YXR1cyA9PT0gJ3JlYWR5JyA/ICdib3JkZXItZW1lcmFsZC00MDAnIDogJ2JvcmRlci1zaWx2ZXItNDAwJ31gfT48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BhYnNvbHV0ZSAtYm90dG9tLTIgLWxlZnQtMiB3LTYgaC02IGJvcmRlci1iLVszcHhdIGJvcmRlci1sLVszcHhdIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTUwMCAke2d1aWRhbmNlPy5zdGF0dXMgPT09ICdyZWFkeScgPyAnYm9yZGVyLWVtZXJhbGQtNDAwJyA6ICdib3JkZXItc2lsdmVyLTQwMCd9YH0+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYWJzb2x1dGUgLWJvdHRvbS0yIC1yaWdodC0yIHctNiBoLTYgYm9yZGVyLWItWzNweF0gYm9yZGVyLXItWzNweF0gdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tNTAwICR7Z3VpZGFuY2U/LnN0YXR1cyA9PT0gJ3JlYWR5JyA/ICdib3JkZXItZW1lcmFsZC00MDAnIDogJ2JvcmRlci1zaWx2ZXItNDAwJ31gfT48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgbGVmdC0wIHctZnVsbCBoLVsxcHhdIGJnLXNpbHZlci00MDAgc2hhZG93LVswXzBfMjBweF9yZ2JhKDIwMywyMTMsMjI1LDEpXSBhbmltYXRlLXNjYW5cIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIENvdW50ZG93biBPdmVybGF5ICovfVxuICAgICAgICB7Y291bnRkb3duICE9PSBudWxsICYmIGNvdW50ZG93biA8IDIwMDAgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB6LTMwIGJnLW5hdnktOTUwLzQwIGJhY2tkcm9wLWJsdXItc21cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC04eGwgZm9udC1zZXJpZiB0ZXh0LXNpbHZlci00MDAgYW5pbWF0ZS1wdWxzZVwiPlxuICAgICAgICAgICAgICB7TWF0aC5jZWlsKGNvdW50ZG93biAvIDEwMDApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgICAgey8qIFZvaWNlIENvYWNoaW5nIFRvZ2dsZSAqL31cbiAgICAgICAge3ZvaWNlQ29hY2guc3VwcG9ydGVkICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC04IGxlZnQtOCB6LTIwIHBvaW50ZXItZXZlbnRzLWF1dG9cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctbmF2eS05NTAvOTAgYmFja2Ryb3AtYmx1ci14bCBib3JkZXIgYm9yZGVyLXNpbHZlci01MDAvMzAgcm91bmRlZC0yeGwgcC00IGZsZXggaXRlbXMtY2VudGVyIGdhcC01IHNoYWRvdy1zaWx2ZXItZ2xvd1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC00XCI+XG4gICAgICAgICAgICAgICAge3ZvaWNlRW5hYmxlZCA/IDxWb2x1bWUyIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1zaWx2ZXItNDAwXCIgc3Ryb2tlV2lkdGg9ezEuNX0gLz4gOiA8Vm9sdW1lWCBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtZ3JhcGhpdGUtNTAwXCIgc3Ryb2tlV2lkdGg9ezEuNX0gLz59XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LXNpbHZlci01MDAvODAgZm9udC1zYW5zIHRyYWNraW5nLVswLjJlbV0gdXBwZXJjYXNlIG1iLTAuNVwiPkFzeXN0ZW50IEfFgm9zb3d5PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1ncmFwaGl0ZS0zMDBcIj5Xc2thesOzd2tpIG5hIMW8eXdvPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0Vm9pY2VFbmFibGVkKCF2b2ljZUVuYWJsZWQpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIGlubGluZS1mbGV4IGgtNiB3LTExIGl0ZW1zLWNlbnRlciByb3VuZGVkLWZ1bGwgdHJhbnNpdGlvbi1jb2xvcnMgZm9jdXM6b3V0bGluZS1ub25lICR7dm9pY2VFbmFibGVkID8gJ2JnLXNpbHZlci02MDAnIDogJ2JnLW5hdnktNzAwJ31gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgaW5saW5lLWJsb2NrIGgtNCB3LTQgdHJhbnNmb3JtIHJvdW5kZWQtZnVsbCBiZy13aGl0ZSB0cmFuc2l0aW9uLXRyYW5zZm9ybSAke3ZvaWNlRW5hYmxlZCA/ICd0cmFuc2xhdGUteC02JyA6ICd0cmFuc2xhdGUteC0xJ31gfSAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuXG4gICAgICAgIHsvKiBMaXZlIEhVRCBNZXRyaWNzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC04IHJpZ2h0LTggZmxleCBmbGV4LWNvbCBnYXAtNCB6LTIwXCI+XG4gICAgICAgICAgey8qIE1lZGlhUGlwZSBTdGF0dXMgTWV0cmljICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctbmF2eS05NTAvOTAgYmFja2Ryb3AtYmx1ci14bCBib3JkZXIgYm9yZGVyLXNpbHZlci01MDAvMzAgcm91bmRlZC0yeGwgcC00IGZsZXggaXRlbXMtY2VudGVyIGdhcC00IHNoYWRvdy1zaWx2ZXItZ2xvd1wiPlxuICAgICAgICAgICAgPEFjdGl2aXR5IGNsYXNzTmFtZT17YHctNSBoLTUgJHttZWRpYXBpcGUuc3RhdHVzID09PSAncmVhZHknID8gJ3RleHQtZW1lcmFsZC00MDAnIDogbWVkaWFwaXBlLnN0YXR1cyA9PT0gJ2ZhaWxlZCcgPyAndGV4dC1yZWQtNDAwJyA6ICd0ZXh0LXNpbHZlci00MDAnfWB9IHN0cm9rZVdpZHRoPXsxLjV9IC8+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1zaWx2ZXItNTAwLzgwIGZvbnQtc2FucyB0cmFja2luZy1bMC4yZW1dIHVwcGVyY2FzZSBtYi0wLjVcIj5NZWRpYVBpcGUgUG9zZTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1zZXJpZiBmb250LWxpZ2h0IHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgICB7bWVkaWFwaXBlLnN0YXR1cyA9PT0gJ3JlYWR5JyA/ICdBa3R5d255JyA6IG1lZGlhcGlwZS5zdGF0dXMgPT09ICdmYWlsZWQnID8gJ0LFgsSFZCAoRmFsbGJhY2spJyA6ICfFgWFkb3dhbmllLi4uJ31cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBDQ1QgTWV0cmljICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctbmF2eS05NTAvOTAgYmFja2Ryb3AtYmx1ci14bCBib3JkZXIgYm9yZGVyLXNpbHZlci01MDAvMzAgcm91bmRlZC0yeGwgcC00IGZsZXggaXRlbXMtY2VudGVyIGdhcC00IHNoYWRvdy1zaWx2ZXItZ2xvd1wiPlxuICAgICAgICAgICAgPFRoZXJtb21ldGVyIGNsYXNzTmFtZT17YHctNSBoLTUgJHtpc0NsaW5pY2FsbHlPcHRpbWFsQ0NUID8gJ3RleHQtZW1lcmFsZC00MDAnIDogJ3RleHQtc2lsdmVyLTQwMCd9YH0gc3Ryb2tlV2lkdGg9ezEuNX0gLz5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LXNpbHZlci01MDAvODAgZm9udC1zYW5zIHRyYWNraW5nLVswLjJlbV0gdXBwZXJjYXNlIG1iLTAuNVwiPkNDVCBLZWx2aW48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VyaWYgZm9udC1saWdodCB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAge2N1cnJlbnRDQ1QgPyBgJHtjdXJyZW50Q0NUfUtgIDogJ0FuYWxpemEuLi4nfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIENvc21ldGljcyBNZXRyaWMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1uYXZ5LTk1MC85MCBiYWNrZHJvcC1ibHVyLXhsIGJvcmRlciBib3JkZXItc2lsdmVyLTUwMC8zMCByb3VuZGVkLTJ4bCBwLTQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTQgc2hhZG93LXNpbHZlci1nbG93XCI+XG4gICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPXtgdy01IGgtNSAke2d1aWRhbmNlPy5jb3NtZXRpY3Muc3RhdHVzID09PSAnd2FybmluZycgPyAndGV4dC1hbWJlci01MDAnIDogJ3RleHQtc2lsdmVyLTQwMCd9YH0gc3Ryb2tlV2lkdGg9ezEuNX0gLz5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LXNpbHZlci01MDAvODAgZm9udC1zYW5zIHRyYWNraW5nLVswLjJlbV0gdXBwZXJjYXNlIG1iLTAuNVwiPktvc21ldHlraTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1zZXJpZiBmb250LWxpZ2h0IHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgICB7Z3VpZGFuY2U/LmNvc21ldGljcyA/IGAkeyhndWlkYW5jZS5jb3NtZXRpY3MuY29uZmlkZW5jZSAqIDEwMCkudG9GaXhlZCgxKX0lYCA6ICdBbmFsaXphLi4uJ31cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEluZGljYXRvcnMgSFVEICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC04IHJpZ2h0LTggZmxleCBmbGV4LWNvbCBnYXAtMyB6LTIwIG10LTY0XCI+XG4gICAgICAgICAge2d1aWRhbmNlPy5pbmRpY2F0b3JzLm1hcChpbmQgPT4gKFxuICAgICAgICAgICAgPGRpdiBrZXk9e2luZC5rZXl9IGNsYXNzTmFtZT1cImJnLW5hdnktOTUwLzkwIGJhY2tkcm9wLWJsdXIteGwgYm9yZGVyIGJvcmRlci1zaWx2ZXItNTAwLzMwIHJvdW5kZWQtMnhsIHAtMyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNCBzaGFkb3ctc2lsdmVyLWdsb3cgdy02NFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHctMi41IGgtMi41IHJvdW5kZWQtZnVsbCBzaGFkb3ctc20gc2hyaW5rLTAgJHtpbmQuc3RhdHVzID09PSAncmVhZHknID8gJ2JnLWVtZXJhbGQtNDAwIHNoYWRvdy1lbWVyYWxkLTQwMC81MCcgOiBpbmQuc3RhdHVzID09PSAnd2FybmluZycgPyAnYmctYW1iZXItNDAwIHNoYWRvdy1hbWJlci00MDAvNTAnIDogJ2JnLXJlZC00MDAgc2hhZG93LXJlZC00MDAvNTAnfWB9IC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LTBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1zaWx2ZXItNTAwLzgwIGZvbnQtc2FucyB0cmFja2luZy1bMC4yZW1dIHVwcGVyY2FzZSBtYi0wLjVcIj57aW5kLmxhYmVsfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlcmlmIGZvbnQtbGlnaHQgdGV4dC13aGl0ZSB0cnVuY2F0ZVwiPntpbmQudmFsdWV9PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBDaGVja2xpc3QgQm90dG9tIEJhciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMCBsZWZ0LTAgdy1mdWxsIHAtOCBiZy1ncmFkaWVudC10by10IGZyb20tbmF2eS05NTAgdmlhLW5hdnktOTUwLzkwIHRvLXRyYW5zcGFyZW50XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy0zeGwgbXgtYXV0byBiZy1uYXZ5LTkwMC85MCBiYWNrZHJvcC1ibHVyLXhsIHAtNiByb3VuZGVkLTN4bCBib3JkZXIgYm9yZGVyLXNpbHZlci01MDAvMzAgc2hhZG93LXNpbHZlci1nbG93LXN0cm9uZ1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNpbHZlci01MDAvODAgZm9udC1zYW5zIHRyYWNraW5nLVswLjJlbV0gdXBwZXJjYXNlIG1iLTQgdGV4dC1jZW50ZXJcIj5TdGF0dXMgS2FkcnU8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBtZDpncmlkLWNvbHMtMyBnYXAtNFwiPlxuICAgICAgICAgICAgICB7Y2hlY2tsaXN0Lm1hcChpdGVtID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17aXRlbS5pZH0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgIHtpdGVtLnBhc3NlZCA/IDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwIHNocmluay0wXCIgLz4gOiA8TG9hZGVyMiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtc2lsdmVyLTUwMC81MCBhbmltYXRlLXNwaW4gc2hyaW5rLTBcIiAvPn1cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHRleHQtWzEwcHhdIGZvbnQtc2FucyB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgbGVhZGluZy10aWdodCAke2l0ZW0ucGFzc2VkID8gJ3RleHQtc2lsdmVyLTEwMCcgOiAndGV4dC1ncmFwaGl0ZS01MDAnfWB9PntpdGVtLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNSB0ZXh0LWNlbnRlciB0ZXh0LXNtIGZvbnQtc2VyaWYgdGV4dC1zaWx2ZXItMzAwIGl0YWxpY1wiPlxuICAgICAgICAgICAgICB7Z3VpZGFuY2U/LnN1bW1hcnkgfHwgXCJJbmljamFsaXphY2phIGthbWVyeS4uLlwifVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0=