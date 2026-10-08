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
  metadataBase: new URL("https://www.ivanosciretta.tech"),
  title: "Ivano Sciretta — Sistemi digitali su misura per aziende che vogliono crescere con l'AI",
  description: "Progetto e costruisco siti premium, piattaforme AI e sistemi di automazione. Per founder e aziende che vogliono smettere di improvvisare.",
  keywords: ["Orchestrazione Intelligenza Artificiale", "AI Systems Builder", "Architetture Scalabili", "Esperto Intelligenza Artificiale", "Next.js", "WebGL", "GenAI", "Agentic Workflows"],
  authors: [{ name: "Ivano Sciretta" }],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://www.ivanosciretta.tech",
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
    icon: "/favicon.png",
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
    "@id": "https://www.ivanosciretta.tech/chi-sono#ivano",
    "name": "Ivano Sciretta",
    "url": "https://www.ivanosciretta.tech",
    "jobTitle": "AI Systems Architect",
    "description": "Esperto in Orchestrazione Intelligenza Artificiale, agentic workflows e ingegneria di ecosistemi digitali performanti.",
    "knowsAbout": ["Intelligenza Artificiale", "Web Development", "Agentic Workflows", "System Orchestration", "Next.js", "React", "WebGL"],
    "sameAs": [
      "https://www.linkedin.com/in/ivano-sciretta",
      "https://www.credly.com/users/ivano-sciretta/badges",
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
