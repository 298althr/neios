"use client";

// Visible cursor for screen recordings — Playwright's synthetic mouse events
// don't move the OS cursor, so we render our own. Mounts only when the URL has
// ?cursor=1. The record script drives it via window.__neiosCursor.moveTo/click.

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    __neiosCursor?: {
      moveTo: (x: number, y: number) => void;
      click: () => void;
      show: (v: boolean) => void;
    };
  }
}

export default function CursorOverlay() {
  const params = useSearchParams();
  const enabled = params.get("cursor") === "1";
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    window.__neiosCursor = {
      moveTo: (x, y) => setPos({ x, y }),
      click: () => {
        setRipples((r) => [...r, { id: Date.now(), x: pos.x, y: pos.y }]);
        setTimeout(() => setRipples((r) => r.slice(1)), 700);
      },
      show: setVisible,
    };
    return () => {
      delete window.__neiosCursor;
    };
  }, [enabled, pos]);

  if (!enabled || !visible) return null;
  return (
    <>
      <div className="demo-cursor" style={{ left: pos.x, top: pos.y }} />
      {ripples.map((r) => (
        <div key={r.id} className="demo-ripple" style={{ left: r.x, top: r.y }} />
      ))}
    </>
  );
}
