import BmClinicsAiHostClient from '@/components/bmclinics-ai/BmClinicsAiHostClient';

export const metadata = { title: 'Rozwiązania Estetyczne — BMClinics.ai' };

export default function RozwiazaniaPage() {
  return <BmClinicsAiHostClient initialRoute="/rozwiazania" />;
}
