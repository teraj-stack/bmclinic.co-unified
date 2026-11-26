import BmClinicsAiHostClient from '@/components/bmclinics-ai/BmClinicsAiHostClient';

export default async function TechnologieDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BmClinicsAiHostClient initialRoute={`/technologie/${slug}`} />;
}
