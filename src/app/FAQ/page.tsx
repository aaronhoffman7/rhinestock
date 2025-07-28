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
  We&apos;re located at <a href="https://maps.app.goo.gl/dNo3qX9ordSLAPsz6" target="_blank" rel="noopener noreferrer"> 13 Reeder Road, Rhinebeck, NY.
  </a> You can get here by <a href="/signups#carpool">carpool</a> or train: either take  
  <a href="https://www.amtrak.com/tickets/departure.html" target="_blank" rel="noopener noreferrer"> Amtrak</a> from NYC Penn Station to Rhinecliff or <a href="https://new.mta.info/schedules/metro-north-railroad" target="_blank" rel="noopener noreferrer">
    Metro North</a> from Grand Central Station to Poughkeepsie. From either train station you&apos;ll need to get a car to the house. Ubers are still very spotty in the area so we recommend having someone pick you up from the house or getting a local cab service.
</p>
  </section>

  <section>
    <h2>What should I bring?</h2>
    <p>Tent + camping supplies if applicable, fun food + drinks if you&apos;d like, bathing suit, closed toed shoes for potential walks or mini-hikes, special skills + craft supplies, toys and games, musical isntruments + DJ setups, silly outfits, fireworks- the world is your oyster.</p>
  </section>

  <section>
    <h2>Where can I sleep?</h2>
    <p>There are a limited number of mostly twin beds, plus a bunch of couches, and lots of floor space for mattresses + sleeping pads. Otherwise, there is plenty of shady space to pitch a tent or hammock anywhere on the property. There are four bathrooms in the house and three showers.</p>
  </section>

  <section>
    <h2>What&apos;s the food situation?</h2>
    <p>There&apos;s a full kitchen and grill, lol this is a house. We&apos;ll plan on cooking as much as possible, but might do some brunch / lunch out and about. The kitchen will be stocked with lots of ingredients - covering a variety of dietary specifications - but please reach out if you&apos;d like to help with the shopping list, and feel free to bring any food items you&apos;d like.</p>
  </section>

  <section>
    <h2>Can I bring friends?</h2>
    <p>Yeah! Just let us know and have them RSVP so we can prepare.</p>
  </section>

  <section>
    <h2>How do I stay updated?</h2>
    <p>Hit up Aaron: 845-489-5465  or  Elliot: 845-489-2973, and keep your Partiful text notifications on</p>
  </section>

  <section>
    <h2>Should I take the brown acid?</h2>
    <p>Probably not but use your best judgement</p>
  </section>
</main>
    </>
  );
}
