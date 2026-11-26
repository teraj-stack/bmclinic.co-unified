import __vite__cjsImport0_react_jsxDevRuntime from "/ai-studio-app/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=d886a827"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import {
  Eye,
  Type,
  Volume2,
  Keyboard,
  X,
  CheckCircle2,
  Accessibility
} from "/ai-studio-app/node_modules/.vite/deps/lucide-react.js?v=5db40f83";
export const AccessibilityModal = ({
  isOpen,
  onClose,
  accessibility,
  setAccessibility,
  mode
}) => {
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "a11y-modal-title",
      children: /* @__PURE__ */ jsxDEV("div", { className: `border rounded-3xl w-full max-w-xl p-6 shadow-2xl space-y-5 transition-colors ${accessibility.highContrast ? "bg-black border-yellow-400 text-yellow-300" : "bg-slate-900 border-slate-700 text-slate-100"}`, children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: [
          /* @__PURE__ */ jsxDEV("h3", { id: "a11y-modal-title", className: "text-base font-bold flex items-center gap-2", children: mode === "wcag" ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV(Accessibility, { className: "w-5 h-5 text-indigo-400" }, void 0, false, {
              fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
              lineNumber: 49,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Opcje Dostępności Cyfrowej (WCAG 2.1 AAA)" }, void 0, false, {
              fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
              lineNumber: 50,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
            lineNumber: 48,
            columnNumber: 15
          }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV(Keyboard, { className: "w-5 h-5 text-indigo-400" }, void 0, false, {
              fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
              lineNumber: 54,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Mapa Skrótów Klawiszowych Nawigacji" }, void 0, false, {
              fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
              lineNumber: 55,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
            lineNumber: 53,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
            lineNumber: 46,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: onClose,
              className: "p-1 rounded-lg text-slate-400 hover:text-white focus-visible:ring-2 focus-visible:ring-indigo-400",
              "aria-label": "Zamknij okno dostępności",
              children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
                fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                lineNumber: 65,
                columnNumber: 13
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
              lineNumber: 60,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
          lineNumber: 45,
          columnNumber: 9
        }, this),
        mode === "wcag" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 text-xs", children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300 leading-relaxed", children: "Aplikacja OmniSuite Enterprise została zaprojektowana zgodnie ze standardami dostępności WCAG 2.1. Zapewnia doskonałą czytelność dla osób o słabym wzroku oraz pełne wsparcie dla czytników ekranu." }, void 0, false, {
            fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
            lineNumber: 73,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 pt-2", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between p-3 bg-slate-800/80 rounded-2xl border border-slate-700", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(Eye, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 82,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "font-bold", children: "Wysoki Kontrast (High Contrast Dark Mode)" }, void 0, false, {
                    fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                    lineNumber: 84,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400", children: "Jaskrawo-żółte akcenty na czarnym tle dla słabowidzących" }, void 0, false, {
                    fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                    lineNumber: 85,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 83,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                lineNumber: 81,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setAccessibility((p) => ({ ...p, highContrast: !p.highContrast })),
                  className: `px-3 py-1.5 rounded-xl font-bold transition-all ${accessibility.highContrast ? "bg-yellow-400 text-black" : "bg-slate-700 text-slate-300"}`,
                  children: accessibility.highContrast ? "WŁĄCZONY" : "WYŁĄCZONY"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 89,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
              lineNumber: 80,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between p-3 bg-slate-800/80 rounded-2xl border border-slate-700", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(Type, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 104,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "font-bold", children: "Powiększenie Czcionki Interfejsu" }, void 0, false, {
                    fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                    lineNumber: 106,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400", children: "Skaluj wielkość tekstu w całej aplikacji (+10%, +20%, +30%)" }, void 0, false, {
                    fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                    lineNumber: 107,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 105,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                lineNumber: 103,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex gap-1", children: [0, 1, 2, 3].map((d) => /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setAccessibility((p) => ({ ...p, fontSizeDelta: d })),
                  className: `px-2.5 py-1 rounded-lg font-bold text-xs ${accessibility.fontSizeDelta === d ? "bg-indigo-600 text-white" : "bg-slate-700 text-slate-300"}`,
                  children: [
                    "+",
                    d * 10,
                    "%"
                  ]
                },
                d,
                true,
                {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 113,
                  columnNumber: 21
                },
                this
              )) }, void 0, false, {
                fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                lineNumber: 111,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
              lineNumber: 102,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between p-3 bg-slate-800/80 rounded-2xl border border-slate-700", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(Volume2, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 131,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "font-bold", children: "Komunikaty Czytnika Ekranu (ARIA Live)" }, void 0, false, {
                    fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                    lineNumber: 133,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400", children: "Powiadamiaj głosowo czytniki ekranu o nowych alertach push" }, void 0, false, {
                    fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                    lineNumber: 134,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 132,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                lineNumber: 130,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setAccessibility((p) => ({ ...p, screenReaderAnnouncements: !p.screenReaderAnnouncements })),
                  className: `px-3 py-1.5 rounded-xl font-bold transition-all ${accessibility.screenReaderAnnouncements ? "bg-emerald-600 text-white" : "bg-slate-700 text-slate-300"}`,
                  children: accessibility.screenReaderAnnouncements ? "WŁĄCZONE" : "WYŁĄCZONE"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 138,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
              lineNumber: 129,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
            lineNumber: 77,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1 text-emerald-400 font-bold", children: [
              /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                lineNumber: 154,
                columnNumber: 17
              }, this),
              " WCAG 2.1 AAA Compliant"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
              lineNumber: 153,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Naciśnij Escape, aby zamknąć" }, void 0, false, {
              fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
              lineNumber: 156,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
            lineNumber: 152,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
          lineNumber: 71,
          columnNumber: 11
        }, this),
        mode === "shortcuts" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 text-xs", children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300", children: "Użyj poniższych skrótów klawiszowych do szybkiego przemieszczania się po aplikacji bez użycia myszy:" }, void 0, false, {
            fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
            lineNumber: 165,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left", children: [
            /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { className: "border-b border-slate-800 text-slate-400 pb-2", children: [
              /* @__PURE__ */ jsxDEV("th", { className: "pb-2", children: "Kombinacja Klawiszy" }, void 0, false, {
                fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                lineNumber: 173,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("th", { className: "pb-2", children: "Docelowy Moduł / Akcja" }, void 0, false, {
                fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                lineNumber: 174,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
              lineNumber: 172,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
              lineNumber: 171,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-slate-800/60 font-medium", children: [
              /* @__PURE__ */ jsxDEV("tr", { children: [
                /* @__PURE__ */ jsxDEV("td", { className: "py-2", children: /* @__PURE__ */ jsxDEV("kbd", { className: "bg-slate-800 px-2 py-1 rounded text-indigo-300 font-mono", children: "Alt + 1" }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 179,
                  columnNumber: 42
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 179,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("td", { className: "py-2 text-slate-200", children: "Przejdź do Poczty Firmowej" }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 180,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                lineNumber: 178,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("tr", { children: [
                /* @__PURE__ */ jsxDEV("td", { className: "py-2", children: /* @__PURE__ */ jsxDEV("kbd", { className: "bg-slate-800 px-2 py-1 rounded text-indigo-300 font-mono", children: "Alt + 2" }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 183,
                  columnNumber: 42
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 183,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("td", { className: "py-2 text-slate-200", children: "Przejdź do Zarządzania Zadaniami" }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 184,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                lineNumber: 182,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("tr", { children: [
                /* @__PURE__ */ jsxDEV("td", { className: "py-2", children: /* @__PURE__ */ jsxDEV("kbd", { className: "bg-slate-800 px-2 py-1 rounded text-indigo-300 font-mono", children: "Alt + 3" }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 187,
                  columnNumber: 42
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 187,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("td", { className: "py-2 text-slate-200", children: "Przejdź do Kalendarza & Synchronizacji" }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 188,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                lineNumber: 186,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("tr", { children: [
                /* @__PURE__ */ jsxDEV("td", { className: "py-2", children: /* @__PURE__ */ jsxDEV("kbd", { className: "bg-slate-800 px-2 py-1 rounded text-indigo-300 font-mono", children: "Alt + 4" }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 191,
                  columnNumber: 42
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 191,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("td", { className: "py-2 text-slate-200", children: "Przejdź do Audytu SEO & Treści" }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 192,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                lineNumber: 190,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("tr", { children: [
                /* @__PURE__ */ jsxDEV("td", { className: "py-2", children: /* @__PURE__ */ jsxDEV("kbd", { className: "bg-slate-800 px-2 py-1 rounded text-indigo-300 font-mono", children: "Alt + 5" }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 195,
                  columnNumber: 42
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 195,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("td", { className: "py-2 text-slate-200", children: "Przejdź do Statystyk Ruchu" }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 196,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                lineNumber: 194,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("tr", { children: [
                /* @__PURE__ */ jsxDEV("td", { className: "py-2", children: /* @__PURE__ */ jsxDEV("kbd", { className: "bg-slate-800 px-2 py-1 rounded text-indigo-300 font-mono", children: "Alt + 6" }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 199,
                  columnNumber: 42
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 199,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("td", { className: "py-2 text-slate-200", children: "Przejdź do Raportów Miesięcznych PDF" }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 200,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                lineNumber: 198,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("tr", { children: [
                /* @__PURE__ */ jsxDEV("td", { className: "py-2", children: /* @__PURE__ */ jsxDEV("kbd", { className: "bg-slate-800 px-2 py-1 rounded text-indigo-300 font-mono", children: "Alt + 7" }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 203,
                  columnNumber: 42
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 203,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("td", { className: "py-2 text-slate-200", children: "Przejdź do Bezpieczeństwa 2FA" }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 204,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                lineNumber: 202,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("tr", { children: [
                /* @__PURE__ */ jsxDEV("td", { className: "py-2", children: /* @__PURE__ */ jsxDEV("kbd", { className: "bg-slate-800 px-2 py-1 rounded text-indigo-300 font-mono", children: "Tab / Shift+Tab" }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 207,
                  columnNumber: 42
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 207,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("td", { className: "py-2 text-slate-200", children: "Nawiguj po elementach z aktywnym konturem focusa" }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 208,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                lineNumber: 206,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("tr", { children: [
                /* @__PURE__ */ jsxDEV("td", { className: "py-2", children: /* @__PURE__ */ jsxDEV("kbd", { className: "bg-slate-800 px-2 py-1 rounded text-indigo-300 font-mono", children: "Escape" }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 211,
                  columnNumber: 42
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 211,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("td", { className: "py-2 text-slate-200", children: "Zamknij aktywne okno lub formularz" }, void 0, false, {
                  fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                  lineNumber: 212,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
                lineNumber: 210,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
              lineNumber: 177,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
            lineNumber: 170,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
            lineNumber: 169,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-slate-800 text-right", children: /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: onClose,
              className: "px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl",
              children: "Rozumiem"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
              lineNumber: 219,
              columnNumber: 15
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
            lineNumber: 218,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
          lineNumber: 164,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
        lineNumber: 38,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/applet/src/components/accessibility/AccessibilityModal.tsx",
      lineNumber: 32,
      columnNumber: 5
    },
    this
  );
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFjY2Vzc2liaWxpdHlNb2RhbC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBFeWUsIFxuICBUeXBlLCBcbiAgSGVscENpcmNsZSwgXG4gIFZvbHVtZTIsIFxuICBLZXlib2FyZCwgXG4gIFgsIFxuICBDaGVja0NpcmNsZTIsIFxuICBBY2Nlc3NpYmlsaXR5IFxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgQWNjZXNzaWJpbGl0eVNldHRpbmdzIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuXG5pbnRlcmZhY2UgQWNjZXNzaWJpbGl0eU1vZGFsUHJvcHMge1xuICBpc09wZW46IGJvb2xlYW47XG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gIGFjY2Vzc2liaWxpdHk6IEFjY2Vzc2liaWxpdHlTZXR0aW5ncztcbiAgc2V0QWNjZXNzaWJpbGl0eTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248QWNjZXNzaWJpbGl0eVNldHRpbmdzPj47XG4gIG1vZGU6ICd3Y2FnJyB8ICdzaG9ydGN1dHMnO1xufVxuXG5leHBvcnQgY29uc3QgQWNjZXNzaWJpbGl0eU1vZGFsOiBSZWFjdC5GQzxBY2Nlc3NpYmlsaXR5TW9kYWxQcm9wcz4gPSAoe1xuICBpc09wZW4sXG4gIG9uQ2xvc2UsXG4gIGFjY2Vzc2liaWxpdHksXG4gIHNldEFjY2Vzc2liaWxpdHksXG4gIG1vZGUsXG59KSA9PiB7XG4gIGlmICghaXNPcGVuKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgXG4gICAgICBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIGJnLWJsYWNrLzgwIGJhY2tkcm9wLWJsdXItc20gei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTRcIlxuICAgICAgcm9sZT1cImRpYWxvZ1wiXG4gICAgICBhcmlhLW1vZGFsPVwidHJ1ZVwiXG4gICAgICBhcmlhLWxhYmVsbGVkYnk9XCJhMTF5LW1vZGFsLXRpdGxlXCJcbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGJvcmRlciByb3VuZGVkLTN4bCB3LWZ1bGwgbWF4LXcteGwgcC02IHNoYWRvdy0yeGwgc3BhY2UteS01IHRyYW5zaXRpb24tY29sb3JzICR7XG4gICAgICAgIGFjY2Vzc2liaWxpdHkuaGlnaENvbnRyYXN0IFxuICAgICAgICAgID8gJ2JnLWJsYWNrIGJvcmRlci15ZWxsb3ctNDAwIHRleHQteWVsbG93LTMwMCcgXG4gICAgICAgICAgOiAnYmctc2xhdGUtOTAwIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0xMDAnXG4gICAgICB9YH0+XG4gICAgICAgIFxuICAgICAgICB7LyogTW9kYWwgSGVhZGVyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHBiLTNcIj5cbiAgICAgICAgICA8aDMgaWQ9XCJhMTF5LW1vZGFsLXRpdGxlXCIgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAge21vZGUgPT09ICd3Y2FnJyA/IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8QWNjZXNzaWJpbGl0eSBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtaW5kaWdvLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+T3BjamUgRG9zdMSZcG5vxZtjaSBDeWZyb3dlaiAoV0NBRyAyLjEgQUFBKTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxLZXlib2FyZCBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtaW5kaWdvLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+TWFwYSBTa3LDs3TDs3cgS2xhd2lzem93eWNoIE5hd2lnYWNqaTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvaDM+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIHJvdW5kZWQtbGcgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctaW5kaWdvLTQwMFwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiWmFta25paiBva25vIGRvc3TEmXBub8WbY2lcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogV0NBRyBNb2RlIFNldHRpbmdzICovfVxuICAgICAgICB7bW9kZSA9PT0gJ3djYWcnICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICBBcGxpa2FjamEgT21uaVN1aXRlIEVudGVycHJpc2Ugem9zdGHFgmEgemFwcm9qZWt0b3dhbmEgemdvZG5pZSB6ZSBzdGFuZGFyZGFtaSBkb3N0xJlwbm/Fm2NpIFdDQUcgMi4xLiBaYXBld25pYSBkb3Nrb25hxYLEhSBjenl0ZWxub8WbxIcgZGxhIG9zw7NiIG8gc8WCYWJ5bSB3enJva3Ugb3JheiBwZcWCbmUgd3NwYXJjaWUgZGxhIGN6eXRuaWvDs3cgZWtyYW51LlxuICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMyBwdC0yXCI+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB7LyogSGlnaCBDb250cmFzdCAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0zIGJnLXNsYXRlLTgwMC84MCByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxFeWUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtYm9sZFwiPld5c29raSBLb250cmFzdCAoSGlnaCBDb250cmFzdCBEYXJrIE1vZGUpPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5KYXNrcmF3by3FvMOzxYJ0ZSBha2NlbnR5IG5hIGN6YXJueW0gdGxlIGRsYSBzxYJhYm93aWR6xIVjeWNoPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjY2Vzc2liaWxpdHkocCA9PiAoeyAuLi5wLCBoaWdoQ29udHJhc3Q6ICFwLmhpZ2hDb250cmFzdCB9KSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEuNSByb3VuZGVkLXhsIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgICBhY2Nlc3NpYmlsaXR5LmhpZ2hDb250cmFzdFxuICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXllbGxvdy00MDAgdGV4dC1ibGFjaydcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7YWNjZXNzaWJpbGl0eS5oaWdoQ29udHJhc3QgPyAnV8WBxIRDWk9OWScgOiAnV1nFgcSEQ1pPTlknfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogRm9udCBTaXplICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwLTMgYmctc2xhdGUtODAwLzgwIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtNzAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPFR5cGUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvbGRcIj5Qb3dpxJlrc3plbmllIEN6Y2lvbmtpIEludGVyZmVqc3U8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMFwiPlNrYWx1aiB3aWVsa2/Fm8SHIHRla3N0dSB3IGNhxYJlaiBhcGxpa2FjamkgKCsxMCUsICsyMCUsICszMCUpPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAge1swLCAxLCAyLCAzXS5tYXAoZCA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2R9XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWNjZXNzaWJpbGl0eShwID0+ICh7IC4uLnAsIGZvbnRTaXplRGVsdGE6IGQgfSkpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xIHJvdW5kZWQtbGcgZm9udC1ib2xkIHRleHQteHMgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc2liaWxpdHkuZm9udFNpemVEZWx0YSA9PT0gZFxuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1pbmRpZ28tNjAwIHRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTMwMCdcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICt7ZCAqIDEwfSVcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIFNjcmVlbiBSZWFkZXIgQW5ub3VuY2VtZW50cyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0zIGJnLXNsYXRlLTgwMC84MCByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxWb2x1bWUyIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtYm9sZFwiPktvbXVuaWthdHkgQ3p5dG5pa2EgRWtyYW51IChBUklBIExpdmUpPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5Qb3dpYWRhbWlhaiBnxYJvc293byBjenl0bmlraSBla3JhbnUgbyBub3d5Y2ggYWxlcnRhY2ggcHVzaDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY2Nlc3NpYmlsaXR5KHAgPT4gKHsgLi4ucCwgc2NyZWVuUmVhZGVyQW5ub3VuY2VtZW50czogIXAuc2NyZWVuUmVhZGVyQW5ub3VuY2VtZW50cyB9KSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEuNSByb3VuZGVkLXhsIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgICBhY2Nlc3NpYmlsaXR5LnNjcmVlblJlYWRlckFubm91bmNlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTYwMCB0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTMwMCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHthY2Nlc3NpYmlsaXR5LnNjcmVlblJlYWRlckFubm91bmNlbWVudHMgPyAnV8WBxIRDWk9ORScgOiAnV1nFgcSEQ1pPTkUnfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPiBXQ0FHIDIuMSBBQUEgQ29tcGxpYW50XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+TmFjacWbbmlqIEVzY2FwZSwgYWJ5IHphbWtuxIXEhzwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgICAgey8qIFNob3J0Y3V0cyBNb2RlIFRhYmxlICovfVxuICAgICAgICB7bW9kZSA9PT0gJ3Nob3J0Y3V0cycgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00IHRleHQteHNcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgIFXFvHlqIHBvbmnFvHN6eWNoIHNrcsOzdMOzdyBrbGF3aXN6b3d5Y2ggZG8gc3p5YmtpZWdvIHByemVtaWVzemN6YW5pYSBzacSZIHBvIGFwbGlrYWNqaSBiZXogdcW8eWNpYSBteXN6eTpcbiAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdmVyZmxvdy14LWF1dG9cIj5cbiAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwiYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCBwYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwYi0yXCI+S29tYmluYWNqYSBLbGF3aXN6eTwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwYi0yXCI+RG9jZWxvd3kgTW9kdcWCIC8gQWtjamE8L3RoPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzc05hbWU9XCJkaXZpZGUteSBkaXZpZGUtc2xhdGUtODAwLzYwIGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0yXCI+PGtiZCBjbGFzc05hbWU9XCJiZy1zbGF0ZS04MDAgcHgtMiBweS0xIHJvdW5kZWQgdGV4dC1pbmRpZ28tMzAwIGZvbnQtbW9ub1wiPkFsdCArIDE8L2tiZD48L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMiB0ZXh0LXNsYXRlLTIwMFwiPlByemVqZMW6IGRvIFBvY3p0eSBGaXJtb3dlajwvdGQ+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMlwiPjxrYmQgY2xhc3NOYW1lPVwiYmctc2xhdGUtODAwIHB4LTIgcHktMSByb3VuZGVkIHRleHQtaW5kaWdvLTMwMCBmb250LW1vbm9cIj5BbHQgKyAyPC9rYmQ+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTIgdGV4dC1zbGF0ZS0yMDBcIj5QcnplamTFuiBkbyBaYXJ6xIVkemFuaWEgWmFkYW5pYW1pPC90ZD5cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0yXCI+PGtiZCBjbGFzc05hbWU9XCJiZy1zbGF0ZS04MDAgcHgtMiBweS0xIHJvdW5kZWQgdGV4dC1pbmRpZ28tMzAwIGZvbnQtbW9ub1wiPkFsdCArIDM8L2tiZD48L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMiB0ZXh0LXNsYXRlLTIwMFwiPlByemVqZMW6IGRvIEthbGVuZGFyemEgJiBTeW5jaHJvbml6YWNqaTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMlwiPjxrYmQgY2xhc3NOYW1lPVwiYmctc2xhdGUtODAwIHB4LTIgcHktMSByb3VuZGVkIHRleHQtaW5kaWdvLTMwMCBmb250LW1vbm9cIj5BbHQgKyA0PC9rYmQ+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTIgdGV4dC1zbGF0ZS0yMDBcIj5QcnplamTFuiBkbyBBdWR5dHUgU0VPICYgVHJlxZtjaTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMlwiPjxrYmQgY2xhc3NOYW1lPVwiYmctc2xhdGUtODAwIHB4LTIgcHktMSByb3VuZGVkIHRleHQtaW5kaWdvLTMwMCBmb250LW1vbm9cIj5BbHQgKyA1PC9rYmQ+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTIgdGV4dC1zbGF0ZS0yMDBcIj5QcnplamTFuiBkbyBTdGF0eXN0eWsgUnVjaHU8L3RkPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTJcIj48a2JkIGNsYXNzTmFtZT1cImJnLXNsYXRlLTgwMCBweC0yIHB5LTEgcm91bmRlZCB0ZXh0LWluZGlnby0zMDAgZm9udC1tb25vXCI+QWx0ICsgNjwva2JkPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0yIHRleHQtc2xhdGUtMjAwXCI+UHJ6ZWpkxbogZG8gUmFwb3J0w7N3IE1pZXNpxJljem55Y2ggUERGPC90ZD5cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0yXCI+PGtiZCBjbGFzc05hbWU9XCJiZy1zbGF0ZS04MDAgcHgtMiBweS0xIHJvdW5kZWQgdGV4dC1pbmRpZ28tMzAwIGZvbnQtbW9ub1wiPkFsdCArIDc8L2tiZD48L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMiB0ZXh0LXNsYXRlLTIwMFwiPlByemVqZMW6IGRvIEJlenBpZWN6ZcWEc3R3YSAyRkE8L3RkPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTJcIj48a2JkIGNsYXNzTmFtZT1cImJnLXNsYXRlLTgwMCBweC0yIHB5LTEgcm91bmRlZCB0ZXh0LWluZGlnby0zMDAgZm9udC1tb25vXCI+VGFiIC8gU2hpZnQrVGFiPC9rYmQ+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTIgdGV4dC1zbGF0ZS0yMDBcIj5OYXdpZ3VqIHBvIGVsZW1lbnRhY2ggeiBha3R5d255bSBrb250dXJlbSBmb2N1c2E8L3RkPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTJcIj48a2JkIGNsYXNzTmFtZT1cImJnLXNsYXRlLTgwMCBweC0yIHB5LTEgcm91bmRlZCB0ZXh0LWluZGlnby0zMDAgZm9udC1tb25vXCI+RXNjYXBlPC9rYmQ+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTIgdGV4dC1zbGF0ZS0yMDBcIj5aYW1rbmlqIGFrdHl3bmUgb2tubyBsdWIgZm9ybXVsYXJ6PC90ZD5cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTUgcHktMiBiZy1pbmRpZ28tNjAwIGhvdmVyOmJnLWluZGlnby01MDAgdGV4dC13aGl0ZSBmb250LWJvbGQgcm91bmRlZC14bFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBSb3p1bWllbVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBK0NjLG1CQUNFLGNBREY7QUE5Q2Q7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsT0FDSztBQVdBLGFBQU0scUJBQXdELENBQUM7QUFBQSxFQUNwRTtBQUFBLEVBQ0E7QUFBQSxF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