"use client";

import { useEffect, useState } from "react";
import { usePageTitle } from "../context/PageTitleContext";

type SignUp = {
  timestamp: string;
  name: string;
  slotType: "Grilling" | "DJ";
  time: string;
};

export default function SignUps() {
  const [, setTitle] = usePageTitle();
  const [signUps, setSignUps] = useState<SignUp[]>([]);
  const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQj0EmBGAC_I8qjk-rvEqhAwTuO1xA15tnnNBKc47Crps1Vr_-Lpy21eVQDXH0FoRc6klpt0cZ3EvuD/pub?gid=0&single=true&output=csv";

  useEffect(() => {
    setTitle("Event Sign Ups");

    // Fetch data from published CSV
    fetch(CSV_URL)
      .then((res) => res.text())
      .then((text) => {
        const rows = text.split("\n").slice(1); // skip header
        const parsed = rows
          .map((row) => row.split(","))
          .filter((cols) => cols.length >= 4)
          .map(([timestamp, name, slotType, time]) => ({
            timestamp,
            name,
            slotType: slotType.trim() as "Grilling" | "DJ",
            time
          }));
        setSignUps(parsed);
      });
  }, []);

  const grillingSignUps = signUps.filter((s) => s.slotType === "Grilling");
  const djSignUps = signUps.filter((s) => s.slotType === "DJ");
  return (
    <main>
      <h2>Sign Up for a Slot</h2>
      <form
        action="https://script.google.com/macros/s/AKfycbxB5IBodQ0TYFM8o7tH-VaWp5-ZS23R3XAeXpPhL0Kg3dxT2iFH1_JGFUTdJyrH72Y/exec"
        method="POST"
        target="hidden_iframe"
        onSubmit={() => alert("Thanks for signing up!")}
      >
        <label>
          Name:<br />
          <input type="text" name="name" required />
        </label><br /><br />

        <label>
          Slot Type:<br />
          <select name="slotType" required>
            <option value="Grilling">Grilling</option>
            <option value="DJ">DJ</option>
          </select>
        </label><br /><br />

        <label>
          Time:<br />
          <select name="time" required>
            <option value="12:00 – 12:30 PM">12:00 – 12:30 PM</option>
            <option value="12:30 – 1:00 PM">12:30 – 1:00 PM</option>
            <option value="1:00 – 1:30 PM">1:00 – 1:30 PM</option>
            <option value="1:30 – 2:00 PM">1:30 – 2:00 PM</option>
            <option value="2:00 – 2:30 PM">2:00 – 2:30 PM</option>
            <option value="2:30 – 3:00 PM">2:30 – 3:00 PM</option>
          </select>
        </label><br /><br />

        <button type="submit">Sign Up</button>
        <iframe name="hidden_iframe" style={{ display: "none" }}></iframe>
      </form>

      <hr />
      <h3>Grilling</h3>
<ul>
  {grillingSignUps.map((s, i) => (
    <li key={i}>
      {s.name} — {s.time}
    </li>
  ))}
</ul>

<h3>DJ</h3>
<ul>
  {djSignUps.map((s, i) => (
    <li key={i}>
      {s.name} — {s.time}
    </li>
  ))}
</ul>
    </main>
  );
}
