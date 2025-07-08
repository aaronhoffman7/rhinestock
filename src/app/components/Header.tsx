"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  const [scrollUp, setScrollUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Wiggle effect
  useEffect(() => {
    const el = document.getElementById("wiggle-header");
    if (el) {
      el.innerHTML = "";
      for (const char of title) {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        el.appendChild(span);
      }
    }
  }, [title]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollUp(currentY < lastScrollY);
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={scrollUp ? "scroll-up" : "scroll-down"}>
      <div className="header-top">
        <Image
          src="/logos/ReDLogo6-25.svg"
          alt="ReDelicious logo"
          className="logo"
          width={100}
          height={100}
        />
        <div className="header-title">
          <h1 className="wiggle-title" id="wiggle-header" data-text={title}></h1>
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
    </header>
  );
}