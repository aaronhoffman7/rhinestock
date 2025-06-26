"use client";

import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MarginShrooms from "../components/MarginShrooms";

export default function About() {
  useEffect(() => {
    const taglineEl = document.getElementById("tagline");
    if (taglineEl) {
      taglineEl.classList.add("visible");
    }
  }, []);

  return (
    <>
      <MarginShrooms />
      <Header title="About Us" />
      <main>
      <section>
  <p className="subtagline" id="tagline">
    free food. good community. on a farm. every sunday.
  </p>
  <h2>What We Do</h2>
  <p>
    ReDelicious is a food lab co-op transforming food waste into delicious,
    sustainable, and educational experiences. We host food preservation + fermentation
    workshops, community feasts, and mutual aid events throughout DC.
  </p>
  <h2>History of ReDelicious</h2>
  <p>Coming soon</p>
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
  Our member-owners are involved in a wide range of work across environmental justice, food sovereignty, mutual aid, organizing, and cooperative models. We bring lived experience and deep community ties to issues like tenants’ + workers' rights, land access, ecological restoration, and local food systems. As a co-op, we offer consulting, facilitation, and public education rooted in collective care and radical imagination.
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
      <Footer />
    </>
  );
}
