"use client";

import { useEffect, type DependencyList, type RefObject } from "react";

/**
 * Shared Zero-Re-Render Parallax Motion Engine
 * - ONE passive `scroll` / `resize` / `mousemove` listener set for the entire app.
 * - ONE `requestAnimationFrame` per frame, coalesced across every subscriber.
 * - Subscribers are only active while their element is near the viewport
 *   (`IntersectionObserver`), so off-screen sections do zero work.
 * - Subscribers mutate `element.style.transform` directly → zero React re-renders.
 * - Fully disabled under `prefers-reduced-motion: reduce`.
 */
export interface MotionFrame {
  scrollY: number;
  viewportHeight: number;
  /** Normalized pointer position, -1 … +1 */
  pointerX: number;
  pointerY: number;
}

type MotionSubscriber = (frame: MotionFrame) => void;

const activeSubscribers = new Set<MotionSubscriber>();
let pointerX = 0;
let pointerY = 0;
let rafId = 0;
let listenersBound = false;

function flush() {
  rafId = 0;
  const frame: MotionFrame = {
    scrollY: window.scrollY,
    viewportHeight: Math.max(1, window.innerHeight),
    pointerX,
    pointerY,
  };
  activeSubscribers.forEach((fn) => fn(frame));
}

function scheduleFrame() {
  if (rafId === 0 && activeSubscribers.size > 0) {
    rafId = window.requestAnimationFrame(flush);
  }
}

function onPointerMove(e: MouseEvent) {
  pointerX = (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
  pointerY = (e.clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
  scheduleFrame();
}

function bindListeners() {
  if (listenersBound || typeof window === "undefined") return;
  listenersBound = true;
  window.addEventListener("scroll", scheduleFrame, { passive: true });
  window.addEventListener("resize", scheduleFrame, { passive: true });
  window.addEventListener("mousemove", onPointerMove, { passive: true });
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Registers a per-frame motion callback that only runs while `targetRef`
 * is within (or 25% beyond) the viewport.
 */
export function useParallaxMotion(
  targetRef: RefObject<HTMLElement | null>,
  onFrame: MotionSubscriber,
  deps: DependencyList = []
) {
  useEffect(() => {
    const el = targetRef.current;
    if (!el || prefersReducedMotion()) return;
    bindListeners();

    const subscriber: MotionSubscriber = (frame) => onFrame(frame);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible) {
          activeSubscribers.add(subscriber);
          scheduleFrame();
        } else {
          activeSubscribers.delete(subscriber);
        }
      },
      { rootMargin: "25% 0px 25% 0px" }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      activeSubscribers.delete(subscriber);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
