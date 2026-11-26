import BmClinicsAiHostClient from '@/components/bmclinics-ai/BmClinicsAiHostClient';

export const metadata = {
  title: 'BMClinics.ai — Medycyna Estetyczna, Diagnostyka Skóry i Technologie',
  description:
    'Pełna platforma BMClinics.ai scalona do localhost:3016: diagnostyka skóry, 12 technologii laserowych i RF, wskazania, lekarze i generator pytań konsultacyjnych.',
};

export default async function BmClinicsAiPage({
  searchParams,
}: {
  searchParams: Promise<{ route?: string }>;
}) {
  const sp = await searchParams;
  return <BmClinicsAiHostClient initialRoute={sp.route || '/'} />;
}
