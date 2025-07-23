"use client";

import { useEffect } from "react";
import { usePageTitle } from "../context/PageTitleContext";

export default function ExcursionsPage() {
  const [, setTitle] = usePageTitle();

  useEffect(() => {
    setTitle("Excursions");
  }, [setTitle]);

  const excursions = [
    {
      name: "Swimming at a local hole",
      description: "A beautiful state park with a beach, shaded picnic areas, and kayak rentals."
    },
    {
      name: "Hiking in Ferncliff Forest/Blithewood",
      description: "Short but magical hike with a fire tower offering a panoramic Hudson Valley view."
    },
    {
      name: "Pick your own produce and sip local ciders",
      description: "Greig Farm + Rose Hill"
    },
    {
      name: "Rhinebeck Farmers Market",
      description: "Sunday morning market with local produce, prepared food, music, and crafts."
    },
    {
      name: "Walkway Over the Hudson",
      description: "A scenic half-mile walk through tidal marshland to a historic lighthouse on the Hudson."
    },
    {
      name: "Local nightlife",
      description: "not much but there's a couple spots"
    },
    {
      name: "Art Galleries in Hudson",
      description: "Browse local artists, quirky installations, and handmade goods up and down Warren Street."
    }
  ];

  return (
    <main className="site-container">
      <h2 style={{ fontSize: "2.5rem", margin: "2rem 0 1.5rem", textAlign: "center" }}>
  Local Excursions
</h2>
      <div className="text-column">
        <p style={{ marginBottom: "2.3rem" }}>Explore the Hudson Valley! These are a few nearby options we’re excited about- totally optional, but available if you want to break out for a mini adventure.</p>

        <ul style={{ listStyleType: "none", padding: 0 }}>
          {excursions.map((excursion, idx) => (
            <li key={idx} className="text-content" style={{ marginBottom: "1.5rem" }}>
              <h4>{excursion.name}</h4>
              <p>{excursion.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
