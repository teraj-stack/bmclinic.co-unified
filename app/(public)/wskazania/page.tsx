import BmClinicsAiHostClient from '@/components/bmclinics-ai/BmClinicsAiHostClient';

export const metadata = {
  title: 'Wskazania Kliniczne i Estetyczne — BMClinics.ai',
};

export default function WskazaniaPage() {
  return <BmClinicsAiHostClient initialRoute="/wskazania" />;
}
