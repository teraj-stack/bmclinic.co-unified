import { createHotContext as __vite__createHotContext } from "/myskincode-ai/@vite/client";import.meta.hot = __vite__createHotContext("/myskincode-ai/src/App.tsx");const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport7_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/myskincode-ai/node_modules/.vite/deps/react.js?v=5f77a7b6";
import { Phenotype, Grade } from "/myskincode-ai/src/types.ts";
import { LandingView } from "/myskincode-ai/src/components/LandingView.tsx";
import { CameraScanner } from "/myskincode-ai/src/components/CameraScanner.tsx";
import { AnalysisResult } from "/myskincode-ai/src/components/AnalysisResult.tsx";
import { PatientAnalysisTimelinePage } from "/myskincode-ai/src/pages/PatientAnalysisTimelinePage.tsx";
import { AdminHiTechCatalog } from "/myskincode-ai/src/pages/AdminHiTechCatalog.tsx";
var _jsxFileName = "/app/applet/src/App.tsx";
import __vite__cjsImport7_react_jsxDevRuntime from "/myskincode-ai/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=5f77a7b6";
var _s = $RefreshSig$();
const App = () => {
	_s();
	const [appState, setAppState] = useState("landing");
	const [result, setResult] = useState(null);
	const handleStart = () => {
		setAppState("scanning");
	};
	const handleScanComplete = (snapshot) => {
		setAppState("analyzing");
		// Simulate LLM processing delay and generate a clinical result based on MSC-MATRIX V2
		setTimeout(() => {
			const mockResult = {
				primaryPhenotype: Phenotype.SEB,
				primaryGrade: Grade.G2,
				secondaryPhenotype: Phenotype.VAS,
				secondaryGrade: Grade.G1,
				snapshot
			};
			setResult(mockResult);
			setAppState("results");
		}, 2e3);
	};
	const handleReset = () => {
		setResult(null);
		setAppState("landing");
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "w-full min-h-screen font-sans bg-navy-950 text-graphite-400",
		children: [
			appState === "landing" && /* @__PURE__ */ _jsxDEV(LandingView, {
				onStart: handleStart,
				onOpenCatalog: () => setAppState("catalog"),
				onViewHistory: () => setAppState("timeline")
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 42,
				columnNumber: 9
			}, this),
			appState === "scanning" && /* @__PURE__ */ _jsxDEV(CameraScanner, { onComplete: handleScanComplete }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 50,
				columnNumber: 9
			}, this),
			appState === "analyzing" && /* @__PURE__ */ _jsxDEV("div", {
				className: "min-h-screen flex flex-col items-center justify-center bg-navy-950 p-6 relative overflow-hidden",
				children: [/* @__PURE__ */ _jsxDEV("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-silver-600 rounded-full mix-blend-screen filter blur-[150px] opacity-10" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 56,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "relative z-10 flex flex-col items-center",
					children: [
						/* @__PURE__ */ _jsxDEV("div", { className: "w-28 h-28 border-[2px] border-navy-800 border-t-silver-400 rounded-full animate-spin mb-10 shadow-silver-glow" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 59,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("h2", {
							className: "text-4xl font-serif font-light text-white mb-4 tracking-wide",
							children: ["Przetwarzanie ", /* @__PURE__ */ _jsxDEV("span", {
								className: "text-silver-400 italic",
								children: "LLM..."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 60,
								columnNumber: 104
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 60,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("p", {
							className: "text-graphite-400 text-center max-w-md font-light leading-relaxed text-lg",
							children: "Multi-provider router analizuje wektor cech i przypisuje kod MSC-MATRIX."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 61,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 58,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 54,
				columnNumber: 9
			}, this),
			appState === "results" && result && /* @__PURE__ */ _jsxDEV(AnalysisResult, {
				result,
				onReset: handleReset,
				onViewHistory: () => setAppState("timeline")
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 69,
				columnNumber: 9
			}, this),
			appState === "timeline" && /* @__PURE__ */ _jsxDEV(PatientAnalysisTimelinePage, { onBack: () => result ? setAppState("results") : setAppState("landing") }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 77,
				columnNumber: 9
			}, this),
			appState === "catalog" && /* @__PURE__ */ _jsxDEV(AdminHiTechCatalog, { onBack: () => setAppState("landing") }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 81,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 40,
		columnNumber: 5
	}, this);
};
_s(App, "3mHCl3TF8vskI5mBBW/f58aZ34A=");
_c = App;
export default App;
var _c;
$RefreshReg$(_c, "App");
import * as RefreshRuntime from "/myskincode-ai/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/myskincode-ai/src/App.tsx";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("/app/applet/src/App.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/applet/src/App.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "/app/applet/src/App.tsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLGdCQUFnQjtBQUNoQyxTQUE4QixXQUFXLGFBQW1DO0FBQzVFLFNBQVMsbUJBQW1CO0FBQzVCLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsc0JBQXNCO0FBQy9CLFNBQVMsbUNBQW1DO0FBQzVDLFNBQVMsMEJBQTBCOzs7O0FBRW5DLE1BQU0sWUFBc0I7O0NBQzFCLE1BQU0sQ0FBQyxVQUFVLGVBQWUsU0FBbUIsU0FBUztDQUM1RCxNQUFNLENBQUMsUUFBUSxhQUFhLFNBQTJCLElBQUk7Q0FFM0QsTUFBTSxvQkFBb0I7RUFDeEIsWUFBWSxVQUFVO0NBQ3hCO0NBRUEsTUFBTSxzQkFBc0IsYUFBbUM7RUFDN0QsWUFBWSxXQUFXOztFQUd2QixpQkFBaUI7R0FDZixNQUFNLGFBQXdCO0lBQzVCLGtCQUFrQixVQUFVO0lBQzVCLGNBQWMsTUFBTTtJQUNwQixvQkFBb0IsVUFBVTtJQUM5QixnQkFBZ0IsTUFBTTtJQUN0QjtHQUNGO0dBQ0EsVUFBVSxVQUFVO0dBQ3BCLFlBQVksU0FBUztFQUN2QixHQUFHLEdBQUk7Q0FDVDtDQUVBLE1BQU0sb0JBQW9CO0VBQ3hCLFVBQVUsSUFBSTtFQUNkLFlBQVksU0FBUztDQUN2QjtDQUVBLE9BQ0Usd0JBQUMsT0FBRDtFQUFLLFdBQVU7WUFBZjtHQUNHLGFBQWEsYUFDWix3QkFBQyxhQUFEO0lBQ0UsU0FBUztJQUNULHFCQUFxQixZQUFZLFNBQVM7SUFDMUMscUJBQXFCLFlBQVksVUFBVTtHQUM1Qzs7Ozs7R0FHRixhQUFhLGNBQ1osd0JBQUMsZUFBRCxFQUFlLFlBQVksbUJBQXFCOzs7OztHQUdqRCxhQUFhLGVBQ1osd0JBQUMsT0FBRDtJQUFLLFdBQVU7Y0FBZixDQUVFLHdCQUFDLE9BQUQsRUFBSyxXQUFVLG1KQUF3Sjs7OztjQUV2Syx3QkFBQyxPQUFEO0tBQUssV0FBVTtlQUFmO01BQ0Usd0JBQUMsT0FBRCxFQUFLLFdBQVUsZ0hBQXFIOzs7OztNQUNwSSx3QkFBQyxNQUFEO09BQUksV0FBVTtpQkFBZCxDQUE2RSxrQkFBYyx3QkFBQyxRQUFEO1FBQU0sV0FBVTtrQkFBeUI7T0FBWTs7OztlQUFLOzs7Ozs7TUFDckosd0JBQUMsS0FBRDtPQUFHLFdBQVU7aUJBQTRFO01BRXRGOzs7OztLQUNBOzs7OztZQUNGOzs7Ozs7R0FHTixhQUFhLGFBQWEsVUFDekIsd0JBQUMsZ0JBQUQ7SUFDVTtJQUNSLFNBQVM7SUFDVCxxQkFBcUIsWUFBWSxVQUFVO0dBQzVDOzs7OztHQUdGLGFBQWEsY0FDWix3QkFBQyw2QkFBRCxFQUE2QixjQUFlLFNBQVMsWUFBWSxTQUFTLElBQUksWUFBWSxTQUFTLEVBQUs7Ozs7O0dBR3pHLGFBQWEsYUFDWix3QkFBQyxvQkFBRCxFQUFvQixjQUFjLFlBQVksU0FBUyxFQUFJOzs7OztFQUUxRDs7Ozs7O0FBRVQ7OztBQUVBLGVBQWUiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiQXBwLnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBcHBTdGF0ZSwgTVNDUmVzdWx0LCBQaGVub3R5cGUsIEdyYWRlLCBMaXZlR3VpZGFuY2VTbmFwc2hvdCB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgTGFuZGluZ1ZpZXcgfSBmcm9tICcuL2NvbXBvbmVudHMvTGFuZGluZ1ZpZXcnO1xuaW1wb3J0IHsgQ2FtZXJhU2Nhbm5lciB9IGZyb20gJy4vY29tcG9uZW50cy9DYW1lcmFTY2FubmVyJztcbmltcG9ydCB7IEFuYWx5c2lzUmVzdWx0IH0gZnJvbSAnLi9jb21wb25lbnRzL0FuYWx5c2lzUmVzdWx0JztcbmltcG9ydCB7IFBhdGllbnRBbmFseXNpc1RpbWVsaW5lUGFnZSB9IGZyb20gJy4vcGFnZXMvUGF0aWVudEFuYWx5c2lzVGltZWxpbmVQYWdlJztcbmltcG9ydCB7IEFkbWluSGlUZWNoQ2F0YWxvZyB9IGZyb20gJy4vcGFnZXMvQWRtaW5IaVRlY2hDYXRhbG9nJztcblxuY29uc3QgQXBwOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgW2FwcFN0YXRlLCBzZXRBcHBTdGF0ZV0gPSB1c2VTdGF0ZTxBcHBTdGF0ZT4oJ2xhbmRpbmcnKTtcbiAgY29uc3QgW3Jlc3VsdCwgc2V0UmVzdWx0XSA9IHVzZVN0YXRlPE1TQ1Jlc3VsdCB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IGhhbmRsZVN0YXJ0ID0gKCkgPT4ge1xuICAgIHNldEFwcFN0YXRlKCdzY2FubmluZycpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNjYW5Db21wbGV0ZSA9IChzbmFwc2hvdDogTGl2ZUd1aWRhbmNlU25hcHNob3QpID0+IHtcbiAgICBzZXRBcHBTdGF0ZSgnYW5hbHl6aW5nJyk7XG4gICAgXG4gICAgLy8gU2ltdWxhdGUgTExNIHByb2Nlc3NpbmcgZGVsYXkgYW5kIGdlbmVyYXRlIGEgY2xpbmljYWwgcmVzdWx0IGJhc2VkIG9uIE1TQy1NQVRSSVggVjJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IG1vY2tSZXN1bHQ6IE1TQ1Jlc3VsdCA9IHtcbiAgICAgICAgcHJpbWFyeVBoZW5vdHlwZTogUGhlbm90eXBlLlNFQixcbiAgICAgICAgcHJpbWFyeUdyYWRlOiBHcmFkZS5HMixcbiAgICAgICAgc2Vjb25kYXJ5UGhlbm90eXBlOiBQaGVub3R5cGUuVkFTLFxuICAgICAgICBzZWNvbmRhcnlHcmFkZTogR3JhZGUuRzEsXG4gICAgICAgIHNuYXBzaG90IC8vIFBhc3MgdGhlIHJlYWwtdGltZSBjYXB0dXJlZCBzbmFwc2hvdCB0byB0aGUgcmVzdWx0c1xuICAgICAgfTtcbiAgICAgIHNldFJlc3VsdChtb2NrUmVzdWx0KTtcbiAgICAgIHNldEFwcFN0YXRlKCdyZXN1bHRzJyk7XG4gICAgfSwgMjAwMCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVzZXQgPSAoKSA9PiB7XG4gICAgc2V0UmVzdWx0KG51bGwpO1xuICAgIHNldEFwcFN0YXRlKCdsYW5kaW5nJyk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtaW4taC1zY3JlZW4gZm9udC1zYW5zIGJnLW5hdnktOTUwIHRleHQtZ3JhcGhpdGUtNDAwXCI+XG4gICAgICB7YXBwU3RhdGUgPT09ICdsYW5kaW5nJyAmJiAoXG4gICAgICAgIDxMYW5kaW5nVmlldyBcbiAgICAgICAgICBvblN0YXJ0PXtoYW5kbGVTdGFydH1cbiAgICAgICAgICBvbk9wZW5DYXRhbG9nPXsoKSA9PiBzZXRBcHBTdGF0ZSgnY2F0YWxvZycpfVxuICAgICAgICAgIG9uVmlld0hpc3Rvcnk9eygpID0+IHNldEFwcFN0YXRlKCd0aW1lbGluZScpfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICAgIFxuICAgICAge2FwcFN0YXRlID09PSAnc2Nhbm5pbmcnICYmIChcbiAgICAgICAgPENhbWVyYVNjYW5uZXIgb25Db21wbGV0ZT17aGFuZGxlU2NhbkNvbXBsZXRlfSAvPlxuICAgICAgKX1cblxuICAgICAge2FwcFN0YXRlID09PSAnYW5hbHl6aW5nJyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLW5hdnktOTUwIHAtNiByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICB7LyogU3VidGxlIGJhY2tncm91bmQgZ2xvdyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0xLzIgbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMiAtdHJhbnNsYXRlLXktMS8yIHctOTYgaC05NiBiZy1zaWx2ZXItNjAwIHJvdW5kZWQtZnVsbCBtaXgtYmxlbmQtc2NyZWVuIGZpbHRlciBibHVyLVsxNTBweF0gb3BhY2l0eS0xMFwiPjwvZGl2PlxuICAgICAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgei0xMCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTI4IGgtMjggYm9yZGVyLVsycHhdIGJvcmRlci1uYXZ5LTgwMCBib3JkZXItdC1zaWx2ZXItNDAwIHJvdW5kZWQtZnVsbCBhbmltYXRlLXNwaW4gbWItMTAgc2hhZG93LXNpbHZlci1nbG93XCI+PC9kaXY+XG4gICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC00eGwgZm9udC1zZXJpZiBmb250LWxpZ2h0IHRleHQtd2hpdGUgbWItNCB0cmFja2luZy13aWRlXCI+UHJ6ZXR3YXJ6YW5pZSA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNpbHZlci00MDAgaXRhbGljXCI+TExNLi4uPC9zcGFuPjwvaDI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXBoaXRlLTQwMCB0ZXh0LWNlbnRlciBtYXgtdy1tZCBmb250LWxpZ2h0IGxlYWRpbmctcmVsYXhlZCB0ZXh0LWxnXCI+XG4gICAgICAgICAgICAgIE11bHRpLXByb3ZpZGVyIHJvdXRlciBhbmFsaXp1amUgd2VrdG9yIGNlY2ggaSBwcnp5cGlzdWplIGtvZCBNU0MtTUFUUklYLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHthcHBTdGF0ZSA9PT0gJ3Jlc3VsdHMnICYmIHJlc3VsdCAmJiAoXG4gICAgICAgIDxBbmFseXNpc1Jlc3VsdCBcbiAgICAgICAgICByZXN1bHQ9e3Jlc3VsdH0gXG4gICAgICAgICAgb25SZXNldD17aGFuZGxlUmVzZXR9IFxuICAgICAgICAgIG9uVmlld0hpc3Rvcnk9eygpID0+IHNldEFwcFN0YXRlKCd0aW1lbGluZScpfSBcbiAgICAgICAgLz5cbiAgICAgICl9XG5cbiAgICAgIHthcHBTdGF0ZSA9PT0gJ3RpbWVsaW5lJyAmJiAoXG4gICAgICAgIDxQYXRpZW50QW5hbHlzaXNUaW1lbGluZVBhZ2Ugb25CYWNrPXsoKSA9PiAocmVzdWx0ID8gc2V0QXBwU3RhdGUoJ3Jlc3VsdHMnKSA6IHNldEFwcFN0YXRlKCdsYW5kaW5nJykpfSAvPlxuICAgICAgKX1cblxuICAgICAge2FwcFN0YXRlID09PSAnY2F0YWxvZycgJiYgKFxuICAgICAgICA8QWRtaW5IaVRlY2hDYXRhbG9nIG9uQmFjaz17KCkgPT4gc2V0QXBwU3RhdGUoJ2xhbmRpbmcnKX0gLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iXX0=