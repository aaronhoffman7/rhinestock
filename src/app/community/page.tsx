"use client";

import { useEffect, useState } from "react";
import { usePageTitle } from "../context/PageTitleContext";

type SignUp = {
  timestamp: string;
  name: string;
  slotType: "Grilling" | "DJ";
  time: string;
};

// 👇 define in order you want
const TIME_SLOTS: string[] = [
  "Friday, 6:00 PM",
  "Friday, 6:30 PM",
  "Saturday, 12:00 PM",
  "Saturday, 12:30 PM",
  "Saturday, 1:00 PM",
  "Saturday, 1:30 PM",
  "Sunday, 2:00 PM",
  "Sunday, 2:30 PM"
];

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQj0EmBGAC_I8qjk-rvEqhAwTuO1xA15tnnNBKc47Crps1Vr_-Lpy21eVQDXH0FoRc6klpt0cZ3EvuD/pub?gid=0&single=true&output=csv";

export default function SignUps() {
  const [, setTitle] = usePageTitle();
  const [signUps, setSignUps] = useState<SignUp[]>([]);
  const [selectedSlotType, setSelectedSlotType] = useState<"Grilling" | "DJ">("Grilling");

  useEffect(() => {
    setTitle("Event Sign Ups");

    fetch(CSV_URL + "&t=" + new Date().getTime())
      .then((res) => res.text())
      .then((text) => {
        const rows = text.split("\n").slice(1);
        const parsed = rows
          .map((row) => row.split(","))
          .filter((cols) => cols.length >= 4)
          .map(([timestamp, name, slotType, time]) => ({
            timestamp,
            name: name.trim(),
            slotType: slotType.trim() as "Grilling" | "DJ",
            time: time.trim()
          }));
        setSignUps(parsed);
      });
  }, []);

  // helper: group by day
  function groupByDay(entries: SignUp[]) {
    const groups: Record<string, SignUp[]> = {};
    TIME_SLOTS.forEach((slot) => {
      const [day] = slot.split(",");
      if (!groups[day]) groups[day] = [];
    });

    for (const entry of entries) {
      const [day] = entry.time.split(",");
      if (!groups[day]) groups[day] = [];
      groups[day].push(entry);
    }

    for (const day in groups) {
      groups[day].sort(
        (a, b) => TIME_SLOTS.indexOf(a.time) - TIME_SLOTS.indexOf(b.time)
      );
    }

    return groups;
  }

  const grillingEntries = signUps.filter((s) => s.slotType === "Grilling");
  const djEntries = signUps.filter((s) => s.slotType === "DJ");

  const groupedGrilling = groupByDay(grillingEntries);
  const groupedDJ = groupByDay(djEntries);

  const takenTimes = signUps
    .filter((s) => s.slotType === selectedSlotType)
    .map((s) => s.time);
  const availableTimes = TIME_SLOTS.filter((slot) => !takenTimes.includes(slot));

  return (
    <main>
      <h2>Sign Up for a Slot</h2>
      <form
        action="https://script.google.com/macros/s/AKfycbxB5IBodQ0TYFM8o7tH-VaWp5-ZS23R3XAeXpPhL0Kg3dxT2iFH1_JGFUTdJyrH72Y/exec"
        method="POST"
        target="hidden_iframe"
        onSubmit={() => {
          alert("Thanks for signing up!");
          setTimeout(() => window.location.reload(), 1000);
        }}
      >
        <label>
          Name:<br />
          <input type="text" name="name" required />
        </label><br /><br />

        <label>
          Slot Type:<br />
          <select
            name="slotType"
            value={selectedSlotType}
            onChange={(e) => setSelectedSlotType(e.target.value as "Grilling" | "DJ")}
            required
          >
            <option value="Grilling">Grilling</option>
            <option value="DJ">DJ</option>
          </select>
        </label><br /><br />

        <label>
          Time:<br />
          <select name="time" required>
            <option value="">-- Select a Time Slot --</option>
            {availableTimes.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label><br /><br />

        <button type="submit">Sign Up</button>
        <iframe name="hidden_iframe" style={{ display: "none" }}></iframe>
      </form>

      <hr />

      <h2>🔥 Grilling Signups</h2>
      {Object.entries(groupedGrilling).map(([day, entries]) => (
        <div key={day}>
          <h3>{day}</h3>
          <ul>
            {entries.map((s, i) => {
  const parts = s.time.split(",");
  const dayPart = parts[0];
  const timePart = parts[1] ? parts[1].trim() : "";
  return (
    <li key={i}>
      <strong>{s.name}</strong> — {timePart}
    </li>
  );
})}
          </ul>
        </div>
      ))}

      <h2>🎧 DJ Signups</h2>
      {Object.entries(groupedDJ).map(([day, entries]) => (
        <div key={day}>
          <h3>{day}</h3>
          <ul>
            {entries.map((s, i) => {
  const parts = s.time.split(",");
  const dayPart = parts[0];
  const timePart = parts[1] ? parts[1].trim() : "";
  return (
    <li key={i}>
      <strong>{s.name}</strong> — {timePart}
    </li>
  );
})}
          </ul>
        </div>
      ))}
    </main>
  );
}
