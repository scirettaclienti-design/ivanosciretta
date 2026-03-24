import type { Metadata } from "next";
import { Inter, Manrope, Space_Grotesk } from "next/font/google";
import SmoothScrolling from "@/components/SmoothScrolling";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ivano Sciretta | AI Systems Architect & Orchestration Expert",
  description: "Progetto ecosistemi digitali completi integrando Intelligenza Artificiale avanzata, backend solidi e performance ultra-rapide. Builder of AI-SPACE and DOVEVAI.",
  keywords: ["Orchestrazione Intelligenza Artificiale", "AI Systems Builder", "Architetture Scalabili", "Esperto Intelligenza Artificiale", "Next.js", "WebGL", "GenAI", "Agentic Workflows"],
  authors: [{ name: "Ivano Sciretta" }],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://ivanosciretta.com",
    siteName: "Ivano Sciretta Portfolio",
    title: "Ivano Sciretta | AI Systems Architect",
    description: "Progetto ecosistemi digitali completi integrando Intelligenza Artificiale avanzata e performance ultra-rapide.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ivano Sciretta | AI Systems Architect",
    description: "Espansione ecosistemi digitali con Agentic AI e architetture stabili.",
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ivano Sciretta",
    "url": "https://ivanosciretta.com",
    "jobTitle": "AI Systems Architect",
    "description": "Esperto in Orchestrazione Intelligenza Artificiale, agentic workflows e ingegneria di ecosistemi digitali performanti.",
    "knowsAbout": ["Intelligenza Artificiale", "Web Development", "Agentic Workflows", "System Orchestration", "Next.js", "React", "WebGL"],
    "sameAs": [
      "https://linkedin.com/in/ivano-sciretta",
      "https://github.com/ivanosciretta",
      "https://t.me/ivanosci"
    ]
  };

  return (
    <html
      lang="it"
      className={`${inter.variable} ${manrope.variable} ${spaceGrotesk.variable} dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="relative min-h-screen flex flex-col antialiased bg-transparent text-foreground scroll-smooth">
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
