import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryTheme } from '@/lib/categoryThemes';
import { getServiceBySlug, getServicesCatalog } from '@/lib/servicesCatalog';
import AddToCartButton from '@/components/cart/AddToCartButton';
import { Calendar, Clock, ShieldCheck, ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ kategoria: string; uslugaSlug: string }>;
}

export async function generateStaticParams() {
  const services = await getServicesCatalog();
  return services.map((s) => ({ kategoria: s.categorySlug, uslugaSlug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uslugaSlug } = await params;
  const service = await getServiceBySlug(uslugaSlug);
  if (!service) return {};

  return {
    title: `${service.name} – cena, przebieg zabiegu | BM Clinics`,
    description: service.seoSummary,
    openGraph: { title: service.name, description: service.seoSummary },
  };
}

export default async function UslugaPage({ params }: Props) {
  const { kategoria, uslugaSlug } = await params;
  const service = await getServiceBySlug(uslugaSlug);
  const theme = getCategoryTheme(kategoria);

  if (!service || !theme || service.categorySlug !== kategoria) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: service.name,
    description: service.fullDescription,
    procedureType: 'http://schema.org/NoninvasiveProcedure',
    offers: { '@type': 'Offer', priceCurrency: 'PLN', price: service.priceGrosze / 100 },
  };

  return (
    <article
      className="glass-card mx-auto max-w-2xl p-6 md:p-10 space-y-6"
      style={{
        background: 'var(--cat-card-bg)',
        borderColor: 'var(--cat-card-border)',
        color: 'var(--cat-text)',
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href={`/uslugi/${kategoria}`}
        className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline transition"
        style={{ color: 'var(--cat-accent)' }}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Wróć do kategorii: {theme.label}
      </Link>

      <div>
        <h1 className="font-[family-name:var(--font-fraunces)] text-2xl sm:text-3xl font-semibold">
          {service.name}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs" style={{ color: 'var(--cat-muted)' }}>
          <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: 'var(--cat-accent)' }}>
            Cena: od {(service.priceGrosze / 100).toFixed(2)} zł
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            Czas trwania: {service.durationMin} min
          </span>
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            Procedura ambulatoryjna 1-Dnia
          </span>
        </div>
      </div>

      <div className="space-y-3 text-sm leading-relaxed" style={{ color: 'var(--cat-text)' }}>
        <p className="font-medium">{service.seoSummary}</p>
        <p style={{ color: 'var(--cat-muted)' }}>{service.fullDescription}</p>
      </div>

      <div
        className="pt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        style={{ borderTop: '1px solid var(--cat-card-border)' }}
      >
        <Link
          href={`/rezerwacja?serviceId=${service.id}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-center text-xs sm:text-sm font-semibold transition hover:opacity-95"
          style={{ background: 'var(--cat-cta-bg)', color: 'var(--cat-cta-text)' }}
        >
          <Calendar className="h-4 w-4" />
          <span>Zarezerwuj wizytę online</span>
        </Link>

        <AddToCartButton
          service={{
            serviceId: service.id,
            name: service.name,
            priceGrosze: service.priceGrosze,
          }}
        />
      </div>
    </article>
  );
}
