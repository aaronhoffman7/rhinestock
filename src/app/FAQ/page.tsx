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
  <h3>Let us help u</h3>
  
  <section>
    <h2>How do I get there?</h2>
<p>
  We’re located at 13 Reeder Road, Rhinebeck NY. You can get here by carpool or train: either take  
  <a href="https://www.amtrak.com/tickets/departure.html" target="_blank" rel="noopener noreferrer"> Amtrak from NYC Penn Station to Rhinecliff
  </a> or <a href="https://new.mta.info/schedules/metro-north-railroad" target="_blank" rel="noopener noreferrer">
    Metro-North from Grand Central Station to Poughkeepsie
  </a>.
</p>
  </section>

  <section>
    <h2>What should I bring?</h2>
    <p>Tent + camping supplies if applicable, bathing suit, closed toed shoes for potential walks or mini-hikes, special skills + craft supplies to share, toys and games, silly outfits!</p>
  </section>

  <section>
    <h2>Where can I sleep?</h2>
    <p>There are two queen beds, three twins, a bunch of couches, and lots of floor space for mattresses + sleeping pads. Other than that, there is plenty of space to pitch a tent or hammock anywhere on the property.</p>
  </section>

  <section>
    <h2>Can I bring friends or kids?</h2>
    <p>Yes! This is a space for everyone. Friends, kids, and other companions are welcome — just let us know so we can prepare.</p>
  </section>

  <section>
    <h2>How do I stay updated?</h2>
    <p>idk man ask aaron or elliot</p>
  </section>
</main>
    </>
  );
}
