import BmClinicsAiHostClient from '@/components/bmclinics-ai/BmClinicsAiHostClient';

export const metadata = { title: 'Potrzeby Skóry i Pacjentów — BMClinics.ai' };

export default function PotrzebyPage() {
  return <BmClinicsAiHostClient initialRoute="/potrzeby" />;
}
