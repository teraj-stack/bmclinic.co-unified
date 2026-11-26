import BmClinicsAiHostClient from '@/components/bmclinics-ai/BmClinicsAiHostClient';

export default async function WskazaniaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BmClinicsAiHostClient initialRoute={`/wskazania/${slug}`} />;
}
