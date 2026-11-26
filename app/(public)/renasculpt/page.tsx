import BmClinicsAiHostClient from '@/components/bmclinics-ai/BmClinicsAiHostClient';

export const metadata = { title: 'RenaSculpt — Modelowanie Sylwetki — BMClinics.ai' };

export default function RenaSculptPage() {
  return <BmClinicsAiHostClient initialRoute="/renasculpt" />;
}
