"use client";

import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { disposeObject3D } from "@/experience/quality/qualityTiers";
import type { ResolvedQualityTier } from "@/experience/quality/stateTypes";
import {
  createBakunawaSerpentGroup,
  createRemontadaCharacterGroup,
} from "@/experience/reconstructions/BakunawaModels";
import {
  createHabulanBelfryGroup,
  createKenKenCharacterGroup,
  createNiningJoanCharacterGroup,
} from "@/experience/reconstructions/HabulanModels";
import {
  createManananggalCharacterGroup,
  createMythMayhemCardGroup,
} from "@/experience/reconstructions/MythMayhemModels";

export interface FourWorldsSceneProps {
  quality: ResolvedQualityTier;
  localProgress: number;
}

/**
 * Chapter 3: Original Worlds 3D Stage (Goal 2 & Goal 3)
 * Stages the game-specific 3D asset reconstructions for:
 * 1. Legend of Bakunawa: Chronicles of Babaylan (BAK-01 Bakunawa + BAK-02 The Remontada)
 * 2. Habulan: The Curse of the 5th Bell (HAB-01 Ken-Ken + HAB-02 Nining Joan + 5th Bell Belfry)
 * 3. Myth Mayhem (MYT-01 Manananggal + MYT-02 Interactive Card Slab)
 */
export function FourWorldsScene({
  quality,
  localProgress,
}: FourWorldsSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bakunawaRef = useRef<THREE.Group>(null);
  const habulanRef = useRef<THREE.Group>(null);
  const mythRef = useRef<THREE.Group>(null);

  const bakunawaGroup = useMemo(
    () => createBakunawaSerpentGroup(quality),
    [quality]
  );
  const remontadaGroup = useMemo(
    () => createRemontadaCharacterGroup(quality),
    [quality]
  );

  const belfryGroup = useMemo(
    () => createHabulanBelfryGroup(quality),
    [quality]
  );
  const kenKenGroup = useMemo(
    () => createKenKenCharacterGroup(quality),
    [quality]
  );
  const niningJoanGroup = useMemo(
    () => createNiningJoanCharacterGroup(quality),
    [quality]
  );

  const manananggalGroup = useMemo(
    () => createManananggalCharacterGroup(quality),
    [quality]
  );
  const mythCardGroup = useMemo(
    () => createMythMayhemCardGroup(quality),
    [quality]
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (bakunawaRef.current) {
      bakunawaRef.current.rotation.y =
        Math.sin(t * 0.5) * 0.22 + localProgress * 0.3;
    }
    if (habulanRef.current) {
      habulanRef.current.rotation.y =
        Math.sin(t * 0.45 + 1.0) * 0.18 - localProgress * 0.2;
    }
    if (mythRef.current) {
      mythRef.current.rotation.y =
        Math.sin(t * 0.55 + 2.0) * 0.25 + localProgress * 0.35;
    }
  });

  useEffect(() => {
    const currentGroup = groupRef.current;
    return () => {
      disposeObject3D(currentGroup);
      disposeObject3D(bakunawaGroup);
      disposeObject3D(remontadaGroup);
      disposeObject3D(belfryGroup);
      disposeObject3D(kenKenGroup);
      disposeObject3D(niningJoanGroup);
      disposeObject3D(manananggalGroup);
      disposeObject3D(mythCardGroup);
    };
  }, [
    bakunawaGroup,
    remontadaGroup,
    belfryGroup,
    kenKenGroup,
    niningJoanGroup,
    manananggalGroup,
    mythCardGroup,
  ]);

  return (
    <group ref={groupRef} name="SCENE_FOUR_WORLDS">
      {/* World 1: Legend of Bakunawa: Chronicles of Babaylan */}
      <group ref={bakunawaRef} position={[-2.6, 0.6, -2.2]} scale={0.78}>
        <pointLight color="#01BEF5" intensity={1.15} distance={8} decay={2} />
        <primitive object={bakunawaGroup} position={[0, 0.2, -0.3]} />
        <primitive object={remontadaGroup} position={[0.55, -0.15, 0.35]} scale={0.65} />
      </group>

      {/* World 2: Habulan: The Curse of the 5th Bell */}
      <group ref={habulanRef} position={[0, 0.75, -5.2]} scale={0.78}>
        <pointLight color="#FF6924" intensity={1.15} distance={8} decay={2} />
        <primitive object={belfryGroup} scale={0.75} />
        <primitive object={kenKenGroup} position={[-0.48, -0.1, 0.2]} scale={0.68} />
        <primitive object={niningJoanGroup} position={[0.48, -0.1, 0.2]} scale={0.68} />
      </group>

      {/* World 3: Myth Mayhem */}
      <group ref={mythRef} position={[2.6, 0.9, -7.8]} scale={0.78}>
        <pointLight color="#8A45CD" intensity={1.15} distance={8} decay={2} />
        <primitive object={mythCardGroup} position={[-0.52, 0, 0]} scale={0.72} />
        <primitive object={manananggalGroup} position={[0.52, 0.08, 0.15]} scale={0.72} />
      </group>
    </group>
  );
}
