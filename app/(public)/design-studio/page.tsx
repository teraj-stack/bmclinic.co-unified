import MobileDesignStudioClient from '@/components/design/MobileDesignStudioClient';

export const metadata = {
  title: 'Mobile UI & Prompt Library — BM Clinics Design Studio',
  description:
    '10 trendujących bibliotek kolorystycznych na telefony, 4 rodzaje ergonomicznych przycisków, 4 układy mobilne i automatyczne prompty do generowania ekranów kliniki.',
};

export default function DesignStudioPage() {
  return (
    <main className="min-h-screen bg-[#070b14]">
      <MobileDesignStudioClient />
    </main>
  );
}
