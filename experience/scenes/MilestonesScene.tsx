"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { disposeObject3D } from "@/experience/quality/qualityTiers";
import type { ResolvedQualityTier } from "@/experience/quality/stateTypes";

export interface MilestonesSceneProps {
  quality: ResolvedQualityTier;
  localProgress: number;
}

const CONSTELLATION_NODES: [number, number, number][] = [
  [-2.2, 2.2, -10.5], // Level Up 2.0 Finalist
  [-0.7, 3.2, -11.5], // Level Up 3.0 Dual Finalist
  [0.8, 4.1, -12.5],  // Cyber Craft PH Partnership
  [2.2, 5.0, -13.5],  // PROPEL DOST Region IV-B Participant
];

export function MilestonesScene({ localProgress }: MilestonesSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const currentGroup = groupRef.current;
    return () => {
      disposeObject3D(currentGroup);
    };
  }, []);

  return (
    <group ref={groupRef} name="SCENE_MILESTONES">
      {CONSTELLATION_NODES.map((pos, index) => (
        <mesh
          key={index}
          position={pos}
          rotation={[localProgress * Math.PI, localProgress * 1.4, 0]}
        >
          <octahedronGeometry args={[0.32, 0]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#D8AE63" : "#956DEB"}
            emissive="#D8AE63"
            emissiveIntensity={0.75}
            metalness={0.85}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}
