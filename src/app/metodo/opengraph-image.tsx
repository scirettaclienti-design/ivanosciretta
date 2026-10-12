import { ogImmagine, ogSize } from "@/lib/og";
export const alt = "Metodo · come funziona una scatola";
export const size = ogSize;
export const contentType = "image/png";
export default function Image() {
  return ogImmagine("Dalla mappa gratuita al canone, in quattro passi", "Cosa ricevi, quanto ci vuole, cosa decidi tu.", "Metodo");
}
