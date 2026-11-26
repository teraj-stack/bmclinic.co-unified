import { createHotContext as __vite__createHotContext } from "/myskincode-ai/@vite/client";import.meta.hot = __vite__createHotContext("/myskincode-ai/src/components/LandingView.tsx");const React = __vite__cjsImport0_react;const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/myskincode-ai/node_modules/.vite/deps/react.js?v=5f77a7b6";
import { Sun, Clock, Droplets, ArrowRight, Sparkles, Lock, ShieldCheck } from "/myskincode-ai/node_modules/.vite/deps/lucide-react.js?v=c90b8d26";
var _jsxFileName = "/app/applet/src/components/LandingView.tsx";
import __vite__cjsImport2_react_jsxDevRuntime from "/myskincode-ai/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=5f77a7b6";
function DnaHelix({ className = "w-24 h-24 md:w-32 md:h-32" }) {
	return /* @__PURE__ */ _jsxDEV("svg", {
		viewBox: "0 0 200 200",
		xmlns: "http://www.w3.org/2000/svg",
		className,
		"aria-label": "MySkinCode — DNA helix",
		children: [
			/* @__PURE__ */ _jsxDEV("path", {
				d: "M 20 30 C 60 30, 60 100, 100 100 C 140 100, 140 30, 180 30",
				stroke: "currentColor",
				strokeWidth: "6",
				fill: "none",
				strokeLinecap: "round",
				className: "text-silver-500/30"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 19,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("path", {
				d: "M 20 170 C 60 170, 60 100, 100 100 C 140 100, 140 170, 180 170",
				stroke: "currentColor",
				strokeWidth: "6",
				fill: "none",
				strokeLinecap: "round",
				className: "text-silver-500/30"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 27,
				columnNumber: 7
			}, this),
			[
				[
					58,
					52,
					58,
					148
				],
				[
					78,
					38,
					78,
					162
				],
				[
					100,
					32,
					100,
					168
				],
				[
					122,
					38,
					122,
					162
				],
				[
					142,
					52,
					142,
					148
				]
			].map(([x1, y1, x2, y2], i) => /* @__PURE__ */ _jsxDEV("line", {
				x1,
				y1,
				x2,
				y2,
				stroke: "currentColor",
				strokeWidth: "4",
				strokeLinecap: "round",
				className: "text-silver-400"
			}, i, false, {
				fileName: _jsxFileName,
				lineNumber: 43,
				columnNumber: 9
			}, this))
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 12,
		columnNumber: 5
	}, this);
}
_c = DnaHelix;
function Divider() {
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "flex items-center justify-center my-10 md:my-14",
		children: [
			/* @__PURE__ */ _jsxDEV("div", { className: "h-px w-16 bg-silver-500/20" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 62,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", { className: "mx-4 w-1.5 h-1.5 rounded-full bg-silver-400/50 shadow-[0_0_8px_rgba(203,213,225,0.5)]" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 63,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", { className: "h-px w-16 bg-silver-500/20" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 64,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 61,
		columnNumber: 5
	}, this);
}
_c2 = Divider;
function MscChipTeaser() {
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "inline-flex items-center gap-3 bg-navy-900/60 border border-silver-500/30 rounded-full px-6 py-3 shadow-silver-glow-inner backdrop-blur-sm",
		children: [/* @__PURE__ */ _jsxDEV("span", {
			className: "text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-silver-500/80 font-sans font-medium",
			children: "Twój kod"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 72,
			columnNumber: 7
		}, this), /* @__PURE__ */ _jsxDEV("span", {
			className: "font-mono font-bold text-silver-100 text-[14px] md:text-[15px] tracking-wide",
			children: "MSC-SEB-G2"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 75,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 71,
		columnNumber: 5
	}, this);
}
_c3 = MscChipTeaser;
export const LandingView = ({ onStart, onOpenCatalog, onViewHistory }) => {
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "min-h-screen flex flex-col relative overflow-hidden bg-navy-950 font-sans antialiased",
		children: [
			/* @__PURE__ */ _jsxDEV("div", { className: "absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-silver-600 rounded-full mix-blend-screen filter blur-[200px] opacity-10 animate-pulse-slow pointer-events-none" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 86,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-silver-500 rounded-full mix-blend-screen filter blur-[200px] opacity-10 animate-pulse-slow pointer-events-none",
				style: { animationDelay: "2s" }
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 87,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "border-b border-silver-500/10 bg-navy-950/80 backdrop-blur-md relative z-20",
				children: /* @__PURE__ */ _jsxDEV("div", {
					className: "max-w-5xl mx-auto px-6 py-3 flex items-center justify-between text-[9px] md:text-[10px] text-silver-500/60 font-sans tracking-[0.15em] uppercase",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ _jsxDEV(Lock, {
							className: "w-3.5 h-3.5 text-silver-500/60",
							strokeWidth: 1.5
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 93,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("span", {
							className: "tracking-wide",
							children: "Dane przetwarzane w UE · zgodnie z RODO"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 94,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 92,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-5",
						children: [
							onOpenCatalog && /* @__PURE__ */ _jsxDEV("button", {
								onClick: onOpenCatalog,
								className: "text-silver-300 hover:text-white transition-colors cursor-pointer",
								children: "Katalog Hi-Tech"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 100,
								columnNumber: 15
							}, this),
							onViewHistory && /* @__PURE__ */ _jsxDEV("button", {
								onClick: onViewHistory,
								className: "text-silver-300 hover:text-white transition-colors cursor-pointer",
								children: "Ostatnie analizy"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 105,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "hidden md:flex items-center gap-2 text-silver-500/60",
								children: [/* @__PURE__ */ _jsxDEV(ShieldCheck, {
									className: "w-3.5 h-3.5",
									strokeWidth: 1.5
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 110,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "tracking-wide",
									children: "Analiza konsultacyjna"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 111,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 109,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 98,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 91,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 90,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("main", {
				className: "flex-1 w-full max-w-4xl mx-auto px-6 pt-12 md:pt-20 pb-20 flex flex-col items-center text-center relative z-10",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ _jsxDEV(DnaHelix, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 122,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("h1", {
								className: "mt-6 text-4xl md:text-5xl font-serif font-light text-white tracking-wide",
								children: "MySkinCode"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 123,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("p", {
								className: "mt-3 text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-silver-500/70 font-sans font-medium",
								children: [
									"Technical Support ",
									/* @__PURE__ */ _jsxDEV("span", {
										className: "mx-2 text-graphite-600",
										children: "|"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 127,
										columnNumber: 31
									}, this),
									" MedTech SaaS"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 126,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 121,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV(Divider, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 131,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "text-center max-w-2xl mx-auto",
						children: [
							/* @__PURE__ */ _jsxDEV("h2", {
								className: "text-3xl md:text-[2.75rem] leading-[1.2] font-serif font-light text-white tracking-wide",
								children: [
									"Twój kod skóry.",
									/* @__PURE__ */ _jsxDEV("br", {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 136,
										columnNumber: 28
									}, this),
									/* @__PURE__ */ _jsxDEV("span", {
										className: "text-silver-400 italic",
										children: "Twój plan pielęgnacji."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 137,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 135,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("p", {
								className: "mt-8 text-[15px] md:text-base leading-relaxed text-graphite-400 font-light",
								children: "Profesjonalny system analizy skóry oparty na dziewięciu fenotypach i czterech stopniach zaawansowania. Po wykonaniu zdjęcia otrzymasz swój kod w klinicznym języku — taki, jakiego używają dermatolodzy i kosmetolodzy między sobą."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 139,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "mt-10 flex justify-center",
								children: /* @__PURE__ */ _jsxDEV(MscChipTeaser, {}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 148,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 147,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "mt-12",
								children: [/* @__PURE__ */ _jsxDEV("button", {
									onClick: onStart,
									className: "group relative inline-flex items-center justify-center px-10 py-4 text-sm font-sans font-medium tracking-[0.15em] uppercase text-navy-950 transition-all duration-500 bg-silver-gradient rounded-full hover:shadow-silver-glow-strong hover:-translate-y-1 overflow-hidden border border-silver-300/50",
									children: [/* @__PURE__ */ _jsxDEV("span", { className: "absolute inset-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 157,
										columnNumber: 15
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "relative flex items-center gap-4",
										children: ["Rozpocznij analizę", /* @__PURE__ */ _jsxDEV(ArrowRight, {
											className: "w-5 h-5 transition-transform duration-500 group-hover:translate-x-1",
											strokeWidth: 1.5
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 160,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 158,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 153,
									columnNumber: 13
								}, this), /* @__PURE__ */ _jsxDEV("p", {
									className: "mt-5 text-[11px] text-graphite-500 font-light tracking-wide",
									children: "Zanim klikniesz — przeczytaj protokół zdjęcia poniżej."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 163,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 152,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 134,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV(Divider, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 169,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "w-full",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "text-center mb-10",
							children: [/* @__PURE__ */ _jsxDEV("p", {
								className: "text-[10px] uppercase tracking-[0.3em] text-silver-500/70 font-sans font-medium mb-3",
								children: "Protokół pobierania zdjęcia"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 174,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("h3", {
								className: "text-2xl md:text-3xl font-serif font-light text-white tracking-wide",
								children: "Trzy warunki dla wiarygodnej analizy"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 177,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 173,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "grid grid-cols-1 md:grid-cols-3 gap-6 text-left",
							children: [
								/* @__PURE__ */ _jsxDEV(ProtocolCard, {
									icon: Sun,
									title: "Rano po przebudzeniu",
									description: "Skóra jest w stanie bazowym, bez wpływu aktywności dnia, stresu cieplnego czy kumulacji sebum."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 182,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV(ProtocolCard, {
									icon: Clock,
									title: "30 minut po umyciu",
									description: "Bariera hydrolipidowa zdąży wrócić do stanu naturalnego, a skóra przestanie reagować rumieniem po myciu."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 187,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV(ProtocolCard, {
									icon: Droplets,
									title: "Bez kosmetyków",
									description: "Żadnych kremów, serum, toników, filtrów ani makijażu. Każdy produkt zafałszuje ocenę sebum i bariery."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 192,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 181,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 172,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "mt-16 w-full bg-navy-900/40 border border-silver-500/20 rounded-3xl p-8 md:p-10 text-left flex flex-col md:flex-row gap-6 md:gap-8 items-start shadow-silver-glow-inner backdrop-blur-sm",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "w-14 h-14 shrink-0 rounded-full bg-navy-950 border border-silver-500/30 flex items-center justify-center shadow-silver-glow",
							children: /* @__PURE__ */ _jsxDEV(Sparkles, {
								className: "w-6 h-6 text-silver-400",
								strokeWidth: 1.5
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 203,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 202,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h4", {
							className: "text-xl font-serif font-light text-silver-100 mb-3 tracking-wide",
							children: "Co znaczy Twój kod MSC?"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 206,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("p", {
							className: "text-sm text-graphite-400 font-light leading-relaxed",
							children: [
								"Kod składa się z dwóch części:",
								" ",
								/* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono font-medium text-silver-200",
									children: "MSC-[FENOTYP]-[STOPIEŃ]"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 211,
									columnNumber: 15
								}, this),
								". Fenotyp opisuje typ Twojej skóry (np. SEB — łojotokowa, VAS — naczynkowo-reaktywna, AGE — dojrzała), stopień mówi jak głębokie są zmiany (G0 — równowaga, G1-G3 — od łagodnych do utrwalonych). Idąc do kosmetologa pokazujesz kod — od razu wie z jakim protokołem zabiegowym pracować."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 209,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 205,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 201,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 118,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("footer", {
				className: "border-t border-silver-500/10 bg-navy-950/80 backdrop-blur-md relative z-20",
				children: /* @__PURE__ */ _jsxDEV("div", {
					className: "max-w-5xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] md:text-[11px] text-graphite-500 font-light",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "tracking-wide",
						children: "© MySkinCode — Technical Support · MedTech SaaS"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 225,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-6",
						children: [
							/* @__PURE__ */ _jsxDEV("a", {
								href: "#",
								className: "hover:text-silver-400 transition-colors",
								children: "Zgoda"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 229,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("a", {
								href: "#",
								className: "hover:text-silver-400 transition-colors",
								children: "Polityka prywatności"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 230,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("a", {
								href: "#",
								className: "hover:text-silver-400 transition-colors",
								children: "Dla profesjonalistek"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 231,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 228,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 224,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 223,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 84,
		columnNumber: 5
	}, this);
};
_c4 = LandingView;
const ProtocolCard = ({ icon: Icon, title, description }) => /* @__PURE__ */ _jsxDEV("div", {
	className: "p-8 bg-navy-900/30 rounded-3xl border border-silver-500/10 hover:border-silver-500/30 transition-all duration-500 group hover:shadow-silver-glow backdrop-blur-sm",
	children: [
		/* @__PURE__ */ _jsxDEV("div", {
			className: "w-12 h-12 rounded-2xl bg-navy-950 flex items-center justify-center mb-6 border border-silver-500/20 shadow-inner group-hover:scale-110 transition-transform duration-500",
			children: /* @__PURE__ */ _jsxDEV(Icon, {
				className: "w-6 h-6 text-silver-400",
				strokeWidth: 1.5
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 242,
				columnNumber: 7
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 241,
			columnNumber: 5
		}, this),
		/* @__PURE__ */ _jsxDEV("h4", {
			className: "text-lg font-serif font-light text-white mb-3 tracking-wide",
			children: title
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 244,
			columnNumber: 5
		}, this),
		/* @__PURE__ */ _jsxDEV("p", {
			className: "text-graphite-400 text-sm leading-relaxed font-light",
			children: description
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 245,
			columnNumber: 5
		}, this)
	]
}, void 0, true, {
	fileName: _jsxFileName,
	lineNumber: 240,
	columnNumber: 3
}, this);
_c5 = ProtocolCard;
var _c, _c2, _c3, _c4, _c5;
$RefreshReg$(_c, "DnaHelix");
$RefreshReg$(_c2, "Divider");
$RefreshReg$(_c3, "MscChipTeaser");
$RefreshReg$(_c4, "LandingView");
$RefreshReg$(_c5, "ProtocolCard");
import * as RefreshRuntime from "/myskincode-ai/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/myskincode-ai/src/components/LandingView.tsx";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("/app/applet/src/components/LandingView.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/applet/src/components/LandingView.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "/app/applet/src/components/LandingView.tsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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QUMsT0FBRDtHQUFLLFdBQVU7YUFDYix3QkFBQyxNQUFEO0lBQU0sV0FBVTtJQUEwQixhQUFhO0dBQU07Ozs7O0VBQzFEOzs7OztFQUNMLHdCQUFDLE1BQUQ7R0FBSSxXQUFVO2FBQStEO0VBQVU7Ozs7O0VBQ3ZGLHdCQUFDLEtBQUQ7R0FBRyxXQUFVO2FBQXdEO0VBQWU7Ozs7O0NBQ2pGIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkxhbmRpbmdWaWV3LnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3VuLCBDbG9jaywgRHJvcGxldHMsIEFycm93UmlnaHQsIFNwYXJrbGVzLCBMb2NrLCBTaGllbGRDaGVjayB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5cbmludGVyZmFjZSBMYW5kaW5nVmlld1Byb3BzIHtcbiAgb25TdGFydDogKCkgPT4gdm9pZDtcbiAgb25PcGVuQ2F0YWxvZz86ICgpID0+IHZvaWQ7XG4gIG9uVmlld0hpc3Rvcnk/OiAoKSA9PiB2b2lkO1xufVxuXG5mdW5jdGlvbiBEbmFIZWxpeCh7IGNsYXNzTmFtZSA9IFwidy0yNCBoLTI0IG1kOnctMzIgbWQ6aC0zMlwiIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8c3ZnXG4gICAgICB2aWV3Qm94PVwiMCAwIDIwMCAyMDBcIlxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgIGFyaWEtbGFiZWw9XCJNeVNraW5Db2RlIOKAlCBETkEgaGVsaXhcIlxuICAgID5cbiAgICAgIHsvKiBLcnp5d2UgZ8Ozcm5lIGkgZG9sbmUgKi99XG4gICAgICA8cGF0aFxuICAgICAgICBkPVwiTSAyMCAzMCBDIDYwIDMwLCA2MCAxMDAsIDEwMCAxMDAgQyAxNDAgMTAwLCAxNDAgMzAsIDE4MCAzMFwiXG4gICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgIHN0cm9rZVdpZHRoPVwiNlwiXG4gICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1zaWx2ZXItNTAwLzMwXCJcbiAgICAgIC8+XG4gICAgICA8cGF0aFxuICAgICAgICBkPVwiTSAyMCAxNzAgQyA2MCAxNzAsIDYwIDEwMCwgMTAwIDEwMCBDIDE0MCAxMDAsIDE0MCAxNzAsIDE4MCAxNzBcIlxuICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxuICAgICAgICBzdHJva2VXaWR0aD1cIjZcIlxuICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgICAgIGNsYXNzTmFtZT1cInRleHQtc2lsdmVyLTUwMC8zMFwiXG4gICAgICAvPlxuICAgICAgey8qIFJ1bmdzIOKAlCBla3Nwb3p5Y2phIFwic3RvcG5pXCIgaGVsaXN5ICovfVxuICAgICAge1tcbiAgICAgICAgWzU4LCA1MiwgNTgsIDE0OF0sXG4gICAgICAgIFs3OCwgMzgsIDc4LCAxNjJdLFxuICAgICAgICBbMTAwLCAzMiwgMTAwLCAxNjhdLFxuICAgICAgICBbMTIyLCAzOCwgMTIyLCAxNjJdLFxuICAgICAgICBbMTQyLCA1MiwgMTQyLCAxNDhdLFxuICAgICAgXS5tYXAoKFt4MSwgeTEsIHgyLCB5Ml0sIGkpID0+IChcbiAgICAgICAgPGxpbmVcbiAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgeDE9e3gxfVxuICAgICAgICAgIHkxPXt5MX1cbiAgICAgICAgICB4Mj17eDJ9XG4gICAgICAgICAgeTI9e3kyfVxuICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgICAgc3Ryb2tlV2lkdGg9XCI0XCJcbiAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtc2lsdmVyLTQwMFwiXG4gICAgICAgIC8+XG4gICAgICApKX1cbiAgICA8L3N2Zz5cbiAgKTtcbn1cblxuZnVuY3Rpb24gRGl2aWRlcigpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG15LTEwIG1kOm15LTE0XCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtcHggdy0xNiBiZy1zaWx2ZXItNTAwLzIwXCIgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXgtNCB3LTEuNSBoLTEuNSByb3VuZGVkLWZ1bGwgYmctc2lsdmVyLTQwMC81MCBzaGFkb3ctWzBfMF84cHhfcmdiYSgyMDMsMjEzLDIyNSwwLjUpXVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtcHggdy0xNiBiZy1zaWx2ZXItNTAwLzIwXCIgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gTXNjQ2hpcFRlYXNlcigpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBiZy1uYXZ5LTkwMC82MCBib3JkZXIgYm9yZGVyLXNpbHZlci01MDAvMzAgcm91bmRlZC1mdWxsIHB4LTYgcHktMyBzaGFkb3ctc2lsdmVyLWdsb3ctaW5uZXIgYmFja2Ryb3AtYmx1ci1zbVwiPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gbWQ6dGV4dC1bMTFweF0gdXBwZXJjYXNlIHRyYWNraW5nLVswLjJlbV0gdGV4dC1zaWx2ZXItNTAwLzgwIGZvbnQtc2FucyBmb250LW1lZGl1bVwiPlxuICAgICAgICBUd8OzaiBrb2RcbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC1zaWx2ZXItMTAwIHRleHQtWzE0cHhdIG1kOnRleHQtWzE1cHhdIHRyYWNraW5nLXdpZGVcIj5cbiAgICAgICAgTVNDLVNFQi1HMlxuICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgY29uc3QgTGFuZGluZ1ZpZXc6IFJlYWN0LkZDPExhbmRpbmdWaWV3UHJvcHM+ID0gKHsgb25TdGFydCwgb25PcGVuQ2F0YWxvZywgb25WaWV3SGlzdG9yeSB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gZmxleCBmbGV4LWNvbCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gYmctbmF2eS05NTAgZm9udC1zYW5zIGFudGlhbGlhc2VkXCI+XG4gICAgICB7LyogQmFja2dyb3VuZCBkZWNvcmF0aXZlIGVsZW1lbnRzIC0gU3VidGxlIFNpbHZlciBHbG93cyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLVstMTAlXSBsZWZ0LVstMTAlXSB3LVs1MDBweF0gaC1bNTAwcHhdIGJnLXNpbHZlci02MDAgcm91bmRlZC1mdWxsIG1peC1ibGVuZC1zY3JlZW4gZmlsdGVyIGJsdXItWzIwMHB4XSBvcGFjaXR5LTEwIGFuaW1hdGUtcHVsc2Utc2xvdyBwb2ludGVyLWV2ZW50cy1ub25lXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS1bLTEwJV0gcmlnaHQtWy0xMCVdIHctWzUwMHB4XSBoLVs1MDBweF0gYmctc2lsdmVyLTUwMCByb3VuZGVkLWZ1bGwgbWl4LWJsZW5kLXNjcmVlbiBmaWx0ZXIgYmx1ci1bMjAwcHhdIG9wYWNpdHktMTAgYW5pbWF0ZS1wdWxzZS1zbG93IHBvaW50ZXItZXZlbnRzLW5vbmVcIiBzdHlsZT17eyBhbmltYXRpb25EZWxheTogJzJzJyB9fT48L2Rpdj5cblxuICAgICAgey8qIFRvcCBCYXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlci1iIGJvcmRlci1zaWx2ZXItNTAwLzEwIGJnLW5hdnktOTUwLzgwIGJhY2tkcm9wLWJsdXItbWQgcmVsYXRpdmUgei0yMFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTV4bCBteC1hdXRvIHB4LTYgcHktMyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bOXB4XSBtZDp0ZXh0LVsxMHB4XSB0ZXh0LXNpbHZlci01MDAvNjAgZm9udC1zYW5zIHRyYWNraW5nLVswLjE1ZW1dIHVwcGVyY2FzZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxMb2NrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtc2lsdmVyLTUwMC82MFwiIHN0cm9rZVdpZHRoPXsxLjV9IC8+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cmFja2luZy13aWRlXCI+XG4gICAgICAgICAgICAgIERhbmUgcHJ6ZXR3YXJ6YW5lIHcgVUUgwrcgemdvZG5pZSB6IFJPRE9cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC01XCI+XG4gICAgICAgICAgICB7b25PcGVuQ2F0YWxvZyAmJiAoXG4gICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17b25PcGVuQ2F0YWxvZ30gY2xhc3NOYW1lPVwidGV4dC1zaWx2ZXItMzAwIGhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXJcIj5cbiAgICAgICAgICAgICAgICBLYXRhbG9nIEhpLVRlY2hcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge29uVmlld0hpc3RvcnkgJiYgKFxuICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e29uVmlld0hpc3Rvcnl9IGNsYXNzTmFtZT1cInRleHQtc2lsdmVyLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyXCI+XG4gICAgICAgICAgICAgICAgT3N0YXRuaWUgYW5hbGl6eVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpZGRlbiBtZDpmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNpbHZlci01MDAvNjBcIj5cbiAgICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgc3Ryb2tlV2lkdGg9ezEuNX0gLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJhY2tpbmctd2lkZVwiPkFuYWxpemEga29uc3VsdGFjeWpuYTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogTWFpbiBDb250ZW50ICovfVxuICAgICAgPG1haW4gY2xhc3NOYW1lPVwiZmxleC0xIHctZnVsbCBtYXgtdy00eGwgbXgtYXV0byBweC02IHB0LTEyIG1kOnB0LTIwIHBiLTIwIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIHRleHQtY2VudGVyIHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgXG4gICAgICAgIHsvKiBMb2dvICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgPERuYUhlbGl4IC8+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cIm10LTYgdGV4dC00eGwgbWQ6dGV4dC01eGwgZm9udC1zZXJpZiBmb250LWxpZ2h0IHRleHQtd2hpdGUgdHJhY2tpbmctd2lkZVwiPlxuICAgICAgICAgICAgTXlTa2luQ29kZVxuICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMyB0ZXh0LVsxMHB4XSBtZDp0ZXh0LVsxMXB4XSB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMzVlbV0gdGV4dC1zaWx2ZXItNTAwLzcwIGZvbnQtc2FucyBmb250LW1lZGl1bVwiPlxuICAgICAgICAgICAgVGVjaG5pY2FsIFN1cHBvcnQgPHNwYW4gY2xhc3NOYW1lPVwibXgtMiB0ZXh0LWdyYXBoaXRlLTYwMFwiPnw8L3NwYW4+IE1lZFRlY2ggU2FhU1xuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPERpdmlkZXIgLz5cblxuICAgICAgICB7LyogVGFnbGluZSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBtYXgtdy0yeGwgbXgtYXV0b1wiPlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBtZDp0ZXh0LVsyLjc1cmVtXSBsZWFkaW5nLVsxLjJdIGZvbnQtc2VyaWYgZm9udC1saWdodCB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGVcIj5cbiAgICAgICAgICAgIFR3w7NqIGtvZCBza8OzcnkuPGJyIC8+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNpbHZlci00MDAgaXRhbGljXCI+VHfDs2ogcGxhbiBwaWVsxJlnbmFjamkuPC9zcGFuPlxuICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtOCB0ZXh0LVsxNXB4XSBtZDp0ZXh0LWJhc2UgbGVhZGluZy1yZWxheGVkIHRleHQtZ3JhcGhpdGUtNDAwIGZvbnQtbGlnaHRcIj5cbiAgICAgICAgICAgIFByb2Zlc2pvbmFsbnkgc3lzdGVtIGFuYWxpenkgc2vDs3J5IG9wYXJ0eSBuYSBkemlld2nEmWNpdSBmZW5vdHlwYWNoIGlcbiAgICAgICAgICAgIGN6dGVyZWNoIHN0b3BuaWFjaCB6YWF3YW5zb3dhbmlhLiBQbyB3eWtvbmFuaXUgemRqxJljaWEgb3RyenltYXN6XG4gICAgICAgICAgICBzd8OzaiBrb2QgdyBrbGluaWN6bnltIGrEmXp5a3Ug4oCUIHRha2ksIGpha2llZ28gdcW8eXdhasSFIGRlcm1hdG9sb2R6eSBpXG4gICAgICAgICAgICBrb3NtZXRvbG9kenkgbWnEmWR6eSBzb2LEhS5cbiAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICB7LyogVGVhc2VyIGtvZHUgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xMCBmbGV4IGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICA8TXNjQ2hpcFRlYXNlciAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIENUQSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEyXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uU3RhcnR9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImdyb3VwIHJlbGF0aXZlIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBweC0xMCBweS00IHRleHQtc20gZm9udC1zYW5zIGZvbnQtbWVkaXVtIHRyYWNraW5nLVswLjE1ZW1dIHVwcGVyY2FzZSB0ZXh0LW5hdnktOTUwIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTUwMCBiZy1zaWx2ZXItZ3JhZGllbnQgcm91bmRlZC1mdWxsIGhvdmVyOnNoYWRvdy1zaWx2ZXItZ2xvdy1zdHJvbmcgaG92ZXI6LXRyYW5zbGF0ZS15LTEgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItc2lsdmVyLTMwMC81MFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgdy1mdWxsIGgtZnVsbCBiZy13aGl0ZS8yMCBvcGFjaXR5LTAgZ3JvdXAtaG92ZXI6b3BhY2l0eS0xMDAgdHJhbnNpdGlvbi1vcGFjaXR5IGR1cmF0aW9uLTUwMFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVsYXRpdmUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICBSb3pwb2N6bmlqIGFuYWxpesSZXG4gICAgICAgICAgICAgICAgPEFycm93UmlnaHQgY2xhc3NOYW1lPVwidy01IGgtNSB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi01MDAgZ3JvdXAtaG92ZXI6dHJhbnNsYXRlLXgtMVwiIHN0cm9rZVdpZHRoPXsxLjV9IC8+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtNSB0ZXh0LVsxMXB4XSB0ZXh0LWdyYXBoaXRlLTUwMCBmb250LWxpZ2h0IHRyYWNraW5nLXdpZGVcIj5cbiAgICAgICAgICAgICAgWmFuaW0ga2xpa25pZXN6IOKAlCBwcnplY3p5dGFqIHByb3Rva8OzxYIgemRqxJljaWEgcG9uacW8ZWouXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxEaXZpZGVyIC8+XG5cbiAgICAgICAgey8qIFByb3Rva8OzxYIgemRqxJljaWEgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBtYi0xMFwiPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdXBwZXJjYXNlIHRyYWNraW5nLVswLjNlbV0gdGV4dC1zaWx2ZXItNTAwLzcwIGZvbnQtc2FucyBmb250LW1lZGl1bSBtYi0zXCI+XG4gICAgICAgICAgICAgIFByb3Rva8OzxYIgcG9iaWVyYW5pYSB6ZGrEmWNpYVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtMnhsIG1kOnRleHQtM3hsIGZvbnQtc2VyaWYgZm9udC1saWdodCB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGVcIj5cbiAgICAgICAgICAgICAgVHJ6eSB3YXJ1bmtpIGRsYSB3aWFyeWdvZG5laiBhbmFsaXp5XG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMyBnYXAtNiB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgIDxQcm90b2NvbENhcmRcbiAgICAgICAgICAgICAgaWNvbj17U3VufVxuICAgICAgICAgICAgICB0aXRsZT1cIlJhbm8gcG8gcHJ6ZWJ1ZHplbml1XCJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCJTa8OzcmEgamVzdCB3IHN0YW5pZSBiYXpvd3ltLCBiZXogd3DFgnl3dSBha3R5d25vxZtjaSBkbmlhLCBzdHJlc3UgY2llcGxuZWdvIGN6eSBrdW11bGFjamkgc2VidW0uXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8UHJvdG9jb2xDYXJkXG4gICAgICAgICAgICAgIGljb249e0Nsb2NrfVxuICAgICAgICAgICAgICB0aXRsZT1cIjMwIG1pbnV0IHBvIHVteWNpdVwiXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiQmFyaWVyYSBoeWRyb2xpcGlkb3dhIHpkxIXFvHkgd3LDs2NpxIcgZG8gc3RhbnUgbmF0dXJhbG5lZ28sIGEgc2vDs3JhIHByemVzdGFuaWUgcmVhZ293YcSHIHJ1bWllbmllbSBwbyBteWNpdS5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxQcm90b2NvbENhcmRcbiAgICAgICAgICAgICAgaWNvbj17RHJvcGxldHN9XG4gICAgICAgICAgICAgIHRpdGxlPVwiQmV6IGtvc21ldHlrw7N3XCJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCLFu2FkbnljaCBrcmVtw7N3LCBzZXJ1bSwgdG9uaWvDs3csIGZpbHRyw7N3IGFuaSBtYWtpamHFvHUuIEthxbxkeSBwcm9kdWt0IHphZmHFgnN6dWplIG9jZW7EmSBzZWJ1bSBpIGJhcmllcnkuXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBTZWtjamEgXCJqYWsgZHppYcWCYSBrb2RcIiAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xNiB3LWZ1bGwgYmctbmF2eS05MDAvNDAgYm9yZGVyIGJvcmRlci1zaWx2ZXItNTAwLzIwIHJvdW5kZWQtM3hsIHAtOCBtZDpwLTEwIHRleHQtbGVmdCBmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93IGdhcC02IG1kOmdhcC04IGl0ZW1zLXN0YXJ0IHNoYWRvdy1zaWx2ZXItZ2xvdy1pbm5lciBiYWNrZHJvcC1ibHVyLXNtXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTE0IGgtMTQgc2hyaW5rLTAgcm91bmRlZC1mdWxsIGJnLW5hdnktOTUwIGJvcmRlciBib3JkZXItc2lsdmVyLTUwMC8zMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaGFkb3ctc2lsdmVyLWdsb3dcIj5cbiAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTYgaC02IHRleHQtc2lsdmVyLTQwMFwiIHN0cm9rZVdpZHRoPXsxLjV9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtc2VyaWYgZm9udC1saWdodCB0ZXh0LXNpbHZlci0xMDAgbWItMyB0cmFja2luZy13aWRlXCI+XG4gICAgICAgICAgICAgIENvIHpuYWN6eSBUd8OzaiBrb2QgTVNDP1xuICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmFwaGl0ZS00MDAgZm9udC1saWdodCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgS29kIHNrxYJhZGEgc2nEmSB6IGR3w7NjaCBjesSZxZtjaTp7XCIgXCJ9XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyBmb250LW1lZGl1bSB0ZXh0LXNpbHZlci0yMDBcIj5NU0MtW0ZFTk9UWVBdLVtTVE9QSUXFg108L3NwYW4+LlxuICAgICAgICAgICAgICBGZW5vdHlwIG9waXN1amUgdHlwIFR3b2plaiBza8OzcnkgKG5wLiBTRUIg4oCUIMWCb2pvdG9rb3dhLCBWQVMg4oCUXG4gICAgICAgICAgICAgIG5hY3p5bmtvd28tcmVha3R5d25hLCBBR0Ug4oCUIGRvanJ6YcWCYSksIHN0b3BpZcWEIG3Ds3dpIGphayBnxYLEmWJva2llXG4gICAgICAgICAgICAgIHPEhSB6bWlhbnkgKEcwIOKAlCByw7N3bm93YWdhLCBHMS1HMyDigJQgb2QgxYJhZ29kbnljaCBkbyB1dHJ3YWxvbnljaCkuXG4gICAgICAgICAgICAgIElkxIVjIGRvIGtvc21ldG9sb2dhIHBva2F6dWplc3oga29kIOKAlCBvZCByYXp1IHdpZSB6IGpha2ltXG4gICAgICAgICAgICAgIHByb3Rva2/FgmVtIHphYmllZ293eW0gcHJhY293YcSHLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbWFpbj5cblxuICAgICAgey8qIEZvb3RlciAqL31cbiAgICAgIDxmb290ZXIgY2xhc3NOYW1lPVwiYm9yZGVyLXQgYm9yZGVyLXNpbHZlci01MDAvMTAgYmctbmF2eS05NTAvODAgYmFja2Ryb3AtYmx1ci1tZCByZWxhdGl2ZSB6LTIwXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctNXhsIG14LWF1dG8gcHgtNiBweS02IGZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCB0ZXh0LVsxMHB4XSBtZDp0ZXh0LVsxMXB4XSB0ZXh0LWdyYXBoaXRlLTUwMCBmb250LWxpZ2h0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cmFja2luZy13aWRlXCI+XG4gICAgICAgICAgICDCqSBNeVNraW5Db2RlIOKAlCBUZWNobmljYWwgU3VwcG9ydCDCtyBNZWRUZWNoIFNhYVNcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC02XCI+XG4gICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cImhvdmVyOnRleHQtc2lsdmVyLTQwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlpnb2RhPC9hPlxuICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJob3Zlcjp0ZXh0LXNpbHZlci00MDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5Qb2xpdHlrYSBwcnl3YXRub8WbY2k8L2E+XG4gICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cImhvdmVyOnRleHQtc2lsdmVyLTQwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPkRsYSBwcm9mZXNqb25hbGlzdGVrPC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZm9vdGVyPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuY29uc3QgUHJvdG9jb2xDYXJkOiBSZWFjdC5GQzx7IGljb246IFJlYWN0LkVsZW1lbnRUeXBlOyB0aXRsZTogc3RyaW5nOyBkZXNjcmlwdGlvbjogc3RyaW5nIH0+ID0gKHsgaWNvbjogSWNvbiwgdGl0bGUsIGRlc2NyaXB0aW9uIH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJwLTggYmctbmF2eS05MDAvMzAgcm91bmRlZC0zeGwgYm9yZGVyIGJvcmRlci1zaWx2ZXItNTAwLzEwIGhvdmVyOmJvcmRlci1zaWx2ZXItNTAwLzMwIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTUwMCBncm91cCBob3ZlcjpzaGFkb3ctc2lsdmVyLWdsb3cgYmFja2Ryb3AtYmx1ci1zbVwiPlxuICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMiBoLTEyIHJvdW5kZWQtMnhsIGJnLW5hdnktOTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG1iLTYgYm9yZGVyIGJvcmRlci1zaWx2ZXItNTAwLzIwIHNoYWRvdy1pbm5lciBncm91cC1ob3ZlcjpzY2FsZS0xMTAgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tNTAwXCI+XG4gICAgICA8SWNvbiBjbGFzc05hbWU9XCJ3LTYgaC02IHRleHQtc2lsdmVyLTQwMFwiIHN0cm9rZVdpZHRoPXsxLjV9IC8+XG4gICAgPC9kaXY+XG4gICAgPGg0IGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1zZXJpZiBmb250LWxpZ2h0IHRleHQtd2hpdGUgbWItMyB0cmFja2luZy13aWRlXCI+e3RpdGxlfTwvaDQ+XG4gICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmFwaGl0ZS00MDAgdGV4dC1zbSBsZWFkaW5nLXJlbGF4ZWQgZm9udC1saWdodFwiPntkZXNjcmlwdGlvbn08L3A+XG4gIDwvZGl2PlxuKTtcbiJdfQ==