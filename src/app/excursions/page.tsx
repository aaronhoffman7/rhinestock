"use client";

import { useEffect } from "react";
import { usePageTitle } from "../context/PageTitleContext";
import Image from "next/image";

export default function ExcursionsPage() {
  const [, setTitle] = usePageTitle();

  useEffect(() => {
    setTitle("Excursions");
  }, [setTitle]);

  const excursions = [
    {
  name: "Swimming at a local hole",
  description: (
    <>
      Take a dip at a{" "}
      <a
        href="https://maps.app.goo.gl/nsFmLsj4EZfRv8YY7"
        target="_blank"
        rel="noopener noreferrer"
      >
        local spot
      </a>
      . Cold water guaranteed.
    </>
  ),
  image: "/photos/hole.jpg"
},
    {
      name: "Hiking in Ferncliff Forest / Blithewood",
      description: "Short but magical hike with a fire tower offering a panoramic Hudson Valley view.",
      image: "/photos/ferncliff.jpg"
    },
    {
      name: "Pick your own produce and sip local ciders",
      description: "Greig Farm + Rose Hill — apples, berries, goats, and cider flights.",
      image: "/photos/rosehill.jpg"
    },
    {
      name: "Rhinebeck Farmers Market",
      description: "Sunday morning market with local produce, prepared food, music, and crafts.",
      image: "/photos/market.jpg"
    }
  ];

  return (
    <main className="site-container">
      <h2 style={{ fontSize: "2.5rem", margin: "2rem 0 1.5rem", textAlign: "center" }}>
        Local Excursions
      </h2>
      <div className="text-column">
        <p style={{ marginBottom: "2.3rem" }}>
          Explore the Hudson Valley! These are a few nearby options we&apos;re excited about — totally optional,
          but available if you want to break out for a mini adventure.
        </p>

        <div className="excursion-grid">
          {excursions.map((excursion, idx) => (
            <div key={idx} className="excursion-card">
              <div className="excursion-image">
                <Image
                  src={excursion.image}
                  alt={excursion.name}
                  width={500}
                  height={300}
                  style={{ objectFit: "cover", borderRadius: "1rem" }}
                />
              </div>
              <div className="excursion-text">
                <h4>{excursion.name}</h4>
                <p>{excursion.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
