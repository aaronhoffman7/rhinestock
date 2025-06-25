"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  useEffect(() => {
    // Tagline animation
    const taglineEl = document.getElementById("tagline");
    if (taglineEl) {
      taglineEl.classList.add("visible");
    }

    // Wiggle title
    const el = document.getElementById("wiggle-header");
    if (el) {
      const text = el.dataset.text || "About Us";
      el.innerHTML = '';
      for (const char of text) {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        el.appendChild(span);
      }
    }
  }, []);

  return (
    <>
      <Image src="/logos/lilshrooms.svg" alt="Shroom left" className="margin-shroom left-shroom" width={50} height={50} />
      <Image src="/logos/lilshrooms.svg" alt="Shroom right" className="margin-shroom right-shroom" width={50} height={50} />
      <div id="star-container"></div>
      <header>
        <div className="header-top">
          <Image src="/logos/ReDLogo6-25.svg" alt="ReDelicious logo" className="logo" width={100} height={100} />
          <h1 className="wiggle-title" id="wiggle-header" data-text="About Us"></h1>
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
      <main>
        <section>
          <p className="subtagline" id="tagline">free food. good community. on a farm. every sunday.</p>
          <h2>What We Do</h2>
          <p>ReDelicious is a food lab co-op transforming food waste into delicious, sustainable, and educational experiences. We host food preservation + fermentation workshops, community feasts, and mutual aid events throughout DC.</p>
          <h2>History of ReDelicious</h2>
          <p>Coming soon</p>
        </section>
      </main>
      <footer>
        <p>© 2025 ReDelicious Co-op</p>
      </footer>
    </>
  );
} 