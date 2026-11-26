import DesignStudioAetherClient from '@/components/design/DesignStudioAetherClient';

export const metadata = {
  title: 'BM Clinic × Aether Design Studio (:3016 + :3017) — Galeria, Generator Kodu, Kity UI & Sterowniki',
  description:
    'Połączone Design Studio z silnikiem animacji i haptyki Aether :3017, galerią modelową z generatorem całych projektów frontendowych, automatyzacjami, Web-Kit, Mobile-Kit, sterownikami i szablonami Vercel.',
};

export default function DesignStudioPage() {
  return (
    <main className="min-h-screen bg-[#040a09]">
      <DesignStudioAetherClient />
    </main>
  );
}
