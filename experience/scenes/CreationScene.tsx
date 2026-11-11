"use client";

import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { disposeObject3D } from "@/experience/quality/qualityTiers";
import type { ResolvedQualityTier } from "@/experience/quality/stateTypes";
import { createRemontadaCharacterGroup } from "@/experience/reconstructions/BakunawaModels";
import { createNiningJoanCharacterGroup } from "@/experience/reconstructions/HabulanModels";
import {
  createManananggalCharacterGroup,
  createMythMayhemCardGroup,
} from "@/experience/reconstructions/MythMayhemModels";

export interface CreationSceneProps {
  quality: ResolvedQualityTier;
  localProgress: number;
  activeStage?: "concept" | "sculpt" | "gameplay";
}

/**
 * Chapter 5: Behind the Games — From Concept to 3D Turntable Stage
 * Displays the game-specific reconstructed 3D assets corresponding to each creative stage:
 * - Stage 01 (Concept Art): The Remontada (BAK-02)
 * - Stage 02 (Character Design): Manananggal 3-Angle Turnaround Model (MYT-01)
 * - Stage 03 (From Concept to 3D): Nining Joan (HAB-02) & Myth Mayhem Card Slab (MYT-02)
 */
export function CreationScene({
  quality,
  localProgress,
  activeStage = "gameplay",
}: CreationSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const turntableRef = useRef<THREE.Group>(null);
  const radialSegments = quality === "LOW" ? 16 : 32;

  const remontadaModel = useMemo(
    () => createRemontadaCharacterGroup(quality),
    [quality]
  );
  const manananggalModel = useMemo(
    () => createManananggalCharacterGroup(quality),
    [quality]
  );
  const niningJoanModel = useMemo(
    () => createNiningJoanCharacterGroup(quality),
    [quality]
  );
  const mythCardModel = useMemo(
    () => createMythMayhemCardGroup(quality),
    [quality]
  );

  useFrame((state) => {
    if (turntableRef.current) {
      turntableRef.current.rotation.y =
        localProgress * Math.PI * 2 + state.clock.elapsedTime * 0.45;
    }
  });

  useEffect(() => {
    const currentGroup = groupRef.current;
    return () => {
      disposeObject3D(currentGroup);
      disposeObject3D(remontadaModel);
      disposeObject3D(manananggalModel);
      disposeObject3D(niningJoanModel);
      disposeObject3D(mythCardModel);
    };
  }, [remontadaModel, manananggalModel, niningJoanModel, mythCardModel]);

  return (
    <group ref={groupRef} position={[0, 4.5, -15.5]} name="SCENE_CREATION">
      {/* Turntable Base Plinth */}
      <mesh position={[0, -0.85, 0]}>
        <cylinderGeometry args={[1.25, 1.4, 0.22, radialSegments]} />
        <meshStandardMaterial color="#151729" metalness={0.6} roughness={0.35} />
      </mesh>

      {/* Glowing Rim on Plinth */}
      <mesh position={[0, -0.73, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
        <torusGeometry args={[1.26, 0.02, 12, radialSegments * 2]} />
        <meshStandardMaterial
          color="#01BEF5"
          emissive="#01BEF5"
          emissiveIntensity={0.9}
        />
      </mesh>

      {/* Stage-Specific Reconstructed 3D Model */}
      <group ref={turntableRef} position={[0, 0.05, 0]}>
        {activeStage === "concept" && (
          <primitive object={remontadaModel} scale={0.85} />
        )}
        {activeStage === "sculpt" && (
          <primitive object={manananggalModel} scale={0.85} />
        )}
        {activeStage === "gameplay" && (
          <group>
            <primitive
              object={niningJoanModel}
              position={[-0.45, 0, 0]}
              scale={0.78}
            />
            <primitive
              object={mythCardModel}
              position={[0.52, 0.05, 0]}
              scale={0.68}
            />
          </group>
        )}
      </group>
    </group>
  );
}
