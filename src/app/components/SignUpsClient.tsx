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
  friday_6pm: { day: "Friday", label: "6:00 PM", capacity: 1 },
  saturday_5pm: { day: "Saturday", label: "5:00 PM", capacity: 4 },
  saturday_6pm: { day: "Saturday", label: "6:00 PM", capacity: 4 },
  sunday_2pm: { day: "Sunday", label: "2:00 PM", capacity: 1 },
};

const DJ_SLOTS: SlotMap = {
  friday_10pm: { day: "Friday", label: "10:00 PM", capacity: 2 },
  friday_11pm: { day: "Friday", label: "11:00 PM", capacity: 2 },
  friday_12pm: { day: "Friday", label: "12:00 PM", capacity: 2 },
  friday_1am: { day: "Friday", label: "1:00 AM", capacity: 2 },
  friday_2am: { day: "Friday", label: "2:00 AM (late night)", capacity: 2 },
  friday_3am: { day: "Friday", label: "3:00 AM (late night)", capacity: 2 },
  saturday_sunset: { day: "Saturday", label: "Sunset Sessions – 6:30 PM", capacity: 2 },
  saturday_10pm: { day: "Saturday", label: "10:00 PM", capacity: 2 },
  saturday_11pm: { day: "Saturday", label: "11:00 PM", capacity: 2 },
  saturday_12am: { day: "Saturday", label: "12:00 AM", capacity: 2 },
  saturday_1am: { day: "Saturday", label: "1:00 AM", capacity: 2 },
  saturday_2am: { day: "Saturday", label: "2:00 AM", capacity: 2 },
  saturday_3am: { day: "Saturday", label: "3:00 AM", capacity: 2 },
  sunday_930am: { day: "Sunday", label: "9:30 AM", capacity: 1 },
};

const ACTIVITY_SLOTS: SlotMap = {
  saturday_afternoon: { day: "Saturday", label: "Afternoon Workshop", capacity: 3 },
  sunday_morning: { day: "Sunday", label: "Morning Activity", capacity: 2 },
};

const CSV_URL =
  "https://script.google.com/macros/s/AKfycbwEMhCModxmjlHq0qafU-woC-4kFlz1FoxBEi9TYB91UAeZSfa6RSzC5XD31aVLDwAy/exec";

export default function SignUpsClient() {
  const [signUps, setSignUps] = useState<SignUp[]>([]);

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

            const trimmedTime = row["Time"]?.trim();
            if (!trimmedTime) return null;

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

  // === Group by slotType and time ===
  const groupedByType: Record<SignUp["slotType"], Record<string, string[]>> = {
    Grilling: {},
    DJ: {},
    Activity: {},
    Driver: {},
    Rider: {},
  };

  const allSlotMaps = {
    Grilling: GRILL_SLOTS,
    DJ: DJ_SLOTS,
    Activity: ACTIVITY_SLOTS,
  };

  for (const type in allSlotMaps) {
    for (const key in allSlotMaps[type as keyof typeof allSlotMaps]) {
      groupedByType[type as keyof typeof allSlotMaps][key] = [];
    }
  }

  for (const s of signUps) {
    groupedByType[s.slotType][s.time] ||= [];
    groupedByType[s.slotType][s.time].push(s.name);
  }

  // === Carpool logic ===
  type CarpoolSlot = {
    time: string;
    cars: {
      driver: string | null;
      riders: string[];
    }[];
  };

  function buildCarpool(signUps: SignUp[]): CarpoolSlot[] {
    const carpoolSlots: CarpoolSlot[] = [];

    ["from_dc_fri", "to_dc_sun"].forEach((time) => {
      const riders = signUps.filter((s) => s.slotType === "Rider" && s.time === time).map((s) => s.name);
      const drivers = signUps.filter((s) => s.slotType === "Driver" && s.time === time).map((s) => s.name);

      const carCount = Math.max(Math.ceil(riders.length / 4), drivers.length);
      const cars: CarpoolSlot["cars"] = [];

      for (let i = 0; i < carCount; i++) {
        const driver = drivers[i] || null;
        const ridersForCar = riders.slice(i * 4, (i + 1) * 4);
        cars.push({ driver, riders: ridersForCar });
      }

      carpoolSlots.push({ time, cars });
    });

    return carpoolSlots;
  }

  const carpoolGroups = buildCarpool(signUps);

  function renderColumn(slotMap: SlotMap, filled: Record<string, string[]>, heading: string) {
    return (
      <div className="signup-column">
        <h2>{heading}</h2>
        {Object.entries(slotMap).map(([key, entry]) => (
          <div key={key} className="signup-day">
            <div className="slot-line">
              {entry.day} – {entry.label}
            </div>
            <div className="name-list">{filled[key]?.join(", ") || "—"}</div>
          </div>
        ))}
      </div>
    );
  }




  const [selectedSlotType, setSelectedSlotType] = useState<SignUp["slotType"]>("Grilling");

return (
  <main>
    <div style={{ maxWidth: "100%", margin: "0 auto", padding: "1rem" }}>
 <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
  Sign up for something helpful, or burdensome
</h2>

      {/* === SIGN-UP FORM === */}
      <form
        action="https://script.google.com/macros/s/AKfycbxPY05vXtt02iunZtgeKeRoBsR1A6h2SFwPPBIZqG61PknkolvfTlQ2pbegLigR61z6/exec"
        method="POST"
        target="hidden_iframe"
        onSubmit={() => {
          alert("Thanks for signing up! The page will refresh shortly.");
          setTimeout(() => window.location.reload(), 500);
        }}
        style={{ marginBottom: "3rem" }}
      >
        <label>
          Name:<br />
          <input type="text" name="name" required />
        </label>
        <br /><br />

        <label>
          Sign up type:<br />
          <select
            name="slotType"
            value={selectedSlotType}
            onChange={(e) => setSelectedSlotType(e.target.value as SignUp["slotType"])}
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

        <label>
          Time:<br />
          <select name="time" required>
            <option value="">-- Select a Time Slot --</option>
            {Object.entries(
              selectedSlotType === "Grilling"
                ? GRILL_SLOTS
                : selectedSlotType === "DJ"
                ? DJ_SLOTS
                : selectedSlotType === "Activity"
                ? ACTIVITY_SLOTS
                : {
                    from_dc_fri: {
                      label: "Leaving from DC",
                      capacity: 999,
                      day: "Friday",
                    },
                    to_dc_sun: {
                      label: "Returning to DC",
                      capacity: 999,
                      day: "Sunday",
                    },
                  }
            ).map(([key, entry]) => (
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

      {/* === SIGNUP LISTS === */}
      <div className="dual-column">
        {renderColumn(DJ_SLOTS, groupedByType.DJ, "Musician + DJ Lineup")}
        {renderColumn(GRILL_SLOTS, groupedByType.Grilling, "Grilling slots")}
      </div>

      <div className="dual-column">
  {renderColumn(ACTIVITY_SLOTS, groupedByType.Activity, "Activities")}

  <div className="signup-column">
    <h2>Carpool</h2>
    {carpoolGroups.map((group) => (
      <div key={group.time} className="signup-day">
        <h3 style={{ marginBottom: "0.5rem" }}>
          {group.time === "from_dc_fri"
            ? "Friday – Leaving from DC"
            : "Sunday – Returning to DC"}
        </h3>

        {group.cars.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {group.cars.map((car, index) => (
              <div
                key={index}
                style={{
                  padding: "0.5rem 1rem",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              >
                <strong>Car {index + 1}</strong>
                <div>
                  <strong>Driver:</strong> {car.driver || "—"}
                </div>
                <div>
                  <strong>Riders:</strong>{" "}
                  {car.riders.length > 0 ? car.riders.join(", ") : "—"}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontStyle: "italic" }}>No cars yet for this time.</p>
        )}
      </div>
    ))}
  </div>
</div>
    </div>
  </main>
);
}