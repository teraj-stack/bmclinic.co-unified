import __vite__cjsImport0_react_jsxDevRuntime from "/ai-studio-app/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=d886a827"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/ai-studio-app/node_modules/.vite/deps/react.js?v=d886a827"; const useState = __vite__cjsImport1_react["useState"];
import {
  ShieldCheck,
  ShieldAlert,
  QrCode,
  KeyRound,
  Copy,
  Check,
  Smartphone,
  Lock,
  UserCheck,
  X
} from "/ai-studio-app/node_modules/.vite/deps/lucide-react.js?v=5db40f83";
export const Security2FASection = ({
  user,
  setUser,
  accessibility,
  onSendNotification
}) => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [totpInput, setTotpInput] = useState("");
  const [codeError, setCodeError] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [isTestLoginOpen, setIsTestLoginOpen] = useState(false);
  const [testPassword, setTestPassword] = useState("haslo123");
  const [testTotp, setTestTotp] = useState("");
  const [loginStep, setLoginStep] = useState("credentials");
  const [loginError, setLoginError] = useState("");
  const toggle2FA = () => {
    if (user.isTwoFactorEnabled) {
      setUser((prev) => ({ ...prev, isTwoFactorEnabled: false }));
      onSendNotification("Bezpieczeństwo", "Uwierzytelnienie dwuskładnikowe 2FA zostało wyłączone.", "security");
    } else {
      setIsWizardOpen(true);
      setWizardStep(1);
    }
  };
  const verifyWizardTotp = (e) => {
    e.preventDefault();
    if (totpInput.length !== 6) {
      setCodeError("Kod TOTP musi składać się z 6 cyfr.");
      return;
    }
    setCodeError("");
    setWizardStep(3);
  };
  const finish2FASetup = () => {
    setUser((prev) => ({ ...prev, isTwoFactorEnabled: true }));
    setIsWizardOpen(false);
    onSendNotification("2FA Aktywne", "Uwierzytelnienie dwuskładnikowe 2FA zostało pomyślnie skonfigurowane.", "security");
  };
  const copyBackupCodes = () => {
    navigator.clipboard.writeText(user.backupCodes.join("\n"));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2e3);
  };
  const handleSimulateCredentials = (e) => {
    e.preventDefault();
    if (user.isTwoFactorEnabled) {
      setLoginStep("totp");
      setLoginError("");
    } else {
      setLoginStep("success");
    }
  };
  const handleSimulateTotp = (e) => {
    e.preventDefault();
    if (testTotp.length === 6) {
      setLoginStep("success");
      setLoginError("");
    } else {
      setLoginError("Wprowadź prawidłowy 6-cyfrowy kod z aplikacji Authenticator.");
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold tracking-tight", children: "System Bezpiecznego Uwierzytelniania Dwuskładnikowego (2FA)" }, void 0, false, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 105,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400", children: "Zabezpiecz konto firmowe kodem TOTP z aplikacji Google Authenticator / Microsoft Authenticator" }, void 0, false, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 106,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/security/Security2FASection.tsx",
        lineNumber: 104,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setIsTestLoginOpen(true),
          className: `px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${accessibility.highContrast ? "bg-yellow-400 text-black border-yellow-300 font-bold" : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"}`,
          children: [
            /* @__PURE__ */ jsxDEV(UserCheck, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/security/Security2FASection.tsx",
              lineNumber: 117,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Przetestuj Logowanie z 2FA" }, void 0, false, {
              fileName: "/app/applet/src/components/security/Security2FASection.tsx",
              lineNumber: 118,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 109,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/security/Security2FASection.tsx",
      lineNumber: 103,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: `p-6 rounded-3xl border space-y-6 ${accessibility.highContrast ? "bg-black border-yellow-400 text-yellow-300" : user.isTwoFactorEnabled ? "bg-slate-900 border-emerald-500/40 text-slate-100" : "bg-slate-900 border-amber-500/40 text-slate-100"}`, children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: `w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl ${user.isTwoFactorEnabled ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"}`, children: user.isTwoFactorEnabled ? /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-8 h-8" }, void 0, false, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 136,
            columnNumber: 42
          }, this) : /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-8 h-8" }, void 0, false, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 136,
            columnNumber: 80
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 133,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-bold", children: [
                "Ochrona Konta 2FA: ",
                user.isTwoFactorEnabled ? "AKTYWNA" : "WYŁĄCZONA"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/security/Security2FASection.tsx",
                lineNumber: 141,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: `px-2.5 py-0.5 rounded-full text-xs font-bold ${user.isTwoFactorEnabled ? "bg-emerald-500 text-black" : "bg-amber-500 text-black"}`, children: user.isTwoFactorEnabled ? "100% Bezpieczeństwa" : "Wymagane Skonfigurowanie" }, void 0, false, {
                fileName: "/app/applet/src/components/security/Security2FASection.tsx",
                lineNumber: 142,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/security/Security2FASection.tsx",
              lineNumber: 140,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-0.5", children: user.isTwoFactorEnabled ? "Twoje konto wymaga podania hasła oraz 6-cyfrowego kodu TOTP przy każdym nowym logowaniu." : "Zalecamy natychmiastowe włączenie weryfikacji dwuetapowej w celu zabezpieczenia danych firmowych." }, void 0, false, {
              fileName: "/app/applet/src/components/security/Security2FASection.tsx",
              lineNumber: 148,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 139,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 132,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: toggle2FA,
            className: `px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg transition-all ${user.isTwoFactorEnabled ? "bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40" : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40"}`,
            children: user.isTwoFactorEnabled ? "Wyłącz 2FA" : "Skonfiguruj 2FA Teraz"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 156,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/security/Security2FASection.tsx",
        lineNumber: 131,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-xs", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 font-bold text-slate-200", children: [
            /* @__PURE__ */ jsxDEV(QrCode, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
              fileName: "/app/applet/src/components/security/Security2FASection.tsx",
              lineNumber: 173,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Aplikacja Authenticator" }, void 0, false, {
              fileName: "/app/applet/src/components/security/Security2FASection.tsx",
              lineNumber: 174,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 172,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 leading-relaxed", children: [
            "Klucz Tajny TOTP: ",
            /* @__PURE__ */ jsxDEV("code", { className: "bg-slate-900 px-2 py-0.5 rounded text-indigo-300 font-mono font-bold", children: user.twoFactorSecret }, void 0, false, {
              fileName: "/app/applet/src/components/security/Security2FASection.tsx",
              lineNumber: 177,
              columnNumber: 33
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 176,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 171,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-bold text-slate-200", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(KeyRound, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
                fileName: "/app/applet/src/components/security/Security2FASection.tsx",
                lineNumber: 184,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Kody Zapasowe (5 sztuk)" }, void 0, false, {
                fileName: "/app/applet/src/components/security/Security2FASection.tsx",
                lineNumber: 185,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/security/Security2FASection.tsx",
              lineNumber: 183,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("button", { onClick: copyBackupCodes, className: "text-indigo-400 hover:underline text-[10px] flex items-center gap-1", children: [
              copiedCode ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/security/Security2FASection.tsx",
                lineNumber: 188,
                columnNumber: 31
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/applet/src/components/security/Security2FASection.tsx",
                lineNumber: 188,
                columnNumber: 80
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: copiedCode ? "Skopiowano" : "Kopiuj" }, void 0, false, {
                fileName: "/app/applet/src/components/security/Security2FASection.tsx",
                lineNumber: 189,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/security/Security2FASection.tsx",
              lineNumber: 187,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 182,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-[11px] text-slate-300 grid grid-cols-2 gap-1 pt-1", children: user.backupCodes.map((code, i) => /* @__PURE__ */ jsxDEV("span", { className: "bg-slate-900/80 px-2 py-0.5 rounded text-center border border-slate-700/50", children: code }, i, false, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 194,
            columnNumber: 17
          }, this)) }, void 0, false, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 192,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 181,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 font-bold text-slate-200", children: [
            /* @__PURE__ */ jsxDEV(Smartphone, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/security/Security2FASection.tsx",
              lineNumber: 201,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Ostatnie Bezpieczne Logowanie" }, void 0, false, {
              fileName: "/app/applet/src/components/security/Security2FASection.tsx",
              lineNumber: 202,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 200,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 leading-relaxed", children: user.lastLogin }, void 0, false, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 204,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "inline-block text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-semibold", children: "Zweryfikowano z 2FA TOTP" }, void 0, false, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 205,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 199,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/security/Security2FASection.tsx",
        lineNumber: 169,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/security/Security2FASection.tsx",
      lineNumber: 123,
      columnNumber: 7
    }, this),
    isWizardOpen && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-5", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-5 h-5 text-indigo-400" }, void 0, false, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 221,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: [
            "Kreator Konfiguracji 2FA (Krok ",
            wizardStep,
            " z 3)"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 222,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 220,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("button", { onClick: () => setIsWizardOpen(false), className: "text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 225,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 224,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/security/Security2FASection.tsx",
        lineNumber: 219,
        columnNumber: 13
      }, this),
      wizardStep === 1 && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 text-xs text-center", children: [
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300", children: "Otwórz aplikację Google Authenticator lub Microsoft Authenticator na swoim telefonie i zeskanuj poniższy kod QR:" }, void 0, false, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 232,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "w-44 h-44 mx-auto bg-white p-3 rounded-2xl shadow-inner flex flex-col items-center justify-center space-y-2 border-4 border-indigo-500", children: [
          /* @__PURE__ */ jsxDEV(QrCode, { className: "w-32 h-32 text-slate-900" }, void 0, false, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 238,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-slate-600 font-mono font-bold", children: "OmniSuite 2FA Key" }, void 0, false, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 239,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 237,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 bg-slate-800 rounded-xl text-slate-300", children: [
          "Lub wpisz ręcznie klucz sekretny: ",
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-indigo-300", children: user.twoFactorSecret }, void 0, false, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 243,
            columnNumber: 53
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 242,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setWizardStep(2),
            className: "w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg",
            children: "Przejdź do Weryfikacji Kodu"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 246,
            columnNumber: 17
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/security/Security2FASection.tsx",
        lineNumber: 231,
        columnNumber: 15
      }, this),
      wizardStep === 2 && /* @__PURE__ */ jsxDEV("form", { onSubmit: verifyWizardTotp, className: "space-y-4 text-xs", children: [
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300 text-center", children: "Wprowadź 6-cyfrowy kod weryfikacyjny wygenerowany obecnie w Twojej aplikacji Authenticator:" }, void 0, false, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 258,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-center font-semibold text-slate-300 mb-2", children: "Kod TOTP (6 cyfr):" }, void 0, false, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 263,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              maxLength: 6,
              required: true,
              value: totpInput,
              onChange: (e) => setTotpInput(e.target.value.replace(/\D/g, "")),
              placeholder: "123456",
              className: "w-full text-center text-2xl font-mono tracking-widest bg-slate-800 border border-slate-700 rounded-xl py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/security/Security2FASection.tsx",
              lineNumber: 264,
              columnNumber: 19
            },
            this
          ),
          codeError && /* @__PURE__ */ jsxDEV("p", { className: "text-rose-400 text-center mt-1 font-semibold", children: codeError }, void 0, false, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 273,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 262,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between gap-2 pt-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => setWizardStep(1),
              className: "px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold",
              children: "Wstecz"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/security/Security2FASection.tsx",
              lineNumber: 277,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "submit",
              className: "px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg",
              children: "Zweryfikuj Kod"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/security/Security2FASection.tsx",
              lineNumber: 284,
              columnNumber: 19
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 276,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/security/Security2FASection.tsx",
        lineNumber: 257,
        columnNumber: 15
      }, this),
      wizardStep === 3 && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 text-xs text-center", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40", children: /* @__PURE__ */ jsxDEV(Check, { className: "w-6 h-6" }, void 0, false, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 298,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 297,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("h4", { className: "text-sm font-bold text-white", children: "Kod Zweryfikowany Pomyślnie!" }, void 0, false, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 301,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300", children: "Poniżej znajdują się Twoje kody zapasowe. Zapisz je w bezpiecznym miejscu:" }, void 0, false, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 302,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-800 p-3 rounded-xl font-mono text-indigo-300 grid grid-cols-2 gap-1 text-[11px]", children: user.backupCodes.map((c, i) => /* @__PURE__ */ jsxDEV("span", { className: "bg-slate-900 p-1 rounded", children: c }, i, false, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 308,
          columnNumber: 21
        }, this)) }, void 0, false, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 306,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: finish2FASetup,
            className: "w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg",
            children: "Zakończ i Aktywuj 2FA"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 312,
            columnNumber: 17
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/security/Security2FASection.tsx",
        lineNumber: 296,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/security/Security2FASection.tsx",
      lineNumber: 217,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/security/Security2FASection.tsx",
      lineNumber: 216,
      columnNumber: 9
    }, this),
    isTestLoginOpen && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Lock, { className: "w-5 h-5 text-indigo-400" }, void 0, false, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 332,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Symulator Logowania z 2FA" }, void 0, false, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 333,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 331,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("button", { onClick: () => setIsTestLoginOpen(false), className: "text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 336,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 335,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/security/Security2FASection.tsx",
        lineNumber: 330,
        columnNumber: 13
      }, this),
      loginStep === "credentials" && /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSimulateCredentials, className: "space-y-3 text-xs", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 mb-1 font-semibold", children: "Adres E-mail:" }, void 0, false, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 343,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "email",
              readOnly: true,
              value: user.email,
              className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-300"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/security/Security2FASection.tsx",
              lineNumber: 344,
              columnNumber: 19
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 342,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 mb-1 font-semibold", children: "Hasło:" }, void 0, false, {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 353,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "password",
              required: true,
              value: testPassword,
              onChange: (e) => setTestPassword(e.target.value),
              className: "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/security/Security2FASection.tsx",
              lineNumber: 354,
              columnNumber: 19
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 352,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "submit",
            className: "w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg mt-2",
            children: "Dalej (Sprawdź Uwierzytelnienie)"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 363,
            columnNumber: 17
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/security/Security2FASection.tsx",
        lineNumber: 341,
        columnNumber: 15
      }, this),
      loginStep === "totp" && /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSimulateTotp, className: "space-y-3 text-xs text-center", children: [
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300", children: "Uwierzytelnienie dwuskładnikowe 2FA jest aktywne. Wpisz 6-cyfrowy kod TOTP z aplikacji Authenticator:" }, void 0, false, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 374,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "text",
            maxLength: 6,
            required: true,
            value: testTotp,
            onChange: (e) => setTestTotp(e.target.value.replace(/\D/g, "")),
            placeholder: "654321",
            className: "w-full text-center text-xl font-mono tracking-widest bg-slate-800 border border-slate-700 rounded-xl py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 378,
            columnNumber: 17
          },
          this
        ),
        loginError && /* @__PURE__ */ jsxDEV("p", { className: "text-rose-400 text-center font-semibold", children: loginError }, void 0, false, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 388,
          columnNumber: 32
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "submit",
            className: "w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg",
            children: "Zaloguj się z 2FA"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 390,
            columnNumber: 17
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/security/Security2FASection.tsx",
        lineNumber: 373,
        columnNumber: 15
      }, this),
      loginStep === "success" && /* @__PURE__ */ jsxDEV("div", { className: "text-center space-y-3 py-4 text-xs", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40", children: /* @__PURE__ */ jsxDEV(Check, { className: "w-6 h-6" }, void 0, false, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 402,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 401,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("h4", { className: "text-sm font-bold text-white", children: "Pomyślnie Zalogowano!" }, void 0, false, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 404,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300", children: "System zweryfikował Twoje tożsamość dwuskładnikowo. Sesja jest w pełni chroniona." }, void 0, false, {
          fileName: "/app/applet/src/components/security/Security2FASection.tsx",
          lineNumber: 405,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              setIsTestLoginOpen(false);
              setLoginStep("credentials");
              setTestTotp("");
            },
            className: "px-5 py-2 bg-indigo-600 text-white font-bold rounded-xl",
            children: "Zamknij Symulator"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/security/Security2FASection.tsx",
            lineNumber: 408,
            columnNumber: 17
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/security/Security2FASection.tsx",
        lineNumber: 400,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/security/Security2FASection.tsx",
      lineNumber: 328,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/security/Security2FASection.tsx",
      lineNumber: 327,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/security/Security2FASection.tsx",
    lineNumber: 100,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlY3VyaXR5MkZBU2VjdGlvbi50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIFNoaWVsZENoZWNrLCBcbiAgU2hpZWxkQWxlcnQsIFxuICBRckNvZGUsIFxuICBLZXlSb3VuZCwgXG4gIENvcHksIFxuICBDaGVjaywgXG4gIFNtYXJ0cGhvbmUsIFxuICBMb2NrLCBcbiAgVXNlckNoZWNrLCBcbiAgQWxlcnRDaXJjbGUsIFxuICBSZWZyZXNoQ3csXG4gIFhcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IFVzZXJQcm9maWxlLCBBY2Nlc3NpYmlsaXR5U2V0dGluZ3MgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5cbmludGVyZmFjZSBTZWN1cml0eTJGQVNlY3Rpb25Qcm9wcyB7XG4gIHVzZXI6IFVzZXJQcm9maWxlO1xuICBzZXRVc2VyOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxVc2VyUHJvZmlsZT4+O1xuICBhY2Nlc3NpYmlsaXR5OiBBY2Nlc3NpYmlsaXR5U2V0dGluZ3M7XG4gIG9uU2VuZE5vdGlmaWNhdGlvbjogKHRpdGxlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgdHlwZTogJ3NlY3VyaXR5JykgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IFNlY3VyaXR5MkZBU2VjdGlvbjogUmVhY3QuRkM8U2VjdXJpdHkyRkFTZWN0aW9uUHJvcHM+ID0gKHtcbiAgdXNlcixcbiAgc2V0VXNlcixcbiAgYWNjZXNzaWJpbGl0eSxcbiAgb25TZW5kTm90aWZpY2F0aW9uLFxufSkgPT4ge1xuICBjb25zdCBbaXNXaXphcmRPcGVuLCBzZXRJc1dpemFyZE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbd2l6YXJkU3RlcCwgc2V0V2l6YXJkU3RlcF0gPSB1c2VTdGF0ZTwxIHwgMiB8IDM+KDEpO1xuICBjb25zdCBbdG90cElucHV0LCBzZXRUb3RwSW5wdXRdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbY29kZUVycm9yLCBzZXRDb2RlRXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbY29waWVkQ29kZSwgc2V0Q29waWVkQ29kZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgLy8gTG9naW4gVGVzdCBTaW11bGF0b3IgU3RhdGVcbiAgY29uc3QgW2lzVGVzdExvZ2luT3Blbiwgc2V0SXNUZXN0TG9naW5PcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Rlc3RQYXNzd29yZCwgc2V0VGVzdFBhc3N3b3JkXSA9IHVzZVN0YXRlKCdoYXNsbzEyMycpO1xuICBjb25zdCBbdGVzdFRvdHAsIHNldFRlc3RUb3RwXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2xvZ2luU3RlcCwgc2V0TG9naW5TdGVwXSA9IHVzZVN0YXRlPCdjcmVkZW50aWFscycgfCAndG90cCcgfCAnc3VjY2Vzcyc+KCdjcmVkZW50aWFscycpO1xuICBjb25zdCBbbG9naW5FcnJvciwgc2V0TG9naW5FcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgY29uc3QgdG9nZ2xlMkZBID0gKCkgPT4ge1xuICAgIGlmICh1c2VyLmlzVHdvRmFjdG9yRW5hYmxlZCkge1xuICAgICAgc2V0VXNlcihwcmV2ID0+ICh7IC4uLnByZXYsIGlzVHdvRmFjdG9yRW5hYmxlZDogZmFsc2UgfSkpO1xuICAgICAgb25TZW5kTm90aWZpY2F0aW9uKCdCZXpwaWVjemXFhHN0d28nLCAnVXdpZXJ6eXRlbG5pZW5pZSBkd3Vza8WCYWRuaWtvd2UgMkZBIHpvc3RhxYJvIHd5xYLEhWN6b25lLicsICdzZWN1cml0eScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRJc1dpemFyZE9wZW4odHJ1ZSk7XG4gICAgICBzZXRXaXphcmRTdGVwKDEpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCB2ZXJpZnlXaXphcmRUb3RwID0gKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAodG90cElucHV0Lmxlbmd0aCAhPT0gNikge1xuICAgICAgc2V0Q29kZUVycm9yKCdLb2QgVE9UUCBtdXNpIHNrxYJhZGHEhyBzacSZIHogNiBjeWZyLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEFjY2VwdCA2IGRpZ2l0c1xuICAgIHNldENvZGVFcnJvcignJyk7XG4gICAgc2V0V2l6YXJkU3RlcCgzKTtcbiAgfTtcblxuICBjb25zdCBmaW5pc2gyRkFTZXR1cCA9ICgpID0+IHtcbiAgICBzZXRVc2VyKHByZXYgPT4gKHsgLi4ucHJldiwgaXNUd29GYWN0b3JFbmFibGVkOiB0cnVlIH0pKTtcbiAgICBzZXRJc1dpemFyZE9wZW4oZmFsc2UpO1xuICAgIG9uU2VuZE5vdGlmaWNhdGlvbignMkZBIEFrdHl3bmUnLCAnVXdpZXJ6eXRlbG5pZW5pZSBkd3Vza8WCYWRuaWtvd2UgMkZBIHpvc3RhxYJvIHBvbXnFm2xuaWUgc2tvbmZpZ3Vyb3dhbmUuJywgJ3NlY3VyaXR5Jyk7XG4gIH07XG5cbiAgY29uc3QgY29weUJhY2t1cENvZGVzID0gKCkgPT4ge1xuICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHVzZXIuYmFja3VwQ29kZXMuam9pbignXFxuJykpO1xuICAgIHNldENvcGllZENvZGUodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWRDb2RlKGZhbHNlKSwgMjAwMCk7XG4gIH07XG5cbiAgLy8gTG9naW4gU2ltdWxhdG9yIEhhbmRsZXJzXG4gIGNvbnN0IGhhbmRsZVNpbXVsYXRlQ3JlZGVudGlhbHMgPSAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh1c2VyLmlzVHdvRmFjdG9yRW5hYmxlZCkge1xuICAgICAgc2V0TG9naW5TdGVwKCd0b3RwJyk7XG4gICAgICBzZXRMb2dpbkVycm9yKCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0TG9naW5TdGVwKCdzdWNjZXNzJyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNpbXVsYXRlVG90cCA9IChlOiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHRlc3RUb3RwLmxlbmd0aCA9PT0gNikge1xuICAgICAgc2V0TG9naW5TdGVwKCdzdWNjZXNzJyk7XG4gICAgICBzZXRMb2dpbkVycm9yKCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0TG9naW5FcnJvcignV3Byb3dhZMW6IHByYXdpZMWCb3d5IDYtY3lmcm93eSBrb2QgeiBhcGxpa2FjamkgQXV0aGVudGljYXRvci4nKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgXG4gICAgICB7LyogSGVhZGVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdHJhY2tpbmctdGlnaHRcIj5TeXN0ZW0gQmV6cGllY3puZWdvIFV3aWVyenl0ZWxuaWFuaWEgRHd1c2vFgmFkbmlrb3dlZ28gKDJGQSk8L2gyPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj5aYWJlenBpZWN6IGtvbnRvIGZpcm1vd2Uga29kZW0gVE9UUCB6IGFwbGlrYWNqaSBHb29nbGUgQXV0aGVudGljYXRvciAvIE1pY3Jvc29mdCBBdXRoZW50aWNhdG9yPC9wPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNUZXN0TG9naW5PcGVuKHRydWUpfVxuICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLXhsIHRleHQteHMgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJvcmRlciB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgYWNjZXNzaWJpbGl0eS5oaWdoQ29udHJhc3RcbiAgICAgICAgICAgICAgPyAnYmcteWVsbG93LTQwMCB0ZXh0LWJsYWNrIGJvcmRlci15ZWxsb3ctMzAwIGZvbnQtYm9sZCdcbiAgICAgICAgICAgICAgOiAnYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTIwMCBib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgIH1gfVxuICAgICAgICA+XG4gICAgICAgICAgPFVzZXJDaGVjayBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgIDxzcGFuPlByemV0ZXN0dWogTG9nb3dhbmllIHogMkZBPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogTWFpbiAyRkEgU3RhdHVzIENhcmQgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YHAtNiByb3VuZGVkLTN4bCBib3JkZXIgc3BhY2UteS02ICR7XG4gICAgICAgIGFjY2Vzc2liaWxpdHkuaGlnaENvbnRyYXN0XG4gICAgICAgICAgPyAnYmctYmxhY2sgYm9yZGVyLXllbGxvdy00MDAgdGV4dC15ZWxsb3ctMzAwJ1xuICAgICAgICAgIDogdXNlci5pc1R3b0ZhY3RvckVuYWJsZWRcbiAgICAgICAgICAgID8gJ2JnLXNsYXRlLTkwMCBib3JkZXItZW1lcmFsZC01MDAvNDAgdGV4dC1zbGF0ZS0xMDAnXG4gICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAgYm9yZGVyLWFtYmVyLTUwMC80MCB0ZXh0LXNsYXRlLTEwMCdcbiAgICAgIH1gfT5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1zdGFydCBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItNlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdy0xNCBoLTE0IHJvdW5kZWQtMnhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZvbnQtYm9sZCB0ZXh0LTJ4bCAke1xuICAgICAgICAgICAgICB1c2VyLmlzVHdvRmFjdG9yRW5hYmxlZCA/ICdiZy1lbWVyYWxkLTUwMC8yMCB0ZXh0LWVtZXJhbGQtNDAwIGJvcmRlciBib3JkZXItZW1lcmFsZC01MDAvMzAnIDogJ2JnLWFtYmVyLTUwMC8yMCB0ZXh0LWFtYmVyLTQwMCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC8zMCdcbiAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAge3VzZXIuaXNUd29GYWN0b3JFbmFibGVkID8gPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctOCBoLThcIiAvPiA6IDxTaGllbGRBbGVydCBjbGFzc05hbWU9XCJ3LTggaC04XCIgLz59XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZFwiPk9jaHJvbmEgS29udGEgMkZBOiB7dXNlci5pc1R3b0ZhY3RvckVuYWJsZWQgPyAnQUtUWVdOQScgOiAnV1nFgcSEQ1pPTkEnfTwvaDM+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgcHgtMi41IHB5LTAuNSByb3VuZGVkLWZ1bGwgdGV4dC14cyBmb250LWJvbGQgJHtcbiAgICAgICAgICAgICAgICAgIHVzZXIuaXNUd29GYWN0b3JFbmFibGVkID8gJ2JnLWVtZXJhbGQtNTAwIHRleHQtYmxhY2snIDogJ2JnLWFtYmVyLTUwMCB0ZXh0LWJsYWNrJ1xuICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgIHt1c2VyLmlzVHdvRmFjdG9yRW5hYmxlZCA/ICcxMDAlIEJlenBpZWN6ZcWEc3R3YScgOiAnV3ltYWdhbmUgU2tvbmZpZ3Vyb3dhbmllJ31cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgIHt1c2VyLmlzVHdvRmFjdG9yRW5hYmxlZFxuICAgICAgICAgICAgICAgICAgPyAnVHdvamUga29udG8gd3ltYWdhIHBvZGFuaWEgaGFzxYJhIG9yYXogNi1jeWZyb3dlZ28ga29kdSBUT1RQIHByenkga2HFvGR5bSBub3d5bSBsb2dvd2FuaXUuJ1xuICAgICAgICAgICAgICAgICAgOiAnWmFsZWNhbXkgbmF0eWNobWlhc3Rvd2Ugd8WCxIVjemVuaWUgd2VyeWZpa2FjamkgZHd1ZXRhcG93ZWogdyBjZWx1IHphYmV6cGllY3plbmlhIGRhbnljaCBmaXJtb3d5Y2guJ31cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXt0b2dnbGUyRkF9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC01IHB5LTIuNSByb3VuZGVkLXhsIHRleHQteHMgZm9udC1ib2xkIHNoYWRvdy1sZyB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICB1c2VyLmlzVHdvRmFjdG9yRW5hYmxlZFxuICAgICAgICAgICAgICAgID8gJ2JnLXJvc2UtNjAwLzIwIGhvdmVyOmJnLXJvc2UtNjAwLzMwIHRleHQtcm9zZS0zMDAgYm9yZGVyIGJvcmRlci1yb3NlLTUwMC80MCdcbiAgICAgICAgICAgICAgICA6ICdiZy1lbWVyYWxkLTYwMCBob3ZlcjpiZy1lbWVyYWxkLTUwMCB0ZXh0LXdoaXRlIHNoYWRvdy1lbWVyYWxkLTkwMC80MCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt1c2VyLmlzVHdvRmFjdG9yRW5hYmxlZCA/ICdXecWCxIVjeiAyRkEnIDogJ1Nrb25maWd1cnVqIDJGQSBUZXJheid9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiAyRkEgRGV0YWlscyBHcmlkICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTMgZ2FwLTQgdGV4dC14c1wiPlxuICAgICAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IGJnLXNsYXRlLTgwMC82MCByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMC82MCBzcGFjZS15LTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZm9udC1ib2xkIHRleHQtc2xhdGUtMjAwXCI+XG4gICAgICAgICAgICAgIDxRckNvZGUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5BcGxpa2FjamEgQXV0aGVudGljYXRvcjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgIEtsdWN6IFRham55IFRPVFA6IDxjb2RlIGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMCBweC0yIHB5LTAuNSByb3VuZGVkIHRleHQtaW5kaWdvLTMwMCBmb250LW1vbm8gZm9udC1ib2xkXCI+e3VzZXIudHdvRmFjdG9yU2VjcmV0fTwvY29kZT5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IGJnLXNsYXRlLTgwMC82MCByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMC82MCBzcGFjZS15LTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTIwMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPEtleVJvdW5kIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPktvZHkgWmFwYXNvd2UgKDUgc3p0dWspPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtjb3B5QmFja3VwQ29kZXN9IGNsYXNzTmFtZT1cInRleHQtaW5kaWdvLTQwMCBob3Zlcjp1bmRlcmxpbmUgdGV4dC1bMTBweF0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICB7Y29waWVkQ29kZSA/IDxDaGVjayBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtZW1lcmFsZC00MDBcIiAvPiA6IDxDb3B5IGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPn1cbiAgICAgICAgICAgICAgICA8c3Bhbj57Y29waWVkQ29kZSA/ICdTa29waW93YW5vJyA6ICdLb3BpdWonfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzExcHhdIHRleHQtc2xhdGUtMzAwIGdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTEgcHQtMVwiPlxuICAgICAgICAgICAgICB7dXNlci5iYWNrdXBDb2Rlcy5tYXAoKGNvZGUsIGkpID0+IChcbiAgICAgICAgICAgICAgICA8c3BhbiBrZXk9e2l9IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMC84MCBweC0yIHB5LTAuNSByb3VuZGVkIHRleHQtY2VudGVyIGJvcmRlciBib3JkZXItc2xhdGUtNzAwLzUwXCI+e2NvZGV9PC9zcGFuPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgYmctc2xhdGUtODAwLzYwIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtNzAwLzYwIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmb250LWJvbGQgdGV4dC1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICAgICAgPFNtYXJ0cGhvbmUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+T3N0YXRuaWUgQmV6cGllY3puZSBMb2dvd2FuaWU8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGxlYWRpbmctcmVsYXhlZFwiPnt1c2VyLmxhc3RMb2dpbn08L3A+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbmxpbmUtYmxvY2sgdGV4dC1bMTBweF0gdGV4dC1lbWVyYWxkLTQwMCBiZy1lbWVyYWxkLTUwMC8xMCBweC0yIHB5LTAuNSByb3VuZGVkIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgWndlcnlmaWtvd2FubyB6IDJGQSBUT1RQXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogMkZBIFNldHVwIFdpemFyZCBNb2RhbCAqL31cbiAgICAgIHtpc1dpemFyZE9wZW4gJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgYmctYmxhY2svNzAgYmFja2Ryb3AtYmx1ci1zbSB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQtM3hsIHctZnVsbCBtYXgtdy1sZyBwLTYgc2hhZG93LTJ4bCBzcGFjZS15LTVcIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBwYi0zXCI+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPktyZWF0b3IgS29uZmlndXJhY2ppIDJGQSAoS3JvayB7d2l6YXJkU3RlcH0geiAzKTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRJc1dpemFyZE9wZW4oZmFsc2UpfSBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgPFggY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBTdGVwIDE6IFNjYW4gUVIgQ29kZSAqL31cbiAgICAgICAgICAgIHt3aXphcmRTdGVwID09PSAxICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTQgdGV4dC14cyB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICBPdHfDs3J6IGFwbGlrYWNqxJkgR29vZ2xlIEF1dGhlbnRpY2F0b3IgbHViIE1pY3Jvc29mdCBBdXRoZW50aWNhdG9yIG5hIHN3b2ltIHRlbGVmb25pZSBpIHplc2thbnVqIHBvbmnFvHN6eSBrb2QgUVI6XG4gICAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgICAgey8qIFNpbXVsYXRlZCBTVkcgUVIgQ29kZSAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctNDQgaC00NCBteC1hdXRvIGJnLXdoaXRlIHAtMyByb3VuZGVkLTJ4bCBzaGFkb3ctaW5uZXIgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc3BhY2UteS0yIGJvcmRlci00IGJvcmRlci1pbmRpZ28tNTAwXCI+XG4gICAgICAgICAgICAgICAgICA8UXJDb2RlIGNsYXNzTmFtZT1cInctMzIgaC0zMiB0ZXh0LXNsYXRlLTkwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtc2xhdGUtNjAwIGZvbnQtbW9ubyBmb250LWJvbGRcIj5PbW5pU3VpdGUgMkZBIEtleTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgYmctc2xhdGUtODAwIHJvdW5kZWQteGwgdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgIEx1YiB3cGlzeiByxJljem5pZSBrbHVjeiBzZWtyZXRueTogPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LWluZGlnby0zMDBcIj57dXNlci50d29GYWN0b3JTZWNyZXR9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0V2l6YXJkU3RlcCgyKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0yLjUgYmctaW5kaWdvLTYwMCBob3ZlcjpiZy1pbmRpZ28tNTAwIHRleHQtd2hpdGUgZm9udC1ib2xkIHJvdW5kZWQteGwgc2hhZG93LWxnXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBQcnplamTFuiBkbyBXZXJ5ZmlrYWNqaSBLb2R1XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgey8qIFN0ZXAgMjogVmVyaWZpY2F0aW9uIENvZGUgSW5wdXQgKi99XG4gICAgICAgICAgICB7d2l6YXJkU3RlcCA9PT0gMiAmJiAoXG4gICAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXt2ZXJpZnlXaXphcmRUb3RwfSBjbGFzc05hbWU9XCJzcGFjZS15LTQgdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICBXcHJvd2FkxbogNi1jeWZyb3d5IGtvZCB3ZXJ5ZmlrYWN5am55IHd5Z2VuZXJvd2FueSBvYmVjbmllIHcgVHdvamVqIGFwbGlrYWNqaSBBdXRoZW50aWNhdG9yOlxuICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1jZW50ZXIgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTMwMCBtYi0yXCI+S29kIFRPVFAgKDYgY3lmcik6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIG1heExlbmd0aD17Nn1cbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RvdHBJbnB1dH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0VG90cElucHV0KGUudGFyZ2V0LnZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJykpfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjEyMzQ1NlwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWNlbnRlciB0ZXh0LTJ4bCBmb250LW1vbm8gdHJhY2tpbmctd2lkZXN0IGJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLXhsIHB5LTMgdGV4dC13aGl0ZSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctaW5kaWdvLTUwMFwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAge2NvZGVFcnJvciAmJiA8cCBjbGFzc05hbWU9XCJ0ZXh0LXJvc2UtNDAwIHRleHQtY2VudGVyIG10LTEgZm9udC1zZW1pYm9sZFwiPntjb2RlRXJyb3J9PC9wPn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgcHQtMlwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0V2l6YXJkU3RlcCgxKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIGJnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTMwMCByb3VuZGVkLXhsIGZvbnQtc2VtaWJvbGRcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBXc3RlY3pcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNSBweS0yIGJnLWluZGlnby02MDAgaG92ZXI6YmctaW5kaWdvLTUwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCByb3VuZGVkLXhsIHNoYWRvdy1sZ1wiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIFp3ZXJ5ZmlrdWogS29kXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgey8qIFN0ZXAgMzogU3VjY2VzcyAmIEJhY2t1cCBDb2RlcyAqL31cbiAgICAgICAgICAgIHt3aXphcmRTdGVwID09PSAzICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTQgdGV4dC14cyB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMiBoLTEyIGJnLWVtZXJhbGQtNTAwLzIwIHRleHQtZW1lcmFsZC00MDAgcm91bmRlZC1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG14LWF1dG8gYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC80MFwiPlxuICAgICAgICAgICAgICAgICAgPENoZWNrIGNsYXNzTmFtZT1cInctNiBoLTZcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtd2hpdGVcIj5Lb2QgWndlcnlmaWtvd2FueSBQb215xZtsbmllITwvaDQ+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgIFBvbmnFvGVqIHpuYWpkdWrEhSBzacSZIFR3b2plIGtvZHkgemFwYXNvd2UuIFphcGlzeiBqZSB3IGJlenBpZWN6bnltIG1pZWpzY3U6XG4gICAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS04MDAgcC0zIHJvdW5kZWQteGwgZm9udC1tb25vIHRleHQtaW5kaWdvLTMwMCBncmlkIGdyaWQtY29scy0yIGdhcC0xIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICAgICAgICB7dXNlci5iYWNrdXBDb2Rlcy5tYXAoKGMsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4ga2V5PXtpfSBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgcC0xIHJvdW5kZWRcIj57Y308L3NwYW4+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2ZpbmlzaDJGQVNldHVwfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTIuNSBiZy1lbWVyYWxkLTYwMCBob3ZlcjpiZy1lbWVyYWxkLTUwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCByb3VuZGVkLXhsIHNoYWRvdy1sZ1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgWmFrb8WEY3ogaSBBa3R5d3VqIDJGQVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7LyogTG9naW4gVGVzdCBTaW11bGF0b3IgTW9kYWwgKi99XG4gICAgICB7aXNUZXN0TG9naW5PcGVuICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIGJnLWJsYWNrLzcwIGJhY2tkcm9wLWJsdXItc20gei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLTN4bCB3LWZ1bGwgbWF4LXctbWQgcC02IHNoYWRvdy0yeGwgc3BhY2UteS00XCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItM1wiPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPExvY2sgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlN5bXVsYXRvciBMb2dvd2FuaWEgeiAyRkE8L3NwYW4+XG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0SXNUZXN0TG9naW5PcGVuKGZhbHNlKX0gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7bG9naW5TdGVwID09PSAnY3JlZGVudGlhbHMnICYmIChcbiAgICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVNpbXVsYXRlQ3JlZGVudGlhbHN9IGNsYXNzTmFtZT1cInNwYWNlLXktMyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTMwMCBtYi0xIGZvbnQtc2VtaWJvbGRcIj5BZHJlcyBFLW1haWw6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgICAgICByZWFkT25seVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dXNlci5lbWFpbH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLXhsIHB4LTMgcHktMiB0ZXh0LXNsYXRlLTMwMFwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTMwMCBtYi0xIGZvbnQtc2VtaWJvbGRcIj5IYXPFgm86PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGVzdFBhc3N3b3JkfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRUZXN0UGFzc3dvcmQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtODAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQteGwgcHgtMyBweS0yIHRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTIuNSBiZy1pbmRpZ28tNjAwIGhvdmVyOmJnLWluZGlnby01MDAgdGV4dC13aGl0ZSBmb250LWJvbGQgcm91bmRlZC14bCBzaGFkb3ctbGcgbXQtMlwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgRGFsZWogKFNwcmF3ZMW6IFV3aWVyenl0ZWxuaWVuaWUpXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIHtsb2dpblN0ZXAgPT09ICd0b3RwJyAmJiAoXG4gICAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTaW11bGF0ZVRvdHB9IGNsYXNzTmFtZT1cInNwYWNlLXktMyB0ZXh0LXhzIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgIFV3aWVyenl0ZWxuaWVuaWUgZHd1c2vFgmFkbmlrb3dlIDJGQSBqZXN0IGFrdHl3bmUuIFdwaXN6IDYtY3lmcm93eSBrb2QgVE9UUCB6IGFwbGlrYWNqaSBBdXRoZW50aWNhdG9yOlxuICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoPXs2fVxuICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXt0ZXN0VG90cH1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldFRlc3RUb3RwKGUudGFyZ2V0LnZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJykpfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCI2NTQzMjFcIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtY2VudGVyIHRleHQteGwgZm9udC1tb25vIHRyYWNraW5nLXdpZGVzdCBiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC14bCBweS0yLjUgdGV4dC13aGl0ZSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctaW5kaWdvLTUwMFwiXG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIHtsb2dpbkVycm9yICYmIDxwIGNsYXNzTmFtZT1cInRleHQtcm9zZS00MDAgdGV4dC1jZW50ZXIgZm9udC1zZW1pYm9sZFwiPntsb2dpbkVycm9yfTwvcD59XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0yLjUgYmctZW1lcmFsZC02MDAgaG92ZXI6YmctZW1lcmFsZC01MDAgdGV4dC13aGl0ZSBmb250LWJvbGQgcm91bmRlZC14bCBzaGFkb3ctbGdcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIFphbG9ndWogc2nEmSB6IDJGQVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICB7bG9naW5TdGVwID09PSAnc3VjY2VzcycgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHNwYWNlLXktMyBweS00IHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTIgaC0xMiBiZy1lbWVyYWxkLTUwMC8yMCB0ZXh0LWVtZXJhbGQtNDAwIHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBteC1hdXRvIGJvcmRlciBib3JkZXItZW1lcmFsZC01MDAvNDBcIj5cbiAgICAgICAgICAgICAgICAgIDxDaGVjayBjbGFzc05hbWU9XCJ3LTYgaC02XCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC13aGl0ZVwiPlBvbXnFm2xuaWUgWmFsb2dvd2FubyE8L2g0PlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICBTeXN0ZW0gendlcnlmaWtvd2HFgiBUd29qZSB0b8W8c2Ftb8WbxIcgZHd1c2vFgmFkbmlrb3dvLiBTZXNqYSBqZXN0IHcgcGXFgm5pIGNocm9uaW9uYS5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRJc1Rlc3RMb2dpbk9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBzZXRMb2dpblN0ZXAoJ2NyZWRlbnRpYWxzJyk7XG4gICAgICAgICAgICAgICAgICAgIHNldFRlc3RUb3RwKCcnKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC01IHB5LTIgYmctaW5kaWdvLTYwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCByb3VuZGVkLXhsXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBaYW1rbmlqIFN5bXVsYXRvclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUF3R1U7QUF4R1YsU0FBZ0IsZ0JBQWdCO0FBQ2hDO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFHQTtBQUFBLE9BQ0s7QUFVQSxhQUFNLHFCQUF3RCxDQUFDO0FBQUEsRUFDcEU7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFNO0FBQ0osUUFBTSxDQUFDLGNBQWMsZUFBZSxJQUFJLFNBQVMsS0FBSztBQUN0RCxRQUFNLENBQUMsWUFBWSxhQUFhLElBQUksU0FBb0IsQ0FBQztBQUN6RCxRQUFNLENBQUMsV0FBVyxZQUFZLElBQUksU0FBUyxFQUFFO0FBQzdDLFFBQU0sQ0FBQyxXQUFXLFlBQVksSUFBSSxTQUFTLEVBQUU7QUFDN0MsUUFBTSxDQUFDLFlBQVksYUFBYSxJQUFJLFNBQVMsS0FBSztBQUdsRCxRQUFNLENBQUMsaUJBQWlCLGtCQUFrQixJQUFJLFNBQVMsS0FBSztBQUM1RCxRQUFNLENBQUMsY0FBYyxlQUFlLElBQUksU0FBUyxVQUFVO0FBQzNELFFBQU0sQ0FBQyxVQUFVLFdBQVcsSUFBSSxTQUFTLEVBQUU7QUFDM0MsUUFBTSxDQUFDLFdBQVcsWUFBWSxJQUFJLFNBQTZDLGFBQWE7QUFDNUYsUUFBTSxDQUFDLFlBQVksYUFBYSxJQUFJLFNBQVMsRUFBRTtBQUUvQyxRQUFNLFlBQVksTUFBTTtBQUN0QixRQUFJLEtBQUssb0JBQW9CO0FBQzNCLGNBQVEsV0FBUyxFQUFFLEdBQUcsTUFBTSxvQkFBb0IsTUFB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