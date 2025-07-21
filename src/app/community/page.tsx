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
        <h2>Things to Know</h2>
        <p>ReDelicious is rooted in community care and collective learning. Here are some of the resources, guides, and local organizations that inform our work, and may support yours.</p>  
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
