import __vite__cjsImport0_react_jsxDevRuntime from "/ai-studio-app/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=d886a827"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import {
  Bell,
  ShieldCheck,
  ShieldAlert,
  Type,
  Eye,
  HelpCircle,
  Smartphone,
  CheckCircle2
} from "/ai-studio-app/node_modules/.vite/deps/lucide-react.js?v=5db40f83";
export const Header = ({
  activeTab,
  user,
  accessibility,
  setAccessibility,
  onOpenNotifications,
  onOpenAccessibilityHelp,
  onOpenShortcutsHelp,
  unreadNotificationsCount,
  latestNotificationMessage
}) => {
  const tabTitles = {
    mail: "Poczta Firmowa & AI",
    tasks: "Zarządzanie Zadaniami",
    calendar: "Kalendarz & Synchronizacja",
    seo: "Audyt SEO & Optymalizacja",
    analytics: "Statystyki Ruchu",
    reports: "Raporty Miesięczne PDF",
    security: "Bezpieczeństwo 2FA"
  };
  const toggleHighContrast = () => {
    setAccessibility((prev) => ({ ...prev, highContrast: !prev.highContrast }));
  };
  const cycleFontSize = () => {
    setAccessibility((prev) => ({ ...prev, fontSizeDelta: (prev.fontSizeDelta + 1) % 4 }));
  };
  const fontSizeLabels = ["100%", "110%", "120%", "130%"];
  return /* @__PURE__ */ jsxDEV(
    "header",
    {
      className: `border-b sticky top-0 z-30 transition-colors duration-200 ${accessibility.highContrast ? "bg-black border-amber-400 text-yellow-300" : "bg-slate-900/95 backdrop-blur border-slate-800 text-slate-100"}`,
      role: "banner",
      children: [
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            "aria-live": "polite",
            "aria-atomic": "true",
            className: "sr-only",
            id: "a11y-announcer",
            children: latestNotificationMessage ? `Nowe powiadomienie: ${latestNotificationMessage}` : ""
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/Header.tsx",
            lineNumber: 70,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: `w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-md ${accessibility.highContrast ? "bg-amber-400 text-black ring-2 ring-yellow-300" : "bg-indigo-600 text-white shadow-indigo-900/50"}`, children: "OS" }, void 0, false, {
              fileName: "/app/applet/src/components/Header.tsx",
              lineNumber: 83,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV("h1", { className: "text-lg font-bold tracking-tight leading-tight", children: "OmniSuite Enterprise" }, void 0, false, {
                  fileName: "/app/applet/src/components/Header.tsx",
                  lineNumber: 92,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: `text-xs px-2 py-0.5 rounded-full font-medium ${accessibility.highContrast ? "bg-yellow-400 text-black font-bold" : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"}`, children: "WCAG 2.1 AAA" }, void 0, false, {
                  fileName: "/app/applet/src/components/Header.tsx",
                  lineNumber: 95,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 91,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: `text-xs ${accessibility.highContrast ? "text-yellow-200" : "text-slate-400"}`, children: tabTitles[activeTab] }, void 0, false, {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 103,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Header.tsx",
              lineNumber: 90,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Header.tsx",
            lineNumber: 82,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "hidden md:flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-lg border border-slate-700/60", role: "region", "aria-label": "Narzędzia dostępności cyfrowej", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: cycleFontSize,
                className: `px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 ${accessibility.highContrast ? "bg-yellow-400 text-black hover:bg-yellow-300 focus-visible:ring-amber-300" : "bg-slate-700 hover:bg-slate-600 text-slate-200 focus-visible:ring-indigo-400"}`,
                title: "Zmień rozmiar czcionki (A-, A, A+)",
                "aria-label": `Rozmiar czcionki: ${fontSizeLabels[accessibility.fontSizeDelta]}`,
                children: [
                  /* @__PURE__ */ jsxDEV(Type, { className: "w-3.5 h-3.5", "aria-hidden": "true" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 123,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: [
                    "Rozmiar: ",
                    fontSizeLabels[accessibility.fontSizeDelta]
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 124,
                    columnNumber: 13
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 113,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: toggleHighContrast,
                className: `px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 ${accessibility.highContrast ? "bg-yellow-300 text-black ring-2 ring-yellow-400 font-bold focus-visible:ring-white" : "bg-slate-700 hover:bg-slate-600 text-slate-200 focus-visible:ring-indigo-400"}`,
                title: "Przełącz wysoki kontrast (dla osób słabowidzących)",
                "aria-pressed": accessibility.highContrast,
                "aria-label": "Wysoki kontrast trybu ciemnego",
                children: [
                  /* @__PURE__ */ jsxDEV(Eye, { className: "w-3.5 h-3.5", "aria-hidden": "true" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 139,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: accessibility.highContrast ? "Kontrast: WŁĄCZONY" : "Wysoki Kontrast" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 140,
                    columnNumber: 13
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 128,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onOpenShortcutsHelp,
                className: `px-2 py-1 rounded text-xs font-medium flex items-center gap-1 transition-all focus-visible:outline-none focus-visible:ring-2 ${accessibility.highContrast ? "text-yellow-300 hover:underline focus-visible:ring-yellow-300" : "text-slate-300 hover:text-white hover:bg-slate-700/50 focus-visible:ring-indigo-400"}`,
                title: "Skróty klawiszowe (Skrót: ?)",
                "aria-label": "Otwórz skróty klawiszowe",
                children: [
                  /* @__PURE__ */ jsxDEV(HelpCircle, { className: "w-3.5 h-3.5", "aria-hidden": "true" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 154,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "hidden lg:inline", children: "Skróty (?)" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 155,
                    columnNumber: 13
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 144,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onOpenAccessibilityHelp,
                className: `px-2 py-1 rounded text-xs font-medium flex items-center gap-1 transition-all focus-visible:outline-none focus-visible:ring-2 ${accessibility.highContrast ? "text-yellow-300 hover:underline focus-visible:ring-yellow-300" : "text-slate-300 hover:text-white hover:bg-slate-700/50 focus-visible:ring-indigo-400"}`,
                "aria-label": "Opcje dostępności WCAG 2.1",
                children: /* @__PURE__ */ jsxDEV("span", { children: "WCAG Opcje" }, void 0, false, {
                  fileName: "/app/applet/src/components/Header.tsx",
                  lineNumber: 168,
                  columnNumber: 13
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 159,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Header.tsx",
            lineNumber: 110,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20", title: "Synchronizacja z 3 urządzeniami aktywna", children: [
              /* @__PURE__ */ jsxDEV(Smartphone, { className: "w-3.5 h-3.5", "aria-hidden": "true" }, void 0, false, {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 177,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Synchro: 3 urz." }, void 0, false, {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 178,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3 h-3 text-emerald-400", "aria-hidden": "true" }, void 0, false, {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 179,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Header.tsx",
              lineNumber: 176,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: `hidden lg:flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${user.isTwoFactorEnabled ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"}`, children: user.isTwoFactorEnabled ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-400", "aria-hidden": "true" }, void 0, false, {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 190,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "2FA Aktywne" }, void 0, false, {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 191,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Header.tsx",
              lineNumber: 189,
              columnNumber: 15
            }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-3.5 h-3.5 text-amber-400", "aria-hidden": "true" }, void 0, false, {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 195,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "2FA Wymagane" }, void 0, false, {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 196,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Header.tsx",
              lineNumber: 194,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/Header.tsx",
              lineNumber: 183,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onOpenNotifications,
                className: `relative p-2 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 ${accessibility.highContrast ? "bg-yellow-400 text-black hover:bg-yellow-300 focus-visible:ring-white" : "bg-slate-800 text-slate-200 hover:bg-slate-700 focus-visible:ring-indigo-400"}`,
                "aria-label": `Powiadomienia push (${unreadNotificationsCount} nieprzeczytanych)`,
                children: [
                  /* @__PURE__ */ jsxDEV(Bell, { className: "w-5 h-5", "aria-hidden": "true" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 211,
                    columnNumber: 13
                  }, this),
                  unreadNotificationsCount > 0 && /* @__PURE__ */ jsxDEV("span", { className: "absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white font-bold text-xs rounded-full flex items-center justify-center animate-pulse", children: unreadNotificationsCount }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 213,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 202,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 pl-2 border-l border-slate-800", children: [
              /* @__PURE__ */ jsxDEV(
                "img",
                {
                  src: user.avatarUrl,
                  alt: user.name,
                  className: "w-8 h-8 rounded-full object-cover border border-slate-700"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/Header.tsx",
                  lineNumber: 221,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { className: "hidden xl:block text-left", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-semibold leading-tight", children: user.name }, void 0, false, {
                  fileName: "/app/applet/src/components/Header.tsx",
                  lineNumber: 227,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 truncate max-w-[120px]", children: user.role }, void 0, false, {
                  fileName: "/app/applet/src/components/Header.tsx",
                  lineNumber: 228,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 226,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Header.tsx",
              lineNumber: 220,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Header.tsx",
            lineNumber: 173,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Header.tsx",
          lineNumber: 79,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/Header.tsx",
      lineNumber: 61,
      columnNumber: 5
    },
    this
  );
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhlYWRlci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBCZWxsLCBcbiAgU2hpZWxkQ2hlY2ssIFxuICBTaGllbGRBbGVydCwgXG4gIFN1biwgXG4gIE1vb24sIFxuICBUeXBlLCBcbiAgRXllLCBcbiAgSGVscENpcmNsZSwgXG4gIFNtYXJ0cGhvbmUsIFxuICBDaGVja0NpcmNsZTIgXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBUYWJUeXBlLCBVc2VyUHJvZmlsZSwgQWNjZXNzaWJpbGl0eVNldHRpbmdzLCBOb3RpZmljYXRpb25JdGVtIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbnRlcmZhY2UgSGVhZGVyUHJvcHMge1xuICBhY3RpdmVUYWI6IFRhYlR5cGU7XG4gIHVzZXI6IFVzZXJQcm9maWxlO1xuICBhY2Nlc3NpYmlsaXR5OiBBY2Nlc3NpYmlsaXR5U2V0dGluZ3M7XG4gIHNldEFjY2Vzc2liaWxpdHk6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPEFjY2Vzc2liaWxpdHlTZXR0aW5ncz4+O1xuICBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25JdGVtW107XG4gIG9uT3Blbk5vdGlmaWNhdGlvbnM6ICgpID0+IHZvaWQ7XG4gIG9uT3BlbkFjY2Vzc2liaWxpdHlIZWxwOiAoKSA9PiB2b2lkO1xuICBvbk9wZW5TaG9ydGN1dHNIZWxwOiAoKSA9PiB2b2lkO1xuICB1bnJlYWROb3RpZmljYXRpb25zQ291bnQ6IG51bWJlcjtcbiAgbGF0ZXN0Tm90aWZpY2F0aW9uTWVzc2FnZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IEhlYWRlcjogUmVhY3QuRkM8SGVhZGVyUHJvcHM+ID0gKHtcbiAgYWN0aXZlVGFiLFxuICB1c2VyLFxuICBhY2Nlc3NpYmlsaXR5LFxuICBzZXRBY2Nlc3NpYmlsaXR5LFxuICBvbk9wZW5Ob3RpZmljYXRpb25zLFxuICBvbk9wZW5BY2Nlc3NpYmlsaXR5SGVscCxcbiAgb25PcGVuU2hvcnRjdXRzSGVscCxcbiAgdW5yZWFkTm90aWZpY2F0aW9uc0NvdW50LFxuICBsYXRlc3ROb3RpZmljYXRpb25NZXNzYWdlLFxufSkgPT4ge1xuICBjb25zdCB0YWJUaXRsZXM6IFJlY29yZDxUYWJUeXBlLCBzdHJpbmc+ID0ge1xuICAgIG1haWw6ICdQb2N6dGEgRmlybW93YSAmIEFJJyxcbiAgICB0YXNrczogJ1phcnrEhWR6YW5pZSBaYWRhbmlhbWknLFxuICAgIGNhbGVuZGFyOiAnS2FsZW5kYXJ6ICYgU3luY2hyb25pemFjamEnLFxuICAgIHNlbzogJ0F1ZHl0IFNFTyAmIE9wdHltYWxpemFjamEnLFxuICAgIGFuYWx5dGljczogJ1N0YXR5c3R5a2kgUnVjaHUnLFxuICAgIHJlcG9ydHM6ICdSYXBvcnR5IE1pZXNpxJljem5lIFBERicsXG4gICAgc2VjdXJpdHk6ICdCZXpwaWVjemXFhHN0d28gMkZBJyxcbiAgfTtcblxuICBjb25zdCB0b2dnbGVIaWdoQ29udHJhc3QgPSAoKSA9PiB7XG4gICAgc2V0QWNjZXNzaWJpbGl0eShwcmV2ID0+ICh7IC4uLnByZXYsIGhpZ2hDb250cmFzdDogIXByZXYuaGlnaENvbnRyYXN0IH0pKTtcbiAgfTtcblxuICBjb25zdCBjeWNsZUZvbnRTaXplID0gKCkgPT4ge1xuICAgIHNldEFjY2Vzc2liaWxpdHkocHJldiA9PiAoeyAuLi5wcmV2LCBmb250U2l6ZURlbHRhOiAocHJldi5mb250U2l6ZURlbHRhICsgMSkgJSA0IH0pKTtcbiAgfTtcblxuICBjb25zdCBmb250U2l6ZUxhYmVscyA9IFsnMTAwJScsICcxMTAlJywgJzEyMCUnLCAnMTMwJSddO1xuXG4gIHJldHVybiAoXG4gICAgPGhlYWRlciBcbiAgICAgIGNsYXNzTmFtZT17YGJvcmRlci1iIHN0aWNreSB0b3AtMCB6LTMwIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTIwMCAke1xuICAgICAgICBhY2Nlc3NpYmlsaXR5LmhpZ2hDb250cmFzdCBcbiAgICAgICAgICA/ICdiZy1ibGFjayBib3JkZXItYW1iZXItNDAwIHRleHQteWVsbG93LTMwMCcgXG4gICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzk1IGJhY2tkcm9wLWJsdXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTEwMCdcbiAgICAgIH1gfVxuICAgICAgcm9sZT1cImJhbm5lclwiXG4gICAgPlxuICAgICAgey8qIEhpZGRlbiBMaXZlIFJlZ2lvbiBmb3IgU2NyZWVuIFJlYWRlcnMgKi99XG4gICAgICA8ZGl2IFxuICAgICAgICBhcmlhLWxpdmU9XCJwb2xpdGVcIiBcbiAgICAgICAgYXJpYS1hdG9taWM9XCJ0cnVlXCIgXG4gICAgICAgIGNsYXNzTmFtZT1cInNyLW9ubHlcIlxuICAgICAgICBpZD1cImExMXktYW5ub3VuY2VyXCJcbiAgICAgID5cbiAgICAgICAge2xhdGVzdE5vdGlmaWNhdGlvbk1lc3NhZ2UgPyBgTm93ZSBwb3dpYWRvbWllbmllOiAke2xhdGVzdE5vdGlmaWNhdGlvbk1lc3NhZ2V9YCA6ICcnfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggaC0xNiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgXG4gICAgICAgIHsvKiBMZWZ0OiBCcmFuZCAmIEFjdGl2ZSBDb250ZXh0ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2B3LTEwIGgtMTAgcm91bmRlZC14bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBmb250LWJvbGQgdGV4dC1sZyBzaGFkb3ctbWQgJHtcbiAgICAgICAgICAgIGFjY2Vzc2liaWxpdHkuaGlnaENvbnRyYXN0IFxuICAgICAgICAgICAgICA/ICdiZy1hbWJlci00MDAgdGV4dC1ibGFjayByaW5nLTIgcmluZy15ZWxsb3ctMzAwJyBcbiAgICAgICAgICAgICAgOiAnYmctaW5kaWdvLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1pbmRpZ28tOTAwLzUwJ1xuICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgIE9TXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRyYWNraW5nLXRpZ2h0IGxlYWRpbmctdGlnaHRcIj5cbiAgICAgICAgICAgICAgICBPbW5pU3VpdGUgRW50ZXJwcmlzZVxuICAgICAgICAgICAgICA8L2gxPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B0ZXh0LXhzIHB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBmb250LW1lZGl1bSAke1xuICAgICAgICAgICAgICAgIGFjY2Vzc2liaWxpdHkuaGlnaENvbnRyYXN0IFxuICAgICAgICAgICAgICAgICAgPyAnYmcteWVsbG93LTQwMCB0ZXh0LWJsYWNrIGZvbnQtYm9sZCcgXG4gICAgICAgICAgICAgICAgICA6ICdiZy1pbmRpZ28tNTAwLzIwIHRleHQtaW5kaWdvLTMwMCBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvMzAnXG4gICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICBXQ0FHIDIuMSBBQUFcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9e2B0ZXh0LXhzICR7YWNjZXNzaWJpbGl0eS5oaWdoQ29udHJhc3QgPyAndGV4dC15ZWxsb3ctMjAwJyA6ICd0ZXh0LXNsYXRlLTQwMCd9YH0+XG4gICAgICAgICAgICAgIHt0YWJUaXRsZXNbYWN0aXZlVGFiXX1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIENlbnRlcjogUXVpY2sgQWNjZXNzaWJpbGl0eSBUb29sYmFyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpZGRlbiBtZDpmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBiZy1zbGF0ZS04MDAvODAgcC0xLjUgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMC82MFwiIHJvbGU9XCJyZWdpb25cIiBhcmlhLWxhYmVsPVwiTmFyesSZZHppYSBkb3N0xJlwbm/Fm2NpIGN5ZnJvd2VqXCI+XG4gICAgICAgICAgXG4gICAgICAgICAgey8qIEZvbnQgU2l6ZSBCdXR0b24gKi99XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17Y3ljbGVGb250U2l6ZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xIHJvdW5kZWQgdGV4dC14cyBmb250LXNlbWlib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGwgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLW5vbmUgZm9jdXMtdmlzaWJsZTpyaW5nLTIgJHtcbiAgICAgICAgICAgICAgYWNjZXNzaWJpbGl0eS5oaWdoQ29udHJhc3RcbiAgICAgICAgICAgICAgICA/ICdiZy15ZWxsb3ctNDAwIHRleHQtYmxhY2sgaG92ZXI6YmcteWVsbG93LTMwMCBmb2N1cy12aXNpYmxlOnJpbmctYW1iZXItMzAwJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTcwMCBob3ZlcjpiZy1zbGF0ZS02MDAgdGV4dC1zbGF0ZS0yMDAgZm9jdXMtdmlzaWJsZTpyaW5nLWluZGlnby00MDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIHRpdGxlPVwiWm1pZcWEIHJvem1pYXIgY3pjaW9ua2kgKEEtLCBBLCBBKylcIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD17YFJvem1pYXIgY3pjaW9ua2k6ICR7Zm9udFNpemVMYWJlbHNbYWNjZXNzaWJpbGl0eS5mb250U2l6ZURlbHRhXX1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxUeXBlIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPlJvem1pYXI6IHtmb250U2l6ZUxhYmVsc1thY2Nlc3NpYmlsaXR5LmZvbnRTaXplRGVsdGFdfTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIHsvKiBIaWdoIENvbnRyYXN0IFRvZ2dsZSAqL31cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXt0b2dnbGVIaWdoQ29udHJhc3R9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yLjUgcHktMSByb3VuZGVkIHRleHQteHMgZm9udC1zZW1pYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tYWxsIGZvY3VzLXZpc2libGU6b3V0bGluZS1ub25lIGZvY3VzLXZpc2libGU6cmluZy0yICR7XG4gICAgICAgICAgICAgIGFjY2Vzc2liaWxpdHkuaGlnaENvbnRyYXN0XG4gICAgICAgICAgICAgICAgPyAnYmcteWVsbG93LTMwMCB0ZXh0LWJsYWNrIHJpbmctMiByaW5nLXllbGxvdy00MDAgZm9udC1ib2xkIGZvY3VzLXZpc2libGU6cmluZy13aGl0ZSdcbiAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS03MDAgaG92ZXI6Ymctc2xhdGUtNjAwIHRleHQtc2xhdGUtMjAwIGZvY3VzLXZpc2libGU6cmluZy1pbmRpZ28tNDAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICB0aXRsZT1cIlByemXFgsSFY3ogd3lzb2tpIGtvbnRyYXN0IChkbGEgb3PDs2Igc8WCYWJvd2lkesSFY3ljaClcIlxuICAgICAgICAgICAgYXJpYS1wcmVzc2VkPXthY2Nlc3NpYmlsaXR5LmhpZ2hDb250cmFzdH1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJXeXNva2kga29udHJhc3QgdHJ5YnUgY2llbW5lZ29cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxFeWUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxuICAgICAgICAgICAgPHNwYW4+e2FjY2Vzc2liaWxpdHkuaGlnaENvbnRyYXN0ID8gJ0tvbnRyYXN0OiBXxYHEhENaT05ZJyA6ICdXeXNva2kgS29udHJhc3QnfTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIHsvKiBTaG9ydGN1dHMgSGVscCAqL31cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtvbk9wZW5TaG9ydGN1dHNIZWxwfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMiBweS0xIHJvdW5kZWQgdGV4dC14cyBmb250LW1lZGl1bSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0cmFuc2l0aW9uLWFsbCBmb2N1cy12aXNpYmxlOm91dGxpbmUtbm9uZSBmb2N1cy12aXNpYmxlOnJpbmctMiAke1xuICAgICAgICAgICAgICBhY2Nlc3NpYmlsaXR5LmhpZ2hDb250cmFzdFxuICAgICAgICAgICAgICAgID8gJ3RleHQteWVsbG93LTMwMCBob3Zlcjp1bmRlcmxpbmUgZm9jdXMtdmlzaWJsZTpyaW5nLXllbGxvdy0zMDAnXG4gICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSBob3ZlcjpiZy1zbGF0ZS03MDAvNTAgZm9jdXMtdmlzaWJsZTpyaW5nLWluZGlnby00MDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIHRpdGxlPVwiU2tyw7N0eSBrbGF3aXN6b3dlIChTa3LDs3Q6ID8pXCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJPdHfDs3J6IHNrcsOzdHkga2xhd2lzem93ZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEhlbHBDaXJjbGUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlkZGVuIGxnOmlubGluZVwiPlNrcsOzdHkgKD8pPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgey8qIFdDQUcgSW5mbyAqL31cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtvbk9wZW5BY2Nlc3NpYmlsaXR5SGVscH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIgcHktMSByb3VuZGVkIHRleHQteHMgZm9udC1tZWRpdW0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdHJhbnNpdGlvbi1hbGwgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLW5vbmUgZm9jdXMtdmlzaWJsZTpyaW5nLTIgJHtcbiAgICAgICAgICAgICAgYWNjZXNzaWJpbGl0eS5oaWdoQ29udHJhc3RcbiAgICAgICAgICAgICAgICA/ICd0ZXh0LXllbGxvdy0zMDAgaG92ZXI6dW5kZXJsaW5lIGZvY3VzLXZpc2libGU6cmluZy15ZWxsb3ctMzAwJ1xuICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6Ymctc2xhdGUtNzAwLzUwIGZvY3VzLXZpc2libGU6cmluZy1pbmRpZ28tNDAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiT3BjamUgZG9zdMSZcG5vxZtjaSBXQ0FHIDIuMVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4+V0NBRyBPcGNqZTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFJpZ2h0OiBTeW5jIFN0YXR1cywgTm90aWZpY2F0aW9ucyAmIFByb2ZpbGUgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICBcbiAgICAgICAgICB7LyogTXVsdGktRGV2aWNlIFN5bmMgSW5kaWNhdG9yICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlkZGVuIHNtOmZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMi41IHB5LTEgcm91bmRlZC1mdWxsIHRleHQteHMgZm9udC1tZWRpdW0gYmctZW1lcmFsZC01MDAvMTAgdGV4dC1lbWVyYWxkLTQwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzIwXCIgdGl0bGU9XCJTeW5jaHJvbml6YWNqYSB6IDMgdXJ6xIVkemVuaWFtaSBha3R5d25hXCI+XG4gICAgICAgICAgICA8U21hcnRwaG9uZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5TeW5jaHJvOiAzIHVyei48L3NwYW4+XG4gICAgICAgICAgICA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1lbWVyYWxkLTQwMFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogMkZBIEJhZGdlICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgaGlkZGVuIGxnOmZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHB4LTIgcHktMSByb3VuZGVkIHRleHQteHMgZm9udC1zZW1pYm9sZCAke1xuICAgICAgICAgICAgdXNlci5pc1R3b0ZhY3RvckVuYWJsZWQgXG4gICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtNTAwLzIwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC8zMCcgXG4gICAgICAgICAgICAgIDogJ2JnLWFtYmVyLTUwMC8yMCB0ZXh0LWFtYmVyLTMwMCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC8zMCdcbiAgICAgICAgICB9YH0+XG4gICAgICAgICAgICB7dXNlci5pc1R3b0ZhY3RvckVuYWJsZWQgPyAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPjJGQSBBa3R5d25lPC9zcGFuPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPFNoaWVsZEFsZXJ0IGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNDAwXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj4yRkEgV3ltYWdhbmU8L3NwYW4+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBOb3RpZmljYXRpb25zIEJ1dHRvbiAqL31cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtvbk9wZW5Ob3RpZmljYXRpb25zfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcmVsYXRpdmUgcC0yIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1hbGwgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLW5vbmUgZm9jdXMtdmlzaWJsZTpyaW5nLTIgJHtcbiAgICAgICAgICAgICAgYWNjZXNzaWJpbGl0eS5oaWdoQ29udHJhc3RcbiAgICAgICAgICAgICAgICA/ICdiZy15ZWxsb3ctNDAwIHRleHQtYmxhY2sgaG92ZXI6YmcteWVsbG93LTMwMCBmb2N1cy12aXNpYmxlOnJpbmctd2hpdGUnXG4gICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtODAwIHRleHQtc2xhdGUtMjAwIGhvdmVyOmJnLXNsYXRlLTcwMCBmb2N1cy12aXNpYmxlOnJpbmctaW5kaWdvLTQwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgYXJpYS1sYWJlbD17YFBvd2lhZG9taWVuaWEgcHVzaCAoJHt1bnJlYWROb3RpZmljYXRpb25zQ291bnR9IG5pZXByemVjenl0YW55Y2gpYH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8QmVsbCBjbGFzc05hbWU9XCJ3LTUgaC01XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgIHt1bnJlYWROb3RpZmljYXRpb25zQ291bnQgPiAwICYmIChcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRvcC0xIC1yaWdodC0xIHctNSBoLTUgYmctcm9zZS01MDAgdGV4dC13aGl0ZSBmb250LWJvbGQgdGV4dC14cyByb3VuZGVkLWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYW5pbWF0ZS1wdWxzZVwiPlxuICAgICAgICAgICAgICAgIHt1bnJlYWROb3RpZmljYXRpb25zQ291bnR9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICB7LyogVXNlciBBdmF0YXIgJiBJbmZvICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcGwtMiBib3JkZXItbCBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICA8aW1nIFxuICAgICAgICAgICAgICBzcmM9e3VzZXIuYXZhdGFyVXJsfSBcbiAgICAgICAgICAgICAgYWx0PXt1c2VyLm5hbWV9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZC1mdWxsIG9iamVjdC1jb3ZlciBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaWRkZW4geGw6YmxvY2sgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIGxlYWRpbmctdGlnaHRcIj57dXNlci5uYW1lfTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHRydW5jYXRlIG1heC13LVsxMjBweF1cIj57dXNlci5yb2xlfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgIDwvaGVhZGVyPlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBcUVNLFNBdUhRLFVBdkhSO0FBcEVOO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFHQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxPQUNLO0FBZ0JBLGFBQU0sU0FBZ0MsQ0FBQztBQUFBLEVBQzVDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFNO0FBQ0osUUFBTSxZQUFxQztBQUFBLElBQ3pDLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxJQUNQLFVBQVU7QUFBQSxJQUNWLEtBQUs7QUFBQSxJQUNMLFdBQVc7QUFBQSxJQUNYLFNBQVM7QUFBQSxJQUNULFVBQVU7QUFBQSxFQUNaO0FBRUEsUUFBTSxxQkFBcUIsTUFBTTtBQUMvQixxQkFBaUIsV0FBUyxFQUFFLEdBQUcsTUFBTSxjQUFjLENBQUMsS0FBSyxhQUFhLEVBQUU7QUFBQSxFQUMxRTtBQUVBLFFBQU0sZ0JBQWdCLE1BQU07QUFDMUIscUJBQWlCLFdBQVMsRUFBRSxHQUFHLE1BQU0sZ0JBQWdCLEtBQUssZ0JBQWdCLEtBQUssRUFBRSxFQUFFO0FBQUEsRUFDckY7QUFFQSxRQUFNLGlCQUFpQixDQUFDLFFBQVEsUUFBUSxRQUFRLE1BQU07QUFFdEQsU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsV0FBVyw2REFDVCxjQUFjLGVBQ1YsOENBQ0EsK0RBQ047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VSw4QkFBNkIsZUFBWSxVQUFoRTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUF1RTtBQUFBLGNBQ3ZFLHVCQUFDLFVBQUssNEJBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBa0I7QUFBQSxpQkFGcEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFHQSxLQWRKO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBZ0JBO0FBQUEsWUFHQTtBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUNDLFNBQVM7QUFBQSxnQkFDVCxXQUFXLDBGQUNULGNBQWMsZUFDViwwRUFDQSw4RUFDTjtBQUFBLGdCQUNBLGNBQVksdUJBQXVCLHdCQUF3QjtBQUFBLGdCQUUzRDtBQUFBLHlDQUFDLFFBQUssV0FBVSxXQUFVLGVBQVksVUFBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBNkM7QUFBQSxrQkFDNUMsMkJBQTJCLEtBQzFCLHVCQUFDLFVBQUssV0FBVSx5SUFDYixzQ0FESDtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUVBO0FBQUE7QUFBQTtBQUFBLGNBYko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBZUE7QUFBQSxZQUdBLHVCQUFDLFNBQUksV0FBVSwwREFDYjtBQUFBO0FBQUEsZ0JBQUM7QUFBQTtBQUFBLGtCQUNDLEtBQUssS0FBSztBQUFBLGtCQUNWLEtBQUssS0FBSztBQUFBLGtCQUNWLFdBQVU7QUFBQTtBQUFBLGdCQUhaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQUlBO0FBQUEsY0FDQSx1QkFBQyxTQUFJLFdBQVUsNkJBQ2I7QUFBQSx1Q0FBQyxTQUFJLFdBQVUsdUNBQXVDLGVBQUssUUFBM0Q7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBZ0U7QUFBQSxnQkFDaEUsdUJBQUMsU0FBSSxXQUFVLHFEQUFxRCxlQUFLLFFBQXpFO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQThFO0FBQUEsbUJBRmhGO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBR0E7QUFBQSxpQkFURjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQVVBO0FBQUEsZUF6REY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkEyREE7QUFBQSxhQXpKRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBMkpBO0FBQUE7QUFBQTtBQUFBLElBN0tGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQThLQTtBQUVKOyIsIm5hbWVzIjpbXX0=