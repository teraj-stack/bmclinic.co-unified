'use client';

import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const panels: Record<string, { href: string; label: string }> = {
  ADMIN: { href: '/admin', label: 'Panel administratora' },
  DOCTOR: { href: '/lekarz', label: 'Panel lekarza' },
  PATIENT: { href: '/pacjent', label: 'Strefa pacjenta' },
};

export default function LogowaniePage() {
  const { data: session, status: sessionStatus } = useSession();
  const [email, setEmail] = useState('');
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  useEffect(() => {
    let active = true;
    getProviders()
      .then((providers) => { if (active) setEnabled(Boolean(providers?.email)); })
      .catch(() => { if (active) setEnabled(false); });
    return () => { active = false; };
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    try {
      const result = await signIn('email', { email: email.trim(), callbackUrl: '/logowanie', redirect: false });
      setStatus(result?.ok && !result.error ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const panel = session?.user ? panels[session.user.role] : undefined;
  return (
    <main className="mx-auto max-w-xl space-y-6 px-4 py-14">
      <h1 className="font-[family-name:var(--font-fraunces)] text-3xl font-light">
        Logowanie do BM Clinic
      </h1>
      {session?.user ? (
        <div className="glass-card space-y-4 rounded-2xl border p-6">
          <p>Zalogowano jako {session.user.email}</p>
          <div className="flex flex-wrap gap-3">
            {panel && <Link href={panel.href} className="btn-gold rounded-xl px-4 py-2">{panel.label}</Link>}
            {session.user.role === 'ADMIN' && (
              <Link href="/?edit=1" className="rounded-xl border px-4 py-2">Edytuj stronę</Link>
            )}
            <button type="button" onClick={() => signOut({ callbackUrl: '/logowanie' })}
              className="rounded-xl border px-4 py-2">
              Wyloguj się
            </button>
          </div>
        </div>
      ) : sessionStatus === 'loading' || enabled === null ? (
        <p role="status">Sprawdzanie dostępności logowania…</p>
      ) : !enabled ? (
        <p role="status">Logowanie e-mailem jest niedostępne w tym środowisku.</p>
      ) : (
        <form onSubmit={submit} className="glass-card space-y-4 rounded-2xl border p-6">
          <label htmlFor="login-email" className="block text-sm font-medium">Adres e-mail</label>
          <input id="login-email" type="email" autoComplete="email" required value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border bg-transparent p-3 text-sm" />
          <button type="submit" disabled={status === 'loading'}
            className="btn-gold w-full rounded-xl px-4 py-3 text-sm font-semibold">
            {status === 'loading' ? 'Wysyłanie…' : 'Wyślij link do logowania'}
          </button>
          {status === 'sent' && <p role="status">Sprawdź skrzynkę pocztową.</p>}
          {status === 'error' && <p role="alert">Wysyłka linku nie powiodła się. Spróbuj ponownie.</p>}
        </form>
      )}
    </main>
  );
}
