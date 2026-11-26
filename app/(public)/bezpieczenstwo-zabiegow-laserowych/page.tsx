import BmClinicsAiHostClient from '@/components/bmclinics-ai/BmClinicsAiHostClient';

export const metadata = { title: 'Bezpieczeństwo Zabiegów Laserowych — BMClinics.ai' };

export default function BezpieczenstwoLaserowPage() {
  return <BmClinicsAiHostClient initialRoute="/bezpieczenstwo-zabiegow-laserowych" />;
}
