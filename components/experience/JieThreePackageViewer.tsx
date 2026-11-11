"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const JIE_GLB_PATH =
  "/assets/games/habulan/models/jie_threejs_package/jie.glb";

type CameraPreset = "front" | "side" | "back";

export interface JieThreePackageViewerProps {
  /** Compact mode (hero): no control bar chrome, auto-rotate on by default */
  compact?: boolean;
  className?: string;
  /** Poster image shown until the GLB has loaded */
  posterSrc?: string;
}

/**
 * Jie — Interactive Three.js GLB Viewer
 * Port of `public/assets/games/habulan/models/jie_threejs_package/index.html`
 * using the locally installed `three` package (no CDN):
 * - Camera automatically frames and centers the loaded model
 * - Front / Side / Back presets + Auto-rotate toggle, drag to orbit
 * - Three.js is code-split and only fetched when the viewer nears the viewport
 * - Render loop pauses while off-screen; full GPU disposal on unmount
 */
export function JieThreePackageViewer({
  compact = false,
  className,
  posterSrc = "/assets/games/habulan/models/habulan-jie-turnaround.png",
}: JieThreePackageViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<{
    setPreset: (preset: CameraPreset) => void;
    setAutoRotate: (on: boolean) => void;
  } | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle"
  );
  const [autoRotate, setAutoRotate] = useState(compact);
  const [activePreset, setActivePreset] = useState<CameraPreset | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let cleanup: (() => void) | null = null;

    const start = async () => {
      setStatus("loading");
      const THREE = await import("three");
      const { OrbitControls } = await import(
        "three/examples/jsm/controls/OrbitControls.js"
      );
      const { GLTFLoader } = await import(
        "three/examples/jsm/loaders/GLTFLoader.js"
      );
      if (disposed) return;

      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, width / height, 0.01, 100);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.display = "block";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      mount.appendChild(renderer.domElement);

      scene.add(new THREE.HemisphereLight(0xdde8ff, 0x38354d, 3));
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(3, 7, 5);
      scene.add(light);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.enableZoom = !compact;
      controls.autoRotate = compact;
      controls.autoRotateSpeed = 1.6;
      controls.update();
      // Keep vertical page scrolling available on touch devices in compact (hero) mode
      if (compact) renderer.domElement.style.touchAction = "pan-y";

      let modelRoot: import("three").Object3D | null = null;
      const target = new THREE.Vector3(0, 1.2, 0);
      let framingDistance = 5;
      let selectedPreset: CameraPreset = "front";
      const applyPreset = (preset: CameraPreset) => {
        selectedPreset = preset;
        const direction =
          preset === "side"
            ? new THREE.Vector3(1, 0.1, 0)
            : preset === "back"
              ? new THREE.Vector3(0, 0.1, -1)
              : new THREE.Vector3(0, 0.1, 1);
        direction.normalize();
        controls.target.copy(target);
        camera.position.copy(target).addScaledVector(direction, framingDistance);
        controls.update();
      };

      new GLTFLoader().load(
        JIE_GLB_PATH,
        (gltf) => {
          if (disposed) return;
          modelRoot = gltf.scene;
          scene.add(gltf.scene);
          const bounds = new THREE.Box3().setFromObject(gltf.scene);
          const size = bounds.getSize(new THREE.Vector3());
          bounds.getCenter(target);

          const verticalFov = THREE.MathUtils.degToRad(camera.fov);
          const horizontalFov =
            2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
          const verticalDistance = size.y / (2 * Math.tan(verticalFov / 2));
          const horizontalDistance = size.x / (2 * Math.tan(horizontalFov / 2));
          framingDistance =
            Math.max(verticalDistance, horizontalDistance, size.z / 2) * 1.15;
          controls.minDistance = framingDistance * 0.55;
          controls.maxDistance = framingDistance * 2.5;
          applyPreset(selectedPreset);
          setStatus("ready");
        },
        undefined,
        () => {
          if (!disposed) setStatus("error");
        }
      );

      // Render loop runs only while the viewer is on-screen
      let rafId = 0;
      let visible = true;
      const tick = () => {
        rafId = 0;
        if (!visible || disposed) return;
        controls.update();
        renderer.render(scene, camera);
        rafId = requestAnimationFrame(tick);
      };
      const startLoop = () => {
        if (rafId === 0) rafId = requestAnimationFrame(tick);
      };
      startLoop();

      const visibilityObserver = new IntersectionObserver((entries) => {
        visible = entries.some((e) => e.isIntersecting);
        if (visible) startLoop();
      });
      visibilityObserver.observe(mount);

      const resizeObserver = new ResizeObserver(() => {
        const w = Math.max(1, mount.clientWidth);
        const h = Math.max(1, mount.clientHeight);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
      resizeObserver.observe(mount);

      apiRef.current = {
        setPreset: (preset) => {
          applyPreset(preset);
        },
        setAutoRotate: (on) => {
          controls.autoRotate = on;
        },
      };

      cleanup = () => {
        cancelAnimationFrame(rafId);
        visibilityObserver.disconnect();
        resizeObserver.disconnect();
        controls.dispose();
        if (modelRoot) {
          modelRoot.traverse((obj) => {
            const mesh = obj as import("three").Mesh;
            if (mesh.isMesh) {
              mesh.geometry?.dispose();
              const materials = Array.isArray(mesh.material)
                ? mesh.material
                : [mesh.material];
              materials.forEach((m) => m?.dispose());
            }
          });
        }
        renderer.dispose();
        renderer.domElement.remove();
        apiRef.current = null;
      };
    };

    // Defer downloading Three.js + the GLB until the viewer nears the viewport
    const lazyObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          lazyObserver.disconnect();
          start().catch(() => {
            if (!disposed) setStatus("error");
          });
        }
      },
      { rootMargin: "200px 0px" }
    );
    lazyObserver.observe(mount);

    return () => {
      disposed = true;
      lazyObserver.disconnect();
      cleanup?.();
    };
  }, [compact]);

  const handlePreset = (preset: CameraPreset) => {
    setActivePreset(preset);
    apiRef.current?.setPreset(preset);
  };

  const handleToggleRotate = () => {
    const next = !autoRotate;
    setAutoRotate(next);
    apiRef.current?.setAutoRotate(next);
  };

  return (
    <div
      className={cn("relative h-full w-full", className)}
      data-testid="jie-3d-viewer"
      data-status={status}
    >
      {/* Poster shown until the GLB is ready (and as no-WebGL fallback) */}
      {status !== "ready" && (
        <img
          src={posterSrc}
          alt="Jie — character turnaround from Habulan: The Curse of the 5th Bell"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain opacity-70"
        />
      )}

      <div
        ref={mountRef}
        role="img"
        aria-label="Interactive 3D model of Jie from Habulan: The Curse of the 5th Bell. Drag to orbit."
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
      />

      {status === "loading" && (
        <span className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#01BEF5]">
          Loading 3D model…
        </span>
      )}

      {!compact && (
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-px border-t border-[#F5F5FA]/10 bg-[#090B16]/85 backdrop-blur-md">
          {(["front", "side", "back"] as CameraPreset[]).map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => handlePreset(preset)}
              aria-pressed={activePreset === preset}
              className={cn(
                "min-h-[40px] flex-1 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]",
                activePreset === preset
                  ? "text-[#FDB001]"
                  : "text-[#B6B9C9] hover:text-[#F5F5FA]"
              )}
            >
              {preset}
            </button>
          ))}
          <button
            type="button"
            onClick={handleToggleRotate}
            aria-pressed={autoRotate}
            className={cn(
              "min-h-[40px] flex-1 border-l border-[#F5F5FA]/10 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]",
              autoRotate ? "text-[#FDB001]" : "text-[#B6B9C9] hover:text-[#F5F5FA]"
            )}
          >
            Auto-rotate: {autoRotate ? "on" : "off"}
          </button>
        </div>
      )}
    </div>
  );
}

export default JieThreePackageViewer;
