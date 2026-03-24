"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles, Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function AICore() {
  const coreRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      outerRingRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Ambient data particles around the core */}
      <Sparkles 
        count={200} 
        scale={10} 
        size={2} 
        speed={0.4} 
        opacity={0.4} 
        color="#00DBE9" 
      />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group ref={coreRef}>
          {/* Inner Energy Core */}
          <Sphere args={[1, 64, 64]}>
            <MeshDistortMaterial
              color="#ADC7FF"
              emissive="#00DBE9"
              emissiveIntensity={2}
              roughness={0.2}
              metalness={0.8}
              distort={0.4}
              speed={2}
            />
          </Sphere>

          {/* Outer Containment Ring */}
          <mesh ref={outerRingRef} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.8, 0.02, 16, 100]} />
            <meshStandardMaterial 
              color="#414754" 
              emissive="#00DBE9" 
              emissiveIntensity={0.5} 
              wireframe 
            />
          </mesh>

          <mesh rotation={[Math.PI / 2.5, 0, Math.PI / 4]}>
            <torusGeometry args={[2.2, 0.01, 16, 100]} />
            <meshStandardMaterial 
              color="#D0BCFF" 
              emissive="#D0BCFF" 
              emissiveIntensity={0.2} 
            />
          </mesh>
        </group>
      </Float>
      
      {/* Subtle Under-glow for the core */}
      <pointLight position={[0, 0, 0]} distance={10} intensity={2} color="#00DBE9" />
    </group>
  );
}
