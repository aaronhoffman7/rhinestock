window.addEventListener("load", () => {
  const container = document.getElementById("star-container");
  const triggerArea = document.body; // or document.documentElement for full page


  let lastMouseX = 0;
  let lastMouseY = 0;
  let throttle = false;

  function createTossedPickle(x, y, dx = 1, dy = 1) {
    const star = document.createElement("div");
    star.classList.add("shooting-star");

    const size = Math.random() * 1.2 + 1.2;
    const duration = Math.random() * 1.7 + 2.5;
    const angle = Math.atan2(dy, dx);
    const arcHeight = 50 + Math.random() * 150;

    const speed = Math.sqrt(dx * dx + dy * dy); // magnitude of mouse movement
    const baseDistance = 200;
    const velocityMultiplier = 5; // tweak this
    const distance = Math.min(600, baseDistance + speed * velocityMultiplier + Math.random() * 50);

    const endX = Math.cos(angle) * distance + (Math.random() - 0.5) * 60;
    const endY = Math.sin(angle) * distance + 100 + Math.random() * 100;
    const animName = `toss-${Math.random().toString(36).substr(2, 6)}`;


// 🎯 Adjust pickle frequency (10% chance)
const isPickle = Math.random() < 0.35;
const color = isPickle
  ? 'hsl(120, 47.60%, 44.10%)'  // pickle green
  : [
      'hsla(261, 80.90%, 50.80%, 0.52)',
      'hsla(172, 92.00%, 34.10%, 0.60)',
      'hsl(264, 80.80%, 85.70%)',
      'hsla(197, 99.20%, 48.00%, 0.58)',
      'hsl(314, 88.60%, 86.30%)',
      'hsla(300, 93.20%, 40.60%, 0.35)'
    ][Math.floor(Math.random() * 6)];

    // 🥒 Style shape by type
// Width and height per type
// Define dimensions
let width, height;

if (isPickle) {
  width = 21 + Math.random() * 45;   // 50–60 px
  height = 9 + Math.random() * 15;   // 10–12 px
} else {
  width = 70 + Math.random() * 100;   // 30–90 px
  height = 70 + Math.random() * 100;  // 10–35 px
}



    star.style.position = "absolute";  // or "fixed"
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.width = `${width}px`;
    star.style.height = `${height}px`;
    star.style.transform = `rotate(${angle}rad)`;
    star.style.opacity = .5;
    star.style.borderRadius = isPickle ? '25% 25% 45% 45% / 40% 40% 60% 60%' : '50%';
    star.style.filter = isPickle ? 'blur(.2px)' : 'blur(25px)';
    star.style.background = `radial-gradient(circle at center, ${color} 0%, #222 100%)`;
    star.style.zIndex = isPickle ? 2 : 1;
    star.style.animation = `${animName} ${duration}s ease-in-out forwards`;

    // 🌈 Create arc animation in 60 steps
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
    container.appendChild(star);

    setTimeout(() => star.remove(), duration * 1000);
  }

  // 🖱 Mouse toss listener
  triggerArea.addEventListener("mousemove", (e) => {
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
  });
});
