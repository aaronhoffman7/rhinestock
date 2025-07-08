"use client";

import { useEffect } from "react";
import { usePageTitle } from "../context/PageTitleContext";

export default function CalendarPage() {
  const [, setTitle] = usePageTitle();

  useEffect(() => {
    setTitle("Events");
  }, [setTitle]);

  return (
    <>
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
    </>
  );
}
