import __vite__cjsImport0_react_jsxDevRuntime from "/ai-studio-app/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=d886a827"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/ai-studio-app/node_modules/.vite/deps/react.js?v=d886a827"; const useState = __vite__cjsImport1_react["useState"];
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Smartphone,
  BellRing,
  Trash2,
  X
} from "/ai-studio-app/node_modules/.vite/deps/lucide-react.js?v=5db40f83";
export const CalendarSection = ({
  events,
  setEvents,
  accessibility,
  onSendNotification
}) => {
  const [currentMonth, setCurrentMonth] = useState("Sierpień 2026");
  const [selectedDate, setSelectedDate] = useState("2026-08-07");
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventTime, setEventTime] = useState("11:00");
  const [eventLocation, setEventLocation] = useState("Google Meet / Online");
  const [eventCategory, setEventCategory] = useState("meeting");
  const daysInMonth = Array.from({ length: 31 }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `2026-08-${dayNum < 10 ? "0" + dayNum : dayNum}`;
    const dayEvents = events.filter((e) => e.date === dateStr);
    return { dayNum, dateStr, dayEvents };
  });
  const selectedEvents = events.filter((e) => e.date === selectedDate);
  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!eventTitle) return;
    const newEv = {
      id: "event-" + Date.now(),
      title: eventTitle,
      description: eventDesc,
      date: selectedDate,
      time: eventTime,
      category: eventCategory,
      location: eventLocation,
      syncedDevices: ["iPhone 15 Pro", "MacBook Air", "iPad Pro"],
      reminderMinutes: 15
    };
    setEvents((prev) => [...prev, newEv]);
    setIsAddEventOpen(false);
    setEventTitle("");
    setEventDesc("");
    onSendNotification(
      "Wydarzenie Zapisane w Kalendarzu",
      `Dodano "${eventTitle}" na dzień ${selectedDate} o godz. ${eventTime}. Powiadomienie push wysłane na 3 urządzenia.`,
      "calendar"
    );
  };
  const handleTriggerPushAlert = (ev) => {
    onSendNotification(
      `Przypomnienie: ${ev.title}`,
      `Rozpoczyna się o godz. ${ev.time} (${ev.location}). Synchronizacja aktywna.`,
      "calendar"
    );
  };
  const handleDeleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    onSendNotification("Wydarzenie Usunięte", "Usunięto spotkanie z kalendarza i zsynchronizowano urządzenia.", "calendar");
  };
  const categoryBadges = {
    meeting: { label: "Spotkanie", bg: "bg-indigo-600 text-white" },
    seo_review: { label: "Przegląd SEO", bg: "bg-amber-500 text-black font-bold" },
    report_due: { label: "Raport Miesięczny", bg: "bg-rose-600 text-white font-bold" },
    task: { label: "Zadanie", bg: "bg-emerald-600 text-white" }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold tracking-tight", children: "Kalendarz & Synchronizacja Wielourządzeniowa" }, void 0, false, {
          fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
          lineNumber: 103,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400", children: "Planuj spotkania, przeglądy SEO oraz terminy raportów z automatycznymi alertami push" }, void 0, false, {
          fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
          lineNumber: 104,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
        lineNumber: 102,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setIsAddEventOpen(true),
          className: `px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all ${accessibility.highContrast ? "bg-yellow-400 text-black ring-2 ring-yellow-300" : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/30"}`,
          "aria-label": "Zaplanuj nowe wydarzenie",
          children: [
            /* @__PURE__ */ jsxDEV(Plus, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
              lineNumber: 116,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Zaplanuj Wydarzenie" }, void 0, false, {
              fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
              lineNumber: 117,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
          lineNumber: 107,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
      lineNumber: 101,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/60 rounded-2xl border border-slate-800 p-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 space-y-4 border-r border-slate-800 pr-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(CalendarIcon, { className: "w-5 h-5 text-indigo-400" }, void 0, false, {
              fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
              lineNumber: 130,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: currentMonth }, void 0, false, {
              fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
              lineNumber: 131,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
            lineNumber: 129,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV("button", { className: "p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300", children: /* @__PURE__ */ jsxDEV(ChevronLeft, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
              lineNumber: 136,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
              lineNumber: 135,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("button", { className: "p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300", children: /* @__PURE__ */ jsxDEV(ChevronRight, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
              lineNumber: 139,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
              lineNumber: 138,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
            lineNumber: 134,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
          lineNumber: 128,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-400 border-b border-slate-800 pb-2", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Pn" }, void 0, false, {
            fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
            lineNumber: 146,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Wt" }, void 0, false, {
            fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
            lineNumber: 146,
            columnNumber: 28
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Śr" }, void 0, false, {
            fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
            lineNumber: 146,
            columnNumber: 43
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Cz" }, void 0, false, {
            fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
            lineNumber: 146,
            columnNumber: 58
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Pt" }, void 0, false, {
            fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
            lineNumber: 146,
            columnNumber: 73
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Sob" }, void 0, false, {
            fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
            lineNumber: 146,
            columnNumber: 88
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Ndz" }, void 0, false, {
            fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
            lineNumber: 146,
            columnNumber: 104
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
          lineNumber: 145,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-7 gap-1.5", children: daysInMonth.map(({ dayNum, dateStr, dayEvents }) => {
          const isSelected = selectedDate === dateStr;
          const hasEvents = dayEvents.length > 0;
          return /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setSelectedDate(dateStr),
              className: `min-h-[64px] p-1.5 rounded-xl border flex flex-col justify-between transition-all text-left ${isSelected ? accessibility.highContrast ? "bg-yellow-400 text-black border-yellow-300 font-bold" : "bg-indigo-600 text-white border-indigo-400" : hasEvents ? "bg-slate-800/80 border-indigo-500/40 text-slate-200 hover:bg-slate-800" : "bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-800"}`,
              children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold", children: dayNum }, void 0, false, {
                  fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                  lineNumber: 167,
                  columnNumber: 19
                }, this),
                hasEvents && /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1 w-full mt-1", children: dayEvents.map((e) => /* @__PURE__ */ jsxDEV(
                  "div",
                  {
                    className: `text-[9px] truncate px-1 py-0.5 rounded font-medium ${isSelected ? "bg-black/30 text-white" : "bg-indigo-500/20 text-indigo-300"}`,
                    children: [
                      e.time,
                      " ",
                      e.title
                    ]
                  },
                  e.id,
                  true,
                  {
                    fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                    lineNumber: 172,
                    columnNumber: 25
                  },
                  this
                )) }, void 0, false, {
                  fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                  lineNumber: 170,
                  columnNumber: 21
                }, this)
              ]
            },
            dateStr,
            true,
            {
              fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
              lineNumber: 156,
              columnNumber: 17
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
          lineNumber: 150,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
        lineNumber: 125,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "border-b border-slate-800 pb-3 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white", children: [
            "Wydarzenia dla dnia: ",
            /* @__PURE__ */ jsxDEV("span", { className: "text-indigo-400", children: selectedDate }, void 0, false, {
              fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
              lineNumber: 195,
              columnNumber: 36
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
            lineNumber: 194,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-400", children: [
            selectedEvents.length,
            " wpisów"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
            lineNumber: 197,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
          lineNumber: 193,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: selectedEvents.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "text-center py-12 text-slate-500 text-xs", children: 'Brak zaplanowanych wydarzeń w tym dniu. Naciśnij "Zaplanuj Wydarzenie", aby dodać nowe.' }, void 0, false, {
          fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
          lineNumber: 202,
          columnNumber: 15
        }, this) : selectedEvents.map((ev) => /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: `p-4 rounded-xl border space-y-3 ${accessibility.highContrast ? "bg-black border-yellow-400 text-yellow-300" : "bg-slate-800/80 border-slate-700 text-slate-200"}`,
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs", children: [
                /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded-full text-[10px] ${categoryBadges[ev.category].bg}`, children: categoryBadges[ev.category].label }, void 0, false, {
                  fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                  lineNumber: 216,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 text-slate-400 text-[11px]", children: [
                  /* @__PURE__ */ jsxDEV(Clock, { className: "w-3.5 h-3.5 text-indigo-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                    lineNumber: 221,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: ev.time }, void 0, false, {
                    fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                    lineNumber: 222,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                  lineNumber: 220,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                lineNumber: 215,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("h4", { className: "font-bold text-sm text-white", children: ev.title }, void 0, false, {
                  fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                  lineNumber: 227,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 leading-relaxed mt-1", children: ev.description }, void 0, false, {
                  fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                  lineNumber: 228,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                lineNumber: 226,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-xs text-slate-400", children: [
                /* @__PURE__ */ jsxDEV(MapPin, { className: "w-3.5 h-3.5 text-rose-400 flex-shrink-0" }, void 0, false, {
                  fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                  lineNumber: 232,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "truncate", children: ev.location }, void 0, false, {
                  fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                  lineNumber: 233,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                lineNumber: 231,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 text-[10px] text-emerald-400 font-medium", children: [
                  /* @__PURE__ */ jsxDEV(Smartphone, { className: "w-3 h-3" }, void 0, false, {
                    fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                    lineNumber: 240,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Synchro: Telefon, Laptop, Tablet" }, void 0, false, {
                    fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                    lineNumber: 241,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                  lineNumber: 239,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => handleTriggerPushAlert(ev),
                      className: "px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[11px] font-semibold flex items-center gap-1",
                      title: "Wyślij natychmiastowe powiadomienie Push do urządzeń",
                      children: [
                        /* @__PURE__ */ jsxDEV(BellRing, { className: "w-3 h-3" }, void 0, false, {
                          fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                          lineNumber: 250,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "Test Push" }, void 0, false, {
                          fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                          lineNumber: 251,
                          columnNumber: 25
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                      lineNumber: 245,
                      columnNumber: 23
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => handleDeleteEvent(ev.id),
                      className: "p-1 text-slate-400 hover:text-rose-400",
                      title: "Usuń wydarzenie",
                      children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-3.5 h-3.5" }, void 0, false, {
                        fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                        lineNumber: 259,
                        columnNumber: 25
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                      lineNumber: 254,
                      columnNumber: 23
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                  lineNumber: 244,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                lineNumber: 237,
                columnNumber: 19
              }, this)
            ]
          },
          ev.id,
          true,
          {
            fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
            lineNumber: 207,
            columnNumber: 17
          },
          this
        )) }, void 0, false, {
          fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
          lineNumber: 200,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
        lineNumber: 191,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
      lineNumber: 122,
      columnNumber: 7
    }, this),
    isAddEventOpen && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(CalendarIcon, { className: "w-5 h-5 text-indigo-400" }, void 0, false, {
            fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
            lineNumber: 281,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: [
            "Zaplanuj Wydarzenie na ",
            selectedDate
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
            lineNumber: 282,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
          lineNumber: 280,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("button", { onClick: () => setIsAddEventOpen(false), className: "text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
          fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
          lineNumber: 285,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
          lineNumber: 284,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
        lineNumber: 279,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("form", { onSubmit: handleCreateEvent, className: "space-y-3 text-xs", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block font-semibold text-slate-300 mb-1", children: "Nazwa Wydarzenia:" }, void 0, false, {
            fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
            lineNumber: 291,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              required: true,
              value: eventTitle,
              onChange: (e) => setEventTitle(e.target.value),
              placeholder: "np. Przegląd Wyników SEO i Dostępności",
              className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
              lineNumber: 292,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
          lineNumber: 290,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block font-semibold text-slate-300 mb-1", children: "Opis / Agenda:" }, void 0, false, {
            fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
            lineNumber: 303,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "textarea",
            {
              rows: 3,
              value: eventDesc,
              onChange: (e) => setEventDesc(e.target.value),
              placeholder: "Podaj szczegóły spotkania...",
              className: "w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
              lineNumber: 304,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
          lineNumber: 302,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block font-semibold text-slate-300 mb-1", children: "Godzina Rozpoczęcia:" }, void 0, false, {
              fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
              lineNumber: 315,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "time",
                value: eventTime,
                onChange: (e) => setEventTime(e.target.value),
                className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                lineNumber: 316,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
            lineNumber: 314,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block font-semibold text-slate-300 mb-1", children: "Kategoria:" }, void 0, false, {
              fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
              lineNumber: 325,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "select",
              {
                value: eventCategory,
                onChange: (e) => setEventCategory(e.target.value),
                className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500",
                children: [
                  /* @__PURE__ */ jsxDEV("option", { value: "meeting", children: "Spotkanie" }, void 0, false, {
                    fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                    lineNumber: 331,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "seo_review", children: "Przegląd SEO" }, void 0, false, {
                    fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                    lineNumber: 332,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "report_due", children: "Raport Miesięczny" }, void 0, false, {
                    fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                    lineNumber: 333,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "task", children: "Zadanie" }, void 0, false, {
                    fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                    lineNumber: 334,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
                lineNumber: 326,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
            lineNumber: 324,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
          lineNumber: 313,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block font-semibold text-slate-300 mb-1", children: "Lokalizacja / Link:" }, void 0, false, {
            fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
            lineNumber: 340,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              value: eventLocation,
              onChange: (e) => setEventLocation(e.target.value),
              className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
              lineNumber: 341,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
          lineNumber: 339,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-end gap-2 pt-3 border-t border-slate-800", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => setIsAddEventOpen(false),
              className: "px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold",
              children: "Anuluj"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
              lineNumber: 350,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "submit",
              className: "px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-900/40",
              children: "Zapisz i Zsynchronizuj"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
              lineNumber: 357,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
          lineNumber: 349,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
        lineNumber: 289,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
      lineNumber: 277,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
      lineNumber: 276,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/calendar/CalendarSection.tsx",
    lineNumber: 98,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhbGVuZGFyU2VjdGlvbi50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIENhbGVuZGFyIGFzIENhbGVuZGFySWNvbiwgXG4gIENoZXZyb25MZWZ0LCBcbiAgQ2hldnJvblJpZ2h0LCBcbiAgUGx1cywgXG4gIENsb2NrLCBcbiAgTWFwUGluLCBcbiAgU21hcnRwaG9uZSwgXG4gIEJlbGxSaW5nLCBcbiAgQ2hlY2tDaXJjbGUyLCBcbiAgVHJhc2gyLFxuICBYXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50LCBBY2Nlc3NpYmlsaXR5U2V0dGluZ3MgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5cbmludGVyZmFjZSBDYWxlbmRhclNlY3Rpb25Qcm9wcyB7XG4gIGV2ZW50czogQ2FsZW5kYXJFdmVudFtdO1xuICBzZXRFdmVudHM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPENhbGVuZGFyRXZlbnRbXT4+O1xuICBhY2Nlc3NpYmlsaXR5OiBBY2Nlc3NpYmlsaXR5U2V0dGluZ3M7XG4gIG9uU2VuZE5vdGlmaWNhdGlvbjogKHRpdGxlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgdHlwZTogJ2NhbGVuZGFyJykgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IENhbGVuZGFyU2VjdGlvbjogUmVhY3QuRkM8Q2FsZW5kYXJTZWN0aW9uUHJvcHM+ID0gKHtcbiAgZXZlbnRzLFxuICBzZXRFdmVudHMsXG4gIGFjY2Vzc2liaWxpdHksXG4gIG9uU2VuZE5vdGlmaWNhdGlvbixcbn0pID0+IHtcbiAgY29uc3QgW2N1cnJlbnRNb250aCwgc2V0Q3VycmVudE1vbnRoXSA9IHVzZVN0YXRlKCdTaWVycGllxYQgMjAyNicpO1xuICBjb25zdCBbc2VsZWN0ZWREYXRlLCBzZXRTZWxlY3RlZERhdGVdID0gdXNlU3RhdGUoJzIwMjYtMDgtMDcnKTtcbiAgXG4gIC8vIE5ldyBFdmVudCBNb2RhbFxuICBjb25zdCBbaXNBZGRFdmVudE9wZW4sIHNldElzQWRkRXZlbnRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2V2ZW50VGl0bGUsIHNldEV2ZW50VGl0bGVdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbZXZlbnREZXNjLCBzZXRFdmVudERlc2NdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbZXZlbnRUaW1lLCBzZXRFdmVudFRpbWVdID0gdXNlU3RhdGUoJzExOjAwJyk7XG4gIGNvbnN0IFtldmVudExvY2F0aW9uLCBzZXRFdmVudExvY2F0aW9uXSA9IHVzZVN0YXRlKCdHb29nbGUgTWVldCAvIE9ubGluZScpO1xuICBjb25zdCBbZXZlbnRDYXRlZ29yeSwgc2V0RXZlbnRDYXRlZ29yeV0gPSB1c2VTdGF0ZTwnbWVldGluZycgfCAndGFzaycgfCAnc2VvX3JldmlldycgfCAncmVwb3J0X2R1ZSc+KCdtZWV0aW5nJyk7XG5cbiAgY29uc3QgZGF5c0luTW9udGggPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAzMSB9LCAoXywgaSkgPT4ge1xuICAgIGNvbnN0IGRheU51bSA9IGkgKyAxO1xuICAgIGNvbnN0IGRhdGVTdHIgPSBgMjAyNi0wOC0ke2RheU51bSA8IDEwID8gJzAnICsgZGF5TnVtIDogZGF5TnVtfWA7XG4gICAgY29uc3QgZGF5RXZlbnRzID0gZXZlbnRzLmZpbHRlcihlID0+IGUuZGF0ZSA9PT0gZGF0ZVN0cik7XG4gICAgcmV0dXJuIHsgZGF5TnVtLCBkYXRlU3RyLCBkYXlFdmVudHMgfTtcbiAgfSk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRFdmVudHMgPSBldmVudHMuZmlsdGVyKGUgPT4gZS5kYXRlID09PSBzZWxlY3RlZERhdGUpO1xuXG4gIGNvbnN0IGhhbmRsZUNyZWF0ZUV2ZW50ID0gKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoIWV2ZW50VGl0bGUpIHJldHVybjtcblxuICAgIGNvbnN0IG5ld0V2OiBDYWxlbmRhckV2ZW50ID0ge1xuICAgICAgaWQ6ICdldmVudC0nICsgRGF0ZS5ub3coKSxcbiAgICAgIHRpdGxlOiBldmVudFRpdGxlLFxuICAgICAgZGVzY3JpcHRpb246IGV2ZW50RGVzYyxcbiAgICAgIGRhdGU6IHNlbGVjdGVkRGF0ZSxcbiAgICAgIHRpbWU6IGV2ZW50VGltZSxcbiAgICAgIGNhdGVnb3J5OiBldmVudENhdGVnb3J5LFxuICAgICAgbG9jYXRpb246IGV2ZW50TG9jYXRpb24sXG4gICAgICBzeW5jZWREZXZpY2VzOiBbJ2lQaG9uZSAxNSBQcm8nLCAnTWFjQm9vayBBaXInLCAnaVBhZCBQcm8nXSxcbiAgICAgIHJlbWluZGVyTWludXRlczogMTUsXG4gICAgfTtcblxuICAgIHNldEV2ZW50cyhwcmV2ID0+IFsuLi5wcmV2LCBuZXdFdl0pO1xuICAgIHNldElzQWRkRXZlbnRPcGVuKGZhbHNlKTtcbiAgICBzZXRFdmVudFRpdGxlKCcnKTtcbiAgICBzZXRFdmVudERlc2MoJycpO1xuICAgIG9uU2VuZE5vdGlmaWNhdGlvbihcbiAgICAgICdXeWRhcnplbmllIFphcGlzYW5lIHcgS2FsZW5kYXJ6dScsXG4gICAgICBgRG9kYW5vIFwiJHtldmVudFRpdGxlfVwiIG5hIGR6aWXFhCAke3NlbGVjdGVkRGF0ZX0gbyBnb2R6LiAke2V2ZW50VGltZX0uIFBvd2lhZG9taWVuaWUgcHVzaCB3eXPFgmFuZSBuYSAzIHVyesSFZHplbmlhLmAsXG4gICAgICAnY2FsZW5kYXInXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVUcmlnZ2VyUHVzaEFsZXJ0ID0gKGV2OiBDYWxlbmRhckV2ZW50KSA9PiB7XG4gICAgb25TZW5kTm90aWZpY2F0aW9uKFxuICAgICAgYFByenlwb21uaWVuaWU6ICR7ZXYudGl0bGV9YCxcbiAgICAgIGBSb3pwb2N6eW5hIHNpxJkgbyBnb2R6LiAke2V2LnRpbWV9ICgke2V2LmxvY2F0aW9ufSkuIFN5bmNocm9uaXphY2phIGFrdHl3bmEuYCxcbiAgICAgICdjYWxlbmRhcidcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURlbGV0ZUV2ZW50ID0gKGlkOiBzdHJpbmcpID0+IHtcbiAgICBzZXRFdmVudHMocHJldiA9PiBwcmV2LmZpbHRlcihlID0+IGUuaWQgIT09IGlkKSk7XG4gICAgb25TZW5kTm90aWZpY2F0aW9uKCdXeWRhcnplbmllIFVzdW5pxJl0ZScsICdVc3VuacSZdG8gc3BvdGthbmllIHoga2FsZW5kYXJ6YSBpIHpzeW5jaHJvbml6b3dhbm8gdXJ6xIVkemVuaWEuJywgJ2NhbGVuZGFyJyk7XG4gIH07XG5cbiAgY29uc3QgY2F0ZWdvcnlCYWRnZXMgPSB7XG4gICAgbWVldGluZzogeyBsYWJlbDogJ1Nwb3RrYW5pZScsIGJnOiAnYmctaW5kaWdvLTYwMCB0ZXh0LXdoaXRlJyB9LFxuICAgIHNlb19yZXZpZXc6IHsgbGFiZWw6ICdQcnplZ2zEhWQgU0VPJywgYmc6ICdiZy1hbWJlci01MDAgdGV4dC1ibGFjayBmb250LWJvbGQnIH0sXG4gICAgcmVwb3J0X2R1ZTogeyBsYWJlbDogJ1JhcG9ydCBNaWVzacSZY3pueScsIGJnOiAnYmctcm9zZS02MDAgdGV4dC13aGl0ZSBmb250LWJvbGQnIH0sXG4gICAgdGFzazogeyBsYWJlbDogJ1phZGFuaWUnLCBiZzogJ2JnLWVtZXJhbGQtNjAwIHRleHQtd2hpdGUnIH0sXG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgXG4gICAgICB7LyogSGVhZGVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdHJhY2tpbmctdGlnaHRcIj5LYWxlbmRhcnogJiBTeW5jaHJvbml6YWNqYSBXaWVsb3VyesSFZHplbmlvd2E8L2gyPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj5QbGFudWogc3BvdGthbmlhLCBwcnplZ2zEhWR5IFNFTyBvcmF6IHRlcm1pbnkgcmFwb3J0w7N3IHogYXV0b21hdHljem55bWkgYWxlcnRhbWkgcHVzaDwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzQWRkRXZlbnRPcGVuKHRydWUpfVxuICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLXhsIHRleHQteHMgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LWxnIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICBhY2Nlc3NpYmlsaXR5LmhpZ2hDb250cmFzdFxuICAgICAgICAgICAgICA/ICdiZy15ZWxsb3ctNDAwIHRleHQtYmxhY2sgcmluZy0yIHJpbmcteWVsbG93LTMwMCdcbiAgICAgICAgICAgICAgOiAnYmctaW5kaWdvLTYwMCBob3ZlcjpiZy1pbmRpZ28tNTAwIHRleHQtd2hpdGUgc2hhZG93LWluZGlnby05MDAvMzAnXG4gICAgICAgICAgfWB9XG4gICAgICAgICAgYXJpYS1sYWJlbD1cIlphcGxhbnVqIG5vd2Ugd3lkYXJ6ZW5pZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8UGx1cyBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICA8c3Bhbj5aYXBsYW51aiBXeWRhcnplbmllPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogTWFpbiBDYWxlbmRhciBHcmlkICYgRGF5IERldGFpbHMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC02IGJnLXNsYXRlLTkwMC82MCByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBwLTRcIj5cbiAgICAgICAgXG4gICAgICAgIHsvKiBMZWZ0IDcgQ29sczogTW9udGggVmlldyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi03IHNwYWNlLXktNCBib3JkZXItciBib3JkZXItc2xhdGUtODAwIHByLTRcIj5cbiAgICAgICAgICBcbiAgICAgICAgICB7LyogTW9udGggTmF2aWdhdGlvbiAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8Q2FsZW5kYXJJY29uIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+e2N1cnJlbnRNb250aH08L3NwYW4+XG4gICAgICAgICAgICA8L2gzPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicC0xLjUgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCByb3VuZGVkLWxnIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgPENoZXZyb25MZWZ0IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJwLTEuNSBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHJvdW5kZWQtbGcgdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIERheSBvZiB3ZWVrIGhlYWRlcnMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy03IGdhcC0xIHRleHQtY2VudGVyIHRleHQtWzExcHhdIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTQwMCBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHBiLTJcIj5cbiAgICAgICAgICAgIDxzcGFuPlBuPC9zcGFuPjxzcGFuPld0PC9zcGFuPjxzcGFuPsWacjwvc3Bhbj48c3Bhbj5Dejwvc3Bhbj48c3Bhbj5QdDwvc3Bhbj48c3Bhbj5Tb2I8L3NwYW4+PHNwYW4+TmR6PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIERheXMgR3JpZCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTcgZ2FwLTEuNVwiPlxuICAgICAgICAgICAge2RheXNJbk1vbnRoLm1hcCgoeyBkYXlOdW0sIGRhdGVTdHIsIGRheUV2ZW50cyB9KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBzZWxlY3RlZERhdGUgPT09IGRhdGVTdHI7XG4gICAgICAgICAgICAgIGNvbnN0IGhhc0V2ZW50cyA9IGRheUV2ZW50cy5sZW5ndGggPiAwO1xuXG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtkYXRlU3RyfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWREYXRlKGRhdGVTdHIpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgbWluLWgtWzY0cHhdIHAtMS41IHJvdW5kZWQteGwgYm9yZGVyIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIHRyYW5zaXRpb24tYWxsIHRleHQtbGVmdCAke1xuICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgICAgPyAoYWNjZXNzaWJpbGl0eS5oaWdoQ29udHJhc3QgPyAnYmcteWVsbG93LTQwMCB0ZXh0LWJsYWNrIGJvcmRlci15ZWxsb3ctMzAwIGZvbnQtYm9sZCcgOiAnYmctaW5kaWdvLTYwMCB0ZXh0LXdoaXRlIGJvcmRlci1pbmRpZ28tNDAwJylcbiAgICAgICAgICAgICAgICAgICAgICA6IGhhc0V2ZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtODAwLzgwIGJvcmRlci1pbmRpZ28tNTAwLzQwIHRleHQtc2xhdGUtMjAwIGhvdmVyOmJnLXNsYXRlLTgwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMC80MCBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtNDAwIGhvdmVyOmJnLXNsYXRlLTgwMCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkXCI+e2RheU51bX08L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgIHtoYXNFdmVudHMgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTEgdy1mdWxsIG10LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7ZGF5RXZlbnRzLm1hcChlID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtlLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LVs5cHhdIHRydW5jYXRlIHB4LTEgcHktMC41IHJvdW5kZWQgZm9udC1tZWRpdW0gJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkID8gJ2JnLWJsYWNrLzMwIHRleHQtd2hpdGUnIDogJ2JnLWluZGlnby01MDAvMjAgdGV4dC1pbmRpZ28tMzAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2UudGltZX0ge2UudGl0bGV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFJpZ2h0IDUgQ29sczogRGF5IEV2ZW50cyAmIFB1c2ggTm90aWZpY2F0aW9uIFRyaWdnZXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNSBzcGFjZS15LTRcIj5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItMyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgIFd5ZGFyemVuaWEgZGxhIGRuaWE6IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtaW5kaWdvLTQwMFwiPntzZWxlY3RlZERhdGV9PC9zcGFuPlxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj57c2VsZWN0ZWRFdmVudHMubGVuZ3RofSB3cGlzw7N3PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cbiAgICAgICAgICAgIHtzZWxlY3RlZEV2ZW50cy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgcHktMTIgdGV4dC1zbGF0ZS01MDAgdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgIEJyYWsgemFwbGFub3dhbnljaCB3eWRhcnplxYQgdyB0eW0gZG5pdS4gTmFjacWbbmlqIFwiWmFwbGFudWogV3lkYXJ6ZW5pZVwiLCBhYnkgZG9kYcSHIG5vd2UuXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgc2VsZWN0ZWRFdmVudHMubWFwKGV2ID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBrZXk9e2V2LmlkfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC00IHJvdW5kZWQteGwgYm9yZGVyIHNwYWNlLXktMyAke1xuICAgICAgICAgICAgICAgICAgICBhY2Nlc3NpYmlsaXR5LmhpZ2hDb250cmFzdFxuICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWJsYWNrIGJvcmRlci15ZWxsb3ctNDAwIHRleHQteWVsbG93LTMwMCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS04MDAvODAgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTIwMCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgcHgtMiBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQtWzEwcHhdICR7Y2F0ZWdvcnlCYWRnZXNbZXYuY2F0ZWdvcnldLmJnfWB9PlxuICAgICAgICAgICAgICAgICAgICAgIHtjYXRlZ29yeUJhZGdlc1tldi5jYXRlZ29yeV0ubGFiZWx9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtc2xhdGUtNDAwIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPENsb2NrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtaW5kaWdvLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2V2LnRpbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtc20gdGV4dC13aGl0ZVwiPntldi50aXRsZX08L2g0PlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGxlYWRpbmctcmVsYXhlZCBtdC0xXCI+e2V2LmRlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPE1hcFBpbiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXJvc2UtNDAwIGZsZXgtc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cnVuY2F0ZVwiPntldi5sb2NhdGlvbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIE11bHRpLURldmljZSBTeW5jICYgQWxlcnQgQWN0aW9ucyAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtNzAwLzYwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtWzEwcHhdIHRleHQtZW1lcmFsZC00MDAgZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8U21hcnRwaG9uZSBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5TeW5jaHJvOiBUZWxlZm9uLCBMYXB0b3AsIFRhYmxldDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVRyaWdnZXJQdXNoQWxlcnQoZXYpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgYmctaW5kaWdvLTYwMCBob3ZlcjpiZy1pbmRpZ28tNTAwIHRleHQtd2hpdGUgcm91bmRlZC1sZyB0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiV3nFm2xpaiBuYXR5Y2htaWFzdG93ZSBwb3dpYWRvbWllbmllIFB1c2ggZG8gdXJ6xIVkemXFhFwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJlbGxSaW5nIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+VGVzdCBQdXNoPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlRGVsZXRlRXZlbnQoZXYuaWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtcm9zZS00MDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJVc3XFhCB3eWRhcnplbmllXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VHJhc2gyIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkpXG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEFkZCBFdmVudCBNb2RhbCAqL31cbiAgICAgIHtpc0FkZEV2ZW50T3BlbiAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCBiZy1ibGFjay83MCBiYWNrZHJvcC1ibHVyLXNtIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC0yeGwgdy1mdWxsIG1heC13LWxnIHAtNiBzaGFkb3ctMnhsIHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHBiLTNcIj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxDYWxlbmRhckljb24gY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlphcGxhbnVqIFd5ZGFyemVuaWUgbmEge3NlbGVjdGVkRGF0ZX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0SXNBZGRFdmVudE9wZW4oZmFsc2UpfSBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgPFggY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVDcmVhdGVFdmVudH0gY2xhc3NOYW1lPVwic3BhY2UteS0zIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+TmF6d2EgV3lkYXJ6ZW5pYTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtldmVudFRpdGxlfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0RXZlbnRUaXRsZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIm5wLiBQcnplZ2zEhWQgV3luaWvDs3cgU0VPIGkgRG9zdMSZcG5vxZtjaVwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtODAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQteGwgcHgtMyBweS0yIHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWluZGlnby01MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0zMDAgbWItMVwiPk9waXMgLyBBZ2VuZGE6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgIHJvd3M9ezN9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17ZXZlbnREZXNjfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0RXZlbnREZXNjKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiUG9kYWogc3pjemVnw7PFgnkgc3BvdGthbmlhLi4uXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC14bCBwLTMgdGV4dC13aGl0ZSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctaW5kaWdvLTUwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMzAwIG1iLTFcIj5Hb2R6aW5hIFJvenBvY3rEmWNpYTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0aW1lXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2V2ZW50VGltZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0RXZlbnRUaW1lKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLXhsIHB4LTMgcHktMiB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1pbmRpZ28tNTAwXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0zMDAgbWItMVwiPkthdGVnb3JpYTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZXZlbnRDYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0RXZlbnRDYXRlZ29yeShlLnRhcmdldC52YWx1ZSBhcyBhbnkpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtODAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQteGwgcHgtMyBweS0yIHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWluZGlnby01MDBcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibWVldGluZ1wiPlNwb3RrYW5pZTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic2VvX3Jldmlld1wiPlByemVnbMSFZCBTRU88L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJlcG9ydF9kdWVcIj5SYXBvcnQgTWllc2nEmWN6bnk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInRhc2tcIj5aYWRhbmllPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+TG9rYWxpemFjamEgLyBMaW5rOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17ZXZlbnRMb2NhdGlvbn1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldEV2ZW50TG9jYXRpb24oZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLXhsIHB4LTMgcHktMiB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1pbmRpZ28tNTAwXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1lbmQgZ2FwLTIgcHQtMyBib3JkZXItdCBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0FkZEV2ZW50T3BlbihmYWxzZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgYmctc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwIHJvdW5kZWQteGwgZm9udC1zZW1pYm9sZFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgQW51bHVqXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC01IHB5LTIgYmctaW5kaWdvLTYwMCBob3ZlcjpiZy1pbmRpZ28tNTAwIHRleHQtd2hpdGUgcm91bmRlZC14bCBmb250LXNlbWlib2xkIHNoYWRvdy1sZyBzaGFkb3ctaW5kaWdvLTkwMC80MFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgWmFwaXN6IGkgWnN5bmNocm9uaXp1alxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZm9ybT5cblxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICA8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