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

    function createTossedPickle(x: number, y: number, dx: number = 1, dy: number = 1) {
      const star = document.createElement("div");
      star.classList.add("shooting-star");

      const duration = Math.random() * 1.7 + 2.5;
      const angle = Math.atan2(dy, dx);
      const arcHeight = 50 + Math.random() * 150;

      const speed = Math.sqrt(dx * dx + dy * dy);
      const baseDistance = 200;
      const velocityMultiplier = 5;
      const distance = Math.min(600, baseDistance + speed * velocityMultiplier + Math.random() * 50);

      const endX = Math.cos(angle) * distance + (Math.random() - 0.5) * 60;
      const endY = Math.sin(angle) * distance + 100 + Math.random() * 100;
      const animName = `toss-${Math.random().toString(36).substr(2, 6)}`;

      const isPickle = Math.random() < 0.35;
      const color = isPickle
        ? 'hsl(120, 47.60%, 44.10%)'
        : [
            'hsla(261, 80.90%, 50.80%, 0.52)',
            'hsla(172, 92.00%, 34.10%, 0.60)',
            'hsl(264, 80.80%, 85.70%)',
            'hsla(197, 99.20%, 48.00%, 0.58)',
            'hsl(314, 88.60%, 86.30%)',
            'hsla(300, 93.20%, 40.60%, 0.35)'
          ][Math.floor(Math.random() * 6)];

      let width, height;
      if (isPickle) {
        width = 21 + Math.random() * 45;
        height = 9 + Math.random() * 15;
      } else {
        width = 70 + Math.random() * 100;
        height = 70 + Math.random() * 100;
      }

      star.style.position = "absolute";
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.style.width = `${width}px`;
      star.style.height = `${height}px`;
      star.style.transform = `rotate(${angle}rad)`;
      star.style.opacity = '.5';
      star.style.borderRadius = isPickle ? '25% 25% 45% 45% / 40% 40% 60% 60%' : '50%';
      star.style.filter = isPickle ? 'blur(.2px)' : 'blur(25px)';
      star.style.background = `radial-gradient(circle at center, ${color} 0%, #222 100%)`;
      star.style.zIndex = isPickle ? '2' : '1';
      star.style.animation = `${animName} ${duration}s ease-in-out forwards`;

      let keyframes = `@keyframes ${animName} {\n`;
      for (let i = 0; i <= 80; i++) {
        const progress = i / 80;
        const tx = endX * progress;
        const arcY = -4 * arcHeight * (progress - 0.4) ** 2 + arcHeight;
        const ty = endY * progress - arcY;
        const rot = angle + 0.05 * i + (isPickle ? Math.sin(i / 5) * 0.2 : 0);
        
        const fadeIn = Math.min(progress / 0.1, 1);
        const fadeOut = Math.max((1 - progress) / 0.9, 0);
        const op = Math.min(fadeIn, fadeOut);
        keyframes += `  ${Math.round(progress * 100)}% { transform: translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) rotate(${rot.toFixed(2)}rad); opacity: ${op.toFixed(2)}; }\n`;
      }
      keyframes += `}`;

      const styleSheet = document.styleSheets[0];
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
      if (container) {
        container.appendChild(star);
      }

      setTimeout(() => star.remove(), duration * 1000);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (throttle) return;
      throttle = true;

      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      const x = e.clientX;
      const y = e.clientY;

      createTossedPickle(x, y, dx, dy);

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