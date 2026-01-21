import { useRef, useEffect, useCallback } from "react";

const DEFAULT_THRESHOLD = 50;

type Options = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  /** 최소 드래그 거리(px). 기본 50 */
  threshold?: number;
  /** 가로 스와이프만 인정 (세로 스크롤과 구분). 기본 true */
  horizontalOnly?: boolean;
};

/**
 * 모바일 터치 스와이프로 이전/다음 이동.
 * - 오른쪽 스와이프(←) → onSwipeRight (뒤로가기)
 * - 왼쪽 스와이프(→) → onSwipeLeft (앞으로가기)
 * iOS·Android 공통 (touchstart/touchend).
 */
export function useSwipeNavigation(options: Options) {
  const {
    onSwipeLeft,
    onSwipeRight,
    threshold = DEFAULT_THRESHOLD,
    horizontalOnly = true,
  } = options;

  const ref = useRef<HTMLDivElement | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);

  const handleStart = useCallback((e: TouchEvent) => {
    start.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleEnd = useCallback(
    (e: TouchEvent) => {
      if (!start.current) return;
      const t = e.changedTouches?.[0];
      if (!t) {
        start.current = null;
        return;
      }
      const dx = t.clientX - start.current.x;
      const dy = t.clientY - start.current.y;
      start.current = null;

      if (horizontalOnly && Math.abs(dy) >= Math.abs(dx)) return;
      if (Math.abs(dx) < threshold) return;

      if (dx > 0) onSwipeRight?.();
      else onSwipeLeft?.();
    },
    [onSwipeLeft, onSwipeRight, threshold, horizontalOnly]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("touchstart", handleStart, { passive: true });
    el.addEventListener("touchend", handleEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", handleStart);
      el.removeEventListener("touchend", handleEnd);
    };
  }, [handleStart, handleEnd]);

  return ref;
}
