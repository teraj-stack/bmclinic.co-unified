import __vite__cjsImport0_react_jsxDevRuntime from "/ai-studio-app/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=d886a827"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/ai-studio-app/node_modules/.vite/deps/react.js?v=d886a827"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import { Header } from "/ai-studio-app/src/components/Header.tsx";
import { Sidebar } from "/ai-studio-app/src/components/Sidebar.tsx";
import { MailSection } from "/ai-studio-app/src/components/mail/MailSection.tsx";
import { TasksSection } from "/ai-studio-app/src/components/tasks/TasksSection.tsx";
import { CalendarSection } from "/ai-studio-app/src/components/calendar/CalendarSection.tsx";
import { SeoSection } from "/ai-studio-app/src/components/seo/SeoSection.tsx";
import { AnalyticsSection } from "/ai-studio-app/src/components/analytics/AnalyticsSection.tsx";
import { ReportsSection } from "/ai-studio-app/src/components/reports/ReportsSection.tsx";
import { Security2FASection } from "/ai-studio-app/src/components/security/Security2FASection.tsx";
import { AccessibilityModal } from "/ai-studio-app/src/components/accessibility/AccessibilityModal.tsx";
import { NotificationDrawer } from "/ai-studio-app/src/components/notifications/NotificationDrawer.tsx";
import {
  initialProfile,
  initialMails,
  initialTasks,
  initialEvents,
  initialNotifications
} from "/ai-studio-app/src/data/initialData.ts";
export default function App() {
  const [activeTab, setActiveTab] = useState("mail");
  const [user, setUser] = useState(initialProfile);
  const [accessibility, setAccessibility] = useState({
    highContrast: false,
    fontSizeDelta: 0,
    reducedMotion: false,
    dyslexicFont: false,
    screenReaderAnnouncements: true,
    audioNotifications: true
  });
  const [mails, setMails] = useState(initialMails);
  const [tasks, setTasks] = useState(initialTasks);
  const [events, setEvents] = useState(initialEvents);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [accessibilityModalMode, setAccessibilityModalMode] = useState(null);
  const [activeToast, setActiveToast] = useState(null);
  const triggerNotification = (title, message, type) => {
    const newItem = {
      id: "notif-" + Date.now(),
      title,
      message,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" }),
      type,
      read: false
    };
    setNotifications((prev) => [newItem, ...prev]);
    setActiveToast(newItem);
    setTimeout(() => {
      setActiveToast(null);
    }, 4200);
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey) {
        if (e.key === "1") {
          e.preventDefault();
          setActiveTab("mail");
        }
        if (e.key === "2") {
          e.preventDefault();
          setActiveTab("tasks");
        }
        if (e.key === "3") {
          e.preventDefault();
          setActiveTab("calendar");
        }
        if (e.key === "4") {
          e.preventDefault();
          setActiveTab("seo");
        }
        if (e.key === "5") {
          e.preventDefault();
          setActiveTab("analytics");
        }
        if (e.key === "6") {
          e.preventDefault();
          setActiveTab("reports");
        }
        if (e.key === "7") {
          e.preventDefault();
          setActiveTab("security");
        }
      }
      if (e.key === "?") {
        e.preventDefault();
        setAccessibilityModalMode("shortcuts");
      }
      if (e.key === "Escape") {
        setIsNotificationDrawerOpen(false);
        setAccessibilityModalMode(null);
        setActiveToast(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const fontSizeClasses = ["text-base", "text-lg", "text-xl", "text-2xl"];
  const currentFontSizeClass = fontSizeClasses[accessibility.fontSizeDelta] || "text-base";
  return /* @__PURE__ */ jsxDEV("div", { className: `min-h-screen transition-colors duration-200 font-sans ${accessibility.highContrast ? "bg-black text-yellow-300" : "bg-slate-950 text-slate-100"} ${currentFontSizeClass}`, children: [
    /* @__PURE__ */ jsxDEV(
      Header,
      {
        activeTab,
        user,
        accessibility,
        setAccessibility,
        notifications,
        onOpenNotifications: () => setIsNotificationDrawerOpen(true),
        onOpenAccessibilityHelp: () => setAccessibilityModalMode("wcag"),
        onOpenShortcutsHelp: () => setAccessibilityModalMode("shortcuts"),
        unreadNotificationsCount: notifications.filter((n) => !n.read).length,
        latestNotificationMessage: activeToast ? activeToast.message : void 0
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 121,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row min-h-[calc(100vh-64px)]", children: [
      /* @__PURE__ */ jsxDEV(
        Sidebar,
        {
          activeTab,
          setActiveTab,
          accessibility,
          unreadMailCount: mails.filter((m) => m.folder === "inbox" && !m.read).length,
          openTasksCount: tasks.filter((t) => t.status !== "done").length,
          todayEventsCount: events.filter((e) => e.date === "2026-08-07").length
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 137,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("main", { className: "flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden", role: "main", tabIndex: -1, children: [
        activeTab === "mail" && /* @__PURE__ */ jsxDEV(
          MailSection,
          {
            mails,
            setMails,
            accessibility,
            onSendNotification: triggerNotification
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 149,
            columnNumber: 13
          },
          this
        ),
        activeTab === "tasks" && /* @__PURE__ */ jsxDEV(
          TasksSection,
          {
            tasks,
            setTasks,
            accessibility,
            onSendNotification: triggerNotification
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 158,
            columnNumber: 13
          },
          this
        ),
        activeTab === "calendar" && /* @__PURE__ */ jsxDEV(
          CalendarSection,
          {
            events,
            setEvents,
            accessibility,
            onSendNotification: triggerNotification
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 167,
            columnNumber: 13
          },
          this
        ),
        activeTab === "seo" && /* @__PURE__ */ jsxDEV(
          SeoSection,
          {
            accessibility,
            onSendNotification: triggerNotification
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 176,
            columnNumber: 13
          },
          this
        ),
        activeTab === "analytics" && /* @__PURE__ */ jsxDEV(AnalyticsSection, { accessibility }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 183,
          columnNumber: 13
        }, this),
        activeTab === "reports" && /* @__PURE__ */ jsxDEV(
          ReportsSection,
          {
            accessibility,
            onSendNotification: triggerNotification
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 187,
            columnNumber: 13
          },
          this
        ),
        activeTab === "security" && /* @__PURE__ */ jsxDEV(
          Security2FASection,
          {
            user,
            setUser,
            accessibility,
            onSendNotification: triggerNotification
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 194,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 147,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 135,
      columnNumber: 7
    }, this),
    activeToast && /* @__PURE__ */ jsxDEV(
      "div",
      {
        className: "fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 border-2 border-indigo-500 rounded-2xl p-4 shadow-2xl flex items-start gap-3 animate-bounce-short",
        role: "alert",
        "aria-live": "assertive",
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0", children: "🔔" }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 212,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-white flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { children: activeToast.title }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 218,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-indigo-300 font-mono", children: "PUSH" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 219,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 217,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 leading-snug mt-1", children: activeToast.message }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 221,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 216,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setActiveToast(null),
              className: "text-slate-400 hover:text-white text-xs p-1",
              "aria-label": "Zamknij alert",
              children: "✕"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 226,
              columnNumber: 11
            },
            this
          )
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 207,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      NotificationDrawer,
      {
        isOpen: isNotificationDrawerOpen,
        onClose: () => setIsNotificationDrawerOpen(false),
        notifications,
        setNotifications,
        accessibility
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 237,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      AccessibilityModal,
      {
        isOpen: accessibilityModalMode !== null,
        onClose: () => setAccessibilityModalMode(null),
        accessibility,
        setAccessibility,
        mode: accessibilityModalMode || "wcag"
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 245,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/App.tsx",
    lineNumber: 114,
    columnNumber: 5
  }, this);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvSGVhZGVyJztcbmltcG9ydCB7IFNpZGViYXIgfSBmcm9tICcuL2NvbXBvbmVudHMvU2lkZWJhcic7XG5pbXBvcnQgeyBNYWlsU2VjdGlvbiB9IGZyb20gJy4vY29tcG9uZW50cy9tYWlsL01haWxTZWN0aW9uJztcbmltcG9ydCB7IFRhc2tzU2VjdGlvbiB9IGZyb20gJy4vY29tcG9uZW50cy90YXNrcy9UYXNrc1NlY3Rpb24nO1xuaW1wb3J0IHsgQ2FsZW5kYXJTZWN0aW9uIH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyL0NhbGVuZGFyU2VjdGlvbic7XG5pbXBvcnQgeyBTZW9TZWN0aW9uIH0gZnJvbSAnLi9jb21wb25lbnRzL3Nlby9TZW9TZWN0aW9uJztcbmltcG9ydCB7IEFuYWx5dGljc1NlY3Rpb24gfSBmcm9tICcuL2NvbXBvbmVudHMvYW5hbHl0aWNzL0FuYWx5dGljc1NlY3Rpb24nO1xuaW1wb3J0IHsgUmVwb3J0c1NlY3Rpb24gfSBmcm9tICcuL2NvbXBvbmVudHMvcmVwb3J0cy9SZXBvcnRzU2VjdGlvbic7XG5pbXBvcnQgeyBTZWN1cml0eTJGQVNlY3Rpb24gfSBmcm9tICcuL2NvbXBvbmVudHMvc2VjdXJpdHkvU2VjdXJpdHkyRkFTZWN0aW9uJztcbmltcG9ydCB7IEFjY2Vzc2liaWxpdHlNb2RhbCB9IGZyb20gJy4vY29tcG9uZW50cy9hY2Nlc3NpYmlsaXR5L0FjY2Vzc2liaWxpdHlNb2RhbCc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25EcmF3ZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvbm90aWZpY2F0aW9ucy9Ob3RpZmljYXRpb25EcmF3ZXInO1xuXG5pbXBvcnQgeyBcbiAgVGFiVHlwZSwgXG4gIFVzZXJQcm9maWxlLCBcbiAgQWNjZXNzaWJpbGl0eVNldHRpbmdzLCBcbiAgTWFpbEl0ZW0sIFxuICBUYXNrSXRlbSwgXG4gIENhbGVuZGFyRXZlbnQsIFxuICBOb3RpZmljYXRpb25JdGVtIFxufSBmcm9tICcuL3R5cGVzJztcblxuaW1wb3J0IHsgXG4gIGluaXRpYWxQcm9maWxlLCBcbiAgaW5pdGlhbE1haWxzLCBcbiAgaW5pdGlhbFRhc2tzLCBcbiAgaW5pdGlhbEV2ZW50cywgXG4gIGluaXRpYWxOb3RpZmljYXRpb25zIFxufSBmcm9tICcuL2RhdGEvaW5pdGlhbERhdGEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoKSB7XG4gIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSB1c2VTdGF0ZTxUYWJUeXBlPignbWFpbCcpO1xuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZTxVc2VyUHJvZmlsZT4oaW5pdGlhbFByb2ZpbGUpO1xuICBcbiAgLy8gQWNjZXNzaWJpbGl0eSBzdGF0ZVxuICBjb25zdCBbYWNjZXNzaWJpbGl0eSwgc2V0QWNjZXNzaWJpbGl0eV0gPSB1c2VTdGF0ZTxBY2Nlc3NpYmlsaXR5U2V0dGluZ3M+KHtcbiAgICBoaWdoQ29udHJhc3Q6IGZhbHNlLFxuICAgIGZvbnRTaXplRGVsdGE6IDAsXG4gICAgcmVkdWNlZE1vdGlvbjogZmFsc2UsXG4gICAgZHlzbGV4aWNGb250OiBmYWxzZSxcbiAgICBzY3JlZW5SZWFkZXJBbm5vdW5jZW1lbnRzOiB0cnVlLFxuICAgIGF1ZGlvTm90aWZpY2F0aW9uczogdHJ1ZSxcbiAgfSk7XG5cbiAgLy8gRGF0YSBzdGF0ZXNcbiAgY29uc3QgW21haWxzLCBzZXRNYWlsc10gPSB1c2VTdGF0ZTxNYWlsSXRlbVtdPihpbml0aWFsTWFpbHMpO1xuICBjb25zdCBbdGFza3MsIHNldFRhc2tzXSA9IHVzZVN0YXRlPFRhc2tJdGVtW10+KGluaXRpYWxUYXNrcyk7XG4gIGNvbnN0IFtldmVudHMsIHNldEV2ZW50c10gPSB1c2VTdGF0ZTxDYWxlbmRhckV2ZW50W10+KGluaXRpYWxFdmVudHMpO1xuICBjb25zdCBbbm90aWZpY2F0aW9ucywgc2V0Tm90aWZpY2F0aW9uc10gPSB1c2VTdGF0ZTxOb3RpZmljYXRpb25JdGVtW10+KGluaXRpYWxOb3RpZmljYXRpb25zKTtcblxuICAvLyBNb2RhbHMgJiBEcmF3ZXJzIHN0YXRlXG4gIGNvbnN0IFtpc05vdGlmaWNhdGlvbkRyYXdlck9wZW4sIHNldElzTm90aWZpY2F0aW9uRHJhd2VyT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthY2Nlc3NpYmlsaXR5TW9kYWxNb2RlLCBzZXRBY2Nlc3NpYmlsaXR5TW9kYWxNb2RlXSA9IHVzZVN0YXRlPCd3Y2FnJyB8ICdzaG9ydGN1dHMnIHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gVG9hc3Qgc3RhY2tcbiAgY29uc3QgW2FjdGl2ZVRvYXN0LCBzZXRBY3RpdmVUb2FzdF0gPSB1c2VTdGF0ZTxOb3RpZmljYXRpb25JdGVtIHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gSGVscGVyIHRvIHRyaWdnZXIgcHVzaCBub3RpZmljYXRpb25zXG4gIGNvbnN0IHRyaWdnZXJOb3RpZmljYXRpb24gPSAodGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCB0eXBlOiAnbWFpbCcgfCAndGFzaycgfCAnY2FsZW5kYXInIHwgJ3NlbycgfCAnc2VjdXJpdHknIHwgJ3N5c3RlbScpID0+IHtcbiAgICBjb25zdCBuZXdJdGVtOiBOb3RpZmljYXRpb25JdGVtID0ge1xuICAgICAgaWQ6ICdub3RpZi0nICsgRGF0ZS5ub3coKSxcbiAgICAgIHRpdGxlLFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoJ3BsLVBMJywgeyBob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTogJzItZGlnaXQnIH0pLFxuICAgICAgdHlwZSxcbiAgICAgIHJlYWQ6IGZhbHNlLFxuICAgIH07XG5cbiAgICBzZXROb3RpZmljYXRpb25zKHByZXYgPT4gW25ld0l0ZW0sIC4uLnByZXZdKTtcbiAgICBzZXRBY3RpdmVUb2FzdChuZXdJdGVtKTtcblxuICAgIC8vIEF1dG8gZGlzbWlzcyB0b2FzdCBhZnRlciA0IHNlY29uZHNcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldEFjdGl2ZVRvYXN0KG51bGwpO1xuICAgIH0sIDQyMDApO1xuICB9O1xuXG4gIC8vIEtleWJvYXJkIFNob3J0Y3V0cyBMaXN0ZW5lclxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgLy8gQWx0ICsgMSB0byA3XG4gICAgICBpZiAoZS5hbHRLZXkpIHtcbiAgICAgICAgaWYgKGUua2V5ID09PSAnMScpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBzZXRBY3RpdmVUYWIoJ21haWwnKTsgfVxuICAgICAgICBpZiAoZS5rZXkgPT09ICcyJykgeyBlLnByZXZlbnREZWZhdWx0KCk7IHNldEFjdGl2ZVRhYigndGFza3MnKTsgfVxuICAgICAgICBpZiAoZS5rZXkgPT09ICczJykgeyBlLnByZXZlbnREZWZhdWx0KCk7IHNldEFjdGl2ZVRhYignY2FsZW5kYXInKTsgfVxuICAgICAgICBpZiAoZS5rZXkgPT09ICc0JykgeyBlLnByZXZlbnREZWZhdWx0KCk7IHNldEFjdGl2ZVRhYignc2VvJyk7IH1cbiAgICAgICAgaWYgKGUua2V5ID09PSAnNScpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBzZXRBY3RpdmVUYWIoJ2FuYWx5dGljcycpOyB9XG4gICAgICAgIGlmIChlLmtleSA9PT0gJzYnKSB7IGUucHJldmVudERlZmF1bHQoKTsgc2V0QWN0aXZlVGFiKCdyZXBvcnRzJyk7IH1cbiAgICAgICAgaWYgKGUua2V5ID09PSAnNycpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBzZXRBY3RpdmVUYWIoJ3NlY3VyaXR5Jyk7IH1cbiAgICAgIH1cblxuICAgICAgaWYgKGUua2V5ID09PSAnPycpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzZXRBY2Nlc3NpYmlsaXR5TW9kYWxNb2RlKCdzaG9ydGN1dHMnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICBzZXRJc05vdGlmaWNhdGlvbkRyYXdlck9wZW4oZmFsc2UpO1xuICAgICAgICBzZXRBY2Nlc3NpYmlsaXR5TW9kYWxNb2RlKG51bGwpO1xuICAgICAgICBzZXRBY3RpdmVUb2FzdChudWxsKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVLZXlEb3duKTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVLZXlEb3duKTtcbiAgfSwgW10pO1xuXG4gIC8vIENvbXB1dGUgZm9udCBzaXplIG11bHRpcGxpZXIgQ1NTIGNsYXNzXG4gIGNvbnN0IGZvbnRTaXplQ2xhc3NlcyA9IFsndGV4dC1iYXNlJywgJ3RleHQtbGcnLCAndGV4dC14bCcsICd0ZXh0LTJ4bCddO1xuICBjb25zdCBjdXJyZW50Rm9udFNpemVDbGFzcyA9IGZvbnRTaXplQ2xhc3Nlc1thY2Nlc3NpYmlsaXR5LmZvbnRTaXplRGVsdGFdIHx8ICd0ZXh0LWJhc2UnO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2BtaW4taC1zY3JlZW4gdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMjAwIGZvbnQtc2FucyAke1xuICAgICAgYWNjZXNzaWJpbGl0eS5oaWdoQ29udHJhc3QgXG4gICAgICAgID8gJ2JnLWJsYWNrIHRleHQteWVsbG93LTMwMCcgXG4gICAgICAgIDogJ2JnLXNsYXRlLTk1MCB0ZXh0LXNsYXRlLTEwMCdcbiAgICB9ICR7Y3VycmVudEZvbnRTaXplQ2xhc3N9YH0+XG4gICAgICBcbiAgICAgIHsvKiBUb3AgQmFubmVyICYgSGVhZGVyICovfVxuICAgICAgPEhlYWRlclxuICAgICAgICBhY3RpdmVUYWI9e2FjdGl2ZVRhYn1cbiAgICAgICAgdXNlcj17dXNlcn1cbiAgICAgICAgYWNjZXNzaWJpbGl0eT17YWNjZXNzaWJpbGl0eX1cbiAgICAgICAgc2V0QWNjZXNzaWJpbGl0eT17c2V0QWNjZXNzaWJpbGl0eX1cbiAgICAgICAgbm90aWZpY2F0aW9ucz17bm90aWZpY2F0aW9uc31cbiAgICAgICAgb25PcGVuTm90aWZpY2F0aW9ucz17KCkgPT4gc2V0SXNOb3RpZmljYXRpb25EcmF3ZXJPcGVuKHRydWUpfVxuICAgICAgICBvbk9wZW5BY2Nlc3NpYmlsaXR5SGVscD17KCkgPT4gc2V0QWNjZXNzaWJpbGl0eU1vZGFsTW9kZSgnd2NhZycpfVxuICAgICAgICBvbk9wZW5TaG9ydGN1dHNIZWxwPXsoKSA9PiBzZXRBY2Nlc3NpYmlsaXR5TW9kYWxNb2RlKCdzaG9ydGN1dHMnKX1cbiAgICAgICAgdW5yZWFkTm90aWZpY2F0aW9uc0NvdW50PXtub3RpZmljYXRpb25zLmZpbHRlcihuID0+ICFuLnJlYWQpLmxlbmd0aH1cbiAgICAgICAgbGF0ZXN0Tm90aWZpY2F0aW9uTWVzc2FnZT17YWN0aXZlVG9hc3QgPyBhY3RpdmVUb2FzdC5tZXNzYWdlIDogdW5kZWZpbmVkfVxuICAgICAgLz5cblxuICAgICAgey8qIE1haW4gTGF5b3V0OiBTaWRlYmFyICsgQWN0aXZlIFNlY3Rpb24gKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIGZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgbWluLWgtW2NhbGMoMTAwdmgtNjRweCldXCI+XG4gICAgICAgIFxuICAgICAgICA8U2lkZWJhclxuICAgICAgICAgIGFjdGl2ZVRhYj17YWN0aXZlVGFifVxuICAgICAgICAgIHNldEFjdGl2ZVRhYj17c2V0QWN0aXZlVGFifVxuICAgICAgICAgIGFjY2Vzc2liaWxpdHk9e2FjY2Vzc2liaWxpdHl9XG4gICAgICAgICAgdW5yZWFkTWFpbENvdW50PXttYWlscy5maWx0ZXIobSA9PiBtLmZvbGRlciA9PT0gJ2luYm94JyAmJiAhbS5yZWFkKS5sZW5ndGh9XG4gICAgICAgICAgb3BlblRhc2tzQ291bnQ9e3Rhc2tzLmZpbHRlcih0ID0+IHQuc3RhdHVzICE9PSAnZG9uZScpLmxlbmd0aH1cbiAgICAgICAgICB0b2RheUV2ZW50c0NvdW50PXtldmVudHMuZmlsdGVyKGUgPT4gZS5kYXRlID09PSAnMjAyNi0wOC0wNycpLmxlbmd0aH1cbiAgICAgICAgLz5cblxuICAgICAgICB7LyogQ29udGVudCBBcmVhICovfVxuICAgICAgICA8bWFpbiBjbGFzc05hbWU9XCJmbGV4LTEgcC00IHNtOnAtNiBsZzpwLTggb3ZlcmZsb3cteC1oaWRkZW5cIiByb2xlPVwibWFpblwiIHRhYkluZGV4PXstMX0+XG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ21haWwnICYmIChcbiAgICAgICAgICAgIDxNYWlsU2VjdGlvblxuICAgICAgICAgICAgICBtYWlscz17bWFpbHN9XG4gICAgICAgICAgICAgIHNldE1haWxzPXtzZXRNYWlsc31cbiAgICAgICAgICAgICAgYWNjZXNzaWJpbGl0eT17YWNjZXNzaWJpbGl0eX1cbiAgICAgICAgICAgICAgb25TZW5kTm90aWZpY2F0aW9uPXt0cmlnZ2VyTm90aWZpY2F0aW9ufVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ3Rhc2tzJyAmJiAoXG4gICAgICAgICAgICA8VGFza3NTZWN0aW9uXG4gICAgICAgICAgICAgIHRhc2tzPXt0YXNrc31cbiAgICAgICAgICAgICAgc2V0VGFza3M9e3NldFRhc2tzfVxuICAgICAgICAgICAgICBhY2Nlc3NpYmlsaXR5PXthY2Nlc3NpYmlsaXR5fVxuICAgICAgICAgICAgICBvblNlbmROb3RpZmljYXRpb249e3RyaWdnZXJOb3RpZmljYXRpb259XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAnY2FsZW5kYXInICYmIChcbiAgICAgICAgICAgIDxDYWxlbmRhclNlY3Rpb25cbiAgICAgICAgICAgICAgZXZlbnRzPXtldmVudHN9XG4gICAgICAgICAgICAgIHNldEV2ZW50cz17c2V0RXZlbnRzfVxuICAgICAgICAgICAgICBhY2Nlc3NpYmlsaXR5PXthY2Nlc3NpYmlsaXR5fVxuICAgICAgICAgICAgICBvblNlbmROb3RpZmljYXRpb249e3RyaWdnZXJOb3RpZmljYXRpb259XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAnc2VvJyAmJiAoXG4gICAgICAgICAgICA8U2VvU2VjdGlvblxuICAgICAgICAgICAgICBhY2Nlc3NpYmlsaXR5PXthY2Nlc3NpYmlsaXR5fVxuICAgICAgICAgICAgICBvblNlbmROb3RpZmljYXRpb249e3RyaWdnZXJOb3RpZmljYXRpb259XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAnYW5hbHl0aWNzJyAmJiAoXG4gICAgICAgICAgICA8QW5hbHl0aWNzU2VjdGlvbiBhY2Nlc3NpYmlsaXR5PXthY2Nlc3NpYmlsaXR5fSAvPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAncmVwb3J0cycgJiYgKFxuICAgICAgICAgICAgPFJlcG9ydHNTZWN0aW9uXG4gICAgICAgICAgICAgIGFjY2Vzc2liaWxpdHk9e2FjY2Vzc2liaWxpdHl9XG4gICAgICAgICAgICAgIG9uU2VuZE5vdGlmaWNhdGlvbj17dHJpZ2dlck5vdGlmaWNhdGlvbn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdzZWN1cml0eScgJiYgKFxuICAgICAgICAgICAgPFNlY3VyaXR5MkZBU2VjdGlvblxuICAgICAgICAgICAgICB1c2VyPXt1c2VyfVxuICAgICAgICAgICAgICBzZXRVc2VyPXtzZXRVc2VyfVxuICAgICAgICAgICAgICBhY2Nlc3NpYmlsaXR5PXthY2Nlc3NpYmlsaXR5fVxuICAgICAgICAgICAgICBvblNlbmROb3RpZmljYXRpb249e3RyaWdnZXJOb3RpZmljYXRpb259XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvbWFpbj5cblxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBMaXZlIFRvYXN0IFN0YWNrIFBvcHVwIChSZWFsLXRpbWUgUHVzaCBOb3RpZmljYXRpb24gRmVlZGJhY2spICovfVxuICAgICAge2FjdGl2ZVRvYXN0ICYmIChcbiAgICAgICAgPGRpdiBcbiAgICAgICAgICBjbGFzc05hbWU9XCJmaXhlZCBib3R0b20tNiByaWdodC02IHotNTAgbWF4LXctc20gdy1mdWxsIGJnLXNsYXRlLTkwMCBib3JkZXItMiBib3JkZXItaW5kaWdvLTUwMCByb3VuZGVkLTJ4bCBwLTQgc2hhZG93LTJ4bCBmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0zIGFuaW1hdGUtYm91bmNlLXNob3J0XCJcbiAgICAgICAgICByb2xlPVwiYWxlcnRcIlxuICAgICAgICAgIGFyaWEtbGl2ZT1cImFzc2VydGl2ZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctOSBoLTkgcm91bmRlZC14bCBiZy1pbmRpZ28tNjAwIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZm9udC1ib2xkIHRleHQtc20gZmxleC1zaHJpbmstMFwiPlxuICAgICAgICAgICAg8J+UlFxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTFcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPHNwYW4+e2FjdGl2ZVRvYXN0LnRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1pbmRpZ28tMzAwIGZvbnQtbW9ub1wiPlBVU0g8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS0zMDAgbGVhZGluZy1zbnVnIG10LTFcIj5cbiAgICAgICAgICAgICAge2FjdGl2ZVRvYXN0Lm1lc3NhZ2V9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUb2FzdChudWxsKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgdGV4dC14cyBwLTFcIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIlphbWtuaWogYWxlcnRcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIOKclVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBEcmF3ZXJzICYgTW9kYWxzICovfVxuICAgICAgPE5vdGlmaWNhdGlvbkRyYXdlclxuICAgICAgICBpc09wZW49e2lzTm90aWZpY2F0aW9uRHJhd2VyT3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNOb3RpZmljYXRpb25EcmF3ZXJPcGVuKGZhbHNlKX1cbiAgICAgICAgbm90aWZpY2F0aW9ucz17bm90aWZpY2F0aW9uc31cbiAgICAgICAgc2V0Tm90aWZpY2F0aW9ucz17c2V0Tm90aWZpY2F0aW9uc31cbiAgICAgICAgYWNjZXNzaWJpbGl0eT17YWNjZXNzaWJpbGl0eX1cbiAgICAgIC8+XG5cbiAgICAgIDxBY2Nlc3NpYmlsaXR5TW9kYWxcbiAgICAgICAgaXNPcGVuPXthY2Nlc3NpYmlsaXR5TW9kYWxNb2RlICE9PSBudWxsfVxuICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRBY2Nlc3NpYmlsaXR5TW9kYWxNb2RlKG51bGwpfVxuICAgICAgICBhY2Nlc3NpYmlsaXR5PXthY2Nlc3NpYmlsaXR5fVxuICAgICAgICBzZXRBY2Nlc3NpYmlsaXR5PXtzZXRBY2Nlc3NpYmlsaXR5fVxuICAgICAgICBtb2RlPXthY2Nlc3NpYmlsaXR5TW9kYWxNb2RlIHx8ICd3Y2FnJ31cbiAgICAgIC8+XG5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJtYXBwaW5ncyI6IkFBd0hNO0FBeEhOLFNBQWdCLFVBQVUsaUJBQWlCO0FBQzNDLFNBQVMsY0FBYztBQUN2QixTQUFTLGVBQWU7QUFDeEIsU0FBUyxtQkFBbUI7QUFDNUIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyxzQkFBc0I7QUFDL0IsU0FBUywwQkFBMEI7QUFDbkMsU0FBUywwQkFBMEI7QUFDbkMsU0FBUywwQkFBMEI7QUFZbkM7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE9BQ0s7QUFFUCx3QkFBd0IsTUFBTTtBQUM1QixRQUFNLENBQUMsV0FBVyxZQUFZLElBQUksU0FBa0IsTUFBTTtBQUMxRCxRQUFNLENBQUMsTUFBTSxPQUFPLElBQUksU0FBc0IsY0FBYztBQUc1RCxRQUFNLENBQUMsZUFBZSxnQkFBZ0IsSUFBSSxTQUFnQztBQUFBLElBQ3hFLGNBQWM7QUFBQSxJQUNkLGVBQWU7QUFBQSxJQUNmLGVBQWU7QUFBQSxJQUNmLGNBQWM7QUFBQSxJQUNkLDJCQUEyQjtBQUFBLElBQzNCLG9CQUFvQjtBQUFBLEVBQ3RCLENBQUM7QUFHRCxRQUFNLENBQUMsT0FBTyxRQUFRLElBQUksU0FBcUIsWUFBWTtBQUMzRCxRQUFNLENBQUMsT0FBTyxRQUFRLElBQUksU0FBcUIsWUFBWTtBQUMzRCxRQUFNLENBQUMsUUFBUSxTQUFTLElB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