"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Shop() {
  useEffect(() => {
    // Wiggle title
    const el = document.getElementById("wiggle-header");
    if (el) {
      const text = el.dataset.text || "Shop";
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
          <h1 className="wiggle-title" id="wiggle-header" data-text="Shop"></h1>
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
        <h2>merch, goodies, etc.</h2>
        <p>Under construction- more coming soon!</p>
        <div className="product-grid">
          <div className="product-card">
            <h4>ReDelish T-Shirt</h4>
            <Image src="/photos/cherry.jpg" alt="ReDelish T-Shirt" className="product-image" width={200} height={200} />
            <p>Support ReDelicious and stay fresh in this limited-edition Pickle Dreamz tee.</p>
            <p className="price">$25</p>
            <button>Buy Now</button>
          </div>
          <div className="product-card">
            <h4>Sampler Bottle</h4>
            <Image src="/photos/cherry.jpg" alt="Vinegar" className="product-image" width={200} height={200} />
            <p>Buy once, refill forever. Rotating releases of small batch, seasonal, wild fermentation magic from DC&apos;s food waste rescue lab.</p>
            <p className="price">from $20</p>
            <button>Buy Now</button>
          </div>
          <div className="product-card">
            <h4>Mushroom Grow Kits</h4>
            <Image src="/photos/cherry.jpg" alt="Mycelium Candle" className="product-image" width={200} height={200} />
            <p>Grow your own local, gourmet, and medicinal varieties</p>
            <p className="price">from $15</p>
            <button>Buy Now</button>
          </div>
        </div>
      </main>
      <footer>
        <p>© 2025 ReDelicious Co-op</p>
      </footer>
    </>
  );
} 