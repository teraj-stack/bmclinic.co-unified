import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getCmsState } from '@/lib/cmsStore';

export const dynamic = 'force-dynamic';

function startOfWeek() {
  const now = new Date();
  const day = now.getDay() === 0 ? 7 : now.getDay();
  now.setHours(0, 0, 0, 0);
  now.setDate(now.getDate() - day + 1);
  return now;
}

export default async function AdminDashboard() {
  const cms = getCmsState();
  let visitsThisWeek = cms.visits.filter((v) => v.status !== 'CANCELLED').length;
  let paidGrosze = cms.orders
    .filter((o) => o.status === 'PAID')
    .reduce((acc, o) => acc + o.amountGrosze, 0);
  let pendingOrders = cms.orders.filter((o) => o.status === 'PENDING').length;

  if (process.env.DATABASE_URL) {
    try {
      const [dbVisits, dbRevenue, dbPatients, dbPending] = await Promise.all([
        prisma.visit.count({
          where: { startTime: { gte: startOfWeek() }, status: { in: ['CONFIRMED', 'COMPLETED'] } },
        }),
        prisma.order.aggregate({ where: { status: 'PAID' }, _sum: { amountGrosze: true } }),
        prisma.patient.count(),
        prisma.order.count({ where: { status: 'PENDING' } }),
      ]);
      if (dbVisits > 0 || dbPatients > 0) {
        visitsThisWeek = dbVisits;
        paidGrosze = dbRevenue._sum.amountGrosze ?? 0;
        pendingOrders = dbPending;
      }
    } catch {
      // Fallback to CMS state when DB is unreachable
    }
  }

  const revenueZl = (paidGrosze / 100).toFixed(2);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Pulpit Administratora & CMS</h1>
          <p className="text-sm opacity-70">
            Zarządzaj usługami, zamówieniami oraz edytuj treści strony na żywo.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/?edit=1"
            className="btn-gold rounded-xl px-4 py-2.5 text-sm font-semibold text-black"
          >
            Edytuj teksty na stronie głównej (Live)
          </Link>
          <Link
            href="/?cms=1"
            className="metal-chrome-edge rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium"
          >
            Otwórz Szufladę CMS & CLI
          </Link>
          <a
            href="/holding"
            className="metal-chrome-edge rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium"
          >
            Panel Holding (SEO / AEO / Skaner) ↗
          </a>
          <a
            href="/vault/"
            className="metal-chrome-edge rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium"
          >
            Pełny Chronos Vault (/vault/) ↗
          </a>
          <Link
            href="/taskkill/index.html?map=scalenie-3016"
            prefetch={false}
            className="metal-chrome-edge rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium"
          >
            Drzewo Raportu Wdrożenia ↗
          </Link>
          <a
            href="/superagent"
            className="metal-chrome-edge rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium"
          >
            Superagent AI Safety ↗
          </a>
          <a
            href="/aether/"
            className="metal-chrome-edge rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium"
          >
            Aether Haptyka (/aether/) ↗
          </a>
          <a
            href="/spatial-3d/"
            className="metal-chrome-edge rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium"
          >
            Spatial 3D Studio (/spatial-3d/) ↗
          </a>
          <a
            href="/parallax-3d/"
            className="metal-chrome-edge rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium"
          >
            Parallax 3D Zdjęcia (/parallax-3d/) ↗
          </a>
          <Link
            href="/admin/magazyn"
            className="metal-chrome-edge rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium"
          >
            Magazyn &amp; Sklep CML ↗
          </Link>
          <Link
            href="/admin/bezpieczenstwo"
            className="metal-chrome-edge rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium"
          >
            2FA &amp; Raporty Kliniki ↗
          </Link>
          <a
            href="/cml-wilanow/"
            className="metal-chrome-edge rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium"
          >
            Proktologia 3D (/cml-wilanow/) ↗
          </a>
          <a
            href="/ai-studio-app/"
            className="metal-chrome-edge rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium"
          >
            AI Studio (/ai-studio-app/) ↗
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Wizyty w tym tygodniu" value={visitsThisWeek} />
        <StatCard label="Przychód (opłacone)" value={`${revenueZl} zł`} />
        <StatCard label="Liczba usług w katalogu" value={cms.services.length} />
        <StatCard label="Oczekujące płatności" value={pendingOrders} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glass-card p-5">
      <p className="text-sm opacity-70">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
