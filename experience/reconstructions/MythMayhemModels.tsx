"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { disposeObject3D } from "@/experience/quality/qualityTiers";
import type { ResolvedQualityTier } from "@/experience/quality/stateTypes";

/**
 * Asset MYT-01 — Pure Three.js factory for the Manananggal (Night Hunter Faction).
 * Grounded in `image reference/myth-mayhem-manananggal.png` & `myth-mayhem-manananggal_3D_View.png`:
 * - Pale lavender-rose upper torso, cascading dark wavy hair, red hibiscus flower & 3 gold hairpins
 * - Articulated left and right crimson scalloped bat wings
 * - Gold-and-maroon armored bodice with glowing crimson viscera core at severed waist
 * - Two 3D helical spiraling cream-and-crimson ribbons with gold diamond medallions
 */
export function createManananggalCharacterGroup(
  quality: ResolvedQualityTier = "HIGH"
): THREE.Group {
  const group = new THREE.Group();
  group.name = "ASSET_MYT_01_MANANANGGAL";
  const seg = quality === "LOW" ? 10 : 18;
  const tubeSeg = quality === "LOW" ? 28 : 52;

  const skinMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#DFB8C8"),
    roughness: 0.48,
  });
  const hairMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#1E1224"),
    roughness: 0.65,
  });
  const wingCrimsonMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#9E133E"),
    emissive: new THREE.Color("#580822"),
    emissiveIntensity: 0.35,
    roughness: 0.42,
    metalness: 0.18,
    side: THREE.DoubleSide,
  });
  const bodiceCreamMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#EADCE6"),
    roughness: 0.45,
  });
  const goldTrimMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#FDB001"),
    emissive: new THREE.Color("#D97706"),
    emissiveIntensity: 0.3,
    roughness: 0.25,
    metalness: 0.85,
  });
  const hibiscusRedMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#E11D48"),
    emissive: new THREE.Color("#9F1239"),
    emissiveIntensity: 0.4,
    roughness: 0.35,
  });
  const visceraGlowMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#FB7185"),
    emissive: new THREE.Color("#E11D48"),
    emissiveIntensity: 1.65,
    roughness: 0.2,
  });

  // Head, Cascading Dark Hair, Red Hibiscus & 3 Gold Hairpins
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, seg, seg),
    skinMat
  );
  head.position.set(0, 0.78, 0.02);

  const hairVolume = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.28, 0.58, seg),
    hairMat
  );
  hairVolume.position.set(0, 0.62, -0.06);

  // Red Hibiscus on viewer's left temple (character's right side)
  const hibiscus = new THREE.Mesh(
    new THREE.CylinderGeometry(0.068, 0.068, 0.02, 5),
    hibiscusRedMat
  );
  hibiscus.rotation.x = Math.PI * 0.45;
  hibiscus.position.set(-0.085, 0.86, 0.11);

  // 3 Gold Hairpins radiating from hibiscus
  for (let i = 0; i < 3; i++) {
    const pin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.006, 0.006, 0.16, 6),
      goldTrimMat
    );
    const angle = 0.35 + i * 0.28;
    pin.position.set(
      -0.13 - i * 0.025,
      0.94 - i * 0.02,
      0.08
    );
    pin.rotation.z = angle;
    group.add(pin);
  }

  // Gold circular drop earrings
  const earringGeo = new THREE.TorusGeometry(0.024, 0.006, 8, 16);
  const leftEarring = new THREE.Mesh(earringGeo, goldTrimMat);
  leftEarring.position.set(-0.13, 0.72, 0.04);
  const rightEarring = leftEarring.clone();
  rightEarring.position.set(0.13, 0.72, 0.04);

  group.add(head, hairVolume, hibiscus, leftEarring, rightEarring);

  // Upper Torso & Gold-Trimmed Bodice + Glowing Crimson Viscera Core
  const bodice = new THREE.Mesh(
    new THREE.CylinderGeometry(0.145, 0.105, 0.32, seg),
    bodiceCreamMat
  );
  bodice.position.set(0, 0.44, 0.02);

  const goldCorsetBelt = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.112, 0.09, seg),
    goldTrimMat
  );
  goldCorsetBelt.position.set(0, 0.36, 0.02);

  const visceraCore = new THREE.Mesh(
    new THREE.ConeGeometry(0.11, 0.28, seg),
    visceraGlowMat
  );
  visceraCore.rotation.x = Math.PI;
  visceraCore.position.set(0, 0.16, 0.02);

  group.add(bodice, goldCorsetBelt, visceraCore);

  // Articulated Left & Right Bat Wings
  const createBatWing = (side: -1 | 1, name: string) => {
    const wingPivot = new THREE.Group();
    wingPivot.name = name;
    wingPivot.position.set(side * 0.12, 0.56, -0.08);

    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.quadraticCurveTo(side * 0.35, 0.32, side * 0.68, 0.24);
    wingShape.quadraticCurveTo(side * 0.85, 0.02, side * 0.96, -0.32);
    wingShape.quadraticCurveTo(side * 0.68, -0.12, side * 0.52, -0.36);
    wingShape.quadraticCurveTo(side * 0.32, -0.1, side * 0.18, -0.28);
    wingShape.quadraticCurveTo(side * 0.08, -0.08, 0, -0.05);

    const wingGeo = new THREE.ShapeGeometry(wingShape, 12);
    const wingMesh = new THREE.Mesh(wingGeo, wingCrimsonMat);
    wingPivot.add(wingMesh);

    const topStrut = new THREE.Mesh(
      new THREE.CylinderGeometry(0.014, 0.008, 0.72, 6),
      wingCrimsonMat
    );
    topStrut.rotation.z = -side * 1.18;
    topStrut.position.set(side * 0.34, 0.15, 0.01);
    wingPivot.add(topStrut);

    return wingPivot;
  };

  const leftWing = createBatWing(-1, "ManananggalLeftWing");
  const rightWing = createBatWing(1, "ManananggalRightWing");
  group.add(leftWing, rightWing);

  // Two Helical Spiraling Cream & Crimson Ribbons (forming the lower silhouette)
  const ribbonCurveA = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.22, 0.36, 0.04),
    new THREE.Vector3(-0.34, 0.04, 0.12),
    new THREE.Vector3(0.24, -0.26, 0.08),
    new THREE.Vector3(-0.22, -0.58, -0.05),
    new THREE.Vector3(0.14, -0.86, 0.04),
    new THREE.Vector3(0.0, -1.04, 0.0),
  ]);
  const ribbonCurveB = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.22, 0.36, -0.02),
    new THREE.Vector3(0.32, 0.02, -0.08),
    new THREE.Vector3(-0.2, -0.28, -0.06),
    new THREE.Vector3(0.2, -0.6, 0.06),
    new THREE.Vector3(-0.1, -0.88, -0.02),
    new THREE.Vector3(0.0, -1.04, 0.0),
  ]);

  const ribbonGeoA = new THREE.TubeGeometry(ribbonCurveA, tubeSeg, 0.048, 6, false);
  const ribbonGeoB = new THREE.TubeGeometry(ribbonCurveB, tubeSeg, 0.042, 6, false);
  ribbonGeoA.scale(1.4, 1, 0.35);
  ribbonGeoB.scale(1.3, 1, 0.35);

  const ribbonMeshA = new THREE.Mesh(ribbonGeoA, bodiceCreamMat);
  const ribbonMeshB = new THREE.Mesh(ribbonGeoB, wingCrimsonMat);
  group.add(ribbonMeshA, ribbonMeshB);

  return group;
}

/**
 * Asset MYT-02 — Pure Three.js factory for the Myth Mayhem Interactive 3D Card Slab.
 * Grounded in `image reference/myth-mayhem-card.png` (1067×1474):
 * - 3D metallic gold filigree beveled outer frame
 * - Raised top-left Cost '4' diamond bezel & top-right Night Hunter crescent moon ring
 * - Raised bottom-left Attack '3' plate, center violet bat crest, and bottom-right Defense '5' plate
 */
export function createMythMayhemCardGroup(
  quality: ResolvedQualityTier = "HIGH"
): THREE.Group {
  const group = new THREE.Group();
  group.name = "ASSET_MYT_02_CARD_DISPLAY";
  const seg = quality === "LOW" ? 12 : 24;

  // Card dimensions preserving 1067 : 1474 aspect ratio (1.45 x 2.00)
  const cardW = 1.45;
  const cardH = 2.0;
  const cardDepth = 0.045;

  const slabMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#1A102B"),
    roughness: 0.35,
    metalness: 0.65,
  });
  const goldFrameMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#FDB001"),
    emissive: new THREE.Color("#B45309"),
    emissiveIntensity: 0.35,
    roughness: 0.22,
    metalness: 0.88,
  });
  const violetCrestMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#A855F7"),
    emissive: new THREE.Color("#8A45CD"),
    emissiveIntensity: 0.85,
    roughness: 0.25,
    metalness: 0.5,
  });
  const crimsonBadgeMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#991B1B"),
    emissive: new THREE.Color("#DC2626"),
    emissiveIntensity: 0.35,
    roughness: 0.3,
    metalness: 0.6,
  });
  const cobaltBadgeMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#1E40AF"),
    emissive: new THREE.Color("#01BEF5"),
    emissiveIntensity: 0.35,
    roughness: 0.3,
    metalness: 0.6,
  });

  // Main Card Core Slab
  const coreSlab = new THREE.Mesh(
    new THREE.BoxGeometry(cardW, cardH, cardDepth),
    slabMat
  );
  group.add(coreSlab);

  // 3D Raised Gold Frame Borders (Top, Bottom, Left, Right)
  const borderT = new THREE.Mesh(
    new THREE.BoxGeometry(cardW + 0.05, 0.055, cardDepth + 0.018),
    goldFrameMat
  );
  borderT.position.set(0, cardH * 0.5, 0);
  const borderB = borderT.clone();
  borderB.position.set(0, -cardH * 0.5, 0);

  const borderL = new THREE.Mesh(
    new THREE.BoxGeometry(0.055, cardH + 0.05, cardDepth + 0.018),
    goldFrameMat
  );
  borderL.position.set(-cardW * 0.5, 0, 0);
  const borderR = borderL.clone();
  borderR.position.set(cardW * 0.5, 0, 0);

  group.add(borderT, borderB, borderL, borderR);

  // Top-Left Cost '4' Raised Diamond Bezel
  const costDiamond = new THREE.Mesh(
    new THREE.BoxGeometry(0.28, 0.28, 0.025),
    goldFrameMat
  );
  costDiamond.rotation.z = Math.PI * 0.25;
  costDiamond.position.set(-0.52, 0.8, cardDepth * 0.5 + 0.008);

  // Top-Right Night Hunter Crescent Moon Ring Bezel
  const moonRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.145, 0.018, 10, seg),
    goldFrameMat
  );
  moonRing.position.set(0.55, 0.82, cardDepth * 0.5 + 0.012);

  // Bottom-Left Attack '3' & Bottom-Right Defense '5' Raised Stat Plates
  const attackPlate = new THREE.Mesh(
    new THREE.BoxGeometry(0.38, 0.19, 0.02),
    crimsonBadgeMat
  );
  attackPlate.position.set(-0.42, -0.82, cardDepth * 0.5 + 0.006);

  const defensePlate = new THREE.Mesh(
    new THREE.BoxGeometry(0.38, 0.19, 0.02),
    cobaltBadgeMat
  );
  defensePlate.position.set(0.42, -0.82, cardDepth * 0.5 + 0.006);

  // Center Bat Crest Emblem Gem + Backplate Faction Seal
  const centerGem = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.075, 0),
    violetCrestMat
  );
  centerGem.position.set(0, -0.74, cardDepth * 0.5 + 0.015);

  const backSealRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.38, 0.022, 10, seg),
    goldFrameMat
  );
  backSealRing.position.set(0, 0, -cardDepth * 0.5 - 0.008);

  const backSealCore = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.18, 0),
    violetCrestMat
  );
  backSealCore.scale.set(1, 1.4, 0.3);
  backSealCore.position.set(0, 0, -cardDepth * 0.5 - 0.01);

  group.add(
    costDiamond,
    moonRing,
    attackPlate,
    defensePlate,
    centerGem,
    backSealRing,
    backSealCore
  );

  return group;
}

export interface MythMayhemWorldSceneProps {
  quality: ResolvedQualityTier;
  focusMode?: "both" | "card" | "manananggal";
  rotationY?: number;
  autoRotate?: boolean;
}

export function MythMayhemWorldScene({
  quality,
  focusMode = "both",
  rotationY = 0,
  autoRotate = true,
}: MythMayhemWorldSceneProps) {
  const cardGroupRef = useRef<THREE.Group>(null);
  const charGroupRef = useRef<THREE.Group>(null);
  const [pointerTilt, setPointerTilt] = useState<[number, number]>([0, 0]);

  const manananggalCore = useMemo(
    () => createManananggalCharacterGroup(quality),
    [quality]
  );
  const cardCore = useMemo(
    () => createMythMayhemCardGroup(quality),
    [quality]
  );

  const [
    cardTex,
    manananggalFrontTex,
    turnFrontTex,
    turnSideTex,
    turnBackTex,
  ] = useLoader(THREE.TextureLoader, [
    "/assets/games/myth-mayhem/posters/myth-mayhem-card.png",
    "/assets/games/myth-mayhem/references/myth-mayhem-manananggal.png",
    "/assets/games/myth-mayhem/textures/manananggal-turn-front.png",
    "/assets/games/myth-mayhem/textures/manananggal-turn-side.png",
    "/assets/games/myth-mayhem/textures/manananggal-turn-back.png",
  ]);

  useEffect(() => {
    for (const tex of [
      cardTex,
      manananggalFrontTex,
      turnFrontTex,
      turnSideTex,
      turnBackTex,
    ]) {
      if (tex) {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.needsUpdate = true;
      }
    }
  }, [
    cardTex,
    manananggalFrontTex,
    turnFrontTex,
    turnSideTex,
    turnBackTex,
  ]);

  useEffect(() => {
    return () => {
      disposeObject3D(manananggalCore);
      disposeObject3D(cardCore);
    };
  }, [manananggalCore, cardCore]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Wing-beat & floating animation on Manananggal
    const leftWing = manananggalCore.getObjectByName("ManananggalLeftWing");
    const rightWing = manananggalCore.getObjectByName("ManananggalRightWing");
    if (leftWing && rightWing) {
      const flap = Math.sin(t * 2.6) * 0.22;
      leftWing.rotation.y = flap;
      rightWing.rotation.y = -flap;
    }

    const baseRotY = autoRotate
      ? rotationY + Math.sin(t * 0.65) * 0.28
      : rotationY;

    if (cardGroupRef.current) {
      cardGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        cardGroupRef.current.rotation.y,
        baseRotY + pointerTilt[0] * 0.38,
        Math.min(1, delta * 8)
      );
      cardGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        cardGroupRef.current.rotation.x,
        pointerTilt[1] * 0.25,
        Math.min(1, delta * 8)
      );
      cardGroupRef.current.position.y = Math.sin(t * 1.6) * 0.035;
    }

    if (charGroupRef.current) {
      charGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        charGroupRef.current.rotation.y,
        baseRotY,
        Math.min(1, delta * 8)
      );
      charGroupRef.current.position.y = Math.sin(t * 1.9 + 0.8) * 0.04;
    }
  });

  const showCard = focusMode === "both" || focusMode === "card";
  const showChar = focusMode === "both" || focusMode === "manananggal";
  const cardX = focusMode === "both" ? -0.78 : 0;
  const charX = focusMode === "both" ? 0.72 : 0;

  return (
    <group
      onPointerMove={(e) => {
        e.stopPropagation();
        const nx = Math.max(-1, Math.min(1, e.point.x));
        const ny = Math.max(-1, Math.min(1, e.point.y));
        setPointerTilt([nx, -ny]);
      }}
      onPointerOut={() => setPointerTilt([0, 0])}
    >
      {/* Arcane Violet & Moonlit Rim Light */}
      <pointLight
        position={[0, 1.2, 1.5]}
        color="#01BEF5"
        intensity={1.35}
        distance={7}
      />
      <pointLight
        position={[0, -0.8, 1.2]}
        color="#8A45CD"
        intensity={1.45}
        distance={7}
      />

      {/* Asset MYT-02: Interactive 3D Card Display */}
      {showCard && (
        <group ref={cardGroupRef} position={[cardX, 0.02, 0.08]}>
          <primitive object={cardCore} />

          {/* Official Manananggal Card Face Texture */}
          <mesh position={[0, 0, 0.025]}>
            <planeGeometry args={[1.44, 1.99]} />
            <meshStandardMaterial
              map={cardTex}
              roughness={0.22}
              metalness={0.35}
            />
          </mesh>

          {/* Holographic Foil Sheen Layer */}
          <mesh position={[0, 0, 0.028]}>
            <planeGeometry args={[1.42, 1.97]} />
            <meshStandardMaterial
              color="#01BEF5"
              emissive="#8A45CD"
              emissiveIntensity={0.28}
              transparent
              opacity={0.12}
              roughness={0.08}
              metalness={0.95}
            />
          </mesh>
        </group>
      )}

      {/* Asset MYT-01: Reconstructed 3D Manananggal Character */}
      {showChar && (
        <group ref={charGroupRef} position={[charX, 0.04, 0.08]}>
          <primitive object={manananggalCore} scale={0.92} />

          {/* Front T-Pose High-Resolution Character Layer */}
          <mesh position={[0, -0.04, 0.14]}>
            <planeGeometry args={[1.52, 2.02]} />
            <meshStandardMaterial
              map={manananggalFrontTex}
              transparent
              alphaTest={0.08}
              roughness={0.38}
            />
          </mesh>

          {/* Side Profile Turnaround Plane (visible at +/-90° side inspection) */}
          <mesh position={[0, -0.04, 0]} rotation={[0, Math.PI * 0.5, 0]}>
            <planeGeometry args={[0.72, 2.02]} />
            <meshStandardMaterial
              map={turnSideTex}
              transparent
              alphaTest={0.08}
              side={THREE.DoubleSide}
              roughness={0.42}
            />
          </mesh>

          {/* Back Turnaround Plane (visible at 180° rear inspection) */}
          <mesh position={[0, -0.04, -0.14]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[1.22, 2.02]} />
            <meshStandardMaterial
              map={turnBackTex}
              transparent
              alphaTest={0.08}
              roughness={0.42}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
