import BmClinicsAiHostClient from '@/components/bmclinics-ai/BmClinicsAiHostClient';

export const metadata = { title: 'Konsultacja Estetyczna — BMClinics.ai' };

export default function KonsultacjaPage() {
  return <BmClinicsAiHostClient initialRoute="/konsultacja" />;
}
