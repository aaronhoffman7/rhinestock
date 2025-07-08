"use client";

import { useEffect, useRef, useState } from "react";
import { usePageTitle } from "../context/PageTitleContext"; // 👈 Add this here
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [title] = usePageTitle(); // 👈 Move hook here
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
    <header className={scrollUp ? "scroll-up" : "scroll-down"}>
      <Image
        src="/logos/ReDLogo6-25.svg"
        alt="ReDelicious logo"
        className="logo"
        width={100}
        height={100}
      />
      <div className="header-title">
        <h1 className="wiggle-title">{renderWiggleText(title)}</h1>
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
