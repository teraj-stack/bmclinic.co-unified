import BmClinicsAiHostClient from '@/components/bmclinics-ai/BmClinicsAiHostClient';

export const metadata = {
  title: '12 Technologii Medycyny Estetycznej — BMClinics.ai',
};

export default function TechnologiePage() {
  return <BmClinicsAiHostClient initialRoute="/technologie" />;
}
