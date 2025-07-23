"use client";

import { useState, useEffect } from "react";
import { usePageTitle } from "./context/PageTitleContext";
import Image from "next/image";

const photoList = [
  "/photos/home2.jpg",
  "/photos/blacksnake.jpg",
  "/photos/sunflowers.jpg"
];

export default function HomePage() {
  const [, setTitle] = usePageTitle();
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    setTitle("Home");
  }, [setTitle]);


  useEffect(() => {
  const phrases = [
    "August 30th – September 1st, 2025",
    "Rhinebeck, NY"
  ];
  const timeouts: NodeJS.Timeout[] = [];
  let currentPhrase = 0;
  const taglineEl = document.getElementById("tagline");

  function showNextPhrase() {
    if (!taglineEl) return;
    
    // Add line break before second phrase
    if (currentPhrase === 1) {
      taglineEl.appendChild(document.createElement("br"));
    }

    const phraseSpan = document.createElement("span");
    phraseSpan.textContent = phrases[currentPhrase];
    phraseSpan.style.opacity = "0";
    phraseSpan.style.transition = "opacity 0.8s ease";
    taglineEl.appendChild(phraseSpan);

    timeouts.push(setTimeout(() => {
      phraseSpan.style.opacity = "1";
    }, 50));

    currentPhrase++;
    if (currentPhrase < phrases.length) {
      timeouts.push(setTimeout(showNextPhrase, 780));
    }
  }

  if (taglineEl) taglineEl.innerHTML = "";
  showNextPhrase();

  return () => {
    timeouts.forEach(clearTimeout);
    if (taglineEl) taglineEl.innerHTML = "";
  };
}, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photoList.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
  <>
    <main className="site-container">
      {/* Full-width slideshow at top */}
      <div className="slideshow-container">
        <Image
  src={photoList[currentPhoto]}
  alt="slideshow"
  fill
  style={{ objectFit: "cover" }}
  sizes="100vw"
  priority
/>

      </div>
<p className="tagline">
  <span className="line-large">
    {"August 30th – September 1st, 2025".split("").map((char, i) => (
      <span key={i} className="shroom-wiggle">
        {char === " " ? "\u00A0" : char}
      </span>
    ))}
  </span>
  <br />
  <span className="line-small">
    {"Rhinebeck, NY".split("").map((char, i) => (
      <span key={i} className="shroom-wiggle">
        {char === " " ? "\u00A0" : char}
      </span>
    ))}
  </span>
</p>


      <section className="info-row">
        <div className="text-column">
          <div className="text-content">
            <div className="accent-bar-wrapper">
  <div className="accent-bar top-bar"></div>
  <p className="accented-text">
    A three day ~festival~ in the beautiful Hudson Valley. Communal meals, music + dancing, activities, camping, excursions to nearby attractions, and overall silly times. Come for a few hours or the whole weekend long!
  </p>
  <div className="accent-bar bottom-bar"></div>
</div>
          </div>

        <div style={{ textAlign: "center", margin: "2rem 0" }}>
  <a
    href="https://partiful.com/e/8csKKrW1mCuXcfe2P708"
    target="_blank"
    rel="noopener noreferrer"
    className="rsvp-button"
  >
    RSVP Here
  </a>
</div>


          <section className="support-map-section">
            <div className="map-title">
              <h2>Where we at:</h2>
            </div>
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.1386500874223!2d-73.90491762315813!3d41.88688197124082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89dd0d8fc1a25b43%3A0x65fc8137d53572a1!2s13%20Reeder%20Rd%2C%20Rhinebeck%2C%20NY%2012572!5e1!3m2!1sen!2sus!4v1753121518559!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </section>

        </div> {/* ✅ Add this closing tag for .text-column */}
      </section>
    </main>
  </>
);
}