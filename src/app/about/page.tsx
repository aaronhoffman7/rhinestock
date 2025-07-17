"use client";

import { useEffect, useRef } from "react";
import { usePageTitle } from "../context/PageTitleContext";

export default function AboutPage() {
  const [, setTitle] = usePageTitle();
  const taglineRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    setTitle("About Us");

    // Safe DOM manipulation via ref
    const el = taglineRef.current;
    if (el) {
      requestAnimationFrame(() => {
        el.classList.add("visible");
      });
    }
  }, [setTitle]);

  return (
    <main>
      <section>
        <p className="subtagline" ref={taglineRef}>
          free food. good community. on a farm. every sunday.
        </p>
        <h2>What We Do</h2>
        <p>
          ReDelicious is a food lab co-op transforming food waste into delicious,
          sustainable, and educational experiences. We host food preservation + fermentation
          workshops, community feasts, and mutual aid events throughout DC.
        </p>
        <h2>History of ReDelicious</h2>
        <p>We were founded in 2022 by a group of friends with overlapping interests in food justice, fermentation, mycology, foraging, and lots more. We began regularly gleaning leftover food from farmer's markets- with the help of with the help of {" "}<a href="https://foodrescue.us" target="_blank" rel="noopener noreferrer"> Food Rescue US
  </a>- to host a neighborhood distro at a home in Mt. Pleasant, with a goal to not just give away food but to educate and facilitate community empowerment in a social space. The word spread, and we outgrew our normal gathering spot and decided it was time to formally organize. What started as a Sunday stoop hang where neighbors gathered to give away and repurpose food that would otherwise be wasted, organically grew into the co-op food lab it is today. We've been growing fast and have lots more history to write. <a href="/interest">Get involved today.</a></p>
        <h2>Events & Programming</h2>
        <p>We have all kinds of events. Check our calendar to stay in the loop. Past topics include:</p>
        <ul>
          <li>Pickling and lacto-fermentation</li>
          <li>Hot sauce crafting</li>
          <li>Sourdough</li>
          <li>Mushroom cultivation + mycology lab techniques</li>
          <li>Kombucha, naturally fermented sodas + kefir</li>
          <li>Koji fermentation (miso, shoyu, amazake, etc.)</li>
          <li>ReDelish Book Club</li>
          <li>Yogo, breathwork, soundbathing</li>
        </ul>
        <p>Want to co-host an event? <a href="/interest">Propose a collab!</a></p>
      </section>

      <h2>Consulting & Advocacy</h2>
      <p>
        Our member-owners are involved in a wide range of work across environmental justice, food sovereignty, mutual aid, organizing, and cooperative models...
      </p>
      <ul>
        <li>Food justice and food sovereignty</li>
        <li>Environmental and climate justice</li>
        <li>Tenant and housing rights organizing</li>
        <li>Urban agriculture and land stewardship</li>
        <li>Mutual aid systems and cooperative development</li>
        <li>Public programming and popular education</li>
        <li>Fermentation, preservation, and circular food systems</li>
        <li>Garden design + conceptual planning, grow room setup assistance</li>
      </ul>
    </main>
  );
}
