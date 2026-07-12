import type { Metadata } from 'next';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dhrubo Sarker Avroo | Portfolio',
  description: 'Welcome to my official portfolio website.',
  metadataBase: new URL('https://my-portfolio-ivory-eta-76.vercel.app'),
  verification: {
    google: 'tIsP1KS9igTsVb3_7uoen6T_W7PcRJSf0JOQUY2PgsA',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="bg-[#0E1522] text-white antialiased selection:bg-amber-500/30" style={{ fontFamily: 'var(--font-body)' }}>
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[40%] left-[20%] h-[600px] w-[600px] rounded-full bg-teal-500/10 blur-[150px]" />
          <div className="absolute top-[60%] -left-[10%] h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[130px]" />
        </div>

        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}