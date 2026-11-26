import { getShopInventory, summarizeInventory } from '@/lib/shopInventoryStore';
import InventoryManagerClient from '@/components/admin/InventoryManagerClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Magazyn & Sklep CML · BM Clinic',
  description: 'Zarządzanie stanem magazynowym SKU, zestawami pooperacyjnymi i cennikiem CML.',
};

export default function PublicInventoryPage() {
  const products = getShopInventory();
  const summary = summarizeInventory(products);

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10 text-[#f5f4f1] sm:px-8">
      <InventoryManagerClient initialProducts={products} initialSummary={summary} />
    </main>
  );
}
