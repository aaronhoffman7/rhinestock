"use client";

import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MarginShrooms from "../components/MarginShrooms";

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
      <MarginShrooms />
      <Header title="Meet Our Members" />
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
      <Footer />
    </>
  );
}
