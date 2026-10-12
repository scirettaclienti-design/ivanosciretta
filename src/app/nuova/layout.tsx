import type { Metadata } from "next";

// Bozze della nuova home: mai nei motori di ricerca.
export const metadata: Metadata = { title: "Bozza nuova home", robots: { index: false, follow: false } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
