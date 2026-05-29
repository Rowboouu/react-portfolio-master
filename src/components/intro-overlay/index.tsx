"use client";

import { useEffect, useRef, useState } from "react";
import { LuArrowUp } from "react-icons/lu";

const FADE_DISTANCE = 300;
const STORAGE_KEY_LIGHTS = "portfolio:lights";

const IntroOverlay = () => {
  const [opacity, setOpacity] = useState(1);
  const [visible, setVisible] = useState(true);
  const anchorYRef = useRef<number>(0);

  useEffect(() => {
    // Skip the intro entirely if the user has previously turned lights on.
    if (localStorage.getItem(STORAGE_KEY_LIGHTS) === "on") {
      setVisible(false);
      return;
    }

    // Anchor the fade to whatever scroll position the page started at.
    // This way the overlay still shows after a hash-reload (e.g. /#about),
    // and scrolling in EITHER direction from that anchor dismisses it.
    anchorYRef.current = window.scrollY;

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        const distance = Math.abs(window.scrollY - anchorYRef.current);
        const newOpacity = Math.max(0, 1 - distance / FADE_DISTANCE);
        setOpacity(newOpacity);
        if (distance >= FADE_DISTANCE) {
          setVisible(false);
        }
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Also dismiss if the user clicks the lights toggle while the overlay
  // is still visible.
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (document.body.classList.contains("lights-on")) {
        setVisible(false);
      }
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div
      className="intro-overlay"
      style={{ opacity }}
      aria-hidden={opacity < 0.5}
    >
      <div className="intro-overlay__content">
        <h2 className="intro-overlay__title">Turn on the lights?</h2>
        <p className="intro-overlay__hint">
          or scroll down to explore in the dark
        </p>
      </div>
      <div className="intro-overlay__arrow" aria-hidden>
        <LuArrowUp />
      </div>
    </div>
  );
};

export default IntroOverlay;
