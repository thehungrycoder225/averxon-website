"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { disposeObject3D } from "@/experience/quality/qualityTiers";
import type { ResolvedQualityTier } from "@/experience/quality/stateTypes";

export interface HeritageSceneProps {
  quality: ResolvedQualityTier;
  localProgress: number;
}

export function HeritageScene({ quality, localProgress }: HeritageSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const detail = quality === "HIGH" ? 2 : 1;

  useEffect(() => {
    const currentGroup = groupRef.current;
    return () => {
      disposeObject3D(currentGroup);
    };
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.4, 1.2]} name="SCENE_HERITAGE">
      {/* Pillar 01: Culture */}
      <group position={[-2.6, 0, 0.3]}>
        <mesh position={[0, -0.8, 0]}>
          <boxGeometry args={[1.1, 2.2, 0.6]} />
          <meshStandardMaterial color="#171B2A" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.85, 0]} rotation={[0, localProgress * Math.PI, 0]}>
          <octahedronGeometry args={[0.38, detail]} />
          <meshStandardMaterial
            color="#D8AE63"
            emissive="#D8AE63"
            emissiveIntensity={0.55}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
      </group>

      {/* Pillar 02: Creativity */}
      <group position={[0, 0.15, -0.2]}>
        <mesh position={[0, -0.8, 0]}>
          <boxGeometry args={[1.2, 2.5, 0.65]} />
          <meshStandardMaterial color="#211C35" metalness={0.55} roughness={0.35} />
        </mesh>
        <mesh position={[0, 1.0, 0]} rotation={[localProgress * 0.8, localProgress * 1.2, 0]}>
          <icosahedronGeometry args={[0.42, detail]} />
          <meshStandardMaterial
            color="#8056D9"
            emissive="#8056D9"
            emissiveIntensity={0.65}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* Pillar 03: Technology */}
      <group position={[2.6, 0, 0.3]}>
        <mesh position={[0, -0.8, 0]}>
          <boxGeometry args={[1.1, 2.2, 0.6]} />
          <meshStandardMaterial color="#171B2A" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.85, 0]} rotation={[0, -localProgress * Math.PI, 0.4]}>
          <dodecahedronGeometry args={[0.38, 0]} />
          <meshStandardMaterial
            color="#956DEB"
            emissive="#D8AE63"
            emissiveIntensity={0.45}
            wireframe={quality !== "LOW"}
          />
        </mesh>
      </group>
    </group>
  );
}
