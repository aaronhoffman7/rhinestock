"use client";

import { useEffect, useState } from "react";
import { usePageTitle } from "../context/PageTitleContext";

type SignUp = {
  timestamp: string;
  name: string;
  slotType: "Grilling" | "DJ";
  time: string;
};

const GRILL_SLOTS: Record<string, number> = {
  "Friday, 6:00 PM": 1,
  "Saturday, 5:00 PM": 4,
  "Saturday, 6:00 PM": 4,
  "Sunday, 2:00 PM": 1,
};

const DJ_SLOTS: Record<string, number> = {
  "Friday night, 10:00 PM": 2,
  "Friday night, 11:00 PM": 2,
  "Friday, 12:00 PM": 2,
  "Friday, 1:00 AM": 2,
  "Friday latenight, 2:00 AM": 2,
  "Friday latenight, 3:00 AM": 2,
  "Saturday Sunset Sessions, 6:30 PM": 2,
  "Saturday night, 10:00 PM": 2,
  "Saturday night, 11:00 PM": 2,
  "Saturday night, 12:00 AM": 2,
  "Saturday, 1:00 AM": 2,
  "Saturday, 2:00 AM": 2,
  "Saturday, 3:00 AM": 2,
  "Sunday, 9:30 AM": 1,
};

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQj0EmBGAC_I8qjk-rvEqhAwTuO1xA15tnnNBKc47Crps1Vr_-Lpy21eVQDXH0FoRc6klpt0cZ3EvuD/pub?gid=0&single=true&output=csv";

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
            time: time.trim(),
          }));
        setSignUps(parsed);
      });
  }, [setTitle]);

  const SLOT_CONFIG = selectedSlotType === "Grilling" ? GRILL_SLOTS : DJ_SLOTS;
  const TIME_SLOTS = Object.keys(SLOT_CONFIG);

  // Count how many people signed up per slot
  const takenCount: Record<string, number> = {};
  signUps
    .filter((s) => s.slotType === selectedSlotType)
    .forEach((s) => {
      takenCount[s.time] = (takenCount[s.time] || 0) + 1;
    });

  // Available slots = not at full capacity
  const availableTimes = TIME_SLOTS.filter(
    (slot) => (takenCount[slot] || 0) < SLOT_CONFIG[slot]
  );

  // Group names per slot
  const groupedByType = {
    Grilling: {} as Record<string, string[]>,
    DJ: {} as Record<string, string[]>,
  };

  for (const slot of Object.keys(GRILL_SLOTS)) groupedByType.Grilling[slot] = [];
  for (const slot of Object.keys(DJ_SLOTS)) groupedByType.DJ[slot] = [];

  for (const s of signUps) {
    if (!groupedByType[s.slotType][s.time]) {
      groupedByType[s.slotType][s.time] = [];
    }
    groupedByType[s.slotType][s.time].push(s.name);
  }

  const renderSchedule = (
  slotMap: Record<string, number>,
  grouped: Record<string, string[]>,
  title: string
) => (
  <>
    <h2>{title}</h2>
    {["Friday", "Saturday", "Sunday"].map((day) => {
      const slots = Object.keys(slotMap).filter((s) => s.startsWith(day));
      return (
        <div key={day} style={{ marginBottom: "2rem", textAlign: "left" }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{day}</h3>
          <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
            {slots.map((slot) => {
              const timeLabel = slot.split(",")[1]?.trim();
              const names = grouped[slot] || [];
              return (
                <li
                  key={slot}
                  style={{
                    fontSize: "1rem",
                    color: "forestgreen",
                    marginBottom: "0.4rem"
                  }}
                >
                  {timeLabel} — {names.join(", ")}
                </li>
              );
            })}
          </ul>
        </div>
      );
    })}
  </>
);


  return (
    <main>
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "1rem" }}>
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
        </label>
        <br />
        <br />

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
        </label>
        <br />
        <br />

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
        </label>
        <br />
        <br />

        <button type="submit">Sign Up</button>
        <iframe name="hidden_iframe" style={{ display: "none" }}></iframe>
      </form>

      <hr style={{ margin: "2rem 0" }} />

      {renderSchedule(GRILL_SLOTS, groupedByType.Grilling, "Grilling Signups")}
      {renderSchedule(DJ_SLOTS, groupedByType.DJ, "DJ Lineup")}
    </div>
    </main>
  );
}
