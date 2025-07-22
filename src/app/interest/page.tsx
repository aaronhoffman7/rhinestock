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
        <h2>Let us answer ur questions</h2>
        <p>If you&apos;re interested in volunteering, join us anytime — we welcome new faces and many ways to contribute to food rescue, fermentation, cooking, and more!</p>
        <h2>bla bla</h2>
        <p>Fill out the form below to stay up to date on events and other communications- produce puns guaranteed.</p>
        <h2>How do I get here</h2>
        <p>
          la de da
        </p>
      </main>
    </>
  );
}
