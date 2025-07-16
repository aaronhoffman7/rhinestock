"use client";

import { useEffect } from "react";
import { usePageTitle } from "../context/PageTitleContext";
import Image from "next/image";


export default function CommunityPage() {
  const [, setTitle] = usePageTitle();

  useEffect(() => {
    setTitle("Community Resources");
  }, [setTitle]);

  return (
    <>
      <main>
        <h2>merch, goodies, etc.</h2>
        <p>Under construction- more coming soon!</p>
        <div className="product-grid">
          <div className="product-card">
            <h4>ReDelish T-Shirt</h4>
            <Image src="/photos/strawbs.png" alt="ReDelish T-Shirt" className="product-image" width={200} height={200} />
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
            <Image src="/photos/freebread.jpg" alt="Mycelium Candle" className="product-image" width={200} height={200} />
            <p>Grow your own local, gourmet, and medicinal varieties</p>
            <p className="price">from $15</p>
            <button>Buy Now</button>
          </div>
        </div>
      </main>
    </>
  );
}
