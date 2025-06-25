"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Community() {
  useEffect(() => {
    // Wiggle title
    const el = document.getElementById("wiggle-header");
    if (el) {
      const text = el.dataset.text || "Community Resources";
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
          <h1 className="wiggle-title" id="wiggle-header" data-text="Community Resources"></h1>
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
        <h2>Sharing Knowledge & Mutual Support</h2>
        <p>ReDelicious is rooted in community care and collective learning. Here are some of the resources, guides, and local organizations that inform our work, and may support yours.</p>
        <h2>Food Rescue & Redistribution</h2>
        <ul>
          <li><a href="https://foodrescue.us/" target="_blank" rel="noopener noreferrer">Food Rescue US</a></li>
          <li><a href="https://dreamingoutloud.org/" target="_blank" rel="noopener noreferrer">Dreaming Out Loud</a></li>
        </ul>
        <h2>Fermentation & Food Preservation</h2>
        <ul>
          <li><a href="https://wildfermentation.com/" target="_blank" rel="noopener noreferrer">Wild Fermentation</a> (Sandor Katz)</li>
        </ul>
        <h2>Land Access, Foraging & Growing</h2>
        <ul>
          <li><a href="https://dcgreens.org/" target="_blank" rel="noopener noreferrer">DC Greens</a></li>
          <li><a href="https://mawdc.org/" target="_blank" rel="noopener noreferrer">Mycological Association of Washington, DC</a></li>
          <li><a href="https://www.instagram.com/blackforager/?hl=en/" target="_blank" rel="noopener noreferrer">Alexis Nikole- Black Forager</a></li>
        </ul>
        <h2>Cooperative Models & Mutual Aid</h2>
        <ul>
          <li><a href="https://www.usworker.coop/" target="_blank" rel="noopener noreferrer">US Federation of Worker Cooperatives</a></li>
          <li><a href="https://seedcommons.org/" target="_blank" rel="noopener noreferrer">Seed Commons</a></li>
          <li><a href="https://dreamingoutloud.org/" target="_blank" rel="noopener noreferrer">Ward 1 Mutual Aid</a></li>
          <li><a href="https://dreamingoutloud.org/" target="_blank" rel="noopener noreferrer">Ward 2 Mutual Aid</a></li>
        </ul>
        <h2>Suggest a Resource</h2>
        <p>Know a resource that should be here? Send us your suggestions!</p>
        <form action="https://formspree.io/f/myzjbela" method="POST">
          <label>Name:<br /><input type="text" name="name" required /></label><br /><br />
          <label>Email:<br /><input type="email" name="email" required /></label><br /><br />
          <label>Resource Suggestion:<br />
            <textarea name="message" rows={5} required></textarea>
          </label><br /><br />
          <button type="submit">Submit</button>
        </form>
      </main>
      <footer>
        <p>© 2025 ReDelicious Co-op</p>
      </footer>
    </>
  );
} 