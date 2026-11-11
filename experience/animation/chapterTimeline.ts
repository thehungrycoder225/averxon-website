import { CHAPTERS } from "@/content/chapters";
import type { ChapterId } from "@/content/schema";

export interface CameraPose {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
  activeChapter: ChapterId;
  chapterLocalProgress: number;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * (3 - 2 * clamped);
}

/**
 * Computes interpolated 3D camera pose and active chapter from normalized native scroll progress [0..1].
 * Never hijacks browser scroll; purely transforms normalized scroll position into camera coordinates.
 */
export function interpolateCameraPose(normalizedProgress: number): CameraPose {
  const p = Math.max(0, Math.min(1, normalizedProgress));

  const matchedChapter =
    CHAPTERS.find(
      (ch) => p >= ch.timelineMarkers.scrollStart && p <= ch.timelineMarkers.scrollEnd
    ) ?? CHAPTERS[CHAPTERS.length - 1]!;

  const { scrollStart, scrollEnd, cameraStartPos, cameraEndPos, cameraLookAt, fov } =
    matchedChapter.timelineMarkers;

  const span = Math.max(0.0001, scrollEnd - scrollStart);
  const rawLocal = (p - scrollStart) / span;
  const t = smoothstep(rawLocal);

  return {
    position: [
      lerp(cameraStartPos[0], cameraEndPos[0], t),
      lerp(cameraStartPos[1], cameraEndPos[1], t),
      lerp(cameraStartPos[2], cameraEndPos[2], t),
    ],
    lookAt: cameraLookAt,
    fov,
    activeChapter: matchedChapter.id,
    chapterLocalProgress: Math.max(0, Math.min(1, rawLocal)),
  };
}
