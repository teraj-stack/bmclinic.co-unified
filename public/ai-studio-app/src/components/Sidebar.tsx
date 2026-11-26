import __vite__cjsImport0_react_jsxDevRuntime from "/ai-studio-app/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=d886a827"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import {
  Mail,
  CheckSquare,
  Calendar as CalendarIcon,
  Search,
  BarChart3,
  FileText,
  ShieldCheck,
  Info
} from "/ai-studio-app/node_modules/.vite/deps/lucide-react.js?v=5db40f83";
export const Sidebar = ({
  activeTab,
  setActiveTab,
  accessibility,
  unreadMailCount,
  openTasksCount,
  todayEventsCount
}) => {
  const navItems = [
    { id: "mail", label: "Poczta Firmowa", icon: Mail, badge: unreadMailCount, shortcutKey: "Alt+1" },
    { id: "tasks", label: "Zarządzanie Zadaniami", icon: CheckSquare, badge: openTasksCount, shortcutKey: "Alt+2" },
    { id: "calendar", label: "Kalendarz & Synchro", icon: CalendarIcon, badge: todayEventsCount, shortcutKey: "Alt+3" },
    { id: "seo", label: "Audyt SEO & Treści", icon: Search, shortcutKey: "Alt+4" },
    { id: "analytics", label: "Statystyki Ruchu", icon: BarChart3, shortcutKey: "Alt+5" },
    { id: "reports", label: "Raporty Miesięczne PDF", icon: FileText, shortcutKey: "Alt+6" },
    { id: "security", label: "Bezpieczeństwo 2FA", icon: ShieldCheck, shortcutKey: "Alt+7" }
  ];
  return /* @__PURE__ */ jsxDEV(
    "aside",
    {
      className: `w-full md:w-64 flex-shrink-0 border-r p-4 transition-colors duration-200 ${accessibility.highContrast ? "bg-black border-yellow-400/40 text-yellow-300" : "bg-slate-900/80 border-slate-800 text-slate-300"}`,
      "aria-label": "Nawigacja główna aplikacji",
      children: [
        /* @__PURE__ */ jsxDEV("nav", { className: "space-y-1.5", role: "navigation", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400", children: "Główne Moduły" }, void 0, false, {
            fileName: "/app/applet/src/components/Sidebar.tsx",
            lineNumber: 52,
            columnNumber: 9
          }, this),
          navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setActiveTab(item.id),
                className: `w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-4 ${accessibility.highContrast ? isActive ? "bg-yellow-400 text-black ring-2 ring-yellow-300 font-bold" : "hover:bg-yellow-900/30 text-yellow-300 focus-visible:ring-amber-300" : isActive ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/30" : "text-slate-300 hover:bg-slate-800 hover:text-white focus-visible:ring-indigo-400"}`,
                "aria-current": isActive ? "page" : void 0,
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 truncate", children: [
                    /* @__PURE__ */ jsxDEV(Icon, { className: `w-5 h-5 flex-shrink-0 ${isActive ? accessibility.highContrast ? "text-black" : "text-white" : "text-slate-400"}`, "aria-hidden": "true" }, void 0, false, {
                      fileName: "/app/applet/src/components/Sidebar.tsx",
                      lineNumber: 76,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "truncate", children: item.label }, void 0, false, {
                      fileName: "/app/applet/src/components/Sidebar.tsx",
                      lineNumber: 77,
                      columnNumber: 17
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/Sidebar.tsx",
                    lineNumber: 75,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                    item.badge !== void 0 && item.badge > 0 && /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded-full text-xs font-bold ${isActive ? accessibility.highContrast ? "bg-black text-yellow-300" : "bg-white/20 text-white" : "bg-indigo-500/20 text-indigo-300"}`, children: item.badge }, void 0, false, {
                      fileName: "/app/applet/src/components/Sidebar.tsx",
                      lineNumber: 82,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 hidden xl:inline", children: item.shortcutKey }, void 0, false, {
                      fileName: "/app/applet/src/components/Sidebar.tsx",
                      lineNumber: 90,
                      columnNumber: 17
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/Sidebar.tsx",
                    lineNumber: 80,
                    columnNumber: 15
                  }, this)
                ]
              },
              item.id,
              true,
              {
                fileName: "/app/applet/src/components/Sidebar.tsx",
                lineNumber: 61,
                columnNumber: 13
              },
              this
            );
          })
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Sidebar.tsx",
          lineNumber: 51,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: `mt-8 p-3 rounded-xl border ${accessibility.highContrast ? "bg-yellow-950/20 border-yellow-400 text-yellow-200" : "bg-slate-800/60 border-slate-700/60 text-slate-400"}`, children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 font-semibold text-xs text-indigo-300 mb-1", children: [
            /* @__PURE__ */ jsxDEV(Info, { className: "w-4 h-4 text-indigo-400", "aria-hidden": "true" }, void 0, false, {
              fileName: "/app/applet/src/components/Sidebar.tsx",
              lineNumber: 104,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Dostępność WCAG 2.1" }, void 0, false, {
              fileName: "/app/applet/src/components/Sidebar.tsx",
              lineNumber: 105,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Sidebar.tsx",
            lineNumber: 103,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] leading-relaxed", children: "Pełna nawigacja klawiaturą (Tab, Enter, Escape). Wysoki kontrast, czytniki ekranu oraz sterowanie wielkością tekstu." }, void 0, false, {
            fileName: "/app/applet/src/components/Sidebar.tsx",
            lineNumber: 107,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Sidebar.tsx",
          lineNumber: 98,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/Sidebar.tsx",
      lineNumber: 43,
      columnNumber: 5
    },
    this
  );
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpZGViYXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBcbiAgTWFpbCwgXG4gIENoZWNrU3F1YXJlLCBcbiAgQ2FsZW5kYXIgYXMgQ2FsZW5kYXJJY29uLCBcbiAgU2VhcmNoLCBcbiAgQmFyQ2hhcnQzLCBcbiAgRmlsZVRleHQsIFxuICBTaGllbGRDaGVjaywgXG4gIENoZXZyb25SaWdodCxcbiAgSW5mb1xufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgVGFiVHlwZSwgQWNjZXNzaWJpbGl0eVNldHRpbmdzIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbnRlcmZhY2UgU2lkZWJhclByb3BzIHtcbiAgYWN0aXZlVGFiOiBUYWJUeXBlO1xuICBzZXRBY3RpdmVUYWI6ICh0YWI6IFRhYlR5cGUpID0+IHZvaWQ7XG4gIGFjY2Vzc2liaWxpdHk6IEFjY2Vzc2liaWxpdHlTZXR0aW5ncztcbiAgdW5yZWFkTWFpbENvdW50OiBudW1iZXI7XG4gIG9wZW5UYXNrc0NvdW50OiBudW1iZXI7XG4gIHRvZGF5RXZlbnRzQ291bnQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IFNpZGViYXI6IFJlYWN0LkZDPFNpZGViYXJQcm9wcz4gPSAoe1xuICBhY3RpdmVUYWIsXG4gIHNldEFjdGl2ZVRhYixcbiAgYWNjZXNzaWJpbGl0eSxcbiAgdW5yZWFkTWFpbENvdW50LFxuICBvcGVuVGFza3NDb3VudCxcbiAgdG9kYXlFdmVudHNDb3VudCxcbn0pID0+IHtcbiAgY29uc3QgbmF2SXRlbXM6IHsgaWQ6IFRhYlR5cGU7IGxhYmVsOiBzdHJpbmc7IGljb246IFJlYWN0LkVsZW1lbnRUeXBlOyBiYWRnZT86IG51bWJlcjsgc2hvcnRjdXRLZXk6IHN0cmluZyB9W10gPSBbXG4gICAgeyBpZDogJ21haWwnLCBsYWJlbDogJ1BvY3p0YSBGaXJtb3dhJywgaWNvbjogTWFpbCwgYmFkZ2U6IHVucmVhZE1haWxDb3VudCwgc2hvcnRjdXRLZXk6ICdBbHQrMScgfSxcbiAgICB7IGlkOiAndGFza3MnLCBsYWJlbDogJ1phcnrEhWR6YW5pZSBaYWRhbmlhbWknLCBpY29uOiBDaGVja1NxdWFyZSwgYmFkZ2U6IG9wZW5UYXNrc0NvdW50LCBzaG9ydGN1dEtleTogJ0FsdCsyJyB9LFxuICAgIHsgaWQ6ICdjYWxlbmRhcicsIGxhYmVsOiAnS2FsZW5kYXJ6ICYgU3luY2hybycsIGljb246IENhbGVuZGFySWNvbiwgYmFkZ2U6IHRvZGF5RXZlbnRzQ291bnQsIHNob3J0Y3V0S2V5OiAnQWx0KzMnIH0sXG4gICAgeyBpZDogJ3NlbycsIGxhYmVsOiAnQXVkeXQgU0VPICYgVHJlxZtjaScsIGljb246IFNlYXJjaCwgc2hvcnRjdXRLZXk6ICdBbHQrNCcgfSxcbiAgICB7IGlkOiAnYW5hbHl0aWNzJywgbGFiZWw6ICdTdGF0eXN0eWtpIFJ1Y2h1JywgaWNvbjogQmFyQ2hhcnQzLCBzaG9ydGN1dEtleTogJ0FsdCs1JyB9LFxuICAgIHsgaWQ6ICdyZXBvcnRzJywgbGFiZWw6ICdSYXBvcnR5IE1pZXNpxJljem5lIFBERicsIGljb246IEZpbGVUZXh0LCBzaG9ydGN1dEtleTogJ0FsdCs2JyB9LFxuICAgIHsgaWQ6ICdzZWN1cml0eScsIGxhYmVsOiAnQmV6cGllY3plxYRzdHdvIDJGQScsIGljb246IFNoaWVsZENoZWNrLCBzaG9ydGN1dEtleTogJ0FsdCs3JyB9LFxuICBdO1xuXG4gIHJldHVybiAoXG4gICAgPGFzaWRlIFxuICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIG1kOnctNjQgZmxleC1zaHJpbmstMCBib3JkZXItciBwLTQgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMjAwICR7XG4gICAgICAgIGFjY2Vzc2liaWxpdHkuaGlnaENvbnRyYXN0XG4gICAgICAgICAgPyAnYmctYmxhY2sgYm9yZGVyLXllbGxvdy00MDAvNDAgdGV4dC15ZWxsb3ctMzAwJ1xuICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMC84MCBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwJ1xuICAgICAgfWB9XG4gICAgICBhcmlhLWxhYmVsPVwiTmF3aWdhY2phIGfFgsOzd25hIGFwbGlrYWNqaVwiXG4gICAgPlxuICAgICAgPG5hdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiIHJvbGU9XCJuYXZpZ2F0aW9uXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtMyBweS0yIHRleHQtWzExcHhdIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICBHxYLDs3duZSBNb2R1xYJ5XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHtuYXZJdGVtcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICBjb25zdCBJY29uID0gaXRlbS5pY29uO1xuICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gYWN0aXZlVGFiID09PSBpdGVtLmlkO1xuXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoaXRlbS5pZCl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHgtMyBweS0yLjUgcm91bmRlZC1sZyB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvbi1hbGwgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLW5vbmUgZm9jdXMtdmlzaWJsZTpyaW5nLTQgJHtcbiAgICAgICAgICAgICAgICBhY2Nlc3NpYmlsaXR5LmhpZ2hDb250cmFzdFxuICAgICAgICAgICAgICAgICAgPyBpc0FjdGl2ZVxuICAgICAgICAgICAgICAgICAgICA/ICdiZy15ZWxsb3ctNDAwIHRleHQtYmxhY2sgcmluZy0yIHJpbmcteWVsbG93LTMwMCBmb250LWJvbGQnXG4gICAgICAgICAgICAgICAgICAgIDogJ2hvdmVyOmJnLXllbGxvdy05MDAvMzAgdGV4dC15ZWxsb3ctMzAwIGZvY3VzLXZpc2libGU6cmluZy1hbWJlci0zMDAnXG4gICAgICAgICAgICAgICAgICA6IGlzQWN0aXZlXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLWluZGlnby02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbWQgc2hhZG93LWluZGlnby05MDAvMzAnXG4gICAgICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtMzAwIGhvdmVyOmJnLXNsYXRlLTgwMCBob3Zlcjp0ZXh0LXdoaXRlIGZvY3VzLXZpc2libGU6cmluZy1pbmRpZ28tNDAwJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgYXJpYS1jdXJyZW50PXtpc0FjdGl2ZSA/ICdwYWdlJyA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyB0cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgIDxJY29uIGNsYXNzTmFtZT17YHctNSBoLTUgZmxleC1zaHJpbmstMCAke2lzQWN0aXZlID8gKGFjY2Vzc2liaWxpdHkuaGlnaENvbnRyYXN0ID8gJ3RleHQtYmxhY2snIDogJ3RleHQtd2hpdGUnKSA6ICd0ZXh0LXNsYXRlLTQwMCd9YH0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cnVuY2F0ZVwiPntpdGVtLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAge2l0ZW0uYmFkZ2UgIT09IHVuZGVmaW5lZCAmJiBpdGVtLmJhZGdlID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgdGV4dC14cyBmb250LWJvbGQgJHtcbiAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgXG4gICAgICAgICAgICAgICAgICAgICAgPyAoYWNjZXNzaWJpbGl0eS5oaWdoQ29udHJhc3QgPyAnYmctYmxhY2sgdGV4dC15ZWxsb3ctMzAwJyA6ICdiZy13aGl0ZS8yMCB0ZXh0LXdoaXRlJylcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1pbmRpZ28tNTAwLzIwIHRleHQtaW5kaWdvLTMwMCdcbiAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW0uYmFkZ2V9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMCBoaWRkZW4geGw6aW5saW5lXCI+e2l0ZW0uc2hvcnRjdXRLZXl9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9uYXY+XG5cbiAgICAgIHsvKiBXQ0FHICYgU3lzdGVtIEluZm8gUGFuZWwgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YG10LTggcC0zIHJvdW5kZWQteGwgYm9yZGVyICR7XG4gICAgICAgIGFjY2Vzc2liaWxpdHkuaGlnaENvbnRyYXN0XG4gICAgICAgICAgPyAnYmcteWVsbG93LTk1MC8yMCBib3JkZXIteWVsbG93LTQwMCB0ZXh0LXllbGxvdy0yMDAnXG4gICAgICAgICAgOiAnYmctc2xhdGUtODAwLzYwIGJvcmRlci1zbGF0ZS03MDAvNjAgdGV4dC1zbGF0ZS00MDAnXG4gICAgICB9YH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZm9udC1zZW1pYm9sZCB0ZXh0LXhzIHRleHQtaW5kaWdvLTMwMCBtYi0xXCI+XG4gICAgICAgICAgPEluZm8gY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWluZGlnby00MDBcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxuICAgICAgICAgIDxzcGFuPkRvc3TEmXBub8WbxIcgV0NBRyAyLjE8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICBQZcWCbmEgbmF3aWdhY2phIGtsYXdpYXR1csSFIChUYWIsIEVudGVyLCBFc2NhcGUpLiBXeXNva2kga29udHJhc3QsIGN6eXRuaWtpIGVrcmFudSBvcmF6IHN0ZXJvd2FuaWUgd2llbGtvxZtjacSFIHRla3N0dS5cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9hc2lkZT5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQW1EUTtBQWxEUjtBQUFBLEVBQ0U7QUFBQSxFQUNBO0FBQUEsRUFDQSxZQUFZO0FBQUEsRUFDWjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxPQUNLO0FBWUEsYUFBTSxVQUFrQyxDQUFDO0FBQUEsRUFDOUM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQU07QUFDSixRQUFNLFdBQTJHO0FBQUEsSUFDL0csRUFBRSxJQUFJLFFBQVEsT0FBTyxrQkFBa0IsTUFBTSxNQUFNLE9BQU8saUJBQWlCLGFBQWEsUUFBUTtBQUFBLElBQ2hHLEVBQUUsSUFBSSxTQUFTLE9BQU8seUJBQXlCLE1BQU0sYUFBYSxPQUFPLGdCQUFnQixhQUFhLFFBQVE7QUFBQSxJQUM5RyxFQUFFLElBQUksWUFBWSxPQUFPLHVCQUF1QixNQUFNLGNBQWMsT0FBTyxrQkFBa0IsYUFBYSxRQUFRO0FBQUEsSUFDbEgsRUFBRSxJQUFJLE9BQU8sT0FBTyxzQkFBc0IsTUFBTSxRQUFRLGFBQWEsUUFBUTtBQUFBLElBQzdFLEVB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