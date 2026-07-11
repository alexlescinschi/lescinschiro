"use client";
import { useEffect, useRef } from "react";

// Cursor custom care urmărește mouse-ul cu lag și crește peste elemente interactive.
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(pointer: coarse)").matches) return;

    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; };
    const loop = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e: Event) => {
      if ((e.target as HTMLElement).closest("a, button, .srv, .wk__thumb, input, textarea"))
        el.classList.add("is-hover");
    };
    const out = () => el.classList.remove("is-hover");

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
    };
  }, []);

  return <div className="cursor" ref={ref} aria-hidden />;
}
