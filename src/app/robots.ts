import type { MetadataRoute } from "next";

// Motori di ricerca e crawler delle AI possono leggere tutto il sito pubblico; le pagine private hanno già noindex.
const AI = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "CCBot"];
const PRIVATE = ["/s/", "/c/", "/invii", "/cruscotto", "/grazie-check", "/check/grazie", "/osservatorio/olio/anteprima", "/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      { userAgent: AI, allow: "/", disallow: PRIVATE },
    ],
    sitemap: "https://www.ivanosciretta.tech/sitemap.xml",
    host: "https://www.ivanosciretta.tech",
  };
}
