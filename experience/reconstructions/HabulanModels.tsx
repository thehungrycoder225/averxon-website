"use client";

import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { disposeObject3D } from "@/experience/quality/qualityTiers";
import type { ResolvedQualityTier } from "@/experience/quality/stateTypes";

/**
 * Asset HAB-01 — Pure Three.js factory for Character A (Ken-Ken) from Habulan.
 * Grounded in `image reference/habulan-ken-ken.jpg`:
 * - Spiky dark hair with white front streak + red/gold geometric headband & trailing left ribbons
 * - Yellow & black headphones with 'X' emblem around neck
 * - Red/black woven-pattern vest over white short-sleeve shirt with sun sleeve accents
 * - T-pose arms with red/black fingerless gloves
 * - Black cargo shorts with yellow sun belt pouch, yellow right thigh strap, knee pads, white socks, and chunky red/white/yellow high-top sneakers
 */
export function createKenKenCharacterGroup(
  quality: ResolvedQualityTier = "HIGH"
): THREE.Group {
  const group = new THREE.Group();
  group.name = "ASSET_HAB_01_KEN_KEN";
  const seg = quality === "LOW" ? 10 : 18;

  const skinMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#F0B088"),
    roughness: 0.55,
  });
  const hairDarkMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#261C21"),
    roughness: 0.65,
  });
  const hairWhiteMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#F5F0EB"),
    roughness: 0.5,
  });
  const redFabricMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#D9232E"),
    roughness: 0.52,
  });
  const goldAccentMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#FDB001"),
    emissive: new THREE.Color("#FDB001"),
    emissiveIntensity: 0.25,
    roughness: 0.35,
    metalness: 0.45,
  });
  const darkSlateMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#232028"),
    roughness: 0.68,
  });
  const whiteClothMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#F4F3F8"),
    roughness: 0.6,
  });

  // Head & Neck
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.155, seg, seg),
    skinMat
  );
  head.position.set(0, 0.72, 0);

  // Headband (red with gold trim) + trailing ribbons on viewer's left
  const headband = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.158, 0.055, seg),
    redFabricMat
  );
  headband.position.set(0, 0.79, 0);

  const ribbonUpper = new THREE.Mesh(
    new THREE.BoxGeometry(0.28, 0.048, 0.018),
    redFabricMat
  );
  ribbonUpper.position.set(-0.24, 0.72, -0.04);
  ribbonUpper.rotation.z = 0.22;

  const ribbonTip = new THREE.Mesh(
    new THREE.BoxGeometry(0.09, 0.048, 0.02),
    goldAccentMat
  );
  ribbonTip.position.set(-0.36, 0.69, -0.04);
  ribbonTip.rotation.z = 0.22;

  // Spiky hair volume (dark + signature white front-left spikes)
  const hairBase = new THREE.Mesh(
    new THREE.SphereGeometry(0.168, seg, seg),
    hairDarkMat
  );
  hairBase.position.set(0, 0.83, -0.02);

  const spikeGeo = new THREE.ConeGeometry(0.055, 0.18, 5);
  const darkSpikeCoords: Array<[number, number, number, number, number]> = [
    [0.06, 0.96, 0, -0.15, -0.25],
    [0.14, 0.91, -0.02, -0.1, -0.58],
    [0, 0.94, -0.1, -0.55, 0],
    [-0.08, 0.9, -0.12, -0.62, 0.3],
    [0.08, 0.9, -0.12, -0.62, -0.3],
  ];
  for (const [sx, sy, sz, rx, rz] of darkSpikeCoords) {
    const sp = new THREE.Mesh(spikeGeo, hairDarkMat);
    sp.position.set(sx, sy, sz);
    sp.rotation.set(rx, 0, rz);
    group.add(sp);
  }

  const whiteSpikeCoords: Array<[number, number, number, number, number]> = [
    [-0.06, 0.96, 0.04, 0.2, 0.32],
    [-0.14, 0.9, 0.03, 0.15, 0.68],
    [-0.01, 0.92, 0.08, 0.35, 0.12],
  ];
  for (const [sx, sy, sz, rx, rz] of whiteSpikeCoords) {
    const sp = new THREE.Mesh(spikeGeo, hairWhiteMat);
    sp.position.set(sx, sy, sz);
    sp.rotation.set(rx, 0, rz);
    group.add(sp);
  }

  group.add(head, headband, ribbonUpper, ribbonTip, hairBase);

  // Yellow & Black X-Headphones around neck
  const leftEarCup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.062, 0.062, 0.045, 12),
    goldAccentMat
  );
  leftEarCup.rotation.x = Math.PI * 0.5;
  leftEarCup.position.set(-0.075, 0.54, 0.11);
  const rightEarCup = leftEarCup.clone();
  rightEarCup.position.set(0.075, 0.54, 0.11);
  group.add(leftEarCup, rightEarCup);

  // Upper Torso: Red & gold patterned vest over dark/white inner shirt
  const vestTorso = new THREE.Mesh(
    new THREE.CylinderGeometry(0.175, 0.15, 0.38, seg),
    redFabricMat
  );
  vestTorso.position.set(0, 0.36, 0);

  const innerShirtStrip = new THREE.Mesh(
    new THREE.BoxGeometry(0.11, 0.36, 0.31),
    darkSlateMat
  );
  innerShirtStrip.position.set(0, 0.35, 0.01);
  group.add(vestTorso, innerShirtStrip);

  // T-Pose Sleeves, Arms & Fingerless Gloves
  const leftSleeve = new THREE.Mesh(
    new THREE.CylinderGeometry(0.075, 0.068, 0.22, seg),
    whiteClothMat
  );
  leftSleeve.rotation.z = Math.PI * 0.5;
  leftSleeve.position.set(-0.27, 0.47, 0);

  const rightSleeve = leftSleeve.clone();
  rightSleeve.position.set(0.27, 0.47, 0);

  const leftArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.038, 0.34, seg),
    skinMat
  );
  leftArm.rotation.z = Math.PI * 0.5;
  leftArm.position.set(-0.48, 0.47, 0);

  const rightArm = leftArm.clone();
  rightArm.position.set(0.48, 0.47, 0);

  const leftGlove = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.065, 0.07),
    darkSlateMat
  );
  leftGlove.position.set(-0.66, 0.47, 0);
  const rightGlove = leftGlove.clone();
  rightGlove.position.set(0.66, 0.47, 0);

  group.add(leftSleeve, rightSleeve, leftArm, rightArm, leftGlove, rightGlove);

  // Belt, Sun Pouch (viewer's left hip), Red Sash, and Black Cargo Shorts
  const belt = new THREE.Mesh(
    new THREE.CylinderGeometry(0.156, 0.16, 0.055, seg),
    redFabricMat
  );
  belt.position.set(0, 0.14, 0);

  const sunPouch = new THREE.Mesh(
    new THREE.BoxGeometry(0.11, 0.15, 0.065),
    goldAccentMat
  );
  sunPouch.position.set(-0.15, 0.05, 0.11);
  sunPouch.rotation.z = -0.14;

  const leftShortLeg = new THREE.Mesh(
    new THREE.CylinderGeometry(0.095, 0.105, 0.34, seg),
    darkSlateMat
  );
  leftShortLeg.position.set(-0.1, -0.05, 0);
  leftShortLeg.rotation.z = -0.08;

  const rightShortLeg = leftShortLeg.clone();
  rightShortLeg.position.set(0.1, -0.05, 0);
  rightShortLeg.rotation.z = 0.08;

  // Yellow strap on viewer's left cargo short leg
  const yellowLegStrap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.108, 0.108, 0.048, seg),
    goldAccentMat
  );
  yellowLegStrap.position.set(-0.115, -0.15, 0);
  yellowLegStrap.rotation.z = -0.08;

  group.add(belt, sunPouch, leftShortLeg, rightShortLeg, yellowLegStrap);

  // Knee Pads, Lower Legs, Socks & Red-White-Yellow High-Top Sneakers
  const kneePadGeo = new THREE.BoxGeometry(0.11, 0.12, 0.12);
  const leftKnee = new THREE.Mesh(kneePadGeo, darkSlateMat);
  leftKnee.position.set(-0.13, -0.26, 0.02);
  const rightKnee = leftKnee.clone();
  rightKnee.position.set(0.13, -0.26, 0.02);

  const leftCalf = new THREE.Mesh(
    new THREE.CylinderGeometry(0.058, 0.05, 0.32, seg),
    skinMat
  );
  leftCalf.position.set(-0.14, -0.44, 0);
  const rightCalf = leftCalf.clone();
  rightCalf.position.set(0.14, -0.44, 0);

  const leftSneaker = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.16, 0.28),
    redFabricMat
  );
  leftSneaker.position.set(-0.15, -0.68, 0.04);
  const rightSneaker = leftSneaker.clone();
  rightSneaker.position.set(0.15, -0.68, 0.04);

  const leftSole = new THREE.Mesh(
    new THREE.BoxGeometry(0.175, 0.05, 0.3),
    whiteClothMat
  );
  leftSole.position.set(-0.15, -0.76, 0.04);
  const rightSole = leftSole.clone();
  rightSole.position.set(0.15, -0.76, 0.04);

  group.add(
    leftKnee,
    rightKnee,
    leftCalf,
    rightCalf,
    leftSneaker,
    rightSneaker,
    leftSole,
    rightSole
  );

  return group;
}

/**
 * Asset HAB-02 — Pure Three.js factory for Character B (Nining Joan) from Habulan.
 * Grounded in `image reference/habulan-nining-joan.jpg`:
 * - High braided updo with white sampaguita flower ornament & magenta-gold ribbons
 * - Embroidered cream puff-sleeve Filipiniana blouse under purple-and-gold vest with floral brooch
 * - T-pose arms with gold & purple bracelets
 * - Brown leather buckled satchel on right hip, magenta waist pouch, and glowing 3D hexagonal golden lantern on left hip
 * - Layered purple, magenta, and gold woven-pattern skirt and chunky purple-yellow-pink sneakers
 */
export function createNiningJoanCharacterGroup(
  quality: ResolvedQualityTier = "HIGH"
): THREE.Group {
  const group = new THREE.Group();
  group.name = "ASSET_HAB_02_NINING_JOAN";
  const seg = quality === "LOW" ? 10 : 18;

  const skinMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#F3B692"),
    roughness: 0.52,
  });
  const hairMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#2D1822"),
    roughness: 0.62,
  });
  const whiteBlouseMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#F8F1EB"),
    roughness: 0.55,
  });
  const royalPurpleMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#5B21B6"),
    roughness: 0.48,
  });
  const magentaMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#DB2777"),
    roughness: 0.48,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#FDB001"),
    emissive: new THREE.Color("#FDB001"),
    emissiveIntensity: 0.3,
    roughness: 0.3,
    metalness: 0.65,
  });
  const lanternGlowMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#FFFBEB"),
    emissive: new THREE.Color("#FDB001"),
    emissiveIntensity: 2.2,
    roughness: 0.15,
  });
  const leatherMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#78350F"),
    roughness: 0.65,
  });

  // Head & Braided Updo Bun
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.148, seg, seg),
    skinMat
  );
  head.position.set(0, 0.68, 0);

  const hairCrown = new THREE.Mesh(
    new THREE.SphereGeometry(0.162, seg, seg),
    hairMat
  );
  hairCrown.position.set(0, 0.73, -0.02);

  const highBun = new THREE.Mesh(
    new THREE.SphereGeometry(0.145, seg, seg),
    hairMat
  );
  highBun.position.set(-0.02, 0.9, -0.03);

  // White Sampaguita Flower Ornament on hair bun
  const flowerCenter = new THREE.Mesh(
    new THREE.SphereGeometry(0.026, 8, 8),
    goldMat
  );
  flowerCenter.position.set(-0.06, 0.87, 0.12);
  const flowerDisc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.068, 0.068, 0.018, 6),
    whiteBlouseMat
  );
  flowerDisc.rotation.x = Math.PI * 0.42;
  flowerDisc.position.set(-0.06, 0.87, 0.11);

  const hairRibbon = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.05, 0.016),
    magentaMat
  );
  hairRibbon.position.set(-0.18, 0.68, -0.04);
  hairRibbon.rotation.z = 0.55;

  group.add(head, hairCrown, highBun, flowerCenter, flowerDisc, hairRibbon);

  // Filipiniana Puff-Sleeve Blouse & Purple-Gold Vest
  const torso = new THREE.Mesh(
    new THREE.CylinderGeometry(0.145, 0.12, 0.32, seg),
    royalPurpleMat
  );
  torso.position.set(0, 0.36, 0);

  const floralBrooch = new THREE.Mesh(
    new THREE.SphereGeometry(0.042, 10, 10),
    magentaMat
  );
  floralBrooch.position.set(0, 0.43, 0.135);

  const leftPuffSleeve = new THREE.Mesh(
    new THREE.SphereGeometry(0.105, seg, seg),
    whiteBlouseMat
  );
  leftPuffSleeve.position.set(-0.22, 0.45, 0);
  const rightPuffSleeve = leftPuffSleeve.clone();
  rightPuffSleeve.position.set(0.22, 0.45, 0);

  // Outstretched T-Pose Arms & Gold Bracelets
  const leftArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.038, 0.032, 0.36, seg),
    skinMat
  );
  leftArm.rotation.z = Math.PI * 0.5;
  leftArm.position.set(-0.46, 0.45, 0);
  const rightArm = leftArm.clone();
  rightArm.position.set(0.46, 0.45, 0);

  const leftBracelet = new THREE.Mesh(
    new THREE.CylinderGeometry(0.048, 0.048, 0.055, 12),
    goldMat
  );
  leftBracelet.rotation.z = Math.PI * 0.5;
  leftBracelet.position.set(-0.54, 0.45, 0);
  const rightBracelet = leftBracelet.clone();
  rightBracelet.position.set(0.54, 0.45, 0);

  group.add(
    torso,
    floralBrooch,
    leftPuffSleeve,
    rightPuffSleeve,
    leftArm,
    rightArm,
    leftBracelet,
    rightBracelet
  );

  // Woven Purple, Magenta & Gold Skirt + Hip Satchel + Glowing Hexagonal Lantern
  const innerSkirt = new THREE.Mesh(
    new THREE.CylinderGeometry(0.125, 0.25, 0.38, seg),
    royalPurpleMat
  );
  innerSkirt.position.set(0, 0.02, 0);

  const magentaOverlayLeft = new THREE.Mesh(
    new THREE.BoxGeometry(0.13, 0.42, 0.24),
    magentaMat
  );
  magentaOverlayLeft.position.set(-0.11, 0.0, 0.04);
  magentaOverlayLeft.rotation.z = 0.22;

  const magentaOverlayRight = magentaOverlayLeft.clone();
  magentaOverlayRight.position.set(0.11, 0.0, 0.04);
  magentaOverlayRight.rotation.z = -0.22;

  // Leather Satchel on viewer's left hip (character's right hip)
  const satchel = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.17, 0.09),
    leatherMat
  );
  satchel.position.set(-0.19, 0.14, 0.08);
  satchel.rotation.z = 0.32;

  // Hexagonal Glowing Golden Lantern on viewer's right hip (character's left hip)
  const lanternGroup = new THREE.Group();
  lanternGroup.name = "NiningJoanHexLantern";
  lanternGroup.position.set(0.21, 0.1, 0.11);
  lanternGroup.rotation.z = -0.18;

  const lanternCap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.085, 0.06, 6),
    goldMat
  );
  lanternCap.position.y = 0.08;
  const lanternCore = new THREE.Mesh(
    new THREE.CylinderGeometry(0.068, 0.058, 0.11, 6),
    lanternGlowMat
  );
  const lanternBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.065, 0.035, 0.05, 6),
    goldMat
  );
  lanternBase.position.y = -0.075;
  lanternGroup.add(lanternCap, lanternCore, lanternBase);

  group.add(
    innerSkirt,
    magentaOverlayLeft,
    magentaOverlayRight,
    satchel,
    lanternGroup
  );

  // Legs, Patterned Socks & Chunky Purple-Yellow Sneakers
  const leftLeg = new THREE.Mesh(
    new THREE.CylinderGeometry(0.052, 0.045, 0.38, seg),
    skinMat
  );
  leftLeg.position.set(-0.12, -0.35, 0);
  const rightLeg = leftLeg.clone();
  rightLeg.position.set(0.12, -0.35, 0);

  const leftSneaker = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.16, 0.27),
    royalPurpleMat
  );
  leftSneaker.position.set(-0.13, -0.68, 0.04);
  const rightSneaker = leftSneaker.clone();
  rightSneaker.position.set(0.13, -0.68, 0.04);

  const leftSole = new THREE.Mesh(
    new THREE.BoxGeometry(0.165, 0.055, 0.29),
    whiteBlouseMat
  );
  leftSole.position.set(-0.13, -0.76, 0.04);
  const rightSole = leftSole.clone();
  rightSole.position.set(0.13, -0.76, 0.04);

  group.add(leftLeg, rightLeg, leftSneaker, rightSneaker, leftSole, rightSole);

  return group;
}

/**
 * Environmental Belfry Arch & Cursed 5th Bell for Habulan scene storytelling.
 */
export function createHabulanBelfryGroup(
  quality: ResolvedQualityTier = "HIGH"
): THREE.Group {
  const group = new THREE.Group();
  group.name = "ASSET_HAB_BELFRY_AND_5TH_BELL";
  const seg = quality === "LOW" ? 12 : 24;

  const stoneMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#1A1D2E"),
    roughness: 0.88,
    metalness: 0.15,
  });
  const bronzeBellMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#C28E38"),
    emissive: new THREE.Color("#FF6924"),
    emissiveIntensity: 0.35,
    roughness: 0.32,
    metalness: 0.85,
  });

  // Left and Right Stone Belfry Pillars
  const leftPillar = new THREE.Mesh(
    new THREE.BoxGeometry(0.28, 2.2, 0.32),
    stoneMat
  );
  leftPillar.position.set(-1.35, 0.15, -0.55);
  const rightPillar = leftPillar.clone();
  rightPillar.position.set(1.35, 0.15, -0.55);

  // Upper Stone Arch Lintel & Cross
  const lintel = new THREE.Mesh(
    new THREE.BoxGeometry(3.1, 0.24, 0.36),
    stoneMat
  );
  lintel.position.set(0, 1.25, -0.55);

  const crossVert = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.38, 0.08),
    stoneMat
  );
  crossVert.position.set(0, 1.52, -0.55);
  const crossHoriz = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.07, 0.08),
    stoneMat
  );
  crossHoriz.position.set(0, 1.56, -0.55);

  // The Cursed 5th Bell suspended in center arch
  const bellPivot = new THREE.Group();
  bellPivot.name = "CursedFifthBellPivot";
  bellPivot.position.set(0, 1.12, -0.45);

  const bellBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.11, 0.24, 0.32, seg),
    bronzeBellMat
  );
  bellBody.position.y = -0.18;
  const bellRim = new THREE.Mesh(
    new THREE.TorusGeometry(0.24, 0.028, 10, seg),
    bronzeBellMat
  );
  bellRim.rotation.x = Math.PI * 0.5;
  bellRim.position.y = -0.34;
  const clapper = new THREE.Mesh(
    new THREE.SphereGeometry(0.048, 10, 10),
    bronzeBellMat
  );
  clapper.position.y = -0.37;

  bellPivot.add(bellBody, bellRim, clapper);

  // Courtyard cobblestone plinth
  const courtyardBase = new THREE.Mesh(
    new THREE.CylinderGeometry(1.65, 1.78, 0.1, 32),
    stoneMat
  );
  courtyardBase.position.set(0, -0.84, 0);

  group.add(
    leftPillar,
    rightPillar,
    lintel,
    crossVert,
    crossHoriz,
    bellPivot,
    courtyardBase
  );

  return group;
}

export interface HabulanWorldSceneProps {
  quality: ResolvedQualityTier;
  focusTarget?: "duo" | "ken-ken" | "nining-joan";
  rotationY?: number;
  autoRotate?: boolean;
}

export function HabulanWorldScene({
  quality,
  focusTarget = "duo",
  rotationY = 0,
  autoRotate = false,
}: HabulanWorldSceneProps) {
  const stageRef = useRef<THREE.Group>(null);
  const kenKenRef = useRef<THREE.Group>(null);
  const niningJoanRef = useRef<THREE.Group>(null);

  const kenKenCore = useMemo(
    () => createKenKenCharacterGroup(quality),
    [quality]
  );
  const niningJoanCore = useMemo(
    () => createNiningJoanCharacterGroup(quality),
    [quality]
  );
  const belfryGroup = useMemo(
    () => createHabulanBelfryGroup(quality),
    [quality]
  );

  const [kenKenTex, niningJoanTex, logoTex] = useLoader(THREE.TextureLoader, [
    "/assets/games/habulan/textures/ken-ken-alpha.png",
    "/assets/games/habulan/textures/nining-joan-alpha.png",
    "/assets/games/habulan/posters/habulan-logo-transparent.png",
  ]);

  useEffect(() => {
    for (const tex of [kenKenTex, niningJoanTex, logoTex]) {
      if (tex) {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.needsUpdate = true;
      }
    }
  }, [kenKenTex, niningJoanTex, logoTex]);

  useEffect(() => {
    return () => {
      disposeObject3D(kenKenCore);
      disposeObject3D(niningJoanCore);
      disposeObject3D(belfryGroup);
    };
  }, [kenKenCore, niningJoanCore, belfryGroup]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const bell = belfryGroup.getObjectByName("CursedFifthBellPivot");
    if (bell) {
      bell.rotation.z = Math.sin(t * 1.8) * 0.14;
    }

    const targetRot = autoRotate
      ? rotationY + Math.sin(t * 0.6) * 0.35
      : rotationY;

    if (kenKenRef.current) {
      kenKenRef.current.position.y = Math.sin(t * 2.1) * 0.025;
      kenKenRef.current.rotation.y = THREE.MathUtils.lerp(
        kenKenRef.current.rotation.y,
        targetRot,
        Math.min(1, delta * 8)
      );
    }
    if (niningJoanRef.current) {
      niningJoanRef.current.position.y = Math.sin(t * 2.1 + 1.2) * 0.025;
      niningJoanRef.current.rotation.y = THREE.MathUtils.lerp(
        niningJoanRef.current.rotation.y,
        targetRot,
        Math.min(1, delta * 8)
      );
    }
  });

  const showKenKen = focusTarget === "duo" || focusTarget === "ken-ken";
  const showNiningJoan = focusTarget === "duo" || focusTarget === "nining-joan";
  const kenKenX = focusTarget === "duo" ? -0.68 : 0;
  const niningJoanX = focusTarget === "duo" ? 0.68 : 0;

  return (
    <group ref={stageRef}>
      {/* Nighttime Belfry & 5th Bell Environment */}
      <primitive object={belfryGroup} />

      {/* Warm Lantern & Bell Point Light */}
      <pointLight
        position={[0.65, 0.25, 0.6]}
        color="#FDB001"
        intensity={1.6}
        distance={6}
      />

      {/* Asset HAB-03: Official Habulan Transparent Logo Plane */}
      <mesh position={[0, 0.85, -0.38]}>
        <planeGeometry args={[1.35, 1.35]} />
        <meshStandardMaterial
          map={logoTex}
          transparent
          alphaTest={0.05}
          roughness={0.35}
        />
      </mesh>

      {/* Asset HAB-01: Character A — Ken-Ken */}
      {showKenKen && (
        <group ref={kenKenRef} position={[kenKenX, 0, 0.12]}>
          <primitive object={kenKenCore} scale={0.92} />
          {/* Front & Rear High-Resolution Relief Layers */}
          <mesh position={[0, -0.02, 0.165]}>
            <planeGeometry args={[1.28, 1.62]} />
            <meshStandardMaterial
              map={kenKenTex}
              transparent
              alphaTest={0.08}
              roughness={0.45}
            />
          </mesh>
          <mesh position={[0, -0.02, -0.165]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[1.28, 1.62]} />
            <meshStandardMaterial
              map={kenKenTex}
              color="#CBD5E1"
              transparent
              alphaTest={0.08}
              roughness={0.6}
            />
          </mesh>
        </group>
      )}

      {/* Asset HAB-02: Character B — Nining Joan */}
      {showNiningJoan && (
        <group ref={niningJoanRef} position={[niningJoanX, 0, 0.12]}>
          <primitive object={niningJoanCore} scale={0.92} />
          {/* Front & Rear High-Resolution Relief Layers */}
          <mesh position={[0, -0.02, 0.165]}>
            <planeGeometry args={[1.28, 1.62]} />
            <meshStandardMaterial
              map={niningJoanTex}
              transparent
              alphaTest={0.08}
              roughness={0.45}
            />
          </mesh>
          <mesh position={[0, -0.02, -0.165]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[1.28, 1.62]} />
            <meshStandardMaterial
              map={niningJoanTex}
              color="#CBD5E1"
              transparent
              alphaTest={0.08}
              roughness={0.6}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
