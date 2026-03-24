"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Box, Text, Line, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export default function ArchitectureModules() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const modules = [
    { position: [4, 1, 2] as [number, number, number], title: "Intelligence Engine", color: "#00DBE9" },
    { position: [5, -2, -1] as [number, number, number], title: "Workflow Matrix", color: "#ADC7FF" },
    { position: [3, 3, -3] as [number, number, number], title: "Supreme Interface", color: "#D0BCFF" },
  ];

  return (
    <group ref={groupRef} position={[5, -4, 0]}>
      {modules.map((mod, idx) => (
        <group key={idx} position={mod.position}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <RoundedBox args={[2, 1.2, 0.1]} radius={0.05} smoothness={4}>
              <meshStandardMaterial 
                color="#0E0E0E" 
                roughness={0.1} 
                metalness={0.8} 
                transparent 
                opacity={0.8}
                envMapIntensity={2}
              />
            </RoundedBox>
            
            {/* Glowing Edge Wireframe */}
            <RoundedBox args={[2.02, 1.22, 0.12]} radius={0.05} smoothness={4}>
              <meshBasicMaterial color={mod.color} wireframe transparent opacity={0.3} />
            </RoundedBox>
            
            <Text
              position={[0, 0, 0.06]}
              fontSize={0.15}
              color={mod.color}
              anchorX="center"
              anchorY="middle"
            >
              {mod.title.toUpperCase()}
            </Text>
          </Float>

          {/* Connection line back to center */}
          <Line
            points={[[0, 0, 0], [-mod.position[0], -mod.position[1], -mod.position[2]]]}
            color={mod.color}
            lineWidth={1}
            transparent
            opacity={0.2}
          />
        </group>
      ))}
      
      {/* Central routing node for this cluster */}
      <mesh>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#414754" emissive="#414754" wireframe />
      </mesh>
    </group>
  );
}
