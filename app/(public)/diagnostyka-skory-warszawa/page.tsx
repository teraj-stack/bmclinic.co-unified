import BmClinicsAiHostClient from '@/components/bmclinics-ai/BmClinicsAiHostClient';

export const metadata = {
  title: 'Diagnostyka Skóry Warszawa — BMClinics.ai',
};

export default function DiagnostykaSkoryPage() {
  return <BmClinicsAiHostClient initialRoute="/diagnostyka-skory-warszawa" />;
}
