import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Tagline animation
    const phrases = [
      "turning",
      "food",
      "waste",
      "into",
      "delicious",
      "community"
    ];
    let currentPhrase = 0;
    const taglineEl = document.getElementById("tagline");
    function showNextPhrase() {
      if (!taglineEl) return;
      const phraseSpan = document.createElement("span");
      phraseSpan.textContent = (currentPhrase > 0 ? " " : "") + phrases[currentPhrase];
      phraseSpan.style.opacity = "0";
      phraseSpan.style.transition = "opacity 0.8s ease";
      taglineEl.appendChild(phraseSpan);
      setTimeout(() => {
        phraseSpan.style.opacity = "1";
      }, 50);
      currentPhrase++;
      if (currentPhrase < phrases.length) {
        setTimeout(showNextPhrase, 780);
      }
    }
    showNextPhrase();
    // Wiggle title
    const el = document.getElementById("wiggle-header");
    if (el) {
      const text = el.dataset.text || "ReDelicious";
      el.innerHTML = '';
      for (let char of text) {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        el.appendChild(span);
      }
    }
  }, []);

  return (
    <>
      <img src="/logos/lilshrooms.svg" alt="Shroom left" className="margin-shroom left-shroom" />
      <img src="/logos/lilshrooms.svg" alt="Shroom right" className="margin-shroom right-shroom" />
      <div id="star-container"></div>
      <header>
        <div className="header-top">
          <img src="/logos/ReDLogo6-25.svg" alt="ReDelicious logo" className="logo" />
          <div className="header-title">
            <h1 className="wiggle-title" id="wiggle-header" data-text="ReDelicious"></h1>
            <h3>DC's Food Lab Co-op</h3>
          </div>
        </div>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/calendar">Events</a>
          <a href="/interest">Get Involved</a>
          <a href="/members">Members</a>
          <a href="/faq">FAQ</a>
          <a href="/community">Resources</a>
          <a href="/shop">Shop</a>
        </nav>
      </header>
      <main>
        <p className="tagline" id="tagline"></p>
        <section className="edgewood-highlight two-column">
          <div className="column-text">
            <p>ReDelicious is a food lab co-op transforming food waste into delicious, sustainable, and educational experiences. We host a weekly community feast + distro at <a href="https://www.edgewoodcommunityfarm.org" target="_blank">Edgewood Community Farm</a>, and pop up at a variety of locations for regularly scheduled workshops and events.</p>
            <p>We are building community through cooking, preserving, redistributing, cultivating, and foraging for delicious food. All are welcome and the food is free.</p>
          </div>
          <div className="map-column">
            <div className="map-callout">
              <p>🍴 Join us Sundays 3:30–5:30</p>
              <div className="arrow-row">
                <div className="arrow"></div>
                <div className="arrow delay-1"></div>
                <div className="arrow delay-2"></div>
              </div>
            </div>
            <div className="map-embed">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3993.3696878235205!2d-77.00621952327116!3d38.92037027171917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b900785ca76f%3A0x18532cb6dbfb476b!2sEdgewood%20Community%20Farm!5e1!3m2!1sen!2sus!4v1750660267785!5m2!1sen!2sus" width="300" height="300" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </section>
        <h2>Support Us</h2>
        <p>If you like what we do, consider supporting us</p>
        <div className="donate-links">
          <a href="https://redelish.us/patreon" target="_blank" className="donate-button patreon" rel="noopener noreferrer">Subscribe on Patreon</a>
          <a href="https://venmo.com/redeliciousdc" target="_blank" className="donate-button venmo" rel="noopener noreferrer">Tip us on Venmo</a>
        </div>
      </main>
      <footer>
        <p>© 2025 ReDelicious Co-op</p>
      </footer>
    </>
  );
}
