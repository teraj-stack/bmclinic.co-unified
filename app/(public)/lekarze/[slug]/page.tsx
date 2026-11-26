import BmClinicsAiHostClient from '@/components/bmclinics-ai/BmClinicsAiHostClient';

export default async function LekarzeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BmClinicsAiHostClient initialRoute={`/lekarze/${slug}`} />;
}
