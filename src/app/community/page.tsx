"use client";

import { useEffect } from "react";
import { usePageTitle } from "../context/PageTitleContext";

export default function CommunityPage() {
  const [, setTitle] = usePageTitle();

  useEffect(() => {
    setTitle("Community Resources");
  }, [setTitle]);

  return (
    <>
      <main>
        <h2>Sharing Knowledge & Mutual Support</h2>
        <p>ReDelicious is rooted in community care and collective learning. Here are some of the resources, guides, and local organizations that inform our work, and may support yours.</p>
        <h2>Food Rescue & Redistribution</h2>
        <ul>
          <li><a href="https://foodrescue.us/" target="_blank" rel="noopener noreferrer">Food Rescue US</a></li>
          <li><a href="https://marthastable.org/" target="_blank" rel="noopener noreferrer">Martha’s Table</a></li>
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
          <li><a href="https://linktr.ee/dcw1mutualaid" target="_blank" rel="noopener noreferrer">Ward 1 Mutual Aid</a></li>
          <li><a href="https://linktr.ee/W2MA" target="_blank" rel="noopener noreferrer">Ward 2 Mutual Aid</a></li>
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
    </>
  );
}
