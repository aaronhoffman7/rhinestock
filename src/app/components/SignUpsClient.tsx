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

type SlotEntry = {
  label: string;
  capacity: number;
  day: "Friday" | "Saturday" | "Sunday";
};

type SlotMap = Record<string, SlotEntry>;



const GRILL_SLOTS: SlotMap = {
  friday_6pm:    { day: "Friday", label: "6:00 PM", capacity: 1 },
  saturday_5pm:  { day: "Saturday", label: "5:00 PM", capacity: 4 },
  saturday_6pm:  { day: "Saturday", label: "6:00 PM", capacity: 4 },
  sunday_2pm:    { day: "Sunday", label: "2:00 PM", capacity: 1 },
};

const DJ_SLOTS: SlotMap = {
  friday_10pm:       { day: "Friday", label: "10:00 PM", capacity: 2 },
  friday_11pm:       { day: "Friday", label: "11:00 PM", capacity: 2 },
  friday_12pm:       { day: "Friday", label: "12:00 PM", capacity: 2 },
  friday_1am:        { day: "Friday", label: "1:00 AM", capacity: 2 },
  friday_2am:        { day: "Friday", label: "2:00 AM (late night)", capacity: 2 },
  friday_3am:        { day: "Friday", label: "3:00 AM (late night)", capacity: 2 },
  saturday_sunset:   { day: "Saturday", label: "Sunset Sessions – 6:30 PM", capacity: 2 },
  saturday_10pm:     { day: "Saturday", label: "10:00 PM", capacity: 2 },
  saturday_11pm:     { day: "Saturday", label: "11:00 PM", capacity: 2 },
  saturday_12am:     { day: "Saturday", label: "12:00 AM", capacity: 2 },
  saturday_1am:      { day: "Saturday", label: "1:00 AM", capacity: 2 },
  saturday_2am:      { day: "Saturday", label: "2:00 AM", capacity: 2 },
  saturday_3am:      { day: "Saturday", label: "3:00 AM", capacity: 2 },
  sunday_930am:      { day: "Sunday", label: "9:30 AM", capacity: 1 },
};

const DRIVER_SLOTS: SlotMap = {
  from_dc_fri: { day: "Friday", label: "Leaving from DC", capacity: 4 },
  to_dc_sun:   { day: "Sunday", label: "Returning to DC", capacity: 4 },
};

const RIDER_SLOTS: SlotMap = {
  from_dc_fri: { day: "Friday", label: "Ride from DC", capacity: 10 },
  to_dc_sun:   { day: "Sunday", label: "Ride back to DC", capacity: 10 },
};

const ACTIVITY_SLOTS: SlotMap = {
  saturday_afternoon: { day: "Saturday", label: "Afternoon Workshop", capacity: 3 },
  sunday_morning:     { day: "Sunday", label: "Morning Activity", capacity: 2 },
};


const CSV_URL = "https://script.google.com/macros/s/AKfycbwEMhCModxmjlHq0qafU-woC-4kFlz1FoxBEi9TYB91UAeZSfa6RSzC5XD31aVLDwAy/exec";

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
              slotTypeRaw === "grilling" ? "Grilling" :
              slotTypeRaw === "dj" ? "DJ" :
              slotTypeRaw === "driver" ? "Driver" :
              slotTypeRaw === "rider" ? "Rider" :
              slotTypeRaw === "activity" ? "Activity" :
              null;

            if (!normalizedSlotType) return null;

            const slotMap =
              normalizedSlotType === "Grilling" ? GRILL_SLOTS :
              normalizedSlotType === "DJ" ? DJ_SLOTS :
              normalizedSlotType === "Driver" ? DRIVER_SLOTS :
              normalizedSlotType === "Rider" ? RIDER_SLOTS :
              ACTIVITY_SLOTS;

            const trimmedTime = row["Time"]?.trim();
            if (!slotMap[trimmedTime]) return null;

            return {
              timestamp: row["Timestamp"]?.trim(),
              name: row["Name"]?.trim(),
              slotType: normalizedSlotType,
              time: trimmedTime,
            };
          })
          .filter((entry): entry is SignUp => entry !== null);

        setSignUps(parsed);
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

  const groupedByType: Record<SignUp["slotType"], Record<string, string[]>> = {
    Grilling: {},
    DJ: {},
    Driver: {},
    Rider: {},
    Activity: {},
  };

  const allSlotMaps = {
    Grilling: GRILL_SLOTS,
    DJ: DJ_SLOTS,
    Driver: DRIVER_SLOTS,
    Rider: RIDER_SLOTS,
    Activity: ACTIVITY_SLOTS,
  };

  for (const type in allSlotMaps) {
    for (const key in allSlotMaps[type as SignUp["slotType"]]) {
      groupedByType[type as SignUp["slotType"]][key] = [];
    }
  }

  for (const s of signUps) {
    groupedByType[s.slotType][s.time].push(s.name);
  }

  return (
    <main>
      <div style={{ maxWidth: "100%", margin: "0 auto", padding: "1rem" }}>
        <h2>Sign Up for something helpful or burdensome</h2>
        <form
          action="https://script.google.com/macros/s/AKfycbxPY05vXtt02iunZtgeKeRoBsR1A6h2SFwPPBIZqG61PknkolvfTlQ2pbegLigR61z6/exec"
          method="POST"
          target="hidden_iframe"
          onSubmit={() => {
            alert("Thanks for signing up! The page will refresh shortly.");
            setTimeout(() => window.location.reload(), 500);
          }}
        >
          <label>
            Name:<br />
            <input type="text" name="name" required />
          </label>
          <br /><br />

          <label>
            Sign up type:<br />
            <select
              value={selectedSlotType}
              onChange={(e) =>
                setSelectedSlotType(e.target.value as SignUp["slotType"])
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
          <br /><br />

          <input type="hidden" name="slotType" value={selectedSlotType} />

          <label>
            Time:<br />
            <select name="time" required>
              <option value="">-- Select a Time Slot --</option>
              {Object.entries(SLOT_CONFIG)
                .filter(([key]) => (takenCount[key] || 0) < SLOT_CONFIG[key].capacity)
  .map(([key, entry]) => (
    <option key={key} value={key}>
      {entry.day} – {entry.label}
    </option>
  ))}
            </select>
          </label>
          <br /><br />

          <button type="submit">Sign Up</button>
          <iframe name="hidden_iframe" style={{ display: "none" }}></iframe>
        </form>

        <hr style={{ margin: "2rem 0" }} />

        <div className="dual-column">
          {renderColumn(GRILL_SLOTS, groupedByType.Grilling, "Grilling slots")}
          {renderColumn(DJ_SLOTS, groupedByType.DJ, "Musician + DJ Lineup")}
        </div>

        <div className="dual-column">
          {renderColumn(DRIVER_SLOTS, groupedByType.Driver, "Carpool Drivers")}
          {renderColumn(RIDER_SLOTS, groupedByType.Rider, "Carpool Riders")}
        </div>

        <div className="dual-column">
          {renderColumn(ACTIVITY_SLOTS, groupedByType.Activity, "Activities")}
        </div>
      </div>
    </main>
  );
}


function renderColumn(
  slotMap: Record<string, SlotEntry>,
  grouped: Record<string, string[]>,
  title: string
) {
  return (
    <div className="signup-column">
      <h2>{title}</h2>
      {["Friday", "Saturday", "Sunday"].map((day) => {
        const slots = Object.entries(slotMap).filter(([, slot]) => slot.day === day);

        return (
          <div key={day} className="signup-day">
            <h3>{day}</h3>
            <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
              {slots.map(([key, slot]) => {
                const names = grouped[key] || [];
                return (
                  <li key={key} className="slot-line">
                    {slot.label}
                    {names.length > 0 && (
                      <span className="name-list"> — {names.join(", ")}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
