"use client";

import { useEffect, useState } from "react";

type SignUp = {
  timestamp: string;
  name: string;
  slotType: "Grilling" | "DJ";
  time: string;
};

const GRILL_SLOTS: Record<string, { label: string; capacity: number }> = {
  friday_6pm: { label: "Friday, 6:00 PM", capacity: 1 },
  saturday_5pm: { label: "Saturday, 5:00 PM", capacity: 4 },
  saturday_6pm: { label: "Saturday, 6:00 PM", capacity: 4 },
  sunday_2pm: { label: "Sunday, 2:00 PM", capacity: 1 },
};

const DJ_SLOTS: Record<string, { label: string; capacity: number }> = {
  friday_10pm: { label: "Friday night, 10:00 PM", capacity: 2 },
  friday_11pm: { label: "Friday night, 11:00 PM", capacity: 2 },
  friday_12pm: { label: "Friday, 12:00 PM", capacity: 2 },
  friday_1am: { label: "Friday, 1:00 AM", capacity: 2 },
  friday_2am: { label: "Friday latenight, 2:00 AM", capacity: 2 },
  friday_3am: { label: "Friday latenight, 3:00 AM", capacity: 2 },
  saturday_sunset: { label: "Saturday Sunset Sessions, 6:30 PM", capacity: 2 },
  saturday_10pm: { label: "Saturday night, 10:00 PM", capacity: 2 },
  saturday_11pm: { label: "Saturday night, 11:00 PM", capacity: 2 },
  saturday_12am: { label: "Saturday night, 12:00 AM", capacity: 2 },
  saturday_1am: { label: "Saturday, 1:00 AM", capacity: 2 },
  saturday_2am: { label: "Saturday, 2:00 AM", capacity: 2 },
  saturday_3am: { label: "Saturday, 3:00 AM", capacity: 2 },
  sunday_930am: { label: "Sunday, 9:30 AM", capacity: 1 },
};

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQj0EmBGAC_I8qjk-rvEqhAwTuO1xA15tnnNBKc47Crps1Vr_-Lpy21eVQDXH0FoRc6klpt0cZ3EvuD/pub?gid=0&single=true&output=csv";

export default function SignUpsClient() {
  const [signUps, setSignUps] = useState<SignUp[]>([]);
  const [selectedSlotType, setSelectedSlotType] = useState<"Grilling" | "DJ">("Grilling");

  useEffect(() => {
    fetch(CSV_URL + "&t=" + new Date().getTime(), { cache: "no-store" })
      .then((res) => res.text())
      .then((text) => {
        const rows = text.split("\n").slice(1);

        const parsed = rows
          .map((row) => row.split(","))
          .filter((cols) => cols.length >= 4)
          .map(([timestamp, name, slotTypeRaw, timeRaw]) => {
            const trimmedSlotType = slotTypeRaw.trim().toLowerCase();
            const normalizedSlotType =
              trimmedSlotType === "grilling"
                ? "Grilling"
                : trimmedSlotType === "dj"
                ? "DJ"
                : null;

            if (!normalizedSlotType) return null;

            const validSlots =
              normalizedSlotType === "Grilling" ? GRILL_SLOTS : DJ_SLOTS;
            const trimmedTime = timeRaw.trim();

            const timeKey = Object.entries(validSlots).find(
              ([, slot]) =>
                slot.label.trim().toLowerCase() ===
                trimmedTime.toLowerCase()
            )?.[0];

            if (!timeKey) return null;

            return {
              timestamp: timestamp.trim(),
              name: name.trim(),
              slotType: normalizedSlotType,
              time: timeKey,
            };
          })
          .filter((entry): entry is SignUp => entry !== null);

        setSignUps(parsed);
      });
  }, []);

  const SLOT_CONFIG =
    selectedSlotType === "Grilling" ? GRILL_SLOTS : DJ_SLOTS;

  const takenCount: Record<string, number> = {};
  signUps
    .filter((s) => s.slotType === selectedSlotType)
    .forEach((s) => {
      takenCount[s.time] = (takenCount[s.time] || 0) + 1;
    });

  const groupedByType = {
    Grilling: {} as Record<string, string[]>,
    DJ: {} as Record<string, string[]>,
  };

  for (const slot of Object.keys(GRILL_SLOTS)) groupedByType.Grilling[slot] = [];
  for (const slot of Object.keys(DJ_SLOTS)) groupedByType.DJ[slot] = [];

  for (const s of signUps) {
    groupedByType[s.slotType][s.time].push(s.name);
  }

  const renderSchedule = (
    slotMap: Record<string, { label: string; capacity: number }>,
    grouped: Record<string, string[]>,
    title: string
  ) => (
    <>
      <h2>{title}</h2>
      {["Friday", "Saturday", "Sunday"].map((day) => {
        const slots = Object.entries(slotMap).filter(([, val]) =>
          val.label.startsWith(day)
        );

        return (
          <div key={day} style={{ marginBottom: "2rem", textAlign: "left" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{day}</h3>
            <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
              {slots.map(([key, slot]) => {
                const names = grouped[key] || [];
                return (
                  <li
                    key={key}
                    style={{
                      fontSize: "1rem",
                      color: "forestgreen",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {slot.label.split(",")[1]?.trim()} — {names.join(", ")}
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
              value={selectedSlotType}
              onChange={(e) =>
                setSelectedSlotType(e.target.value as "Grilling" | "DJ")
              }
              required
            >
              <option value="Grilling">Grilling</option>
              <option value="DJ">DJ</option>
            </select>
          </label>
          <br />
          <br />

          <input type="hidden" name="slotType" value={selectedSlotType} />

          <label>
            Time:<br />
            <select name="time" required>
              <option value="">-- Select a Time Slot --</option>
              {Object.entries(SLOT_CONFIG)
                .filter(
                  ([key]) =>
                    (takenCount[key] || 0) < SLOT_CONFIG[key].capacity
                )
                .map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
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
