"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MarginShrooms from "../components/MarginShrooms";
import Image from "next/image";

export default function Shop() {

  return (
    <>
      <MarginShrooms />
      <Header title="Shop" />
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
      <Footer />
    </>
  );
}
