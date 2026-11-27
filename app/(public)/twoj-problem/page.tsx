import LandingFrame from '@/components/landing/LandingFrame';

export const metadata = {
  title: 'Twój Problem — Diagnostyka Estetyczna BM Clinic',
};

export default function TwojProblemPage() {
  return (
    <LandingFrame
      title="Twój Problem — 22 strefy i ikony (naprawione SVG + linki)"
      src="/aplikacja/twoj-problem.html"
      badge="Icons & Links Fixed"
    />
  );
}
