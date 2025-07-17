"use client";

import { useState, useEffect } from "react";
import { usePageTitle } from "./context/PageTitleContext";
import Image from "next/image";

const photoList = [
  "/photos/cherry.jpg",
  "/photos/freebread.jpg",
  "/photos/strawbs.png"
];

export default function HomePage() {
  const [, setTitle] = usePageTitle();
  const [currentPhoto, setCurrentPhoto] = useState(0);

  // Set page title
  useEffect(() => {
    setTitle("Home");
  }, [setTitle]);

  // Animate tagline
  useEffect(() => {
    const phrases = [
      "turning",
      "food",
      "waste",
      "into",
      "delicious",
      "community"
    ];
    const timeouts: NodeJS.Timeout[] = [];
    let currentPhrase = 0;
    const taglineEl = document.getElementById("tagline");

    function showNextPhrase() {
      if (!taglineEl) return;
      const phraseSpan = document.createElement("span");
      phraseSpan.textContent = (currentPhrase > 0 ? " " : "") + phrases[currentPhrase];
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

  // Cycle slideshow photos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photoList.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);



  return (
    <>
      <main>
        <p className="tagline" id="tagline"></p>

        <section className="info-row">
          <div className="photo-column">
            <Image
              src={photoList[currentPhoto]}
              alt="slideshow"
              width={300}
              height={300}
              className="homepage-photo"
            />
          </div>

          <div className="text-column">
            <div className="text-content">
              <p>
                ReDelicious is a food lab co-op transforming food waste into delicious, sustainable, and educational experiences. We host a weekly community feast + distro at{" "}
                <a href="https://www.edgewoodcommunityfarm.org" target="_blank">
                  Edgewood Community Farm
                </a>, and pop up at a variety of locations for regularly scheduled workshops and events.
              </p>
              <p>
                We are building community through cooking, preserving, redistributing, cultivating, and foraging for delicious food. <strong>All are welcome and the food is free.</strong>
              </p>
            </div>

            <section className="support-map-section">
  <div className="support-map-row">
    {/* LEFT COLUMN: h2 + p + donate buttons */}
    <div className="donate-column">
      <h2>Support Us</h2>
      <p>If you like what we do, consider supporting us:</p>
      <div className="donate-links">
        <a
          href="https://redelish.us/patreon"
          target="_blank"
          className="donate-button patreon"
          rel="noopener noreferrer"
        >
          Subscribe on Patreon
        </a>
        <a
          href="https://venmo.com/redeliciousdc"
          target="_blank"
          className="donate-button venmo"
          rel="noopener noreferrer"
        >
          Tip us on Venmo
        </a>
      </div>
    </div>

    {/* RIGHT COLUMN: map and callout */}
    <div className="map-embed">
      <div className="map-callout">
        <h2>Join us Sundays 3:30–5:30</h2>
        <div className="arrow-row">
          <div className="arrow"></div>
          <div className="arrow delay-1"></div>
          <div className="arrow delay-2"></div>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3993.3696878235205!2d-77.00621952327116!3d38.92037027171917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b900785ca76f%3A0x18532cb6dbfb476b!2sEdgewood%20Community%20Farm!5e1!3m2!1sen!2sus!4v1752706989478!5m2!1sen!2sus"
        width="250"
        height="250"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div> {/* close .support-map-row */}
</section>
          </div> {/* close .text-column */}
        </section> {/* ✅ now .info-row is properly closed */}
      </main>
    </>
  );
}

