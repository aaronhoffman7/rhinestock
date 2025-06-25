"use client";

import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MarginShrooms from "../components/MarginShrooms";

export default function Calendar() {
  useEffect(() => {
    // Wiggle title
    const el = document.getElementById("wiggle-header");
    if (el) {
      const text = el.dataset.text || "Events";
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
      <MarginShrooms />
      <Header title="Events" />
      <main style={{
        padding: "2em",
        maxWidth: "1000px",
        margin: "0 auto"
      }}>
        <p style={{
          fontSize: "1.8em",
          fontWeight: "bold",
          color: "#590285",
          marginBottom: "1em",
          textAlign: "center"
        }}>✨ Check out what&apos;s coming up✨</p>
        <div style={{
          border: "5px solid #590285",
          borderRadius: "20px",
          padding: "10px",
          background: "#fffdf7",
          boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
          transition: "transform 0.3s ease"
        }}>
          <iframe 
            src="https://calendar.google.com/calendar/embed?src=1b505a980c0444a41f2399276068d513a66156da379165a635d0ed68875b5cad%40group.calendar.google.com&ctz=America%2FNew_York" 
            style={{
              border: "none",
              width: "100%",
              height: "700px",
              borderRadius: "15px"
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
