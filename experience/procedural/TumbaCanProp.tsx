"use client";

import React, { useEffect, useMemo } from "react";
import * as THREE from "three";
import { disposeObject3D } from "@/experience/quality/qualityTiers";
import type { ResolvedQualityTier } from "@/experience/quality/stateTypes";

export interface TumbaCanMetrics {
  triangles: number;
  meshCount: number;
}

/**
 * Pure Three.js procedural factory for the Project Tumba battered tin can (lata) prop.
 * Authored to the Phase 3B / FR10 / AT12 specification:
 * - Zero runtime dependency on external authoring tools
 * - <= 2,500 triangles on HIGH, <= 800 triangles on LOW
 * - <= 2 draw calls (body + rims share two materials)
 * - Deterministic radial dent modulation
 */
export function createTumbaCanGroup(
  quality: ResolvedQualityTier = "HIGH"
): THREE.Group {
  const group = new THREE.Group();
  group.name = "PROCEDURAL_TUMBA_CAN";

  const radialSegments = quality === "HIGH" ? 32 : quality === "MEDIUM" ? 24 : 16;
  const heightSegments = quality === "HIGH" ? 8 : 4;
  const rimTubularSegments = quality === "HIGH" ? 32 : 16;

  // 1. Cylindrical Tin Can Body with deterministic street-play dent modulation
  const bodyGeom = new THREE.CylinderGeometry(
    0.26,
    0.26,
    0.68,
    radialSegments,
    heightSegments,
    false
  );

  const posAttr = bodyGeom.attributes.position;
  if (posAttr) {
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = posAttr.getZ(i);
      const angle = Math.atan2(z, x);
      // Subtle inward street-play dent near mid-height without breaking rims
      const verticalMask = Math.max(0, 1 - Math.abs(y / 0.34));
      const dent =
        verticalMask *
        (0.014 * Math.sin(angle * 3 + y * 4) +
          0.008 * Math.cos(angle * 5 - y * 3));
      const scale = 1 - dent;
      posAttr.setXYZ(i, x * scale, y, z * scale);
    }
    bodyGeom.computeVertexNormals();
  }

  const bodyMat = new THREE.MeshStandardMaterial({
    color: "#B9BBC7",
    metalness: 0.82,
    roughness: 0.36,
  });

  const bodyMesh = new THREE.Mesh(bodyGeom, bodyMat);
  bodyMesh.name = "TumbaCanBody";
  group.add(bodyMesh);

  // 2. Top & Bottom Rolled Tin-Plate Rims (merged/shared material)
  const rimMat = new THREE.MeshStandardMaterial({
    color: "#D8AE63",
    emissive: "#D8AE63",
    emissiveIntensity: 0.25,
    metalness: 0.88,
    roughness: 0.26,
  });

  const topRimGeom = new THREE.TorusGeometry(0.265, 0.016, 8, rimTubularSegments);
  topRimGeom.rotateX(Math.PI / 2);
  topRimGeom.translate(0, 0.34, 0);

  const topRimMesh = new THREE.Mesh(topRimGeom, rimMat);
  topRimMesh.name = "TumbaCanTopRim";
  group.add(topRimMesh);

  return group;
}

export function measureTumbaCanMetrics(group: THREE.Object3D): TumbaCanMetrics {
  let triangles = 0;
  let meshCount = 0;

  group.traverse((obj) => {
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

  return { triangles, meshCount };
}

export interface TumbaCanPropProps {
  quality: ResolvedQualityTier;
  rotationY?: number;
}

export function TumbaCanProp({ quality, rotationY = 0 }: TumbaCanPropProps) {
  const canGroup = useMemo(() => createTumbaCanGroup(quality), [quality]);

  useEffect(() => {
    return () => {
      disposeObject3D(canGroup);
    };
  }, [canGroup]);

  return (
    <primitive
      object={canGroup}
      position={[0, 0.15, 0.12]}
      rotation={[0.15, rotationY, 0.08]}
    />
  );
}
