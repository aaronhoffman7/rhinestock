"use client";

import { useEffect } from "react";
import { usePageTitle } from "../context/PageTitleContext";

export default function InterestPage() {
  const [, setTitle] = usePageTitle();

  useEffect(() => {
    setTitle("FAQ");
  }, [setTitle]);


  return (
    <>

      <main>
        <h2>Volunteer with ReDelicious</h2>
        <p>If you&apos;re interested in volunteering, join us anytime — we welcome new faces and many ways to contribute to food rescue, fermentation, cooking, and more!</p>
        <h2>Join the list</h2>
        <p>Fill out the form below to stay up to date on events and other communications- produce puns guaranteed.</p>
        <h2>Partner with us</h2>
        <p>
          We are always looking for collaborations with organizations, businesses, collectives, and individuals. 
          Reach out to us through the form below or send an email to <a href="mailto:redeliciouscoop@gmail.com">redeliciouscoop@gmail.com</a> to discuss ideas, big or small.
        </p>
        <div className="form-container">
          <iframe 
            src="https://forms.oneswitchboard.com/redelish/hello" 
            width="100%" 
            height="2167" 
            style={{border: "none"}}
            allowFullScreen
            loading="lazy"
          />
        </div>  
      </main>
    </>
  );
}
