import InteractiveSitemapClient from '@/components/sitemap/InteractiveSitemapClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Mapa Całej Strony w Segmentach — BM Clinic × Chronos Vault × BMClinics.ai',
  description:
    'Kompletna mapa 6 segmentów systemu BM Clinic na localhost:3016: Klinika, Chronos Vault, BMClinics.ai, Baza MCML, Design Studio (:3017) oraz Holding AI.',
};

export default function MapaStronyPage() {
  return <InteractiveSitemapClient />;
}
