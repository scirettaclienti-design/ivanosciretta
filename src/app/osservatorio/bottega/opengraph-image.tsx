import { ogImmagine, ogSize } from "@/lib/og";
export const alt = "Osservatorio · come si presentano online botteghe ed empori italiani";
export const size = ogSize;
export const contentType = "image/png";
export default function Image() {
  return ogImmagine("Come si presentano online botteghe ed empori italiani", "Numeri aggregati e anonimi, con metodo e limiti.", "Osservatorio · botteghe", "#E6A07C");
}
