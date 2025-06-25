"use client";

import { useEffect } from "react";

export default function ShootingStars() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/shooting-stars.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
} 