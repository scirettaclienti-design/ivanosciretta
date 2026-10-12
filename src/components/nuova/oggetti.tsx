"use client";
// Oggetti veri per le scene: bottiglia d'olio (tornita), scatola regalo (con nastro e fiocco), fogli della mappa.
// Tutto procedurale (nessun modello da scaricare): leggero, e la luce da studio fa il resto.
import { useMemo } from "react";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";

type G = ThreeElements["group"];

/** Disegna una texture da un canvas 2D (etichette e fogli). */
export function textureDa(w: number, h: number, disegna: (c: CanvasRenderingContext2D, w: number, h: number) => void) {
  const cv = document.createElement("canvas");
  cv.width = w;
  cv.height = h;
  const c = cv.getContext("2d")!;
  disegna(c, w, h);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

export function Bottiglia({ vetro, serif, ...p }: G & { vetro: string; serif: string }) {
  const profilo = useMemo(() => {
    const v = (x: number, y: number) => new THREE.Vector2(x, y);
    return new THREE.SplineCurve([v(0, 0), v(0.5, 0), v(0.56, 0.04), v(0.585, 0.16), v(0.588, 1.1), v(0.56, 1.32), v(0.42, 1.55), v(0.24, 1.74), v(0.2, 1.9), v(0.2, 2.2), v(0.222, 2.26), v(0.222, 2.3), v(0, 2.3)]).getPoints(140);
  }, []);
  const etichetta = useMemo(
    () =>
      textureDa(1712, 600, (c, w, h) => {
        c.fillStyle = "#F1E9D6";
        c.fillRect(0, 0, w, h);
        c.strokeStyle = "#3a2f1c";
        c.lineWidth = 6;
        c.strokeRect(34, 34, w - 68, h - 68);
        c.lineWidth = 2;
        c.strokeRect(50, 50, w - 100, h - 100);
        c.fillStyle = "#3a2f1c";
        c.textAlign = "center";
        c.font = `600 44px ${serif}, Georgia, serif`;
        c.fillText("OLIO EXTRAVERGINE", w / 2, 150);
        c.font = `500 150px ${serif}, Georgia, serif`;
        c.fillText("di oliva", w / 2, 320);
        c.font = `500 40px ${serif}, Georgia, serif`;
        c.fillText("spremuto a freddo", w / 2, 410);
        c.beginPath();
        c.moveTo(w / 2 - 120, 450);
        c.lineTo(w / 2 + 120, 450);
        c.stroke();
      }),
    [serif],
  );
  const L = Math.PI * 1.1;
  return (
    <group {...p}>
      <mesh castShadow>
        <latheGeometry args={[profilo, 72]} />
        <meshPhysicalMaterial color={vetro} roughness={0.1} metalness={0} clearcoat={1} clearcoatRoughness={0.04} envMapIntensity={1.4} />
      </mesh>
      <mesh position={[0, 0.7, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.594, 0.594, 0.78, 72, 1, true, -L / 2, L]} />
        <meshStandardMaterial map={etichetta} roughness={0.85} />
      </mesh>
      <mesh position={[0, 2.34, 0]} castShadow>
        <cylinderGeometry args={[0.245, 0.245, 0.34, 56]} />
        <meshStandardMaterial color="#17150f" metalness={0.65} roughness={0.32} />
      </mesh>
      <mesh position={[0, 2.19, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.236, 0.018, 12, 56]} />
        <meshStandardMaterial color="#c9a45a" metalness={0.9} roughness={0.25} />
      </mesh>
    </group>
  );
}

export function Scatola({ colore, nastro, ...p }: G & { colore: string; nastro: string }) {
  const nm = <meshStandardMaterial color={nastro} roughness={0.38} metalness={0.05} />;
  return (
    <group {...p}>
      <RoundedBox args={[1.5, 0.78, 1.5]} radius={0.05} smoothness={5} position={[0, 0.39, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={colore} roughness={0.62} />
      </RoundedBox>
      <RoundedBox args={[1.62, 0.26, 1.62]} radius={0.04} smoothness={5} position={[0, 0.91, 0]} castShadow>
        <meshStandardMaterial color={colore} roughness={0.58} />
      </RoundedBox>
      <mesh position={[0, 0.39, 0]} castShadow>
        <boxGeometry args={[0.2, 0.8, 1.54]} />
        {nm}
      </mesh>
      <mesh position={[0, 0.39, 0]} castShadow>
        <boxGeometry args={[1.54, 0.8, 0.2]} />
        {nm}
      </mesh>
      <mesh position={[0, 0.91, 0]}>
        <boxGeometry args={[0.2, 0.275, 1.66]} />
        {nm}
      </mesh>
      <mesh position={[0, 0.91, 0]}>
        <boxGeometry args={[1.66, 0.275, 0.2]} />
        {nm}
      </mesh>
      <group position={[0, 1.07, 0]}>
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.2, 0.06, 0]} rotation={[0, 0, s * 0.8]} scale={[1, 0.75, 0.6]} castShadow>
            <torusGeometry args={[0.2, 0.065, 18, 44]} />
            {nm}
          </mesh>
        ))}
        <mesh position={[0, 0.03, 0]} castShadow>
          <sphereGeometry args={[0.1, 28, 20]} />
          {nm}
        </mesh>
      </group>
    </group>
  );
}

/** Un foglio della mappa: carta con spessore + il testo disegnato sopra. */
export function Foglio({ texture, carta, w = 1.9, h = 2.6, ...p }: G & { texture: THREE.Texture | null; carta: string; w?: number; h?: number }) {
  return (
    <group {...p}>
      <RoundedBox args={[w, h, 0.035]} radius={0.03} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color={carta} roughness={0.9} emissive={carta} emissiveIntensity={0.3} />
      </RoundedBox>
      {texture && (
        <mesh position={[0, 0, 0.0185]}>
          <planeGeometry args={[w - 0.04, h - 0.04]} />
          <meshStandardMaterial map={texture} transparent roughness={0.9} emissive="#ffffff" emissiveMap={texture} emissiveIntensity={0.5} />
        </mesh>
      )}
    </group>
  );
}
