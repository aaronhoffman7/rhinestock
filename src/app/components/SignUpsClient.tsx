"use client";

import { useEffect, useState } from "react";

type SignUp = {
  timestamp: string;
  name: string;
  slotType: "Grilling" | "DJ" | "Driver" | "Rider" | "Activity";
  time: string;
};

type RawSignUpRow = {
  Timestamp: string;
  Name: string;
  "Slot Type": string;
  Time: string;
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

const DRIVER_SLOTS: Record<string, { label: string; capacity: number }> = {
  from_dc_fri: { label: "Friday - Leaving from DC", capacity: 4 },
  to_dc_sun: { label: "Sunday - Returning to DC", capacity: 4 },
};

const RIDER_SLOTS: Record<string, { label: string; capacity: number }> = {
  from_dc_fri: { label: "Friday - Ride from DC", capacity: 10 },
  to_dc_sun: { label: "Sunday - Ride back to DC", capacity: 10 },
};

const ACTIVITY_SLOTS: Record<string, { label: string; capacity: number }> = {
  saturday_afternoon: { label: "Saturday Afternoon Workshop", capacity: 3 },
  sunday_morning: { label: "Sunday Morning Activity", capacity: 2 },
};


const CSV_URL =
  "https://script.google.com/macros/s/AKfycbwEMhCModxmjlHq0qafU-woC-4kFlz1FoxBEi9TYB91UAeZSfa6RSzC5XD31aVLDwAy/exec";

export default function SignUpsClient() {
  const [signUps, setSignUps] = useState<SignUp[]>([]);
  const [selectedSlotType, setSelectedSlotType] = useState<SignUp["slotType"]>("Grilling");

  useEffect(() => {
  fetch(CSV_URL + "?t=" + Date.now(), { cache: "no-store" })
    .then((res) => res.json())
    .then((data: RawSignUpRow[]) => {
      const parsed = data
        .map((row) => {
          const slotTypeRaw = row["Slot Type"]?.trim().toLowerCase();
          const normalizedSlotType =
  slotTypeRaw === "grilling"
    ? "Grilling"
    : slotTypeRaw === "dj"
    ? "DJ"
    : slotTypeRaw === "driver"
    ? "Driver"
    : slotTypeRaw === "rider"
    ? "Rider"
    : slotTypeRaw === "activity"
    ? "Activity"
    : null;


          if (!normalizedSlotType) return null;

          const validSlots =
  normalizedSlotType === "Grilling" ? GRILL_SLOTS :
  normalizedSlotType === "DJ" ? DJ_SLOTS :
  normalizedSlotType === "Driver" ? DRIVER_SLOTS :
  normalizedSlotType === "Rider" ? RIDER_SLOTS :
 ACTIVITY_SLOTS;


          const trimmedTime = row["Time"]?.trim();
          if (!validSlots[trimmedTime]) return null;

          return {
            timestamp: row["Timestamp"]?.trim(),
            name: row["Name"]?.trim(),
            slotType: normalizedSlotType,
            time: trimmedTime,
          };
        })
        .filter((entry): entry is SignUp => entry !== null);

      setSignUps(parsed);
      console.log("Live JSON data:", data);
      console.log("Parsed signups:", parsed);
    });
}, []);


const SLOT_CONFIG =
  selectedSlotType === "Grilling" ? GRILL_SLOTS :
  selectedSlotType === "DJ" ? DJ_SLOTS :
  selectedSlotType === "Driver" ? DRIVER_SLOTS :
  selectedSlotType === "Rider" ? RIDER_SLOTS :
  ACTIVITY_SLOTS;


  const takenCount: Record<string, number> = {};
  signUps
    .filter((s) => s.slotType === selectedSlotType)
    .forEach((s) => {
      takenCount[s.time] = (takenCount[s.time] || 0) + 1;
    });

const groupedByType = {
  Grilling: {} as Record<string, string[]>,
  DJ: {} as Record<string, string[]>,
  Driver: {} as Record<string, string[]>,
  Rider: {} as Record<string, string[]>,
  Activity: {} as Record<string, string[]>,
};


  for (const slot of Object.keys(GRILL_SLOTS)) groupedByType.Grilling[slot] = [];
for (const slot of Object.keys(DJ_SLOTS)) groupedByType.DJ[slot] = [];
for (const slot of Object.keys(DRIVER_SLOTS)) groupedByType.Driver[slot] = [];
for (const slot of Object.keys(RIDER_SLOTS)) groupedByType.Rider[slot] = [];
for (const slot of Object.keys(ACTIVITY_SLOTS)) groupedByType.Activity[slot] = [];


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
                    {slot.label} — {names.join(", ")}
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
        <h2>Sign Up for something helpful or burdensome</h2>
        <form
          action="https://script.google.com/macros/s/AKfycbxPY05vXtt02iunZtgeKeRoBsR1A6h2SFwPPBIZqG61PknkolvfTlQ2pbegLigR61z6/exec"
          method="POST"
          target="hidden_iframe"
          onSubmit={() => {
  alert("Thanks for signing up! The page will refresh in a few seconds.");
  setTimeout(() => window.location.reload(), 500); // 3 seconds minimum
}}
        >
          <label>
            Name:<br />
            <input type="text" name="name" required />
          </label>
          <br />
          <br />

          <label>
            Sign up type:<br />
            <select
  value={selectedSlotType}
  onChange={(e) =>
    setSelectedSlotType(
      e.target.value as SignUp["slotType"]
    )
  }
  required
>
  <option value="Grilling">Grilling</option>
  <option value="DJ">DJ</option>
  <option value="Driver">Carpool Driver</option>
  <option value="Rider">Carpool Rider</option>
  <option value="Activity">Activity Host</option>
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
        {renderSchedule(DRIVER_SLOTS, groupedByType.Driver, "Carpool Drivers")}
{renderSchedule(RIDER_SLOTS, groupedByType.Rider, "Carpool Riders")}
{renderSchedule(ACTIVITY_SLOTS, groupedByType.Activity, "Workshops & Activities")}

      </div>
    </main>
  );
}
