import __vite__cjsImport0_react_jsxDevRuntime from "/ai-studio-app/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=d886a827"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/ai-studio-app/node_modules/.vite/deps/react.js?v=d886a827"; const useState = __vite__cjsImport1_react["useState"];
import {
  Mail,
  Search,
  Star,
  Send,
  Trash2,
  Archive,
  Sparkles,
  Plus,
  Inbox,
  X
} from "/ai-studio-app/node_modules/.vite/deps/lucide-react.js?v=5db40f83";
export const MailSection = ({
  mails,
  setMails,
  accessibility,
  onSendNotification
}) => {
  const [selectedFolder, setSelectedFolder] = useState("inbox");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMailId, setSelectedMailId] = useState(mails[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [isGeneratingAiDraft, setIsGeneratingAiDraft] = useState(false);
  const [aiReplyDraft, setAiReplyDraft] = useState(null);
  const [isGeneratingAiReply, setIsGeneratingAiReply] = useState(false);
  const selectedMail = mails.find((m) => m.id === selectedMailId);
  const filteredMails = mails.filter((mail) => {
    if (selectedFolder === "starred") {
      if (!mail.starred) return false;
    } else if (mail.folder !== selectedFolder) {
      return false;
    }
    if (selectedCategory !== "all" && mail.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return mail.subject.toLowerCase().includes(q) || mail.senderName.toLowerCase().includes(q) || mail.snippet.toLowerCase().includes(q);
    }
    return true;
  });
  const toggleStar = (id, e) => {
    e.stopPropagation();
    setMails((prev) => prev.map((m) => m.id === id ? { ...m, starred: !m.starred } : m));
  };
  const markAsRead = (id) => {
    setMails((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
  };
  const handleSelectMail = (mail) => {
    setSelectedMailId(mail.id);
    markAsRead(mail.id);
    setAiReplyDraft(null);
  };
  const generateAiReply = async (promptType) => {
    if (!selectedMail) return;
    setIsGeneratingAiReply(true);
    try {
      const res = await fetch("/api/mail/ai-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: selectedMail.subject,
          body: selectedMail.body,
          promptType
        })
      });
      const data = await res.json();
      setAiReplyDraft(data.replyBody || "Dziękuję za wiadomość. Z przyjemnością przystąpimy do realizacji zadania.");
    } catch (err) {
      console.error("Error generating AI reply:", err);
      setAiReplyDraft("Szanowny Panie/Pani,\n\nDziękuję za wiadomość. Przeanalizowaliśmy zgłoszone kwestie dotyczące SEO i dostępności cyfrowej. Skontaktujemy się z Panem w ciągu najbliższego dnia roboczego.\n\nZ poważaniem,\nMarta Kowalska");
    } finally {
      setIsGeneratingAiReply(false);
    }
  };
  const handleSendMail = (e) => {
    e.preventDefault();
    if (!composeTo || !composeSubject) return;
    const newMail = {
      id: "mail-" + Date.now(),
      senderName: "Marta Kowalska (Ty)",
      senderEmail: "marta.kowalska@firma-omnisuite.pl",
      subject: composeSubject,
      snippet: composeBody.substring(0, 80) + "...",
      body: composeBody,
      timestamp: "Przed chwilą",
      read: true,
      starred: false,
      folder: "sent",
      category: "main"
    };
    setMails((prev) => [newMail, ...prev]);
    setIsComposeOpen(false);
    setComposeTo("");
    setComposeSubject("");
    setComposeBody("");
    onSendNotification("Poczta Wysłana", `Pomyślnie wysłano wiadomość do: ${composeTo}`, "mail");
  };
  const handleSendReply = () => {
    if (!selectedMail || !aiReplyDraft) return;
    const replyMail = {
      id: "mail-reply-" + Date.now(),
      senderName: "Marta Kowalska (Ty)",
      senderEmail: "marta.kowalska@firma-omnisuite.pl",
      subject: `Re: ${selectedMail.subject}`,
      snippet: aiReplyDraft.substring(0, 80) + "...",
      body: aiReplyDraft,
      timestamp: "Przed chwilą",
      read: true,
      starred: false,
      folder: "sent",
      category: "main"
    };
    setMails((prev) => [replyMail, ...prev]);
    setAiReplyDraft(null);
    onSendNotification("Odpowiedź Wysłana", `Odpowiedź do ${selectedMail.senderName} została wysłana!`, "mail");
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold tracking-tight", children: "Poczta Elektronowa Firmy" }, void 0, false, {
          fileName: "/app/applet/src/components/mail/MailSection.tsx",
          lineNumber: 168,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400", children: "Zarządzaj wiadomościami z automatyczną asystą Gemini AI i powiadomieniami push" }, void 0, false, {
          fileName: "/app/applet/src/components/mail/MailSection.tsx",
          lineNumber: 169,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/mail/MailSection.tsx",
        lineNumber: 167,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setIsComposeOpen(true),
          className: `px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg transition-all focus-visible:outline-none focus-visible:ring-4 ${accessibility.highContrast ? "bg-yellow-400 text-black hover:bg-yellow-300 ring-2 ring-yellow-300" : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/30"}`,
          "aria-label": "Napisz nową wiadomość e-mail",
          children: [
            /* @__PURE__ */ jsxDEV(Plus, { className: "w-4 h-4", "aria-hidden": "true" }, void 0, false, {
              fileName: "/app/applet/src/components/mail/MailSection.tsx",
              lineNumber: 181,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Napisz Wiadomość" }, void 0, false, {
              fileName: "/app/applet/src/components/mail/MailSection.tsx",
              lineNumber: 182,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/mail/MailSection.tsx",
          lineNumber: 172,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/mail/MailSection.tsx",
      lineNumber: 166,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/60 rounded-2xl border border-slate-800 p-4 min-h-[600px]", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-3 space-y-4 border-r border-slate-800 pr-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1", children: "Folder" }, void 0, false, {
            fileName: "/app/applet/src/components/mail/MailSection.tsx",
            lineNumber: 193,
            columnNumber: 13
          }, this),
          [
            { id: "inbox", label: "Odebrane", icon: Inbox, count: mails.filter((m) => m.folder === "inbox" && !m.read).length },
            { id: "starred", label: "Oznaczone", icon: Star, count: mails.filter((m) => m.starred).length },
            { id: "sent", label: "Wysłane", icon: Send },
            { id: "archive", label: "Archiwum", icon: Archive },
            { id: "trash", label: "Kosz", icon: Trash2 }
          ].map((f) => {
            const Icon = f.icon;
            const isFSelected = selectedFolder === f.id;
            return /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setSelectedFolder(f.id),
                className: `w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${isFSelected ? accessibility.highContrast ? "bg-yellow-400 text-black font-bold" : "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800"}`,
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxDEV(Icon, { className: "w-4 h-4" }, void 0, false, {
                      fileName: "/app/applet/src/components/mail/MailSection.tsx",
                      lineNumber: 217,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: f.label }, void 0, false, {
                      fileName: "/app/applet/src/components/mail/MailSection.tsx",
                      lineNumber: 218,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/mail/MailSection.tsx",
                    lineNumber: 216,
                    columnNumber: 19
                  }, this),
                  f.count !== void 0 && f.count > 0 && /* @__PURE__ */ jsxDEV("span", { className: `px-1.5 py-0.5 rounded-full text-[10px] font-bold ${isFSelected ? "bg-black/30 text-white" : "bg-indigo-500/20 text-indigo-300"}`, children: f.count }, void 0, false, {
                    fileName: "/app/applet/src/components/mail/MailSection.tsx",
                    lineNumber: 221,
                    columnNumber: 21
                  }, this)
                ]
              },
              f.id,
              true,
              {
                fileName: "/app/applet/src/components/mail/MailSection.tsx",
                lineNumber: 207,
                columnNumber: 17
              },
              this
            );
          })
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/mail/MailSection.tsx",
          lineNumber: 192,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "pt-4 border-t border-slate-800 space-y-1", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1", children: "Kategorie" }, void 0, false, {
            fileName: "/app/applet/src/components/mail/MailSection.tsx",
            lineNumber: 233,
            columnNumber: 13
          }, this),
          [
            { id: "all", label: "Wszystkie" },
            { id: "main", label: "Główne" },
            { id: "updates", label: "Powiadomienia" },
            { id: "promotions", label: "Oferty" }
          ].map((c) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setSelectedCategory(c.id),
              className: `w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedCategory === c.id ? "text-indigo-400 font-bold bg-indigo-500/10 border-l-2 border-indigo-500" : "text-slate-400 hover:text-slate-200"}`,
              children: c.label
            },
            c.id,
            false,
            {
              fileName: "/app/applet/src/components/mail/MailSection.tsx",
              lineNumber: 242,
              columnNumber: 15
            },
            this
          ))
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/mail/MailSection.tsx",
          lineNumber: 232,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/mail/MailSection.tsx",
        lineNumber: 190,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-4 space-y-3 border-r border-slate-800 pr-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
          /* @__PURE__ */ jsxDEV(Search, { className: "w-4 h-4 absolute left-3 top-2.5 text-slate-400" }, void 0, false, {
            fileName: "/app/applet/src/components/mail/MailSection.tsx",
            lineNumber: 263,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              placeholder: "Szukaj w poczcie...",
              className: "w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/mail/MailSection.tsx",
              lineNumber: 264,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/mail/MailSection.tsx",
          lineNumber: 262,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 max-h-[520px] overflow-y-auto pr-1", children: filteredMails.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "text-center py-12 text-slate-500 text-xs", children: "Brak wiadomości w wybranej kategorii." }, void 0, false, {
          fileName: "/app/applet/src/components/mail/MailSection.tsx",
          lineNumber: 276,
          columnNumber: 15
        }, this) : filteredMails.map((mail) => {
          const isSelected = mail.id === selectedMailId;
          return /* @__PURE__ */ jsxDEV(
            "div",
            {
              onClick: () => handleSelectMail(mail),
              className: `p-3 rounded-xl border cursor-pointer transition-all ${isSelected ? accessibility.highContrast ? "bg-yellow-400/20 border-yellow-400 text-yellow-200" : "bg-indigo-600/20 border-indigo-500/50" : mail.read ? "bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800" : "bg-slate-800 border-slate-700 text-white font-semibold"}`,
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs mb-1", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-bold truncate max-w-[140px]", children: mail.senderName }, void 0, false, {
                    fileName: "/app/applet/src/components/mail/MailSection.tsx",
                    lineNumber: 295,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400", children: mail.timestamp }, void 0, false, {
                    fileName: "/app/applet/src/components/mail/MailSection.tsx",
                    lineNumber: 296,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/mail/MailSection.tsx",
                  lineNumber: 294,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-medium truncate mb-1 text-slate-200", children: mail.subject }, void 0, false, {
                  fileName: "/app/applet/src/components/mail/MailSection.tsx",
                  lineNumber: 299,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 line-clamp-2 leading-relaxed", children: mail.snippet }, void 0, false, {
                  fileName: "/app/applet/src/components/mail/MailSection.tsx",
                  lineNumber: 303,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mt-2 pt-2 border-t border-slate-700/40 text-[10px]", children: [
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: (e) => toggleStar(mail.id, e),
                      className: `p-1 hover:text-amber-400 transition-colors ${mail.starred ? "text-amber-400" : "text-slate-500"}`,
                      title: "Oznacz gwiazdką",
                      children: /* @__PURE__ */ jsxDEV(Star, { className: "w-3.5 h-3.5 fill-current" }, void 0, false, {
                        fileName: "/app/applet/src/components/mail/MailSection.tsx",
                        lineNumber: 315,
                        columnNumber: 25
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/mail/MailSection.tsx",
                      lineNumber: 308,
                      columnNumber: 23
                    },
                    this
                  ),
                  !mail.read && /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-indigo-500 animate-pulse" }, void 0, false, {
                    fileName: "/app/applet/src/components/mail/MailSection.tsx",
                    lineNumber: 319,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/mail/MailSection.tsx",
                  lineNumber: 307,
                  columnNumber: 21
                }, this)
              ]
            },
            mail.id,
            true,
            {
              fileName: "/app/applet/src/components/mail/MailSection.tsx",
              lineNumber: 283,
              columnNumber: 19
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/mail/MailSection.tsx",
          lineNumber: 274,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/mail/MailSection.tsx",
        lineNumber: 259,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 space-y-4", children: selectedMail ? /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "border-b border-slate-800 pb-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold text-white leading-snug", children: selectedMail.subject }, void 0, false, {
              fileName: "/app/applet/src/components/mail/MailSection.tsx",
              lineNumber: 338,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-400 whitespace-nowrap", children: selectedMail.timestamp }, void 0, false, {
              fileName: "/app/applet/src/components/mail/MailSection.tsx",
              lineNumber: 339,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/mail/MailSection.tsx",
            lineNumber: 337,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-xs text-slate-300", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs", children: selectedMail.senderName.charAt(0) }, void 0, false, {
              fileName: "/app/applet/src/components/mail/MailSection.tsx",
              lineNumber: 343,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("div", { className: "font-semibold", children: selectedMail.senderName }, void 0, false, {
                fileName: "/app/applet/src/components/mail/MailSection.tsx",
                lineNumber: 347,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400", children: selectedMail.senderEmail }, void 0, false, {
                fileName: "/app/applet/src/components/mail/MailSection.tsx",
                lineNumber: 348,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/mail/MailSection.tsx",
              lineNumber: 346,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/mail/MailSection.tsx",
            lineNumber: 342,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/mail/MailSection.tsx",
          lineNumber: 336,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-slate-200 whitespace-pre-wrap leading-relaxed bg-slate-800/50 p-4 rounded-xl border border-slate-800 max-h-[220px] overflow-y-auto", children: selectedMail.body }, void 0, false, {
          fileName: "/app/applet/src/components/mail/MailSection.tsx",
          lineNumber: 354,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-indigo-950/30 border border-indigo-500/30 p-4 rounded-xl space-y-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-xs font-bold text-indigo-300", children: [
              /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-indigo-400 animate-spin-slow" }, void 0, false, {
                fileName: "/app/applet/src/components/mail/MailSection.tsx",
                lineNumber: 362,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Asystent Odpowiedzi Gemini AI" }, void 0, false, {
                fileName: "/app/applet/src/components/mail/MailSection.tsx",
                lineNumber: 363,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/mail/MailSection.tsx",
              lineNumber: 361,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full", children: "Szybki Szkic" }, void 0, false, {
              fileName: "/app/applet/src/components/mail/MailSection.tsx",
              lineNumber: 365,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/mail/MailSection.tsx",
            lineNumber: 360,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400", children: "Wybierz preferowany styl odpowiedzi, a model wygeneruje profesjonalny szkic w języku polskim:" }, void 0, false, {
            fileName: "/app/applet/src/components/mail/MailSection.tsx",
            lineNumber: 368,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => generateAiReply("accept"),
                disabled: isGeneratingAiReply,
                className: "px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-all disabled:opacity-50",
                children: isGeneratingAiReply ? "Generowanie..." : "Akceptuj i Podziękuj"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/mail/MailSection.tsx",
                lineNumber: 373,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => generateAiReply("polite"),
                disabled: isGeneratingAiReply,
                className: "px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-all disabled:opacity-50",
                children: isGeneratingAiReply ? "Generowanie..." : "Uprzejma Oferta"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/mail/MailSection.tsx",
                lineNumber: 381,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => generateAiReply("decline"),
                disabled: isGeneratingAiReply,
                className: "px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-medium transition-all disabled:opacity-50",
                children: isGeneratingAiReply ? "Generowanie..." : "Odmów Uprzejmie"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/mail/MailSection.tsx",
                lineNumber: 389,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/mail/MailSection.tsx",
            lineNumber: 372,
            columnNumber: 17
          }, this),
          aiReplyDraft && /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 pt-2 border-t border-indigo-500/20", children: [
            /* @__PURE__ */ jsxDEV(
              "textarea",
              {
                value: aiReplyDraft,
                onChange: (e) => setAiReplyDraft(e.target.value),
                rows: 5,
                className: "w-full bg-slate-900 border border-indigo-500/40 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/mail/MailSection.tsx",
                lineNumber: 400,
                columnNumber: 21
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-end gap-2", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setAiReplyDraft(null),
                  className: "px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg",
                  children: "Odrzuć"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/mail/MailSection.tsx",
                  lineNumber: 407,
                  columnNumber: 23
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleSendReply,
                  className: "px-4 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxDEV(Send, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/mail/MailSection.tsx",
                      lineNumber: 417,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Wyślij Odpowiedź" }, void 0, false, {
                      fileName: "/app/applet/src/components/mail/MailSection.tsx",
                      lineNumber: 418,
                      columnNumber: 25
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/mail/MailSection.tsx",
                  lineNumber: 413,
                  columnNumber: 23
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/mail/MailSection.tsx",
              lineNumber: 406,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/mail/MailSection.tsx",
            lineNumber: 399,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/mail/MailSection.tsx",
          lineNumber: 359,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/mail/MailSection.tsx",
        lineNumber: 333,
        columnNumber: 13
      }, this) : /* @__PURE__ */ jsxDEV("div", { className: "h-full flex items-center justify-center text-slate-500 text-xs py-20", children: "Wybierz wiadomość z listy obok, aby przeczytać i odpowiedzieć." }, void 0, false, {
        fileName: "/app/applet/src/components/mail/MailSection.tsx",
        lineNumber: 427,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/mail/MailSection.tsx",
        lineNumber: 331,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/mail/MailSection.tsx",
      lineNumber: 187,
      columnNumber: 7
    }, this),
    isComposeOpen && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-bold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Mail, { className: "w-5 h-5 text-indigo-400" }, void 0, false, {
            fileName: "/app/applet/src/components/mail/MailSection.tsx",
            lineNumber: 442,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Nowa Wiadomość E-mail" }, void 0, false, {
            fileName: "/app/applet/src/components/mail/MailSection.tsx",
            lineNumber: 443,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/mail/MailSection.tsx",
          lineNumber: 441,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setIsComposeOpen(false),
            className: "text-slate-400 hover:text-white p-1",
            children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
              fileName: "/app/applet/src/components/mail/MailSection.tsx",
              lineNumber: 449,
              columnNumber: 17
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/mail/MailSection.tsx",
            lineNumber: 445,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/mail/MailSection.tsx",
        lineNumber: 440,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSendMail, className: "space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "Odbiorca (E-mail):" }, void 0, false, {
            fileName: "/app/applet/src/components/mail/MailSection.tsx",
            lineNumber: 455,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "email",
              required: true,
              value: composeTo,
              onChange: (e) => setComposeTo(e.target.value),
              placeholder: "np. klient@firma.pl",
              className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/mail/MailSection.tsx",
              lineNumber: 456,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/mail/MailSection.tsx",
          lineNumber: 454,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "Temat:" }, void 0, false, {
            fileName: "/app/applet/src/components/mail/MailSection.tsx",
            lineNumber: 467,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              required: true,
              value: composeSubject,
              onChange: (e) => setComposeSubject(e.target.value),
              placeholder: "Temat wiadomości...",
              className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/mail/MailSection.tsx",
              lineNumber: 468,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/mail/MailSection.tsx",
          lineNumber: 466,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "Treść wiadomości:" }, void 0, false, {
            fileName: "/app/applet/src/components/mail/MailSection.tsx",
            lineNumber: 479,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "textarea",
            {
              required: true,
              rows: 6,
              value: composeBody,
              onChange: (e) => setComposeBody(e.target.value),
              placeholder: "Napisz treść lub skorzystaj z pomocy AI...",
              className: "w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/mail/MailSection.tsx",
              lineNumber: 480,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/mail/MailSection.tsx",
          lineNumber: 478,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pt-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => {
                setComposeSubject("Dostępność Cyfrowa WCAG 2.1 & Oferta SEO");
                setComposeBody("Szanowni Państwo,\n\nPrzesyłamy wstępną wycenę dla audytu SEO oraz dostosowania Państwa serwisu pod wymogi accessibility WCAG 2.1.\n\nZapraszamy do kontaktu.");
              },
              className: "px-3 py-1.5 bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3.5 h-3.5 text-indigo-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/mail/MailSection.tsx",
                  lineNumber: 499,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Wypełnij Szablonem AI" }, void 0, false, {
                  fileName: "/app/applet/src/components/mail/MailSection.tsx",
                  lineNumber: 500,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/mail/MailSection.tsx",
              lineNumber: 491,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => setIsComposeOpen(false),
                className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold",
                children: "Anuluj"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/mail/MailSection.tsx",
                lineNumber: 504,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "submit",
                className: "px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-900/40 flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsxDEV(Send, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/mail/MailSection.tsx",
                    lineNumber: 515,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Wyślij Wiadomość" }, void 0, false, {
                    fileName: "/app/applet/src/components/mail/MailSection.tsx",
                    lineNumber: 516,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/mail/MailSection.tsx",
                lineNumber: 511,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/mail/MailSection.tsx",
            lineNumber: 503,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/mail/MailSection.tsx",
          lineNumber: 490,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/mail/MailSection.tsx",
        lineNumber: 453,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/mail/MailSection.tsx",
      lineNumber: 438,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/mail/MailSection.tsx",
      lineNumber: 437,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/mail/MailSection.tsx",
    lineNumber: 163,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1haWxTZWN0aW9uLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBcbiAgTWFpbCwgXG4gIFNlYXJjaCwgXG4gIFN0YXIsIFxuICBTZW5kLCBcbiAgVHJhc2gyLCBcbiAgQXJjaGl2ZSwgXG4gIFNwYXJrbGVzLCBcbiAgUmVmcmVzaEN3LCBcbiAgUGx1cywgXG4gIENoZWNrQ2lyY2xlLCBcbiAgSW5ib3gsIFxuICBUYWcsIFxuICBVc2VyLCBcbiAgQXJyb3dMZWZ0LFxuICBYXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBNYWlsSXRlbSwgQWNjZXNzaWJpbGl0eVNldHRpbmdzIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuXG5pbnRlcmZhY2UgTWFpbFNlY3Rpb25Qcm9wcyB7XG4gIG1haWxzOiBNYWlsSXRlbVtdO1xuICBzZXRNYWlsczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248TWFpbEl0ZW1bXT4+O1xuICBhY2Nlc3NpYmlsaXR5OiBBY2Nlc3NpYmlsaXR5U2V0dGluZ3M7XG4gIG9uU2VuZE5vdGlmaWNhdGlvbjogKHRpdGxlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgdHlwZTogJ21haWwnKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgTWFpbFNlY3Rpb246IFJlYWN0LkZDPE1haWxTZWN0aW9uUHJvcHM+ID0gKHtcbiAgbWFpbHMsXG4gIHNldE1haWxzLFxuICBhY2Nlc3NpYmlsaXR5LFxuICBvblNlbmROb3RpZmljYXRpb24sXG59KSA9PiB7XG4gIGNvbnN0IFtzZWxlY3RlZEZvbGRlciwgc2V0U2VsZWN0ZWRGb2xkZXJdID0gdXNlU3RhdGU8J2luYm94JyB8ICdzZW50JyB8ICdzdGFycmVkJyB8ICdhcmNoaXZlJyB8ICd0cmFzaCc+KCdpbmJveCcpO1xuICBjb25zdCBbc2VsZWN0ZWRDYXRlZ29yeSwgc2V0U2VsZWN0ZWRDYXRlZ29yeV0gPSB1c2VTdGF0ZTwnYWxsJyB8ICdtYWluJyB8ICd1cGRhdGVzJyB8ICdwcm9tb3Rpb25zJz4oJ2FsbCcpO1xuICBjb25zdCBbc2VsZWN0ZWRNYWlsSWQsIHNldFNlbGVjdGVkTWFpbElkXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG1haWxzWzBdPy5pZCB8fCBudWxsKTtcbiAgY29uc3QgW3NlYXJjaFF1ZXJ5LCBzZXRTZWFyY2hRdWVyeV0gPSB1c2VTdGF0ZSgnJyk7XG4gIFxuICAvLyBOZXcgbWFpbCBtb2RhbCBzdGF0ZVxuICBjb25zdCBbaXNDb21wb3NlT3Blbiwgc2V0SXNDb21wb3NlT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtjb21wb3NlVG8sIHNldENvbXBvc2VUb10gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtjb21wb3NlU3ViamVjdCwgc2V0Q29tcG9zZVN1YmplY3RdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbY29tcG9zZUJvZHksIHNldENvbXBvc2VCb2R5XSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2lzR2VuZXJhdGluZ0FpRHJhZnQsIHNldElzR2VuZXJhdGluZ0FpRHJhZnRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIEFJIHJlcGx5IHN0YXRlXG4gIGNvbnN0IFthaVJlcGx5RHJhZnQsIHNldEFpUmVwbHlEcmFmdF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2lzR2VuZXJhdGluZ0FpUmVwbHksIHNldElzR2VuZXJhdGluZ0FpUmVwbHldID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IHNlbGVjdGVkTWFpbCA9IG1haWxzLmZpbmQobSA9PiBtLmlkID09PSBzZWxlY3RlZE1haWxJZCk7XG5cbiAgLy8gRmlsdGVyIG1haWxzXG4gIGNvbnN0IGZpbHRlcmVkTWFpbHMgPSBtYWlscy5maWx0ZXIobWFpbCA9PiB7XG4gICAgaWYgKHNlbGVjdGVkRm9sZGVyID09PSAnc3RhcnJlZCcpIHtcbiAgICAgIGlmICghbWFpbC5zdGFycmVkKSByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChtYWlsLmZvbGRlciAhPT0gc2VsZWN0ZWRGb2xkZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0ZWRDYXRlZ29yeSAhPT0gJ2FsbCcgJiYgbWFpbC5jYXRlZ29yeSAhPT0gc2VsZWN0ZWRDYXRlZ29yeSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzZWFyY2hRdWVyeS50cmltKCkpIHtcbiAgICAgIGNvbnN0IHEgPSBzZWFyY2hRdWVyeS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgbWFpbC5zdWJqZWN0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHxcbiAgICAgICAgbWFpbC5zZW5kZXJOYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHxcbiAgICAgICAgbWFpbC5zbmlwcGV0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0pO1xuXG4gIGNvbnN0IHRvZ2dsZVN0YXIgPSAoaWQ6IHN0cmluZywgZTogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgc2V0TWFpbHMocHJldiA9PiBwcmV2Lm1hcChtID0+IG0uaWQgPT09IGlkID8geyAuLi5tLCBzdGFycmVkOiAhbS5zdGFycmVkIH0gOiBtKSk7XG4gIH07XG5cbiAgY29uc3QgbWFya0FzUmVhZCA9IChpZDogc3RyaW5nKSA9PiB7XG4gICAgc2V0TWFpbHMocHJldiA9PiBwcmV2Lm1hcChtID0+IG0uaWQgPT09IGlkID8geyAuLi5tLCByZWFkOiB0cnVlIH0gOiBtKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0TWFpbCA9IChtYWlsOiBNYWlsSXRlbSkgPT4ge1xuICAgIHNldFNlbGVjdGVkTWFpbElkKG1haWwuaWQpO1xuICAgIG1hcmtBc1JlYWQobWFpbC5pZCk7XG4gICAgc2V0QWlSZXBseURyYWZ0KG51bGwpO1xuICB9O1xuXG4gIGNvbnN0IGdlbmVyYXRlQWlSZXBseSA9IGFzeW5jIChwcm9tcHRUeXBlOiAncG9saXRlJyB8ICdhY2NlcHQnIHwgJ2RlY2xpbmUnKSA9PiB7XG4gICAgaWYgKCFzZWxlY3RlZE1haWwpIHJldHVybjtcbiAgICBzZXRJc0dlbmVyYXRpbmdBaVJlcGx5KHRydWUpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL2FwaS9tYWlsL2FpLXJlcGx5Jywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBzdWJqZWN0OiBzZWxlY3RlZE1haWwuc3ViamVjdCxcbiAgICAgICAgICBib2R5OiBzZWxlY3RlZE1haWwuYm9keSxcbiAgICAgICAgICBwcm9tcHRUeXBlLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gICAgICBzZXRBaVJlcGx5RHJhZnQoZGF0YS5yZXBseUJvZHkgfHwgJ0R6acSZa3VqxJkgemEgd2lhZG9tb8WbxIcuIFogcHJ6eWplbW5vxZtjacSFIHByenlzdMSFcGlteSBkbyByZWFsaXphY2ppIHphZGFuaWEuJyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBnZW5lcmF0aW5nIEFJIHJlcGx5OicsIGVycik7XG4gICAgICBzZXRBaVJlcGx5RHJhZnQoJ1N6YW5vd255IFBhbmllL1BhbmksXFxuXFxuRHppxJlrdWrEmSB6YSB3aWFkb21vxZvEhy4gUHJ6ZWFuYWxpem93YWxpxZtteSB6Z8WCb3N6b25lIGt3ZXN0aWUgZG90eWN6xIVjZSBTRU8gaSBkb3N0xJlwbm/Fm2NpIGN5ZnJvd2VqLiBTa29udGFrdHVqZW15IHNpxJkgeiBQYW5lbSB3IGNpxIVndSBuYWpibGnFvHN6ZWdvIGRuaWEgcm9ib2N6ZWdvLlxcblxcblogcG93YcW8YW5pZW0sXFxuTWFydGEgS293YWxza2EnKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0SXNHZW5lcmF0aW5nQWlSZXBseShmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlbmRNYWlsID0gKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoIWNvbXBvc2VUbyB8fCAhY29tcG9zZVN1YmplY3QpIHJldHVybjtcblxuICAgIGNvbnN0IG5ld01haWw6IE1haWxJdGVtID0ge1xuICAgICAgaWQ6ICdtYWlsLScgKyBEYXRlLm5vdygpLFxuICAgICAgc2VuZGVyTmFtZTogJ01hcnRhIEtvd2Fsc2thIChUeSknLFxuICAgICAgc2VuZGVyRW1haWw6ICdtYXJ0YS5rb3dhbHNrYUBmaXJtYS1vbW5pc3VpdGUucGwnLFxuICAgICAgc3ViamVjdDogY29tcG9zZVN1YmplY3QsXG4gICAgICBzbmlwcGV0OiBjb21wb3NlQm9keS5zdWJzdHJpbmcoMCwgODApICsgJy4uLicsXG4gICAgICBib2R5OiBjb21wb3NlQm9keSxcbiAgICAgIHRpbWVzdGFtcDogJ1ByemVkIGNod2lsxIUnLFxuICAgICAgcmVhZDogdHJ1ZSxcbiAgICAgIHN0YXJyZWQ6IGZhbHNlLFxuICAgICAgZm9sZGVyOiAnc2VudCcsXG4gICAgICBjYXRlZ29yeTogJ21haW4nLFxuICAgIH07XG5cbiAgICBzZXRNYWlscyhwcmV2ID0+IFtuZXdNYWlsLCAuLi5wcmV2XSk7XG4gICAgc2V0SXNDb21wb3NlT3BlbihmYWxzZSk7XG4gICAgc2V0Q29tcG9zZVRvKCcnKTtcbiAgICBzZXRDb21wb3NlU3ViamVjdCgnJyk7XG4gICAgc2V0Q29tcG9zZUJvZHkoJycpO1xuICAgIG9uU2VuZE5vdGlmaWNhdGlvbignUG9jenRhIFd5c8WCYW5hJywgYFBvbXnFm2xuaWUgd3lzxYJhbm8gd2lhZG9tb8WbxIcgZG86ICR7Y29tcG9zZVRvfWAsICdtYWlsJyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VuZFJlcGx5ID0gKCkgPT4ge1xuICAgIGlmICghc2VsZWN0ZWRNYWlsIHx8ICFhaVJlcGx5RHJhZnQpIHJldHVybjtcbiAgICBcbiAgICBjb25zdCByZXBseU1haWw6IE1haWxJdGVtID0ge1xuICAgICAgaWQ6ICdtYWlsLXJlcGx5LScgKyBEYXRlLm5vdygpLFxuICAgICAgc2VuZGVyTmFtZTogJ01hcnRhIEtvd2Fsc2thIChUeSknLFxuICAgICAgc2VuZGVyRW1haWw6ICdtYXJ0YS5rb3dhbHNrYUBmaXJtYS1vbW5pc3VpdGUucGwnLFxuICAgICAgc3ViamVjdDogYFJlOiAke3NlbGVjdGVkTWFpbC5zdWJqZWN0fWAsXG4gICAgICBzbmlwcGV0OiBhaVJlcGx5RHJhZnQuc3Vic3RyaW5nKDAsIDgwKSArICcuLi4nLFxuICAgICAgYm9keTogYWlSZXBseURyYWZ0LFxuICAgICAgdGltZXN0YW1wOiAnUHJ6ZWQgY2h3aWzEhScsXG4gICAgICByZWFkOiB0cnVlLFxuICAgICAgc3RhcnJlZDogZmFsc2UsXG4gICAgICBmb2xkZXI6ICdzZW50JyxcbiAgICAgIGNhdGVnb3J5OiAnbWFpbicsXG4gICAgfTtcblxuICAgIHNldE1haWxzKHByZXYgPT4gW3JlcGx5TWFpbCwgLi4ucHJldl0pO1xuICAgIHNldEFpUmVwbHlEcmFmdChudWxsKTtcbiAgICBvblNlbmROb3RpZmljYXRpb24oJ09kcG93aWVkxbogV3lzxYJhbmEnLCBgT2Rwb3dpZWTFuiBkbyAke3NlbGVjdGVkTWFpbC5zZW5kZXJOYW1lfSB6b3N0YcWCYSB3eXPFgmFuYSFgLCAnbWFpbCcpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgIFxuICAgICAgey8qIFRvcCBBY3Rpb24gQmFyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdHJhY2tpbmctdGlnaHRcIj5Qb2N6dGEgRWxla3Ryb25vd2EgRmlybXk8L2gyPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj5aYXJ6xIVkemFqIHdpYWRvbW/Fm2NpYW1pIHogYXV0b21hdHljem7EhSBhc3lzdMSFIEdlbWluaSBBSSBpIHBvd2lhZG9taWVuaWFtaSBwdXNoPC9wPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNDb21wb3NlT3Blbih0cnVlKX1cbiAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC14bCB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2hhZG93LWxnIHRyYW5zaXRpb24tYWxsIGZvY3VzLXZpc2libGU6b3V0bGluZS1ub25lIGZvY3VzLXZpc2libGU6cmluZy00ICR7XG4gICAgICAgICAgICBhY2Nlc3NpYmlsaXR5LmhpZ2hDb250cmFzdFxuICAgICAgICAgICAgICA/ICdiZy15ZWxsb3ctNDAwIHRleHQtYmxhY2sgaG92ZXI6YmcteWVsbG93LTMwMCByaW5nLTIgcmluZy15ZWxsb3ctMzAwJ1xuICAgICAgICAgICAgICA6ICdiZy1pbmRpZ28tNjAwIGhvdmVyOmJnLWluZGlnby01MDAgdGV4dC13aGl0ZSBzaGFkb3ctaW5kaWdvLTkwMC8zMCdcbiAgICAgICAgICB9YH1cbiAgICAgICAgICBhcmlhLWxhYmVsPVwiTmFwaXN6IG5vd8SFIHdpYWRvbW/Fm8SHIGUtbWFpbFwiXG4gICAgICAgID5cbiAgICAgICAgICA8UGx1cyBjbGFzc05hbWU9XCJ3LTQgaC00XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgICA8c3Bhbj5OYXBpc3ogV2lhZG9tb8WbxIc8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNYWluIE1haWwgR3JpZCBMYXlvdXQgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC02IGJnLXNsYXRlLTkwMC82MCByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBwLTQgbWluLWgtWzYwMHB4XVwiPlxuICAgICAgICBcbiAgICAgICAgey8qIExlZnQgU3ViLXNpZGViYXIgKEZvbGRlcnMgJiBDYXRlZ29yaWVzKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi0zIHNwYWNlLXktNCBib3JkZXItciBib3JkZXItc2xhdGUtODAwIHByLTRcIj5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBweC0yIG1iLTFcIj5cbiAgICAgICAgICAgICAgRm9sZGVyXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAge1tcbiAgICAgICAgICAgICAgeyBpZDogJ2luYm94JywgbGFiZWw6ICdPZGVicmFuZScsIGljb246IEluYm94LCBjb3VudDogbWFpbHMuZmlsdGVyKG0gPT4gbS5mb2xkZXIgPT09ICdpbmJveCcgJiYgIW0ucmVhZCkubGVuZ3RoIH0sXG4gICAgICAgICAgICAgIHsgaWQ6ICdzdGFycmVkJywgbGFiZWw6ICdPem5hY3pvbmUnLCBpY29uOiBTdGFyLCBjb3VudDogbWFpbHMuZmlsdGVyKG0gPT4gbS5zdGFycmVkKS5sZW5ndGggfSxcbiAgICAgICAgICAgICAgeyBpZDogJ3NlbnQnLCBsYWJlbDogJ1d5c8WCYW5lJywgaWNvbjogU2VuZCB9LFxuICAgICAgICAgICAgICB7IGlkOiAnYXJjaGl2ZScsIGxhYmVsOiAnQXJjaGl3dW0nLCBpY29uOiBBcmNoaXZlIH0sXG4gICAgICAgICAgICAgIHsgaWQ6ICd0cmFzaCcsIGxhYmVsOiAnS29zeicsIGljb246IFRyYXNoMiB9LFxuICAgICAgICAgICAgXS5tYXAoZiA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IEljb24gPSBmLmljb247XG4gICAgICAgICAgICAgIGNvbnN0IGlzRlNlbGVjdGVkID0gc2VsZWN0ZWRGb2xkZXIgPT09IGYuaWQ7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtmLmlkfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRGb2xkZXIoZi5pZCBhcyBhbnkpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC0zIHB5LTIgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgaXNGU2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICA/IChhY2Nlc3NpYmlsaXR5LmhpZ2hDb250cmFzdCA/ICdiZy15ZWxsb3ctNDAwIHRleHQtYmxhY2sgZm9udC1ib2xkJyA6ICdiZy1pbmRpZ28tNjAwIHRleHQtd2hpdGUnKVxuICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtMzAwIGhvdmVyOmJnLXNsYXRlLTgwMCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPEljb24gY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntmLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAge2YuY291bnQgIT09IHVuZGVmaW5lZCAmJiBmLmNvdW50ID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTEuNSBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQtWzEwcHhdIGZvbnQtYm9sZCAke1xuICAgICAgICAgICAgICAgICAgICAgIGlzRlNlbGVjdGVkID8gJ2JnLWJsYWNrLzMwIHRleHQtd2hpdGUnIDogJ2JnLWluZGlnby01MDAvMjAgdGV4dC1pbmRpZ28tMzAwJ1xuICAgICAgICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAgICAgICAge2YuY291bnR9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtNCBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIHNwYWNlLXktMVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBweC0yIG1iLTFcIj5cbiAgICAgICAgICAgICAgS2F0ZWdvcmllXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHtbXG4gICAgICAgICAgICAgIHsgaWQ6ICdhbGwnLCBsYWJlbDogJ1dzenlzdGtpZScgfSxcbiAgICAgICAgICAgICAgeyBpZDogJ21haW4nLCBsYWJlbDogJ0fFgsOzd25lJyB9LFxuICAgICAgICAgICAgICB7IGlkOiAndXBkYXRlcycsIGxhYmVsOiAnUG93aWFkb21pZW5pYScgfSxcbiAgICAgICAgICAgICAgeyBpZDogJ3Byb21vdGlvbnMnLCBsYWJlbDogJ09mZXJ0eScgfSxcbiAgICAgICAgICAgIF0ubWFwKGMgPT4gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAga2V5PXtjLmlkfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkQ2F0ZWdvcnkoYy5pZCBhcyBhbnkpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCB0ZXh0LWxlZnQgcHgtMyBweS0xLjUgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZENhdGVnb3J5ID09PSBjLmlkXG4gICAgICAgICAgICAgICAgICAgID8gJ3RleHQtaW5kaWdvLTQwMCBmb250LWJvbGQgYmctaW5kaWdvLTUwMC8xMCBib3JkZXItbC0yIGJvcmRlci1pbmRpZ28tNTAwJ1xuICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTIwMCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtjLmxhYmVsfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBNaWRkbGUgQ29sdW1uOiBNYWlsIExpc3QgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNCBzcGFjZS15LTMgYm9yZGVyLXIgYm9yZGVyLXNsYXRlLTgwMCBwci00XCI+XG4gICAgICAgICAgXG4gICAgICAgICAgey8qIFNlYXJjaCBCb3ggKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgPFNlYXJjaCBjbGFzc05hbWU9XCJ3LTQgaC00IGFic29sdXRlIGxlZnQtMyB0b3AtMi41IHRleHQtc2xhdGUtNDAwXCIgLz5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2hRdWVyeX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0U2VhcmNoUXVlcnkoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlN6dWthaiB3IHBvY3pjaWUuLi5cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtODAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQteGwgcGwtOSBwci0zIHB5LTIgdGV4dC14cyB0ZXh0LXdoaXRlIHBsYWNlaG9sZGVyLXNsYXRlLTQwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctaW5kaWdvLTUwMFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIE1haWwgSXRlbXMgTGlzdCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBtYXgtaC1bNTIwcHhdIG92ZXJmbG93LXktYXV0byBwci0xXCI+XG4gICAgICAgICAgICB7ZmlsdGVyZWRNYWlscy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgcHktMTIgdGV4dC1zbGF0ZS01MDAgdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgIEJyYWsgd2lhZG9tb8WbY2kgdyB3eWJyYW5laiBrYXRlZ29yaWkuXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgZmlsdGVyZWRNYWlscy5tYXAobWFpbCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IG1haWwuaWQgPT09IHNlbGVjdGVkTWFpbElkO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGtleT17bWFpbC5pZH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU2VsZWN0TWFpbChtYWlsKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0zIHJvdW5kZWQteGwgYm9yZGVyIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyAoYWNjZXNzaWJpbGl0eS5oaWdoQ29udHJhc3QgPyAnYmcteWVsbG93LTQwMC8yMCBib3JkZXIteWVsbG93LTQwMCB0ZXh0LXllbGxvdy0yMDAnIDogJ2JnLWluZGlnby02MDAvMjAgYm9yZGVyLWluZGlnby01MDAvNTAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBtYWlsLnJlYWQgXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXNsYXRlLTgwMC80MCBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwIGhvdmVyOmJnLXNsYXRlLTgwMCcgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTgwMCBib3JkZXItc2xhdGUtNzAwIHRleHQtd2hpdGUgZm9udC1zZW1pYm9sZCdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0cnVuY2F0ZSBtYXgtdy1bMTQwcHhdXCI+e21haWwuc2VuZGVyTmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj57bWFpbC50aW1lc3RhbXB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tZWRpdW0gdHJ1bmNhdGUgbWItMSB0ZXh0LXNsYXRlLTIwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHttYWlsLnN1YmplY3R9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGxpbmUtY2xhbXAtMiBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7bWFpbC5zbmlwcGV0fVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbXQtMiBwdC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS03MDAvNDAgdGV4dC1bMTBweF1cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtlID0+IHRvZ2dsZVN0YXIobWFpbC5pZCwgZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTEgaG92ZXI6dGV4dC1hbWJlci00MDAgdHJhbnNpdGlvbi1jb2xvcnMgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbC5zdGFycmVkID8gJ3RleHQtYW1iZXItNDAwJyA6ICd0ZXh0LXNsYXRlLTUwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJPem5hY3ogZ3dpYXpka8SFXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U3RhciBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSBmaWxsLWN1cnJlbnRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgICAgeyFtYWlsLnJlYWQgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yIGgtMiByb3VuZGVkLWZ1bGwgYmctaW5kaWdvLTUwMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBSaWdodCBDb2x1bW46IE1haWwgRGV0YWlsIFZpZXcgJiBBSSBSZXBseSBBc3Npc3RhbnQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNSBzcGFjZS15LTRcIj5cbiAgICAgICAgICB7c2VsZWN0ZWRNYWlsID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHsvKiBNYWlsIEhlYWRlciAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHBiLTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC0yIG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ib2xkIHRleHQtd2hpdGUgbGVhZGluZy1zbnVnXCI+e3NlbGVjdGVkTWFpbC5zdWJqZWN0fTwvaDM+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIHdoaXRlc3BhY2Utbm93cmFwXCI+e3NlbGVjdGVkTWFpbC50aW1lc3RhbXB9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctNyBoLTcgcm91bmRlZC1mdWxsIGJnLWluZGlnby02MDAgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBmb250LWJvbGQgdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRNYWlsLnNlbmRlck5hbWUuY2hhckF0KDApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGRcIj57c2VsZWN0ZWRNYWlsLnNlbmRlck5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj57c2VsZWN0ZWRNYWlsLnNlbmRlckVtYWlsfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBNYWlsIEJvZHkgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTIwMCB3aGl0ZXNwYWNlLXByZS13cmFwIGxlYWRpbmctcmVsYXhlZCBiZy1zbGF0ZS04MDAvNTAgcC00IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgbWF4LWgtWzIyMHB4XSBvdmVyZmxvdy15LWF1dG9cIj5cbiAgICAgICAgICAgICAgICB7c2VsZWN0ZWRNYWlsLmJvZHl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBHZW1pbmkgQUkgUmVwbHkgU2VjdGlvbiAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1pbmRpZ28tOTUwLzMwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC8zMCBwLTQgcm91bmRlZC14bCBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LWluZGlnby0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1pbmRpZ28tNDAwIGFuaW1hdGUtc3Bpbi1zbG93XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+QXN5c3RlbnQgT2Rwb3dpZWR6aSBHZW1pbmkgQUk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGJnLWluZGlnby01MDAvMjAgdGV4dC1pbmRpZ28tMzAwIHB4LTIgcHktMC41IHJvdW5kZWQtZnVsbFwiPlN6eWJraSBTemtpYzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgICBXeWJpZXJ6IHByZWZlcm93YW55IHN0eWwgb2Rwb3dpZWR6aSwgYSBtb2RlbCB3eWdlbmVydWplIHByb2Zlc2pvbmFsbnkgc3praWMgdyBqxJl6eWt1IHBvbHNraW06XG4gICAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBnZW5lcmF0ZUFpUmVwbHkoJ2FjY2VwdCcpfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNHZW5lcmF0aW5nQWlSZXBseX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgYmctZW1lcmFsZC02MDAgaG92ZXI6YmctZW1lcmFsZC01MDAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIHRleHQteHMgZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1hbGwgZGlzYWJsZWQ6b3BhY2l0eS01MFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtpc0dlbmVyYXRpbmdBaVJlcGx5ID8gJ0dlbmVyb3dhbmllLi4uJyA6ICdBa2NlcHR1aiBpIFBvZHppxJlrdWonfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZ2VuZXJhdGVBaVJlcGx5KCdwb2xpdGUnKX1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzR2VuZXJhdGluZ0FpUmVwbHl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIGJnLWluZGlnby02MDAgaG92ZXI6YmctaW5kaWdvLTUwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWFsbCBkaXNhYmxlZDpvcGFjaXR5LTUwXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2lzR2VuZXJhdGluZ0FpUmVwbHkgPyAnR2VuZXJvd2FuaWUuLi4nIDogJ1Vwcnplam1hIE9mZXJ0YSd9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBnZW5lcmF0ZUFpUmVwbHkoJ2RlY2xpbmUnKX1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzR2VuZXJhdGluZ0FpUmVwbHl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIGJnLXNsYXRlLTcwMCBob3ZlcjpiZy1zbGF0ZS02MDAgdGV4dC1zbGF0ZS0yMDAgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tYWxsIGRpc2FibGVkOm9wYWNpdHktNTBcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7aXNHZW5lcmF0aW5nQWlSZXBseSA/ICdHZW5lcm93YW5pZS4uLicgOiAnT2Rtw7N3IFVwcnplam1pZSd9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHthaVJlcGx5RHJhZnQgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgcHQtMiBib3JkZXItdCBib3JkZXItaW5kaWdvLTUwMC8yMFwiPlxuICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YWlSZXBseURyYWZ0fVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldEFpUmVwbHlEcmFmdChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgcm93cz17NX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC80MCByb3VuZGVkLXhsIHAtMyB0ZXh0LXhzIHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWluZGlnby01MDAgbGVhZGluZy1yZWxheGVkXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktZW5kIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWlSZXBseURyYWZ0KG51bGwpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgdGV4dC14cyByb3VuZGVkLWxnXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBPZHJ6dcSHXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2VuZFJlcGx5fVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0xIGJnLWluZGlnby02MDAgaG92ZXI6YmctaW5kaWdvLTUwMCB0ZXh0LXdoaXRlIGZvbnQtc2VtaWJvbGQgdGV4dC14cyByb3VuZGVkLWxnIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTZW5kIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPld5xZtsaWogT2Rwb3dpZWTFujwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtc2xhdGUtNTAwIHRleHQteHMgcHktMjBcIj5cbiAgICAgICAgICAgICAgV3liaWVyeiB3aWFkb21vxZvEhyB6IGxpc3R5IG9ib2ssIGFieSBwcnplY3p5dGHEhyBpIG9kcG93aWVkemllxIcuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBOZXcgTWFpbCBDb21wb3NlciBNb2RhbCAqL31cbiAgICAgIHtpc0NvbXBvc2VPcGVuICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIGJnLWJsYWNrLzcwIGJhY2tkcm9wLWJsdXItc20gei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLTJ4bCB3LWZ1bGwgbWF4LXcteGwgcC02IHNoYWRvdy0yeGwgc3BhY2UteS00XCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItM1wiPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxNYWlsIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Ob3dhIFdpYWRvbW/Fm8SHIEUtbWFpbDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzQ29tcG9zZU9wZW4oZmFsc2UpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgcC0xXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU2VuZE1haWx9IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0zMDAgbWItMVwiPk9kYmlvcmNhIChFLW1haWwpOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb21wb3NlVG99XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRDb21wb3NlVG8oZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJucC4ga2xpZW50QGZpcm1hLnBsXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC14bCBweC0zIHB5LTIgdGV4dC14cyB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1pbmRpZ28tNTAwXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0zMDAgbWItMVwiPlRlbWF0OjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbXBvc2VTdWJqZWN0fVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0Q29tcG9zZVN1YmplY3QoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJUZW1hdCB3aWFkb21vxZtjaS4uLlwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtODAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQteGwgcHgtMyBweS0yIHRleHQteHMgdGV4dC13aGl0ZSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctaW5kaWdvLTUwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMzAwIG1iLTFcIj5UcmXFm8SHIHdpYWRvbW/Fm2NpOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgcm93cz17Nn1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb21wb3NlQm9keX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldENvbXBvc2VCb2R5KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTmFwaXN6IHRyZcWbxIcgbHViIHNrb3J6eXN0YWogeiBwb21vY3kgQUkuLi5cIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLXhsIHAtMyB0ZXh0LXhzIHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWluZGlnby01MDAgbGVhZGluZy1yZWxheGVkXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwdC0yXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldENvbXBvc2VTdWJqZWN0KCdEb3N0xJlwbm/Fm8SHIEN5ZnJvd2EgV0NBRyAyLjEgJiBPZmVydGEgU0VPJyk7XG4gICAgICAgICAgICAgICAgICAgIHNldENvbXBvc2VCb2R5KCdTemFub3duaSBQYcWEc3R3byxcXG5cXG5Qcnplc3nFgmFteSB3c3TEmXBuxIUgd3ljZW7EmSBkbGEgYXVkeXR1IFNFTyBvcmF6IGRvc3Rvc293YW5pYSBQYcWEc3R3YSBzZXJ3aXN1IHBvZCB3eW1vZ2kgYWNjZXNzaWJpbGl0eSBXQ0FHIDIuMS5cXG5cXG5aYXByYXN6YW15IGRvIGtvbnRha3R1LicpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMS41IGJnLWluZGlnby01MDAvMjAgdGV4dC1pbmRpZ28tMzAwIGhvdmVyOmJnLWluZGlnby01MDAvMzAgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtaW5kaWdvLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5XeXBlxYJuaWogU3phYmxvbmVtIEFJPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0NvbXBvc2VPcGVuKGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGRcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBBbnVsdWpcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNSBweS0yIGJnLWluZGlnby02MDAgaG92ZXI6YmctaW5kaWdvLTUwMCB0ZXh0LXdoaXRlIHJvdW5kZWQteGwgdGV4dC14cyBmb250LXNlbWlib2xkIHNoYWRvdy1sZyBzaGFkb3ctaW5kaWdvLTkwMC80MCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPFNlbmQgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPld5xZtsaWogV2lhZG9tb8WbxIc8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Zvcm0+XG5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUF1S1U7QUF2S1YsU0FBZ0IsZ0JBQWdCO0FBQ2hDO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUVBO0FBQUEsRUFJQTtBQUFBLE9BQ0s7QUFVQSxhQUFNLGNBQTBDLENBQUM7QUFBQSxFQUN0RDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQU07QUFDSixRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixJQUFJLFNBQTZELE9BQU87QUFDaEgsUUFBTSxDQUFDLGtCQUFrQixtQkFBbUIsSUFBSSxTQUFvRCxLQUFLO0FBQ3pHLFFBQU0sQ0FBQyxnQkFBZ0IsaUJBQWlCLElBQUksU0FBd0IsTUFBTSxDQUFDLEdBQUcsTUFBTSxJQUFJO0FBQ3hGLFFBQU0sQ0FBQyxhQUFhLGNBQWMsSUFBSSxTQUFTLEVBQUU7QUFHakQsUUFBTSxDQUFDLGVBQWUsZ0JBQWdCLElBQUksU0FBUyxLQUFLO0FBQ3hELFFBQU0sQ0FBQyxXQUFXLFlBQVksSUFBSSxTQUFTLEVBQUU7QUFDN0MsUUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsSUFBSSxTQUFTLEVBQUU7QUFDdkQsUUFBTSxDQUFDLGFBQWEsY0FBYyxJQUFJLFNBQVMsRUFBRTtBQUNqRCxRQUFNLENBQUMscUJBQXFCLHNCQUFzQixJQUFJLFNBQVMsS0FBSztBQUdwRSxRQUFNLENBQUMsY0FBYyxlQUFlLElBQUksU0FBd0IsSUFBSTtBQUNwRSxRQUFNLENBQUMscUJBQXFCLHNCQUFzQixJQUFJLFNBQVMsS0FBSztBQUVwRSxRQUFNLGVBQWUsTUFBTSxLQUFLLE9BQUssRUFBRSxPQUFPLGNBQWM7QUFHNUQsUUFBTSxnQkFBZ0IsTUFBTSxPQUFPLFVBQVE7QUFDekMsUUFBSSxtQkFBbUIsV0FBVztBQUNoQyxVQUFJLENBQUMsS0FBSyxRQUFTLFFBQU87QUFBQSxJQUM1QixXQUFXLEtBQUssV0FBVyxnQkFBZ0I7QUFDekMsYUFBTztBQUFBLElBQ1Q7QUFFQSxRQUFJLHFCQUFxQixTQUFTLEtBQUssYUFBYSxrQkFBa0I7QUFDcEUsYUFBTztBQUFBLElBQ1Q7QUFFQSxRQUFJLFlBQVksS0FBSyxHQUFHO0FBQ3RCLFlBQU0sSUFBSSxZQUFZLFlBQVk7QUFDbEMsYUFDRSxLQUFLLFFBQVEsWUFBWSxFQUFFLFNBQVMsQ0FBQyxLQUNyQyxLQUFLLFdBQVcsWUFBWSxFQUFFLFNBQVMsQ0FBQyxLQUN4QyxLQUFLLFFBQVEsWUFBWSxFQUFFLFNBQVMsQ0FBQztBQUFBLElBRXpDO0FBRUEsV0FBTztBQUFBLEVBQ1QsQ0FBQztBQUVELFFBQU0sYUFBYSxDQUFDLElBQVksTUFBd0I7QUFDdEQsTUFBRSxnQkFBZ0I7QUFDbEIsYUFBUyxVQUFRLEtBQUssSUFBSSxPQUFLLEVBQUUsT0FBTyxLQUFLLEVBQUUsR0FBRyxHQUFHLFNBQVMsQ0FBQyxFQUFFLFFBQVEsSUFBSSxDQUFDLENBQUM7QUFBQSxFQUNqRjtBQUVBLFFBQU0sYUFBYSxDQUFDLE9BQWU7QUFDakMsYUFBUyxVQUFRLEtBQUssSUFBSSxPQUFLLEVBQUUsT0FBTyxLQUFLLEVBQUUsR0FBRyxHQUFHLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQztBQUFBLEVBQ3hFO0FBRUEsUUFBTSxtQkFBbUIsQ0FBQyxTQUFtQjtBQUMzQyxzQkFBa0IsS0FBSyxFQUFFO0FBQ3pCLGVBQVcsS0FBSyxFQUFFO0FBQ2xCLG9CQUFnQixJQUFJO0FBQUEsRUFDdEI7QUFFQSxRQUFNLGtCQUFrQixPQUFPLGVBQWdEO0FBQzdFLFFBQUksQ0FBQyxhQUFjO0FBQ25CLDJCQUF1QixJQUFJO0FBQzNCLFFBQUk7QUFDRixZQUFNLE1BQU0sTUFBTSxNQUFNLHNCQUFzQjtBQUFBLFFBQzVDLFFBQVE7QUFBQSxRQUNSLFNBQVMsRUFBRSxnQkFBZ0IsbUJBQW1CO0FBQUEsUUFDOUMsTUFBTSxLQUFLLFVBQVU7QUFBQSxVQUNuQixTQUFTLGFBQWE7QUFBQSxVQUN0QixNQUFNLGFBQWE7QUFBQSxVQUNuQjtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUNELFlBQU0sT0FBTyxNQUFNLElBQUksS0FBSztBQUM1QixzQkFBZ0IsS0FBSyxhQUFhLDJFQUEyRTtBQUFBLElBQy9HLFNBQVMsS0FBSztBQUNaLGNBQVEsTUFBTSw4QkFBOEIsR0FBRztBQUMvQyxzQkFBZ0IsMk5BQTJOO0FBQUEsSUFDN08sVUFBRTtBQUNBLDZCQUF1QixLQUFLO0FBQUEsSUFDOUI7QUFBQSxFQUNGO0FBRUEsUUFBTSxpQkFBaUIsQ0FBQyxNQUF1QjtBQUM3QyxNQUFFLGVBQWU7QUFDakIsUUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFnQjtBQUVuQyxVQUFNLFVBQW9CO0FBQUEsTUFDeEIsSUFBSSxVQUFVLEtBQUssSUFBSTtBQUFBLE1BQ3ZCLFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLFNBQVM7QUFBQSxNQUNULFNBQVMsWUFBWSxVQUFVLEdBQUcsRUFBRSxJQUFJO0FBQUEsTUFDeEMsTUFBTTtBQUFBLE1BQ04sV0FBVztBQUFBLE1BQ1gsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLElBQ1o7QUFFQSxhQUFTLFVBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ25DLHFCQUFpQixLQUFLO0FBQ3RCLGlCQUFhLEVBQUU7QUFDZixzQkFBa0IsRUFBRTtBQUNwQixtQkFBZSxFQUFFO0FBQ2pCLHVCQUFtQixrQkFBa0IsbUNBQW1DLFNBQVMsSUFBSSxNQUFNO0FBQUEsRUFDN0Y7QUFFQSxRQUFNLGtCQUFrQixNQUFNO0FBQzVCLFFBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFjO0FBRXBDLFVBQU0sWUFBc0I7QUFBQSxNQUMxQixJQUFJLGdCQUFnQixLQUFLLElBQUk7QUFBQSxNQUM3QixZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixTQUFTLE9BQU8sYUFBYSxPQUFPO0FBQUEsTUFDcEMsU0FBUyxhQUFhLFVBQVUsR0FBRyxFQUFFLElBQUk7QUFBQSxNQUN6QyxNQUFNO0FBQUEsTUFDTixXQUFXO0FBQUEsTUFDWCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsSUFDWjtBQUVBLGFBQVMsVUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDckMsb0JBQWdCLElBQUk7QUFDcEIsdUJBQW1CLHFCQUFxQixnQkFBZ0IsYUFBYSxVQUFVLHFCQUFxQixNQUFNO0FBQUEsRUFDNUc7QUFFQSxTQUNFLHVCQUFDLFNBQUksV0FBVSxhQUdiO0FBQUEsMkJBQUMsU0FBSSxXQUFVLCtFQUNiO0FBQUEsNkJBQUMsU0FDQztBQUFBLCtCQUFDLFFBQUcsV0FBVSxvQ0FBbUMsd0NBQWpEO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBeUU7QUFBQSxRQUN6RSx1QkFBQyxPQUFFLFdBQVUsMEJBQXlCLDhGQUF0QztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQW9IO0FBQUEsV0FGdEg7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUdBO0FBQUEsTUFFQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsU0FBUyxNQUFNLGlCQUFpQixJQUFJO0FBQUEsVUFDcEMsV0FBVywrSUFDVCxjQUFjLGVBQ1Ysd0VBQ0EsbUVBQ047QUFBQSxVQUNBLGNBQVc7QUFBQSxVQUVYO0FBQUEsbUNBQUMsUUFBSyxXQUFVLFdBQVUsZUFBWSxVQUF0QztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUE2QztBQUFBLFlBQzdDLHVCQUFDLFVBQUssZ0NBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBc0I7QUFBQTtBQUFBO0FBQUEsUUFWeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BV0E7QUFBQSxTQWpCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBa0JBO0FBQUEsSUFHQSx1QkFBQyxTQUFJLFdBQVUsZ0hBR2I7QUFBQSw2QkFBQyxTQUFJLFdBQVUsMERBRWI7QUFBQSwrQkFBQyxTQUFJLFdBQVUsYUFDYjtBQUFBLGlDQUFDLFNBQUksV0FBVSwrRUFBOEUsc0JBQTdGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRUE7QUFBQSxVQUVDO0FBQUEsWUFDQyxFQUFFLElBQUksU0FBUyxPQUFPLFlBQVksTUFBTSxPQUFPLE9BQU8sTUFBTSxPQUFPLE9BQUssRUFBRSxXQUFXLFdBQVcsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPO0FBQUEsWUFDaEgsRUFBRSxJQUFJLFdBQVcsT0FBTyxhQUFhLE1BQU0sTUFBTSxPQUFPLE1BQU0sT0FBTyxPQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU87QUFBQSxZQUM1RixFQUFFLElBQUksUUFBUSxPQUFPLFdBQVcsTUFBTSxLQUFLO0FBQUEsWUFDM0MsRUFBRSxJQUFJLFdBQVcsT0FBTyxZQUFZLE1BQU0sUUFBUTtBQUFBLFlBQ2xELEVBQUUsSUFBSSxTQUFTLE9BQU8sUUFBUSxNQUFNLE9BQU87QUFBQSxVQUM3QyxFQUFFLElBQUksT0FBSztBQUNULGtCQUFNLE9BQU8sRUFBRTtBQUNmLGtCQUFNLGNBQWMsbUJBQW1CLEVBQUU7QUFDekMsbUJBQ0U7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFFQyxTQUFTLE1BQU0sa0JBQWtCLEVBQUUsRUFBUztBQUFBLGdCQUM1QyxXQUFXLHNHQUNULGNBQ0ssY0FBYyxlQUFlLHVDQUF1Qyw2QkFDckUsbUNBQ047QUFBQSxnQkFFQTtBQUFBLHlDQUFDLFNBQUksV0FBVSwyQkFDYjtBQUFBLDJDQUFDLFFBQUssV0FBVSxhQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLDJCQUEwQjtBQUFBLG9CQUMxQix1QkFBQyxVQUFNLFlBQUUsU0FBVDtBQUFBO0FBQUE7QUFBQTtBQUFBLDJCQUFlO0FBQUEsdUJBRmpCO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBR0E7QUFBQSxrQkFDQyxFQUFFLFVBQVUsVUFBYSxFQUFFLFFBQVEsS0FDbEMsdUJBQUMsVUFBSyxXQUFXLG9EQUNmLGNBQWMsMkJBQTJCLGtDQUMzQyxJQUNHLFlBQUUsU0FITDtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUlBO0FBQUE7QUFBQTtBQUFBLGNBakJHLEVBQUU7QUFBQSxjQURUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFvQkE7QUFBQSxVQUVKLENBQUM7QUFBQSxhQXJDSDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBc0NBO0FBQUEsUUFFQSx1QkFBQyxTQUFJLFdBQVUsNENBQ2I7QUFBQSxpQ0FBQyxTQUFJLFdBQVUsK0VBQThFLHlCQUE3RjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsVUFDQztBQUFBLFlBQ0MsRUFBRSxJQUFJLE9BQU8sT0FBTyxZQUFZO0FBQUEsWUFDaEMsRUFBRSxJQUFJLFFBQVEsT0FBTyxTQUFTO0FBQUEsWUFDOUIsRUFBRSxJQUFJLFdBQVcsT0FBTyxnQkFBZ0I7QUFBQSxZQUN4QyxFQUFFLElBQUksY0FBYyxPQUFPLFNBQVM7QUFBQSxVQUN0QyxFQUFFLElBQUksT0FDSjtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBRUMsU0FBUyxNQUFNLG9CQUFvQixFQUFFLEVBQVM7QUFBQSxjQUM5QyxXQUFXLDhFQUNULHFCQUFxQixFQUFFLEtBQ25CLDRFQUNBLHFDQUNOO0FBQUEsY0FFQyxZQUFFO0FBQUE7QUFBQSxZQVJFLEVBQUU7QUFBQSxZQURUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFVQSxDQUNEO0FBQUEsYUFyQkg7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQXNCQTtBQUFBLFdBaEVGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFrRUE7QUFBQSxNQUdBLHVCQUFDLFNBQUksV0FBVSwwREFHYjtBQUFBLCtCQUFDLFNBQUksV0FBVSxZQUNiO0FBQUEsaUNBQUMsVUFBTyxXQUFVLG9EQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFtRTtBQUFBLFVBQ25FO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxNQUFLO0FBQUEsY0FDTCxPQUFPO0FBQUEsY0FDUCxVQUFVLE9BQUssZUFBZSxFQUFFLE9BQU8sS0FBSztBQUFBLGNBQzVDLGFBQVk7QUFBQSxjQUNaLFdBQVU7QUFBQTtBQUFBLFlBTFo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBTUE7QUFBQSxhQVJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFTQTtBQUFBLFFBR0EsdUJBQUMsU0FBSSxXQUFVLGdEQUNaLHdCQUFjLFdBQVcsSUFDeEIsdUJBQUMsU0FBSSxXQUFVLDRDQUEyQyxxREFBMUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUVBLElBRUEsY0FBYyxJQUFJLFVBQVE7QUFDeEIsZ0JBQU0sYUFBYSxLQUFLLE9BQU87QUFDL0IsaUJBQ0U7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUVDLFNBQVMsTUFBTSxpQkFBaUIsSUFBSTtBQUFBLGNBQ3BDLFdBQVcsdURBQ1QsYUFDSyxjQUFjLGVBQWUsdURBQXVELDBDQUNyRixLQUFLLE9BQ0gsdUVBQ0Esd0RBQ1I7QUFBQSxjQUVBO0FBQUEsdUNBQUMsU0FBSSxXQUFVLGtEQUNiO0FBQUEseUNBQUMsVUFBSyxXQUFVLG9DQUFvQyxlQUFLLGNBQXpEO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQW9FO0FBQUEsa0JBQ3BFLHVCQUFDLFVBQUssV0FBVSw4QkFBOEIsZUFBSyxhQUFuRDtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUE2RDtBQUFBLHFCQUYvRDtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUdBO0FBQUEsZ0JBRUEsdUJBQUMsU0FBSSxXQUFVLG9EQUNaLGVBQUssV0FEUjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUVBO0FBQUEsZ0JBRUEsdUJBQUMsT0FBRSxXQUFVLDJEQUNWLGVBQUssV0FEUjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUVBO0FBQUEsZ0JBRUEsdUJBQUMsU0FBSSxXQUFVLHdGQUNiO0FBQUE7QUFBQSxvQkFBQztBQUFBO0FBQUEsc0JBQ0MsU0FBUyxPQUFLLFdBQVcsS0FBSyxJQUFJLENBQUM7QUFBQSxzQkFDbkMsV0FBVyw4Q0FDVCxLQUFLLFVBQVUsbUJBQW1CLGdCQUNwQztBQUFBLHNCQUNBLE9BQU07QUFBQSxzQkFFTixpQ0FBQyxRQUFLLFdBQVUsOEJBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkJBQTJDO0FBQUE7QUFBQSxvQkFQN0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQVFBO0FBQUEsa0JBRUMsQ0FBQyxLQUFLLFFBQ0wsdUJBQUMsVUFBSyxXQUFVLHNEQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUFtRTtBQUFBLHFCQVp2RTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQWNBO0FBQUE7QUFBQTtBQUFBLFlBckNLLEtBQUs7QUFBQSxZQURaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUF1Q0E7QUFBQSxRQUVKLENBQUMsS0FsREw7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQW9EQTtBQUFBLFdBbkVGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFxRUE7QUFBQSxNQUdBLHVCQUFDLFNBQUksV0FBVSwyQkFDWix5QkFDQyx1QkFBQyxTQUFJLFdBQVUsYUFHYjtBQUFBLCtCQUFDLFNBQUksV0FBVSxrQ0FDYjtBQUFBLGlDQUFDLFNBQUksV0FBVSwrQ0FDYjtBQUFBLG1DQUFDLFFBQUcsV0FBVSwrQ0FBK0MsdUJBQWEsV0FBMUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBa0Y7QUFBQSxZQUNsRix1QkFBQyxVQUFLLFdBQVUsNENBQTRDLHVCQUFhLGFBQXpFO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQW1GO0FBQUEsZUFGckY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFHQTtBQUFBLFVBRUEsdUJBQUMsU0FBSSxXQUFVLGtEQUNiO0FBQUEsbUNBQUMsU0FBSSxXQUFVLG9HQUNaLHVCQUFhLFdBQVcsT0FBTyxDQUFDLEtBRG5DO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUE7QUFBQSxZQUNBLHVCQUFDLFNBQ0M7QUFBQSxxQ0FBQyxTQUFJLFdBQVUsaUJBQWlCLHVCQUFhLGNBQTdDO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXdEO0FBQUEsY0FDeEQsdUJBQUMsU0FBSSxXQUFVLDhCQUE4Qix1QkFBYSxlQUExRDtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFzRTtBQUFBLGlCQUZ4RTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUdBO0FBQUEsZUFQRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQVFBO0FBQUEsYUFkRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBZUE7QUFBQSxRQUdBLHVCQUFDLFNBQUksV0FBVSxtSkFDWix1QkFBYSxRQURoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxRQUdBLHVCQUFDLFNBQUksV0FBVSx5RUFDYjtBQUFBLGlDQUFDLFNBQUksV0FBVSxxQ0FDYjtBQUFBLG1DQUFDLFNBQUksV0FBVSw2REFDYjtBQUFBLHFDQUFDLFlBQVMsV0FBVSwrQ0FBcEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBZ0U7QUFBQSxjQUNoRSx1QkFBQyxVQUFLLDZDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQW1DO0FBQUEsaUJBRnJDO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBR0E7QUFBQSxZQUNBLHVCQUFDLFVBQUssV0FBVSx5RUFBd0UsNEJBQXhGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQW9HO0FBQUEsZUFMdEc7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFNQTtBQUFBLFVBRUEsdUJBQUMsT0FBRSxXQUFVLDhCQUE2Qiw2R0FBMUM7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLFVBRUEsdUJBQUMsU0FBSSxXQUFVLHdCQUNiO0FBQUE7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxTQUFTLE1BQU0sZ0JBQWdCLFFBQVE7QUFBQSxnQkFDdkMsVUFBVTtBQUFBLGdCQUNWLFdBQVU7QUFBQSxnQkFFVCxnQ0FBc0IsbUJBQW1CO0FBQUE7QUFBQSxjQUw1QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFNQTtBQUFBLFlBRUE7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxTQUFTLE1BQU0sZ0JBQWdCLFFBQVE7QUFBQSxnQkFDdkMsVUFBVTtBQUFBLGdCQUNWLFdBQVU7QUFBQSxnQkFFVCxnQ0FBc0IsbUJBQW1CO0FBQUE7QUFBQSxjQUw1QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFNQTtBQUFBLFlBRUE7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxTQUFTLE1BQU0sZ0JBQWdCLFNBQVM7QUFBQSxnQkFDeEMsVUFBVTtBQUFBLGdCQUNWLFdBQVU7QUFBQSxnQkFFVCxnQ0FBc0IsbUJBQW1CO0FBQUE7QUFBQSxjQUw1QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFNQTtBQUFBLGVBdkJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBd0JBO0FBQUEsVUFFQyxnQkFDQyx1QkFBQyxTQUFJLFdBQVUsZ0RBQ2I7QUFBQTtBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUNDLE9BQU87QUFBQSxnQkFDUCxVQUFVLE9BQUssZ0JBQWdCLEVBQUUsT0FBTyxLQUFLO0FBQUEsZ0JBQzdDLE1BQU07QUFBQSxnQkFDTixXQUFVO0FBQUE7QUFBQSxjQUpaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUtBO0FBQUEsWUFDQSx1QkFBQyxTQUFJLFdBQVUsMEJBQ2I7QUFBQTtBQUFBLGdCQUFDO0FBQUE7QUFBQSxrQkFDQyxTQUFTLE1BQU0sZ0JBQWdCLElBQUk7QUFBQSxrQkFDbkMsV0FBVTtBQUFBLGtCQUNYO0FBQUE7QUFBQSxnQkFIRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FLQTtBQUFBLGNBQ0E7QUFBQSxnQkFBQztBQUFBO0FBQUEsa0JBQ0MsU0FBUztBQUFBLGtCQUNULFdBQVU7QUFBQSxrQkFFVjtBQUFBLDJDQUFDLFFBQUssV0FBVSxpQkFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSwyQkFBOEI7QUFBQSxvQkFDOUIsdUJBQUMsVUFBSyxnQ0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLDJCQUFzQjtBQUFBO0FBQUE7QUFBQSxnQkFMeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBTUE7QUFBQSxpQkFiRjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQWNBO0FBQUEsZUFyQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFzQkE7QUFBQSxhQTlESjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBZ0VBO0FBQUEsV0ExRkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQTRGQSxJQUVBLHVCQUFDLFNBQUksV0FBVSx3RUFBdUUsOEVBQXRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFFQSxLQWxHSjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBb0dBO0FBQUEsU0FwUEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQXNQQTtBQUFBLElBR0MsaUJBQ0MsdUJBQUMsU0FBSSxXQUFVLHdGQUNiLGlDQUFDLFNBQUksV0FBVSw2RkFFYjtBQUFBLDZCQUFDLFNBQUksV0FBVSxvRUFDYjtBQUFBLCtCQUFDLFFBQUcsV0FBVSx3REFDWjtBQUFBLGlDQUFDLFFBQUssV0FBVSw2QkFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBMEM7QUFBQSxVQUMxQyx1QkFBQyxVQUFLLHFDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQTJCO0FBQUEsYUFGN0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUdBO0FBQUEsUUFDQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsU0FBUyxNQUFNLGlCQUFpQixLQUFLO0FBQUEsWUFDckMsV0FBVTtBQUFBLFlBRVYsaUNBQUMsS0FBRSxXQUFVLGFBQWI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBdUI7QUFBQTtBQUFBLFVBSnpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUtBO0FBQUEsV0FWRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBV0E7QUFBQSxNQUVBLHVCQUFDLFVBQUssVUFBVSxnQkFBZ0IsV0FBVSxhQUN4QztBQUFBLCtCQUFDLFNBQ0M7QUFBQSxpQ0FBQyxXQUFNLFdBQVUsbURBQWtELGtDQUFuRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFxRjtBQUFBLFVBQ3JGO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxNQUFLO0FBQUEsY0FDTCxVQUFRO0FBQUEsY0FDUixPQUFPO0FBQUEsY0FDUCxVQUFVLE9BQUssYUFBYSxFQUFFLE9BQU8sS0FBSztBQUFBLGNBQzFDLGFBQVk7QUFBQSxjQUNaLFdBQVU7QUFBQTtBQUFBLFlBTlo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBT0E7QUFBQSxhQVRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFVQTtBQUFBLFFBRUEsdUJBQUMsU0FDQztBQUFBLGlDQUFDLFdBQU0sV0FBVSxtREFBa0Qsc0JBQW5FO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXlFO0FBQUEsVUFDekU7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLE1BQUs7QUFBQSxjQUNMLFVBQVE7QUFBQSxjQUNSLE9BQU87QUFBQSxjQUNQLFVBQVUsT0FBSyxrQkFBa0IsRUFBRSxPQUFPLEtBQUs7QUFBQSxjQUMvQyxhQUFZO0FBQUEsY0FDWixXQUFVO0FBQUE7QUFBQSxZQU5aO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQU9BO0FBQUEsYUFURjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBVUE7QUFBQSxRQUVBLHVCQUFDLFNBQ0M7QUFBQSxpQ0FBQyxXQUFNLFdBQVUsbURBQWtELGlDQUFuRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFvRjtBQUFBLFVBQ3BGO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxVQUFRO0FBQUEsY0FDUixNQUFNO0FBQUEsY0FDTixPQUFPO0FBQUEsY0FDUCxVQUFVLE9BQUssZUFBZSxFQUFFLE9BQU8sS0FBSztBQUFBLGNBQzVDLGFBQVk7QUFBQSxjQUNaLFdBQVU7QUFBQTtBQUFBLFlBTlo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBT0E7QUFBQSxhQVRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFVQTtBQUFBLFFBRUEsdUJBQUMsU0FBSSxXQUFVLDBDQUNiO0FBQUE7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLE1BQUs7QUFBQSxjQUNMLFNBQVMsTUFBTTtBQUNiLGtDQUFrQiwwQ0FBMEM7QUFDNUQsK0JBQWUsK0pBQStKO0FBQUEsY0FDaEw7QUFBQSxjQUNBLFdBQVU7QUFBQSxjQUVWO0FBQUEsdUNBQUMsWUFBUyxXQUFVLGlDQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUFrRDtBQUFBLGdCQUNsRCx1QkFBQyxVQUFLLHFDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQTJCO0FBQUE7QUFBQTtBQUFBLFlBVDdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQVVBO0FBQUEsVUFFQSx1QkFBQyxTQUFJLFdBQVUsY0FDYjtBQUFBO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0MsTUFBSztBQUFBLGdCQUNMLFNBQVMsTUFBTSxpQkFBaUIsS0FBSztBQUFBLGdCQUNyQyxXQUFVO0FBQUEsZ0JBQ1g7QUFBQTtBQUFBLGNBSkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBTUE7QUFBQSxZQUNBO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0MsTUFBSztBQUFBLGdCQUNMLFdBQVU7QUFBQSxnQkFFVjtBQUFBLHlDQUFDLFFBQUssV0FBVSxhQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUEwQjtBQUFBLGtCQUMxQix1QkFBQyxVQUFLLGdDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQXNCO0FBQUE7QUFBQTtBQUFBLGNBTHhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQU1BO0FBQUEsZUFkRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQWVBO0FBQUEsYUE1QkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQTZCQTtBQUFBLFdBbEVGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFtRUE7QUFBQSxTQWxGRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBb0ZBLEtBckZGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FzRkE7QUFBQSxPQXhXSjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBMldBO0FBRUo7IiwibmFtZXMiOltdfQ==