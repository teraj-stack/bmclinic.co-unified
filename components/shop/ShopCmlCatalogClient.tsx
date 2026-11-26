'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Package, Search, Boxes, AlertCircle, ShoppingBag } from 'lucide-react';
import type { ShopInventoryProduct } from '@/lib/shopInventoryStore';
import { useCart } from '@/components/cart/CartProvider';

interface Props {
  initialProducts: ShopInventoryProduct[];
}

const CATEGORIES = [
  { id: 'all', label: 'Wszystkie' },
  { id: 'services', label: 'E-Konsultacje' },
  { id: 'packages', label: 'Pakiety Zabiegowe' },
  { id: 'post_op', label: 'Po Zabiegach' },
  { id: 'hygiene', label: 'Higiena' },
  { id: 'supplements', label: 'Suplementy & Błonnik' },
];

export default function ShopCmlCatalogClient({ initialProducts }: Props) {
  const [products] = useState<ShopInventoryProduct[]>(initialProducts);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const { addItem } = useCart();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const catOk = category === 'all' || p.category === category;
      const qOk =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [products, category, search]);

  const handleAdd = (p: ShopInventoryProduct) => {
    if (p.stock <= 0) return;
    addItem({
      serviceId: p.id,
      name: `${p.name} (${p.sku})`,
      priceGrosze: p.price * 100,
    });
    setJustAddedId(p.id);
    setTimeout(() => setJustAddedId((cur) => (cur === p.id ? null : cur)), 1800);
  };

  return (
    <section className="space-y-6 pt-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-[0.16em] text-amber-500 uppercase">
            CML Wilanów · Apteczka &amp; Magazyn Produktów
          </span>
          <h2 className="mt-1 font-[family-name:var(--font-fraunces)] text-2xl font-bold text-slate-900 dark:text-white">
            Preparaty Pooperacyjne, Błonnik &amp; Pakiety CML ({filtered.length})
          </h2>
        </div>

        <Link
          href="/admin/magazyn"
          className="inline-flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-500 transition hover:bg-amber-500/20"
        >
          <Boxes className="h-4 w-4" />
          Zarządzaj magazynem SKU ↗
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                category === c.id
                  ? 'bg-amber-500 text-slate-950'
                  : 'border border-slate-300 bg-white text-slate-700 hover:border-amber-500/50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Szukaj nazwy lub SKU..."
            className="w-full rounded-xl border border-slate-300 bg-white py-2 pr-3 pl-8 text-xs text-slate-900 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Products grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => {
          const isLow = item.stock > 0 && item.stock <= 10;
          const isOut = item.stock <= 0;

          return (
            <article
              key={item.id}
              className="glass-card flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/90"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-semibold text-slate-400">
                    {item.sku}
                  </span>
                  {item.badge && (
                    <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold text-amber-500">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-2 text-base font-bold leading-snug text-slate-900 dark:text-white">
                  {item.name}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>

                <div className="mt-3 rounded-lg border border-slate-200/70 bg-slate-50 p-2.5 text-[11px] leading-relaxed text-slate-600 dark:border-slate-700/70 dark:bg-slate-950/60 dark:text-slate-300">
                  {item.medicalNote}
                </div>
              </div>

              <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
                <div className="mb-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                      {item.price} zł
                    </span>
                    {item.originalPrice && (
                      <span className="ml-2 text-xs text-slate-400 line-through">
                        {item.originalPrice} zł
                      </span>
                    )}
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold ${
                      isOut
                        ? 'bg-red-500/15 text-red-400'
                        : isLow
                          ? 'bg-amber-500/15 text-amber-400'
                          : 'bg-emerald-500/15 text-emerald-400'
                    }`}
                  >
                    {isLow ? <AlertCircle className="h-3 w-3" /> : <Package className="h-3 w-3" />}
                    {isOut ? 'Brak w magazynie' : `Stan: ${item.stock} szt.`}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={isOut}
                  onClick={() => handleAdd(item)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  {justAddedId === item.id ? 'Dodano do koszyka ✓' : 'Dodaj do koszyka'}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
