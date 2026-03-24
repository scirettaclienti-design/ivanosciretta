"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, QuadraticBezierLine, Sphere } from "@react-three/drei";
import * as THREE from "three";

export default function JourneyTimeline3D() {
  const lineRef = useRef<any>(null);

  useFrame((state) => {
    if (lineRef.current?.material) {
      // Create a pulsing dash offset for the timeline curve
      lineRef.current.material.dashOffset -= 0.01;
    }
  });

  const nodes = [
    { position: [-2, 4, 0] as [number, number, number], year: "2024" },
    { position: [2, 0, 2] as [number, number, number], year: "2025" },
    { position: [-1, -4, 4] as [number, number, number], year: "2026" },
  ];

  return (
    <group position={[0, -20, 0]}> {/* Positioned further down for the scroll segment */}
      {/* Path curve representing the journey */}
      <QuadraticBezierLine
        ref={lineRef}
        start={[-3, 6, -2]}
        end={[-1, -6, 6]}
        mid={[5, 0, 2]}
        color="#00DBE9"
        lineWidth={2}
        dashed
        dashScale={50}
        dashSize={5}
        dashOffset={0}
        opacity={0.5}
        transparent
      />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        {nodes.map((node, i) => (
          <group key={i} position={node.position}>
            {/* Glowing Milestone Node */}
            <Sphere args={[0.3, 32, 32]}>
              <meshStandardMaterial 
                color="#00DBE9"
                emissive="#00DBE9"
                emissiveIntensity={1.5}
                roughness={0.2} 
                metalness={0.8}
              />
            </Sphere>
            {/* Ambient aura */}
            <Sphere args={[0.6, 16, 16]}>
              <meshBasicMaterial 
                color="#00DBE9"
                transparent
                opacity={0.1}
                wireframe
              />
            </Sphere>
          </group>
        ))}
      </Float>
      
      {/* Dynamic ambient highlight */}
      <pointLight position={[0, 0, 0]} distance={15} intensity={1} color="#ADC7FF" />
    </group>
  );
}
