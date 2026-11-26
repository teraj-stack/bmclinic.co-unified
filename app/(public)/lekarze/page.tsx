import BmClinicsAiHostClient from '@/components/bmclinics-ai/BmClinicsAiHostClient';

export const metadata = {
  title: 'Zespół Lekarski — dr Halina Gabara i dr Jan Bujok — BMClinics.ai',
};

export default function LekarzePublicPage() {
  return <BmClinicsAiHostClient initialRoute="/lekarze" />;
}
