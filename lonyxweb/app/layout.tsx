import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
export const metadata: Metadata = {
  title: { default: 'LonyxWeb — Seu projeto digital no próximo nível', template: '%s | LonyxWeb' },
  description:
    'Sites, aplicativos, sistemas personalizados e manutenção digital. Design premium e tecnologia para marcas que não aceitam o comum.',
  openGraph: {
    title: 'LonyxWeb — Seu projeto digital no próximo nível',
    description: 'Design com intenção. Tecnologia com propósito. Experiências além do comum.',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: '#050807', width: 'device-width', initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body id="top">
        <a className="skip-link" href="#main">
          Pular para o conteúdo
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
