"use client";

import { useEffect } from "react";

export default function ShootingStars() {
  useEffect(() => {
    const container = document.getElementById("star-container");
    if (!container) return;

    const triggerArea = document.body;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let throttle = false;

    function createTossedEffect(x: number, y: number, dx: number = 1, dy: number = 1) {
      const angle = Math.atan2(dy, dx);
      const arcHeight = 50 + Math.random() * 150;
      const speed = Math.sqrt(dx * dx + dy * dy);
      const baseDistance = 200;
      const velocityMultiplier = 5;
      const distance = Math.min(600, baseDistance + speed * velocityMultiplier + Math.random() * 50);
      const endX = Math.cos(angle) * distance + (Math.random() - 0.5) * 60;
      const endY = Math.sin(angle) * distance + 100 + Math.random() * 100;
      const animName = `toss-${Math.random().toString(36).substr(2, 6)}`;
      const duration = Math.random() * 1.7 + 2.5;
      const width = 20 + Math.random() * 40;
      const height = 20 + Math.random() * 40;

      // --- Create keyframes for animation ---
      let keyframes = `@keyframes ${animName} {\n`;
      for (let i = 0; i <= 80; i++) {
        const progress = i / 80;
        const tx = endX * progress;
        const arcY = -4 * arcHeight * (progress - 0.4) ** 2 + arcHeight;
        const ty = endY * progress - arcY;
        const rot = angle + 0.05 * i;
        const fadeIn = Math.min(progress / 0.1, 1);
        const fadeOut = Math.max((1 - progress) / 0.9, 0);
        const op = Math.min(fadeIn, fadeOut);
        keyframes += `  ${Math.round(progress * 100)}% { transform: translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) rotate(${rot.toFixed(2)}rad); opacity: ${op.toFixed(2)}; }\n`;
      }
      keyframes += `}`;
      const styleSheet = document.styleSheets[0];
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

      // --- Background blurry circle ---
      const blur = document.createElement("div");
      const blurScale = 1.8; // 🔁 adjust as needed (1.5–2.5 looks good)
      const color = [
        'hsla(261, 80.90%, 50.80%, 0.52)',
        'hsla(172, 92.00%, 34.10%, 0.60)',
        'hsl(264, 80.80%, 85.70%)',
        'hsla(197, 99.20%, 48.00%, 0.58)',
        'hsl(314, 88.60%, 86.30%)',
        'hsla(300, 93.20%, 40.60%, 0.35)'
      ][Math.floor(Math.random() * 6)];
      blur.style.position = "absolute";
      blur.style.width = `${width * blurScale}px`;
      blur.style.height = `${height * blurScale}px`;
      blur.style.left = `${x - (width * (blurScale - 1)) / 2}px`;
      blur.style.top = `${y - (height * (blurScale - 1)) / 2}px`;
      blur.style.borderRadius = "50%";
      blur.style.background = `radial-gradient(circle at center, ${color} 0%, #222 100%)`;
      blur.style.filter = "blur(25px)";
      blur.style.pointerEvents = "none";
      blur.style.zIndex = "1";
      blur.style.animation = `${animName} ${duration}s ease-in-out forwards`;

      // --- Foreground image ---
      const acid = document.createElement("img");
      acid.src = "/photos/acid.jpg";
      acid.style.position = "absolute";
      acid.style.left = `${x}px`;
      acid.style.top = `${y}px`;
      acid.style.width = `${width}px`;
      acid.style.height = `${height}px`;
      acid.style.objectFit = "contain";
      acid.style.zIndex = "2";
      acid.style.pointerEvents = "none";
      acid.style.animation = `${animName} ${duration}s ease-in-out forwards`;

      container!.appendChild(blur);
      container!.appendChild(acid);

      setTimeout(() => {
        blur.remove();
        acid.remove();
      }, duration * 1000);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (throttle) return;
      throttle = true;

      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;

      createTossedEffect(e.clientX, e.clientY, dx, dy);

      setTimeout(() => {
        throttle = false;
      }, 90);
    };

    triggerArea.addEventListener("mousemove", handleMouseMove);
    return () => {
      triggerArea.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
}
