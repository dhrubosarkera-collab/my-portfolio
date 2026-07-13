import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/* Same real values used in page.tsx. Duplicated on purpose — with only these
   two files and no shared data module, layout.tsx and page.tsx are fully
   independent. If you ever change your name/school/socials, update both. */
const NAME = "Dhrubo Sarker Avroo";
const TAGLINE = "Future Cybersecurity Founder · AI Architect · Cultural Analytics Researcher";
const GRADE = "Class 9 · Science";
const LOCATION = "Lalmonirhat, Bangladesh";
const SCHOOL = "Cantonment Public School and College, Lalmonirhat";
const EMAIL = "dhrubosarkera@gmail.com";
const FIRST_ROLE = "Cybersecurity Researcher";
const PHOTO_URL =
  "https://res.cloudinary.com/oiqiiqca/image/upload/v1783744780/Dhrubo_Sarker_Avroo_hl8c5b.png";
const LOGO_URL =
  "https://res.cloudinary.com/oiqiiqca/image/upload/v1783744697/ChatGPT_Image_Jul_11_2026_10_17_49_AM_r4a8uk.png";
const SOCIAL_URLS = [
  "https://github.com/dhrubosarkera-collab",
  "https://www.linkedin.com/in/dhrubo-sarker-avroo-895b66418",
  "https://www.facebook.com/share/1CdBJBUrTC/",
  "https://www.instagram.com/dhrv.0x",
  "https://x.com/dhrubo_exe",
  "https://www.threads.net/@dhrv.0x",
  "https://www.hackerrank.com/profile/dhrubosarkera",
  "https://discord.com/users/915865243553415178",
  "https://t.me/dhrv_0x",
  "https://wa.me/8801717676292",
];

/* Everything the components in page.tsx need (font utility classes, the
   background grid texture, social hover glow, scrollbar, focus states,
   reduced-motion handling). Your existing globals.css is untouched — this
   just adds to it via a plain <style> tag, so nothing you already have in
   there gets overwritten. */
const CUSTOM_CSS = `
  .font-heading { font-family: var(--font-display); }
  .font-mono-ui { font-family: var(--font-mono); }
  html { scroll-behavior: smooth; }
  .grid-texture {
    background-size: 44px 44px;
    background-image: linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
  }
  .social-icon:hover {
    border-color: var(--glow, #2dd4bf);
    color: #fff;
    box-shadow: 0 0 24px -6px var(--glow, transparent);
    transform: translateY(-1px);
  }
  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-track { background: #0a0e16; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 999px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.22); }
  :focus-visible { outline: 2px solid #2dd4bf; outline-offset: 2px; border-radius: 4px; }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://dhrubo-dev.vercel.app";
const description = `${TAGLINE}. Portfolio of ${NAME}, a ${GRADE} student and ${FIRST_ROLE.toLowerCase()} based in ${LOCATION}.`;

// Fixed: Combined the duplicated metadata into a single clean object
export const metadata: Metadata = {
  title: `${NAME} | Portfolio`,
  description,
  metadataBase: new URL(siteUrl),
  keywords: [
    "Dhrubo Sarker Avroo",
    "Cybersecurity Researcher",
    "AI Framework Architect",
    "OSINT Specialist",
    "Software Developer Portfolio",
    "Science Olympiad",
  ],
  verification: {
    google: "tIsP1KS9igTsVb3_7uoen6T_W7PcRJSf0JOQUY2PgsA",
  },
  icons: {
    icon: LOGO_URL,
    apple: LOGO_URL,
  },
  openGraph: {
    title: `${NAME} | Portfolio`,
    description,
    url: siteUrl,
    siteName: `${NAME} | Portfolio`,
    images: [{ url: LOGO_URL, width: 512, height: 512, alt: `${NAME} logo` }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${NAME} | Portfolio`,
    description,
    images: [LOGO_URL],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: NAME,
  description: TAGLINE,
  url: siteUrl,
  email: EMAIL,
  image: PHOTO_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: LOCATION,
  },
  affiliation: {
    "@type": "EducationalOrganization",
    name: SCHOOL,
  },
  sameAs: SOCIAL_URLS,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body
        className="bg-[#0E1522] text-white antialiased selection:bg-teal-500/30"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* eslint-disable-next-line react/no-danger */}
        <style dangerouslySetInnerHTML={{ __html: CUSTOM_CSS }} />

        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="grid-texture absolute inset-0 opacity-[0.35]" />
          <div className="absolute -top-[35%] left-[15%] h-[600px] w-[600px] rounded-full bg-teal-500/10 blur-[150px]" />
          <div className="absolute top-[55%] -left-[10%] h-[500px] w-[500px] rounded-full bg-amber-500/[0.06] blur-[130px]" />
          <div className="absolute top-[10%] -right-[15%] h-[550px] w-[550px] rounded-full bg-teal-400/[0.05] blur-[140px]" />
        </div>

        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}