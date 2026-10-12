import { settore } from "@/data/settori";
import { ogImmagine, ogSize } from "@/lib/og";

export const alt = "Soluzioni per settore · Ivano Sciretta";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ settore: string }> }) {
  const { settore: slug } = await params;
  const s = settore(slug);
  return ogImmagine(s?.titolo ?? "Soluzioni per settore", s?.promessa ?? "Il mercato, la struttura, le soluzioni.", "Soluzioni", s?.colore ? s.chiaro : undefined);
}
