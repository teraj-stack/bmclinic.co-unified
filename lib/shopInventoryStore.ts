import fs from 'fs';
import path from 'path';

export type ShopCategory =
  | 'services'
  | 'packages'
  | 'post_op'
  | 'hygiene'
  | 'supplements'
  | 'skincare';

export interface ShopInventoryProduct {
  id: string;
  sku: string;
  name: string;
  category: ShopCategory;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  stock: number;
  description: string;
  medicalNote: string;
  badge?: string;
  requiresConsultation: boolean;
}

export interface ShopInventorySummary {
  totalSku: number;
  totalItems: number;
  totalValuePln: number;
  lowStockCount: number;
  outOfStockCount: number;
}

const DATA_FILE = path.join(process.cwd(), 'chronos-vault-module', 'data', 'shop-inventory.json');

export const CATEGORY_LABELS: Record<ShopCategory, string> = {
  services: 'Usługi & E-Konsultacje',
  packages: 'Pakiety Zabiegowe',
  post_op: 'Preparaty Po Zabiegach',
  hygiene: 'Higiena & Pielęgnacja',
  supplements: 'Suplementy & Błonnik',
  skincare: 'Dermokosmetyki',
};

export const INITIAL_SHOP_INVENTORY: ShopInventoryProduct[] = [
  {
    id: 'e-konsultacja-proktologiczna',
    sku: 'CML-EKON-01',
    name: 'E-Konsultacja Proktologiczna (Dr Jan Bujok)',
    category: 'services',
    categoryLabel: 'Usługi & E-Konsultacje',
    price: 250,
    originalPrice: 300,
    stock: 45,
    description:
      'Pierwszorazowa lub kontrolna konsultacja wideo/telefoniczna. Wywiad, analiza wyników badań i kwalifikacja do zabiegu LHP/FiLaC.',
    medicalNote:
      'W cenie: zalecenia lekarskie, wystawienie e-recepty / e-zwolnienia L4 jeśli są wskazania medyczne.',
    badge: 'Polecane',
    requiresConsultation: false,
  },
  {
    id: 'pakiet-proktologia-kompleks',
    sku: 'CML-PAK-02',
    name: 'Pakiet Diagnostyczny: Wizyta + Anoskopia + Kwalifikacja',
    category: 'packages',
    categoryLabel: 'Pakiety Zabiegowe',
    price: 420,
    originalPrice: 500,
    stock: 20,
    description:
      'Kompleksowa stacjonarna diagnostyka w gabinecie CML Warszawa Wilanów: badanie per rectum, anoskopia wideo, plan leczenia.',
    medicalNote:
      'Gwarancja natychmiastowego przerwania badania w przypadku dolegliwości bólowych.',
    badge: 'Bestseller',
    requiresConsultation: false,
  },
  {
    id: 'zestaw-gojenie-lhp',
    sku: 'CML-POST-03',
    name: 'Zestaw Regeneracyjny CML po zabiegu LHP / FiLaC',
    category: 'post_op',
    categoryLabel: 'Preparaty Po Zabiegach',
    price: 189,
    originalPrice: 220,
    stock: 14,
    description:
      'Medyczny żel łagodzący z kwasem hialuronowym, srebrem koloidalnym i nagietkiem oraz sterylny kompres regenerujący.',
    medicalNote:
      'Skład zatwierdzony przez dr. Jana Bujoka do stosowania od 1. doby po laseroterapii.',
    badge: 'Medyczny Must-Have',
    requiresConsultation: false,
  },
  {
    id: 'dermokosmetyk-procto-cleanse',
    sku: 'CML-SKIN-04',
    name: 'Specjalistyczna Pianka do Higieny Intymnej CML ProctoCleanse 150ml',
    category: 'hygiene',
    categoryLabel: 'Higiena & Pielęgnacja',
    price: 79,
    stock: 60,
    description:
      'Hipoalergiczna pianka do codziennej higieny brzeżnej z ekstraktem z kory dębu i pantenolem. pH neutralne dla skóry.',
    medicalNote: 'Bez parabenów, bez SLS, łagodzi świąd i pieczenie.',
    requiresConsultation: false,
  },
  {
    id: 'chusteczki-procto-wipes',
    sku: 'CML-HYG-07',
    name: 'Medyczne Chusteczki Nawilżane CML ProctoWipes (40 szt.)',
    category: 'hygiene',
    categoryLabel: 'Higiena & Pielęgnacja',
    price: 39,
    stock: 85,
    description:
      'Biurowy i podróżny niezbędnik higieniczny z alantoiną, rumiankiem i kwasem mlekowym. 100% biodegradowalne.',
    medicalNote: 'Zastępuje tradycyjny papier toaletowy bez podrażniania anodermy.',
    badge: 'Nowość',
    requiresConsultation: false,
  },
  {
    id: 'blonnik-psyllium-pro',
    sku: 'CML-SUP-08',
    name: 'Błonnik Witalny CML Psyllium Pro 300g (Mielona Łuska Babki Jajowatej)',
    category: 'supplements',
    categoryLabel: 'Suplementy & Błonnik',
    price: 69,
    originalPrice: 85,
    stock: 42,
    description:
      'Frakcjonowana łuska babki jajowatej pęczniejąca w jelitach. Wiąże wodę, zmiękcza masę kałową i likwiduje bolesne zaparcia.',
    medicalNote:
      'Zalecenie proktologiczne: stosować 1 miarkę rano z 250ml wody przed wypróżnieniem.',
    badge: 'Rekomendacja CML',
    requiresConsultation: false,
  },
  {
    id: 'czopki-oslonowe-proctohyal',
    sku: 'CML-SUP-09',
    name: 'Czopki Osłonowo-Nawilżające CML ProctoHyal (10 szt.)',
    category: 'supplements',
    categoryLabel: 'Suplementy & Błonnik',
    price: 59,
    stock: 35,
    description:
      'Czopki z nisko- i wysokocząsteczkowym kwasem hialuronowym oraz masłem shea. Tworzą warstwę ochronną w kanale odbytu.',
    medicalNote: 'Regeneracja nabłonka po podrażnieniach i mikrourazach.',
    requiresConsultation: false,
  },
  {
    id: 'e-recepta-kontynuacja',
    sku: 'CML-EREP-05',
    name: 'Kontynuacja Terapii Leko-Zastępczej (E-Recepta)',
    category: 'services',
    categoryLabel: 'Usługi & E-Konsultacje',
    price: 120,
    stock: 100,
    description:
      'Szybki wniosek o przedłużenie maści relaksujących zwieracz lub czopków przeciwzapalnych dla stałych pacjentów CML.',
    medicalNote: 'Wymaga uprzedniej przynajmniej 1 stacjonarnej wizyty w klinice CML.',
    requiresConsultation: true,
  },
  {
    id: 'pakiet-laser-lhp-pre',
    sku: 'CML-PAK-06',
    name: 'Kwalifikacja + Badania Krwi do Zabiegu LHP',
    category: 'packages',
    categoryLabel: 'Pakiety Zabiegowe',
    price: 350,
    stock: 8,
    description:
      'Przedzabiegowy pakiet laboratoryjny (morfologia, APTT, INR, antygen HBs, przeciwciała anty-HCV) z omówieniem wyników.',
    medicalNote: 'Niezbędne do bezpiecznego przeprowadzenia leczenia laserowego.',
    requiresConsultation: false,
  },
];

function writeAtomic(products: ShopInventoryProduct[]): void {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  const tmpFile = `${DATA_FILE}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(products, null, 2), 'utf8');
  fs.renameSync(tmpFile, DATA_FILE);
}

export function getShopInventory(): ShopInventoryProduct[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      writeAtomic(INITIAL_SHOP_INVENTORY);
      return INITIAL_SHOP_INVENTORY;
    }
    const parsed = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed as ShopInventoryProduct[];
    }
  } catch {
    // Fall back to defaults below
  }
  return INITIAL_SHOP_INVENTORY;
}

export function summarizeInventory(products: ShopInventoryProduct[]): ShopInventorySummary {
  return {
    totalSku: products.length,
    totalItems: products.reduce((sum, p) => sum + Math.max(0, p.stock), 0),
    totalValuePln: products.reduce((sum, p) => sum + Math.max(0, p.price) * Math.max(0, p.stock), 0),
    lowStockCount: products.filter((p) => p.stock > 0 && p.stock <= 10).length,
    outOfStockCount: products.filter((p) => p.stock === 0).length,
  };
}

export function updateInventoryProduct(
  patch: Partial<ShopInventoryProduct> & { id: string }
): ShopInventoryProduct[] {
  const current = getShopInventory();
  const next = current.map((item) => {
    if (item.id !== patch.id) return item;
    const category = (patch.category || item.category) as ShopCategory;
    return {
      ...item,
      ...patch,
      category,
      categoryLabel: CATEGORY_LABELS[category] || item.categoryLabel,
      price: Math.max(0, Number(patch.price ?? item.price) || 0),
      stock: Math.max(0, Number(patch.stock ?? item.stock) || 0),
    };
  });
  writeAtomic(next);
  return next;
}

export function addInventoryProduct(
  draft: Omit<ShopInventoryProduct, 'id' | 'categoryLabel'> & { id?: string }
): ShopInventoryProduct[] {
  const current = getShopInventory();
  const slugBase =
    draft.id ||
    draft.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') ||
    `cml-${Date.now()}`;
  const uniqueId = current.some((p) => p.id === slugBase)
    ? `${slugBase}-${Date.now().toString().slice(-4)}`
    : slugBase;
  const category = (draft.category || 'post_op') as ShopCategory;
  const created: ShopInventoryProduct = {
    id: uniqueId,
    sku: draft.sku || `CML-SKU-${Date.now().toString().slice(-4)}`,
    name: draft.name,
    category,
    categoryLabel: CATEGORY_LABELS[category] || 'Preparaty Po Zabiegach',
    price: Math.max(0, Number(draft.price) || 0),
    originalPrice: draft.originalPrice ? Math.max(0, Number(draft.originalPrice)) : undefined,
    stock: Math.max(0, Number(draft.stock) || 0),
    description: draft.description || 'Produkt medyczny BM Clinic / CML.',
    medicalNote: draft.medicalNote || 'Skonsultowane z zespołem chirurgicznym.',
    badge: draft.badge || undefined,
    requiresConsultation: Boolean(draft.requiresConsultation),
  };
  const next = [created, ...current];
  writeAtomic(next);
  return next;
}

export function deleteInventoryProduct(id: string): ShopInventoryProduct[] {
  const current = getShopInventory();
  const next = current.filter((p) => p.id !== id);
  writeAtomic(next);
  return next;
}

export function resetInventoryProducts(): ShopInventoryProduct[] {
  writeAtomic(INITIAL_SHOP_INVENTORY);
  return INITIAL_SHOP_INVENTORY;
}
