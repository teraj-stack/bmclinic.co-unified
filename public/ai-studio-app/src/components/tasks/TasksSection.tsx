import __vite__cjsImport0_react_jsxDevRuntime from "/ai-studio-app/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=d886a827"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/ai-studio-app/node_modules/.vite/deps/react.js?v=d886a827"; const useState = __vite__cjsImport1_react["useState"];
import {
  CheckSquare,
  Plus,
  Smartphone,
  RefreshCw,
  CheckCircle2,
  Tag,
  Filter,
  Search,
  Trash2,
  Calendar as CalendarIcon
} from "/ai-studio-app/node_modules/.vite/deps/lucide-react.js?v=5db40f83";
export const TasksSection = ({
  tasks,
  setTasks,
  accessibility,
  onSendNotification
}) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState("Przed chwilą");
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDueDate, setNewDueDate] = useState("2026-08-10");
  const [newPriority, setNewPriority] = useState("medium");
  const [newTag, setNewTag] = useState("Zadanie Firmowe");
  const filteredTasks = tasks.filter((t) => {
    if (filterStatus !== "all" && t.status !== filterStatus) return false;
    if (filterPriority !== "all" && t.priority !== filterPriority) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.tag.toLowerCase().includes(q);
    }
    return true;
  });
  const handleToggleTaskStatus = (id) => {
    setTasks((prev) => prev.map((t) => {
      if (t.id === id) {
        const nextStatus = t.status === "done" ? "todo" : t.status === "todo" ? "in_progress" : "done";
        if (nextStatus === "done") {
          onSendNotification("Zadanie Ukończone", `Gratulacje! Zadanie "${t.title}" zostało pomyślnie wykonane.`, "task");
        }
        return { ...t, status: nextStatus, lastSyncedAt: "Przed chwilą" };
      }
      return t;
    }));
  };
  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    onSendNotification("Zadanie Usunięte", "Usunięto zadanie z listy synchronizowanej.", "task");
  };
  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime((/* @__PURE__ */ new Date()).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" }));
      setTasks((prev) => prev.map((t) => ({ ...t, syncedDevicesCount: 3, lastSyncedAt: "Zsynchronizowano" })));
      onSendNotification("Synchronizacja Zakończona", "Pomyślnie zsynchronizowano zadania z 3 urządzeniami (Smartfon, Laptop, Tablet).", "task");
    }, 1200);
  };
  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTitle) return;
    const task = {
      id: "task-" + Date.now(),
      title: newTitle,
      description: newDesc,
      dueDate: newDueDate,
      priority: newPriority,
      status: "todo",
      tag: newTag,
      syncedDevicesCount: 3,
      lastSyncedAt: "Przed chwilą"
    };
    setTasks((prev) => [task, ...prev]);
    setIsNewTaskOpen(false);
    setNewTitle("");
    setNewDesc("");
    onSendNotification("Nowe Zadanie Dodane", `Dodano "${newTitle}" z automatyczną synchronizacją na urządzenia.`, "task");
  };
  const priorityBadges = {
    high: { label: "Wysoki", bg: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
    medium: { label: "Średni", bg: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
    low: { label: "Niski", bg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" }
  };
  const statusBadges = {
    todo: { label: "Do Zrobienia", bg: "bg-slate-700 text-slate-300" },
    in_progress: { label: "W Trakcie", bg: "bg-indigo-600 text-white font-bold animate-pulse" },
    done: { label: "Zakończone", bg: "bg-emerald-600 text-white" }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold tracking-tight", children: "Zarządzanie Zadaniami & Synchronizacja" }, void 0, false, {
          fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
          lineNumber: 127,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400", children: "Prowadź listę zadań firmowych z natychmiastową synchronizacją wielourządzeniową" }, void 0, false, {
          fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
          lineNumber: 128,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
        lineNumber: 126,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 flex items-center gap-3 text-xs", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 text-emerald-400 font-semibold", children: [
            /* @__PURE__ */ jsxDEV(Smartphone, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
              lineNumber: 135,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "3 Urządzenia w sieci" }, void 0, false, {
              fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
              lineNumber: 136,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
            lineNumber: 134,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "|" }, void 0, false, {
            fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
            lineNumber: 138,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: [
            "Ostatnia synchro: ",
            lastSyncTime
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
            lineNumber: 139,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
          lineNumber: 133,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleManualSync,
            disabled: isSyncing,
            className: `px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${accessibility.highContrast ? "bg-yellow-400 text-black border-yellow-300 hover:bg-yellow-300" : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"}`,
            "aria-label": "Uruchom ręczną synchronizację z urządzeniami",
            children: [
              /* @__PURE__ */ jsxDEV(RefreshCw, { className: `w-3.5 h-3.5 ${isSyncing ? "animate-spin text-indigo-400" : ""}` }, void 0, false, {
                fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                lineNumber: 152,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: isSyncing ? "Synchronizuję..." : "Ręczna Synchro" }, void 0, false, {
                fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                lineNumber: 153,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
            lineNumber: 142,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setIsNewTaskOpen(true),
            className: `px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all ${accessibility.highContrast ? "bg-yellow-400 text-black font-bold ring-2 ring-yellow-300" : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/30"}`,
            "aria-label": "Dodaj nowe zadanie",
            children: [
              /* @__PURE__ */ jsxDEV(Plus, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                lineNumber: 165,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Nowe Zadanie" }, void 0, false, {
                fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                lineNumber: 166,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
            lineNumber: 156,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
        lineNumber: 132,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
      lineNumber: 125,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "relative flex-1 min-w-[220px]", children: [
        /* @__PURE__ */ jsxDEV(Search, { className: "w-4 h-4 absolute left-3 top-2.5 text-slate-400" }, void 0, false, {
          fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
          lineNumber: 176,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "text",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            placeholder: "Szukaj zadania po nazwie, opisie lub tagu...",
            className: "w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
            lineNumber: 177,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
        lineNumber: 175,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 text-xs text-slate-400", children: [
          /* @__PURE__ */ jsxDEV(Filter, { className: "w-3.5 h-3.5" }, void 0, false, {
            fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
            lineNumber: 190,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Status:" }, void 0, false, {
            fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
            lineNumber: 191,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              value: filterStatus,
              onChange: (e) => setFilterStatus(e.target.value),
              className: "bg-slate-800 border border-slate-700 text-white rounded-lg px-2 py-1 text-xs focus:outline-none",
              children: [
                /* @__PURE__ */ jsxDEV("option", { value: "all", children: "Wszystkie" }, void 0, false, {
                  fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                  lineNumber: 197,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "todo", children: "Do zrobienia" }, void 0, false, {
                  fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                  lineNumber: 198,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "in_progress", children: "W trakcie" }, void 0, false, {
                  fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                  lineNumber: 199,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "done", children: "Zakończone" }, void 0, false, {
                  fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                  lineNumber: 200,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
              lineNumber: 192,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
          lineNumber: 189,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 text-xs text-slate-400", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Priorytet:" }, void 0, false, {
            fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
            lineNumber: 205,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              value: filterPriority,
              onChange: (e) => setFilterPriority(e.target.value),
              className: "bg-slate-800 border border-slate-700 text-white rounded-lg px-2 py-1 text-xs focus:outline-none",
              children: [
                /* @__PURE__ */ jsxDEV("option", { value: "all", children: "Wszystkie" }, void 0, false, {
                  fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                  lineNumber: 211,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "high", children: "Wysoki" }, void 0, false, {
                  fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                  lineNumber: 212,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "medium", children: "Średni" }, void 0, false, {
                  fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                  lineNumber: 213,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "low", children: "Niski" }, void 0, false, {
                  fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                  lineNumber: 214,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
              lineNumber: 206,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
          lineNumber: 204,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
        lineNumber: 187,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
      lineNumber: 172,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredTasks.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "col-span-full text-center py-12 text-slate-500 text-xs bg-slate-900/40 rounded-2xl border border-slate-800", children: "Brak zadań spełniających podane kryteria filtrowania." }, void 0, false, {
      fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
      lineNumber: 225,
      columnNumber: 11
    }, this) : filteredTasks.map((task) => {
      const isDone = task.status === "done";
      return /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: `p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${accessibility.highContrast ? "bg-black border-yellow-400 text-yellow-300" : isDone ? "bg-slate-900/40 border-slate-800 opacity-75" : "bg-slate-900 border-slate-800 hover:border-indigo-500/50"}`,
          children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs mb-2", children: [
                /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded-full border font-semibold text-[10px] ${priorityBadges[task.priority].bg}`, children: priorityBadges[task.priority].label }, void 0, false, {
                  fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                  lineNumber: 247,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxDEV(Tag, { className: "w-3 h-3 text-indigo-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                    lineNumber: 252,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: task.tag }, void 0, false, {
                    fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                    lineNumber: 253,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                  lineNumber: 251,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                lineNumber: 246,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("h3", { className: `font-bold text-sm leading-snug mb-1 ${isDone ? "line-through text-slate-400" : "text-white"}`, children: task.title }, void 0, false, {
                fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                lineNumber: 258,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 leading-relaxed line-clamp-3", children: task.description }, void 0, false, {
                fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                lineNumber: 263,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
              lineNumber: 243,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "pt-3 border-t border-slate-800/80 space-y-2 text-xs", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-slate-400 text-[11px]", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxDEV(CalendarIcon, { className: "w-3.5 h-3.5 text-indigo-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                    lineNumber: 274,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: [
                    "Termin: ",
                    task.dueDate
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                    lineNumber: 275,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                  lineNumber: 273,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 text-emerald-400 text-[10px]", children: [
                  /* @__PURE__ */ jsxDEV(Smartphone, { className: "w-3 h-3" }, void 0, false, {
                    fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                    lineNumber: 279,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Synchro 3 urz." }, void 0, false, {
                    fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                    lineNumber: 280,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                  lineNumber: 278,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                lineNumber: 272,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pt-1", children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => handleToggleTaskStatus(task.id),
                    className: `px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${task.status === "done" ? "bg-emerald-600 text-white" : task.status === "in_progress" ? "bg-indigo-600 text-white animate-pulse" : "bg-slate-800 hover:bg-slate-700 text-slate-200"}`,
                    children: [
                      /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5" }, void 0, false, {
                        fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                        lineNumber: 295,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: statusBadges[task.status].label }, void 0, false, {
                        fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                        lineNumber: 296,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                    lineNumber: 285,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => handleDeleteTask(task.id),
                    className: "p-1.5 text-slate-500 hover:text-rose-400 transition-colors",
                    title: "Usuń zadanie",
                    children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-4 h-4" }, void 0, false, {
                      fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                      lineNumber: 304,
                      columnNumber: 23
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                    lineNumber: 299,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                lineNumber: 284,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
              lineNumber: 270,
              columnNumber: 17
            }, this)
          ]
        },
        task.id,
        true,
        {
          fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
          lineNumber: 233,
          columnNumber: 15
        },
        this
      );
    }) }, void 0, false, {
      fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
      lineNumber: 223,
      columnNumber: 7
    }, this),
    isNewTaskOpen && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(CheckSquare, { className: "w-5 h-5 text-indigo-400" }, void 0, false, {
            fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
            lineNumber: 323,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Dodaj Nowe Zadanie z Synchronizacją" }, void 0, false, {
            fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
            lineNumber: 324,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
          lineNumber: 322,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setIsNewTaskOpen(false),
            className: "text-slate-400 hover:text-white",
            children: "×"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
            lineNumber: 326,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
        lineNumber: 321,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("form", { onSubmit: handleCreateTask, className: "space-y-3 text-xs", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block font-semibold text-slate-300 mb-1", children: "Tytuł Zadania:" }, void 0, false, {
            fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
            lineNumber: 336,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              required: true,
              value: newTitle,
              onChange: (e) => setNewTitle(e.target.value),
              placeholder: "np. Weryfikacja WCAG 2.1 dla nowej podstrony",
              className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
              lineNumber: 337,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
          lineNumber: 335,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block font-semibold text-slate-300 mb-1", children: "Opis Szczegółowy:" }, void 0, false, {
            fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
            lineNumber: 348,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "textarea",
            {
              rows: 3,
              value: newDesc,
              onChange: (e) => setNewDesc(e.target.value),
              placeholder: "Podaj instrukcje lub szczegóły wykonania...",
              className: "w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
              lineNumber: 349,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
          lineNumber: 347,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block font-semibold text-slate-300 mb-1", children: "Termin Wykonania:" }, void 0, false, {
              fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
              lineNumber: 360,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "date",
                value: newDueDate,
                onChange: (e) => setNewDueDate(e.target.value),
                className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                lineNumber: 361,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
            lineNumber: 359,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block font-semibold text-slate-300 mb-1", children: "Priorytet:" }, void 0, false, {
              fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
              lineNumber: 370,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "select",
              {
                value: newPriority,
                onChange: (e) => setNewPriority(e.target.value),
                className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500",
                children: [
                  /* @__PURE__ */ jsxDEV("option", { value: "high", children: "Wysoki" }, void 0, false, {
                    fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                    lineNumber: 376,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "medium", children: "Średni" }, void 0, false, {
                    fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                    lineNumber: 377,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "low", children: "Niski" }, void 0, false, {
                    fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                    lineNumber: 378,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
                lineNumber: 371,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
            lineNumber: 369,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
          lineNumber: 358,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block font-semibold text-slate-300 mb-1", children: "Kategoria / Tag:" }, void 0, false, {
            fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
            lineNumber: 384,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              value: newTag,
              onChange: (e) => setNewTag(e.target.value),
              className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
              lineNumber: 385,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
          lineNumber: 383,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-end gap-2 pt-3 border-t border-slate-800", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => setIsNewTaskOpen(false),
              className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold",
              children: "Anuluj"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
              lineNumber: 394,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "submit",
              className: "px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-900/40",
              children: "Utwórz i Zsynchronizuj"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
              lineNumber: 401,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
          lineNumber: 393,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
        lineNumber: 334,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
      lineNumber: 319,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
      lineNumber: 318,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/tasks/TasksSection.tsx",
    lineNumber: 122,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhc2tzU2VjdGlvbi50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIENoZWNrU3F1YXJlLCBcbiAgUGx1cywgXG4gIENsb2NrLCBcbiAgQWxlcnRDaXJjbGUsIFxuICBTbWFydHBob25lLCBcbiAgUmVmcmVzaEN3LCBcbiAgQ2hlY2tDaXJjbGUyLCBcbiAgVGFnLCBcbiAgRmlsdGVyLCBcbiAgU2VhcmNoLCBcbiAgTW9yZVZlcnRpY2FsLCBcbiAgVHJhc2gyLCBcbiAgQ2FsZW5kYXIgYXMgQ2FsZW5kYXJJY29uIFxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgVGFza0l0ZW0sIEFjY2Vzc2liaWxpdHlTZXR0aW5ncyB9IGZyb20gJy4uLy4uL3R5cGVzJztcblxuaW50ZXJmYWNlIFRhc2tzU2VjdGlvblByb3BzIHtcbiAgdGFza3M6IFRhc2tJdGVtW107XG4gIHNldFRhc2tzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxUYXNrSXRlbVtdPj47XG4gIGFjY2Vzc2liaWxpdHk6IEFjY2Vzc2liaWxpdHlTZXR0aW5ncztcbiAgb25TZW5kTm90aWZpY2F0aW9uOiAodGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCB0eXBlOiAndGFzaycpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBUYXNrc1NlY3Rpb246IFJlYWN0LkZDPFRhc2tzU2VjdGlvblByb3BzPiA9ICh7XG4gIHRhc2tzLFxuICBzZXRUYXNrcyxcbiAgYWNjZXNzaWJpbGl0eSxcbiAgb25TZW5kTm90aWZpY2F0aW9uLFxufSkgPT4ge1xuICBjb25zdCBbZmlsdGVyU3RhdHVzLCBzZXRGaWx0ZXJTdGF0dXNdID0gdXNlU3RhdGU8J2FsbCcgfCAndG9kbycgfCAnaW5fcHJvZ3Jlc3MnIHwgJ2RvbmUnPignYWxsJyk7XG4gIGNvbnN0IFtmaWx0ZXJQcmlvcml0eSwgc2V0RmlsdGVyUHJpb3JpdHldID0gdXNlU3RhdGU8J2FsbCcgfCAnaGlnaCcgfCAnbWVkaXVtJyB8ICdsb3cnPignYWxsJyk7XG4gIGNvbnN0IFtzZWFyY2hRdWVyeSwgc2V0U2VhcmNoUXVlcnldID0gdXNlU3RhdGUoJycpO1xuICBcbiAgLy8gU3luYyBzdGF0ZVxuICBjb25zdCBbaXNTeW5jaW5nLCBzZXRJc1N5bmNpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbGFzdFN5bmNUaW1lLCBzZXRMYXN0U3luY1RpbWVdID0gdXNlU3RhdGUoJ1ByemVkIGNod2lsxIUnKTtcblxuICAvLyBOZXcgdGFzayBtb2RhbFxuICBjb25zdCBbaXNOZXdUYXNrT3Blbiwgc2V0SXNOZXdUYXNrT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtuZXdUaXRsZSwgc2V0TmV3VGl0bGVdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbbmV3RGVzYywgc2V0TmV3RGVzY10gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtuZXdEdWVEYXRlLCBzZXROZXdEdWVEYXRlXSA9IHVzZVN0YXRlKCcyMDI2LTA4LTEwJyk7XG4gIGNvbnN0IFtuZXdQcmlvcml0eSwgc2V0TmV3UHJpb3JpdHldID0gdXNlU3RhdGU8J2hpZ2gnIHwgJ21lZGl1bScgfCAnbG93Jz4oJ21lZGl1bScpO1xuICBjb25zdCBbbmV3VGFnLCBzZXROZXdUYWddID0gdXNlU3RhdGUoJ1phZGFuaWUgRmlybW93ZScpO1xuXG4gIGNvbnN0IGZpbHRlcmVkVGFza3MgPSB0YXNrcy5maWx0ZXIodCA9PiB7XG4gICAgaWYgKGZpbHRlclN0YXR1cyAhPT0gJ2FsbCcgJiYgdC5zdGF0dXMgIT09IGZpbHRlclN0YXR1cykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChmaWx0ZXJQcmlvcml0eSAhPT0gJ2FsbCcgJiYgdC5wcmlvcml0eSAhPT0gZmlsdGVyUHJpb3JpdHkpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoc2VhcmNoUXVlcnkudHJpbSgpKSB7XG4gICAgICBjb25zdCBxID0gc2VhcmNoUXVlcnkudG9Mb3dlckNhc2UoKTtcbiAgICAgIHJldHVybiB0LnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHwgdC5kZXNjcmlwdGlvbi50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpIHx8IHQudGFnLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9KTtcblxuICBjb25zdCBoYW5kbGVUb2dnbGVUYXNrU3RhdHVzID0gKGlkOiBzdHJpbmcpID0+IHtcbiAgICBzZXRUYXNrcyhwcmV2ID0+IHByZXYubWFwKHQgPT4ge1xuICAgICAgaWYgKHQuaWQgPT09IGlkKSB7XG4gICAgICAgIGNvbnN0IG5leHRTdGF0dXMgPSB0LnN0YXR1cyA9PT0gJ2RvbmUnID8gJ3RvZG8nIDogdC5zdGF0dXMgPT09ICd0b2RvJyA/ICdpbl9wcm9ncmVzcycgOiAnZG9uZSc7XG4gICAgICAgIGlmIChuZXh0U3RhdHVzID09PSAnZG9uZScpIHtcbiAgICAgICAgICBvblNlbmROb3RpZmljYXRpb24oJ1phZGFuaWUgVWtvxYRjem9uZScsIGBHcmF0dWxhY2plISBaYWRhbmllIFwiJHt0LnRpdGxlfVwiIHpvc3RhxYJvIHBvbXnFm2xuaWUgd3lrb25hbmUuYCwgJ3Rhc2snKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyAuLi50LCBzdGF0dXM6IG5leHRTdGF0dXMsIGxhc3RTeW5jZWRBdDogJ1ByemVkIGNod2lsxIUnIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gdDtcbiAgICB9KSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlVGFzayA9IChpZDogc3RyaW5nKSA9PiB7XG4gICAgc2V0VGFza3MocHJldiA9PiBwcmV2LmZpbHRlcih0ID0+IHQuaWQgIT09IGlkKSk7XG4gICAgb25TZW5kTm90aWZpY2F0aW9uKCdaYWRhbmllIFVzdW5pxJl0ZScsICdVc3VuacSZdG8gemFkYW5pZSB6IGxpc3R5IHN5bmNocm9uaXpvd2FuZWouJywgJ3Rhc2snKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVNYW51YWxTeW5jID0gKCkgPT4ge1xuICAgIHNldElzU3luY2luZyh0cnVlKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldElzU3luY2luZyhmYWxzZSk7XG4gICAgICBzZXRMYXN0U3luY1RpbWUobmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoJ3BsLVBMJywgeyBob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTogJzItZGlnaXQnIH0pKTtcbiAgICAgIHNldFRhc2tzKHByZXYgPT4gcHJldi5tYXAodCA9PiAoeyAuLi50LCBzeW5jZWREZXZpY2VzQ291bnQ6IDMsIGxhc3RTeW5jZWRBdDogJ1pzeW5jaHJvbml6b3dhbm8nIH0pKSk7XG4gICAgICBvblNlbmROb3RpZmljYXRpb24oJ1N5bmNocm9uaXphY2phIFpha2/FhGN6b25hJywgJ1BvbXnFm2xuaWUgenN5bmNocm9uaXpvd2FubyB6YWRhbmlhIHogMyB1cnrEhWR6ZW5pYW1pIChTbWFydGZvbiwgTGFwdG9wLCBUYWJsZXQpLicsICd0YXNrJyk7XG4gICAgfSwgMTIwMCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ3JlYXRlVGFzayA9IChlOiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKCFuZXdUaXRsZSkgcmV0dXJuO1xuXG4gICAgY29uc3QgdGFzazogVGFza0l0ZW0gPSB7XG4gICAgICBpZDogJ3Rhc2stJyArIERhdGUubm93KCksXG4gICAgICB0aXRsZTogbmV3VGl0bGUsXG4gICAgICBkZXNjcmlwdGlvbjogbmV3RGVzYyxcbiAgICAgIGR1ZURhdGU6IG5ld0R1ZURhdGUsXG4gICAgICBwcmlvcml0eTogbmV3UHJpb3JpdHksXG4gICAgICBzdGF0dXM6ICd0b2RvJyxcbiAgICAgIHRhZzogbmV3VGFnLFxuICAgICAgc3luY2VkRGV2aWNlc0NvdW50OiAzLFxuICAgICAgbGFzdFN5bmNlZEF0OiAnUHJ6ZWQgY2h3aWzEhScsXG4gICAgfTtcblxuICAgIHNldFRhc2tzKHByZXYgPT4gW3Rhc2ssIC4uLnByZXZdKTtcbiAgICBzZXRJc05ld1Rhc2tPcGVuKGZhbHNlKTtcbiAgICBzZXROZXdUaXRsZSgnJyk7XG4gICAgc2V0TmV3RGVzYygnJyk7XG4gICAgb25TZW5kTm90aWZpY2F0aW9uKCdOb3dlIFphZGFuaWUgRG9kYW5lJywgYERvZGFubyBcIiR7bmV3VGl0bGV9XCIgeiBhdXRvbWF0eWN6bsSFIHN5bmNocm9uaXphY2rEhSBuYSB1cnrEhWR6ZW5pYS5gLCAndGFzaycpO1xuICB9O1xuXG4gIGNvbnN0IHByaW9yaXR5QmFkZ2VzID0ge1xuICAgIGhpZ2g6IHsgbGFiZWw6ICdXeXNva2knLCBiZzogJ2JnLXJvc2UtNTAwLzIwIHRleHQtcm9zZS0zMDAgYm9yZGVyLXJvc2UtNTAwLzMwJyB9LFxuICAgIG1lZGl1bTogeyBsYWJlbDogJ8WacmVkbmknLCBiZzogJ2JnLWFtYmVyLTUwMC8yMCB0ZXh0LWFtYmVyLTMwMCBib3JkZXItYW1iZXItNTAwLzMwJyB9LFxuICAgIGxvdzogeyBsYWJlbDogJ05pc2tpJywgYmc6ICdiZy1lbWVyYWxkLTUwMC8yMCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlci1lbWVyYWxkLTUwMC8zMCcgfSxcbiAgfTtcblxuICBjb25zdCBzdGF0dXNCYWRnZXMgPSB7XG4gICAgdG9kbzogeyBsYWJlbDogJ0RvIFpyb2JpZW5pYScsIGJnOiAnYmctc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwJyB9LFxuICAgIGluX3Byb2dyZXNzOiB7IGxhYmVsOiAnVyBUcmFrY2llJywgYmc6ICdiZy1pbmRpZ28tNjAwIHRleHQtd2hpdGUgZm9udC1ib2xkIGFuaW1hdGUtcHVsc2UnIH0sXG4gICAgZG9uZTogeyBsYWJlbDogJ1pha2/FhGN6b25lJywgYmc6ICdiZy1lbWVyYWxkLTYwMCB0ZXh0LXdoaXRlJyB9LFxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgIFxuICAgICAgey8qIEhlYWRlciAmIERldmljZSBTeW5jIEJhciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBsZzpmbGV4LXJvdyBpdGVtcy1zdGFydCBsZzppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRyYWNraW5nLXRpZ2h0XCI+WmFyesSFZHphbmllIFphZGFuaWFtaSAmIFN5bmNocm9uaXphY2phPC9oMj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwXCI+UHJvd2FkxbogbGlzdMSZIHphZGHFhCBmaXJtb3d5Y2ggeiBuYXR5Y2htaWFzdG93xIUgc3luY2hyb25pemFjasSFIHdpZWxvdXJ6xIVkemVuaW93xIU8L3A+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBTeW5jIHN0YXR1cyBjYXJkICYgYWN0aW9uIGJ1dHRvbiAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTgwMC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLXhsIHB4LTMgcHktMiBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdGV4dC1lbWVyYWxkLTQwMCBmb250LXNlbWlib2xkXCI+XG4gICAgICAgICAgICAgIDxTbWFydHBob25lIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj4zIFVyesSFZHplbmlhIHcgc2llY2k8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwXCI+fDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+T3N0YXRuaWEgc3luY2hybzoge2xhc3RTeW5jVGltZX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVNYW51YWxTeW5jfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2lzU3luY2luZ31cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMiByb3VuZGVkLXhsIHRleHQteHMgZm9udC1zZW1pYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBib3JkZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgYWNjZXNzaWJpbGl0eS5oaWdoQ29udHJhc3RcbiAgICAgICAgICAgICAgICA/ICdiZy15ZWxsb3ctNDAwIHRleHQtYmxhY2sgYm9yZGVyLXllbGxvdy0zMDAgaG92ZXI6YmcteWVsbG93LTMwMCdcbiAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMjAwIGJvcmRlci1zbGF0ZS03MDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJVcnVjaG9tIHLEmWN6bsSFIHN5bmNocm9uaXphY2rEmSB6IHVyesSFZHplbmlhbWlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxSZWZyZXNoQ3cgY2xhc3NOYW1lPXtgdy0zLjUgaC0zLjUgJHtpc1N5bmNpbmcgPyAnYW5pbWF0ZS1zcGluIHRleHQtaW5kaWdvLTQwMCcgOiAnJ31gfSAvPlxuICAgICAgICAgICAgPHNwYW4+e2lzU3luY2luZyA/ICdTeW5jaHJvbml6dWrEmS4uLicgOiAnUsSZY3puYSBTeW5jaHJvJ308L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc05ld1Rhc2tPcGVuKHRydWUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzaGFkb3ctbGcgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgYWNjZXNzaWJpbGl0eS5oaWdoQ29udHJhc3RcbiAgICAgICAgICAgICAgICA/ICdiZy15ZWxsb3ctNDAwIHRleHQtYmxhY2sgZm9udC1ib2xkIHJpbmctMiByaW5nLXllbGxvdy0zMDAnXG4gICAgICAgICAgICAgICAgOiAnYmctaW5kaWdvLTYwMCBob3ZlcjpiZy1pbmRpZ28tNTAwIHRleHQtd2hpdGUgc2hhZG93LWluZGlnby05MDAvMzAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJEb2RhaiBub3dlIHphZGFuaWVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxQbHVzIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgPHNwYW4+Tm93ZSBaYWRhbmllPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogRmlsdGVycyBCYXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBwLTQgcm91bmRlZC0yeGwgZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiPlxuICAgICAgICBcbiAgICAgICAgey8qIFNlYXJjaCBJbnB1dCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4LTEgbWluLXctWzIyMHB4XVwiPlxuICAgICAgICAgIDxTZWFyY2ggY2xhc3NOYW1lPVwidy00IGgtNCBhYnNvbHV0ZSBsZWZ0LTMgdG9wLTIuNSB0ZXh0LXNsYXRlLTQwMFwiIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICB2YWx1ZT17c2VhcmNoUXVlcnl9XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRTZWFyY2hRdWVyeShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlN6dWthaiB6YWRhbmlhIHBvIG5hendpZSwgb3Bpc2llIGx1YiB0YWd1Li4uXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC14bCBwbC05IHByLTMgcHktMiB0ZXh0LXhzIHRleHQtd2hpdGUgcGxhY2Vob2xkZXItc2xhdGUtNDAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1pbmRpZ28tNTAwXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogRmlsdGVyIGRyb3Bkb3ducyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgIDxGaWx0ZXIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgPHNwYW4+U3RhdHVzOjwvc3Bhbj5cbiAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgdmFsdWU9e2ZpbHRlclN0YXR1c31cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0RmlsdGVyU3RhdHVzKGUudGFyZ2V0LnZhbHVlIGFzIGFueSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgcHgtMiBweS0xIHRleHQteHMgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFsbFwiPldzenlzdGtpZTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwidG9kb1wiPkRvIHpyb2JpZW5pYTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiaW5fcHJvZ3Jlc3NcIj5XIHRyYWtjaWU8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImRvbmVcIj5aYWtvxYRjem9uZTwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgIDxzcGFuPlByaW9yeXRldDo8L3NwYW4+XG4gICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgIHZhbHVlPXtmaWx0ZXJQcmlvcml0eX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0RmlsdGVyUHJpb3JpdHkoZS50YXJnZXQudmFsdWUgYXMgYW55KX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctc2xhdGUtODAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtd2hpdGUgcm91bmRlZC1sZyBweC0yIHB5LTEgdGV4dC14cyBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYWxsXCI+V3N6eXN0a2llPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJoaWdoXCI+V3lzb2tpPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJtZWRpdW1cIj7FmnJlZG5pPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJsb3dcIj5OaXNraTwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogVGFza3MgR3JpZCAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyBnYXAtNFwiPlxuICAgICAgICB7ZmlsdGVyZWRUYXNrcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc3Bhbi1mdWxsIHRleHQtY2VudGVyIHB5LTEyIHRleHQtc2xhdGUtNTAwIHRleHQteHMgYmctc2xhdGUtOTAwLzQwIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICBCcmFrIHphZGHFhCBzcGXFgm5pYWrEhWN5Y2ggcG9kYW5lIGtyeXRlcmlhIGZpbHRyb3dhbmlhLlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIGZpbHRlcmVkVGFza3MubWFwKHRhc2sgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNEb25lID0gdGFzay5zdGF0dXMgPT09ICdkb25lJztcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGtleT17dGFzay5pZH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTQgcm91bmRlZC0yeGwgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIHNwYWNlLXktMyAke1xuICAgICAgICAgICAgICAgICAgYWNjZXNzaWJpbGl0eS5oaWdoQ29udHJhc3RcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctYmxhY2sgYm9yZGVyLXllbGxvdy00MDAgdGV4dC15ZWxsb3ctMzAwJ1xuICAgICAgICAgICAgICAgICAgICA6IGlzRG9uZVxuICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXNsYXRlLTkwMC80MCBib3JkZXItc2xhdGUtODAwIG9wYWNpdHktNzUnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6Ym9yZGVyLWluZGlnby01MDAvNTAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICB7LyogUHJpb3JpdHkgJiBUYWcgaGVhZGVyICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBib3JkZXIgZm9udC1zZW1pYm9sZCB0ZXh0LVsxMHB4XSAke3ByaW9yaXR5QmFkZ2VzW3Rhc2sucHJpb3JpdHldLmJnfWB9PlxuICAgICAgICAgICAgICAgICAgICAgIHtwcmlvcml0eUJhZGdlc1t0YXNrLnByaW9yaXR5XS5sYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIGJnLXNsYXRlLTgwMCBweC0yIHB5LTAuNSByb3VuZGVkLW1kIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPFRhZyBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtaW5kaWdvLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3Rhc2sudGFnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBUYXNrIFRpdGxlICovfVxuICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT17YGZvbnQtYm9sZCB0ZXh0LXNtIGxlYWRpbmctc251ZyBtYi0xICR7aXNEb25lID8gJ2xpbmUtdGhyb3VnaCB0ZXh0LXNsYXRlLTQwMCcgOiAndGV4dC13aGl0ZSd9YH0+XG4gICAgICAgICAgICAgICAgICAgIHt0YXNrLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgPC9oMz5cblxuICAgICAgICAgICAgICAgICAgey8qIFRhc2sgRGVzY3JpcHRpb24gKi99XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGxlYWRpbmctcmVsYXhlZCBsaW5lLWNsYW1wLTNcIj5cbiAgICAgICAgICAgICAgICAgICAge3Rhc2suZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBGb290ZXI6IER1ZSBkYXRlLCBEZXZpY2Ugc3luYyAmIFN0YXR1cyBUb2dnbGUgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0zIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAvODAgc3BhY2UteS0yIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1zbGF0ZS00MDAgdGV4dC1bMTFweF1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxDYWxlbmRhckljb24gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5UZXJtaW46IHt0YXNrLmR1ZURhdGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtZW1lcmFsZC00MDAgdGV4dC1bMTBweF1cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8U21hcnRwaG9uZSBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5TeW5jaHJvIDMgdXJ6Ljwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHQtMVwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlVG9nZ2xlVGFza1N0YXR1cyh0YXNrLmlkKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEuNSByb3VuZGVkLXhsIHRleHQteHMgZm9udC1zZW1pYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrLnN0YXR1cyA9PT0gJ2RvbmUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtNjAwIHRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogdGFzay5zdGF0dXMgPT09ICdpbl9wcm9ncmVzcydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1pbmRpZ28tNjAwIHRleHQtd2hpdGUgYW5pbWF0ZS1wdWxzZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMjAwJ1xuICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3N0YXR1c0JhZGdlc1t0YXNrLnN0YXR1c10ubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlRGVsZXRlVGFzayh0YXNrLmlkKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXJvc2UtNDAwIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlVzdcWEIHphZGFuaWVcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPFRyYXNoMiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KVxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNb2RhbDogTmV3IFRhc2sgKi99XG4gICAgICB7aXNOZXdUYXNrT3BlbiAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCBiZy1ibGFjay83MCBiYWNrZHJvcC1ibHVyLXNtIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC0yeGwgdy1mdWxsIG1heC13LWxnIHAtNiBzaGFkb3ctMnhsIHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHBiLTNcIj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxDaGVja1NxdWFyZSBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtaW5kaWdvLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+RG9kYWogTm93ZSBaYWRhbmllIHogU3luY2hyb25pemFjasSFPC9zcGFuPlxuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNOZXdUYXNrT3BlbihmYWxzZSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAmdGltZXM7XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVDcmVhdGVUYXNrfSBjbGFzc05hbWU9XCJzcGFjZS15LTMgdGV4dC14c1wiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMzAwIG1iLTFcIj5UeXR1xYIgWmFkYW5pYTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdUaXRsZX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldE5ld1RpdGxlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwibnAuIFdlcnlmaWthY2phIFdDQUcgMi4xIGRsYSBub3dlaiBwb2RzdHJvbnlcIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLXhsIHB4LTMgcHktMiB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1pbmRpZ28tNTAwXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMzAwIG1iLTFcIj5PcGlzIFN6Y3plZ8OzxYJvd3k6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgIHJvd3M9ezN9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3RGVzY31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldE5ld0Rlc2MoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJQb2RhaiBpbnN0cnVrY2plIGx1YiBzemN6ZWfDs8WCeSB3eWtvbmFuaWEuLi5cIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLXhsIHAtMyB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1pbmRpZ28tNTAwXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0zMDAgbWItMVwiPlRlcm1pbiBXeWtvbmFuaWE6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdEdWVEYXRlfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXROZXdEdWVEYXRlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLXhsIHB4LTMgcHktMiB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1pbmRpZ28tNTAwXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0zMDAgbWItMVwiPlByaW9yeXRldDo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3UHJpb3JpdHl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldE5ld1ByaW9yaXR5KGUudGFyZ2V0LnZhbHVlIGFzIGFueSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC14bCBweC0zIHB5LTIgdGV4dC13aGl0ZSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctaW5kaWdvLTUwMFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJoaWdoXCI+V3lzb2tpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJtZWRpdW1cIj7FmnJlZG5pPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJsb3dcIj5OaXNraTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0zMDAgbWItMVwiPkthdGVnb3JpYSAvIFRhZzo8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld1RhZ31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldE5ld1RhZyhlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtODAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQteGwgcHgtMyBweS0yIHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWluZGlnby01MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWVuZCBnYXAtMiBwdC0zIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzTmV3VGFza09wZW4oZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgcm91bmRlZC14bCBmb250LXNlbWlib2xkXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBBbnVsdWpcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTUgcHktMiBiZy1pbmRpZ28tNjAwIGhvdmVyOmJnLWluZGlnby01MDAgdGV4dC13aGl0ZSByb3VuZGVkLXhsIGZvbnQtc2VtaWJvbGQgc2hhZG93LWxnIHNoYWRvdy1pbmRpZ28tOTAwLzQwXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBVdHfDs3J6IGkgWnN5bmNocm9uaXp1alxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZm9ybT5cblxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQThIVTtBQTlIVixTQUFnQixnQkFBZ0I7QUFDaEM7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBR0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBLFlBQVk7QUFBQSxPQUNQO0FBVUEsYUFBTSxlQUE0QyxDQUFDO0FBQUEsRUFDeEQ7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFNO0FBQ0osUUFBTSxDQUFDLGNBQWMsZUFBZSxJQUFJLFNBQWtELEtBQUs7QUFDL0YsUUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsSUFBSSxTQUE0QyxLQUFLO0FBQzdGLFFBQU0sQ0FBQyxhQUFhLGNBQWMsSUFBSSxTQUFTLEVBQUU7QUFHakQsUUFBTSxDQUFDLFdBQVcsWUFBWSxJQUFJLFNBQVMsS0FBSztBQUNoRCxRQUFNLENBQUMsY0FBYyxlQUFlLElBQUksU0FBUyxjQUFjO0FBRy9ELFFBQU0sQ0FBQyxlQUFlLGdCQUFnQixJQUFJLFNBQVMsS0FBSztBQUN4RCxRQUFNLENBQUMsVUFBVSxXQUFXLElBQUksU0FBUyxFQUFFO0FBQzNDLFFBQU0sQ0FBQyxTQUFTLFVBQVUsSUFBSSxTQUFTLEVBQUU7QUFDekMsUUFBTSxDQUFDLFlBQVksYUFBYSxJQUFJLFNBQVMsWUFBWTtBQUN6RCxRQUFNLENBQUMsYUFBYSxjQUFjLElBQUksU0FBb0MsUUFBUTtBQUNsRixRQUFNLENBQUMsUUFBUSxTQUFTLElBQUksU0FBUyxpQkFBaUI7QUFFdEQsUUFBTSxnQkFBZ0IsTUFBTSxPQUFPLE9BQUs7QUFDdEMsUUFBSSxpQkFBaUIsU0FBUyxFQUFFLFdBQVcsYUFB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