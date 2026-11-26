import type { Metadata } from 'next';
import Script from 'next/script';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import AuthProvider from '@/components/auth/AuthProvider';
import { CartProvider } from '@/components/cart/CartProvider';
import KillNextPortal from '@/components/dev/KillNextPortal';
import LiveEditorToolbar from '@/components/cms/LiveEditorToolbar';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://bmclinic.net'),
  title: {
    default: 'BM Clinic — Klinika Chirurgiczna',
    template: '%s | BM Clinic',
  },
  description:
    'Precyzyjna proktologia, leczenie żylaków i naczynek oraz chirurgia ogólna. Rezerwacja wizyt online i sklep z zabiegami.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body className="flex min-h-screen flex-col antialiased">
        <KillNextPortal />
        <AuthProvider>
          <CartProvider>
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
            <LiveEditorToolbar />
          </CartProvider>
        </AuthProvider>
        <Script src="/bm-unified-shell.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
