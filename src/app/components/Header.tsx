"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  const [scrollUp, setScrollUp] = useState(true);
  const lastScrollYRef = useRef(0);

  function renderWiggleText(text: string) {
    return (
      <>
        {Array.from(text).map((char, i) => (
          <span key={i}>{char === " " ? "\u00A0" : char}</span>
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
    <div className={scrollUp ? "header-inner scroll-up" : "header-inner scroll-down"}>
      <div className="header-brand">
        <Image
          src="/logos/ReDLogo6-25.svg"
          alt="ReDelicious logo"
          className="logo"
          width={80}
          height={80}
        />
        <div className="header-title">
          <h1 className="wiggle-title">{renderWiggleText(title)}</h1>
          {subtitle && <h3>{subtitle}</h3>}
        </div>
      </div>
    <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About Us</Link>
        <Link href="/calendar">Events</Link>
        <Link href="/interest">Get Involved</Link>
        <Link href="/members">Members</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/community">Resources</Link>
        <Link href="/shop">Shop</Link>
      </nav>

 <a
      href="https://instagram.com/redeliciousdc"
      target="_blank"
      rel="noopener"
      className="instagram-link"
      aria-label="Instagram"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="ig-icon">
        <path d="M224,202.66A53.34,53.34,0,1,0,277.34,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.29-30.3C293.4,124,224,124,224,124s-69.4,0-94.41,7.37a54,54,0,0,0-30.29,30.3C84,149.6,84,224,84,224s0,74.4,7.37,94.41a54,54,0,0,0,30.29,30.3c25,7.36,94.41,7.36,94.41,7.36s69.4,0,94.41-7.36a54,54,0,0,0,30.29-30.3C364,298.4,364,224,364,224S364,149.6,348.71,161.66ZM224,292a68,68,0,1,1,68-68A68.07,68.07,0,0,1,224,292Zm88.38-122.41a15.87,15.87,0,1,1,15.87-15.87A15.87,15.87,0,0,1,312.38,169.59Z"/>
      </svg>
    </a>


  </div>
</header>
  );
}
