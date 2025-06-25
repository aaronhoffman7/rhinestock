"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Members() {
  useEffect(() => {
    // Wiggle title
    const el = document.getElementById("wiggle-header");
    if (el) {
      const text = el.dataset.text || "Meet Our Members";
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
          <h1 className="wiggle-title" id="wiggle-header" data-text="Meet Our Members"></h1>
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
        <section className="bio">
          <h2>Bri</h2>
          <p>Fermentation specialist and co-op co-founder. Loves koji and community feasts.</p>
        </section>
        <section className="bio">
          <h2>Denis</h2>
          <p>Designer and food waste advocate. Leads vinegar and kraut workshops.</p>
        </section>
        <section className="bio">
          <h2>Maya</h2>
          <p>Fermentation specialist and co-op co-founder. Loves koji and community feasts.</p>
        </section>
        <section className="bio">
          <h2>Aaron</h2>
          <p>Fermentation specialist and co-op co-founder. Loves koji and community feasts.</p>
        </section>
        <section className="bio">
          <h2>Jazmine</h2>
          <p>Fermentation specialist and co-op co-founder. Loves koji and community feasts.</p>
        </section>
        <section className="bio">
          <h2>Kerim</h2>
          <p>Fermentation specialist and co-op co-founder. Loves koji and community feasts.</p>
        </section>
        <section className="bio">
          <h2>Sam</h2>
          <p>Fermentation specialist and co-op co-founder. Loves koji and community feasts.</p>
        </section>
        <section className="bio">
          <h2>Dave</h2>
          <p>Fermentation specialist and co-op co-founder. Loves koji and community feasts.</p>
        </section>
        <section className="bio">
          <h2>ç</h2>
          <p>Fermentation specialist and co-op co-founder. Loves koji and community feasts.</p>
        </section>
        <section className="bio">
          <h2>Carrie</h2>
          <p>Fermentation specialist and co-op co-founder. Loves koji and community feasts.</p>
        </section>
        <section className="bio">
          <h2>Aileen</h2>
          <p>Fermentation specialist and co-op co-founder. Loves koji and community feasts.</p>
        </section>
        <section className="bio">
          <h2>Tina</h2>
          <p>Fermentation specialist and co-op co-founder. Loves koji and community feasts.</p>
        </section>
        <section className="bio">
          <h2>Tiffany</h2>
          <p>Fermentation specialist and co-op co-founder. Loves koji and community feasts.</p>
        </section>
        <section className="bio">
          <h2>Soniya</h2>
          <p>Fermentation specialist and co-op co-founder. Loves koji and community feasts.</p>
        </section>
        <section className="bio">
          <h2>Lior</h2>
          <p>Fermentation specialist and co-op co-founder. Loves koji and community feasts.</p>
        </section>
        <section className="bio">
          <h2>Charlie</h2>
          <p>Fermentation specialist and co-op co-founder. Loves koji and community feasts.</p>
        </section>
        <section className="bio">
          <h2>Axol</h2>
          <p>Fermentation specialist and co-op co-founder. Loves koji and community feasts.</p>
        </section>
        <section className="bio">
          <h2>Juan</h2>
          <p>Fermentation specialist and co-op co-founder. Loves koji and community feasts.</p>
        </section>
        <section className="bio">
          <h2>Eileen</h2>
          <p>Fermentation specialist and co-op co-founder. Loves koji and community feasts.</p>
        </section>
        <section className="bio">
          <h2>Hannah</h2>
          <p>Fermentation specialist and co-op co-founder. Loves koji and community feasts.</p>
        </section>
      </main>
      <footer>
        <p>© 2025 ReDelicious Co-op</p>
      </footer>
    </>
  );
} 