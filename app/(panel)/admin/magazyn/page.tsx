import { getShopInventory, summarizeInventory } from '@/lib/shopInventoryStore';
import InventoryManagerClient from '@/components/admin/InventoryManagerClient';

export const dynamic = 'force-dynamic';

export default function AdminInventoryPage() {
  const products = getShopInventory();
  const summary = summarizeInventory(products);

  return <InventoryManagerClient initialProducts={products} initialSummary={summary} />;
}
