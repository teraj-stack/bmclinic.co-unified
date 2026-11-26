'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Boxes,
  Plus,
  Minus,
  Trash2,
  Edit2,
  Save,
  X,
  RefreshCw,
  AlertTriangle,
  Search,
} from 'lucide-react';
import type {
  ShopCategory,
  ShopInventoryProduct,
  ShopInventorySummary,
} from '@/lib/shopInventoryStore';

interface Props {
  initialProducts: ShopInventoryProduct[];
  initialSummary: ShopInventorySummary;
}

export default function InventoryManagerClient({ initialProducts, initialSummary }: Props) {
  const [products, setProducts] = useState<ShopInventoryProduct[]>(initialProducts);
  const [summary, setSummary] = useState<ShopInventorySummary>(initialSummary);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out'>('all');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [editing, setEditing] = useState<ShopInventoryProduct | null>(null);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState({
    name: '',
    sku: '',
    category: 'post_op' as ShopCategory,
    price: 99,
    stock: 25,
    description: '',
    medicalNote: 'Skonsultowane z zespołem chirurgicznym CML.',
    badge: 'Nowość',
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQ =
        !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
      const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
      const matchesStock =
        stockFilter === 'all' ||
        (stockFilter === 'low' && p.stock > 0 && p.stock <= 10) ||
        (stockFilter === 'out' && p.stock === 0);
      return matchesQ && matchesCat && matchesStock;
    });
  }, [products, search, categoryFilter, stockFilter]);

  const applyUpdate = async (patch: Partial<ShopInventoryProduct> & { id: string }) => {
    setBusyId(patch.id);
    setError(null);
    try {
      const res = await fetch('/api/shop/inventory', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setProducts(data.products);
      setSummary(data.summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Błąd zapisu');
    } finally {
      setBusyId(null);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.name.trim()) return;
    setError(null);
    try {
      const res = await fetch('/api/shop/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setProducts(data.products);
      setSummary(data.summary);
      setAdding(false);
      setDraft({
        name: '',
        sku: '',
        category: 'post_op',
        price: 99,
        stock: 25,
        description: '',
        medicalNote: 'Skonsultowane z zespołem chirurgicznym CML.',
        badge: 'Nowość',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Błąd dodawania SKU');
    }
  };

  const handleDelete = async (id: string) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/shop/inventory?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setProducts(data.products);
      setSummary(data.summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Błąd usuwania');
    } finally {
      setBusyId(null);
    }
  };

  const handleReset = async () => {
    const res = await fetch('/api/shop/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reset' }),
    });
    const data = await res.json();
    if (res.ok) {
      setProducts(data.products);
      setSummary(data.summary);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold">
            <Boxes className="h-6 w-6 text-amber-400" />
            Magazyn &amp; Zarządzanie Sklepem CML
          </h1>
          <p className="text-sm opacity-70">
            Zintegrowany z `/sklep` (z `:3023` Proktologia Wilanów) — trwały zapis w `shop-inventory.json`.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/sklep"
            className="metal-chrome-edge rounded-xl bg-white/5 px-3.5 py-2 text-xs font-medium"
          >
            Podgląd sklepu (/sklep) ↗
          </Link>
          <button
            type="button"
            onClick={() => setAdding((v) => !v)}
            className="btn-gold inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-black"
          >
            <Plus className="h-3.5 w-3.5" />
            Dodaj produkt SKU
          </button>
          <button
            type="button"
            onClick={() => void handleReset()}
            className="metal-chrome-edge inline-flex items-center gap-1.5 rounded-xl bg-white/5 px-3.5 py-2 text-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset domyślny
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="glass-card rounded-xl p-4">
          <div className="text-xs opacity-65">Pozycje SKU</div>
          <div className="mt-1 text-2xl font-bold">{summary.totalSku}</div>
          <div className="text-xs opacity-60">Łącznie {summary.totalItems} szt.</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="text-xs opacity-65">Wartość magazynu</div>
          <div className="mt-1 text-2xl font-bold">{summary.totalValuePln.toLocaleString('pl-PL')} zł</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="text-xs opacity-65">Niski stan (&le; 10 szt.)</div>
          <div className="mt-1 text-2xl font-bold text-amber-400">{summary.lowStockCount}</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="text-xs opacity-65">Braki magazynowe (0)</div>
          <div className="mt-1 text-2xl font-bold text-red-400">{summary.outOfStockCount}</div>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-400/40 bg-red-950/40 p-3 text-xs text-red-200">
          {error}
        </div>
      )}

      {adding && (
        <form onSubmit={handleCreate} className="glass-card space-y-3 rounded-2xl p-5">
          <div className="text-sm font-semibold">Nowy produkt lub pakiet medyczny</div>
          <div className="grid gap-3 sm:grid-cols-4">
            <input
              required
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              placeholder="Nazwa produktu..."
              className="rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-xs sm:col-span-2"
            />
            <input
              value={draft.sku}
              onChange={(e) => setDraft({ ...draft, sku: e.target.value })}
              placeholder="SKU (np. CML-NEW-10)"
              className="rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-xs"
            />
            <select
              value={draft.category}
              onChange={(e) => setDraft({ ...draft, category: e.target.value as ShopCategory })}
              className="rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-xs"
            >
              <option value="post_op">Preparaty Po Zabiegach</option>
              <option value="hygiene">Higiena &amp; Pielęgnacja</option>
              <option value="supplements">Suplementy &amp; Błonnik</option>
              <option value="packages">Pakiety Zabiegowe</option>
              <option value="services">Usługi &amp; E-Konsultacje</option>
            </select>
            <input
              type="number"
              min={0}
              value={draft.price}
              onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
              placeholder="Cena PLN"
              className="rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-xs"
            />
            <input
              type="number"
              min={0}
              value={draft.stock}
              onChange={(e) => setDraft({ ...draft, stock: Number(e.target.value) })}
              placeholder="Stan początkowy"
              className="rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-xs"
            />
            <input
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              placeholder="Opis produktu..."
              className="rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-xs sm:col-span-2"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="btn-gold rounded-lg px-4 py-2 text-xs font-semibold text-black"
            >
              Zapisz do magazynu
            </button>
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="rounded-lg border border-white/15 px-4 py-2 text-xs"
            >
              Anuluj
            </button>
          </div>
        </form>
      )}

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 opacity-50" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Szukaj po nazwie lub SKU..."
            className="w-full rounded-xl border border-white/15 bg-black/25 py-2 pr-3 pl-8 text-xs"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-xl border border-white/15 bg-black/25 px-3 py-2 text-xs"
        >
          <option value="all">Wszystkie kategorie</option>
          <option value="services">E-Konsultacje</option>
          <option value="packages">Pakiety Zabiegowe</option>
          <option value="post_op">Preparaty Po Zabiegach</option>
          <option value="hygiene">Higiena</option>
          <option value="supplements">Suplementy</option>
        </select>
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value as 'all' | 'low' | 'out')}
          className="rounded-xl border border-white/15 bg-black/25 px-3 py-2 text-xs"
        >
          <option value="all">Wszystkie stany</option>
          <option value="low">Niski stan (&le; 10)</option>
          <option value="out">Braki (0)</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/10 bg-white/5 uppercase opacity-70">
            <tr>
              <th className="p-3">SKU / Produkt</th>
              <th className="p-3">Kategoria</th>
              <th className="p-3">Cena</th>
              <th className="p-3">Stan magazynowy</th>
              <th className="p-3 text-right">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-3">
                  <div className="font-mono text-[10px] opacity-60">{p.sku}</div>
                  {editing?.id === p.id ? (
                    <input
                      value={editing.name}
                      onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                      className="mt-1 w-full rounded border border-amber-400/50 bg-black/40 px-2 py-1 text-xs"
                    />
                  ) : (
                    <div className="font-semibold">{p.name}</div>
                  )}
                </td>
                <td className="p-3 opacity-80">{p.categoryLabel}</td>
                <td className="p-3 font-semibold">
                  {editing?.id === p.id ? (
                    <input
                      type="number"
                      min={0}
                      value={editing.price}
                      onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                      className="w-20 rounded border border-amber-400/50 bg-black/40 px-2 py-1 text-xs"
                    />
                  ) : (
                    `${p.price} zł`
                  )}
                </td>
                <td className="p-3">
                  <div className="inline-flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={busyId === p.id}
                      onClick={() => void applyUpdate({ id: p.id, stock: Math.max(0, p.stock - 1) })}
                      className="rounded border border-white/15 p-1 hover:bg-white/10"
                      title="Zmniejsz o 1"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span
                      className={`min-w-[40px] text-center font-mono font-bold ${
                        p.stock === 0
                          ? 'text-red-400'
                          : p.stock <= 10
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                      }`}
                    >
                      {p.stock}
                    </span>
                    <button
                      type="button"
                      disabled={busyId === p.id}
                      onClick={() => void applyUpdate({ id: p.id, stock: p.stock + 1 })}
                      className="rounded border border-white/15 p-1 hover:bg-white/10"
                      title="Zwiększ o 1"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    {p.stock <= 10 && <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />}
                  </div>
                </td>
                <td className="p-3 text-right">
                  <div className="inline-flex items-center gap-1.5">
                    {editing?.id === p.id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            const next = editing;
                            setEditing(null);
                            void applyUpdate(next);
                          }}
                          className="rounded bg-emerald-500/20 p-1.5 text-emerald-300"
                        >
                          <Save className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditing(null)}
                          className="rounded bg-white/10 p-1.5"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => setEditing(p)}
                          className="rounded border border-white/15 p-1.5 hover:bg-white/10"
                          title="Edytuj"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={busyId === p.id}
                          onClick={() => void handleDelete(p.id)}
                          className="rounded border border-red-400/30 p-1.5 text-red-300 hover:bg-red-500/20"
                          title="Usuń SKU"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
