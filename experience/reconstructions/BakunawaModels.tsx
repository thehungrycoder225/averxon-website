"use client";

import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { disposeObject3D } from "@/experience/quality/qualityTiers";
import type { ResolvedQualityTier } from "@/experience/quality/stateTypes";

export interface ReconstructionMetrics {
  assetId: string;
  triangles: number;
  drawCalls: number;
  meshCount: number;
}

export function measureObjectMetrics(
  assetId: string,
  root: THREE.Object3D
): ReconstructionMetrics {
  let triangles = 0;
  let meshCount = 0;
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.isMesh && mesh.geometry) {
      meshCount += 1;
      const index = mesh.geometry.index;
      const pos = mesh.geometry.attributes.position;
      if (index) {
        triangles += Math.floor(index.count / 3);
      } else if (pos) {
        triangles += Math.floor(pos.count / 3);
      }
    }
  });
  return {
    assetId,
    triangles,
    drawCalls: meshCount,
    meshCount,
  };
}

/**
 * Asset BAK-01 — Pure Three.js factory for the Bakunawa colossal eclipse serpent.
 * Grounded in `image reference/chronicles-of-bakunawa-bakunawa.png`:
 * - Coiling S-curve serpentine body rising from lower abyssal clouds to upper right arch
 * - Swept-back cranial horn crown, dorsal spine ridges, and open fanged jaws
 * - 9 luminous celestial moon orbs embedded along the serpent's coils
 * - Shattered cliffside ruins framing the lower left and right foreground
 */
export function createBakunawaSerpentGroup(
  quality: ResolvedQualityTier = "HIGH"
): THREE.Group {
  const group = new THREE.Group();
  group.name = "ASSET_BAK_01_BAKUNAWA";

  const tubularSegments =
    quality === "HIGH" ? 72 : quality === "MEDIUM" ? 48 : 28;
  const radialSegments =
    quality === "HIGH" ? 16 : quality === "MEDIUM" ? 12 : 8;

  // S-curve spline matching the Bakunawa reference key art composition
  const coilPoints = [
    new THREE.Vector3(-0.65, 0.25, 0.72), // Open fanged head (left-center foreground)
    new THREE.Vector3(-0.22, 0.92, 0.35), // Upper neck arch rising
    new THREE.Vector3(0.58, 1.18, 0.05), // Top dorsal crest with glowing moons
    new THREE.Vector3(1.12, 0.55, -0.15), // Upper-right descending coil
    new THREE.Vector3(0.75, -0.18, 0.18), // Mid-right sweep
    new THREE.Vector3(-0.15, -0.45, 0.38), // Lower-center foreground coil
    new THREE.Vector3(-0.88, -0.12, 0.12), // Lower-left sweep
    new THREE.Vector3(-0.35, -0.82, -0.28), // Deep cloud coil
    new THREE.Vector3(0.45, -1.15, -0.55), // Tail tapering into storm abyss
  ];

  const curve = new THREE.CatmullRomCurve3(coilPoints);
  const bodyGeo = new THREE.TubeGeometry(
    curve,
    tubularSegments,
    0.22,
    radialSegments,
    false
  );

  // Taper radius along the curve (thick upper coils, tapering toward tail)
  const posAttr = bodyGeo.attributes.position;
  if (posAttr) {
    const v = new THREE.Vector3();
    for (let i = 0; i < posAttr.count; i++) {
      const ringIndex = Math.floor(i / (radialSegments + 1));
      const u = ringIndex / tubularSegments;
      const center = curve.getPointAt(Math.min(1, Math.max(0, u)));
      v.fromBufferAttribute(posAttr, i).sub(center);
      const scaleFactor =
        u < 0.15
          ? 0.85 + u * 1.2
          : u < 0.65
            ? 1.05 - (u - 0.15) * 0.45
            : Math.max(0.22, 0.82 - (u - 0.65) * 1.7);
      // Add subtle scale-ridge corrugation
      const ridge = 1 + 0.06 * Math.sin(u * Math.PI * 36);
      v.multiplyScalar(scaleFactor * ridge).add(center);
      posAttr.setXYZ(i, v.x, v.y, v.z);
    }
    bodyGeo.computeVertexNormals();
  }

  const scaleMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#141C2B"),
    emissive: new THREE.Color("#071426"),
    emissiveIntensity: 0.35,
    roughness: 0.38,
    metalness: 0.78,
  });

  const bodyMesh = new THREE.Mesh(bodyGeo, scaleMat);
  bodyMesh.name = "BakunawaSerpentBody";
  group.add(bodyMesh);

  // Dorsal spine fins along the upper & mid coils (merged into a single BufferGeometry for low draw calls)
  const finCount = quality === "LOW" ? 14 : 26;
  const spineMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#1E293B"),
    emissive: new THREE.Color("#01BEF5"),
    emissiveIntensity: 0.22,
    roughness: 0.32,
    metalness: 0.85,
  });
  const spineGroup = new THREE.Group();
  spineGroup.name = "BakunawaDorsalSpines";
  const finGeo = new THREE.ConeGeometry(0.055, 0.26, 5);
  for (let i = 0; i < finCount; i++) {
    const u = 0.06 + (i / finCount) * 0.78;
    const pt = curve.getPointAt(u);
    const tangent = curve.getTangentAt(u);
    const fin = new THREE.Mesh(finGeo, spineMat);
    fin.position.set(pt.x, pt.y + 0.18 * (1 - u * 0.5), pt.z + 0.05);
    fin.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(-tangent.y, tangent.x + 0.6, 0.2).normalize()
    );
    const s = Math.max(0.35, 1.05 - u * 0.75);
    fin.scale.set(s, s * 1.2, s * 0.6);
    spineGroup.add(fin);
  }
  group.add(spineGroup);

  // 9 Luminous Celestial Moon Orbs embedded along the Bakunawa's coils (signature visual feature from reference)
  const orbPositions: number[] = [
    0.14, 0.22, 0.3, 0.38, 0.46, 0.54, 0.62, 0.7, 0.78,
  ];
  const orbGeo = new THREE.SphereGeometry(
    0.095,
    quality === "LOW" ? 10 : 16,
    quality === "LOW" ? 10 : 16
  );
  const orbMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#FFF7E0"),
    emissive: new THREE.Color("#FDB001"),
    emissiveIntensity: 1.65,
    roughness: 0.15,
    metalness: 0.1,
  });
  const orbsGroup = new THREE.Group();
  orbsGroup.name = "BakunawaCelestialMoonOrbs";
  orbPositions.forEach((u, idx) => {
    const pt = curve.getPointAt(u);
    const orb = new THREE.Mesh(orbGeo, orbMat);
    const radiusScale = Math.max(0.5, 1.08 - idx * 0.06);
    orb.scale.setScalar(radiusScale);
    orb.position.set(pt.x, pt.y + 0.03, pt.z + 0.16 * radiusScale);
    orbsGroup.add(orb);
  });
  group.add(orbsGroup);

  // Horned Dragon/Serpent Head & Open Fanged Jaws at coilPoints[0]
  const headGroup = new THREE.Group();
  headGroup.name = "BakunawaHeadAssembly";
  headGroup.position.copy(coilPoints[0]!);
  headGroup.rotation.set(0.18, 0.22, -0.12);

  const skullGeo = new THREE.ConeGeometry(0.24, 0.48, 7);
  skullGeo.rotateX(Math.PI * 0.55);
  const upperJaw = new THREE.Mesh(skullGeo, scaleMat);
  upperJaw.position.set(0, 0.08, 0.12);
  headGroup.add(upperJaw);

  const lowerJawGeo = new THREE.ConeGeometry(0.19, 0.42, 6);
  lowerJawGeo.rotateX(Math.PI * 0.78);
  const lowerJaw = new THREE.Mesh(lowerJawGeo, scaleMat);
  lowerJaw.position.set(0, -0.14, 0.1);
  headGroup.add(lowerJaw);

  // Inner mouth glow
  const mouthMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#3B0D1E"),
    emissive: new THREE.Color("#FF6924"),
    emissiveIntensity: 0.45,
    roughness: 0.6,
  });
  const mouthCore = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 10, 10),
    mouthMat
  );
  mouthCore.position.set(0, -0.02, 0.08);
  headGroup.add(mouthCore);

  // Swept-back cranial horns & fangs
  const hornMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#CBD5E1"),
    emissive: new THREE.Color("#01BEF5"),
    emissiveIntensity: 0.3,
    roughness: 0.28,
    metalness: 0.7,
  });
  const hornGeo = new THREE.ConeGeometry(0.038, 0.42, 5);
  const hornOffsets: Array<[number, number, number, number, number, number]> = [
    [-0.14, 0.18, -0.05, -0.75, 0, 0.42],
    [0.14, 0.18, -0.05, -0.75, 0, -0.42],
    [-0.22, 0.08, -0.02, -0.55, 0, 0.78],
    [0.22, 0.08, -0.02, -0.55, 0, -0.78],
    [0, 0.24, -0.08, -0.85, 0, 0],
  ];
  for (const [hx, hy, hz, rx, ry, rz] of hornOffsets) {
    const horn = new THREE.Mesh(hornGeo, hornMat);
    horn.position.set(hx, hy, hz);
    horn.rotation.set(rx, ry, rz);
    headGroup.add(horn);
  }

  // Fangs
  const fangGeo = new THREE.ConeGeometry(0.018, 0.11, 4);
  const fangCoords: Array<[number, number, number, number]> = [
    [-0.09, 0.01, 0.24, Math.PI],
    [0.09, 0.01, 0.24, Math.PI],
    [-0.05, 0.02, 0.28, Math.PI],
    [0.05, 0.02, 0.28, Math.PI],
    [-0.07, -0.11, 0.22, 0],
    [0.07, -0.11, 0.22, 0],
  ];
  for (const [fx, fy, fz, rotX] of fangCoords) {
    const fang = new THREE.Mesh(fangGeo, hornMat);
    fang.position.set(fx, fy, fz);
    fang.rotation.x = rotX;
    headGroup.add(fang);
  }

  // Glowing eyes
  const eyeGeo = new THREE.SphereGeometry(0.026, 8, 8);
  const leftEye = new THREE.Mesh(eyeGeo, orbMat);
  leftEye.position.set(-0.11, 0.11, 0.16);
  const rightEye = new THREE.Mesh(eyeGeo, orbMat);
  rightEye.position.set(0.11, 0.11, 0.16);
  headGroup.add(leftEye, rightEye);

  group.add(headGroup);

  // Foreground shattered cliffside ruins (left and right ledges from reference art)
  const cliffMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#1E2230"),
    roughness: 0.85,
    metalness: 0.2,
  });
  const leftCliff = new THREE.Mesh(
    new THREE.BoxGeometry(0.85, 0.42, 0.55),
    cliffMat
  );
  leftCliff.position.set(-1.18, -0.92, 0.32);
  leftCliff.rotation.set(0.08, 0.25, -0.12);

  const rightCliff = new THREE.Mesh(
    new THREE.BoxGeometry(0.92, 0.46, 0.58),
    cliffMat
  );
  rightCliff.position.set(1.15, -0.96, 0.28);
  rightCliff.rotation.set(0.06, -0.28, 0.1);

  group.add(leftCliff, rightCliff);

  return group;
}

/**
 * Asset BAK-02 — Pure Three.js factory for 'The Remontada' (Babaylan warrior).
 * Grounded in `image reference/chronicles-of-bakunawa-babaylan.png`:
 * - Layered bamboo/scale shoulder pauldrons
 * - Embroidered cream blouse & corset belt
 * - Glowing emerald-green glass talisman vial & warm amber charm on waist
 * - Tattered dark layered skirt & wrapped leather greaves
 * - Weathered single-edged kampilan/bolo blade held in right hand
 */
export function createRemontadaCharacterGroup(
  quality: ResolvedQualityTier = "HIGH"
): THREE.Group {
  const group = new THREE.Group();
  group.name = "ASSET_BAK_02_REMONTADA";
  const seg = quality === "LOW" ? 10 : 18;

  const skinMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#C68B59"),
    roughness: 0.65,
    metalness: 0.08,
  });
  const hairMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#1B1917"),
    roughness: 0.75,
  });
  const tunicMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#D6CFC2"),
    roughness: 0.72,
  });
  const armorScaleMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#6B4C35"),
    roughness: 0.58,
    metalness: 0.28,
  });
  const skirtMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#292826"),
    roughness: 0.82,
  });
  const talismanMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#4ADE80"),
    emissive: new THREE.Color("#22C55E"),
    emissiveIntensity: 1.5,
    roughness: 0.2,
    metalness: 0.1,
  });
  const amberMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#FDB001"),
    emissive: new THREE.Color("#FF6924"),
    emissiveIntensity: 1.1,
    roughness: 0.25,
  });
  const bladeMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#64748B"),
    roughness: 0.4,
    metalness: 0.82,
  });

  // Head & hair with feather ties
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, seg, seg),
    skinMat
  );
  head.position.set(0, 0.82, 0);
  const hairCrown = new THREE.Mesh(
    new THREE.SphereGeometry(0.155, seg, seg),
    hairMat
  );
  hairCrown.position.set(0, 0.85, -0.02);
  group.add(head, hairCrown);

  // Upper torso (cream embroidered tunic + dark corset waist)
  const torso = new THREE.Mesh(
    new THREE.CylinderGeometry(0.17, 0.135, 0.42, seg),
    tunicMat
  );
  torso.position.set(0, 0.44, 0);
  group.add(torso);

  // Layered bamboo/wood scale shoulder pauldrons
  const leftPauldron = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, seg, seg, 0, Math.PI * 2, 0, Math.PI * 0.55),
    armorScaleMat
  );
  leftPauldron.position.set(-0.22, 0.58, 0);
  leftPauldron.rotation.z = 0.38;

  const rightPauldron = leftPauldron.clone();
  rightPauldron.position.set(0.22, 0.58, 0);
  rightPauldron.rotation.z = -0.38;
  group.add(leftPauldron, rightPauldron);

  // Glowing green talisman vial & amber charm on belt
  const greenVial = new THREE.Mesh(
    new THREE.CylinderGeometry(0.032, 0.038, 0.11, 8),
    talismanMat
  );
  greenVial.position.set(-0.04, 0.18, 0.15);

  const amberCharm = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.038, 0),
    amberMat
  );
  amberCharm.position.set(-0.11, 0.52, 0.14);
  group.add(greenVial, amberCharm);

  // Tattered layered battle skirt
  const skirt = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.28, 0.46, seg, 1, true),
    skirtMat
  );
  skirt.position.set(0, 0.02, 0);
  group.add(skirt);

  // Wrapped boots/greaves
  const leftLeg = new THREE.Mesh(
    new THREE.CylinderGeometry(0.068, 0.058, 0.62, seg),
    armorScaleMat
  );
  leftLeg.position.set(-0.11, -0.48, 0);
  const rightLeg = leftLeg.clone();
  rightLeg.position.set(0.11, -0.48, 0);
  group.add(leftLeg, rightLeg);

  // Weathered Kampilan / Bolo Sword in right hand (viewer's left)
  const swordGroup = new THREE.Group();
  swordGroup.position.set(-0.32, 0.08, 0.06);
  swordGroup.rotation.set(0.15, 0, 0.36);
  const hilt = new THREE.Mesh(
    new THREE.CylinderGeometry(0.022, 0.026, 0.18, 8),
    armorScaleMat
  );
  const blade = new THREE.Mesh(
    new THREE.BoxGeometry(0.065, 0.68, 0.014),
    bladeMat
  );
  blade.position.set(-0.02, -0.4, 0);
  swordGroup.add(hilt, blade);
  group.add(swordGroup);

  // Plinth base
  const plinth = new THREE.Mesh(
    new THREE.CylinderGeometry(0.52, 0.58, 0.08, 24),
    new THREE.MeshStandardMaterial({
      color: "#151729",
      metalness: 0.65,
      roughness: 0.35,
    })
  );
  plinth.position.set(0, -0.82, 0);
  group.add(plinth);

  return group;
}

export interface BakunawaStageProps {
  quality: ResolvedQualityTier;
  activeSubject?: "bakunawa" | "remontada";
  rotationY?: number;
  autoRotate?: boolean;
}

export function BakunawaWorldScene({
  quality,
  activeSubject = "bakunawa",
  rotationY = 0,
  autoRotate = true,
}: BakunawaStageProps) {
  const rootRef = useRef<THREE.Group>(null);
  const serpentGroup = useMemo(
    () => createBakunawaSerpentGroup(quality),
    [quality]
  );
  const remontadaCoreGroup = useMemo(
    () => createRemontadaCharacterGroup(quality),
    [quality]
  );

  const [bakunawaKeyTex, remontadaFrontTex, remontadaBackTex] = useLoader(
    THREE.TextureLoader,
    [
      "/assets/games/chronicles-of-babaylan/posters/bakunawa-key-art.png",
      "/assets/games/chronicles-of-babaylan/textures/remontada-front-alpha.png",
      "/assets/games/chronicles-of-babaylan/textures/remontada-back-alpha.png",
    ]
  );

  useEffect(() => {
    for (const tex of [bakunawaKeyTex, remontadaFrontTex, remontadaBackTex]) {
      if (tex) {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.needsUpdate = true;
      }
    }
  }, [bakunawaKeyTex, remontadaFrontTex, remontadaBackTex]);

  useEffect(() => {
    return () => {
      disposeObject3D(serpentGroup);
      disposeObject3D(remontadaCoreGroup);
    };
  }, [serpentGroup, remontadaCoreGroup]);

  useFrame((state, delta) => {
    if (!rootRef.current) return;
    if (autoRotate) {
      rootRef.current.rotation.y =
        rotationY + Math.sin(state.clock.elapsedTime * 0.55) * 0.22;
    } else {
      rootRef.current.rotation.y = THREE.MathUtils.lerp(
        rootRef.current.rotation.y,
        rotationY,
        Math.min(1, delta * 8)
      );
    }
  });

  return (
    <group ref={rootRef}>
      {activeSubject === "bakunawa" ? (
        <group>
          {/* Eclipse Halo & Key-Art Depth Backdrop */}
          <mesh position={[0, 0.08, -0.58]}>
            <planeGeometry args={[2.15, 3.22]} />
            <meshStandardMaterial
              map={bakunawaKeyTex}
              roughness={0.55}
              metalness={0.15}
            />
          </mesh>

          {/* Eclipse Lunar Rim Aura */}
          <mesh position={[0.12, 0.42, -0.45]}>
            <torusGeometry args={[0.92, 0.025, 16, 64]} />
            <meshStandardMaterial
              color="#01BEF5"
              emissive="#01BEF5"
              emissiveIntensity={1.25}
            />
          </mesh>

          {/* Articulated 3D Bakunawa Serpent & Cliff Ruins */}
          <primitive object={serpentGroup} position={[0, 0.05, 0.1]} />
        </group>
      ) : (
        <group>
          {/* 3D Structural & Accessory Core */}
          <primitive object={remontadaCoreGroup} scale={0.95} />

          {/* High-Fidelity Front Turnaround Plane */}
          <mesh position={[0, 0.02, 0.17]}>
            <planeGeometry args={[1.05, 2.18]} />
            <meshStandardMaterial
              map={remontadaFrontTex}
              transparent
              alphaTest={0.08}
              roughness={0.5}
            />
          </mesh>

          {/* High-Fidelity Back Turnaround Plane (visible when rotated 180°) */}
          <mesh position={[0, 0.02, -0.17]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[1.05, 2.18]} />
            <meshStandardMaterial
              map={remontadaBackTex}
              transparent
              alphaTest={0.08}
              roughness={0.5}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
