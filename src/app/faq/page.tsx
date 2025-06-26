"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MarginShrooms from "../components/MarginShrooms";

export default function FAQ() {

  return (
    <>
      <MarginShrooms />
      <Header title="FAQ" />
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
      <Footer />
    </>
  );
}
