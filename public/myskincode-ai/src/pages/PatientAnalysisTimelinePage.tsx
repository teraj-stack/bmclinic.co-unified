import { createHotContext as __vite__createHotContext } from "/myskincode-ai/@vite/client";import.meta.hot = __vite__createHotContext("/myskincode-ai/src/pages/PatientAnalysisTimelinePage.tsx");const React = __vite__cjsImport0_react;const _jsxDEV = __vite__cjsImport4_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/myskincode-ai/node_modules/.vite/deps/react.js?v=5f77a7b6";
import { ArrowLeft, Calendar, TrendingUp, Activity, Sparkles } from "/myskincode-ai/node_modules/.vite/deps/lucide-react.js?v=c90b8d26";
import { Phenotype } from "/myskincode-ai/src/types.ts";
import { PHENOTYPE_DETAILS } from "/myskincode-ai/src/constants.ts";
var _jsxFileName = "/app/applet/src/pages/PatientAnalysisTimelinePage.tsx";
import __vite__cjsImport4_react_jsxDevRuntime from "/myskincode-ai/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=5f77a7b6";
// Mock data representing the output of the SkinAnalysisComparison delta algorithm
const MOCK_HISTORY = [
	{
		id: "3",
		date: "Dzisiaj",
		skinType: Phenotype.REM,
		grade: "G0",
		confidence: 92,
		imageUrl: "https://picsum.photos/seed/skin3/400/500",
		delta: {
			humanSummary: "Grade primary SEB zmniejszył się z G1 na G0. Skóra weszła w fazę przebudowy i stabilizacji.",
			confidenceDelta: 5,
			skinTypeChange: {
				from: Phenotype.SEB,
				to: Phenotype.REM
			},
			improvements: ["Zmniejszenie zaczerwienienia na policzkach", "Ustąpienie przesuszenia w strefie T"]
		}
	},
	{
		id: "2",
		date: "14 lutego 2024",
		skinType: Phenotype.SEB,
		grade: "G1",
		confidence: 87,
		imageUrl: "https://picsum.photos/seed/skin2/400/500",
		delta: {
			humanSummary: "Grade primary SEB zmniejszył się z G2 na G1 po 2 sesjach CAP. Secondary VAS utrzymany.",
			confidenceDelta: 12,
			skinTypeChange: null,
			improvements: ["Spłycenie zmian strukturalnych"]
		}
	},
	{
		id: "1",
		date: "25 stycznia 2024",
		skinType: Phenotype.SEB,
		grade: "G2",
		confidence: 75,
		imageUrl: "https://picsum.photos/seed/skin1/400/500",
		delta: null
	}
];
export const PatientAnalysisTimelinePage = ({ onBack }) => {
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "min-h-screen bg-navy-950 bg-dots py-16 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden",
		children: [
			/* @__PURE__ */ _jsxDEV("div", { className: "absolute top-0 left-0 w-full h-[2px] bg-silver-gradient opacity-50" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 51,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", { className: "absolute -top-40 -right-40 w-96 h-96 bg-silver-500/10 rounded-full blur-[120px] pointer-events-none" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 52,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", { className: "absolute bottom-20 -left-20 w-80 h-80 bg-silver-600/5 rounded-full blur-[100px] pointer-events-none" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 53,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "max-w-4xl mx-auto relative z-10",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center justify-between mb-16",
					children: [/* @__PURE__ */ _jsxDEV("button", {
						onClick: onBack,
						className: "flex items-center gap-4 text-silver-400 hover:text-silver-200 transition-colors group",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "p-4 rounded-full bg-navy-900 border border-silver-500/20 group-hover:border-silver-500/40 group-hover:shadow-silver-glow transition-all duration-300",
							children: /* @__PURE__ */ _jsxDEV(ArrowLeft, {
								className: "w-5 h-5",
								strokeWidth: 1.5
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 60,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 59,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("span", {
							className: "font-sans font-medium tracking-widest uppercase text-xs",
							children: "Powrót"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 62,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 58,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "text-right",
						children: [/* @__PURE__ */ _jsxDEV("h1", {
							className: "text-4xl font-serif font-light text-white tracking-wide",
							children: "Historia Analiz"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 65,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("p", {
							className: "text-silver-500/70 text-[10px] font-sans uppercase tracking-[0.3em] mt-3",
							children: "Monitorowanie postępów MSC-MATRIX"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 66,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 64,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 57,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "relative space-y-12 before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-silver-500/50 before:via-silver-500/20 before:to-transparent",
					children: MOCK_HISTORY.map((entry, index) => {
						const details = PHENOTYPE_DETAILS[entry.skinType];
						const isLatest = index === 0;
						return /* @__PURE__ */ _jsxDEV("div", {
							className: "relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: `flex items-center justify-center w-12 h-12 rounded-full border-[4px] border-navy-950 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-silver-glow z-10 transition-colors duration-500 ${isLatest ? "bg-silver-500" : "bg-navy-800"}`,
								children: /* @__PURE__ */ _jsxDEV(Calendar, {
									className: `w-5 h-5 ${isLatest ? "text-navy-950" : "text-silver-400"}`,
									strokeWidth: 1.5
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 80,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 79,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] p-8 rounded-[2.5rem] bg-navy-900/60 backdrop-blur-xl border border-silver-500/20 shadow-2xl hover:shadow-silver-glow-strong hover:border-silver-500/40 transition-all duration-500",
								children: [
									/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center justify-between mb-6",
										children: [/* @__PURE__ */ _jsxDEV("span", {
											className: "text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-silver-400",
											children: entry.date
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 86,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("div", {
											className: "flex items-center gap-2 bg-navy-950 px-4 py-2 rounded-full border border-silver-500/20 shadow-inner",
											children: [/* @__PURE__ */ _jsxDEV(Activity, {
												className: "w-3.5 h-3.5 text-emerald-400",
												strokeWidth: 2
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 88,
												columnNumber: 23
											}, this), /* @__PURE__ */ _jsxDEV("span", {
												className: "text-[10px] font-mono text-graphite-300 tracking-wider",
												children: [
													"AI: ",
													entry.confidence,
													"%"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 89,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 87,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 85,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "flex gap-6 mb-8",
										children: [/* @__PURE__ */ _jsxDEV("img", {
											src: entry.imageUrl,
											alt: "Skan",
											className: "w-28 h-36 object-cover rounded-2xl border border-silver-500/20 opacity-80 grayscale-[20%] shadow-md"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 94,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("div", {
											className: "flex flex-col justify-center",
											children: [/* @__PURE__ */ _jsxDEV("div", {
												className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-navy-950 border border-silver-500/30 mb-4 shadow-silver-glow-inner w-fit",
												children: /* @__PURE__ */ _jsxDEV("span", {
													className: "text-sm font-mono font-bold text-silver-200 tracking-wide",
													children: [
														"MSC-",
														entry.skinType,
														"-",
														entry.grade
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 97,
													columnNumber: 25
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 96,
												columnNumber: 23
											}, this), /* @__PURE__ */ _jsxDEV("h3", {
												className: "text-2xl font-serif font-light text-white leading-tight tracking-wide",
												children: details.label
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 99,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 95,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 93,
										columnNumber: 19
									}, this),
									entry.delta && /* @__PURE__ */ _jsxDEV("div", {
										className: "pt-6 border-t border-navy-800/50",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "flex items-start gap-4 mb-4",
											children: [/* @__PURE__ */ _jsxDEV(TrendingUp, {
												className: "w-5 h-5 text-silver-400 shrink-0 mt-0.5",
												strokeWidth: 1.5
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 106,
												columnNumber: 25
											}, this), /* @__PURE__ */ _jsxDEV("p", {
												className: "text-sm text-graphite-300 font-light leading-relaxed",
												children: entry.delta.humanSummary
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 107,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 105,
											columnNumber: 23
										}, this), entry.delta.improvements && entry.delta.improvements.length > 0 && /* @__PURE__ */ _jsxDEV("div", {
											className: "mt-5 space-y-3",
											children: entry.delta.improvements.map((imp, i) => /* @__PURE__ */ _jsxDEV("div", {
												className: "flex items-center gap-3 text-xs text-emerald-400/90 bg-emerald-950/20 px-4 py-3 rounded-xl border border-emerald-900/30 shadow-sm",
												children: [/* @__PURE__ */ _jsxDEV(Sparkles, {
													className: "w-4 h-4 shrink-0",
													strokeWidth: 1.5
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 114,
													columnNumber: 31
												}, this), /* @__PURE__ */ _jsxDEV("span", {
													className: "font-light tracking-wide",
													children: imp
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 115,
													columnNumber: 31
												}, this)]
											}, i, true, {
												fileName: _jsxFileName,
												lineNumber: 113,
												columnNumber: 29
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 111,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 104,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 84,
								columnNumber: 17
							}, this)]
						}, entry.id, true, {
							fileName: _jsxFileName,
							lineNumber: 77,
							columnNumber: 15
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 55,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 49,
		columnNumber: 5
	}, this);
};
_c = PatientAnalysisTimelinePage;
var _c;
$RefreshReg$(_c, "PatientAnalysisTimelinePage");
import * as RefreshRuntime from "/myskincode-ai/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/myskincode-ai/src/pages/PatientAnalysisTimelinePage.tsx";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("/app/applet/src/pages/PatientAnalysisTimelinePage.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/applet/src/pages/PatientAnalysisTimelinePage.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "/app/applet/src/pages/PatientAnalysisTimelinePage.tsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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O3NCQUNiLHdCQUFDLFFBQUQ7YUFBTSxXQUFVO3VCQUFoQjtjQUE0RTtjQUFLLE1BQU07Y0FBUztjQUFFLE1BQU07YUFBWTs7Ozs7O1dBQ2pIOzs7O3FCQUNMLHdCQUFDLE1BQUQ7WUFBSSxXQUFVO3NCQUF5RSxRQUFRO1dBQVU7Ozs7bUJBQ3RHOzs7OztrQkFDRjs7Ozs7O1NBRUosTUFBTSxTQUNMLHdCQUFDLE9BQUQ7VUFBSyxXQUFVO29CQUFmLENBQ0Usd0JBQUMsT0FBRDtXQUFLLFdBQVU7cUJBQWYsQ0FDRSx3QkFBQyxZQUFEO1lBQVksV0FBVTtZQUEwQyxhQUFhO1dBQU07Ozs7cUJBQ25GLHdCQUFDLEtBQUQ7WUFBRyxXQUFVO3NCQUF3RCxNQUFNLE1BQU07V0FBZ0I7Ozs7bUJBQzlGOzs7OztvQkFFSixNQUFNLE1BQU0sZ0JBQWdCLE1BQU0sTUFBTSxhQUFhLFNBQVMsS0FDN0Qsd0JBQUMsT0FBRDtXQUFLLFdBQVU7cUJBQ1osTUFBTSxNQUFNLGFBQWEsS0FBSyxLQUFLLE1BQ2xDLHdCQUFDLE9BQUQ7WUFBYSxXQUFVO3NCQUF2QixDQUNFLHdCQUFDLFVBQUQ7YUFBVSxXQUFVO2FBQW1CLGFBQWE7WUFBTTs7OztzQkFDMUQsd0JBQUMsUUFBRDthQUFNLFdBQVU7dUJBQTRCO1lBQVU7Ozs7b0JBQ25EO2NBSEs7Ozs7a0JBR0wsQ0FDTjtVQUNFOzs7O2tCQUVKOzs7Ozs7UUFFSjs7Ozs7ZUFDRjtTQTlDSyxNQUFNOzs7O2FBOENYO0tBRVQsQ0FBQztJQUNFOzs7O1lBQ0Y7Ozs7OztFQUNGOzs7Ozs7QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJQYXRpZW50QW5hbHlzaXNUaW1lbGluZVBhZ2UudHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBcnJvd0xlZnQsIENhbGVuZGFyLCBUcmVuZGluZ1VwLCBBY3Rpdml0eSwgU3BhcmtsZXMgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgUGhlbm90eXBlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgUEhFTk9UWVBFX0RFVEFJTFMgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG4vLyBNb2NrIGRhdGEgcmVwcmVzZW50aW5nIHRoZSBvdXRwdXQgb2YgdGhlIFNraW5BbmFseXNpc0NvbXBhcmlzb24gZGVsdGEgYWxnb3JpdGhtXG5jb25zdCBNT0NLX0hJU1RPUlkgPSBbXG4gIHtcbiAgICBpZDogJzMnLFxuICAgIGRhdGU6ICdEemlzaWFqJyxcbiAgICBza2luVHlwZTogUGhlbm90eXBlLlJFTSxcbiAgICBncmFkZTogJ0cwJyxcbiAgICBjb25maWRlbmNlOiA5MixcbiAgICBpbWFnZVVybDogJ2h0dHBzOi8vcGljc3VtLnBob3Rvcy9zZWVkL3NraW4zLzQwMC81MDAnLFxuICAgIGRlbHRhOiB7XG4gICAgICBodW1hblN1bW1hcnk6ICdHcmFkZSBwcmltYXJ5IFNFQiB6bW5pZWpzennFgiBzacSZIHogRzEgbmEgRzAuIFNrw7NyYSB3ZXN6xYJhIHcgZmF6xJkgcHJ6ZWJ1ZG93eSBpIHN0YWJpbGl6YWNqaS4nLFxuICAgICAgY29uZmlkZW5jZURlbHRhOiA1LFxuICAgICAgc2tpblR5cGVDaGFuZ2U6IHsgZnJvbTogUGhlbm90eXBlLlNFQiwgdG86IFBoZW5vdHlwZS5SRU0gfSxcbiAgICAgIGltcHJvdmVtZW50czogWydabW5pZWpzemVuaWUgemFjemVyd2llbmllbmlhIG5hIHBvbGljemthY2gnLCAnVXN0xIVwaWVuaWUgcHJ6ZXN1c3plbmlhIHcgc3RyZWZpZSBUJ11cbiAgICB9XG4gIH0sXG4gIHtcbiAgICBpZDogJzInLFxuICAgIGRhdGU6ICcxNCBsdXRlZ28gMjAyNCcsXG4gICAgc2tpblR5cGU6IFBoZW5vdHlwZS5TRUIsXG4gICAgZ3JhZGU6ICdHMScsXG4gICAgY29uZmlkZW5jZTogODcsXG4gICAgaW1hZ2VVcmw6ICdodHRwczovL3BpY3N1bS5waG90b3Mvc2VlZC9za2luMi80MDAvNTAwJyxcbiAgICBkZWx0YToge1xuICAgICAgaHVtYW5TdW1tYXJ5OiAnR3JhZGUgcHJpbWFyeSBTRUIgem1uaWVqc3p5xYIgc2nEmSB6IEcyIG5hIEcxIHBvIDIgc2VzamFjaCBDQVAuIFNlY29uZGFyeSBWQVMgdXRyenltYW55LicsXG4gICAgICBjb25maWRlbmNlRGVsdGE6IDEyLFxuICAgICAgc2tpblR5cGVDaGFuZ2U6IG51bGwsXG4gICAgICBpbXByb3ZlbWVudHM6IFsnU3DFgnljZW5pZSB6bWlhbiBzdHJ1a3R1cmFsbnljaCddXG4gICAgfVxuICB9LFxuICB7XG4gICAgaWQ6ICcxJyxcbiAgICBkYXRlOiAnMjUgc3R5Y3puaWEgMjAyNCcsXG4gICAgc2tpblR5cGU6IFBoZW5vdHlwZS5TRUIsXG4gICAgZ3JhZGU6ICdHMicsXG4gICAgY29uZmlkZW5jZTogNzUsXG4gICAgaW1hZ2VVcmw6ICdodHRwczovL3BpY3N1bS5waG90b3Mvc2VlZC9za2luMS80MDAvNTAwJyxcbiAgICBkZWx0YTogbnVsbFxuICB9XG5dO1xuXG5leHBvcnQgY29uc3QgUGF0aWVudEFuYWx5c2lzVGltZWxpbmVQYWdlOiBSZWFjdC5GQzx7IG9uQmFjazogKCkgPT4gdm9pZCB9PiA9ICh7IG9uQmFjayB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctbmF2eS05NTAgYmctZG90cyBweS0xNiBweC00IHNtOnB4LTYgbGc6cHgtOCBmb250LXNhbnMgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICB7LyogQmFja2dyb3VuZCBHbG93cyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgbGVmdC0wIHctZnVsbCBoLVsycHhdIGJnLXNpbHZlci1ncmFkaWVudCBvcGFjaXR5LTUwXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtNDAgLXJpZ2h0LTQwIHctOTYgaC05NiBiZy1zaWx2ZXItNTAwLzEwIHJvdW5kZWQtZnVsbCBibHVyLVsxMjBweF0gcG9pbnRlci1ldmVudHMtbm9uZVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMjAgLWxlZnQtMjAgdy04MCBoLTgwIGJnLXNpbHZlci02MDAvNSByb3VuZGVkLWZ1bGwgYmx1ci1bMTAwcHhdIHBvaW50ZXItZXZlbnRzLW5vbmVcIj48L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy00eGwgbXgtYXV0byByZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTE2XCI+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtvbkJhY2t9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC00IHRleHQtc2lsdmVyLTQwMCBob3Zlcjp0ZXh0LXNpbHZlci0yMDAgdHJhbnNpdGlvbi1jb2xvcnMgZ3JvdXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtZnVsbCBiZy1uYXZ5LTkwMCBib3JkZXIgYm9yZGVyLXNpbHZlci01MDAvMjAgZ3JvdXAtaG92ZXI6Ym9yZGVyLXNpbHZlci01MDAvNDAgZ3JvdXAtaG92ZXI6c2hhZG93LXNpbHZlci1nbG93IHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMFwiPlxuICAgICAgICAgICAgICA8QXJyb3dMZWZ0IGNsYXNzTmFtZT1cInctNSBoLTVcIiBzdHJva2VXaWR0aD17MS41fSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNhbnMgZm9udC1tZWRpdW0gdHJhY2tpbmctd2lkZXN0IHVwcGVyY2FzZSB0ZXh0LXhzXCI+UG93csOzdDwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTR4bCBmb250LXNlcmlmIGZvbnQtbGlnaHQgdGV4dC13aGl0ZSB0cmFja2luZy13aWRlXCI+SGlzdG9yaWEgQW5hbGl6PC9oMT5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2lsdmVyLTUwMC83MCB0ZXh0LVsxMHB4XSBmb250LXNhbnMgdXBwZXJjYXNlIHRyYWNraW5nLVswLjNlbV0gbXQtM1wiPk1vbml0b3Jvd2FuaWUgcG9zdMSZcMOzdyBNU0MtTUFUUklYPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogVGltZWxpbmUgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgc3BhY2UteS0xMiBiZWZvcmU6YWJzb2x1dGUgYmVmb3JlOmluc2V0LTAgYmVmb3JlOm1sLTYgYmVmb3JlOi10cmFuc2xhdGUteC1weCBtZDpiZWZvcmU6bXgtYXV0byBtZDpiZWZvcmU6dHJhbnNsYXRlLXgtMCBiZWZvcmU6aC1mdWxsIGJlZm9yZTp3LVsycHhdIGJlZm9yZTpiZy1ncmFkaWVudC10by1iIGJlZm9yZTpmcm9tLXNpbHZlci01MDAvNTAgYmVmb3JlOnZpYS1zaWx2ZXItNTAwLzIwIGJlZm9yZTp0by10cmFuc3BhcmVudFwiPlxuICAgICAgICAgIHtNT0NLX0hJU1RPUlkubWFwKChlbnRyeSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRldGFpbHMgPSBQSEVOT1RZUEVfREVUQUlMU1tlbnRyeS5za2luVHlwZV07XG4gICAgICAgICAgICBjb25zdCBpc0xhdGVzdCA9IGluZGV4ID09PSAwO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17ZW50cnkuaWR9IGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtZDpqdXN0aWZ5LW5vcm1hbCBtZDpvZGQ6ZmxleC1yb3ctcmV2ZXJzZSBncm91cFwiPlxuICAgICAgICAgICAgICAgIHsvKiBUaW1lbGluZSBkb3QgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB3LTEyIGgtMTIgcm91bmRlZC1mdWxsIGJvcmRlci1bNHB4XSBib3JkZXItbmF2eS05NTAgc2hyaW5rLTAgbWQ6b3JkZXItMSBtZDpncm91cC1vZGQ6LXRyYW5zbGF0ZS14LTEvMiBtZDpncm91cC1ldmVuOnRyYW5zbGF0ZS14LTEvMiBzaGFkb3ctc2lsdmVyLWdsb3cgei0xMCB0cmFuc2l0aW9uLWNvbG9ycyBkdXJhdGlvbi01MDAgJHtpc0xhdGVzdCA/ICdiZy1zaWx2ZXItNTAwJyA6ICdiZy1uYXZ5LTgwMCd9YH0+XG4gICAgICAgICAgICAgICAgICA8Q2FsZW5kYXIgY2xhc3NOYW1lPXtgdy01IGgtNSAke2lzTGF0ZXN0ID8gJ3RleHQtbmF2eS05NTAnIDogJ3RleHQtc2lsdmVyLTQwMCd9YH0gc3Ryb2tlV2lkdGg9ezEuNX0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBDYXJkICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1bY2FsYygxMDAlLTVyZW0pXSBtZDp3LVtjYWxjKDUwJS00cmVtKV0gcC04IHJvdW5kZWQtWzIuNXJlbV0gYmctbmF2eS05MDAvNjAgYmFja2Ryb3AtYmx1ci14bCBib3JkZXIgYm9yZGVyLXNpbHZlci01MDAvMjAgc2hhZG93LTJ4bCBob3ZlcjpzaGFkb3ctc2lsdmVyLWdsb3ctc3Ryb25nIGhvdmVyOmJvcmRlci1zaWx2ZXItNTAwLzQwIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTUwMFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItNlwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LXNhbnMgZm9udC1tZWRpdW0gdHJhY2tpbmctWzAuMmVtXSB1cHBlcmNhc2UgdGV4dC1zaWx2ZXItNDAwXCI+e2VudHJ5LmRhdGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJnLW5hdnktOTUwIHB4LTQgcHktMiByb3VuZGVkLWZ1bGwgYm9yZGVyIGJvcmRlci1zaWx2ZXItNTAwLzIwIHNoYWRvdy1pbm5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxBY3Rpdml0eSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgc3Ryb2tlV2lkdGg9ezJ9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtZ3JhcGhpdGUtMzAwIHRyYWNraW5nLXdpZGVyXCI+QUk6IHtlbnRyeS5jb25maWRlbmNlfSU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtNiBtYi04XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtlbnRyeS5pbWFnZVVybH0gYWx0PVwiU2thblwiIGNsYXNzTmFtZT1cInctMjggaC0zNiBvYmplY3QtY292ZXIgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zaWx2ZXItNTAwLzIwIG9wYWNpdHktODAgZ3JheXNjYWxlLVsyMCVdIHNoYWRvdy1tZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTQgcHktMS41IHJvdW5kZWQteGwgYmctbmF2eS05NTAgYm9yZGVyIGJvcmRlci1zaWx2ZXItNTAwLzMwIG1iLTQgc2hhZG93LXNpbHZlci1nbG93LWlubmVyIHctZml0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC1zaWx2ZXItMjAwIHRyYWNraW5nLXdpZGVcIj5NU0Mte2VudHJ5LnNraW5UeXBlfS17ZW50cnkuZ3JhZGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LXNlcmlmIGZvbnQtbGlnaHQgdGV4dC13aGl0ZSBsZWFkaW5nLXRpZ2h0IHRyYWNraW5nLXdpZGVcIj57ZGV0YWlscy5sYWJlbH08L2gzPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7ZW50cnkuZGVsdGEgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTYgYm9yZGVyLXQgYm9yZGVyLW5hdnktODAwLzUwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC00IG1iLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxUcmVuZGluZ1VwIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1zaWx2ZXItNDAwIHNocmluay0wIG10LTAuNVwiIHN0cm9rZVdpZHRoPXsxLjV9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JhcGhpdGUtMzAwIGZvbnQtbGlnaHQgbGVhZGluZy1yZWxheGVkXCI+e2VudHJ5LmRlbHRhLmh1bWFuU3VtbWFyeX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmRlbHRhLmltcHJvdmVtZW50cyAmJiBlbnRyeS5kZWx0YS5pbXByb3ZlbWVudHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTUgc3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5kZWx0YS5pbXByb3ZlbWVudHMubWFwKChpbXAsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC14cyB0ZXh0LWVtZXJhbGQtNDAwLzkwIGJnLWVtZXJhbGQtOTUwLzIwIHB4LTQgcHktMyByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItZW1lcmFsZC05MDAvMzAgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy00IGgtNCBzaHJpbmstMFwiIHN0cm9rZVdpZHRoPXsxLjV9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWxpZ2h0IHRyYWNraW5nLXdpZGVcIj57aW1wfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0=