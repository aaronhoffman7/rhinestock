"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Interest() {
  useEffect(() => {
    // Wiggle title
    const el = document.getElementById("wiggle-header");
    if (el) {
      const text = el.dataset.text || "Join the Co-op";
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
          <h1 className="wiggle-title" id="wiggle-header" data-text="Join the Co-op"></h1>
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
        <h2>Volunteer with ReDelicious</h2>
        <p>If you&apos;re interested in volunteering, join us anytime — we welcome new faces and many ways to contribute to food rescue, fermentation, cooking, and more!</p>
        <h2>Join the list</h2>
        <p>to stay up to date on events and other communications (produce puns guaranteed)</p>
        <h2>Partner with us</h2>
        <p>
          We are always looking for collaborations with organizations, businesses, collectives, and individuals. 
          Reach out to us through the form below or send an email to 
          <a href="mailto:redeliciouscoop@gmail.com">redeliciouscoop@gmail.com</a> to discuss ideas, big or small.
        </p>
        <div className="form-container">
          <iframe 
            src="https://forms.oneswitchboard.com/redelish/hello" 
            width="100%" 
            height="2167" 
            style={{border: "none"}}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </main>
      <footer>
        <p>© 2025 ReDelicious Co-op</p>
      </footer>
    </>
  );
} 