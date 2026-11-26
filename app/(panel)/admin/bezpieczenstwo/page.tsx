'use client';

import { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  Copy,
  Check,
  Download,
  Lock,
  FileSpreadsheet,
} from 'lucide-react';

const BACKUP_CODES = [
  'BM-8492-A1',
  'BM-3910-C4',
  'BM-7721-F9',
  'BM-1048-K2',
  'BM-6539-M7',
  'BM-9284-P3',
];

export default function AdminSecurityReportsPage() {
  const [twoFaEnabled, setTwoFaEnabled] = useState(false);
  const [totpInput, setTotpInput] = useState('');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [testCode, setTestCode] = useState('');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const handleEnable2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(totpInput.trim())) {
      setStatusMsg('Wpisz 6-cyfrowy kod TOTP (np. 123456), aby aktywować 2FA.');
      return;
    }
    setTwoFaEnabled(true);
    setStatusMsg('Uwierzytelnianie dwuskładnikowe 2FA zostało aktywowane.');
    setTotpInput('');
  };

  const copyBackupCodes = async () => {
    try {
      await navigator.clipboard.writeText(BACKUP_CODES.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setStatusMsg('Skopiuj kody ręcznie z listy.');
    }
  };

  const handleTestVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{6}$/.test(testCode.trim()) || BACKUP_CODES.includes(testCode.trim())) {
      setTestResult('Weryfikacja TOTP przeszła pomyślnie.');
    } else {
      setTestResult('Nieprawidłowy kod — wymagane 6 cyfr TOTP lub kod zapasowy.');
    }
  };

  const downloadInventoryReport = async (format: 'json' | 'csv') => {
    setExporting(true);
    try {
      const res = await fetch('/api/shop/inventory');
      const data = await res.json();
      const rows = Array.isArray(data.products) ? data.products : [];
      let content = '';
      let mime = 'application/json;charset=utf-8';
      let ext = 'json';

      if (format === 'csv') {
        const header = 'SKU,Nazwa,Kategoria,Cena_PLN,Stan\n';
        const body = rows
          .map(
            (r: { sku: string; name: string; categoryLabel: string; price: number; stock: number }) =>
              `"${r.sku}","${String(r.name).replace(/"/g, '""')}","${r.categoryLabel}",${r.price},${r.stock}`
          )
          .join('\n');
        content = header + body;
        mime = 'text/csv;charset=utf-8';
        ext = 'csv';
      } else {
        content = JSON.stringify(data, null, 2);
      }

      const blob = new Blob([content], { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bm-clinic-raport-magazynu.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Bezpieczeństwo 2FA &amp; Raporty Kliniki</h1>
        <p className="text-sm opacity-70">
          Elementy zintegrowane z panelu AI Studio (`:3024`): konfiguracja 2FA TOTP, kody zapasowe oraz eksport raportów magazynu.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 2FA Setup */}
        <section className="glass-card space-y-4 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              {twoFaEnabled ? (
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              ) : (
                <ShieldAlert className="h-5 w-5 text-amber-400" />
              )}
              Uwierzytelnianie 2FA (TOTP)
            </h2>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                twoFaEnabled
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-amber-500/20 text-amber-300'
              }`}
            >
              {twoFaEnabled ? 'AKTYWNE' : 'WYŁĄCZONE'}
            </span>
          </div>

          <form onSubmit={handleEnable2FA} className="space-y-3">
            <label className="block text-xs opacity-75">
              Kod z aplikacji Authenticator (6 cyfr)
            </label>
            <div className="flex gap-2">
              <input
                value={totpInput}
                onChange={(e) => setTotpInput(e.target.value)}
                maxLength={6}
                placeholder="123456"
                className="w-40 rounded-xl border border-white/15 bg-black/30 px-3 py-2 font-mono text-sm"
              />
              <button
                type="submit"
                className="btn-gold rounded-xl px-4 py-2 text-xs font-semibold text-black"
              >
                Aktywuj 2FA
              </button>
              {twoFaEnabled && (
                <button
                  type="button"
                  onClick={() => {
                    setTwoFaEnabled(false);
                    setStatusMsg('2FA wyłączone.');
                  }}
                  className="rounded-xl border border-red-400/40 px-3 py-2 text-xs text-red-300"
                >
                  Wyłącz
                </button>
              )}
            </div>
            {statusMsg && <div className="text-xs text-amber-300">{statusMsg}</div>}
          </form>

          <div className="border-t border-white/10 pt-4">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <KeyRound className="h-3.5 w-3.5 text-amber-400" />
                Kody zapasowe
              </span>
              <button
                type="button"
                onClick={() => void copyBackupCodes()}
                className="inline-flex items-center gap-1 rounded-lg border border-white/15 px-2.5 py-1 text-[11px]"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                {copied ? 'Skopiowano' : 'Kopiuj'}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 font-mono text-xs">
              {BACKUP_CODES.map((code) => (
                <div key={code} className="rounded-lg bg-black/30 px-2.5 py-1.5 text-center">
                  {code}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Login test + Reports */}
        <section className="space-y-6">
          <div className="glass-card space-y-3 rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Lock className="h-5 w-5 text-amber-400" />
              Symulator weryfikacji 2FA
            </h2>
            <form onSubmit={handleTestVerification} className="flex gap-2">
              <input
                value={testCode}
                onChange={(e) => setTestCode(e.target.value)}
                placeholder="Kod TOTP lub kod zapasowy"
                className="flex-1 rounded-xl border border-white/15 bg-black/30 px-3 py-2 font-mono text-xs"
              />
              <button
                type="submit"
                className="metal-chrome-edge rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold"
              >
                Sprawdź kod
              </button>
            </form>
            {testResult && <div className="text-xs text-emerald-300">{testResult}</div>}
          </div>

          <div className="glass-card space-y-3 rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <FileSpreadsheet className="h-5 w-5 text-amber-400" />
              Eksport raportów magazynu i SKU
            </h2>
            <p className="text-xs opacity-70">
              Pobierz aktualny wykaz produktów, cen i stanów magazynowych w formacie CSV lub JSON.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={exporting}
                onClick={() => void downloadInventoryReport('csv')}
                className="btn-gold inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-black"
              >
                <Download className="h-3.5 w-3.5" />
                Pobierz raport CSV
              </button>
              <button
                type="button"
                disabled={exporting}
                onClick={() => void downloadInventoryReport('json')}
                className="metal-chrome-edge inline-flex items-center gap-1.5 rounded-xl bg-white/5 px-4 py-2 text-xs font-medium"
              >
                <Download className="h-3.5 w-3.5" />
                Pobierz JSON
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
