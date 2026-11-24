import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryTheme } from '@/lib/categoryThemes';
import { getServicesByCategory } from '@/lib/servicesCatalog';
import AddToCartButton from '@/components/cart/AddToCartButton';
import {
  Calendar,
  Clock,
  ArrowRight,
  Phone,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface Props {
  params: Promise<{ kategoria: string }>;
}

const PROCTOLOGY_PROBLEMS = [
  {
    title: 'Hemoroidy (choroba hemoroidalna)',
    symptoms: 'Krwawienie, świąd, pieczenie lub wypadanie guzków',
    solution:
      'Precyzyjna diagnostyka i małoinwazyjne leczenie ambulatoryjne (m.in. metody laserowe LHP, ligacja, skleroterapia) z szybkim powrotem do codzienności.',
    href: '/uslugi/proktologia/leczenie-hemoroidow-ambulatoryjne',
  },
  {
    title: 'Szczelina odbytu',
    symptoms: 'Ostry ból podczas lub po wypróżnieniu, świeża krew',
    solution:
      'Indywidualnie dobrana terapia zachowawcza lub zabieg ambulatoryjny nastawiony na szybkie złagodzenie bólu i trwałe wygojenie.',
    href: '/uslugi/proktologia/leczenie-szczeliny-odbytu',
  },
  {
    title: 'Przetoki i torbiel włosowa',
    symptoms: 'Nawracające sączenie, obrzęk lub bolesne zgrubienie',
    solution:
      'Dokładna kwalifikacja proktologiczna oraz nowoczesne, oszczędzające zwieracze procedury małoinwazyjne (w tym techniki laserowe FiLaC / SiLaC).',
    href: '/uslugi/proktologia/konsultacja-proktologiczna',
  },
  {
    title: 'Brodawki i zmiany okolicy odbytu',
    symptoms: 'Wyczuwalne zmiany skórne, podrażnienie, dyskomfort',
    solution:
      'Bezpieczne, precyzyjne usunięcie zmian w znieczuleniu miejscowym wraz z jasnym planem pielęgnacji i wizytą kontrolną.',
    href: '/uslugi/proktologia/usuwanie-brodawek-okolicy-odbytu',
  },
];

const FIRST_VISIT_STEPS = [
  {
    step: '01',
    title: 'Spokojna rozmowa bez pośpiechu',
    desc: 'Omawiasz objawy w pełnej dyskrecji. Bez skrępowania, bez oceniania — lekarz odpowiada na każde pytanie przed badaniem.',
  },
  {
    step: '02',
    title: 'Krótkie, delikatne badanie',
    desc: 'Wykonywane w komfortowej pozycji bocznej z poszanowaniem intymności. W razie potrzeby na miejscu wykonujemy anoskopię.',
  },
  {
    step: '03',
    title: 'Konkretny plan i przejrzysty koszt',
    desc: 'Wychodzisz z jasną diagnozą, receptą lub planem leczenia 1-dnia oraz dokładną informacją o dalszych krokach.',
  },
];

const PROCTOLOGY_FAQ = [
  {
    q: 'Czy pierwsza wizyta i badanie proktologiczne bolą?',
    a: 'Badanie jest krótkie, delikatne i wykonywane w komfortowej pozycji bocznej. W przypadku ostrego bólu (np. szczeliny) lekarz stosuje żel znieczulający i dobiera zakres badania tak, aby uniknąć dyskomfortu.',
  },
  {
    q: 'Jak przygotować się do konsultacji proktologicznej?',
    a: 'Do standardowej konsultacji i anoskopii wystarczy zwykła higiena miejscowa oraz naturalne wypróżnienie przed wizytą. Specjalne przygotowanie dotyczy jedynie rektoskopii — pełną instrukcję otrzymasz przy zapisie.',
  },
  {
    q: 'Czy potrzebuję skierowania od lekarza rodzinnego?',
    a: 'Nie. Wizyty i zabiegi w BM Clinics odbywają się bez skierowania — możesz umówić termin bezpośrednio online lub telefonicznie.',
  },
  {
    q: 'Kiedy wrócę do pracy po zabiegu ambulatoryjnym?',
    a: 'Większość małoinwazyjnych procedur ambulatoryjnych pozwala wrócić do domu tego samego dnia, a do lekkich codziennych aktywności w ciągu 1–2 dni.',
  },
];

export default async function KategoriaPage({ params }: Props) {
  const { kategoria } = await params;
  const theme = getCategoryTheme(kategoria);
  if (!theme) notFound();

  const services = await getServicesByCategory(kategoria);
  const isProctology = kategoria === 'proktologia';

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-8">
      {/* Hero */}
      <section
        className="glass-card relative overflow-hidden p-6 sm:p-10 space-y-5"
        style={{ background: 'var(--cat-card-bg)' }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
            style={{ background: 'rgba(196, 168, 116, 0.16)', color: 'var(--cat-accent)' }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Specjalizacja Kliniczna BM Clinics
          </span>
          {isProctology && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80">
              <MapPin className="h-3 w-3 text-amber-400" />
              Warszawa Wilanów · bezpłatny parking
            </span>
          )}
        </div>

        <div className="space-y-3 max-w-3xl">
          <h1
            className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-5xl font-semibold leading-tight"
            style={{ color: 'var(--cat-text)' }}
          >
            {isProctology
              ? 'Proktologia bez stresu — od objawu do pewnego planu leczenia'
              : theme.label}
          </h1>
          <p className="text-sm sm:text-base leading-relaxed opacity-85" style={{ color: 'var(--cat-text)' }}>
            {isProctology
              ? 'Konsultacje, anoskopia, rektoskopia i małoinwazyjne zabiegi 1-dnia prowadzone przez chirurga Jana Bujoka. Pełna dyskrecja, delikatne badanie w pozycji bocznej i szybkie terminy bez skierowania.'
              : theme.seoSummary}
          </p>
        </div>

        {isProctology && (
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/rezerwacja?serviceId=srv-konsultacja-proktologiczna"
              className="btn-gold inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-lg transition hover:opacity-95"
            >
              <Calendar className="h-4 w-4" />
              Umów konsultację online
            </Link>
            <a
              href="tel:+48510432361"
              className="inline-flex items-center gap-2 rounded-xl border border-amber-400/35 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Phone className="h-4 w-4 text-amber-400" />
              Zadzwoń: +48 510 432 361
            </a>
            <Link
              href="/cml"
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-3 text-xs font-semibold text-amber-300/90 hover:text-amber-200 hover:underline"
            >
              Przewodnik „Spokojna wizyta”
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}

        {isProctology && (
          <div className="grid gap-3 pt-4 border-t border-white/10 sm:grid-cols-3 text-xs opacity-85" style={{ color: 'var(--cat-text)' }}>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Badanie w komfortowej pozycji bocznej</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
              <span>Zabiegi 1-dnia bez hospitalizacji</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-400 shrink-0" />
              <span>Konsultacja już od 250 zł · bez skierowania</span>
            </div>
          </div>
        )}
      </section>

      {/* Proctology: Objawy -> Rozwiązanie */}
      {isProctology && (
        <section className="space-y-4">
          <div className="space-y-1">
            <h2
              className="font-[family-name:var(--font-fraunces)] text-2xl sm:text-3xl font-semibold"
              style={{ color: 'var(--cat-text)' }}
            >
              Z jakimi dolegliwościami pomagamy?
            </h2>
            <p className="text-sm opacity-80" style={{ color: 'var(--cat-text)' }}>
              Nie czekaj, aż objawy się nasilą — większość problemów proktologicznych można rozwiązać szybko i ambulatoryjnie.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {PROCTOLOGY_PROBLEMS.map((item) => (
              <div
                key={item.title}
                className="glass-card p-5 space-y-2.5 flex flex-col justify-between"
                style={{ background: 'var(--cat-card-bg)', color: 'var(--cat-text)' }}
              >
                <div className="space-y-1.5">
                  <h3 className="font-semibold text-base">{item.title}</h3>
                  <p className="text-xs font-medium text-amber-300/90">Objawy: {item.symptoms}</p>
                  <p className="text-xs opacity-80 leading-relaxed">{item.solution}</p>
                </div>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 pt-2 text-xs font-semibold text-amber-300 hover:underline"
                >
                  Zobacz szczegóły zabiegu
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Services & Prices Grid */}
      <section className="space-y-4" id="zabiegi">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2
              className="font-[family-name:var(--font-fraunces)] text-2xl sm:text-3xl font-semibold"
              style={{ color: 'var(--cat-text)' }}
            >
              {isProctology ? 'Zabiegi i konsultacje proktologiczne' : 'Dostępne zabiegi i konsultacje'}
            </h2>
            <p className="text-sm opacity-80" style={{ color: 'var(--cat-text)' }}>
              Wybierz usługę, sprawdź cenę i zarezerwuj termin bezpośrednio online.
            </p>
          </div>
          <Link
            href="/cennik"
            className="text-xs font-semibold text-amber-300 hover:underline inline-flex items-center gap-1"
          >
            Pełny cennik kliniki <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.id}
              className="glass-card flex flex-col justify-between p-6 transition hover:border-amber-500/40"
              style={{ background: 'var(--cat-card-bg)', color: 'var(--cat-text)' }}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <Link
                    href={`/uslugi/${kategoria}/${s.slug}`}
                    className="font-semibold text-lg hover:underline"
                  >
                    {s.name}
                  </Link>
                  <span
                    className="shrink-0 rounded-full px-3 py-1 text-xs font-bold"
                    style={{ background: 'rgba(196, 168, 116, 0.18)', color: 'var(--cat-accent)' }}
                  >
                    od {(s.priceGrosze / 100).toFixed(0)} zł
                  </span>
                </div>

                <p className="mt-2 text-xs opacity-80 leading-relaxed line-clamp-3">
                  {s.seoSummary}
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs opacity-75">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {s.durationMin} min
                  </span>
                  <Link
                    href={`/uslugi/${kategoria}/${s.slug}`}
                    className="inline-flex items-center gap-1 font-medium hover:underline ml-auto"
                  >
                    Opis zabiegu
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <Link
                  href={`/rezerwacja?serviceId=${s.id}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
                >
                  <Calendar className="h-3.5 w-3.5 text-amber-400" />
                  <span>Rezerwuj</span>
                </Link>

                <AddToCartButton
                  service={{
                    serviceId: s.id,
                    name: s.name,
                    priceGrosze: s.priceGrosze,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proctology: Jak wygląda pierwsza wizyta */}
      {isProctology && (
        <section className="space-y-4">
          <h2
            className="font-[family-name:var(--font-fraunces)] text-2xl sm:text-3xl font-semibold"
            style={{ color: 'var(--cat-text)' }}
          >
            Jak wygląda pierwsza wizyta?
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {FIRST_VISIT_STEPS.map((item) => (
              <div
                key={item.step}
                className="glass-card p-5 space-y-2"
                style={{ background: 'var(--cat-card-bg)', color: 'var(--cat-text)' }}
              >
                <span className="text-xs font-bold tracking-widest text-amber-400">
                  KROK {item.step}
                </span>
                <h3 className="font-semibold text-base">{item.title}</h3>
                <p className="text-xs opacity-80 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Proctology: FAQ */}
      {isProctology && (
        <section className="space-y-4">
          <h2
            className="font-[family-name:var(--font-fraunces)] text-2xl sm:text-3xl font-semibold flex items-center gap-2"
            style={{ color: 'var(--cat-text)' }}
          >
            <HelpCircle className="h-6 w-6 text-amber-400" />
            Najczęstsze pytania pacjentów
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {PROCTOLOGY_FAQ.map((item) => (
              <div
                key={item.q}
                className="glass-card p-5 space-y-2"
                style={{ background: 'var(--cat-card-bg)', color: 'var(--cat-text)' }}
              >
                <h3 className="font-semibold text-sm">{item.q}</h3>
                <p className="text-xs opacity-80 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Proctology: Bottom Conversion CTA */}
      {isProctology && (
        <section
          className="glass-card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          style={{ background: 'var(--cat-card-bg)', color: 'var(--cat-text)' }}
        >
          <div className="space-y-1.5 max-w-xl">
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold">
              Gotowy na spokojną konsultację?
            </h2>
            <p className="text-xs sm:text-sm opacity-85">
              ul. Branickiego 10/U6, Warszawa Wilanów · Pon–Pt 8:00–20:00 · Bezpłatny parking pod kliniką.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/rezerwacja?serviceId=srv-konsultacja-proktologiczna"
              className="btn-gold inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
            >
              <Calendar className="h-4 w-4" />
              Rezerwuj online
            </Link>
            <a
              href="tel:+48510432361"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              <Phone className="h-4 w-4 text-amber-400" />
              +48 510 432 361
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
