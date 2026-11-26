import { createHotContext as __vite__createHotContext } from "/myskincode-ai/@vite/client";import.meta.hot = __vite__createHotContext("/myskincode-ai/src/components/AnalysisResult.tsx");const React = __vite__cjsImport0_react;const _jsxDEV = __vite__cjsImport4_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/myskincode-ai/node_modules/.vite/deps/react.js?v=5f77a7b6";
import { PHENOTYPE_DETAILS, GRADE_DETAILS } from "/myskincode-ai/src/constants.ts";
import { RefreshCcw, Share2, FileText, Thermometer, Ruler, Sparkles, Database, History } from "/myskincode-ai/node_modules/.vite/deps/lucide-react.js?v=c90b8d26";
import { describeColorTemperature, CLINICAL_CCT_RANGE } from "/myskincode-ai/src/lib/liveCameraGuidance.ts";
var _jsxFileName = "/app/applet/src/components/AnalysisResult.tsx";
import __vite__cjsImport4_react_jsxDevRuntime from "/myskincode-ai/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=5f77a7b6";
export const AnalysisResult = ({ result, onReset, onViewHistory }) => {
	const primaryDetails = PHENOTYPE_DETAILS[result.primaryPhenotype];
	const primaryGradeDetails = GRADE_DETAILS[result.primaryGrade];
	const secondaryDetails = result.secondaryPhenotype ? PHENOTYPE_DETAILS[result.secondaryPhenotype] : null;
	const secondaryGradeDetails = result.secondaryGrade ? GRADE_DETAILS[result.secondaryGrade] : null;
	const mscCode = `MSC-${result.primaryPhenotype}-${result.primaryGrade}${result.secondaryPhenotype ? `/${result.secondaryPhenotype}-${result.secondaryGrade}` : ""}`;
	const { snapshot } = result;
	const isClinicallyOptimalCCT = snapshot.colorTemperatureKelvin ? snapshot.colorTemperatureKelvin >= CLINICAL_CCT_RANGE[0] && snapshot.colorTemperatureKelvin <= CLINICAL_CCT_RANGE[1] : false;
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "min-h-screen bg-navy-950 py-16 px-4 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ _jsxDEV("div", {
			className: "max-w-6xl mx-auto space-y-10",
			children: [/* @__PURE__ */ _jsxDEV("div", {
				className: "flex flex-col md:flex-row md:items-end justify-between gap-8 bg-navy-900/50 p-10 rounded-[2.5rem] shadow-2xl border border-silver-500/20 relative overflow-hidden",
				children: [
					/* @__PURE__ */ _jsxDEV("div", { className: "absolute top-0 left-0 w-full h-[2px] bg-silver-gradient opacity-70" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 34,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("div", { className: "absolute -top-24 -left-24 w-64 h-64 bg-silver-500/10 rounded-full blur-[100px]" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 35,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "relative z-10",
						children: [/* @__PURE__ */ _jsxDEV("h2", {
							className: "text-[10px] font-sans font-medium tracking-[0.3em] text-silver-500/80 uppercase mb-4",
							children: "Wynik Analizy Klinicznej"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 38,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "text-5xl md:text-7xl font-serif font-light text-white tracking-wide",
							children: mscCode
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 39,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 37,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-wrap gap-4 relative z-10",
						children: [
							/* @__PURE__ */ _jsxDEV("button", {
								className: "p-4 text-silver-400 bg-navy-950 hover:bg-navy-800 rounded-2xl transition-all border border-silver-500/30 hover:border-silver-400 hover:shadow-silver-glow",
								title: "Eksport PDF",
								children: /* @__PURE__ */ _jsxDEV(FileText, {
									className: "w-5 h-5",
									strokeWidth: 1.5
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 45,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 44,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								className: "p-4 text-silver-400 bg-navy-950 hover:bg-navy-800 rounded-2xl transition-all border border-silver-500/30 hover:border-silver-400 hover:shadow-silver-glow",
								title: "Udostępnij",
								children: /* @__PURE__ */ _jsxDEV(Share2, {
									className: "w-5 h-5",
									strokeWidth: 1.5
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 48,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 47,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								onClick: onViewHistory,
								className: "flex items-center gap-3 px-8 py-4 bg-navy-900 text-silver-300 hover:text-silver-100 hover:shadow-silver-glow rounded-2xl font-sans font-medium tracking-widest uppercase transition-all border border-silver-500/30 hover:border-silver-400",
								children: [/* @__PURE__ */ _jsxDEV(History, {
									className: "w-4 h-4",
									strokeWidth: 2
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 51,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "text-xs",
									children: "Historia"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 52,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 50,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								onClick: onReset,
								className: "flex items-center gap-3 px-8 py-4 bg-navy-950 text-silver-300 hover:text-silver-100 hover:shadow-silver-glow-strong rounded-2xl font-sans font-medium tracking-widest uppercase transition-all border border-silver-500/40 hover:border-silver-400",
								children: [/* @__PURE__ */ _jsxDEV(RefreshCcw, {
									className: "w-4 h-4",
									strokeWidth: 2
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 55,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "text-xs",
									children: "Nowa Analiza"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 56,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 54,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 43,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 32,
				columnNumber: 9
			}, this), /* @__PURE__ */ _jsxDEV("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-10",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "lg:col-span-2 space-y-8",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: `p-10 rounded-[2.5rem] border ${primaryDetails.color} backdrop-blur-xl relative overflow-hidden`,
						children: [
							/* @__PURE__ */ _jsxDEV("div", { className: "absolute top-0 right-0 w-48 h-48 bg-silver-500/5 rounded-full blur-[80px]" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 66,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-start justify-between mb-8 relative z-10",
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-silver-500/80 mb-3",
									children: "Fenotyp Dominujący"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 70,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("h3", {
									className: "text-4xl font-serif font-light text-white tracking-wide",
									children: [
										primaryDetails.label,
										" ",
										/* @__PURE__ */ _jsxDEV("span", {
											className: "text-silver-400/60 italic",
											children: [
												"(",
												result.primaryPhenotype,
												")"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 71,
											columnNumber: 114
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 71,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 69,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "px-6 py-3 bg-navy-950/90 rounded-xl font-serif font-light text-2xl text-silver-300 border border-silver-500/40 shadow-silver-glow",
									children: result.primaryGrade
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 73,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 68,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("p", {
								className: "text-xl text-graphite-300 font-light leading-relaxed mb-10 relative z-10",
								children: primaryDetails.description
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 77,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "bg-navy-950/60 rounded-2xl p-8 border border-silver-500/20 relative z-10",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-silver-500/80 mb-3",
									children: ["Stopień: ", /* @__PURE__ */ _jsxDEV("span", {
										className: "text-silver-200",
										children: primaryGradeDetails.label
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 80,
										columnNumber: 128
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 80,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("p", {
									className: "text-lg text-graphite-300 font-light leading-relaxed",
									children: primaryGradeDetails.description
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 81,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 79,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 65,
						columnNumber: 13
					}, this), secondaryDetails && secondaryGradeDetails && /* @__PURE__ */ _jsxDEV("div", {
						className: `p-10 rounded-[2.5rem] border ${secondaryDetails.color} backdrop-blur-xl relative overflow-hidden`,
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-start justify-between mb-6 relative z-10",
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-silver-500/80 mb-3",
									children: "Fenotyp Poboczny"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 89,
									columnNumber: 21
								}, this), /* @__PURE__ */ _jsxDEV("h3", {
									className: "text-3xl font-serif font-light text-white tracking-wide",
									children: [
										secondaryDetails.label,
										" ",
										/* @__PURE__ */ _jsxDEV("span", {
											className: "text-silver-400/60 italic",
											children: [
												"(",
												result.secondaryPhenotype,
												")"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 90,
											columnNumber: 118
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 90,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 88,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "px-5 py-2 bg-navy-950/90 rounded-xl font-serif font-light text-xl text-silver-300 border border-silver-500/40",
									children: result.secondaryGrade
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 92,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 87,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ _jsxDEV("p", {
								className: "text-lg text-graphite-300 font-light leading-relaxed mb-8 relative z-10",
								children: secondaryDetails.description
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 96,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "bg-navy-950/60 rounded-2xl p-6 text-base border border-silver-500/20 relative z-10",
								children: [
									/* @__PURE__ */ _jsxDEV("span", {
										className: "font-medium text-silver-200",
										children: [secondaryGradeDetails.label, ":"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 98,
										columnNumber: 19
									}, this),
									" ",
									/* @__PURE__ */ _jsxDEV("span", {
										className: "text-graphite-300 font-light",
										children: secondaryGradeDetails.description
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 98,
										columnNumber: 103
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 97,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 86,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 64,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "space-y-8",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "bg-navy-900/80 p-10 rounded-[2.5rem] shadow-2xl border border-silver-500/20",
						children: [/* @__PURE__ */ _jsxDEV("h3", {
							className: "text-2xl font-serif font-light text-white mb-10 flex items-center gap-4 tracking-wide",
							children: [/* @__PURE__ */ _jsxDEV(Database, {
								className: "w-6 h-6 text-silver-400",
								strokeWidth: 1.5
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 108,
								columnNumber: 17
							}, this), "Audit Log Snapshot"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 107,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "space-y-8",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between pb-6 border-b border-navy-800/50",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center gap-4 text-graphite-400",
										children: [/* @__PURE__ */ _jsxDEV(Thermometer, {
											className: "w-5 h-5 text-silver-500/80",
											strokeWidth: 1.5
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 115,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ _jsxDEV("span", {
												className: "text-sm font-sans font-medium tracking-widest uppercase text-silver-100",
												children: "CCT Kelvin"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 117,
												columnNumber: 23
											}, this), /* @__PURE__ */ _jsxDEV("span", {
												className: "text-[11px] text-graphite-500 font-light mt-1",
												children: describeColorTemperature(snapshot.colorTemperatureKelvin || null)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 118,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 116,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 114,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: `font-serif font-light text-xl ${isClinicallyOptimalCCT ? "text-emerald-400" : "text-silver-200"}`,
										children: snapshot.colorTemperatureKelvin ? `${snapshot.colorTemperatureKelvin}K` : "Brak"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 121,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 113,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between pb-6 border-b border-navy-800/50",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center gap-4 text-graphite-400",
										children: [/* @__PURE__ */ _jsxDEV(Ruler, {
											className: "w-5 h-5 text-silver-500/80",
											strokeWidth: 1.5
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 128,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("span", {
											className: "text-sm font-sans font-medium tracking-widest uppercase text-silver-100",
											children: "Dystans"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 129,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 127,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-serif font-light text-xl text-silver-200",
										children: [snapshot.distanceCm, " cm"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 131,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 126,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center gap-4 text-graphite-400",
										children: [/* @__PURE__ */ _jsxDEV(Sparkles, {
											className: "w-5 h-5 text-silver-500/80",
											strokeWidth: 1.5
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 136,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ _jsxDEV("span", {
												className: "text-sm font-sans font-medium tracking-widest uppercase text-silver-100",
												children: "Kosmetyki"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 138,
												columnNumber: 23
											}, this), /* @__PURE__ */ _jsxDEV("span", {
												className: "text-[11px] text-graphite-500 font-light mt-1",
												children: snapshot.cosmeticsDetectedKinds?.length ? snapshot.cosmeticsDetectedKinds.join(", ") : "Czysta skóra"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 139,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 137,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 135,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: `px-4 py-1.5 rounded-lg text-[10px] font-sans font-bold uppercase tracking-widest border ${(snapshot.cosmeticsConfidence || 0) > .3 ? "bg-amber-950/50 text-amber-400 border-amber-900/50" : "bg-emerald-900/20 text-emerald-400 border-emerald-700/30"}`,
										children: snapshot.cosmeticsConfidence ? `${(snapshot.cosmeticsConfidence * 100).toFixed(0)}%` : "0%"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 144,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 134,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 112,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 106,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "bg-navy-900 bg-dots p-10 rounded-[2.5rem] shadow-2xl border border-silver-500/30 relative overflow-hidden group",
						children: [/* @__PURE__ */ _jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-br from-silver-900/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 153,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "relative z-10",
							children: [
								/* @__PURE__ */ _jsxDEV("h3", {
									className: "text-2xl font-serif font-light mb-4 text-silver-100 tracking-wide",
									children: "Katalog Hi-Tech"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 155,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "text-graphite-400 text-sm mb-8 font-light leading-relaxed",
									children: [
										"Na podstawie kodu ",
										/* @__PURE__ */ _jsxDEV("span", {
											className: "text-silver-300 font-medium",
											children: mscCode
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 157,
											columnNumber: 37
										}, this),
										", system dopasował 3 optymalne urządzenia z bazy."
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 156,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									className: "w-full py-4 bg-navy-950/90 hover:bg-navy-900 rounded-2xl text-xs font-sans font-medium tracking-widest uppercase text-silver-300 transition-all border border-silver-500/40 hover:border-silver-300 shadow-silver-glow",
									children: "Zobacz rekomendacje"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 159,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 154,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 152,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 105,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 61,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 29,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 28,
		columnNumber: 5
	}, this);
};
_c = AnalysisResult;
var _c;
$RefreshReg$(_c, "AnalysisResult");
import * as RefreshRuntime from "/myskincode-ai/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/myskincode-ai/src/components/AnalysisResult.tsx";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("/app/applet/src/components/AnalysisResult.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/applet/src/components/AnalysisResult.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "/app/applet/src/components/AnalysisResult.tsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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QUQ7WUFBTSxXQUFVO3NCQUNiLFNBQVMsd0JBQXdCLFNBQVMsU0FBUyx1QkFBdUIsS0FBSyxJQUFJLElBQUk7V0FDcEY7Ozs7bUJBQ0g7Ozs7O2tCQUNGOzs7OzttQkFDTCx3QkFBQyxRQUFEO1VBQU0sV0FBVyw0RkFBNEYsU0FBUyx1QkFBdUIsS0FBSyxLQUFNLHVEQUF1RDtvQkFDNU0sU0FBUyxzQkFBc0IsSUFBSSxTQUFTLHNCQUFzQixJQUFHLENBQUUsUUFBUSxDQUFDLEVBQUUsS0FBSztTQUNwRjs7OztpQkFDSDs7Ozs7O09BQ0Y7Ozs7O2NBQ0Y7Ozs7O2VBR0wsd0JBQUMsT0FBRDtNQUFLLFdBQVU7Z0JBQWYsQ0FDRSx3QkFBQyxPQUFELEVBQUssV0FBVSwwSUFBK0k7Ozs7Z0JBQzlKLHdCQUFDLE9BQUQ7T0FBSyxXQUFVO2lCQUFmO1FBQ0Usd0JBQUMsTUFBRDtTQUFJLFdBQVU7bUJBQW9FO1FBQW1COzs7OztRQUNyRyx3QkFBQyxLQUFEO1NBQUcsV0FBVTttQkFBYjtVQUF5RTtVQUNyRCx3QkFBQyxRQUFEO1dBQU0sV0FBVTtxQkFBK0I7VUFBYzs7Ozs7VUFBQztTQUMvRTs7Ozs7O1FBQ0gsd0JBQUMsVUFBRDtTQUFRLFdBQVU7bUJBQXlOO1FBRW5POzs7OztPQUNMOzs7OztjQUNGOzs7OzthQUNGOzs7OztZQUVGOzs7OztXQUNGOzs7Ozs7Q0FDRjs7Ozs7QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJBbmFseXNpc1Jlc3VsdC50c3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE1TQ1Jlc3VsdCB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFBIRU5PVFlQRV9ERVRBSUxTLCBHUkFERV9ERVRBSUxTIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IFJlZnJlc2hDY3csIFNoYXJlMiwgRmlsZVRleHQsIFRoZXJtb21ldGVyLCBSdWxlciwgU3BhcmtsZXMsIERhdGFiYXNlLCBIaXN0b3J5IH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IGRlc2NyaWJlQ29sb3JUZW1wZXJhdHVyZSwgQ0xJTklDQUxfQ0NUX1JBTkdFIH0gZnJvbSAnLi4vbGliL2xpdmVDYW1lcmFHdWlkYW5jZSc7XG5cbmludGVyZmFjZSBBbmFseXNpc1Jlc3VsdFByb3BzIHtcbiAgcmVzdWx0OiBNU0NSZXN1bHQ7XG4gIG9uUmVzZXQ6ICgpID0+IHZvaWQ7XG4gIG9uVmlld0hpc3Rvcnk6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBBbmFseXNpc1Jlc3VsdDogUmVhY3QuRkM8QW5hbHlzaXNSZXN1bHRQcm9wcz4gPSAoeyByZXN1bHQsIG9uUmVzZXQsIG9uVmlld0hpc3RvcnkgfSkgPT4ge1xuICBjb25zdCBwcmltYXJ5RGV0YWlscyA9IFBIRU5PVFlQRV9ERVRBSUxTW3Jlc3VsdC5wcmltYXJ5UGhlbm90eXBlXTtcbiAgY29uc3QgcHJpbWFyeUdyYWRlRGV0YWlscyA9IEdSQURFX0RFVEFJTFNbcmVzdWx0LnByaW1hcnlHcmFkZV07XG4gIFxuICBjb25zdCBzZWNvbmRhcnlEZXRhaWxzID0gcmVzdWx0LnNlY29uZGFyeVBoZW5vdHlwZSA/IFBIRU5PVFlQRV9ERVRBSUxTW3Jlc3VsdC5zZWNvbmRhcnlQaGVub3R5cGVdIDogbnVsbDtcbiAgY29uc3Qgc2Vjb25kYXJ5R3JhZGVEZXRhaWxzID0gcmVzdWx0LnNlY29uZGFyeUdyYWRlID8gR1JBREVfREVUQUlMU1tyZXN1bHQuc2Vjb25kYXJ5R3JhZGVdIDogbnVsbDtcblxuICBjb25zdCBtc2NDb2RlID0gYE1TQy0ke3Jlc3VsdC5wcmltYXJ5UGhlbm90eXBlfS0ke3Jlc3VsdC5wcmltYXJ5R3JhZGV9JHtyZXN1bHQuc2Vjb25kYXJ5UGhlbm90eXBlID8gYC8ke3Jlc3VsdC5zZWNvbmRhcnlQaGVub3R5cGV9LSR7cmVzdWx0LnNlY29uZGFyeUdyYWRlfWAgOiAnJ31gO1xuICBjb25zdCB7IHNuYXBzaG90IH0gPSByZXN1bHQ7XG5cbiAgY29uc3QgaXNDbGluaWNhbGx5T3B0aW1hbENDVCA9IHNuYXBzaG90LmNvbG9yVGVtcGVyYXR1cmVLZWx2aW4gXG4gICAgPyBzbmFwc2hvdC5jb2xvclRlbXBlcmF0dXJlS2VsdmluID49IENMSU5JQ0FMX0NDVF9SQU5HRVswXSAmJiBzbmFwc2hvdC5jb2xvclRlbXBlcmF0dXJlS2VsdmluIDw9IENMSU5JQ0FMX0NDVF9SQU5HRVsxXVxuICAgIDogZmFsc2U7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1uYXZ5LTk1MCBweS0xNiBweC00IHNtOnB4LTYgbGc6cHgtOFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy02eGwgbXgtYXV0byBzcGFjZS15LTEwXCI+XG4gICAgICAgIFxuICAgICAgICB7LyogSGVhZGVyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgbWQ6aXRlbXMtZW5kIGp1c3RpZnktYmV0d2VlbiBnYXAtOCBiZy1uYXZ5LTkwMC81MCBwLTEwIHJvdW5kZWQtWzIuNXJlbV0gc2hhZG93LTJ4bCBib3JkZXIgYm9yZGVyLXNpbHZlci01MDAvMjAgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgey8qIFN1YnRsZSBnbG93IGJlaGluZCBoZWFkZXIgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCBsZWZ0LTAgdy1mdWxsIGgtWzJweF0gYmctc2lsdmVyLWdyYWRpZW50IG9wYWNpdHktNzBcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtMjQgLWxlZnQtMjQgdy02NCBoLTY0IGJnLXNpbHZlci01MDAvMTAgcm91bmRlZC1mdWxsIGJsdXItWzEwMHB4XVwiPjwvZGl2PlxuICAgICAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgei0xMFwiPlxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtc2FucyBmb250LW1lZGl1bSB0cmFja2luZy1bMC4zZW1dIHRleHQtc2lsdmVyLTUwMC84MCB1cHBlcmNhc2UgbWItNFwiPld5bmlrIEFuYWxpenkgS2xpbmljem5lajwvaDI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtNXhsIG1kOnRleHQtN3hsIGZvbnQtc2VyaWYgZm9udC1saWdodCB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGVcIj5cbiAgICAgICAgICAgICAge21zY0NvZGV9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC00IHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicC00IHRleHQtc2lsdmVyLTQwMCBiZy1uYXZ5LTk1MCBob3ZlcjpiZy1uYXZ5LTgwMCByb3VuZGVkLTJ4bCB0cmFuc2l0aW9uLWFsbCBib3JkZXIgYm9yZGVyLXNpbHZlci01MDAvMzAgaG92ZXI6Ym9yZGVyLXNpbHZlci00MDAgaG92ZXI6c2hhZG93LXNpbHZlci1nbG93XCIgdGl0bGU9XCJFa3Nwb3J0IFBERlwiPlxuICAgICAgICAgICAgICA8RmlsZVRleHQgY2xhc3NOYW1lPVwidy01IGgtNVwiIHN0cm9rZVdpZHRoPXsxLjV9IC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicC00IHRleHQtc2lsdmVyLTQwMCBiZy1uYXZ5LTk1MCBob3ZlcjpiZy1uYXZ5LTgwMCByb3VuZGVkLTJ4bCB0cmFuc2l0aW9uLWFsbCBib3JkZXIgYm9yZGVyLXNpbHZlci01MDAvMzAgaG92ZXI6Ym9yZGVyLXNpbHZlci00MDAgaG92ZXI6c2hhZG93LXNpbHZlci1nbG93XCIgdGl0bGU9XCJVZG9zdMSZcG5palwiPlxuICAgICAgICAgICAgICA8U2hhcmUyIGNsYXNzTmFtZT1cInctNSBoLTVcIiBzdHJva2VXaWR0aD17MS41fSAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e29uVmlld0hpc3Rvcnl9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHB4LTggcHktNCBiZy1uYXZ5LTkwMCB0ZXh0LXNpbHZlci0zMDAgaG92ZXI6dGV4dC1zaWx2ZXItMTAwIGhvdmVyOnNoYWRvdy1zaWx2ZXItZ2xvdyByb3VuZGVkLTJ4bCBmb250LXNhbnMgZm9udC1tZWRpdW0gdHJhY2tpbmctd2lkZXN0IHVwcGVyY2FzZSB0cmFuc2l0aW9uLWFsbCBib3JkZXIgYm9yZGVyLXNpbHZlci01MDAvMzAgaG92ZXI6Ym9yZGVyLXNpbHZlci00MDBcIj5cbiAgICAgICAgICAgICAgPEhpc3RvcnkgY2xhc3NOYW1lPVwidy00IGgtNFwiIHN0cm9rZVdpZHRoPXsyfSAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzXCI+SGlzdG9yaWE8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17b25SZXNldH0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgcHgtOCBweS00IGJnLW5hdnktOTUwIHRleHQtc2lsdmVyLTMwMCBob3Zlcjp0ZXh0LXNpbHZlci0xMDAgaG92ZXI6c2hhZG93LXNpbHZlci1nbG93LXN0cm9uZyByb3VuZGVkLTJ4bCBmb250LXNhbnMgZm9udC1tZWRpdW0gdHJhY2tpbmctd2lkZXN0IHVwcGVyY2FzZSB0cmFuc2l0aW9uLWFsbCBib3JkZXIgYm9yZGVyLXNpbHZlci01MDAvNDAgaG92ZXI6Ym9yZGVyLXNpbHZlci00MDBcIj5cbiAgICAgICAgICAgICAgPFJlZnJlc2hDY3cgY2xhc3NOYW1lPVwidy00IGgtNFwiIHN0cm9rZVdpZHRoPXsyfSAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzXCI+Tm93YSBBbmFsaXphPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMyBnYXAtMTBcIj5cbiAgICAgICAgICBcbiAgICAgICAgICB7LyogTWFpbiBQaGVub3R5cGVzICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tMiBzcGFjZS15LThcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcC0xMCByb3VuZGVkLVsyLjVyZW1dIGJvcmRlciAke3ByaW1hcnlEZXRhaWxzLmNvbG9yfSBiYWNrZHJvcC1ibHVyLXhsIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbmB9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIHJpZ2h0LTAgdy00OCBoLTQ4IGJnLXNpbHZlci01MDAvNSByb3VuZGVkLWZ1bGwgYmx1ci1bODBweF1cIj48L2Rpdj5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gbWItOCByZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1zYW5zIGZvbnQtbWVkaXVtIHVwcGVyY2FzZSB0cmFja2luZy1bMC4yZW1dIHRleHQtc2lsdmVyLTUwMC84MCBtYi0zXCI+RmVub3R5cCBEb21pbnVqxIVjeTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtNHhsIGZvbnQtc2VyaWYgZm9udC1saWdodCB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGVcIj57cHJpbWFyeURldGFpbHMubGFiZWx9IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2lsdmVyLTQwMC82MCBpdGFsaWNcIj4oe3Jlc3VsdC5wcmltYXJ5UGhlbm90eXBlfSk8L3NwYW4+PC9oMz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTYgcHktMyBiZy1uYXZ5LTk1MC85MCByb3VuZGVkLXhsIGZvbnQtc2VyaWYgZm9udC1saWdodCB0ZXh0LTJ4bCB0ZXh0LXNpbHZlci0zMDAgYm9yZGVyIGJvcmRlci1zaWx2ZXItNTAwLzQwIHNoYWRvdy1zaWx2ZXItZ2xvd1wiPlxuICAgICAgICAgICAgICAgICAge3Jlc3VsdC5wcmltYXJ5R3JhZGV9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhsIHRleHQtZ3JhcGhpdGUtMzAwIGZvbnQtbGlnaHQgbGVhZGluZy1yZWxheGVkIG1iLTEwIHJlbGF0aXZlIHotMTBcIj57cHJpbWFyeURldGFpbHMuZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1uYXZ5LTk1MC82MCByb3VuZGVkLTJ4bCBwLTggYm9yZGVyIGJvcmRlci1zaWx2ZXItNTAwLzIwIHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtc2FucyBmb250LW1lZGl1bSB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMmVtXSB0ZXh0LXNpbHZlci01MDAvODAgbWItM1wiPlN0b3BpZcWEOiA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNpbHZlci0yMDBcIj57cHJpbWFyeUdyYWRlRGV0YWlscy5sYWJlbH08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1sZyB0ZXh0LWdyYXBoaXRlLTMwMCBmb250LWxpZ2h0IGxlYWRpbmctcmVsYXhlZFwiPntwcmltYXJ5R3JhZGVEZXRhaWxzLmRlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAge3NlY29uZGFyeURldGFpbHMgJiYgc2Vjb25kYXJ5R3JhZGVEZXRhaWxzICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BwLTEwIHJvdW5kZWQtWzIuNXJlbV0gYm9yZGVyICR7c2Vjb25kYXJ5RGV0YWlscy5jb2xvcn0gYmFja2Ryb3AtYmx1ci14bCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5gfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIG1iLTYgcmVsYXRpdmUgei0xMFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LXNhbnMgZm9udC1tZWRpdW0gdXBwZXJjYXNlIHRyYWNraW5nLVswLjJlbV0gdGV4dC1zaWx2ZXItNTAwLzgwIG1iLTNcIj5GZW5vdHlwIFBvYm9jem55PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBmb250LXNlcmlmIGZvbnQtbGlnaHQgdGV4dC13aGl0ZSB0cmFja2luZy13aWRlXCI+e3NlY29uZGFyeURldGFpbHMubGFiZWx9IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2lsdmVyLTQwMC82MCBpdGFsaWNcIj4oe3Jlc3VsdC5zZWNvbmRhcnlQaGVub3R5cGV9KTwvc3Bhbj48L2gzPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTUgcHktMiBiZy1uYXZ5LTk1MC85MCByb3VuZGVkLXhsIGZvbnQtc2VyaWYgZm9udC1saWdodCB0ZXh0LXhsIHRleHQtc2lsdmVyLTMwMCBib3JkZXIgYm9yZGVyLXNpbHZlci01MDAvNDBcIj5cbiAgICAgICAgICAgICAgICAgICAge3Jlc3VsdC5zZWNvbmRhcnlHcmFkZX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtbGcgdGV4dC1ncmFwaGl0ZS0zMDAgZm9udC1saWdodCBsZWFkaW5nLXJlbGF4ZWQgbWItOCByZWxhdGl2ZSB6LTEwXCI+e3NlY29uZGFyeURldGFpbHMuZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctbmF2eS05NTAvNjAgcm91bmRlZC0yeGwgcC02IHRleHQtYmFzZSBib3JkZXIgYm9yZGVyLXNpbHZlci01MDAvMjAgcmVsYXRpdmUgei0xMFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tZWRpdW0gdGV4dC1zaWx2ZXItMjAwXCI+e3NlY29uZGFyeUdyYWRlRGV0YWlscy5sYWJlbH06PC9zcGFuPiA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXBoaXRlLTMwMCBmb250LWxpZ2h0XCI+e3NlY29uZGFyeUdyYWRlRGV0YWlscy5kZXNjcmlwdGlvbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBBdWRpdCBMb2cgJiBNZXRhZGF0YSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktOFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1uYXZ5LTkwMC84MCBwLTEwIHJvdW5kZWQtWzIuNXJlbV0gc2hhZG93LTJ4bCBib3JkZXIgYm9yZGVyLXNpbHZlci01MDAvMjBcIj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtc2VyaWYgZm9udC1saWdodCB0ZXh0LXdoaXRlIG1iLTEwIGZsZXggaXRlbXMtY2VudGVyIGdhcC00IHRyYWNraW5nLXdpZGVcIj5cbiAgICAgICAgICAgICAgICA8RGF0YWJhc2UgY2xhc3NOYW1lPVwidy02IGgtNiB0ZXh0LXNpbHZlci00MDBcIiBzdHJva2VXaWR0aD17MS41fSAvPlxuICAgICAgICAgICAgICAgIEF1ZGl0IExvZyBTbmFwc2hvdFxuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LThcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwYi02IGJvcmRlci1iIGJvcmRlci1uYXZ5LTgwMC81MFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNCB0ZXh0LWdyYXBoaXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8VGhlcm1vbWV0ZXIgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LXNpbHZlci01MDAvODBcIiBzdHJva2VXaWR0aD17MS41fSAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2FucyBmb250LW1lZGl1bSB0cmFja2luZy13aWRlc3QgdXBwZXJjYXNlIHRleHQtc2lsdmVyLTEwMFwiPkNDVCBLZWx2aW48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1ncmFwaGl0ZS01MDAgZm9udC1saWdodCBtdC0xXCI+e2Rlc2NyaWJlQ29sb3JUZW1wZXJhdHVyZShzbmFwc2hvdC5jb2xvclRlbXBlcmF0dXJlS2VsdmluIHx8IG51bGwpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YGZvbnQtc2VyaWYgZm9udC1saWdodCB0ZXh0LXhsICR7aXNDbGluaWNhbGx5T3B0aW1hbENDVCA/ICd0ZXh0LWVtZXJhbGQtNDAwJyA6ICd0ZXh0LXNpbHZlci0yMDAnfWB9PlxuICAgICAgICAgICAgICAgICAgICB7c25hcHNob3QuY29sb3JUZW1wZXJhdHVyZUtlbHZpbiA/IGAke3NuYXBzaG90LmNvbG9yVGVtcGVyYXR1cmVLZWx2aW59S2AgOiAnQnJhayd9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcGItNiBib3JkZXItYiBib3JkZXItbmF2eS04MDAvNTBcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTQgdGV4dC1ncmFwaGl0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPFJ1bGVyIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1zaWx2ZXItNTAwLzgwXCIgc3Ryb2tlV2lkdGg9ezEuNX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LXNhbnMgZm9udC1tZWRpdW0gdHJhY2tpbmctd2lkZXN0IHVwcGVyY2FzZSB0ZXh0LXNpbHZlci0xMDBcIj5EeXN0YW5zPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlcmlmIGZvbnQtbGlnaHQgdGV4dC14bCB0ZXh0LXNpbHZlci0yMDBcIj57c25hcHNob3QuZGlzdGFuY2VDbX0gY208L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNCB0ZXh0LWdyYXBoaXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LXNpbHZlci01MDAvODBcIiBzdHJva2VXaWR0aD17MS41fSAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2FucyBmb250LW1lZGl1bSB0cmFja2luZy13aWRlc3QgdXBwZXJjYXNlIHRleHQtc2lsdmVyLTEwMFwiPktvc21ldHlraTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LWdyYXBoaXRlLTUwMCBmb250LWxpZ2h0IG10LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzbmFwc2hvdC5jb3NtZXRpY3NEZXRlY3RlZEtpbmRzPy5sZW5ndGggPyBzbmFwc2hvdC5jb3NtZXRpY3NEZXRlY3RlZEtpbmRzLmpvaW4oJywgJykgOiAnQ3p5c3RhIHNrw7NyYSd9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgcHgtNCBweS0xLjUgcm91bmRlZC1sZyB0ZXh0LVsxMHB4XSBmb250LXNhbnMgZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgYm9yZGVyICR7KHNuYXBzaG90LmNvc21ldGljc0NvbmZpZGVuY2UgfHwgMCkgPiAwLjMgPyAnYmctYW1iZXItOTUwLzUwIHRleHQtYW1iZXItNDAwIGJvcmRlci1hbWJlci05MDAvNTAnIDogJ2JnLWVtZXJhbGQtOTAwLzIwIHRleHQtZW1lcmFsZC00MDAgYm9yZGVyLWVtZXJhbGQtNzAwLzMwJ31gfT5cbiAgICAgICAgICAgICAgICAgICAge3NuYXBzaG90LmNvc21ldGljc0NvbmZpZGVuY2UgPyBgJHsoc25hcHNob3QuY29zbWV0aWNzQ29uZmlkZW5jZSAqIDEwMCkudG9GaXhlZCgwKX0lYCA6ICcwJSd9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBEb3RzIEhpLVRlY2ggQ2F0YWxvZyBTZWN0aW9uICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1uYXZ5LTkwMCBiZy1kb3RzIHAtMTAgcm91bmRlZC1bMi41cmVtXSBzaGFkb3ctMnhsIGJvcmRlciBib3JkZXItc2lsdmVyLTUwMC8zMCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tc2lsdmVyLTkwMC8yMCB0by10cmFuc3BhcmVudCBvcGFjaXR5LTUwIGdyb3VwLWhvdmVyOm9wYWNpdHktMTAwIHRyYW5zaXRpb24tb3BhY2l0eSBkdXJhdGlvbi03MDBcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtc2VyaWYgZm9udC1saWdodCBtYi00IHRleHQtc2lsdmVyLTEwMCB0cmFja2luZy13aWRlXCI+S2F0YWxvZyBIaS1UZWNoPC9oMz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXBoaXRlLTQwMCB0ZXh0LXNtIG1iLTggZm9udC1saWdodCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgIE5hIHBvZHN0YXdpZSBrb2R1IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2lsdmVyLTMwMCBmb250LW1lZGl1bVwiPnttc2NDb2RlfTwvc3Bhbj4sIHN5c3RlbSBkb3Bhc293YcWCIDMgb3B0eW1hbG5lIHVyesSFZHplbmlhIHogYmF6eS5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktNCBiZy1uYXZ5LTk1MC85MCBob3ZlcjpiZy1uYXZ5LTkwMCByb3VuZGVkLTJ4bCB0ZXh0LXhzIGZvbnQtc2FucyBmb250LW1lZGl1bSB0cmFja2luZy13aWRlc3QgdXBwZXJjYXNlIHRleHQtc2lsdmVyLTMwMCB0cmFuc2l0aW9uLWFsbCBib3JkZXIgYm9yZGVyLXNpbHZlci01MDAvNDAgaG92ZXI6Ym9yZGVyLXNpbHZlci0zMDAgc2hhZG93LXNpbHZlci1nbG93XCI+XG4gICAgICAgICAgICAgICAgICBab2JhY3ogcmVrb21lbmRhY2plXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0=