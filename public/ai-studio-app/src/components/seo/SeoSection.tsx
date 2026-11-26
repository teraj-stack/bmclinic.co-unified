import __vite__cjsImport0_react_jsxDevRuntime from "/ai-studio-app/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=d886a827"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/ai-studio-app/node_modules/.vite/deps/react.js?v=d886a827"; const useState = __vite__cjsImport1_react["useState"];
import {
  Sparkles,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Globe,
  FileText,
  BarChart2,
  Copy,
  Check,
  ArrowRight,
  RefreshCw
} from "/ai-studio-app/node_modules/.vite/deps/lucide-react.js?v=5db40f83";
export const SeoSection = ({
  accessibility,
  onSendNotification
}) => {
  const [activeTab, setActiveTab] = useState("audit");
  const [targetUrl, setTargetUrl] = useState("https://firma-omnisuite.pl");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState({
    url: "https://firma-omnisuite.pl",
    score: 94,
    performanceScore: 96,
    mobileScore: 98,
    readabilityScore: 92,
    metaTitle: "OmniSuite Enterprise - Poczta, Zadania, Kalendarz, SEO & WCAG 2.1 AAA",
    metaTitleValid: true,
    metaDescription: "Profesjonalne narzędzie firmowe do zarzadzania pocztą, synchronizacji kalendarza, audytu SEO i generowania raportów PDF w trybie ciemnym wysokiego kontrastu.",
    metaDescriptionValid: true,
    sslSecure: true,
    h1Present: true,
    imageAltMissing: 0,
    keywords: [
      { keyword: "dostępność WCAG 2.1", count: 18, density: 3.4 },
      { keyword: "audyt SEO strony", count: 14, density: 2.8 },
      { keyword: "zarządzanie zadaniami", count: 12, density: 2.4 },
      { keyword: "bezpieczne 2FA", count: 9, density: 1.8 },
      { keyword: "raporty miesięczne PDF", count: 8, density: 1.6 }
    ],
    recommendations: [
      { priority: "high", title: "Dodaj mikrodane Schema.org / Organization", desc: "Wzbogacenie metadanych strukturalnych ułatwia wyszukiwarkom interpretację oferty firmy i podnosi CTR." },
      { priority: "medium", title: "Kompresja obrazów LCP do formatu WebP", desc: "Skraca czas pierwszego wyrenderowania treści do 180ms." },
      { priority: "low", title: "Ciągły audyt etykiet aria-label dla WCAG 2.1", desc: "System obecnie spełnia standardy WCAG AAA, zalecana kontrola przy aktualizacjach treści." }
    ],
    analyzedAt: "09:14"
  });
  const [originalContent, setOriginalContent] = useState(
    `Nasza firma dostarcza zaawansowany system do zarządzania pocztą elektroniczną i codziennymi zadaniami. Oferujemy pełną synchronizację z urządzeniami mobilnymi oraz wbudowany kalendarz firmowy. dbamy o wysoki kontrast i pełną dostępność dla użytkowników.`
  );
  const [targetKeywords, setTargetKeywords] = useState("audyt SEO, dostępność cyfrowa WCAG 2.1, wysoki kontrast");
  const [selectedTone, setSelectedTone] = useState("Profesjonalny i angażujący");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedResult, setOptimizedResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const handleRunAudit = async (e) => {
    e.preventDefault();
    if (!targetUrl) return;
    setIsAuditing(true);
    try {
      const res = await fetch("/api/seo/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl })
      });
      const data = await res.json();
      setAuditResult(data);
      onSendNotification("Audyt SEO Zakończony", `Wykonano analizę dla ${targetUrl}. Wynik SEO wynosi ${data.score}/100!`, "seo");
    } catch (err) {
      console.error("Error running SEO audit:", err);
    } finally {
      setIsAuditing(false);
    }
  };
  const handleRunOptimize = async (e) => {
    e.preventDefault();
    if (!originalContent) return;
    setIsOptimizing(true);
    try {
      const res = await fetch("/api/seo/optimize-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: originalContent,
          targetKeywords,
          tone: selectedTone
        })
      });
      const data = await res.json();
      setOptimizedResult(data);
      onSendNotification("Treść Zoptymalizowana", "Gemini AI ukończyło optymalizację wpisu pod kątem wyszukiwarek i słów kluczowych.", "seo");
    } catch (err) {
      console.error("Error optimizing content:", err);
    } finally {
      setIsOptimizing(false);
    }
  };
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold tracking-tight", children: "Audyt SEO & Optymalizator Treści (AI Engine)" }, void 0, false, {
          fileName: "/app/applet/src/components/seo/SeoSection.tsx",
          lineNumber: 136,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400", children: "Analizuj pozycje strony firmowej, sprawdzaj meta tagi i ulepszaj artykuły z asystą Gemini AI" }, void 0, false, {
          fileName: "/app/applet/src/components/seo/SeoSection.tsx",
          lineNumber: 137,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/seo/SeoSection.tsx",
        lineNumber: 135,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("audit"),
            className: `px-4 py-2 rounded-lg transition-all ${activeTab === "audit" ? accessibility.highContrast ? "bg-yellow-400 text-black font-bold" : "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-white"}`,
            children: "Audyt SEO Strony"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 141,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("optimizer"),
            className: `px-4 py-2 rounded-lg transition-all ${activeTab === "optimizer" ? accessibility.highContrast ? "bg-yellow-400 text-black font-bold" : "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-white"}`,
            children: "Optymalizator Treści (AI)"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 151,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/seo/SeoSection.tsx",
        lineNumber: 140,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/seo/SeoSection.tsx",
      lineNumber: 134,
      columnNumber: 7
    }, this),
    activeTab === "audit" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxDEV("form", { onSubmit: handleRunAudit, className: "bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "relative flex-1 w-full", children: [
          /* @__PURE__ */ jsxDEV(Globe, { className: "w-4 h-4 absolute left-3 top-3 text-slate-400" }, void 0, false, {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 171,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "url",
              required: true,
              value: targetUrl,
              onChange: (e) => setTargetUrl(e.target.value),
              placeholder: "https://twoja-strona-firmowa.pl",
              className: "w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 172,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/seo/SeoSection.tsx",
          lineNumber: 170,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "submit",
            disabled: isAuditing,
            className: `w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${accessibility.highContrast ? "bg-yellow-400 text-black ring-2 ring-yellow-300" : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/40"}`,
            children: [
              /* @__PURE__ */ jsxDEV(RefreshCw, { className: `w-4 h-4 ${isAuditing ? "animate-spin" : ""}` }, void 0, false, {
                fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                lineNumber: 191,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: isAuditing ? "Analizuję Stronę..." : "Uruchom Audyt SEO" }, void 0, false, {
                fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                lineNumber: 192,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 182,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/seo/SeoSection.tsx",
        lineNumber: 169,
        columnNumber: 11
      }, this),
      auditResult && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center space-y-1", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 uppercase tracking-wider font-semibold", children: "Ogólny Wynik SEO" }, void 0, false, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 203,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-3xl font-black text-emerald-400", children: [
              auditResult.score,
              "/100"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 204,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-500", children: "Zgodność z wytycznymi Google" }, void 0, false, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 205,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 202,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center space-y-1", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 uppercase tracking-wider font-semibold", children: "Wydajność & Ładowanie" }, void 0, false, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 209,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-3xl font-black text-indigo-400", children: [
              auditResult.performanceScore,
              "/100"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 210,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-500", children: "Core Web Vitals" }, void 0, false, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 211,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 208,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center space-y-1", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 uppercase tracking-wider font-semibold", children: "Wersja Mobilna" }, void 0, false, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 215,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-3xl font-black text-cyan-400", children: [
              auditResult.mobileScore,
              "/100"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 216,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-500", children: "Mobile-First Indexing" }, void 0, false, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 217,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 214,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center space-y-1", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 uppercase tracking-wider font-semibold", children: "Czytelność & WCAG" }, void 0, false, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 221,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-3xl font-black text-amber-400", children: [
              auditResult.readabilityScore,
              "/100"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 222,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-500", children: "Indeks WCAG 2.1 AAA" }, void 0, false, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 223,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 220,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/seo/SeoSection.tsx",
          lineNumber: 200,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-6 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3", children: [
              /* @__PURE__ */ jsxDEV(FileText, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
                fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                lineNumber: 234,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Weryfikacja Meta Tagów i Bezpieczeństwa" }, void 0, false, {
                fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                lineNumber: 235,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 233,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 text-xs", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-slate-800/60 rounded-xl space-y-1 border border-slate-700/60", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-semibold text-slate-200", children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "Meta Title (Tytuł Strony)" }, void 0, false, {
                    fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                    lineNumber: 242,
                    columnNumber: 25
                  }, this),
                  auditResult.metaTitleValid ? /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 flex items-center gap-1 text-[11px]", children: [
                    /* @__PURE__ */ jsxDEV(CheckCircle, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                      lineNumber: 245,
                      columnNumber: 29
                    }, this),
                    " Prawidłowy (58 zn.)"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                    lineNumber: 244,
                    columnNumber: 27
                  }, this) : /* @__PURE__ */ jsxDEV("span", { className: "text-amber-400 flex items-center gap-1 text-[11px]", children: [
                    /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                      lineNumber: 249,
                      columnNumber: 29
                    }, this),
                    " Za długi"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                    lineNumber: 248,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                  lineNumber: 241,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 leading-relaxed italic", children: auditResult.metaTitle }, void 0, false, {
                  fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                  lineNumber: 253,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                lineNumber: 240,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-slate-800/60 rounded-xl space-y-1 border border-slate-700/60", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-semibold text-slate-200", children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "Meta Description (Opis w Google)" }, void 0, false, {
                    fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                    lineNumber: 258,
                    columnNumber: 25
                  }, this),
                  auditResult.metaDescriptionValid ? /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 flex items-center gap-1 text-[11px]", children: [
                    /* @__PURE__ */ jsxDEV(CheckCircle, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                      lineNumber: 261,
                      columnNumber: 29
                    }, this),
                    " Prawidłowy (142 zn.)"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                    lineNumber: 260,
                    columnNumber: 27
                  }, this) : /* @__PURE__ */ jsxDEV("span", { className: "text-rose-400 flex items-center gap-1 text-[11px]", children: [
                    /* @__PURE__ */ jsxDEV(XCircle, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                      lineNumber: 265,
                      columnNumber: 29
                    }, this),
                    " Brak opisu"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                    lineNumber: 264,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                  lineNumber: 257,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 leading-relaxed italic", children: auditResult.metaDescription }, void 0, false, {
                  fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                  lineNumber: 269,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                lineNumber: 256,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-3 gap-2 text-center text-[11px]", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "p-2 bg-slate-800 rounded-xl border border-slate-700", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "block text-slate-400 text-[10px]", children: "Certyfikat SSL" }, void 0, false, {
                    fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                    lineNumber: 274,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-emerald-400", children: "HTTPS Aktywny" }, void 0, false, {
                    fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                    lineNumber: 275,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                  lineNumber: 273,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "p-2 bg-slate-800 rounded-xl border border-slate-700", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "block text-slate-400 text-[10px]", children: "Nagłówek H1" }, void 0, false, {
                    fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                    lineNumber: 278,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-emerald-400", children: "Obecny" }, void 0, false, {
                    fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                    lineNumber: 279,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                  lineNumber: 277,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "p-2 bg-slate-800 rounded-xl border border-slate-700", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "block text-slate-400 text-[10px]", children: "Brakujące ALT" }, void 0, false, {
                    fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                    lineNumber: 282,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-emerald-400", children: "0 obrazów" }, void 0, false, {
                    fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                    lineNumber: 283,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                  lineNumber: 281,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                lineNumber: 272,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 238,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 232,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-6 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3", children: [
              /* @__PURE__ */ jsxDEV(BarChart2, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
                fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                lineNumber: 293,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Gęstość Słów Kluczowych & Rekomendacje" }, void 0, false, {
                fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                lineNumber: 294,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 292,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-semibold text-slate-300", children: "Słowa Kluczowe w Treści:" }, void 0, false, {
                fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                lineNumber: 298,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5", children: auditResult.keywords.map((kw, i) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs p-2 bg-slate-800/60 rounded-lg", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "font-medium text-slate-200", children: kw.keyword }, void 0, false, {
                  fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                  lineNumber: 302,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 text-slate-400 text-[11px]", children: [
                  /* @__PURE__ */ jsxDEV("span", { children: [
                    kw.count,
                    " wystąpień"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                    lineNumber: 304,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 bg-indigo-500/20 text-indigo-300 font-bold rounded", children: [
                    kw.density,
                    "%"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                    lineNumber: 305,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                  lineNumber: 303,
                  columnNumber: 27
                }, this)
              ] }, i, true, {
                fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                lineNumber: 301,
                columnNumber: 25
              }, this)) }, void 0, false, {
                fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                lineNumber: 299,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-slate-800", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-semibold text-slate-300 mb-2", children: "Praktyczne Rekomendacje SEO:" }, void 0, false, {
                  fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                  lineNumber: 314,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: auditResult.recommendations.map((rec, idx) => /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 bg-slate-800/80 rounded-xl border border-slate-700 text-xs space-y-1", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-bold text-slate-200", children: [
                    /* @__PURE__ */ jsxDEV("span", { children: rec.title }, void 0, false, {
                      fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                      lineNumber: 319,
                      columnNumber: 31
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: `text-[10px] px-2 py-0.5 rounded-full uppercase ${rec.priority === "high" ? "bg-rose-500/20 text-rose-300" : "bg-amber-500/20 text-amber-300"}`, children: [
                      "Priorytet: ",
                      rec.priority
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                      lineNumber: 320,
                      columnNumber: 31
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                    lineNumber: 318,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 leading-relaxed", children: rec.desc }, void 0, false, {
                    fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                    lineNumber: 326,
                    columnNumber: 29
                  }, this)
                ] }, idx, true, {
                  fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                  lineNumber: 317,
                  columnNumber: 27
                }, this)) }, void 0, false, {
                  fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                  lineNumber: 315,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                lineNumber: 313,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 297,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 291,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/seo/SeoSection.tsx",
          lineNumber: 229,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/seo/SeoSection.tsx",
        lineNumber: 197,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/seo/SeoSection.tsx",
      lineNumber: 166,
      columnNumber: 9
    }, this),
    activeTab === "optimizer" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxDEV("form", { onSubmit: handleRunOptimize, className: "bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-sm font-bold text-white border-b border-slate-800 pb-3", children: [
          /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-5 h-5 text-indigo-400" }, void 0, false, {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 349,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Optymalizuj Treść dla Wyszukiwarek Internetowych" }, void 0, false, {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 350,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/seo/SeoSection.tsx",
          lineNumber: 348,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "Docelowe Słowa Kluczowe (oddziel przecinkami):" }, void 0, false, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 355,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                required: true,
                value: targetKeywords,
                onChange: (e) => setTargetKeywords(e.target.value),
                className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                lineNumber: 356,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 354,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "Ton i Styl Wypowiedzi:" }, void 0, false, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 366,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              "select",
              {
                value: selectedTone,
                onChange: (e) => setSelectedTone(e.target.value),
                className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500",
                children: [
                  /* @__PURE__ */ jsxDEV("option", { value: "Profesjonalny i angażujący", children: "Profesjonalny i angażujący" }, void 0, false, {
                    fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                    lineNumber: 372,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "Techniczny i ekspercki", children: "Techniczny i ekspercki" }, void 0, false, {
                    fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                    lineNumber: 373,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "Przystępny i edukacyjny", children: "Przystępny i edukacyjny" }, void 0, false, {
                    fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                    lineNumber: 374,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "Perswazyjny sprzedażowy", children: "Perswazyjny sprzedażowy" }, void 0, false, {
                    fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                    lineNumber: 375,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                lineNumber: 367,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 365,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/seo/SeoSection.tsx",
          lineNumber: 353,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "Oryginalny Tekst Artykułu / Strony:" }, void 0, false, {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 381,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "textarea",
            {
              rows: 5,
              required: true,
              value: originalContent,
              onChange: (e) => setOriginalContent(e.target.value),
              placeholder: "Wklej tutaj treść artykułu lub opisu oferty...",
              className: "w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 382,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/seo/SeoSection.tsx",
          lineNumber: 380,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "submit",
            disabled: isOptimizing,
            className: `px-6 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${accessibility.highContrast ? "bg-yellow-400 text-black ring-2 ring-yellow-300" : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/40"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Sparkles, { className: `w-4 h-4 ${isOptimizing ? "animate-spin" : ""}` }, void 0, false, {
                fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                lineNumber: 401,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: isOptimizing ? "Optymalizuję Treść w Gemini AI..." : "Przeprowadź Optymalizację SEO z AI" }, void 0, false, {
                fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                lineNumber: 402,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 392,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/seo/SeoSection.tsx",
        lineNumber: 347,
        columnNumber: 11
      }, this),
      optimizedResult && /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(CheckCircle, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 412,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Wynik Optymalizacji SEO z Gemini AI" }, void 0, false, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 413,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 411,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => copyToClipboard(optimizedResult.optimizedContent),
              className: "px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5",
              children: [
                copied ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                  lineNumber: 420,
                  columnNumber: 29
                }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                  lineNumber: 420,
                  columnNumber: 82
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: copied ? "Skopiowano!" : "Kopiuj Treść HTML" }, void 0, false, {
                  fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                  lineNumber: 421,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 416,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/seo/SeoSection.tsx",
          lineNumber: 410,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-indigo-950/30 border border-indigo-500/30 rounded-xl space-y-2 text-xs", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-indigo-300", children: "Zaproponowany Tytuł i Meta Opis dla Wyszukiwarki:" }, void 0, false, {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 427,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-white font-semibold", children: optimizedResult.suggestedTitle }, void 0, false, {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 428,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-slate-300 italic", children: optimizedResult.metaDescription }, void 0, false, {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 429,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/seo/SeoSection.tsx",
          lineNumber: 426,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-xs", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-slate-400 uppercase tracking-wider text-[11px]", children: "Przed (Oryginał)" }, void 0, false, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 436,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-slate-800/50 border border-slate-800 rounded-xl text-slate-400 leading-relaxed min-h-[160px]", children: originalContent }, void 0, false, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 437,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 435,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-emerald-400 uppercase tracking-wider text-[11px]", children: "Po (Zoptymalizowana Treść)" }, void 0, false, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 443,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: "p-3 bg-slate-800 border border-emerald-500/30 rounded-xl text-slate-100 leading-relaxed min-h-[160px] prose prose-invert prose-xs max-w-none",
                dangerouslySetInnerHTML: { __html: optimizedResult.optimizedContent }
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/seo/SeoSection.tsx",
                lineNumber: 444,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 442,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/seo/SeoSection.tsx",
          lineNumber: 433,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-slate-800 space-y-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-semibold text-slate-300", children: "Zrealizowane Ulepszenia SEO:" }, void 0, false, {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 454,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("ul", { className: "space-y-1 text-xs text-slate-400", children: optimizedResult.keyImprovements.map((imp, i) => /* @__PURE__ */ jsxDEV("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(ArrowRight, { className: "w-3.5 h-3.5 text-emerald-400 flex-shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 458,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: imp }, void 0, false, {
              fileName: "/app/applet/src/components/seo/SeoSection.tsx",
              lineNumber: 459,
              columnNumber: 23
            }, this)
          ] }, i, true, {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 457,
            columnNumber: 21
          }, this)) }, void 0, false, {
            fileName: "/app/applet/src/components/seo/SeoSection.tsx",
            lineNumber: 455,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/seo/SeoSection.tsx",
          lineNumber: 453,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/seo/SeoSection.tsx",
        lineNumber: 408,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/seo/SeoSection.tsx",
      lineNumber: 345,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/seo/SeoSection.tsx",
    lineNumber: 131,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlb1NlY3Rpb24udHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBTZWFyY2gsIFxuICBTcGFya2xlcywgXG4gIENoZWNrQ2lyY2xlLCBcbiAgWENpcmNsZSwgXG4gIEFsZXJ0VHJpYW5nbGUsIFxuICBHbG9iZSwgXG4gIEZpbGVUZXh0LCBcbiAgWmFwLCBcbiAgU21hcnRwaG9uZSwgXG4gIEJhckNoYXJ0MiwgXG4gIENvcHksIFxuICBDaGVjaywgXG4gIEFycm93UmlnaHQsXG4gIFJlZnJlc2hDdyBcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IFNFT0F1ZGl0UmVzdWx0LCBBY2Nlc3NpYmlsaXR5U2V0dGluZ3MgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5cbmludGVyZmFjZSBTZW9TZWN0aW9uUHJvcHMge1xuICBhY2Nlc3NpYmlsaXR5OiBBY2Nlc3NpYmlsaXR5U2V0dGluZ3M7XG4gIG9uU2VuZE5vdGlmaWNhdGlvbjogKHRpdGxlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgdHlwZTogJ3NlbycpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBTZW9TZWN0aW9uOiBSZWFjdC5GQzxTZW9TZWN0aW9uUHJvcHM+ID0gKHtcbiAgYWNjZXNzaWJpbGl0eSxcbiAgb25TZW5kTm90aWZpY2F0aW9uLFxufSkgPT4ge1xuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGU8J2F1ZGl0JyB8ICdvcHRpbWl6ZXInPignYXVkaXQnKTtcbiAgXG4gIC8vIEF1ZGl0IHN0YXRlXG4gIGNvbnN0IFt0YXJnZXRVcmwsIHNldFRhcmdldFVybF0gPSB1c2VTdGF0ZSgnaHR0cHM6Ly9maXJtYS1vbW5pc3VpdGUucGwnKTtcbiAgY29uc3QgW2lzQXVkaXRpbmcsIHNldElzQXVkaXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYXVkaXRSZXN1bHQsIHNldEF1ZGl0UmVzdWx0XSA9IHVzZVN0YXRlPFNFT0F1ZGl0UmVzdWx0IHwgbnVsbD4oe1xuICAgIHVybDogJ2h0dHBzOi8vZmlybWEtb21uaXN1aXRlLnBsJyxcbiAgICBzY29yZTogOTQsXG4gICAgcGVyZm9ybWFuY2VTY29yZTogOTYsXG4gICAgbW9iaWxlU2NvcmU6IDk4LFxuICAgIHJlYWRhYmlsaXR5U2NvcmU6IDkyLFxuICAgIG1ldGFUaXRsZTogJ09tbmlTdWl0ZSBFbnRlcnByaXNlIC0gUG9jenRhLCBaYWRhbmlhLCBLYWxlbmRhcnosIFNFTyAmIFdDQUcgMi4xIEFBQScsXG4gICAgbWV0YVRpdGxlVmFsaWQ6IHRydWUsXG4gICAgbWV0YURlc2NyaXB0aW9uOiAnUHJvZmVzam9uYWxuZSBuYXJ6xJlkemllIGZpcm1vd2UgZG8gemFyemFkemFuaWEgcG9jenTEhSwgc3luY2hyb25pemFjamkga2FsZW5kYXJ6YSwgYXVkeXR1IFNFTyBpIGdlbmVyb3dhbmlhIHJhcG9ydMOzdyBQREYgdyB0cnliaWUgY2llbW55bSB3eXNva2llZ28ga29udHJhc3R1LicsXG4gICAgbWV0YURlc2NyaXB0aW9uVmFsaWQ6IHRydWUsXG4gICAgc3NsU2VjdXJlOiB0cnVlLFxuICAgIGgxUHJlc2VudDogdHJ1ZSxcbiAgICBpbWFnZUFsdE1pc3Npbmc6IDAsXG4gICAga2V5d29yZHM6IFtcbiAgICAgIHsga2V5d29yZDogJ2Rvc3TEmXBub8WbxIcgV0NBRyAyLjEnLCBjb3VudDogMTgsIGRlbnNpdHk6IDMuNCB9LFxuICAgICAgeyBrZXl3b3JkOiAnYXVkeXQgU0VPIHN0cm9ueScsIGNvdW50OiAxNCwgZGVuc2l0eTogMi44IH0sXG4gICAgICB7IGtleXdvcmQ6ICd6YXJ6xIVkemFuaWUgemFkYW5pYW1pJywgY291bnQ6IDEyLCBkZW5zaXR5OiAyLjQgfSxcbiAgICAgIHsga2V5d29yZDogJ2JlenBpZWN6bmUgMkZBJywgY291bnQ6IDksIGRlbnNpdHk6IDEuOCB9LFxuICAgICAgeyBrZXl3b3JkOiAncmFwb3J0eSBtaWVzacSZY3puZSBQREYnLCBjb3VudDogOCwgZGVuc2l0eTogMS42IH0sXG4gICAgXSxcbiAgICByZWNvbW1lbmRhdGlvbnM6IFtcbiAgICAgIHsgcHJpb3JpdHk6ICdoaWdoJywgdGl0bGU6ICdEb2RhaiBtaWtyb2RhbmUgU2NoZW1hLm9yZyAvIE9yZ2FuaXphdGlvbicsIGRlc2M6ICdXemJvZ2FjZW5pZSBtZXRhZGFueWNoIHN0cnVrdHVyYWxueWNoIHXFgmF0d2lhIHd5c3p1a2l3YXJrb20gaW50ZXJwcmV0YWNqxJkgb2ZlcnR5IGZpcm15IGkgcG9kbm9zaSBDVFIuJyB9LFxuICAgICAgeyBwcmlvcml0eTogJ21lZGl1bScsIHRpdGxlOiAnS29tcHJlc2phIG9icmF6w7N3IExDUCBkbyBmb3JtYXR1IFdlYlAnLCBkZXNjOiAnU2tyYWNhIGN6YXMgcGllcndzemVnbyB3eXJlbmRlcm93YW5pYSB0cmXFm2NpIGRvIDE4MG1zLicgfSxcbiAgICAgIHsgcHJpb3JpdHk6ICdsb3cnLCB0aXRsZTogJ0NpxIVnxYJ5IGF1ZHl0IGV0eWtpZXQgYXJpYS1sYWJlbCBkbGEgV0NBRyAyLjEnLCBkZXNjOiAnU3lzdGVtIG9iZWNuaWUgc3BlxYJuaWEgc3RhbmRhcmR5IFdDQUcgQUFBLCB6YWxlY2FuYSBrb250cm9sYSBwcnp5IGFrdHVhbGl6YWNqYWNoIHRyZcWbY2kuJyB9LFxuICAgIF0sXG4gICAgYW5hbHl6ZWRBdDogJzA5OjE0JyxcbiAgfSk7XG5cbiAgLy8gT3B0aW1pemVyIHN0YXRlXG4gIGNvbnN0IFtvcmlnaW5hbENvbnRlbnQsIHNldE9yaWdpbmFsQ29udGVudF0gPSB1c2VTdGF0ZShcbiAgICBgTmFzemEgZmlybWEgZG9zdGFyY3phIHphYXdhbnNvd2FueSBzeXN0ZW0gZG8gemFyesSFZHphbmlhIHBvY3p0xIUgZWxla3Ryb25pY3puxIUgaSBjb2R6aWVubnltaSB6YWRhbmlhbWkuIE9mZXJ1amVteSBwZcWCbsSFIHN5bmNocm9uaXphY2rEmSB6IHVyesSFZHplbmlhbWkgbW9iaWxueW1pIG9yYXogd2J1ZG93YW55IGthbGVuZGFyeiBmaXJtb3d5LiBkYmFteSBvIHd5c29raSBrb250cmFzdCBpIHBlxYJuxIUgZG9zdMSZcG5vxZvEhyBkbGEgdcW8eXRrb3duaWvDs3cuYFxuICApO1xuICBjb25zdCBbdGFyZ2V0S2V5d29yZHMsIHNldFRhcmdldEtleXdvcmRzXSA9IHVzZVN0YXRlKCdhdWR5dCBTRU8sIGRvc3TEmXBub8WbxIcgY3lmcm93YSBXQ0FHIDIuMSwgd3lzb2tpIGtvbnRyYXN0Jyk7XG4gIGNvbnN0IFtzZWxlY3RlZFRvbmUsIHNldFNlbGVjdGVkVG9uZV0gPSB1c2VTdGF0ZSgnUHJvZmVzam9uYWxueSBpIGFuZ2HFvHVqxIVjeScpO1xuICBjb25zdCBbaXNPcHRpbWl6aW5nLCBzZXRJc09wdGltaXppbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbb3B0aW1pemVkUmVzdWx0LCBzZXRPcHRpbWl6ZWRSZXN1bHRdID0gdXNlU3RhdGU8e1xuICAgIG9wdGltaXplZENvbnRlbnQ6IHN0cmluZztcbiAgICBzdWdnZXN0ZWRUaXRsZTogc3RyaW5nO1xuICAgIG1ldGFEZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGtleUltcHJvdmVtZW50czogc3RyaW5nW107XG4gIH0gfCBudWxsPihudWxsKTtcblxuICBjb25zdCBbY29waWVkLCBzZXRDb3BpZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGhhbmRsZVJ1bkF1ZGl0ID0gYXN5bmMgKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoIXRhcmdldFVybCkgcmV0dXJuO1xuXG4gICAgc2V0SXNBdWRpdGluZyh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJy9hcGkvc2VvL2FuYWx5emUnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB1cmw6IHRhcmdldFVybCB9KSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gICAgICBzZXRBdWRpdFJlc3VsdChkYXRhKTtcbiAgICAgIG9uU2VuZE5vdGlmaWNhdGlvbignQXVkeXQgU0VPIFpha2/FhGN6b255JywgYFd5a29uYW5vIGFuYWxpesSZIGRsYSAke3RhcmdldFVybH0uIFd5bmlrIFNFTyB3eW5vc2kgJHtkYXRhLnNjb3JlfS8xMDAhYCwgJ3NlbycpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgcnVubmluZyBTRU8gYXVkaXQ6JywgZXJyKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0SXNBdWRpdGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJ1bk9wdGltaXplID0gYXN5bmMgKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoIW9yaWdpbmFsQ29udGVudCkgcmV0dXJuO1xuXG4gICAgc2V0SXNPcHRpbWl6aW5nKHRydWUpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL2FwaS9zZW8vb3B0aW1pemUtY29udGVudCcsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgY29udGVudDogb3JpZ2luYWxDb250ZW50LFxuICAgICAgICAgIHRhcmdldEtleXdvcmRzLFxuICAgICAgICAgIHRvbmU6IHNlbGVjdGVkVG9uZSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuICAgICAgc2V0T3B0aW1pemVkUmVzdWx0KGRhdGEpO1xuICAgICAgb25TZW5kTm90aWZpY2F0aW9uKCdUcmXFm8SHIFpvcHR5bWFsaXpvd2FuYScsICdHZW1pbmkgQUkgdWtvxYRjennFgm8gb3B0eW1hbGl6YWNqxJkgd3Bpc3UgcG9kIGvEhXRlbSB3eXN6dWtpd2FyZWsgaSBzxYLDs3cga2x1Y3pvd3ljaC4nLCAnc2VvJyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBvcHRpbWl6aW5nIGNvbnRlbnQ6JywgZXJyKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0SXNPcHRpbWl6aW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY29weVRvQ2xpcGJvYXJkID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHRleHQpO1xuICAgIHNldENvcGllZCh0cnVlKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldENvcGllZChmYWxzZSksIDIwMDApO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgIFxuICAgICAgey8qIEhlYWRlciAmIFN1Yi10YWJzICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdHJhY2tpbmctdGlnaHRcIj5BdWR5dCBTRU8gJiBPcHR5bWFsaXphdG9yIFRyZcWbY2kgKEFJIEVuZ2luZSk8L2gyPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj5BbmFsaXp1aiBwb3p5Y2plIHN0cm9ueSBmaXJtb3dlaiwgc3ByYXdkemFqIG1ldGEgdGFnaSBpIHVsZXBzemFqIGFydHlrdcWCeSB6IGFzeXN0xIUgR2VtaW5pIEFJPC9wPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggYmctc2xhdGUtOTAwIHAtMSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQteHMgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignYXVkaXQnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLWxnIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ2F1ZGl0J1xuICAgICAgICAgICAgICAgID8gKGFjY2Vzc2liaWxpdHkuaGlnaENvbnRyYXN0ID8gJ2JnLXllbGxvdy00MDAgdGV4dC1ibGFjayBmb250LWJvbGQnIDogJ2JnLWluZGlnby02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbWQnKVxuICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBBdWR5dCBTRU8gU3Ryb255XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdvcHRpbWl6ZXInKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLWxnIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ29wdGltaXplcidcbiAgICAgICAgICAgICAgICA/IChhY2Nlc3NpYmlsaXR5LmhpZ2hDb250cmFzdCA/ICdiZy15ZWxsb3ctNDAwIHRleHQtYmxhY2sgZm9udC1ib2xkJyA6ICdiZy1pbmRpZ28tNjAwIHRleHQtd2hpdGUgc2hhZG93LW1kJylcbiAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgT3B0eW1hbGl6YXRvciBUcmXFm2NpIChBSSlcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFRhYiAxOiBTRU8gV2Vic2l0ZSBBdWRpdCAqL31cbiAgICAgIHthY3RpdmVUYWIgPT09ICdhdWRpdCcgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgICAgIFxuICAgICAgICAgIHsvKiBVUkwgU2VhcmNoIEJhciAqL31cbiAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlUnVuQXVkaXR9IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBwLTQgcm91bmRlZC0yeGwgZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgZmxleC0xIHctZnVsbFwiPlxuICAgICAgICAgICAgICA8R2xvYmUgY2xhc3NOYW1lPVwidy00IGgtNCBhYnNvbHV0ZSBsZWZ0LTMgdG9wLTMgdGV4dC1zbGF0ZS00MDBcIiAvPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwidXJsXCJcbiAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgIHZhbHVlPXt0YXJnZXRVcmx9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0VGFyZ2V0VXJsKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cImh0dHBzOi8vdHdvamEtc3Ryb25hLWZpcm1vd2EucGxcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC14bCBwbC05IHByLTMgcHktMi41IHRleHQteHMgdGV4dC13aGl0ZSBwbGFjZWhvbGRlci1zbGF0ZS00MDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWluZGlnby01MDBcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0F1ZGl0aW5nfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgc206dy1hdXRvIHB4LTYgcHktMi41IHJvdW5kZWQteGwgdGV4dC14cyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICBhY2Nlc3NpYmlsaXR5LmhpZ2hDb250cmFzdFxuICAgICAgICAgICAgICAgICAgPyAnYmcteWVsbG93LTQwMCB0ZXh0LWJsYWNrIHJpbmctMiByaW5nLXllbGxvdy0zMDAnXG4gICAgICAgICAgICAgICAgICA6ICdiZy1pbmRpZ28tNjAwIGhvdmVyOmJnLWluZGlnby01MDAgdGV4dC13aGl0ZSBzaGFkb3ctbGcgc2hhZG93LWluZGlnby05MDAvNDAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8UmVmcmVzaEN3IGNsYXNzTmFtZT17YHctNCBoLTQgJHtpc0F1ZGl0aW5nID8gJ2FuaW1hdGUtc3BpbicgOiAnJ31gfSAvPlxuICAgICAgICAgICAgICA8c3Bhbj57aXNBdWRpdGluZyA/ICdBbmFsaXp1asSZIFN0cm9uxJkuLi4nIDogJ1VydWNob20gQXVkeXQgU0VPJ308L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Zvcm0+XG5cbiAgICAgICAgICB7YXVkaXRSZXN1bHQgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHsvKiBUb3AgU2NvcmUgQ2FyZHMgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBtZDpncmlkLWNvbHMtNCBnYXAtNFwiPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHAtNCByb3VuZGVkLTJ4bCB0ZXh0LWNlbnRlciBzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBmb250LXNlbWlib2xkXCI+T2fDs2xueSBXeW5payBTRU88L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtM3hsIGZvbnQtYmxhY2sgdGV4dC1lbWVyYWxkLTQwMFwiPnthdWRpdFJlc3VsdC5zY29yZX0vMTAwPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMFwiPlpnb2Rub8WbxIcgeiB3eXR5Y3pueW1pIEdvb2dsZTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHAtNCByb3VuZGVkLTJ4bCB0ZXh0LWNlbnRlciBzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBmb250LXNlbWlib2xkXCI+V3lkYWpub8WbxIcgJiDFgWFkb3dhbmllPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBmb250LWJsYWNrIHRleHQtaW5kaWdvLTQwMFwiPnthdWRpdFJlc3VsdC5wZXJmb3JtYW5jZVNjb3JlfS8xMDA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwXCI+Q29yZSBXZWIgVml0YWxzPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcC00IHJvdW5kZWQtMnhsIHRleHQtY2VudGVyIHNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGZvbnQtc2VtaWJvbGRcIj5XZXJzamEgTW9iaWxuYTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0zeGwgZm9udC1ibGFjayB0ZXh0LWN5YW4tNDAwXCI+e2F1ZGl0UmVzdWx0Lm1vYmlsZVNjb3JlfS8xMDA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwXCI+TW9iaWxlLUZpcnN0IEluZGV4aW5nPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcC00IHJvdW5kZWQtMnhsIHRleHQtY2VudGVyIHNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGZvbnQtc2VtaWJvbGRcIj5Denl0ZWxub8WbxIcgJiBXQ0FHPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBmb250LWJsYWNrIHRleHQtYW1iZXItNDAwXCI+e2F1ZGl0UmVzdWx0LnJlYWRhYmlsaXR5U2NvcmV9LzEwMDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDBcIj5JbmRla3MgV0NBRyAyLjEgQUFBPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBBdWRpdCBEZXRhaWxzICYgTWV0YSBDaGVja3MgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMTIgZ2FwLTZcIj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB7LyogTWV0YSBDaGVja3MgTGVmdCAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTYgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHAtNSByb3VuZGVkLTJ4bCBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItM1wiPlxuICAgICAgICAgICAgICAgICAgICA8RmlsZVRleHQgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5XZXJ5ZmlrYWNqYSBNZXRhIFRhZ8OzdyBpIEJlenBpZWN6ZcWEc3R3YTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvaDM+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIGJnLXNsYXRlLTgwMC82MCByb3VuZGVkLXhsIHNwYWNlLXktMSBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMC82MFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPk1ldGEgVGl0bGUgKFR5dHXFgiBTdHJvbnkpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge2F1ZGl0UmVzdWx0Lm1ldGFUaXRsZVZhbGlkID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz4gUHJhd2lkxYJvd3kgKDU4IHpuLilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci00MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdGV4dC1bMTFweF1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWxlcnRUcmlhbmdsZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+IFphIGTFgnVnaVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGxlYWRpbmctcmVsYXhlZCBpdGFsaWNcIj57YXVkaXRSZXN1bHQubWV0YVRpdGxlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYmctc2xhdGUtODAwLzYwIHJvdW5kZWQteGwgc3BhY2UteS0xIGJvcmRlciBib3JkZXItc2xhdGUtNzAwLzYwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTIwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+TWV0YSBEZXNjcmlwdGlvbiAoT3BpcyB3IEdvb2dsZSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7YXVkaXRSZXN1bHQubWV0YURlc2NyaXB0aW9uVmFsaWQgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdGV4dC1bMTFweF1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPiBQcmF3aWTFgm93eSAoMTQyIHpuLilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1yb3NlLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0ZXh0LVsxMXB4XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxYQ2lyY2xlIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz4gQnJhayBvcGlzdVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGxlYWRpbmctcmVsYXhlZCBpdGFsaWNcIj57YXVkaXRSZXN1bHQubWV0YURlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0zIGdhcC0yIHRleHQtY2VudGVyIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgYmctc2xhdGUtODAwIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc2xhdGUtNDAwIHRleHQtWzEwcHhdXCI+Q2VydHlmaWthdCBTU0w8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1lbWVyYWxkLTQwMFwiPkhUVFBTIEFrdHl3bnk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgYmctc2xhdGUtODAwIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc2xhdGUtNDAwIHRleHQtWzEwcHhdXCI+TmFnxYLDs3dlayBIMTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWVtZXJhbGQtNDAwXCI+T2JlY255PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yIGJnLXNsYXRlLTgwMCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtNzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMHB4XVwiPkJyYWt1asSFY2UgQUxUPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtZW1lcmFsZC00MDBcIj4wIG9icmF6w7N3PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogS2V5d29yZCBEZW5zaXR5ICYgUmVjb21tZW5kYXRpb25zIFJpZ2h0ICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNiBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcC01IHJvdW5kZWQtMnhsIHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBwYi0zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxCYXJDaGFydDIgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5HxJlzdG/Fm8SHIFPFgsOzdyBLbHVjem93eWNoICYgUmVrb21lbmRhY2plPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9oMz5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0zMDBcIj5TxYJvd2EgS2x1Y3pvd2UgdyBUcmXFm2NpOjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAge2F1ZGl0UmVzdWx0LmtleXdvcmRzLm1hcCgoa3csIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyBwLTIgYmctc2xhdGUtODAwLzYwIHJvdW5kZWQtbGdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS0yMDBcIj57a3cua2V5d29yZH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC1zbGF0ZS00MDAgdGV4dC1bMTFweF1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57a3cuY291bnR9IHd5c3TEhXBpZcWEPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IGJnLWluZGlnby01MDAvMjAgdGV4dC1pbmRpZ28tMzAwIGZvbnQtYm9sZCByb3VuZGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7a3cuZGVuc2l0eX0lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMzAwIG1iLTJcIj5QcmFrdHljem5lIFJla29tZW5kYWNqZSBTRU86PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHthdWRpdFJlc3VsdC5yZWNvbW1lbmRhdGlvbnMubWFwKChyZWMsIGlkeCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aWR4fSBjbGFzc05hbWU9XCJwLTIuNSBiZy1zbGF0ZS04MDAvODAgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXhzIHNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTIwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3JlYy50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B0ZXh0LVsxMHB4XSBweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgdXBwZXJjYXNlICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYy5wcmlvcml0eSA9PT0gJ2hpZ2gnID8gJ2JnLXJvc2UtNTAwLzIwIHRleHQtcm9zZS0zMDAnIDogJ2JnLWFtYmVyLTUwMC8yMCB0ZXh0LWFtYmVyLTMwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJpb3J5dGV0OiB7cmVjLnByaW9yaXR5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGxlYWRpbmctcmVsYXhlZFwiPntyZWMuZGVzY308L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBUYWIgMjogQUkgQ29udGVudCBPcHRpbWl6ZXIgKi99XG4gICAgICB7YWN0aXZlVGFiID09PSAnb3B0aW1pemVyJyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICAgICAgXG4gICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVJ1bk9wdGltaXplfSBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcC01IHJvdW5kZWQtMnhsIHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItM1wiPlxuICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5PcHR5bWFsaXp1aiBUcmXFm8SHIGRsYSBXeXN6dWtpd2FyZWsgSW50ZXJuZXRvd3ljaDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMzAwIG1iLTFcIj5Eb2NlbG93ZSBTxYJvd2EgS2x1Y3pvd2UgKG9kZHppZWwgcHJ6ZWNpbmthbWkpOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3RhcmdldEtleXdvcmRzfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0VGFyZ2V0S2V5d29yZHMoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLXhsIHB4LTMgcHktMiB0ZXh0LXhzIHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWluZGlnby01MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+VG9uIGkgU3R5bCBXeXBvd2llZHppOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3NlbGVjdGVkVG9uZX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldFNlbGVjdGVkVG9uZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtODAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQteGwgcHgtMyBweS0yIHRleHQteHMgdGV4dC13aGl0ZSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctaW5kaWdvLTUwMFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlByb2Zlc2pvbmFsbnkgaSBhbmdhxbx1asSFY3lcIj5Qcm9mZXNqb25hbG55IGkgYW5nYcW8dWrEhWN5PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiVGVjaG5pY3pueSBpIGVrc3BlcmNraVwiPlRlY2huaWN6bnkgaSBla3NwZXJja2k8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJQcnp5c3TEmXBueSBpIGVkdWthY3lqbnlcIj5Qcnp5c3TEmXBueSBpIGVkdWthY3lqbnk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJQZXJzd2F6eWpueSBzcHJ6ZWRhxbxvd3lcIj5QZXJzd2F6eWpueSBzcHJ6ZWRhxbxvd3k8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+T3J5Z2luYWxueSBUZWtzdCBBcnR5a3XFgnUgLyBTdHJvbnk6PC9sYWJlbD5cbiAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgcm93cz17NX1cbiAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgIHZhbHVlPXtvcmlnaW5hbENvbnRlbnR9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0T3JpZ2luYWxDb250ZW50KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIldrbGVqIHR1dGFqIHRyZcWbxIcgYXJ0eWt1xYJ1IGx1YiBvcGlzdSBvZmVydHkuLi5cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC14bCBwLTMgdGV4dC14cyB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1pbmRpZ28tNTAwIGxlYWRpbmctcmVsYXhlZFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzT3B0aW1pemluZ31cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNiBweS0yLjUgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBzaGFkb3ctbGcgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICBhY2Nlc3NpYmlsaXR5LmhpZ2hDb250cmFzdFxuICAgICAgICAgICAgICAgICAgPyAnYmcteWVsbG93LTQwMCB0ZXh0LWJsYWNrIHJpbmctMiByaW5nLXllbGxvdy0zMDAnXG4gICAgICAgICAgICAgICAgICA6ICdiZy1pbmRpZ28tNjAwIGhvdmVyOmJnLWluZGlnby01MDAgdGV4dC13aGl0ZSBzaGFkb3ctaW5kaWdvLTkwMC80MCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9e2B3LTQgaC00ICR7aXNPcHRpbWl6aW5nID8gJ2FuaW1hdGUtc3BpbicgOiAnJ31gfSAvPlxuICAgICAgICAgICAgICA8c3Bhbj57aXNPcHRpbWl6aW5nID8gJ09wdHltYWxpenVqxJkgVHJlxZvEhyB3IEdlbWluaSBBSS4uLicgOiAnUHJ6ZXByb3dhZMW6IE9wdHltYWxpemFjasSZIFNFTyB6IEFJJ308L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Zvcm0+XG5cbiAgICAgICAgICB7LyogU2lkZS1ieS1zaWRlIFJlc3VsdCBjb21wYXJpc29uICovfVxuICAgICAgICAgIHtvcHRpbWl6ZWRSZXN1bHQgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcC01IHJvdW5kZWQtMnhsIHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBwYi0zXCI+XG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+V3luaWsgT3B0eW1hbGl6YWNqaSBTRU8geiBHZW1pbmkgQUk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9oMz5cblxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGNvcHlUb0NsaXBib2FyZChvcHRpbWl6ZWRSZXN1bHQub3B0aW1pemVkQ29udGVudCl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMjAwIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LXNlbWlib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtjb3BpZWQgPyA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+IDogPENvcHkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPn1cbiAgICAgICAgICAgICAgICAgIDxzcGFuPntjb3BpZWQgPyAnU2tvcGlvd2FubyEnIDogJ0tvcGl1aiBUcmXFm8SHIEhUTUwnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIFByb3Bvc2VkIE1ldGEgdGFncyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYmctaW5kaWdvLTk1MC8zMCBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvMzAgcm91bmRlZC14bCBzcGFjZS15LTIgdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtaW5kaWdvLTMwMFwiPlphcHJvcG9ub3dhbnkgVHl0dcWCIGkgTWV0YSBPcGlzIGRsYSBXeXN6dWtpd2Fya2k6PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIGZvbnQtc2VtaWJvbGRcIj57b3B0aW1pemVkUmVzdWx0LnN1Z2dlc3RlZFRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDAgaXRhbGljXCI+e29wdGltaXplZFJlc3VsdC5tZXRhRGVzY3JpcHRpb259PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBTaWRlLWJ5LXNpZGUgdmlldyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00IHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtWzExcHhdXCI+UHJ6ZWQgKE9yeWdpbmHFgik8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIGJnLXNsYXRlLTgwMC81MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHRleHQtc2xhdGUtNDAwIGxlYWRpbmctcmVsYXhlZCBtaW4taC1bMTYwcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgIHtvcmlnaW5hbENvbnRlbnR9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWVtZXJhbGQtNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LVsxMXB4XVwiPlBvIChab3B0eW1hbGl6b3dhbmEgVHJlxZvEhyk8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMyBiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC8zMCByb3VuZGVkLXhsIHRleHQtc2xhdGUtMTAwIGxlYWRpbmctcmVsYXhlZCBtaW4taC1bMTYwcHhdIHByb3NlIHByb3NlLWludmVydCBwcm9zZS14cyBtYXgtdy1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBvcHRpbWl6ZWRSZXN1bHQub3B0aW1pemVkQ29udGVudCB9fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogS2V5IEltcHJvdmVtZW50cyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0zMDBcIj5acmVhbGl6b3dhbmUgVWxlcHN6ZW5pYSBTRU86PC9kaXY+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInNwYWNlLXktMSB0ZXh0LXhzIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgICB7b3B0aW1pemVkUmVzdWx0LmtleUltcHJvdmVtZW50cy5tYXAoKGltcCwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8bGkga2V5PXtpfSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxBcnJvd1JpZ2h0IGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDAgZmxleC1zaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2ltcH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQXVJVTtBQXZJVixTQUFnQixnQkFBZ0I7QUFDaEM7QUFBQSxFQUVFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUdBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE9BQ0s7QUFRQSxhQUFNLGFBQXdDLENBQUM7QUFBQSxFQUNwRDtBQUFBLEVBQ0E7QUFDRixNQUFNO0FBQ0osUUFBTSxDQUFDLFdBQVcsWUFBWSxJQUFJLFNBQWdDLE9BQU87QUFHekUsUUFBTSxDQUFDLFdBQVcsWUFBWSxJQUFJLFNBQVMsNEJBQTRCO0FBQ3ZFLFFBQU0sQ0FBQyxZQUFZLGFBQWEsSUFBSSxTQUFTLEtBQUs7QUFDbEQsUUFBTSxDQUFDLGFBQWEsY0FBYyxJQUFJLFNBQWdDO0FBQUEsSUFDcEUsS0FBSztBQUFBLElBQ0wsT0FBTztBQUFBLElBQ1Asa0JBQWtCO0FBQUEsSUFDbEIsYUFBYTtBQUFBLElBQ2Isa0JBQWtCO0FBQUEsSUFDbEIs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