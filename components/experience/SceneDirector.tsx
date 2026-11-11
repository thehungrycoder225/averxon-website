"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { interpolateCameraPose } from "@/experience/animation/chapterTimeline";
import type { ResolvedQualityTier } from "@/experience/quality/stateTypes";
import { AwakeningScene } from "@/experience/scenes/AwakeningScene";
import { HeritageScene } from "@/experience/scenes/HeritageScene";
import { FourWorldsScene } from "@/experience/scenes/FourWorldsScene";
import { MilestonesScene } from "@/experience/scenes/MilestonesScene";
import { CreationScene } from "@/experience/scenes/CreationScene";
import { FutureScene } from "@/experience/scenes/FutureScene";

export interface SceneDirectorProps {
  scrollProgress: number;
  quality: ResolvedQualityTier;
  creationStage?: "concept" | "sculpt" | "gameplay";
  onFpsSample?: (fps: number) => void;
}

export function SceneDirector({
  scrollProgress,
  quality,
  creationStage = "gameplay",
  onFpsSample,
}: SceneDirectorProps) {
  const { camera } = useThree();
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));
  const frameCounter = useRef({ frames: 0, elapsed: 0 });

  const pose = interpolateCameraPose(scrollProgress);

  useFrame((_, delta) => {
    camera.position.lerp(
      new THREE.Vector3(pose.position[0], pose.position[1], pose.position[2]),
      0.16
    );
    lookAtTarget.current.lerp(
      new THREE.Vector3(pose.lookAt[0], pose.lookAt[1], pose.lookAt[2]),
      0.16
    );
    camera.lookAt(lookAtTarget.current);

    if (camera instanceof THREE.PerspectiveCamera && camera.fov !== pose.fov) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, pose.fov, 0.12);
      camera.updateProjectionMatrix();
    }

    if (onFpsSample && delta > 0 && delta < 0.5) {
      frameCounter.current.frames += 1;
      frameCounter.current.elapsed += delta;
      if (frameCounter.current.elapsed >= 1.5) {
        const measuredFps =
          frameCounter.current.frames / frameCounter.current.elapsed;
        frameCounter.current.frames = 0;
        frameCounter.current.elapsed = 0;
        onFpsSample(measuredFps);
      }
    }
  });

  const showAwakening = scrollProgress <= 0.25;
  const showHeritage = scrollProgress >= 0.1 && scrollProgress <= 0.44;
  const showFourWorlds = scrollProgress >= 0.28 && scrollProgress <= 0.66;
  const showMilestones = scrollProgress >= 0.5 && scrollProgress <= 0.82;
  const showCreation = scrollProgress >= 0.68 && scrollProgress <= 0.94;
  const showFuture = scrollProgress >= 0.82;

  return (
    <>
      <ambientLight color="#151729" intensity={1.25} />
      <directionalLight
        position={[5, 6, 8]}
        color="#FDB001"
        intensity={1.45}
      />
      <pointLight
        position={[4, 2, -4]}
        color="#01BEF5"
        intensity={1.35}
        distance={24}
      />
      <pointLight
        position={[-4, 2, -6]}
        color="#8A45CD"
        intensity={1.25}
        distance={24}
      />

      {showAwakening && (
        <AwakeningScene
          quality={quality}
          localProgress={
            pose.activeChapter === "awakening" ? pose.chapterLocalProgress : 1
          }
        />
      )}
      {showHeritage && (
        <HeritageScene
          quality={quality}
          localProgress={
            pose.activeChapter === "heritage" ? pose.chapterLocalProgress : 0
          }
        />
      )}
      {showFourWorlds && (
        <FourWorldsScene
          quality={quality}
          localProgress={
            pose.activeChapter === "four-worlds" ? pose.chapterLocalProgress : 0
          }
        />
      )}
      {showMilestones && (
        <MilestonesScene
          quality={quality}
          localProgress={
            pose.activeChapter === "milestones" ? pose.chapterLocalProgress : 0
          }
        />
      )}
      {showCreation && (
        <CreationScene
          quality={quality}
          localProgress={
            pose.activeChapter === "creation" ? pose.chapterLocalProgress : 0
          }
          activeStage={creationStage}
        />
      )}
      {showFuture && (
        <FutureScene
          quality={quality}
          localProgress={
            pose.activeChapter === "future" ? pose.chapterLocalProgress : 0
          }
        />
      )}
    </>
  );
}
