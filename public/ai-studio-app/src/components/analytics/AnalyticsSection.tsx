import __vite__cjsImport0_react_jsxDevRuntime from "/ai-studio-app/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=d886a827"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/ai-studio-app/node_modules/.vite/deps/react.js?v=d886a827"; const useState = __vite__cjsImport1_react["useState"];
import {
  Users,
  Eye,
  TrendingUp,
  ArrowUpRight,
  Smartphone,
  Monitor,
  Tablet,
  Search,
  Globe2,
  Activity
} from "/ai-studio-app/node_modules/.vite/deps/lucide-react.js?v=5db40f83";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "/ai-studio-app/node_modules/.vite/deps/recharts.js?v=575c55a9";
import { initialTrafficData } from "/ai-studio-app/src/data/initialData.ts";
export const AnalyticsSection = ({ accessibility }) => {
  const [timeRange, setTimeRange] = useState("30d");
  const [liveVisitors, setLiveVisitors] = useState(42);
  const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ec4899"];
  const trafficSourcesData = [
    { name: "Wyszukiwarka Organic (Google)", value: 68, color: "#10b981" },
    { name: "Wejścia Bezpośrednie", value: 20, color: "#6366f1" },
    { name: "Odsyłacze i Portale", value: 8, color: "#f59e0b" },
    { name: "Social Media", value: 4, color: "#ec4899" }
  ];
  const deviceData = [
    { name: "Smartfony", percentage: "62%", icon: Smartphone, count: "10,550" },
    { name: "Laptopy / Komputery", percentage: "32%", icon: Monitor, count: "5,440" },
    { name: "Tablety", percentage: "6%", icon: Tablet, count: "1,030" }
  ];
  const topKeywords = [
    { keyword: "dostępność cyfrowa WCAG 2.1", position: "#1", clicks: 3420, ctr: "14.2%" },
    { keyword: "audyt SEO strony firmowej", position: "#2", clicks: 2890, ctr: "11.8%" },
    { keyword: "system zarządzania pocztą i zadaniami", position: "#3", clicks: 2150, ctr: "9.4%" },
    { keyword: "weryfikacja dwuskładnikowa 2FA", position: "#2", clicks: 1840, ctr: "8.1%" },
    { keyword: "raporty miesięczne PDF automatyczne", position: "#4", clicks: 1420, ctr: "6.7%" }
  ];
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold tracking-tight", children: "Statystyki Ruchu & Analityka Google Search" }, void 0, false, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 70,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400", children: "Monitoruj wizyty użytkowników, źródła ruchu, pozycje organiczne i wskaźnik odrzuceń w czasie rzeczywistym" }, void 0, false, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 71,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
        lineNumber: 69,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-bold text-emerald-400 animate-pulse", children: [
          /* @__PURE__ */ jsxDEV(Activity, { className: "w-4 h-4" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 78,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: [
            "Na żywo: ",
            liveVisitors,
            " użytkowników online"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 79,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 77,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold", children: ["7d", "30d", "90d"].map((range) => /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setTimeRange(range),
            className: `px-3 py-1.5 rounded-lg transition-all ${timeRange === range ? accessibility.highContrast ? "bg-yellow-400 text-black font-bold" : "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`,
            children: range
          },
          range,
          false,
          {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 84,
            columnNumber: 15
          },
          this
        )) }, void 0, false, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 82,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
        lineNumber: 74,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
      lineNumber: 68,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-slate-400 text-xs font-semibold", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Suma Unikalnych Wizyt" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 106,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(Users, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 107,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 105,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black text-white", children: "17,020" }, void 0, false, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 109,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 text-[11px] text-emerald-400 font-bold", children: [
          /* @__PURE__ */ jsxDEV(ArrowUpRight, { className: "w-3.5 h-3.5" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 111,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "+28.5% względem ubiegłego miesiąca" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 112,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 110,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
        lineNumber: 104,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-slate-400 text-xs font-semibold", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Wyświetlenia Stron (Pageviews)" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 118,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(Eye, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 119,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 117,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black text-white", children: "52,900" }, void 0, false, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 121,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 text-[11px] text-emerald-400 font-bold", children: [
          /* @__PURE__ */ jsxDEV(ArrowUpRight, { className: "w-3.5 h-3.5" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 123,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "3.11 strony na sesję" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 124,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 122,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
        lineNumber: 116,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-slate-400 text-xs font-semibold", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Ruch Organiczny (Google)" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 130,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(Search, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 131,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 129,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black text-white", children: "12,110" }, void 0, false, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 133,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 text-[11px] text-emerald-400 font-bold", children: [
          /* @__PURE__ */ jsxDEV(ArrowUpRight, { className: "w-3.5 h-3.5" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 135,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "68% całkowitego ruchu" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 136,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 134,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
        lineNumber: 128,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-slate-400 text-xs font-semibold", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Średni Wskaźnik Odrzuceń" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 142,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(TrendingUp, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 143,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 141,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black text-white", children: "24.5%" }, void 0, false, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 145,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 text-[11px] text-emerald-400 font-bold", children: [
          /* @__PURE__ */ jsxDEV(ArrowUpRight, { className: "w-3.5 h-3.5" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 147,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Poprawa o -4.2% (Spadek odrzuceń)" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 148,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 146,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
        lineNumber: 140,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
      lineNumber: 102,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(TrendingUp, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 158,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Trend Odwiedzin i Wyświetleń Stron (Ostatnie 30 Dni)" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 159,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 157,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 text-xs", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1 text-emerald-400 font-semibold", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-3 h-3 rounded-full bg-emerald-500 inline-block" }, void 0, false, {
              fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
              lineNumber: 164,
              columnNumber: 15
            }, this),
            " Unikalni Użytkownicy"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 163,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1 text-indigo-400 font-semibold", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-3 h-3 rounded-full bg-indigo-500 inline-block" }, void 0, false, {
              fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
              lineNumber: 167,
              columnNumber: 15
            }, this),
            " Wyświetlenia Stron"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 166,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 162,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
        lineNumber: 156,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "h-[280px] w-full", children: /* @__PURE__ */ jsxDEV(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV(AreaChart, { data: initialTrafficData, margin: { top: 10, right: 10, left: -20, bottom: 0 }, children: [
        /* @__PURE__ */ jsxDEV("defs", { children: [
          /* @__PURE__ */ jsxDEV("linearGradient", { id: "colorVisitors", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxDEV("stop", { offset: "5%", stopColor: "#10b981", stopOpacity: 0.4 }, void 0, false, {
              fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
              lineNumber: 177,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("stop", { offset: "95%", stopColor: "#10b981", stopOpacity: 0 }, void 0, false, {
              fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
              lineNumber: 178,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 176,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("linearGradient", { id: "colorPageviews", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxDEV("stop", { offset: "5%", stopColor: "#6366f1", stopOpacity: 0.4 }, void 0, false, {
              fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
              lineNumber: 181,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("stop", { offset: "95%", stopColor: "#6366f1", stopOpacity: 0 }, void 0, false, {
              fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
              lineNumber: 182,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 180,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 175,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(CartesianGrid, { strokeDasharray: "3 3", stroke: "#334155", vertical: false }, void 0, false, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 185,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(XAxis, { dataKey: "date", stroke: "#94a3b8", fontSize: 11, tickLine: false }, void 0, false, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 186,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(YAxis, { stroke: "#94a3b8", fontSize: 11, tickLine: false }, void 0, false, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 187,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          Tooltip,
          {
            contentStyle: { backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", fontSize: "12px" },
            itemStyle: { color: "#f8fafc" }
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 188,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(Area, { type: "monotone", dataKey: "visitors", name: "Użytkownicy", stroke: "#10b981", strokeWidth: 2, fillOpacity: 1, fill: "url(#colorVisitors)" }, void 0, false, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 192,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(Area, { type: "monotone", dataKey: "pageviews", name: "Wyświetlenia", stroke: "#6366f1", strokeWidth: 2, fillOpacity: 1, fill: "url(#colorPageviews)" }, void 0, false, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 193,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
        lineNumber: 174,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
        lineNumber: 173,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
        lineNumber: 172,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
      lineNumber: 155,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Globe2, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 205,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Źródła Pozyskania Ruchu" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 206,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 204,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "h-[200px] w-full flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV(PieChart, { children: [
          /* @__PURE__ */ jsxDEV(
            Pie,
            {
              data: trafficSourcesData,
              cx: "50%",
              cy: "50%",
              innerRadius: 55,
              outerRadius: 80,
              paddingAngle: 4,
              dataKey: "value",
              children: trafficSourcesData.map((entry, index) => /* @__PURE__ */ jsxDEV(Cell, { fill: entry.color }, `cell-${index}`, false, {
                fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
                lineNumber: 222,
                columnNumber: 21
              }, this))
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
              lineNumber: 212,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            Tooltip,
            {
              contentStyle: { backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", fontSize: "12px" }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
              lineNumber: 225,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 211,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 210,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 209,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 text-xs", children: trafficSourcesData.map((source, i) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between p-2 bg-slate-800/50 rounded-lg", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-3 h-3 rounded-full", style: { backgroundColor: source.color } }, void 0, false, {
              fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
              lineNumber: 236,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-200 font-medium", children: source.name }, void 0, false, {
              fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
              lineNumber: 237,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 235,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white", children: [
            source.value,
            "%"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 239,
            columnNumber: 17
          }, this)
        ] }, i, true, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 234,
          columnNumber: 15
        }, this)) }, void 0, false, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 232,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
        lineNumber: 203,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Search, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 248,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Najpopularniejsze Słowa Kluczowe w Google" }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 249,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 247,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left text-xs", children: [
          /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { className: "text-slate-400 border-b border-slate-800 pb-2", children: [
            /* @__PURE__ */ jsxDEV("th", { className: "pb-2 font-semibold", children: "Fraza Wyszukiwana" }, void 0, false, {
              fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
              lineNumber: 256,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "pb-2 font-semibold text-center", children: "Pozycja" }, void 0, false, {
              fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
              lineNumber: 257,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "pb-2 font-semibold text-right", children: "Kliknięcia" }, void 0, false, {
              fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
              lineNumber: 258,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "pb-2 font-semibold text-right", children: "CTR" }, void 0, false, {
              fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
              lineNumber: 259,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 255,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 254,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-slate-800/60", children: topKeywords.map((kw, idx) => /* @__PURE__ */ jsxDEV("tr", { className: "hover:bg-slate-800/40 transition-colors", children: [
            /* @__PURE__ */ jsxDEV("td", { className: "py-2.5 font-medium text-slate-200", children: kw.keyword }, void 0, false, {
              fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
              lineNumber: 265,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "py-2.5 text-center font-bold text-emerald-400", children: kw.position }, void 0, false, {
              fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
              lineNumber: 266,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "py-2.5 text-right font-semibold text-white", children: kw.clicks.toLocaleString() }, void 0, false, {
              fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
              lineNumber: 267,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "py-2.5 text-right text-indigo-300 font-bold", children: kw.ctr }, void 0, false, {
              fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
              lineNumber: 268,
              columnNumber: 21
            }, this)
          ] }, idx, true, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 264,
            columnNumber: 19
          }, this)) }, void 0, false, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 262,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 253,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 252,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "pt-3 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-xs", children: deviceData.map((d, i) => {
          const Icon = d.icon;
          return /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 bg-slate-800/80 rounded-xl border border-slate-700", children: [
            /* @__PURE__ */ jsxDEV(Icon, { className: "w-4 h-4 text-indigo-400 mx-auto mb-1" }, void 0, false, {
              fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
              lineNumber: 281,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "block text-[10px] text-slate-400", children: d.name }, void 0, false, {
              fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
              lineNumber: 282,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white text-sm", children: d.percentage }, void 0, false, {
              fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
              lineNumber: 283,
              columnNumber: 19
            }, this)
          ] }, i, true, {
            fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
            lineNumber: 280,
            columnNumber: 17
          }, this);
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
          lineNumber: 276,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
        lineNumber: 246,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
      lineNumber: 200,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/analytics/AnalyticsSection.tsx",
    lineNumber: 65,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFuYWx5dGljc1NlY3Rpb24udHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBVc2VycywgXG4gIEV5ZSwgXG4gIFRyZW5kaW5nVXAsIFxuICBBcnJvd1VwUmlnaHQsIFxuICBTbWFydHBob25lLCBcbiAgTW9uaXRvciwgXG4gIFRhYmxldCwgXG4gIFNlYXJjaCwgXG4gIEdsb2JlMiwgXG4gIEFjdGl2aXR5LFxuICBDYWxlbmRhciBhcyBDYWxlbmRhckljb25cbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IFxuICBSZXNwb25zaXZlQ29udGFpbmVyLCBcbiAgQXJlYUNoYXJ0LCBcbiAgQXJlYSwgXG4gIFhBeGlzLCBcbiAgWUF4aXMsIFxuICBUb29sdGlwLCBcbiAgQ2FydGVzaWFuR3JpZCwgXG4gIFBpZUNoYXJ0LCBcbiAgUGllLCBcbiAgQ2VsbCwgXG4gIEJhckNoYXJ0LCBcbiAgQmFyIFxufSBmcm9tICdyZWNoYXJ0cyc7XG5pbXBvcnQgeyBpbml0aWFsVHJhZmZpY0RhdGEgfSBmcm9tICcuLi8uLi9kYXRhL2luaXRpYWxEYXRhJztcbmltcG9ydCB7IEFjY2Vzc2liaWxpdHlTZXR0aW5ncyB9IGZyb20gJy4uLy4uL3R5cGVzJztcblxuaW50ZXJmYWNlIEFuYWx5dGljc1NlY3Rpb25Qcm9wcyB7XG4gIGFjY2Vzc2liaWxpdHk6IEFjY2Vzc2liaWxpdHlTZXR0aW5ncztcbn1cblxuZXhwb3J0IGNvbnN0IEFuYWx5dGljc1NlY3Rpb246IFJlYWN0LkZDPEFuYWx5dGljc1NlY3Rpb25Qcm9wcz4gPSAoeyBhY2Nlc3NpYmlsaXR5IH0pID0+IHtcbiAgY29uc3QgW3RpbWVSYW5nZSwgc2V0VGltZVJhbmdlXSA9IHVzZVN0YXRlPCczMGQnIHwgJzdkJyB8ICc5MGQnPignMzBkJyk7XG4gIGNvbnN0IFtsaXZlVmlzaXRvcnMsIHNldExpdmVWaXNpdG9yc10gPSB1c2VTdGF0ZSg0Mik7XG5cbiAgLy8gUmVjaGFydHMgY29sb3JzXG4gIGNvbnN0IENPTE9SUyA9IFsnIzYzNjZmMScsICcjMTBiOTgxJywgJyNmNTllMGInLCAnI2VjNDg5OSddO1xuXG4gIGNvbnN0IHRyYWZmaWNTb3VyY2VzRGF0YSA9IFtcbiAgICB7IG5hbWU6ICdXeXN6dWtpd2Fya2EgT3JnYW5pYyAoR29vZ2xlKScsIHZhbHVlOiA2OCwgY29sb3I6ICcjMTBiOTgxJyB9LFxuICAgIHsgbmFtZTogJ1dlasWbY2lhIEJlenBvxZtyZWRuaWUnLCB2YWx1ZTogMjAsIGNvbG9yOiAnIzYzNjZmMScgfSxcbiAgICB7IG5hbWU6ICdPZHN5xYJhY3plIGkgUG9ydGFsZScsIHZhbHVlOiA4LCBjb2xvcjogJyNmNTllMGInIH0sXG4gICAgeyBuYW1lOiAnU29jaWFsIE1lZGlhJywgdmFsdWU6IDQsIGNvbG9yOiAnI2VjNDg5OScgfSxcbiAgXTtcblxuICBjb25zdCBkZXZpY2VEYXRhID0gW1xuICAgIHsgbmFtZTogJ1NtYXJ0Zm9ueScsIHBlcmNlbnRhZ2U6ICc2MiUnLCBpY29uOiBTbWFydHBob25lLCBjb3VudDogJzEwLDU1MCcgfSxcbiAgICB7IG5hbWU6ICdMYXB0b3B5IC8gS29tcHV0ZXJ5JywgcGVyY2VudGFnZTogJzMyJScsIGljb246IE1vbml0b3IsIGNvdW50OiAnNSw0NDAnIH0sXG4gICAgeyBuYW1lOiAnVGFibGV0eScsIHBlcmNlbnRhZ2U6ICc2JScsIGljb246IFRhYmxldCwgY291bnQ6ICcxLDAzMCcgfSxcbiAgXTtcblxuICBjb25zdCB0b3BLZXl3b3JkcyA9IFtcbiAgICB7IGtleXdvcmQ6ICdkb3N0xJlwbm/Fm8SHIGN5ZnJvd2EgV0NBRyAyLjEnLCBwb3NpdGlvbjogJyMxJywgY2xpY2tzOiAzNDIwLCBjdHI6ICcxNC4yJScgfSxcbiAgICB7IGtleXdvcmQ6ICdhdWR5dCBTRU8gc3Ryb255IGZpcm1vd2VqJywgcG9zaXRpb246ICcjMicsIGNsaWNrczogMjg5MCwgY3RyOiAnMTEuOCUnIH0sXG4gICAgeyBrZXl3b3JkOiAnc3lzdGVtIHphcnrEhWR6YW5pYSBwb2N6dMSFIGkgemFkYW5pYW1pJywgcG9zaXRpb246ICcjMycsIGNsaWNrczogMjE1MCwgY3RyOiAnOS40JScgfSxcbiAgICB7IGtleXdvcmQ6ICd3ZXJ5ZmlrYWNqYSBkd3Vza8WCYWRuaWtvd2EgMkZBJywgcG9zaXRpb246ICcjMicsIGNsaWNrczogMTg0MCwgY3RyOiAnOC4xJScgfSxcbiAgICB7IGtleXdvcmQ6ICdyYXBvcnR5IG1pZXNpxJljem5lIFBERiBhdXRvbWF0eWN6bmUnLCBwb3NpdGlvbjogJyM0JywgY2xpY2tzOiAxNDIwLCBjdHI6ICc2LjclJyB9LFxuICBdO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgIFxuICAgICAgey8qIEhlYWRlciAmIENvbnRyb2xzICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdHJhY2tpbmctdGlnaHRcIj5TdGF0eXN0eWtpIFJ1Y2h1ICYgQW5hbGl0eWthIEdvb2dsZSBTZWFyY2g8L2gyPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj5Nb25pdG9ydWogd2l6eXR5IHXFvHl0a293bmlrw7N3LCDFunLDs2TFgmEgcnVjaHUsIHBvenljamUgb3JnYW5pY3puZSBpIHdza2HFum5payBvZHJ6dWNlxYQgdyBjemFzaWUgcnplY3p5d2lzdHltPC9wPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgXG4gICAgICAgICAgey8qIExpdmUgVmlzaXRvciBUaWNrZXIgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC0zIHB5LTEuNSBiZy1lbWVyYWxkLTUwMC8xMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzMwIHJvdW5kZWQteGwgdGV4dC14cyBmb250LWJvbGQgdGV4dC1lbWVyYWxkLTQwMCBhbmltYXRlLXB1bHNlXCI+XG4gICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5OYSDFvHl3bzoge2xpdmVWaXNpdG9yc30gdcW8eXRrb3duaWvDs3cgb25saW5lPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGJnLXNsYXRlLTkwMCBwLTEgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgIHtbJzdkJywgJzMwZCcsICc5MGQnXS5tYXAocmFuZ2UgPT4gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAga2V5PXtyYW5nZX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRUaW1lUmFuZ2UocmFuZ2UgYXMgYW55KX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEuNSByb3VuZGVkLWxnIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICB0aW1lUmFuZ2UgPT09IHJhbmdlXG4gICAgICAgICAgICAgICAgICAgID8gKGFjY2Vzc2liaWxpdHkuaGlnaENvbnRyYXN0ID8gJ2JnLXllbGxvdy00MDAgdGV4dC1ibGFjayBmb250LWJvbGQnIDogJ2JnLWluZGlnby02MDAgdGV4dC13aGl0ZScpXG4gICAgICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7cmFuZ2V9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFRvcCBLZXkgTWV0cmljcyBCYXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTQgZ2FwLTRcIj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHAtNCByb3VuZGVkLTJ4bCBzcGFjZS15LTFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXNsYXRlLTQwMCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgIDxzcGFuPlN1bWEgVW5pa2FsbnljaCBXaXp5dDwvc3Bhbj5cbiAgICAgICAgICAgIDxVc2VycyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtaW5kaWdvLTQwMFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJsYWNrIHRleHQtd2hpdGVcIj4xNywwMjA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtWzExcHhdIHRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICA8QXJyb3dVcFJpZ2h0IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPisyOC41JSB3emdsxJlkZW0gdWJpZWfFgmVnbyBtaWVzacSFY2E8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHAtNCByb3VuZGVkLTJ4bCBzcGFjZS15LTFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXNsYXRlLTQwMCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgIDxzcGFuPld5xZt3aWV0bGVuaWEgU3Ryb24gKFBhZ2V2aWV3cyk8L3NwYW4+XG4gICAgICAgICAgICA8RXllIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJsYWNrIHRleHQtd2hpdGVcIj41Miw5MDA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtWzExcHhdIHRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICA8QXJyb3dVcFJpZ2h0IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPjMuMTEgc3Ryb255IG5hIHNlc2rEmTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcC00IHJvdW5kZWQtMnhsIHNwYWNlLXktMVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtc2xhdGUtNDAwIHRleHQteHMgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgPHNwYW4+UnVjaCBPcmdhbmljem55IChHb29nbGUpPC9zcGFuPlxuICAgICAgICAgICAgPFNlYXJjaCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYmxhY2sgdGV4dC13aGl0ZVwiPjEyLDExMDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdGV4dC1bMTFweF0gdGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGRcIj5cbiAgICAgICAgICAgIDxBcnJvd1VwUmlnaHQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgPHNwYW4+NjglIGNhxYJrb3dpdGVnbyBydWNodTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcC00IHJvdW5kZWQtMnhsIHNwYWNlLXktMVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtc2xhdGUtNDAwIHRleHQteHMgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgPHNwYW4+xZpyZWRuaSBXc2thxbpuaWsgT2RyenVjZcWEPC9zcGFuPlxuICAgICAgICAgICAgPFRyZW5kaW5nVXAgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYmxhY2sgdGV4dC13aGl0ZVwiPjI0LjUlPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0ZXh0LVsxMXB4XSB0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgPEFycm93VXBSaWdodCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5Qb3ByYXdhIG8gLTQuMiUgKFNwYWRlayBvZHJ6dWNlxYQpPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNYWluIENoYXJ0OiBWaXNpdG9yIFRyZW5kcyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHAtNSByb3VuZGVkLTJ4bCBzcGFjZS15LTRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBwYi0zXCI+XG4gICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxUcmVuZGluZ1VwIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPlRyZW5kIE9kd2llZHppbiBpIFd5xZt3aWV0bGXFhCBTdHJvbiAoT3N0YXRuaWUgMzAgRG5pKTwvc3Bhbj5cbiAgICAgICAgICA8L2gzPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0zIGgtMyByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC01MDAgaW5saW5lLWJsb2NrXCIgLz4gVW5pa2FsbmkgVcW8eXRrb3duaWN5XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0ZXh0LWluZGlnby00MDAgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTMgaC0zIHJvdW5kZWQtZnVsbCBiZy1pbmRpZ28tNTAwIGlubGluZS1ibG9ja1wiIC8+IFd5xZt3aWV0bGVuaWEgU3Ryb25cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLVsyODBweF0gdy1mdWxsXCI+XG4gICAgICAgICAgPFJlc3BvbnNpdmVDb250YWluZXIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPlxuICAgICAgICAgICAgPEFyZWFDaGFydCBkYXRhPXtpbml0aWFsVHJhZmZpY0RhdGF9IG1hcmdpbj17eyB0b3A6IDEwLCByaWdodDogMTAsIGxlZnQ6IC0yMCwgYm90dG9tOiAwIH19PlxuICAgICAgICAgICAgICA8ZGVmcz5cbiAgICAgICAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9XCJjb2xvclZpc2l0b3JzXCIgeDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwXCIgeTI9XCIxXCI+XG4gICAgICAgICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCI1JVwiIHN0b3BDb2xvcj1cIiMxMGI5ODFcIiBzdG9wT3BhY2l0eT17MC40fSAvPlxuICAgICAgICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiOTUlXCIgc3RvcENvbG9yPVwiIzEwYjk4MVwiIHN0b3BPcGFjaXR5PXswfSAvPlxuICAgICAgICAgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgICAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPVwiY29sb3JQYWdldmlld3NcIiB4MT1cIjBcIiB5MT1cIjBcIiB4Mj1cIjBcIiB5Mj1cIjFcIj5cbiAgICAgICAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjUlXCIgc3RvcENvbG9yPVwiIzYzNjZmMVwiIHN0b3BPcGFjaXR5PXswLjR9IC8+XG4gICAgICAgICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCI5NSVcIiBzdG9wQ29sb3I9XCIjNjM2NmYxXCIgc3RvcE9wYWNpdHk9ezB9IC8+XG4gICAgICAgICAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgICAgICAgPC9kZWZzPlxuICAgICAgICAgICAgICA8Q2FydGVzaWFuR3JpZCBzdHJva2VEYXNoYXJyYXk9XCIzIDNcIiBzdHJva2U9XCIjMzM0MTU1XCIgdmVydGljYWw9e2ZhbHNlfSAvPlxuICAgICAgICAgICAgICA8WEF4aXMgZGF0YUtleT1cImRhdGVcIiBzdHJva2U9XCIjOTRhM2I4XCIgZm9udFNpemU9ezExfSB0aWNrTGluZT17ZmFsc2V9IC8+XG4gICAgICAgICAgICAgIDxZQXhpcyBzdHJva2U9XCIjOTRhM2I4XCIgZm9udFNpemU9ezExfSB0aWNrTGluZT17ZmFsc2V9IC8+XG4gICAgICAgICAgICAgIDxUb29sdGlwIFxuICAgICAgICAgICAgICAgIGNvbnRlbnRTdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6ICcjMGYxNzJhJywgYm9yZGVyQ29sb3I6ICcjMzM0MTU1JywgYm9yZGVyUmFkaXVzOiAnMTJweCcsIGZvbnRTaXplOiAnMTJweCcgfX1cbiAgICAgICAgICAgICAgICBpdGVtU3R5bGU9e3sgY29sb3I6ICcjZjhmYWZjJyB9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8QXJlYSB0eXBlPVwibW9ub3RvbmVcIiBkYXRhS2V5PVwidmlzaXRvcnNcIiBuYW1lPVwiVcW8eXRrb3duaWN5XCIgc3Ryb2tlPVwiIzEwYjk4MVwiIHN0cm9rZVdpZHRoPXsyfSBmaWxsT3BhY2l0eT17MX0gZmlsbD1cInVybCgjY29sb3JWaXNpdG9ycylcIiAvPlxuICAgICAgICAgICAgICA8QXJlYSB0eXBlPVwibW9ub3RvbmVcIiBkYXRhS2V5PVwicGFnZXZpZXdzXCIgbmFtZT1cIld5xZt3aWV0bGVuaWFcIiBzdHJva2U9XCIjNjM2NmYxXCIgc3Ryb2tlV2lkdGg9ezJ9IGZpbGxPcGFjaXR5PXsxfSBmaWxsPVwidXJsKCNjb2xvclBhZ2V2aWV3cylcIiAvPlxuICAgICAgICAgICAgPC9BcmVhQ2hhcnQ+XG4gICAgICAgICAgPC9SZXNwb25zaXZlQ29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogVHJhZmZpYyBCcmVha2Rvd24gJiBLZXl3b3JkcyBHcmlkICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0xMiBnYXAtNlwiPlxuICAgICAgICBcbiAgICAgICAgey8qIExlZnQ6IFRyYWZmaWMgU291cmNlcyBEb251dCBDaGFydCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi01IGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBwLTUgcm91bmRlZC0yeGwgc3BhY2UteS00XCI+XG4gICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtd2hpdGUgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBwYi0zIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8R2xvYmUyIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPsW5csOzZMWCYSBQb3p5c2thbmlhIFJ1Y2h1PC9zcGFuPlxuICAgICAgICAgIDwvaDM+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtWzIwMHB4XSB3LWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxSZXNwb25zaXZlQ29udGFpbmVyIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgPFBpZUNoYXJ0PlxuICAgICAgICAgICAgICAgIDxQaWVcbiAgICAgICAgICAgICAgICAgIGRhdGE9e3RyYWZmaWNTb3VyY2VzRGF0YX1cbiAgICAgICAgICAgICAgICAgIGN4PVwiNTAlXCJcbiAgICAgICAgICAgICAgICAgIGN5PVwiNTAlXCJcbiAgICAgICAgICAgICAgICAgIGlubmVyUmFkaXVzPXs1NX1cbiAgICAgICAgICAgICAgICAgIG91dGVyUmFkaXVzPXs4MH1cbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdBbmdsZT17NH1cbiAgICAgICAgICAgICAgICAgIGRhdGFLZXk9XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3RyYWZmaWNTb3VyY2VzRGF0YS5tYXAoKGVudHJ5LCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8Q2VsbCBrZXk9e2BjZWxsLSR7aW5kZXh9YH0gZmlsbD17ZW50cnkuY29sb3J9IC8+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L1BpZT5cbiAgICAgICAgICAgICAgICA8VG9vbHRpcCBcbiAgICAgICAgICAgICAgICAgIGNvbnRlbnRTdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6ICcjMGYxNzJhJywgYm9yZGVyQ29sb3I6ICcjMzM0MTU1JywgYm9yZGVyUmFkaXVzOiAnMTJweCcsIGZvbnRTaXplOiAnMTJweCcgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L1BpZUNoYXJ0PlxuICAgICAgICAgICAgPC9SZXNwb25zaXZlQ29udGFpbmVyPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgdGV4dC14c1wiPlxuICAgICAgICAgICAge3RyYWZmaWNTb3VyY2VzRGF0YS5tYXAoKHNvdXJjZSwgaSkgPT4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtMiBiZy1zbGF0ZS04MDAvNTAgcm91bmRlZC1sZ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMyBoLTMgcm91bmRlZC1mdWxsXCIgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiBzb3VyY2UuY29sb3IgfX0gLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMjAwIGZvbnQtbWVkaXVtXCI+e3NvdXJjZS5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC13aGl0ZVwiPntzb3VyY2UudmFsdWV9JTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFJpZ2h0OiBUb3AgU2VhcmNoIEtleXdvcmRzIFRhYmxlICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTcgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHAtNSByb3VuZGVkLTJ4bCBzcGFjZS15LTRcIj5cbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC13aGl0ZSBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHBiLTMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxTZWFyY2ggY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPk5hanBvcHVsYXJuaWVqc3plIFPFgm93YSBLbHVjem93ZSB3IEdvb2dsZTwvc3Bhbj5cbiAgICAgICAgICA8L2gzPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdmVyZmxvdy14LWF1dG9cIj5cbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ3LWZ1bGwgdGV4dC1sZWZ0IHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHBiLTJcIj5cbiAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwYi0yIGZvbnQtc2VtaWJvbGRcIj5GcmF6YSBXeXN6dWtpd2FuYTwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicGItMiBmb250LXNlbWlib2xkIHRleHQtY2VudGVyXCI+UG96eWNqYTwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicGItMiBmb250LXNlbWlib2xkIHRleHQtcmlnaHRcIj5LbGlrbmnEmWNpYTwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicGItMiBmb250LXNlbWlib2xkIHRleHQtcmlnaHRcIj5DVFI8L3RoPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgIDx0Ym9keSBjbGFzc05hbWU9XCJkaXZpZGUteSBkaXZpZGUtc2xhdGUtODAwLzYwXCI+XG4gICAgICAgICAgICAgICAge3RvcEtleXdvcmRzLm1hcCgoa3csIGlkeCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPHRyIGtleT17aWR4fSBjbGFzc05hbWU9XCJob3ZlcjpiZy1zbGF0ZS04MDAvNDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTIuNSBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTIwMFwiPntrdy5rZXl3b3JkfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0yLjUgdGV4dC1jZW50ZXIgZm9udC1ib2xkIHRleHQtZW1lcmFsZC00MDBcIj57a3cucG9zaXRpb259PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTIuNSB0ZXh0LXJpZ2h0IGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZVwiPntrdy5jbGlja3MudG9Mb2NhbGVTdHJpbmcoKX08L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMi41IHRleHQtcmlnaHQgdGV4dC1pbmRpZ28tMzAwIGZvbnQtYm9sZFwiPntrdy5jdHJ9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIERldmljZXMgQnJlYWtkb3duIGxpc3QgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0zIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAgZ3JpZCBncmlkLWNvbHMtMyBnYXAtMiB0ZXh0LWNlbnRlciB0ZXh0LXhzXCI+XG4gICAgICAgICAgICB7ZGV2aWNlRGF0YS5tYXAoKGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgSWNvbiA9IGQuaWNvbjtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwicC0yLjUgYmctc2xhdGUtODAwLzgwIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxJY29uIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1pbmRpZ28tNDAwIG14LWF1dG8gbWItMVwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMFwiPntkLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtd2hpdGUgdGV4dC1zbVwiPntkLnBlcmNlbnRhZ2V9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFxRVU7QUFyRVYsU0FBZ0IsZ0JBQWdCO0FBQ2hDO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE9BRUs7QUFDUDtBQUFBLEVBQ0U7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxPQUdLO0FBQ1AsU0FBUywwQkFBMEI7QUFPNUIsYUFBTSxtQkFBb0QsQ0FBQyxFQUFFLGNBQWMsTUFBTTtBQUN0RixRQUFNLENBQUMsV0FBVyxZQUFZLElBQUksU0FBK0IsS0FBSztBQUN0RSxRQUFNLENBQUMsY0FBYyxlQUFlLElBQUksU0FBUyxFQUFFO0FBR25ELFFBQU0sU0FBUyxDQUFDLFdBQVcsV0FBVyxXQUFXLFNBQVM7QUFFMUQsUUFBTSxxQkFBcUI7QUFBQSxJQUN6QixFQUFFLE1BQU0saUNBQWlDLE9BQU8sSUFBSSxPQUFPLFVBQVU7QUFBQSxJQUNyRSxFQUFFLE1BQU0sd0JBQXdCLE9BQU8sSUFBSSxPQUFPLFVBQVU7QUFBQSxJQUM1RCxFQUFFLE1BQU0sdUJBQXVCLE9BQU8sR0FBRyxPQUFPLFVBQVU7QUFBQSxJQUMxRCxFQUFFLE1BQU0sZ0JBQWdCLE9BQU8sR0FBRyxPQUFPLFVBQVU7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