import { createHotContext as __vite__createHotContext } from "/myskincode-ai/@vite/client";import.meta.hot = __vite__createHotContext("/myskincode-ai/src/pages/AdminHiTechCatalog.tsx");const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"]; const useMemo = __vite__cjsImport0_react["useMemo"];const _jsxDEV = __vite__cjsImport4_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/myskincode-ai/node_modules/.vite/deps/react.js?v=5f77a7b6";
import { ArrowLeft, Cpu, Search, Sparkles, CheckCircle2, Info } from "/myskincode-ai/node_modules/.vite/deps/lucide-react.js?v=c90b8d26";
import { defaultAdminCatalogFilters, defaultAdminCatalogSort, filterAndSortAdminCatalogDevices, extractTechnologyFamilies } from "/myskincode-ai/src/lib/adminHiTechCatalogFilters.ts";
import { buildHiTechCatalogComparison } from "/myskincode-ai/src/lib/hiTechCatalogComparison.ts";
var _jsxFileName = "/app/applet/src/pages/AdminHiTechCatalog.tsx";
import __vite__cjsImport4_react_jsxDevRuntime from "/myskincode-ai/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=5f77a7b6";
var _s = $RefreshSig$();
const SEED_DEVICES = [
	{
		id: 1,
		slug: "picosecond-laser",
		displayName: "Pikosekundowy Laser Nd:YAG / Alexandryt",
		technologyFamily: "Laser pikosekundowy",
		positioning: "Przebudowa fototermolityczna bez przegrzania tkanek",
		mechanismSummary: "Ultra-krótkie impulsy fotoakustyczne indukują mikrouszkodzenia optyczne w skórze (LIOB), wyzwalając kaskadę neokolagenezy.",
		recommendationCopy: "Zalecany w fenotypach CIC (blizny), AGE (utrata elastyczności) oraz dyschromiach przy zachowaniu bezpieczeństwa bariery.",
		suitableSkinTypes: [
			"scarred",
			"mature_sagging",
			"normal",
			"combination"
		],
		downtimeProfile: "minimal",
		rankingWeight: 4
	},
	{
		id: 2,
		slug: "rf-microneedling",
		displayName: "Radiofrekwencja Mikroigłowa Frakcyjna",
		technologyFamily: "Fale radiowe + mikronakłuwanie",
		positioning: "Frakcyjne przegrzanie skóry właściwej z mechanicznym bodźcem igłowym",
		mechanismSummary: "Izolowane lub nieizolowane mikroigły dostarczają energię RF bezpośrednio na zadaną głębokość (0.5–3.5mm), obkurczając włókna elastynowe.",
		recommendationCopy: "Kluczowa technologia dla wiotkości, rozszerzonych porów oraz poprawy strukturalnej gęstości skóry.",
		suitableSkinTypes: [
			"mature_sagging",
			"seborrhoeic",
			"scarred",
			"dry"
		],
		downtimeProfile: "short",
		rankingWeight: 4
	},
	{
		id: 3,
		slug: "cold-atmospheric-plasma",
		displayName: "Zimna Plazma Atmosferyczna (CAP)",
		technologyFamily: "Plazma medyczna",
		positioning: "Biostymulacja antybakteryjna i przeciwzapalna bez uszkodzenia naskórka",
		mechanismSummary: "Generuje reaktywne formy tlenu i azotu (RONS), niszcząc biofilm Cutibacterium acnes i stymulując mikrokrążenie kapilarne.",
		recommendationCopy: "Idealna terapia pierwszego rzutu przy zaostrzeniach łojotokowych (SEB) oraz cerze nadreaktywnej naczyniowej (VAS).",
		suitableSkinTypes: [
			"seborrhoeic",
			"vascular_reactive",
			"oily"
		],
		downtimeProfile: "minimal",
		rankingWeight: 5
	},
	{
		id: 4,
		slug: "vascular-laser-ktp",
		displayName: "Laser Naczyniowy KTP 532nm / 1064nm",
		technologyFamily: "Laser naczyniowy",
		positioning: "Selektywna fototermoliza oksyhemoglobiny",
		mechanismSummary: "Światło o długości fali 532/1064nm jest preferencyjnie absorbowane przez naczynia krwionośne, powodując ich kontrolowaną koagulację i obkurczenie.",
		recommendationCopy: "Wybór referencyjny przy teleangiektazjach, napadowym rumieniu i trądziku różowatym fenotypu VAS.",
		suitableSkinTypes: [
			"vascular_reactive",
			"combination",
			"dry"
		],
		downtimeProfile: "short",
		rankingWeight: 4
	},
	{
		id: 5,
		slug: "fractional-co2",
		displayName: "Ablacyjny Laser Frakcyjny CO2 10600nm",
		technologyFamily: "Laser ablacyjny",
		positioning: "Głęboka dermabrazja frakcyjna i wymiana kolagenu",
		mechanismSummary: "Kolumny mikroablacji naskórkowo-skórnej zmuszają skórę do całkowitej reepitelializacji i gwałtownej syntezy nowego kolagenu typu I i III.",
		recommendationCopy: "Dedykowany dla zaawansowanych blizn zanikowych i głębokich fotouszkodzeń przy akceptacji kilkudniowego downtime.",
		suitableSkinTypes: ["scarred", "mature_sagging"],
		downtimeProfile: "moderate",
		rankingWeight: 3
	},
	{
		id: 6,
		slug: "led-photobiomodulation",
		displayName: "Fotobiomodulacja LED / LLLT",
		technologyFamily: "Fototerapia medyczna",
		positioning: "Atermiczna stymulacja cytochromu c w mitochondriach",
		mechanismSummary: "Długości fal 630nm i 830nm przyspieszają syntezę ATP i migrację fibroblastów, redukując stan zapalny i przyspieszając gojenie.",
		recommendationCopy: "Zalecana jako uzupełnienie każdego protokołu inwazyjnego oraz samodzielna terapia wyciszająca.",
		suitableSkinTypes: [
			"vascular_reactive",
			"dry",
			"normal",
			"remodeled"
		],
		downtimeProfile: "minimal",
		rankingWeight: 5
	}
];
export const AdminHiTechCatalog = ({ onBack }) => {
	_s();
	const [filters, setFilters] = useState(defaultAdminCatalogFilters);
	const [sort] = useState(defaultAdminCatalogSort);
	const [selectedDevice, setSelectedDevice] = useState(null);
	const technologyFamilies = useMemo(() => extractTechnologyFamilies(SEED_DEVICES), []);
	const filteredDevices = useMemo(() => {
		return filterAndSortAdminCatalogDevices(SEED_DEVICES, filters, sort);
	}, [filters, sort]);
	const comparison = useMemo(() => {
		if (!selectedDevice) return null;
		return buildHiTechCatalogComparison(selectedDevice, SEED_DEVICES);
	}, [selectedDevice]);
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "min-h-screen bg-navy-950 bg-dots py-16 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden",
		children: [
			/* @__PURE__ */ _jsxDEV("div", { className: "absolute top-0 left-0 w-full h-[2px] bg-silver-gradient opacity-60" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 112,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", { className: "absolute top-10 right-10 w-96 h-96 bg-silver-600/10 rounded-full blur-[140px] pointer-events-none" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 113,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "max-w-6xl mx-auto relative z-10 space-y-12",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-silver-500/20",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-5",
							children: [/* @__PURE__ */ _jsxDEV("button", {
								onClick: onBack,
								className: "p-3.5 rounded-2xl bg-navy-900 border border-silver-500/20 hover:border-silver-400 text-silver-300 hover:text-white transition-all shadow-silver-glow",
								title: "Wróć",
								children: /* @__PURE__ */ _jsxDEV(ArrowLeft, { className: "w-5 h-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 124,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 119,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("span", {
								className: "text-[10px] font-mono tracking-widest text-silver-400 uppercase",
								children: "MySkinCode Hi-Tech Suite"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 127,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("h1", {
								className: "text-3xl md:text-4xl font-serif font-light text-white tracking-wide",
								children: "Katalog Aparatury Hi-Tech"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 128,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 126,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 118,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-3 text-xs text-silver-400 bg-navy-900/60 px-5 py-3 rounded-2xl border border-silver-500/20",
							children: [/* @__PURE__ */ _jsxDEV(Cpu, { className: "w-4 h-4 text-silver-300" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 134,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Kliniczne protokoły laserowe i energioterapeutyczne" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 135,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 133,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 117,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "bg-navy-900/50 p-6 rounded-3xl border border-silver-500/20 space-y-4",
						children: /* @__PURE__ */ _jsxDEV("div", {
							className: "flex flex-col md:flex-row gap-4",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "relative flex-1",
								children: [/* @__PURE__ */ _jsxDEV(Search, { className: "w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-silver-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 143,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "text",
									placeholder: "Szukaj aparatury, fali, technologii...",
									value: filters.searchQuery,
									onChange: (e) => setFilters({
										...filters,
										searchQuery: e.target.value
									}),
									className: "w-full bg-navy-950 pl-11 pr-4 py-3 rounded-2xl border border-silver-500/30 text-silver-100 placeholder-silver-500 text-sm focus:outline-none focus:border-silver-300 transition-colors"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 144,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 142,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ _jsxDEV("select", {
									value: filters.technologyFamily,
									onChange: (e) => setFilters({
										...filters,
										technologyFamily: e.target.value
									}),
									className: "bg-navy-950 px-4 py-3 rounded-2xl border border-silver-500/30 text-silver-200 text-sm focus:outline-none focus:border-silver-300",
									children: [/* @__PURE__ */ _jsxDEV("option", {
										value: "all",
										children: "Wszystkie technologie"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 158,
										columnNumber: 17
									}, this), technologyFamilies.map((fam) => /* @__PURE__ */ _jsxDEV("option", {
										value: fam,
										children: fam
									}, fam, false, {
										fileName: _jsxFileName,
										lineNumber: 160,
										columnNumber: 19
									}, this))]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 153,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("select", {
									value: filters.downtime,
									onChange: (e) => setFilters({
										...filters,
										downtime: e.target.value
									}),
									className: "bg-navy-950 px-4 py-3 rounded-2xl border border-silver-500/30 text-silver-200 text-sm focus:outline-none focus:border-silver-300",
									children: [
										/* @__PURE__ */ _jsxDEV("option", {
											value: "all",
											children: "Każdy profil downtime"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 169,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: "minimal",
											children: "Downtime minimalny (0-24h)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 170,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: "short",
											children: "Downtime krótki (1-3 dni)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 171,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: "moderate",
											children: "Downtime umiarkowany (4-7 dni)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 172,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 164,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 152,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 141,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 140,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
						children: filteredDevices.map((device) => {
							const isSelected = selectedDevice?.id === device.id;
							return /* @__PURE__ */ _jsxDEV("div", {
								onClick: () => setSelectedDevice(device),
								className: `p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${isSelected ? "bg-navy-900 border-silver-400 shadow-silver-glow-strong" : "bg-navy-900/40 border-silver-500/20 hover:border-silver-400/50 hover:bg-navy-900/70"}`,
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [
									/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center justify-between gap-2 mb-3",
										children: [/* @__PURE__ */ _jsxDEV("span", {
											className: "text-[10px] font-mono tracking-wider px-3 py-1 rounded-full bg-navy-950 border border-silver-500/30 text-silver-300",
											children: device.technologyFamily
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 194,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("span", {
											className: `text-[10px] font-medium uppercase px-2.5 py-0.5 rounded-full ${device.downtimeProfile === "minimal" ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/40" : device.downtimeProfile === "short" ? "bg-amber-950/80 text-amber-300 border border-amber-800/40" : "bg-rose-950/80 text-rose-300 border border-rose-800/40"}`,
											children: device.downtimeProfile === "minimal" ? "0-24h rekonwalescencja" : device.downtimeProfile === "short" ? "1-3 dni" : "4-7 dni"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 197,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 193,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("h3", {
										className: "text-xl font-serif text-white mb-2 leading-snug",
										children: device.displayName
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 208,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("p", {
										className: "text-xs text-silver-400 font-light line-clamp-3 mb-4 leading-relaxed",
										children: device.mechanismSummary
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 211,
										columnNumber: 19
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 192,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "pt-4 border-t border-silver-500/10 flex items-center justify-between",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center gap-1.5 text-xs text-silver-400",
										children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-3.5 h-3.5 text-silver-300" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 218,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("span", { children: [
											"Waga rekomendacji: ",
											device.rankingWeight,
											"/5"
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 219,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 217,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("button", {
										className: "text-xs font-mono text-silver-300 hover:text-white underline underline-offset-4",
										children: "Szczegóły"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 221,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 216,
									columnNumber: 17
								}, this)]
							}, device.id, true, {
								fileName: _jsxFileName,
								lineNumber: 183,
								columnNumber: 15
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 179,
						columnNumber: 9
					}, this),
					selectedDevice && comparison && /* @__PURE__ */ _jsxDEV("div", {
						className: "bg-navy-900/70 p-8 rounded-3xl border border-silver-400/50 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [
									/* @__PURE__ */ _jsxDEV("span", {
										className: "text-xs font-mono text-silver-400 uppercase tracking-widest",
										children: "Karta Parametryczna Aparatu"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 235,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("h2", {
										className: "text-2xl md:text-3xl font-serif text-white mt-1",
										children: selectedDevice.displayName
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 236,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("p", {
										className: "text-sm text-silver-300 italic mt-1",
										children: selectedDevice.positioning
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 237,
										columnNumber: 17
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 234,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("button", {
									onClick: () => setSelectedDevice(null),
									className: "text-xs font-mono px-4 py-2 rounded-xl bg-navy-950 border border-silver-500/30 text-silver-300 hover:text-white",
									children: "Zamknij podgląd"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 239,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 233,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-silver-500/20 text-sm",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "bg-navy-950/80 p-5 rounded-2xl border border-silver-500/20 space-y-2",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "text-xs font-medium text-silver-400 uppercase flex items-center gap-2",
										children: [/* @__PURE__ */ _jsxDEV(Info, { className: "w-4 h-4 text-silver-300" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 250,
											columnNumber: 19
										}, this), "Mechanizm Biofizyczny"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 249,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("p", {
										className: "text-silver-300 font-light leading-relaxed",
										children: selectedDevice.mechanismSummary
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 253,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 248,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "bg-navy-950/80 p-5 rounded-2xl border border-silver-500/20 space-y-2",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "text-xs font-medium text-silver-400 uppercase flex items-center gap-2",
										children: [/* @__PURE__ */ _jsxDEV(CheckCircle2, { className: "w-4 h-4 text-silver-300" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 258,
											columnNumber: 19
										}, this), "Rekomendacja MySkinCode"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 257,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("p", {
										className: "text-silver-300 font-light leading-relaxed",
										children: selectedDevice.recommendationCopy
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 261,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 256,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 247,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "pt-4 border-t border-silver-500/20",
								children: [/* @__PURE__ */ _jsxDEV("h4", {
									className: "text-xs font-mono uppercase tracking-widest text-silver-400 mb-3",
									children: "Dopasowanie w Raportach Klinicznych"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 267,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "p-4 rounded-2xl bg-navy-950/60 border border-silver-500/30 flex items-center gap-4",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "p-3 rounded-xl bg-navy-900 border border-silver-500/30",
										children: /* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-5 h-5 text-silver-300" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 272,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 271,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "text-sm font-medium text-white",
										children: comparison.reportFit.title
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 275,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "text-xs text-silver-400 font-light",
										children: comparison.reportFit.description
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 276,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 274,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 270,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 266,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 232,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 115,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 110,
		columnNumber: 5
	}, this);
};
_s(AdminHiTechCatalog, "Mp27R94oarqfucH4+MikSFPrm44=");
_c = AdminHiTechCatalog;
var _c;
$RefreshReg$(_c, "AdminHiTechCatalog");
import * as RefreshRuntime from "/myskincode-ai/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/myskincode-ai/src/pages/AdminHiTechCatalog.tsx";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("/app/applet/src/pages/AdminHiTechCatalog.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/applet/src/pages/AdminHiTechCatalog.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "/app/applet/src/pages/AdminHiTechCatalog.tsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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O21CQUNMLHdCQUFDLE9BQUQsYUFDRSx3QkFBQyxPQUFEO1VBQUssV0FBVTtvQkFBa0MsV0FBVyxVQUFVO1NBQVc7Ozs7bUJBQ2pGLHdCQUFDLE9BQUQ7VUFBSyxXQUFVO29CQUFzQyxXQUFXLFVBQVU7U0FBaUI7Ozs7aUJBQ3hGOzs7O2lCQUNGOzs7OztnQkFDRjs7Ozs7O01BQ0Y7Ozs7OztJQUVKOzs7Ozs7RUFDRjs7Ozs7O0FBRVQiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiQWRtaW5IaVRlY2hDYXRhbG9nLnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZU1lbW8gfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBcnJvd0xlZnQsIENwdSwgU2VhcmNoLCBTcGFya2xlcywgU2hpZWxkQWxlcnQsIENoZWNrQ2lyY2xlMiwgU2xpZGVyc0hvcml6b250YWwsIEluZm8gfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHtcbiAgQWRtaW5DYXRhbG9nRGV2aWNlTGlzdEl0ZW0sXG4gIEFkbWluQ2F0YWxvZ0ZpbHRlcnMsXG4gIEFkbWluQ2F0YWxvZ1NvcnRPcHRpb24sXG4gIGRlZmF1bHRBZG1pbkNhdGFsb2dGaWx0ZXJzLFxuICBkZWZhdWx0QWRtaW5DYXRhbG9nU29ydCxcbiAgZmlsdGVyQW5kU29ydEFkbWluQ2F0YWxvZ0RldmljZXMsXG4gIGV4dHJhY3RUZWNobm9sb2d5RmFtaWxpZXMsXG59IGZyb20gJy4uL2xpYi9hZG1pbkhpVGVjaENhdGFsb2dGaWx0ZXJzJztcbmltcG9ydCB7IGJ1aWxkSGlUZWNoQ2F0YWxvZ0NvbXBhcmlzb24gfSBmcm9tICcuLi9saWIvaGlUZWNoQ2F0YWxvZ0NvbXBhcmlzb24nO1xuXG5jb25zdCBTRUVEX0RFVklDRVM6IEFkbWluQ2F0YWxvZ0RldmljZUxpc3RJdGVtW10gPSBbXG4gIHtcbiAgICBpZDogMSxcbiAgICBzbHVnOiAncGljb3NlY29uZC1sYXNlcicsXG4gICAgZGlzcGxheU5hbWU6ICdQaWtvc2VrdW5kb3d5IExhc2VyIE5kOllBRyAvIEFsZXhhbmRyeXQnLFxuICAgIHRlY2hub2xvZ3lGYW1pbHk6ICdMYXNlciBwaWtvc2VrdW5kb3d5JyxcbiAgICBwb3NpdGlvbmluZzogJ1ByemVidWRvd2EgZm90b3Rlcm1vbGl0eWN6bmEgYmV6IHByemVncnphbmlhIHRrYW5laycsXG4gICAgbWVjaGFuaXNtU3VtbWFyeTogJ1VsdHJhLWtyw7N0a2llIGltcHVsc3kgZm90b2FrdXN0eWN6bmUgaW5kdWt1asSFIG1pa3JvdXN6a29kemVuaWEgb3B0eWN6bmUgdyBza8OzcnplIChMSU9CKSwgd3l6d2FsYWrEhWMga2Fza2FkxJkgbmVva29sYWdlbmV6eS4nLFxuICAgIHJlY29tbWVuZGF0aW9uQ29weTogJ1phbGVjYW55IHcgZmVub3R5cGFjaCBDSUMgKGJsaXpueSksIEFHRSAodXRyYXRhIGVsYXN0eWN6bm/Fm2NpKSBvcmF6IGR5c2Nocm9taWFjaCBwcnp5IHphY2hvd2FuaXUgYmV6cGllY3plxYRzdHdhIGJhcmllcnkuJyxcbiAgICBzdWl0YWJsZVNraW5UeXBlczogWydzY2FycmVkJywgJ21hdHVyZV9zYWdnaW5nJywgJ25vcm1hbCcsICdjb21iaW5hdGlvbiddLFxuICAgIGRvd250aW1lUHJvZmlsZTogJ21pbmltYWwnLFxuICAgIHJhbmtpbmdXZWlnaHQ6IDQsXG4gIH0sXG4gIHtcbiAgICBpZDogMixcbiAgICBzbHVnOiAncmYtbWljcm9uZWVkbGluZycsXG4gICAgZGlzcGxheU5hbWU6ICdSYWRpb2ZyZWt3ZW5jamEgTWlrcm9pZ8WCb3dhIEZyYWtjeWpuYScsXG4gICAgdGVjaG5vbG9neUZhbWlseTogJ0ZhbGUgcmFkaW93ZSArIG1pa3JvbmFrxYJ1d2FuaWUnLFxuICAgIHBvc2l0aW9uaW5nOiAnRnJha2N5am5lIHByemVncnphbmllIHNrw7NyeSB3xYJhxZtjaXdlaiB6IG1lY2hhbmljem55bSBib2TFumNlbSBpZ8WCb3d5bScsXG4gICAgbWVjaGFuaXNtU3VtbWFyeTogJ0l6b2xvd2FuZSBsdWIgbmllaXpvbG93YW5lIG1pa3JvaWfFgnkgZG9zdGFyY3phasSFIGVuZXJnacSZIFJGIGJlenBvxZtyZWRuaW8gbmEgemFkYW7EhSBnxYLEmWJva2/Fm8SHICgwLjXigJMzLjVtbSksIG9ia3VyY3phasSFYyB3xYLDs2tuYSBlbGFzdHlub3dlLicsXG4gICAgcmVjb21tZW5kYXRpb25Db3B5OiAnS2x1Y3pvd2EgdGVjaG5vbG9naWEgZGxhIHdpb3Rrb8WbY2ksIHJvenN6ZXJ6b255Y2ggcG9yw7N3IG9yYXogcG9wcmF3eSBzdHJ1a3R1cmFsbmVqIGfEmXN0b8WbY2kgc2vDs3J5LicsXG4gICAgc3VpdGFibGVTa2luVHlwZXM6IFsnbWF0dXJlX3NhZ2dpbmcnLCAnc2Vib3JyaG9laWMnLCAnc2NhcnJlZCcsICdkcnknXSxcbiAgICBkb3dudGltZVByb2ZpbGU6ICdzaG9ydCcsXG4gICAgcmFua2luZ1dlaWdodDogNCxcbiAgfSxcbiAge1xuICAgIGlkOiAzLFxuICAgIHNsdWc6ICdjb2xkLWF0bW9zcGhlcmljLXBsYXNtYScsXG4gICAgZGlzcGxheU5hbWU6ICdaaW1uYSBQbGF6bWEgQXRtb3NmZXJ5Y3puYSAoQ0FQKScsXG4gICAgdGVjaG5vbG9neUZhbWlseTogJ1BsYXptYSBtZWR5Y3puYScsXG4gICAgcG9zaXRpb25pbmc6ICdCaW9zdHltdWxhY2phIGFudHliYWt0ZXJ5am5hIGkgcHJ6ZWNpd3phcGFsbmEgYmV6IHVzemtvZHplbmlhIG5hc2vDs3JrYScsXG4gICAgbWVjaGFuaXNtU3VtbWFyeTogJ0dlbmVydWplIHJlYWt0eXduZSBmb3JteSB0bGVudSBpIGF6b3R1IChST05TKSwgbmlzemN6xIVjIGJpb2ZpbG0gQ3V0aWJhY3Rlcml1bSBhY25lcyBpIHN0eW11bHVqxIVjIG1pa3Jva3LEhcW8ZW5pZSBrYXBpbGFybmUuJyxcbiAgICByZWNvbW1lbmRhdGlvbkNvcHk6ICdJZGVhbG5hIHRlcmFwaWEgcGllcndzemVnbyByenV0dSBwcnp5IHphb3N0cnplbmlhY2ggxYJvam90b2tvd3ljaCAoU0VCKSBvcmF6IGNlcnplIG5hZHJlYWt0eXduZWogbmFjenluaW93ZWogKFZBUykuJyxcbiAgICBzdWl0YWJsZVNraW5UeXBlczogWydzZWJvcnJob2VpYycsICd2YXNjdWxhcl9yZWFjdGl2ZScsICdvaWx5J10sXG4gICAgZG93bnRpbWVQcm9maWxlOiAnbWluaW1hbCcsXG4gICAgcmFua2luZ1dlaWdodDogNSxcbiAgfSxcbiAge1xuICAgIGlkOiA0LFxuICAgIHNsdWc6ICd2YXNjdWxhci1sYXNlci1rdHAnLFxuICAgIGRpc3BsYXlOYW1lOiAnTGFzZXIgTmFjenluaW93eSBLVFAgNTMybm0gLyAxMDY0bm0nLFxuICAgIHRlY2hub2xvZ3lGYW1pbHk6ICdMYXNlciBuYWN6eW5pb3d5JyxcbiAgICBwb3NpdGlvbmluZzogJ1NlbGVrdHl3bmEgZm90b3Rlcm1vbGl6YSBva3N5aGVtb2dsb2JpbnknLFxuICAgIG1lY2hhbmlzbVN1bW1hcnk6ICfFmndpYXTFgm8gbyBkxYJ1Z2/Fm2NpIGZhbGkgNTMyLzEwNjRubSBqZXN0IHByZWZlcmVuY3lqbmllIGFic29yYm93YW5lIHByemV6IG5hY3p5bmlhIGtyd2lvbm/Fm25lLCBwb3dvZHVqxIVjIGljaCBrb250cm9sb3dhbsSFIGtvYWd1bGFjasSZIGkgb2JrdXJjemVuaWUuJyxcbiAgICByZWNvbW1lbmRhdGlvbkNvcHk6ICdXeWLDs3IgcmVmZXJlbmN5am55IHByenkgdGVsZWFuZ2lla3RhemphY2gsIG5hcGFkb3d5bSBydW1pZW5pdSBpIHRyxIVkemlrdSByw7PFvG93YXR5bSBmZW5vdHlwdSBWQVMuJyxcbiAgICBzdWl0YWJsZVNraW5UeXBlczogWyd2YXNjdWxhcl9yZWFjdGl2ZScsICdjb21iaW5hdGlvbicsICdkcnknXSxcbiAgICBkb3dudGltZVByb2ZpbGU6ICdzaG9ydCcsXG4gICAgcmFua2luZ1dlaWdodDogNCxcbiAgfSxcbiAge1xuICAgIGlkOiA1LFxuICAgIHNsdWc6ICdmcmFjdGlvbmFsLWNvMicsXG4gICAgZGlzcGxheU5hbWU6ICdBYmxhY3lqbnkgTGFzZXIgRnJha2N5am55IENPMiAxMDYwMG5tJyxcbiAgICB0ZWNobm9sb2d5RmFtaWx5OiAnTGFzZXIgYWJsYWN5am55JyxcbiAgICBwb3NpdGlvbmluZzogJ0fFgsSZYm9rYSBkZXJtYWJyYXpqYSBmcmFrY3lqbmEgaSB3eW1pYW5hIGtvbGFnZW51JyxcbiAgICBtZWNoYW5pc21TdW1tYXJ5OiAnS29sdW1ueSBtaWtyb2FibGFjamkgbmFza8Ozcmtvd28tc2vDs3JuZWogem11c3phasSFIHNrw7NyxJkgZG8gY2HFgmtvd2l0ZWogcmVlcGl0ZWxpYWxpemFjamkgaSBnd2HFgnRvd25laiBzeW50ZXp5IG5vd2VnbyBrb2xhZ2VudSB0eXB1IEkgaSBJSUkuJyxcbiAgICByZWNvbW1lbmRhdGlvbkNvcHk6ICdEZWR5a293YW55IGRsYSB6YWF3YW5zb3dhbnljaCBibGl6biB6YW5pa293eWNoIGkgZ8WCxJlib2tpY2ggZm90b3VzemtvZHplxYQgcHJ6eSBha2NlcHRhY2ppIGtpbGt1ZG5pb3dlZ28gZG93bnRpbWUuJyxcbiAgICBzdWl0YWJsZVNraW5UeXBlczogWydzY2FycmVkJywgJ21hdHVyZV9zYWdnaW5nJ10sXG4gICAgZG93bnRpbWVQcm9maWxlOiAnbW9kZXJhdGUnLFxuICAgIHJhbmtpbmdXZWlnaHQ6IDMsXG4gIH0sXG4gIHtcbiAgICBpZDogNixcbiAgICBzbHVnOiAnbGVkLXBob3RvYmlvbW9kdWxhdGlvbicsXG4gICAgZGlzcGxheU5hbWU6ICdGb3RvYmlvbW9kdWxhY2phIExFRCAvIExMTFQnLFxuICAgIHRlY2hub2xvZ3lGYW1pbHk6ICdGb3RvdGVyYXBpYSBtZWR5Y3puYScsXG4gICAgcG9zaXRpb25pbmc6ICdBdGVybWljem5hIHN0eW11bGFjamEgY3l0b2Nocm9tdSBjIHcgbWl0b2Nob25kcmlhY2gnLFxuICAgIG1lY2hhbmlzbVN1bW1hcnk6ICdExYJ1Z2/Fm2NpIGZhbCA2MzBubSBpIDgzMG5tIHByenlzcGllc3phasSFIHN5bnRlesSZIEFUUCBpIG1pZ3JhY2rEmSBmaWJyb2JsYXN0w7N3LCByZWR1a3VqxIVjIHN0YW4gemFwYWxueSBpIHByenlzcGllc3phasSFYyBnb2plbmllLicsXG4gICAgcmVjb21tZW5kYXRpb25Db3B5OiAnWmFsZWNhbmEgamFrbyB1enVwZcWCbmllbmllIGthxbxkZWdvIHByb3Rva2/FgnUgaW53YXp5am5lZ28gb3JheiBzYW1vZHppZWxuYSB0ZXJhcGlhIHd5Y2lzemFqxIVjYS4nLFxuICAgIHN1aXRhYmxlU2tpblR5cGVzOiBbJ3Zhc2N1bGFyX3JlYWN0aXZlJywgJ2RyeScsICdub3JtYWwnLCAncmVtb2RlbGVkJ10sXG4gICAgZG93bnRpbWVQcm9maWxlOiAnbWluaW1hbCcsXG4gICAgcmFua2luZ1dlaWdodDogNSxcbiAgfSxcbl07XG5cbmludGVyZmFjZSBBZG1pbkhpVGVjaENhdGFsb2dQcm9wcyB7XG4gIG9uQmFjazogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IEFkbWluSGlUZWNoQ2F0YWxvZzogUmVhY3QuRkM8QWRtaW5IaVRlY2hDYXRhbG9nUHJvcHM+ID0gKHsgb25CYWNrIH0pID0+IHtcbiAgY29uc3QgW2ZpbHRlcnMsIHNldEZpbHRlcnNdID0gdXNlU3RhdGU8QWRtaW5DYXRhbG9nRmlsdGVycz4oZGVmYXVsdEFkbWluQ2F0YWxvZ0ZpbHRlcnMpO1xuICBjb25zdCBbc29ydF0gPSB1c2VTdGF0ZTxBZG1pbkNhdGFsb2dTb3J0T3B0aW9uPihkZWZhdWx0QWRtaW5DYXRhbG9nU29ydCk7XG4gIGNvbnN0IFtzZWxlY3RlZERldmljZSwgc2V0U2VsZWN0ZWREZXZpY2VdID0gdXNlU3RhdGU8QWRtaW5DYXRhbG9nRGV2aWNlTGlzdEl0ZW0gfCBudWxsPihudWxsKTtcblxuICBjb25zdCB0ZWNobm9sb2d5RmFtaWxpZXMgPSB1c2VNZW1vKCgpID0+IGV4dHJhY3RUZWNobm9sb2d5RmFtaWxpZXMoU0VFRF9ERVZJQ0VTKSwgW10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkRGV2aWNlcyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBmaWx0ZXJBbmRTb3J0QWRtaW5DYXRhbG9nRGV2aWNlcyhTRUVEX0RFVklDRVMsIGZpbHRlcnMsIHNvcnQpO1xuICB9LCBbZmlsdGVycywgc29ydF0pO1xuXG4gIGNvbnN0IGNvbXBhcmlzb24gPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoIXNlbGVjdGVkRGV2aWNlKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gYnVpbGRIaVRlY2hDYXRhbG9nQ29tcGFyaXNvbihzZWxlY3RlZERldmljZSwgU0VFRF9ERVZJQ0VTKTtcbiAgfSwgW3NlbGVjdGVkRGV2aWNlXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1uYXZ5LTk1MCBiZy1kb3RzIHB5LTE2IHB4LTQgc206cHgtNiBsZzpweC04IGZvbnQtc2FucyByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgIHsvKiBCYWNrZ3JvdW5kIEFtYmllbmNlICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCBsZWZ0LTAgdy1mdWxsIGgtWzJweF0gYmctc2lsdmVyLWdyYWRpZW50IG9wYWNpdHktNjBcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTEwIHJpZ2h0LTEwIHctOTYgaC05NiBiZy1zaWx2ZXItNjAwLzEwIHJvdW5kZWQtZnVsbCBibHVyLVsxNDBweF0gcG9pbnRlci1ldmVudHMtbm9uZVwiPjwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTZ4bCBteC1hdXRvIHJlbGF0aXZlIHotMTAgc3BhY2UteS0xMlwiPlxuICAgICAgICB7LyogSGVhZGVyIE5hdmlnYXRpb24gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBtZDppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC02IHBiLTYgYm9yZGVyLWIgYm9yZGVyLXNpbHZlci01MDAvMjBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC01XCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQmFja31cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC0yeGwgYmctbmF2eS05MDAgYm9yZGVyIGJvcmRlci1zaWx2ZXItNTAwLzIwIGhvdmVyOmJvcmRlci1zaWx2ZXItNDAwIHRleHQtc2lsdmVyLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tYWxsIHNoYWRvdy1zaWx2ZXItZ2xvd1wiXG4gICAgICAgICAgICAgIHRpdGxlPVwiV3LDs8SHXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPEFycm93TGVmdCBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRyYWNraW5nLXdpZGVzdCB0ZXh0LXNpbHZlci00MDAgdXBwZXJjYXNlXCI+TXlTa2luQ29kZSBIaS1UZWNoIFN1aXRlPC9zcGFuPlxuICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC0zeGwgbWQ6dGV4dC00eGwgZm9udC1zZXJpZiBmb250LWxpZ2h0IHRleHQtd2hpdGUgdHJhY2tpbmctd2lkZVwiPlxuICAgICAgICAgICAgICAgIEthdGFsb2cgQXBhcmF0dXJ5IEhpLVRlY2hcbiAgICAgICAgICAgICAgPC9oMT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC14cyB0ZXh0LXNpbHZlci00MDAgYmctbmF2eS05MDAvNjAgcHgtNSBweS0zIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2lsdmVyLTUwMC8yMFwiPlxuICAgICAgICAgICAgPENwdSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtc2lsdmVyLTMwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5LbGluaWN6bmUgcHJvdG9rb8WCeSBsYXNlcm93ZSBpIGVuZXJnaW90ZXJhcGV1dHljem5lPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogRmlsdGVyIEJhciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1uYXZ5LTkwMC81MCBwLTYgcm91bmRlZC0zeGwgYm9yZGVyIGJvcmRlci1zaWx2ZXItNTAwLzIwIHNwYWNlLXktNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBnYXAtNFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4LTFcIj5cbiAgICAgICAgICAgICAgPFNlYXJjaCBjbGFzc05hbWU9XCJ3LTQgaC00IGFic29sdXRlIGxlZnQtNCB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgdGV4dC1zaWx2ZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU3p1a2FqIGFwYXJhdHVyeSwgZmFsaSwgdGVjaG5vbG9naWkuLi5cIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtmaWx0ZXJzLnNlYXJjaFF1ZXJ5fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RmlsdGVycyh7IC4uLmZpbHRlcnMsIHNlYXJjaFF1ZXJ5OiBlLnRhcmdldC52YWx1ZSB9KX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctbmF2eS05NTAgcGwtMTEgcHItNCBweS0zIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2lsdmVyLTUwMC8zMCB0ZXh0LXNpbHZlci0xMDAgcGxhY2Vob2xkZXItc2lsdmVyLTUwMCB0ZXh0LXNtIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItc2lsdmVyLTMwMCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgIHZhbHVlPXtmaWx0ZXJzLnRlY2hub2xvZ3lGYW1pbHl9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRGaWx0ZXJzKHsgLi4uZmlsdGVycywgdGVjaG5vbG9neUZhbWlseTogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctbmF2eS05NTAgcHgtNCBweS0zIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2lsdmVyLTUwMC8zMCB0ZXh0LXNpbHZlci0yMDAgdGV4dC1zbSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXNpbHZlci0zMDBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFsbFwiPldzenlzdGtpZSB0ZWNobm9sb2dpZTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIHt0ZWNobm9sb2d5RmFtaWxpZXMubWFwKChmYW0pID0+IChcbiAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtmYW19IHZhbHVlPXtmYW19PntmYW19PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuXG4gICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICB2YWx1ZT17ZmlsdGVycy5kb3dudGltZX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEZpbHRlcnMoeyAuLi5maWx0ZXJzLCBkb3dudGltZTogZS50YXJnZXQudmFsdWUgYXMgYW55IH0pfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLW5hdnktOTUwIHB4LTQgcHktMyByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNpbHZlci01MDAvMzAgdGV4dC1zaWx2ZXItMjAwIHRleHQtc20gZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1zaWx2ZXItMzAwXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhbGxcIj5LYcW8ZHkgcHJvZmlsIGRvd250aW1lPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm1pbmltYWxcIj5Eb3dudGltZSBtaW5pbWFsbnkgKDAtMjRoKTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzaG9ydFwiPkRvd250aW1lIGtyw7N0a2kgKDEtMyBkbmkpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm1vZGVyYXRlXCI+RG93bnRpbWUgdW1pYXJrb3dhbnkgKDQtNyBkbmkpPC9vcHRpb24+XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBEZXZpY2UgQ2FyZHMgR3JpZCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zIGdhcC02XCI+XG4gICAgICAgICAge2ZpbHRlcmVkRGV2aWNlcy5tYXAoKGRldmljZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNlbGVjdGVkRGV2aWNlPy5pZCA9PT0gZGV2aWNlLmlkO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGtleT17ZGV2aWNlLmlkfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkRGV2aWNlKGRldmljZSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC02IHJvdW5kZWQtM3hsIGJvcmRlciB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiAke1xuICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICA/ICdiZy1uYXZ5LTkwMCBib3JkZXItc2lsdmVyLTQwMCBzaGFkb3ctc2lsdmVyLWdsb3ctc3Ryb25nJ1xuICAgICAgICAgICAgICAgICAgICA6ICdiZy1uYXZ5LTkwMC80MCBib3JkZXItc2lsdmVyLTUwMC8yMCBob3Zlcjpib3JkZXItc2lsdmVyLTQwMC81MCBob3ZlcjpiZy1uYXZ5LTkwMC83MCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMiBtYi0zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0cmFja2luZy13aWRlciBweC0zIHB5LTEgcm91bmRlZC1mdWxsIGJnLW5hdnktOTUwIGJvcmRlciBib3JkZXItc2lsdmVyLTUwMC8zMCB0ZXh0LXNpbHZlci0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7ZGV2aWNlLnRlY2hub2xvZ3lGYW1pbHl9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC1bMTBweF0gZm9udC1tZWRpdW0gdXBwZXJjYXNlIHB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsICR7XG4gICAgICAgICAgICAgICAgICAgICAgZGV2aWNlLmRvd250aW1lUHJvZmlsZSA9PT0gJ21pbmltYWwnXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTk1MC84MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlciBib3JkZXItZW1lcmFsZC04MDAvNDAnXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGRldmljZS5kb3dudGltZVByb2ZpbGUgPT09ICdzaG9ydCdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWFtYmVyLTk1MC84MCB0ZXh0LWFtYmVyLTMwMCBib3JkZXIgYm9yZGVyLWFtYmVyLTgwMC80MCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXJvc2UtOTUwLzgwIHRleHQtcm9zZS0zMDAgYm9yZGVyIGJvcmRlci1yb3NlLTgwMC80MCdcbiAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgIHtkZXZpY2UuZG93bnRpbWVQcm9maWxlID09PSAnbWluaW1hbCcgPyAnMC0yNGggcmVrb253YWxlc2NlbmNqYScgOiBkZXZpY2UuZG93bnRpbWVQcm9maWxlID09PSAnc2hvcnQnID8gJzEtMyBkbmknIDogJzQtNyBkbmknfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1zZXJpZiB0ZXh0LXdoaXRlIG1iLTIgbGVhZGluZy1zbnVnXCI+XG4gICAgICAgICAgICAgICAgICAgIHtkZXZpY2UuZGlzcGxheU5hbWV9XG4gICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNpbHZlci00MDAgZm9udC1saWdodCBsaW5lLWNsYW1wLTMgbWItNCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAge2RldmljZS5tZWNoYW5pc21TdW1tYXJ5fVxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC00IGJvcmRlci10IGJvcmRlci1zaWx2ZXItNTAwLzEwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRleHQteHMgdGV4dC1zaWx2ZXItNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXNpbHZlci0zMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5XYWdhIHJla29tZW5kYWNqaToge2RldmljZS5yYW5raW5nV2VpZ2h0fS81PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtc2lsdmVyLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIHVuZGVybGluZSB1bmRlcmxpbmUtb2Zmc2V0LTRcIj5cbiAgICAgICAgICAgICAgICAgICAgU3pjemVnw7PFgnlcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBTZWxlY3RlZCBEZXZpY2UgRGVlcC1EaXZlIERyYXdlciAvIFBhbmVsICovfVxuICAgICAgICB7c2VsZWN0ZWREZXZpY2UgJiYgY29tcGFyaXNvbiAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1uYXZ5LTkwMC83MCBwLTggcm91bmRlZC0zeGwgYm9yZGVyIGJvcmRlci1zaWx2ZXItNDAwLzUwIHNwYWNlLXktNiBhbmltYXRlLWluIGZhZGUtaW4gc2xpZGUtaW4tZnJvbS1ib3R0b20tNCBkdXJhdGlvbi0zMDBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXNpbHZlci00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdFwiPkthcnRhIFBhcmFtZXRyeWN6bmEgQXBhcmF0dTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0yeGwgbWQ6dGV4dC0zeGwgZm9udC1zZXJpZiB0ZXh0LXdoaXRlIG10LTFcIj57c2VsZWN0ZWREZXZpY2UuZGlzcGxheU5hbWV9PC9oMj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2lsdmVyLTMwMCBpdGFsaWMgbXQtMVwiPntzZWxlY3RlZERldmljZS5wb3NpdGlvbmluZ308L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWREZXZpY2UobnVsbCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gcHgtNCBweS0yIHJvdW5kZWQteGwgYmctbmF2eS05NTAgYm9yZGVyIGJvcmRlci1zaWx2ZXItNTAwLzMwIHRleHQtc2lsdmVyLTMwMCBob3Zlcjp0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIFphbWtuaWogcG9kZ2zEhWRcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC02IHB0LTQgYm9yZGVyLXQgYm9yZGVyLXNpbHZlci01MDAvMjAgdGV4dC1zbVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLW5hdnktOTUwLzgwIHAtNSByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNpbHZlci01MDAvMjAgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LXNpbHZlci00MDAgdXBwZXJjYXNlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8SW5mbyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtc2lsdmVyLTMwMFwiIC8+XG4gICAgICAgICAgICAgICAgICBNZWNoYW5pem0gQmlvZml6eWN6bnlcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zaWx2ZXItMzAwIGZvbnQtbGlnaHQgbGVhZGluZy1yZWxheGVkXCI+e3NlbGVjdGVkRGV2aWNlLm1lY2hhbmlzbVN1bW1hcnl9PC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLW5hdnktOTUwLzgwIHAtNSByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNpbHZlci01MDAvMjAgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LXNpbHZlci00MDAgdXBwZXJjYXNlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1zaWx2ZXItMzAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIFJla29tZW5kYWNqYSBNeVNraW5Db2RlXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2lsdmVyLTMwMCBmb250LWxpZ2h0IGxlYWRpbmctcmVsYXhlZFwiPntzZWxlY3RlZERldmljZS5yZWNvbW1lbmRhdGlvbkNvcHl9PC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogQ29tcGFyaXNvbiBMb2dpYyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtNCBib3JkZXItdCBib3JkZXItc2lsdmVyLTUwMC8yMFwiPlxuICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCB0ZXh0LXNpbHZlci00MDAgbWItM1wiPlxuICAgICAgICAgICAgICAgIERvcGFzb3dhbmllIHcgUmFwb3J0YWNoIEtsaW5pY3pueWNoXG4gICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtMnhsIGJnLW5hdnktOTUwLzYwIGJvcmRlciBib3JkZXItc2lsdmVyLTUwMC8zMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctbmF2eS05MDAgYm9yZGVyIGJvcmRlci1zaWx2ZXItNTAwLzMwXCI+XG4gICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LXNpbHZlci0zMDBcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC13aGl0ZVwiPntjb21wYXJpc29uLnJlcG9ydEZpdC50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNpbHZlci00MDAgZm9udC1saWdodFwiPntjb21wYXJpc29uLnJlcG9ydEZpdC5kZXNjcmlwdGlvbn08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdfQ==