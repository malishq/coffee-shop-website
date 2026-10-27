"use client";

import { useEffect, useRef } from "react";

export function Clip({ src, poster, className = "" }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (calm.matches || !visible) video.pause();
      else video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.2 },
    );
    observer.observe(video);
    calm.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      calm.removeEventListener("change", sync);
    };
  }, []);

  return (
    <video ref={ref} muted loop playsInline preload="metadata" poster={poster} width={854} height={480} aria-hidden="true" className={className}>
      <source src={src} type="video/webm" />
    </video>
  );
}
