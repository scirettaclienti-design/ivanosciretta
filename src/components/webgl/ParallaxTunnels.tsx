"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ParallaxTunnels() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const meshRef2 = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    // Scatter 400 wireframe geometric shards along the Z axis from +15 down to -50
    for (let i = 0; i < 400; i++) {
        let x = (Math.random() - 0.5) * 50;
        let y = (Math.random() - 0.5) * 50;
        const z = 15 - Math.random() * 65; 
        
        // Carve out a tunnel (push particles away from center so camera passes through)
        if (Math.abs(x) < 3) x += Math.sign(x) * 3;
        if (Math.abs(y) < 3) y += Math.sign(y) * 3;
        
        const rotXSpeed = (Math.random() - 0.5) * 0.02;  
        const rotYSpeed = (Math.random() - 0.5) * 0.02;  
        
        temp.push({ x, y, z, rotXSpeed, rotYSpeed, rx: Math.random() * Math.PI, ry: Math.random() * Math.PI });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (meshRef.current && meshRef2.current) {
        particles.forEach((p, i) => {
            p.rx += p.rotXSpeed;
            p.ry += p.rotYSpeed;
            
            dummy.position.set(p.x, p.y, p.z);
            dummy.rotation.set(p.rx, p.ry, 0);
            
            // Randomly assign slight scale variation
            const scale = 1 + (i % 3) * 0.5;
            dummy.scale.set(scale, scale, scale);
            
            dummy.updateMatrix();
            
            if (i % 2 === 0) {
              meshRef.current?.setMatrixAt(Math.floor(i / 2), dummy.matrix);
            } else {
              meshRef2.current?.setMatrixAt(Math.floor(i / 2), dummy.matrix);
            }
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
        meshRef2.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Cyan wireframe data streams */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, 200]}>
        <icosahedronGeometry args={[0.4, 0]} />
        <meshBasicMaterial color="#00DBE9" transparent opacity={0.15} wireframe />
      </instancedMesh>
      
      {/* Deep blue solid data fragments */}
      <instancedMesh ref={meshRef2} args={[undefined, undefined, 200]}>
        <octahedronGeometry args={[0.15, 0]} />
        <meshBasicMaterial color="#ADC7FF" transparent opacity={0.4} />
      </instancedMesh>
    </group>
  );
}
