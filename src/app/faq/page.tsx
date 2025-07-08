"use client";

import React from "react";

function FAQPage() {
  return (
    <main>
      <section>
        <h2>Why are we a cooperative, not a nonprofit?</h2>
        <p>
          We believe in economic democracy—having workers own and control a
          business together. The money we receive goes back into labor,
          ingredients, and assets, and accessible programming. Our co-op
          structure lets us build sustainable and circular economies rooted in
          collective wealth, and be political, in ways that traditional
          non-profits often cannot.
        </p>
      </section>

      <section>
        <h2>Where are we going from here?</h2>
        <p>
          We hope to expand the region&apos;s food sovereignty by providing
          ongoing food education programming that is inherently social and
          radical. We eventually hope to open a public kitchen lab and cafe +
          community, art, and urban ag space in DC. We want to connect big ideas
          to real lives through food.
        </p>
      </section>

      <section>
        <h2>How do I become a member?</h2>
        <p>
          The best way to move toward membership is to stay actively involved —
          come to Sunday gatherings, join us at events, and express your
          interest to an existing member. Membership tends to grow organically
          from shared work, trust, and alignment with our values — and we make
          nominations several times a year. Everyone is welcome to participate,
          and many of our events and workshops are free or offered on a sliding
          scale.
        </p>
      </section>

      <section>
        <h2>
          I have access to food that gets wasted regularly. How can I get it
          ReDelicious?
        </h2>
        <p>
          We&apos;re always open to new partnerships for gleaning food. Please
          get in contact with us and let&apos;s try to make it work.
        </p>
      </section>
    </main>
  );
}

// Pass this up to layout
FAQPage.pageTitle = "FAQ";

export default FAQPage;
