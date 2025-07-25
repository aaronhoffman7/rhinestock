"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  const [scrollUp, setScrollUp] = useState(true);
  const lastScrollYRef = useRef(0);

function renderWiggleText(text: string) {
  return (
    <>
      {Array.from(text).map((char, i) => (
        <span key={i} className="shroom-wiggle">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}


  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollUp(currentY < lastScrollYRef.current);
      lastScrollYRef.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
  {/* Main inner header content */}
  <div className={scrollUp ? "header-inner scroll-up" : "header-inner scroll-down"}>
    <div className="header-brand">
      <div className="header-title">
        <div className="rainbow-header-container">
  <img src="/photos/rainbow.jpg" alt="Rainbow" className="rainbow-bg" />
  <h1 className="wiggle-title">{renderWiggleText(title)}</h1>
</div>
        {subtitle && <h3>{subtitle}</h3>}
      </div>
    </div>
    <nav>
      <Link href="/">Home</Link>
      <Link href="/itinerary">Schedule</Link>
      <Link href="/signups">Signups</Link>
      <Link href="/FAQ">FAQ</Link>
      
    </nav>
  </div>
</header>
  );
}
