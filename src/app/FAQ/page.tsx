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

<main className="site-container">
  
 <h2 style={{ fontSize: "2.5rem", margin: "2rem 0 1.5rem" }}>
  Let us help u
</h2>
  
  <section>
    <h2>How do I get there?</h2>
<p>
  Were located at <a href="https://maps.app.goo.gl/dNo3qX9ordSLAPsz6" target="_blank" rel="noopener noreferrer"> 13 Reeder Road, Rhinebeck, NY.
  </a> You can get here by <a href="/signups#carpool">carpool</a> or train: either take  
  <a href="https://www.amtrak.com/tickets/departure.html" target="_blank" rel="noopener noreferrer"> Amtrak from NYC Penn Station to Rhinecliff
  </a> or <a href="https://new.mta.info/schedules/metro-north-railroad" target="_blank" rel="noopener noreferrer">
    Metro North from Grand Central Station to Poughkeepsie
  </a>.
</p>
  </section>

  <section>
    <h2>What should I bring?</h2>
    <p>Tent + camping supplies if applicable, bathing suit, closed toed shoes for potential walks or mini-hikes, fun food + drinks if you'd like, special skills + craft supplies, toys and games, silly outfits- the world is your oyster.</p>
  </section>

  <section>
    <h2>Where can I sleep?</h2>
    <p>There are two queen beds, three twins, a bunch of couches, and lots of floor space for mattresses + sleeping pads. Other than that, there is plenty of space to pitch a tent or hammock anywhere on the property.</p>
  </section>

  <section>
    <h2>Can I bring friends?</h2>
    <p>Yeah! Just let us know and have them RSVP so we can prepare.</p>
  </section>

  <section>
    <h2>How do I stay updated?</h2>
    <p>Hit up Aaron: 845-489-5465  or  Elliot: 845-489-2973, and keep your Partiful text notifications on</p>
  </section>
</main>
    </>
  );
}
