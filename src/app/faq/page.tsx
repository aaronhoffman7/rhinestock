"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FAQ() {
  useEffect(() => {
    // Wiggle title
    const el = document.getElementById("wiggle-header");
    if (el) {
      const text = el.dataset.text || "FAQ";
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
          <h1 className="wiggle-title" id="wiggle-header" data-text="FAQ"></h1>
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
          <h2>Why are we a cooperative, not a nonprofit?</h2>
          <p>We believe in economic democracy—having workers own and control a business together. We don&apos;t sell food and any money we receive goes back into labor, fun ingredients, and shared assets. Our co-op structure lets us build sustainable and circular economies rooted in collective wealth.</p>
        </section>
        <section>
          <h2>Where are we going from here?</h2>
          <p>We hope to expand the region&apos;s food sovereignty by providing ongoing food education programming that is inherently social and radical. We eventually hope to open a public kitchen lab and cafe + community, art, and urban ag space in DC. We want to connect big ideas to real lives through food.</p>
        </section>
      </main>
      <footer>
        <p>© 2025 ReDelicious Co-op</p>
      </footer>
    </>
  );
} 