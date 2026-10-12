import { ogImmagine, ogSize } from "@/lib/og";
export const alt = "Soluzioni per frantoi, botteghe ed empori";
export const size = ogSize;
export const contentType = "image/png";
export default function Image() {
  return ogImmagine("Soluzioni per frantoi, botteghe ed empori", "Il mercato, la struttura, le soluzioni.", "Soluzioni");
}
