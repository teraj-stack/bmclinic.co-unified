import __vite__cjsImport0_react_jsxDevRuntime from "/ai-studio-app/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=d886a827"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/ai-studio-app/node_modules/.vite/deps/react.js?v=d886a827"; const useState = __vite__cjsImport1_react["useState"];
import {
  FileText,
  Mail,
  Sparkles,
  Printer,
  CheckCircle,
  TrendingUp,
  Share2,
  X,
  Send,
  ShieldCheck,
  BarChart
} from "/ai-studio-app/node_modules/.vite/deps/lucide-react.js?v=5db40f83";
export const ReportsSection = ({
  accessibility,
  onSendNotification
}) => {
  const [selectedMonth, setSelectedMonth] = useState("Lipiec 2026");
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState({
    periodName: "Lipiec 2026",
    executiveSummary: "W minionym miesiącu odnotowano wzrost całkowitego ruchu o 28.5% r/r przy jednoczesnym obniżeniu wskaźnika odrzuceń do poziomu 24.5%. Strona firmowa utrzymała najwyższy wynik wskaźnika dostępności cyfrowej WCAG 2.1 AAA oraz 100% poziom ochrony kont z 2FA.",
    keyHighlights: [
      "Rekordowa liczba unikalnych użytkowników: 17 020 sesji w skali miesiąca",
      "Wynik SEO strony firmowej: 94/100 (Google Search Indexing)",
      "Zrealizowano 98% zadań firmowych oraz zsynchronizowano kalendarz na 3 urządzeniach",
      "Aktywna dwuetapowa weryfikacja 2FA dla wszystkich kont użytkowników"
    ],
    strategicNextSteps: [
      "Dalsza automatyzacja publikacji artykułów zoptymalizowanych pod kątem słów kluczowych",
      "Uruchomienie cyklicznej wysyłki raportów miesięcznych w formacie PDF e-mailem do Zarządu"
    ]
  });
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("zarzad@firma-omnisuite.pl");
  const [emailNotes, setEmailNotes] = useState("Przesyłam oficjalny raport miesięczny podsumowujący wyniki SEO, analitykę ruchu oraz wskaźniki dostępności WCAG 2.1.");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/reports/generate-monthly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ period: selectedMonth })
      });
      const data = await res.json();
      setReportData(data);
      onSendNotification("Raport Miesięczny Wygenerowany", `Wygenerowano podsumowanie dla okresu ${selectedMonth} z analizą Gemini AI.`, "seo");
    } catch (err) {
      console.error("Error generating report:", err);
    } finally {
      setIsGenerating(false);
    }
  };
  const handleDownloadPdf = () => {
    window.print();
    onSendNotification("Eksport PDF", "Przygotowano dokument do druku / pobrania w formacie PDF.", "seo");
  };
  const handleSendEmailReport = (e) => {
    e.preventDefault();
    if (!recipientEmail) return;
    setIsSendingEmail(true);
    setTimeout(() => {
      setIsSendingEmail(false);
      setIsShareModalOpen(false);
      onSendNotification(
        "Raport Wysyłany przez Email",
        `Pomyślnie udostępniono raport miesięczny PDF dla odbiorcy: ${recipientEmail}`,
        "mail"
      );
    }, 1e3);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold tracking-tight", children: "Automatyczne Raporty Miesięczne PDF & Udostępnianie" }, void 0, false, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 103,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400", children: "Generuj menedżerskie podsumowania wyników SEO, analityki ruchu i dostępności z opcją eksportu" }, void 0, false, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 104,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
        lineNumber: 102,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV(
          "select",
          {
            value: selectedMonth,
            onChange: (e) => setSelectedMonth(e.target.value),
            className: "bg-slate-900 border border-slate-800 text-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none",
            children: [
              /* @__PURE__ */ jsxDEV("option", { value: "Lipiec 2026", children: "Okres: Lipiec 2026" }, void 0, false, {
                fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
                lineNumber: 114,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "Czerwiec 2026", children: "Okres: Czerwiec 2026" }, void 0, false, {
                fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
                lineNumber: 115,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "Maj 2026", children: "Okres: Maj 2026" }, void 0, false, {
                fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
                lineNumber: 116,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 109,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleGenerateReport,
            disabled: isGenerating,
            className: `px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all ${accessibility.highContrast ? "bg-yellow-400 text-black ring-2 ring-yellow-300" : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/40"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Sparkles, { className: `w-4 h-4 ${isGenerating ? "animate-spin" : ""}` }, void 0, false, {
                fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
                lineNumber: 128,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: isGenerating ? "Generuję z Gemini AI..." : "Wygeneruj Raport z AI" }, void 0, false, {
                fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
                lineNumber: 129,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 119,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleDownloadPdf,
            className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all",
            children: [
              /* @__PURE__ */ jsxDEV(Printer, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
                lineNumber: 136,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Pobierz jako PDF" }, void 0, false, {
                fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
                lineNumber: 137,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 132,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setIsShareModalOpen(true),
            className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all",
            children: [
              /* @__PURE__ */ jsxDEV(Share2, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
                fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
                lineNumber: 144,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Udostępnij przez Email" }, void 0, false, {
                fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
                lineNumber: 145,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 140,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
        lineNumber: 107,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
      lineNumber: 101,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-slate-100 shadow-2xl print:bg-white print:text-black print:border-none print:shadow-none print:p-0", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 print:border-black pb-6 gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 bg-indigo-600 text-white font-black text-xl rounded-2xl flex items-center justify-center shadow-lg", children: "OS" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 157,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h1", { className: "text-xl font-black tracking-tight", children: "OmniSuite Enterprise" }, void 0, false, {
              fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
              lineNumber: 161,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 print:text-slate-600", children: "Oficjalny Raport Miesięczny Wyników & Dostępności Cyfrowej" }, void 0, false, {
              fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
              lineNumber: 162,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 160,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 156,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-left sm:text-right text-xs text-slate-400 print:text-slate-700", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-white print:text-black", children: [
            "Okres Analityczny: ",
            reportData.periodName
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 167,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            "Data wygenerowania: ",
            (/* @__PURE__ */ new Date()).toLocaleDateString("pl-PL")
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 168,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-emerald-400 font-semibold print:text-emerald-700", children: "WCAG 2.1 AAA Compliant" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 169,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 166,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
        lineNumber: 155,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold uppercase tracking-wider text-indigo-400 print:text-indigo-800 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(FileText, { className: "w-4 h-4" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 176,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "1. Streszczenie Menedżerskie" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 177,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 175,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed bg-slate-800/40 print:bg-slate-100 p-4 rounded-2xl border border-slate-700/60 print:border-slate-300", children: reportData.executiveSummary }, void 0, false, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 179,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
        lineNumber: 174,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 py-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-slate-800/80 print:bg-slate-100 border border-slate-700 print:border-slate-300 rounded-2xl text-center", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "block text-[10px] uppercase text-slate-400 print:text-slate-600 font-semibold", children: "Unikalni Użytkownicy" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 188,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xl font-black text-white print:text-black", children: "17,020" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 189,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "block text-[10px] text-emerald-400 print:text-emerald-700 font-bold", children: "+28.5% r/r" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 190,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 187,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-slate-800/80 print:bg-slate-100 border border-slate-700 print:border-slate-300 rounded-2xl text-center", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "block text-[10px] uppercase text-slate-400 print:text-slate-600 font-semibold", children: "Ocena SEO Strony" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 194,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xl font-black text-emerald-400 print:text-emerald-700", children: "94 / 100" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 195,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "block text-[10px] text-slate-400 print:text-slate-600", children: "Google Top 3" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 196,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 193,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-slate-800/80 print:bg-slate-100 border border-slate-700 print:border-slate-300 rounded-2xl text-center", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "block text-[10px] uppercase text-slate-400 print:text-slate-600 font-semibold", children: "Wskaźnik Odrzuceń" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 200,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xl font-black text-cyan-400 print:text-cyan-700", children: "24.5%" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 201,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "block text-[10px] text-emerald-400 print:text-emerald-700 font-bold", children: "-4.2% poprawy" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 202,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 199,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-slate-800/80 print:bg-slate-100 border border-slate-700 print:border-slate-300 rounded-2xl text-center", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "block text-[10px] uppercase text-slate-400 print:text-slate-600 font-semibold", children: "Dostępność & 2FA" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 206,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xl font-black text-amber-400 print:text-amber-700", children: "100%" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 207,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "block text-[10px] text-slate-400 print:text-slate-600", children: "WCAG AAA & TOTP" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 208,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 205,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
        lineNumber: 185,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-800 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(TrendingUp, { className: "w-4 h-4" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 216,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "2. Kluczowe Osiągnięcia Operacyjne" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 217,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 215,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("ul", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 text-xs", children: reportData.keyHighlights.map((hl, i) => /* @__PURE__ */ jsxDEV("li", { className: "p-3 bg-slate-800/50 print:bg-slate-50 border border-slate-700/60 print:border-slate-300 rounded-xl flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsxDEV(CheckCircle, { className: "w-4 h-4 text-emerald-400 print:text-emerald-700 flex-shrink-0 mt-0.5" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 223,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-200 print:text-slate-800 leading-relaxed font-medium", children: hl }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 224,
            columnNumber: 17
          }, this)
        ] }, i, true, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 222,
          columnNumber: 15
        }, this)) }, void 0, false, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 220,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
        lineNumber: 214,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 pt-2", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold uppercase tracking-wider text-indigo-400 print:text-indigo-800 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(BarChart, { className: "w-4 h-4" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 233,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "3. Rekomendacje i Plan Działań na Kolejny Miesiąc" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 234,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 232,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 text-xs", children: reportData.strategicNextSteps.map((step, idx) => /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-indigo-950/20 print:bg-indigo-50 border border-indigo-500/30 print:border-indigo-200 rounded-xl flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "w-6 h-6 bg-indigo-600 text-white font-bold text-xs rounded-full flex items-center justify-center flex-shrink-0", children: idx + 1 }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 240,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-200 print:text-slate-800 font-medium", children: step }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 243,
            columnNumber: 17
          }, this)
        ] }, idx, true, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 239,
          columnNumber: 15
        }, this)) }, void 0, false, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 237,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
        lineNumber: 231,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "pt-6 border-t border-slate-800 print:border-slate-400 flex items-center justify-between text-xs text-slate-400 print:text-slate-600", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-white print:text-black", children: "Marta Kowalska" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 252,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: "Dyrektor ds. Marketingu i Dostępności Digital" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 253,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 251,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 text-emerald-400 print:text-emerald-700 font-semibold", children: [
          /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 256,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Dokument Zweryfikowany Cyfrowo" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 257,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 255,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
        lineNumber: 250,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
      lineNumber: 152,
      columnNumber: 7
    }, this),
    isShareModalOpen && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 print:hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Mail, { className: "w-5 h-5 text-indigo-400" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 270,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Udostępnij Raport PDF przez Email" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 271,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 269,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("button", { onClick: () => setIsShareModalOpen(false), className: "text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 274,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 273,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
        lineNumber: 268,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSendEmailReport, className: "space-y-3 text-xs", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block font-semibold text-slate-300 mb-1", children: "Adres E-mail Odbiorcy:" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 280,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "email",
              required: true,
              value: recipientEmail,
              onChange: (e) => setRecipientEmail(e.target.value),
              placeholder: "zarzad@firma-omnisuite.pl",
              className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
              lineNumber: 281,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 279,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block font-semibold text-slate-300 mb-1", children: "Wiadomość wprowadzająca:" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 292,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "textarea",
            {
              rows: 4,
              value: emailNotes,
              onChange: (e) => setEmailNotes(e.target.value),
              className: "w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
              lineNumber: 293,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 291,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV(FileText, { className: "w-8 h-8 text-rose-400 flex-shrink-0" }, void 0, false, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 302,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-white", children: [
              "Załącznik: Raport_Miesieczny_OmniSuite_",
              selectedMonth.replace(" ", "_"),
              ".pdf"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
              lineNumber: 304,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400", children: "Wygenerowany dokument PDF z wynikami SEO i analityką (1.4 MB)" }, void 0, false, {
              fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
              lineNumber: 305,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
            lineNumber: 303,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 301,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-end gap-2 pt-3 border-t border-slate-800", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => setIsShareModalOpen(false),
              className: "px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold",
              children: "Anuluj"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
              lineNumber: 310,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "submit",
              disabled: isSendingEmail,
              className: "px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-900/40 flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxDEV(Send, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
                  lineNumber: 322,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: isSendingEmail ? "Wysyłam..." : "Wyślij Raport PDF" }, void 0, false, {
                  fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
                  lineNumber: 323,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
              lineNumber: 317,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
          lineNumber: 309,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
        lineNumber: 278,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
      lineNumber: 266,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
      lineNumber: 265,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/reports/ReportsSection.tsx",
    lineNumber: 98,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlcG9ydHNTZWN0aW9uLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBcbiAgRmlsZVRleHQsIFxuICBEb3dubG9hZCwgXG4gIE1haWwsIFxuICBTcGFya2xlcywgXG4gIFByaW50ZXIsIFxuICBDYWxlbmRhciBhcyBDYWxlbmRhckljb24sIFxuICBDaGVja0NpcmNsZSwgXG4gIFRyZW5kaW5nVXAsIFxuICBTaGFyZTIsIFxuICBYLCBcbiAgU2VuZCwgXG4gIFNoaWVsZENoZWNrLCBcbiAgQmFyQ2hhcnQgXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBBY2Nlc3NpYmlsaXR5U2V0dGluZ3MgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5cbmludGVyZmFjZSBSZXBvcnRzU2VjdGlvblByb3BzIHtcbiAgYWNjZXNzaWJpbGl0eTogQWNjZXNzaWJpbGl0eVNldHRpbmdzO1xuICBvblNlbmROb3RpZmljYXRpb246ICh0aXRsZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIHR5cGU6ICdzZW8nIHwgJ21haWwnKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgUmVwb3J0c1NlY3Rpb246IFJlYWN0LkZDPFJlcG9ydHNTZWN0aW9uUHJvcHM+ID0gKHtcbiAgYWNjZXNzaWJpbGl0eSxcbiAgb25TZW5kTm90aWZpY2F0aW9uLFxufSkgPT4ge1xuICBjb25zdCBbc2VsZWN0ZWRNb250aCwgc2V0U2VsZWN0ZWRNb250aF0gPSB1c2VTdGF0ZSgnTGlwaWVjIDIwMjYnKTtcbiAgY29uc3QgW2lzR2VuZXJhdGluZywgc2V0SXNHZW5lcmF0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgXG4gIC8vIFJlcG9ydCBjb250ZW50IHN0YXRlXG4gIGNvbnN0IFtyZXBvcnREYXRhLCBzZXRSZXBvcnREYXRhXSA9IHVzZVN0YXRlPHtcbiAgICBwZXJpb2ROYW1lOiBzdHJpbmc7XG4gICAgZXhlY3V0aXZlU3VtbWFyeTogc3RyaW5nO1xuICAgIGtleUhpZ2hsaWdodHM6IHN0cmluZ1tdO1xuICAgIHN0cmF0ZWdpY05leHRTdGVwczogc3RyaW5nW107XG4gIH0+KHtcbiAgICBwZXJpb2ROYW1lOiAnTGlwaWVjIDIwMjYnLFxuICAgIGV4ZWN1dGl2ZVN1bW1hcnk6ICdXIG1pbmlvbnltIG1pZXNpxIVjdSBvZG5vdG93YW5vIHd6cm9zdCBjYcWCa293aXRlZ28gcnVjaHUgbyAyOC41JSByL3IgcHJ6eSBqZWRub2N6ZXNueW0gb2JuacW8ZW5pdSB3c2thxbpuaWthIG9kcnp1Y2XFhCBkbyBwb3ppb211IDI0LjUlLiBTdHJvbmEgZmlybW93YSB1dHJ6eW1hxYJhIG5hand5xbxzenkgd3luaWsgd3NrYcW6bmlrYSBkb3N0xJlwbm/Fm2NpIGN5ZnJvd2VqIFdDQUcgMi4xIEFBQSBvcmF6IDEwMCUgcG96aW9tIG9jaHJvbnkga29udCB6IDJGQS4nLFxuICAgIGtleUhpZ2hsaWdodHM6IFtcbiAgICAgICdSZWtvcmRvd2EgbGljemJhIHVuaWthbG55Y2ggdcW8eXRrb3duaWvDs3c6IDE3IDAyMCBzZXNqaSB3IHNrYWxpIG1pZXNpxIVjYScsXG4gICAgICAnV3luaWsgU0VPIHN0cm9ueSBmaXJtb3dlajogOTQvMTAwIChHb29nbGUgU2VhcmNoIEluZGV4aW5nKScsXG4gICAgICAnWnJlYWxpem93YW5vIDk4JSB6YWRhxYQgZmlybW93eWNoIG9yYXogenN5bmNocm9uaXpvd2FubyBrYWxlbmRhcnogbmEgMyB1cnrEhWR6ZW5pYWNoJyxcbiAgICAgICdBa3R5d25hIGR3dWV0YXBvd2Egd2VyeWZpa2FjamEgMkZBIGRsYSB3c3p5c3RraWNoIGtvbnQgdcW8eXRrb3duaWvDs3cnLFxuICAgIF0sXG4gICAgc3RyYXRlZ2ljTmV4dFN0ZXBzOiBbXG4gICAgICAnRGFsc3phIGF1dG9tYXR5emFjamEgcHVibGlrYWNqaSBhcnR5a3XFgsOzdyB6b3B0eW1hbGl6b3dhbnljaCBwb2Qga8SFdGVtIHPFgsOzdyBrbHVjem93eWNoJyxcbiAgICAgICdVcnVjaG9taWVuaWUgY3lrbGljem5laiB3eXN5xYJraSByYXBvcnTDs3cgbWllc2nEmWN6bnljaCB3IGZvcm1hY2llIFBERiBlLW1haWxlbSBkbyBaYXJ6xIVkdScsXG4gICAgXSxcbiAgfSk7XG5cbiAgLy8gU2hhcmUgRW1haWwgTW9kYWxcbiAgY29uc3QgW2lzU2hhcmVNb2RhbE9wZW4sIHNldElzU2hhcmVNb2RhbE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcmVjaXBpZW50RW1haWwsIHNldFJlY2lwaWVudEVtYWlsXSA9IHVzZVN0YXRlKCd6YXJ6YWRAZmlybWEtb21uaXN1aXRlLnBsJyk7XG4gIGNvbnN0IFtlbWFpbE5vdGVzLCBzZXRFbWFpbE5vdGVzXSA9IHVzZVN0YXRlKCdQcnplc3nFgmFtIG9maWNqYWxueSByYXBvcnQgbWllc2nEmWN6bnkgcG9kc3Vtb3d1asSFY3kgd3luaWtpIFNFTywgYW5hbGl0eWvEmSBydWNodSBvcmF6IHdza2HFum5pa2kgZG9zdMSZcG5vxZtjaSBXQ0FHIDIuMS4nKTtcbiAgY29uc3QgW2lzU2VuZGluZ0VtYWlsLCBzZXRJc1NlbmRpbmdFbWFpbF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaGFuZGxlR2VuZXJhdGVSZXBvcnQgPSBhc3luYyAoKSA9PiB7XG4gICAgc2V0SXNHZW5lcmF0aW5nKHRydWUpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL2FwaS9yZXBvcnRzL2dlbmVyYXRlLW1vbnRobHknLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBwZXJpb2Q6IHNlbGVjdGVkTW9udGggfSksXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuICAgICAgc2V0UmVwb3J0RGF0YShkYXRhKTtcbiAgICAgIG9uU2VuZE5vdGlmaWNhdGlvbignUmFwb3J0IE1pZXNpxJljem55IFd5Z2VuZXJvd2FueScsIGBXeWdlbmVyb3dhbm8gcG9kc3Vtb3dhbmllIGRsYSBva3Jlc3UgJHtzZWxlY3RlZE1vbnRofSB6IGFuYWxpesSFIEdlbWluaSBBSS5gLCAnc2VvJyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBnZW5lcmF0aW5nIHJlcG9ydDonLCBlcnIpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc0dlbmVyYXRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVEb3dubG9hZFBkZiA9ICgpID0+IHtcbiAgICB3aW5kb3cucHJpbnQoKTtcbiAgICBvblNlbmROb3RpZmljYXRpb24oJ0Vrc3BvcnQgUERGJywgJ1Byenlnb3Rvd2FubyBkb2t1bWVudCBkbyBkcnVrdSAvIHBvYnJhbmlhIHcgZm9ybWFjaWUgUERGLicsICdzZW8nKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTZW5kRW1haWxSZXBvcnQgPSAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghcmVjaXBpZW50RW1haWwpIHJldHVybjtcblxuICAgIHNldElzU2VuZGluZ0VtYWlsKHRydWUpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0SXNTZW5kaW5nRW1haWwoZmFsc2UpO1xuICAgICAgc2V0SXNTaGFyZU1vZGFsT3BlbihmYWxzZSk7XG4gICAgICBvblNlbmROb3RpZmljYXRpb24oXG4gICAgICAgICdSYXBvcnQgV3lzecWCYW55IHByemV6IEVtYWlsJyxcbiAgICAgICAgYFBvbXnFm2xuaWUgdWRvc3TEmXBuaW9ubyByYXBvcnQgbWllc2nEmWN6bnkgUERGIGRsYSBvZGJpb3JjeTogJHtyZWNpcGllbnRFbWFpbH1gLFxuICAgICAgICAnbWFpbCdcbiAgICAgICk7XG4gICAgfSwgMTAwMCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgXG4gICAgICB7LyogSGVhZGVyICYgTWFpbiBDb250cm9scyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1zdGFydCBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHByaW50OmhpZGRlblwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0cmFja2luZy10aWdodFwiPkF1dG9tYXR5Y3puZSBSYXBvcnR5IE1pZXNpxJljem5lIFBERiAmIFVkb3N0xJlwbmlhbmllPC9oMj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwXCI+R2VuZXJ1aiBtZW5lZMW8ZXJza2llIHBvZHN1bW93YW5pYSB3eW5pa8OzdyBTRU8sIGFuYWxpdHlraSBydWNodSBpIGRvc3TEmXBub8WbY2kgeiBvcGNqxIUgZWtzcG9ydHU8L3A+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgXG4gICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgdmFsdWU9e3NlbGVjdGVkTW9udGh9XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRTZWxlY3RlZE1vbnRoKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXdoaXRlIHJvdW5kZWQteGwgcHgtMyBweS0yIHRleHQteHMgZm9udC1zZW1pYm9sZCBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJMaXBpZWMgMjAyNlwiPk9rcmVzOiBMaXBpZWMgMjAyNjwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkN6ZXJ3aWVjIDIwMjZcIj5Pa3JlczogQ3plcndpZWMgMjAyNjwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIk1haiAyMDI2XCI+T2tyZXM6IE1haiAyMDI2PC9vcHRpb24+XG4gICAgICAgICAgPC9zZWxlY3Q+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVHZW5lcmF0ZVJlcG9ydH1cbiAgICAgICAgICAgIGRpc2FibGVkPXtpc0dlbmVyYXRpbmd9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy1sZyB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICBhY2Nlc3NpYmlsaXR5LmhpZ2hDb250cmFzdFxuICAgICAgICAgICAgICAgID8gJ2JnLXllbGxvdy00MDAgdGV4dC1ibGFjayByaW5nLTIgcmluZy15ZWxsb3ctMzAwJ1xuICAgICAgICAgICAgICAgIDogJ2JnLWluZGlnby02MDAgaG92ZXI6YmctaW5kaWdvLTUwMCB0ZXh0LXdoaXRlIHNoYWRvdy1pbmRpZ28tOTAwLzQwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT17YHctNCBoLTQgJHtpc0dlbmVyYXRpbmcgPyAnYW5pbWF0ZS1zcGluJyA6ICcnfWB9IC8+XG4gICAgICAgICAgICA8c3Bhbj57aXNHZW5lcmF0aW5nID8gJ0dlbmVydWrEmSB6IEdlbWluaSBBSS4uLicgOiAnV3lnZW5lcnVqIFJhcG9ydCB6IEFJJ308L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEb3dubG9hZFBkZn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMjAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQteGwgdGV4dC14cyBmb250LXNlbWlib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxQcmludGVyIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5Qb2JpZXJ6IGpha28gUERGPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNTaGFyZU1vZGFsT3Blbih0cnVlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMjAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQteGwgdGV4dC14cyBmb250LXNlbWlib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxTaGFyZTIgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+VWRvc3TEmXBuaWogcHJ6ZXogRW1haWw8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFByaW50YWJsZSBSZXBvcnQgRG9jdW1lbnQgQ2FyZCAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtM3hsIHAtNiBzbTpwLTggc3BhY2UteS02IHRleHQtc2xhdGUtMTAwIHNoYWRvdy0yeGwgcHJpbnQ6Ymctd2hpdGUgcHJpbnQ6dGV4dC1ibGFjayBwcmludDpib3JkZXItbm9uZSBwcmludDpzaGFkb3ctbm9uZSBwcmludDpwLTBcIj5cbiAgICAgICAgXG4gICAgICAgIHsvKiBEb2N1bWVudCBIZWFkZXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1zdGFydCBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcHJpbnQ6Ym9yZGVyLWJsYWNrIHBiLTYgZ2FwLTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTIgaC0xMiBiZy1pbmRpZ28tNjAwIHRleHQtd2hpdGUgZm9udC1ibGFjayB0ZXh0LXhsIHJvdW5kZWQtMnhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNoYWRvdy1sZ1wiPlxuICAgICAgICAgICAgICBPU1xuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJsYWNrIHRyYWNraW5nLXRpZ2h0XCI+T21uaVN1aXRlIEVudGVycHJpc2U8L2gxPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIHByaW50OnRleHQtc2xhdGUtNjAwXCI+T2ZpY2phbG55IFJhcG9ydCBNaWVzacSZY3pueSBXeW5pa8OzdyAmIERvc3TEmXBub8WbY2kgQ3lmcm93ZWo8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1sZWZ0IHNtOnRleHQtcmlnaHQgdGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBwcmludDp0ZXh0LXNsYXRlLTcwMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC13aGl0ZSBwcmludDp0ZXh0LWJsYWNrXCI+T2tyZXMgQW5hbGl0eWN6bnk6IHtyZXBvcnREYXRhLnBlcmlvZE5hbWV9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PkRhdGEgd3lnZW5lcm93YW5pYToge25ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdwbC1QTCcpfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtc2VtaWJvbGQgcHJpbnQ6dGV4dC1lbWVyYWxkLTcwMFwiPldDQUcgMi4xIEFBQSBDb21wbGlhbnQ8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEV4ZWN1dGl2ZSBTdW1tYXJ5ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1pbmRpZ28tNDAwIHByaW50OnRleHQtaW5kaWdvLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPEZpbGVUZXh0IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgPHNwYW4+MS4gU3RyZXN6Y3plbmllIE1lbmVkxbxlcnNraWU8L3NwYW4+XG4gICAgICAgICAgPC9oMz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS0zMDAgcHJpbnQ6dGV4dC1zbGF0ZS04MDAgbGVhZGluZy1yZWxheGVkIGJnLXNsYXRlLTgwMC80MCBwcmludDpiZy1zbGF0ZS0xMDAgcC00IHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtNzAwLzYwIHByaW50OmJvcmRlci1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgIHtyZXBvcnREYXRhLmV4ZWN1dGl2ZVN1bW1hcnl9XG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogTWV0cmljIFNuYXBzaG90cyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIHNtOmdyaWQtY29scy00IGdhcC00IHB5LTJcIj5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBiZy1zbGF0ZS04MDAvODAgcHJpbnQ6Ymctc2xhdGUtMTAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHByaW50OmJvcmRlci1zbGF0ZS0zMDAgcm91bmRlZC0yeGwgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtWzEwcHhdIHVwcGVyY2FzZSB0ZXh0LXNsYXRlLTQwMCBwcmludDp0ZXh0LXNsYXRlLTYwMCBmb250LXNlbWlib2xkXCI+VW5pa2FsbmkgVcW8eXRrb3duaWN5PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJsYWNrIHRleHQtd2hpdGUgcHJpbnQ6dGV4dC1ibGFja1wiPjE3LDAyMDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtWzEwcHhdIHRleHQtZW1lcmFsZC00MDAgcHJpbnQ6dGV4dC1lbWVyYWxkLTcwMCBmb250LWJvbGRcIj4rMjguNSUgci9yPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgYmctc2xhdGUtODAwLzgwIHByaW50OmJnLXNsYXRlLTEwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCBwcmludDpib3JkZXItc2xhdGUtMzAwIHJvdW5kZWQtMnhsIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgdGV4dC1zbGF0ZS00MDAgcHJpbnQ6dGV4dC1zbGF0ZS02MDAgZm9udC1zZW1pYm9sZFwiPk9jZW5hIFNFTyBTdHJvbnk8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYmxhY2sgdGV4dC1lbWVyYWxkLTQwMCBwcmludDp0ZXh0LWVtZXJhbGQtNzAwXCI+OTQgLyAxMDA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBwcmludDp0ZXh0LXNsYXRlLTYwMFwiPkdvb2dsZSBUb3AgMzwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IGJnLXNsYXRlLTgwMC84MCBwcmludDpiZy1zbGF0ZS0xMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcHJpbnQ6Ym9yZGVyLXNsYXRlLTMwMCByb3VuZGVkLTJ4bCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1bMTBweF0gdXBwZXJjYXNlIHRleHQtc2xhdGUtNDAwIHByaW50OnRleHQtc2xhdGUtNjAwIGZvbnQtc2VtaWJvbGRcIj5Xc2thxbpuaWsgT2RyenVjZcWEPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJsYWNrIHRleHQtY3lhbi00MDAgcHJpbnQ6dGV4dC1jeWFuLTcwMFwiPjI0LjUlPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1bMTBweF0gdGV4dC1lbWVyYWxkLTQwMCBwcmludDp0ZXh0LWVtZXJhbGQtNzAwIGZvbnQtYm9sZFwiPi00LjIlIHBvcHJhd3k8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBiZy1zbGF0ZS04MDAvODAgcHJpbnQ6Ymctc2xhdGUtMTAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHByaW50OmJvcmRlci1zbGF0ZS0zMDAgcm91bmRlZC0yeGwgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtWzEwcHhdIHVwcGVyY2FzZSB0ZXh0LXNsYXRlLTQwMCBwcmludDp0ZXh0LXNsYXRlLTYwMCBmb250LXNlbWlib2xkXCI+RG9zdMSZcG5vxZvEhyAmIDJGQTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ibGFjayB0ZXh0LWFtYmVyLTQwMCBwcmludDp0ZXh0LWFtYmVyLTcwMFwiPjEwMCU8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBwcmludDp0ZXh0LXNsYXRlLTYwMFwiPldDQUcgQUFBICYgVE9UUDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogS2V5IEhpZ2hsaWdodHMgU2VjdGlvbiAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtZW1lcmFsZC00MDAgcHJpbnQ6dGV4dC1lbWVyYWxkLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPFRyZW5kaW5nVXAgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj4yLiBLbHVjem93ZSBPc2nEhWduacSZY2lhIE9wZXJhY3lqbmU8L3NwYW4+XG4gICAgICAgICAgPC9oMz5cblxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC0zIHRleHQteHNcIj5cbiAgICAgICAgICAgIHtyZXBvcnREYXRhLmtleUhpZ2hsaWdodHMubWFwKChobCwgaSkgPT4gKFxuICAgICAgICAgICAgICA8bGkga2V5PXtpfSBjbGFzc05hbWU9XCJwLTMgYmctc2xhdGUtODAwLzUwIHByaW50OmJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwLzYwIHByaW50OmJvcmRlci1zbGF0ZS0zMDAgcm91bmRlZC14bCBmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0yLjVcIj5cbiAgICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwIHByaW50OnRleHQtZW1lcmFsZC03MDAgZmxleC1zaHJpbmstMCBtdC0wLjVcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMjAwIHByaW50OnRleHQtc2xhdGUtODAwIGxlYWRpbmctcmVsYXhlZCBmb250LW1lZGl1bVwiPntobH08L3NwYW4+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogU3RyYXRlZ2ljIE5leHQgU3RlcHMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zIHB0LTJcIj5cbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtaW5kaWdvLTQwMCBwcmludDp0ZXh0LWluZGlnby04MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxCYXJDaGFydCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPjMuIFJla29tZW5kYWNqZSBpIFBsYW4gRHppYcWCYcWEIG5hIEtvbGVqbnkgTWllc2nEhWM8L3NwYW4+XG4gICAgICAgICAgPC9oMz5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIHRleHQteHNcIj5cbiAgICAgICAgICAgIHtyZXBvcnREYXRhLnN0cmF0ZWdpY05leHRTdGVwcy5tYXAoKHN0ZXAsIGlkeCkgPT4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17aWR4fSBjbGFzc05hbWU9XCJwLTMgYmctaW5kaWdvLTk1MC8yMCBwcmludDpiZy1pbmRpZ28tNTAgYm9yZGVyIGJvcmRlci1pbmRpZ28tNTAwLzMwIHByaW50OmJvcmRlci1pbmRpZ28tMjAwIHJvdW5kZWQteGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTYgaC02IGJnLWluZGlnby02MDAgdGV4dC13aGl0ZSBmb250LWJvbGQgdGV4dC14cyByb3VuZGVkLWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZmxleC1zaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgICAge2lkeCArIDF9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMjAwIHByaW50OnRleHQtc2xhdGUtODAwIGZvbnQtbWVkaXVtXCI+e3N0ZXB9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogRm9vdGVyIFNpZ25vZmYgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtNiBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIHByaW50OmJvcmRlci1zbGF0ZS00MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgdGV4dC1zbGF0ZS00MDAgcHJpbnQ6dGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC13aGl0ZSBwcmludDp0ZXh0LWJsYWNrXCI+TWFydGEgS293YWxza2E8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+RHlyZWt0b3IgZHMuIE1hcmtldGluZ3UgaSBEb3N0xJlwbm/Fm2NpIERpZ2l0YWw8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdGV4dC1lbWVyYWxkLTQwMCBwcmludDp0ZXh0LWVtZXJhbGQtNzAwIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkRva3VtZW50IFp3ZXJ5Zmlrb3dhbnkgQ3lmcm93bzwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogU2hhcmUgRW1haWwgTW9kYWwgKi99XG4gICAgICB7aXNTaGFyZU1vZGFsT3BlbiAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCBiZy1ibGFjay83MCBiYWNrZHJvcC1ibHVyLXNtIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00IHByaW50OmhpZGRlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQtMnhsIHctZnVsbCBtYXgtdy1sZyBwLTYgc2hhZG93LTJ4bCBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBwYi0zXCI+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8TWFpbCBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtaW5kaWdvLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+VWRvc3TEmXBuaWogUmFwb3J0IFBERiBwcnpleiBFbWFpbDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRJc1NoYXJlTW9kYWxPcGVuKGZhbHNlKX0gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU2VuZEVtYWlsUmVwb3J0fSBjbGFzc05hbWU9XCJzcGFjZS15LTMgdGV4dC14c1wiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMzAwIG1iLTFcIj5BZHJlcyBFLW1haWwgT2RiaW9yY3k6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3JlY2lwaWVudEVtYWlsfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0UmVjaXBpZW50RW1haWwoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJ6YXJ6YWRAZmlybWEtb21uaXN1aXRlLnBsXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC14bCBweC0zIHB5LTIgdGV4dC13aGl0ZSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctaW5kaWdvLTUwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+V2lhZG9tb8WbxIcgd3Byb3dhZHphasSFY2E6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgIHJvd3M9ezR9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17ZW1haWxOb3Rlc31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldEVtYWlsTm90ZXMoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLXhsIHAtMyB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1pbmRpZ28tNTAwIGxlYWRpbmctcmVsYXhlZFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYmctc2xhdGUtODAwLzgwIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICA8RmlsZVRleHQgY2xhc3NOYW1lPVwidy04IGgtOCB0ZXh0LXJvc2UtNDAwIGZsZXgtc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXdoaXRlXCI+WmHFgsSFY3puaWs6IFJhcG9ydF9NaWVzaWVjem55X09tbmlTdWl0ZV97c2VsZWN0ZWRNb250aC5yZXBsYWNlKCcgJywgJ18nKX0ucGRmPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwXCI+V3lnZW5lcm93YW55IGRva3VtZW50IFBERiB6IHd5bmlrYW1pIFNFTyBpIGFuYWxpdHlrxIUgKDEuNCBNQik8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktZW5kIGdhcC0yIHB0LTMgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNTaGFyZU1vZGFsT3BlbihmYWxzZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgYmctc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwIHJvdW5kZWQteGwgZm9udC1zZW1pYm9sZFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgQW51bHVqXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNTZW5kaW5nRW1haWx9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC01IHB5LTIgYmctaW5kaWdvLTYwMCBob3ZlcjpiZy1pbmRpZ28tNTAwIHRleHQtd2hpdGUgcm91bmRlZC14bCBmb250LXNlbWlib2xkIHNoYWRvdy1sZyBzaGFkb3ctaW5kaWdvLTkwMC80MCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPFNlbmQgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57aXNTZW5kaW5nRW1haWwgPyAnV3lzecWCYW0uLi4nIDogJ1d5xZtsaWogUmFwb3J0IFBERid9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZm9ybT5cblxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQXNHVTtBQXRHVixTQUFnQixnQkFBZ0I7QUFDaEM7QUFBQSxFQUNFO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE9BQ0s7QUFRQSxhQUFNLGlCQUFnRCxDQUFDO0FBQUEsRUFDNUQ7QUFBQSxFQUNBO0FBQ0YsTUFBTTtBQUNKLFFBQU0sQ0FBQyxlQUFlLGdCQUFnQixJQUFJLFNBQVMsYUFBYTtBQUNoRSxRQUFNLENBQUMsY0FBYyxlQUFlLElBQUksU0FBUyxLQUFLO0FBR3RELFFBQU0sQ0FBQyxZQUFZLGFBQWEsSUFBSSxTQUtqQztBQUFBLElBQ0QsWUFBWTtBQUFBLElBQ1osa0JBQWtCO0FBQUEsSUFDbEIsZUFBZTtBQUFBLE1BQ2I7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxvQkFBb0I7QUFBQSxNQUNsQjtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FB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