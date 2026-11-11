"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { disposeObject3D } from "@/experience/quality/qualityTiers";
import type { ResolvedQualityTier } from "@/experience/quality/stateTypes";

export interface FutureSceneProps {
  quality: ResolvedQualityTier;
  localProgress: number;
}

export function FutureScene({ quality, localProgress }: FutureSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const gridDivisions = quality === "LOW" ? 12 : 24;

  useEffect(() => {
    const currentGroup = groupRef.current;
    return () => {
      disposeObject3D(currentGroup);
    };
  }, []);

  return (
    <group ref={groupRef} position={[0, 4.2, -23.0]} name="SCENE_FUTURE">
      {/* Horizon Vista Sun Rim */}
      <mesh position={[0, 1.2 + localProgress * 0.4, -3.0]}>
        <ringGeometry args={[2.2, 2.45, gridDivisions * 2]} />
        <meshBasicMaterial color="#D8AE63" side={THREE.DoubleSide} />
      </mesh>

      {/* Stylized Cultural Futurism Horizon Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
        <planeGeometry args={[28, 16, gridDivisions, gridDivisions]} />
        <meshStandardMaterial
          color="#211C35"
          emissive="#8056D9"
          emissiveIntensity={0.25}
          wireframe
        />
      </mesh>
    </group>
  );
}
