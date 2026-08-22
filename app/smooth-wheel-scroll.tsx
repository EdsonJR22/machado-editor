"use client";

import { useEffect } from "react";

const ACTIVE_CLASS = "smooth-wheel-active";
const SMOOTHING = 0.08;
const MAX_WHEEL_STEP = 240;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function canScrollInside(target: EventTarget | null, deltaY: number) {
  let element = target instanceof Element ? target : null;

  while (
    element &&
    element !== document.body &&
    element !== document.documentElement
  ) {
    const { overflowY } = window.getComputedStyle(element);
    const hasScrollableOverflow = /(auto|scroll|overlay)/.test(overflowY);

    if (
      hasScrollableOverflow &&
      element.scrollHeight > element.clientHeight + 1
    ) {
      const atTop = element.scrollTop <= 0;
      const atBottom =
        element.scrollTop + element.clientHeight >= element.scrollHeight - 1;

      if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) {
        return true;
      }
    }

    element = element.parentElement;
  }

  return false;
}

export default function SmoothWheelScroll() {
  useEffect(() => {
    const finePointer = window.matchMedia("(any-pointer: fine)");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const root = document.documentElement;
    let currentPosition = window.scrollY;
    let targetPosition = currentPosition;
    let animationFrame: number | null = null;

    const maximumScroll = () =>
      Math.max(0, root.scrollHeight - window.innerHeight);

    const stopAnimation = () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }

      root.classList.remove(ACTIVE_CLASS);
      currentPosition = window.scrollY;
      targetPosition = currentPosition;
    };

    const animate = () => {
      targetPosition = clamp(targetPosition, 0, maximumScroll());
      const distance = targetPosition - currentPosition;

      if (Math.abs(distance) < 0.5) {
        currentPosition = targetPosition;
        window.scrollTo(0, currentPosition);
        animationFrame = null;
        root.classList.remove(ACTIVE_CLASS);
        return;
      }

      currentPosition += distance * SMOOTHING;
      window.scrollTo(0, currentPosition);
      animationFrame = window.requestAnimationFrame(animate);
    };

    const handleWheel = (event: WheelEvent) => {
      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        reducedMotion.matches ||
        !finePointer.matches ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ) {
        return;
      }

      const deltaMultiplier =
        event.deltaMode === 1
          ? 18
          : event.deltaMode === 2
            ? window.innerHeight
            : 1;
      const rawDelta = event.deltaY * deltaMultiplier;

      if (rawDelta === 0) return;

      if (canScrollInside(event.target, rawDelta)) {
        stopAnimation();
        return;
      }

      if (animationFrame === null) {
        currentPosition = window.scrollY;
        targetPosition = currentPosition;
      }

      const limitedDelta =
        Math.sign(rawDelta) * Math.min(Math.abs(rawDelta), MAX_WHEEL_STEP);
      const nextTarget = clamp(
        targetPosition + limitedDelta,
        0,
        maximumScroll(),
      );

      if (nextTarget === targetPosition) {
        if (animationFrame !== null) event.preventDefault();
        return;
      }

      event.preventDefault();
      targetPosition = nextTarget;
      root.classList.add(ACTIVE_CLASS);

      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("pointerdown", stopAnimation, { passive: true });
    window.addEventListener("touchstart", stopAnimation, { passive: true });
    window.addEventListener("keydown", stopAnimation);

    return () => {
      stopAnimation();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("pointerdown", stopAnimation);
      window.removeEventListener("touchstart", stopAnimation);
      window.removeEventListener("keydown", stopAnimation);
    };
  }, []);

  return null;
}
