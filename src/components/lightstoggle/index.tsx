"use client";

import { useEffect, useState } from "react";
import { LuLightbulb, LuLightbulbOff } from "react-icons/lu";

const STORAGE_KEY = "portfolio:lights";

const LightsToggle = () => {
  // Default = lights OFF (flashlight / darkness atmosphere is on).
  const [lightsOn, setLightsOn] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "on") {
      setLightsOn(true);
      document.body.classList.add("lights-on");
    }
  }, []);

  const toggle = () => {
    const next = !lightsOn;
    setLightsOn(next);
    document.body.classList.toggle("lights-on", next);
    localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
  };

  return (
    <button
      className="nav_ac lights-toggle"
      onClick={toggle}
      aria-label={lightsOn ? "Turn lights off" : "Turn lights on"}
      title={lightsOn ? "Turn lights off" : "Turn lights on"}
      type="button"
    >
      {lightsOn ? <LuLightbulb /> : <LuLightbulbOff />}
    </button>
  );
};

export default LightsToggle;
