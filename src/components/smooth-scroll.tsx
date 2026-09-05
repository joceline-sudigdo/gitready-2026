"use client";

import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import "lenis/dist/lenis.css";

type SmoothScrollProps = Readonly<{
  children: React.ReactNode;
}>;

export function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname();

  if (pathname === "/") {
    return children;
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        smoothWheel: true,
        syncTouch: false,
        lerp: 0.075,
        wheelMultiplier: 0.9,
        anchors: { offset: -70, duration: 1.4 },
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
