import type { NextConfig } from "next";

// L'app "scatole" (repo scatole, Vite) vive su un progetto Vercel a parte.
// Qui la "montiamo" dentro ivanosciretta.tech: chi visita vede sempre questo dominio.
const SCATOLE = "https://scatole-nu.vercel.app";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // I file dell'app (js, css, video, immagini og) stanno tutti sotto /_scatole/.
      { source: "/_scatole/:path*", destination: `${SCATOLE}/_scatole/:path*` },
      { source: "/scatole", destination: `${SCATOLE}/scatole` },
      { source: "/produttori/:caso", destination: `${SCATOLE}/produttori/:caso` },
      { source: "/venditori/:caso", destination: `${SCATOLE}/venditori/:caso` },
      { source: "/servizi/:caso", destination: `${SCATOLE}/servizi/:caso` },
      { source: "/privacy", destination: `${SCATOLE}/privacy` },
      { source: "/s/:path*", destination: `${SCATOLE}/s/:path*` },
      { source: "/grazie-check", destination: `${SCATOLE}/grazie-check` },
      { source: "/check", destination: `${SCATOLE}/check` },
      { source: "/check/grazie", destination: `${SCATOLE}/check/grazie` },
    ];
  },
  async headers() {
    // Scatole personali e pagina dopo il pagamento: private, mai nei motori di ricerca.
    return [
      { source: "/s/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }, { key: "Referrer-Policy", value: "no-referrer" }] },
      { source: "/grazie-check", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }, { key: "Referrer-Policy", value: "no-referrer" }] },
      // /check è indicizzabile, ma ?mappa= contiene la chiave della mappa: niente referrer verso Stripe o WhatsApp.
      { source: "/check", headers: [{ key: "Referrer-Policy", value: "no-referrer" }] },
      // Il ritorno dal Payment Link: ?session_id= non va indicizzato né passato ad altri siti.
      { source: "/check/grazie", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }, { key: "Referrer-Policy", value: "no-referrer" }] },
    ];
  },
  async redirects() {
    // Le UTM e gli altri parametri dell'indirizzo passano da soli alla destinazione.
    return [
      // Link corti da dire a voce o scrivere nei post: 302 = temporanei, si possono ripuntare.
      { source: "/olio", destination: "/produttori/olio", statusCode: 302 },
      { source: "/bottega", destination: "/venditori/bottega", statusCode: 302 },
      { source: "/fiera", destination: "/produttori/vino", statusCode: 302 },
      { source: "/immobiliare", destination: "/servizi/immobiliare", statusCode: 302 },
      // Vecchio schema /settori: 301 = definitivi.
      { source: "/settori/immobiliare", destination: "/servizi/immobiliare", statusCode: 301 },
      { source: "/settori/olio", destination: "/produttori/olio", statusCode: 301 },
      { source: "/settori/vino", destination: "/produttori/vino", statusCode: 301 },
      { source: "/settori/bottega", destination: "/venditori/bottega", statusCode: 301 },
      { source: "/settori", destination: "/scatole", statusCode: 301 },
    ];
  },
};

export default nextConfig;
