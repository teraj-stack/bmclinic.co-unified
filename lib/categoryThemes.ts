export type MotionStyle = 'calm' | 'flow' | 'soft';

export interface CategorySubthemeOption {
  id: 'female' | 'male';
  label: string;
  paletteName: string;
  accent: string;
  background: string;
}

export interface CategoryTheme {
  slug: string;
  label: string;
  paletteTitle: string;
  accent: string;
  background: string;
  motionStyle: MotionStyle;
  seoSummary: string;
  subthemes?: CategorySubthemeOption[];
}

export const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  proktologia: {
    slug: 'proktologia',
    label: 'Proktologia',
    paletteTitle: 'Ciemna Zieleń & Grafit',
    accent: '#2ee6b5',
    background: '#041413',
    motionStyle: 'calm',
    seoSummary:
      'Konsultacje i zabiegi proktologiczne prowadzone przez doświadczonych lekarzy – diagnostyka, leczenie i bezpieczne procedury w komfortowych warunkach kliniki.',
  },
  'zylaki-naczynka': {
    slug: 'zylaki-naczynka',
    label: 'Żylaki i naczynka',
    paletteTitle: 'Kobiety (Lawenda-Błękit) / Mężczyźni (Zieleń-Turkus-Błękit)',
    accent: '#4f46e5',
    background: '#eef2ff',
    motionStyle: 'flow',
    seoSummary:
      'Zamykanie naczynek i leczenie żylaków nowoczesnymi metodami małoinwazyjnymi – szybki powrót do codziennych aktywności i widoczne efekty po zabiegu.',
    subthemes: [
      {
        id: 'female',
        label: 'Dla Kobiet',
        paletteName: 'Lawendowo-Niebieska',
        accent: '#4f46e5',
        background: '#f3f1ff',
      },
      {
        id: 'male',
        label: 'Dla Mężczyzn',
        paletteName: 'Zielono-Turkusowo-Niebieska',
        accent: '#2dd4bf',
        background: '#051c22',
      },
    ],
  },
  'chirurgia-ogolna': {
    slug: 'chirurgia-ogolna',
    label: 'Chirurgia ogólna',
    paletteTitle: 'Pastelowa Biel, Stal & Tytan',
    accent: '#475569',
    background: '#f5f7fa',
    motionStyle: 'soft',
    seoSummary:
      'Zabiegi z zakresu chirurgii ogólnej wykonywane w bezpiecznym środowisku klinicznym, z pełną opieką przed- i pooperacyjną dostosowaną do potrzeb pacjenta.',
  },
};

export function getCategoryTheme(slug: string): CategoryTheme | undefined {
  return CATEGORY_THEMES[slug];
}

export function getAllCategorySlugs(): string[] {
  return Object.keys(CATEGORY_THEMES);
}
