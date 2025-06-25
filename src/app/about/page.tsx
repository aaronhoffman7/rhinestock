"use client";

import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MarginShrooms from "../components/MarginShrooms";

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
      <MarginShrooms />
      <Header title="About Us" />
      <main>
        <section>
          <p className="subtagline" id="tagline">free food. good community. on a farm. every sunday.</p>
          <h2>What We Do</h2>
          <p>ReDelicious is a food lab co-op transforming food waste into delicious, sustainable, and educational experiences. We host food preservation + fermentation workshops, community feasts, and mutual aid events throughout DC.</p>
          <h2>History of ReDelicious</h2>
          <p>Coming soon</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
