import __vite__cjsImport0_react_jsxDevRuntime from "/ai-studio-app/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=d886a827"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import {
  Bell,
  X,
  Mail,
  CheckSquare,
  Calendar as CalendarIcon,
  Search,
  ShieldCheck,
  Trash2,
  CheckCheck
} from "/ai-studio-app/node_modules/.vite/deps/lucide-react.js?v=5db40f83";
export const NotificationDrawer = ({
  isOpen,
  onClose,
  notifications,
  setNotifications,
  accessibility
}) => {
  if (!isOpen) return null;
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };
  const clearAllNotifications = () => {
    setNotifications([]);
  };
  const iconMap = {
    mail: Mail,
    task: CheckSquare,
    calendar: CalendarIcon,
    seo: Search,
    security: ShieldCheck,
    system: Bell
  };
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      className: "fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Centrum Powiadomień Push",
      children: /* @__PURE__ */ jsxDEV("div", { className: `w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between border-l transition-colors ${accessibility.highContrast ? "bg-black border-yellow-400 text-yellow-300" : "bg-slate-900 border-slate-800 text-slate-100"}`, children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-4 mb-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(Bell, { className: "w-5 h-5 text-indigo-400" }, void 0, false, {
                fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
                lineNumber: 66,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold", children: "Powiadomienia Push w Czasie Rzeczywistym" }, void 0, false, {
                fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
                lineNumber: 67,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
              lineNumber: 65,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onClose,
                className: "p-1 rounded-lg text-slate-400 hover:text-white",
                "aria-label": "Zamknij powiadomienia",
                children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
                  fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
                  lineNumber: 75,
                  columnNumber: 15
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
                lineNumber: 70,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
            lineNumber: 64,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs mb-4", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: [
              notifications.length,
              " zarejestrowanych alertów"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
              lineNumber: 80,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: markAllAsRead,
                  className: "text-indigo-400 hover:underline flex items-center gap-1 font-semibold",
                  children: [
                    /* @__PURE__ */ jsxDEV(CheckCheck, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
                      lineNumber: 87,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Oznacz przeczytane" }, void 0, false, {
                      fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
                      lineNumber: 88,
                      columnNumber: 17
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
                  lineNumber: 83,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: clearAllNotifications,
                  className: "text-slate-500 hover:text-rose-400 flex items-center gap-1 font-semibold",
                  children: [
                    /* @__PURE__ */ jsxDEV(Trash2, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
                      lineNumber: 95,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Wyczyszczenie" }, void 0, false, {
                      fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
                      lineNumber: 96,
                      columnNumber: 17
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
                  lineNumber: 91,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
              lineNumber: 82,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
            lineNumber: 79,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 max-h-[calc(100vh-180px)] overflow-y-auto pr-1", children: notifications.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "text-center py-20 text-slate-500 text-xs", children: "Brak nowych powiadomień. Akcje z poczty, kalendarza i SEO pojawią się tutaj w czasie rzeczywistym." }, void 0, false, {
            fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
            lineNumber: 104,
            columnNumber: 15
          }, this) : notifications.map((n) => {
            const Icon = iconMap[n.type] || Bell;
            return /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: `p-3.5 rounded-2xl border transition-all space-y-1 ${accessibility.highContrast ? "bg-black border-yellow-400/80 text-yellow-300" : n.read ? "bg-slate-800/40 border-slate-800 text-slate-400" : "bg-slate-800 border-slate-700 text-slate-100 font-semibold"}`,
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxDEV(Icon, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
                        fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
                        lineNumber: 124,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "font-bold", children: n.title }, void 0, false, {
                        fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
                        lineNumber: 125,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
                      lineNumber: 123,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500", children: n.timestamp }, void 0, false, {
                      fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
                      lineNumber: 127,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
                    lineNumber: 122,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 leading-relaxed font-normal", children: n.message }, void 0, false, {
                    fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
                    lineNumber: 130,
                    columnNumber: 21
                  }, this)
                ]
              },
              n.id,
              true,
              {
                fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
                lineNumber: 112,
                columnNumber: 19
              },
              this
            );
          }) }, void 0, false, {
            fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
            lineNumber: 102,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
          lineNumber: 63,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "pt-4 border-t border-slate-800 text-center text-xs text-slate-500", children: "Wszystkie powiadomienia są zsynchronizowane z urządzeniami mobilnymi." }, void 0, false, {
          fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
          lineNumber: 140,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
        lineNumber: 56,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/applet/src/components/notifications/NotificationDrawer.tsx",
      lineNumber: 50,
      columnNumber: 5
    },
    this
  );
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk5vdGlmaWNhdGlvbkRyYXdlci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBCZWxsLCBcbiAgWCwgXG4gIE1haWwsIFxuICBDaGVja1NxdWFyZSwgXG4gIENhbGVuZGFyIGFzIENhbGVuZGFySWNvbiwgXG4gIFNlYXJjaCwgXG4gIFNoaWVsZENoZWNrLCBcbiAgVHJhc2gyLCBcbiAgQ2hlY2tDaGVjayBcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbkl0ZW0sIEFjY2Vzc2liaWxpdHlTZXR0aW5ncyB9IGZyb20gJy4uLy4uL3R5cGVzJztcblxuaW50ZXJmYWNlIE5vdGlmaWNhdGlvbkRyYXdlclByb3BzIHtcbiAgaXNPcGVuOiBib29sZWFuO1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xuICBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25JdGVtW107XG4gIHNldE5vdGlmaWNhdGlvbnM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPE5vdGlmaWNhdGlvbkl0ZW1bXT4+O1xuICBhY2Nlc3NpYmlsaXR5OiBBY2Nlc3NpYmlsaXR5U2V0dGluZ3M7XG59XG5cbmV4cG9ydCBjb25zdCBOb3RpZmljYXRpb25EcmF3ZXI6IFJlYWN0LkZDPE5vdGlmaWNhdGlvbkRyYXdlclByb3BzPiA9ICh7XG4gIGlzT3BlbixcbiAgb25DbG9zZSxcbiAgbm90aWZpY2F0aW9ucyxcbiAgc2V0Tm90aWZpY2F0aW9ucyxcbiAgYWNjZXNzaWJpbGl0eSxcbn0pID0+IHtcbiAgaWYgKCFpc09wZW4pIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IG1hcmtBbGxBc1JlYWQgPSAoKSA9PiB7XG4gICAgc2V0Tm90aWZpY2F0aW9ucyhwcmV2ID0+IHByZXYubWFwKG4gPT4gKHsgLi4ubiwgcmVhZDogdHJ1ZSB9KSkpO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFyQWxsTm90aWZpY2F0aW9ucyA9ICgpID0+IHtcbiAgICBzZXROb3RpZmljYXRpb25zKFtdKTtcbiAgfTtcblxuICBjb25zdCBpY29uTWFwID0ge1xuICAgIG1haWw6IE1haWwsXG4gICAgdGFzazogQ2hlY2tTcXVhcmUsXG4gICAgY2FsZW5kYXI6IENhbGVuZGFySWNvbixcbiAgICBzZW86IFNlYXJjaCxcbiAgICBzZWN1cml0eTogU2hpZWxkQ2hlY2ssXG4gICAgc3lzdGVtOiBCZWxsLFxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBcbiAgICAgIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBvdmVyZmxvdy1oaWRkZW4gYmctYmxhY2svNjAgYmFja2Ryb3AtYmx1ci1zbSBmbGV4IGp1c3RpZnktZW5kXCJcbiAgICAgIHJvbGU9XCJkaWFsb2dcIlxuICAgICAgYXJpYS1tb2RhbD1cInRydWVcIlxuICAgICAgYXJpYS1sYWJlbD1cIkNlbnRydW0gUG93aWFkb21pZcWEIFB1c2hcIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdy1mdWxsIG1heC13LW1kIGgtZnVsbCBzaGFkb3ctMnhsIHAtNiBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBib3JkZXItbCB0cmFuc2l0aW9uLWNvbG9ycyAke1xuICAgICAgICBhY2Nlc3NpYmlsaXR5LmhpZ2hDb250cmFzdCBcbiAgICAgICAgICA/ICdiZy1ibGFjayBib3JkZXIteWVsbG93LTQwMCB0ZXh0LXllbGxvdy0zMDAnIFxuICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMCBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtMTAwJ1xuICAgICAgfWB9PlxuICAgICAgICBcbiAgICAgICAgey8qIEhlYWRlciAqL31cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHBiLTQgbWItNFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8QmVsbCBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtaW5kaWdvLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ib2xkXCI+UG93aWFkb21pZW5pYSBQdXNoIHcgQ3phc2llIFJ6ZWN6eXdpc3R5bTwvaDM+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEgcm91bmRlZC1sZyB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIlphbWtuaWogcG93aWFkb21pZW5pYVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIG1iLTRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+e25vdGlmaWNhdGlvbnMubGVuZ3RofSB6YXJlamVzdHJvd2FueWNoIGFsZXJ0w7N3PC9zcGFuPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTNcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e21hcmtBbGxBc1JlYWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1pbmRpZ28tNDAwIGhvdmVyOnVuZGVybGluZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBmb250LXNlbWlib2xkXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxDaGVja0NoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Pem5hY3ogcHJ6ZWN6eXRhbmU8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbGVhckFsbE5vdGlmaWNhdGlvbnN9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1yb3NlLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBmb250LXNlbWlib2xkXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxUcmFzaDIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPld5Y3p5c3pjemVuaWU8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogTGlzdCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMyBtYXgtaC1bY2FsYygxMDB2aC0xODBweCldIG92ZXJmbG93LXktYXV0byBwci0xXCI+XG4gICAgICAgICAgICB7bm90aWZpY2F0aW9ucy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgcHktMjAgdGV4dC1zbGF0ZS01MDAgdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgIEJyYWsgbm93eWNoIHBvd2lhZG9taWXFhC4gQWtjamUgeiBwb2N6dHksIGthbGVuZGFyemEgaSBTRU8gcG9qYXdpxIUgc2nEmSB0dXRhaiB3IGN6YXNpZSByemVjenl3aXN0eW0uXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgbm90aWZpY2F0aW9ucy5tYXAobiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgSWNvbiA9IGljb25NYXBbbi50eXBlXSB8fCBCZWxsO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAga2V5PXtuLmlkfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTMuNSByb3VuZGVkLTJ4bCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgc3BhY2UteS0xICR7XG4gICAgICAgICAgICAgICAgICAgICAgYWNjZXNzaWJpbGl0eS5oaWdoQ29udHJhc3RcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWJsYWNrIGJvcmRlci15ZWxsb3ctNDAwLzgwIHRleHQteWVsbG93LTMwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbi5yZWFkXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXNsYXRlLTgwMC80MCBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtNDAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS04MDAgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTEwMCBmb250LXNlbWlib2xkJ1xuICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZFwiPntuLnRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMFwiPntuLnRpbWVzdGFtcH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS0zMDAgbGVhZGluZy1yZWxheGVkIGZvbnQtbm9ybWFsXCI+XG4gICAgICAgICAgICAgICAgICAgICAge24ubWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtNCBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIHRleHQtY2VudGVyIHRleHQteHMgdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICBXc3p5c3RraWUgcG93aWFkb21pZW5pYSBzxIUgenN5bmNocm9uaXpvd2FuZSB6IHVyesSFZHplbmlhbWkgbW9iaWxueW1pLlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFpRWM7QUFoRWQ7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxZQUFZO0FBQUEsRUFDWjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE9BQ0s7QUFXQSxhQUFNLHFCQUF3RCxDQUFDO0FBQUEsRUFDcEU7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FB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