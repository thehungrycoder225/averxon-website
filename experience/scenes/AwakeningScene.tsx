"use client";

import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  QUALITY_TIER_BUDGETS,
  disposeObject3D,
} from "@/experience/quality/qualityTiers";
import type { ResolvedQualityTier } from "@/experience/quality/stateTypes";
import { createBakunawaSerpentGroup } from "@/experience/reconstructions/BakunawaModels";

export interface AwakeningSceneProps {
  quality: ResolvedQualityTier;
  localProgress: number;
}

/**
 * Chapter 1: Awakening WebGL Atmospheric Stage (Goal 2.4 & Goal 3)
 * Features the reconstructed Bakunawa Eclipse Serpent (Asset BAK-01) coiling around
 * the eclipsed moon in the right-hand visual stage (x = +3.9), ensuring zero geometry
 * or particles ever cross into the left 0%–52% Hero Text Safe Zone.
 */
export function AwakeningScene({
  quality,
  localProgress,
}: AwakeningSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const serpentRef = useRef<THREE.Group>(null);

  const budget = QUALITY_TIER_BUDGETS[quality];
  const segments = quality === "HIGH" ? 64 : quality === "MEDIUM" ? 40 : 24;

  const bakunawaSerpent = useMemo(
    () => createBakunawaSerpentGroup(quality),
    [quality]
  );

  const dustPositions = useMemo(() => {
    const count = budget.particleCount;
    if (count <= 0) return null;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = i * 2.399963229728653;
      const radius = 1.45 + ((i % 37) / 37) * 2.1;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = (((i * 13) % 53) / 53 - 0.5) * 3.6;
      arr[i * 3 + 2] = (((i * 7) % 29) / 29 - 0.5) * 2.4;
    }
    return arr;
  }, [budget.particleCount]);

  useFrame((state, delta) => {
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = localProgress * 0.55 + delta * 0.04;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -localProgress * 0.35;
    }
    if (serpentRef.current) {
      const t = state.clock.elapsedTime;
      serpentRef.current.rotation.y =
        Math.sin(t * 0.45) * 0.16 - localProgress * 0.25;
      serpentRef.current.position.y = Math.sin(t * 0.9) * 0.06;
    }
  });

  useEffect(() => {
    const currentGroup = groupRef.current;
    return () => {
      disposeObject3D(currentGroup);
      disposeObject3D(bakunawaSerpent);
    };
  }, [bakunawaSerpent]);

  return (
    <group
      ref={groupRef}
      position={[3.6, 0.0, -1.2]}
      scale={1.3}
      name="SCENE_AWAKENING"
    >
      {/* Abyssal Navy Eclipsed Moon Backdrop */}
      <mesh position={[0, 0, -0.35]}>
        <sphereGeometry args={[1.18, segments, segments]} />
        <meshStandardMaterial
          color="#030237"
          roughness={0.88}
          metalness={0.15}
        />
      </mesh>

      {/* Luminous Cyan Inner Lunar Rim (#01BEF5) */}
      <mesh ref={innerRingRef} position={[0, 0, -0.18]}>
        <torusGeometry args={[1.26, 0.035, 16, segments * 2]} />
        <meshStandardMaterial
          color="#01BEF5"
          emissive="#01BEF5"
          emissiveIntensity={budget.enableBloomCorona ? 1.15 : 0.65}
          roughness={0.25}
          metalness={0.8}
        />
      </mesh>

      {/* Arcane Violet & Solar Amber Outer Eclipse Aura Ring */}
      <mesh ref={outerRingRef} rotation={[0.28, -0.22, 0]}>
        <torusGeometry args={[1.65, 0.024, 12, segments * 2]} />
        <meshStandardMaterial
          color="#8A45CD"
          emissive="#FF6924"
          emissiveIntensity={0.65}
          roughness={0.35}
          metalness={0.65}
        />
      </mesh>

      {/* Reconstructed Asset BAK-01: Bakunawa Eclipse Serpent */}
      <group ref={serpentRef} scale={0.95} position={[0, 0.05, 0.12]}>
        <primitive object={bakunawaSerpent} />
      </group>

      {/* Quality-Tiered Atmospheric Motes (Confined to Right Visual Stage) */}
      {dustPositions && (
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[dustPositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#01BEF5"
            size={0.038}
            transparent
            opacity={0.65}
            sizeAttenuation
          />
        </points>
      )}
    </group>
  );
}
