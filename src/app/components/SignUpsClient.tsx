"use client";

import { useEffect, useState } from "react";

type SignUp = {
  timestamp: string;
  name: string;
  slotType:  "Food Prep + Grill" | "Driver" | "Rider" | "Activity" | "I have a tent";
  time: string;
  phoneNumber?: string;
  extraSpots?: number;
  driver?: string; // rider's selected driver

};

type RawSignUpRow = {
  Timestamp: string;
  Name: string;
  "Slot Type": string;
  Time: string;
  activityDescription?: string;
  PhoneNumber?: string;
  ExtraSpots?: string;
  preferredDriver?: string; // <-- NEW
};

type SlotEntry = {
  label: string;
  capacity: number;
  day: "Friday" | "Saturday" | "Sunday" | "Monday";
};

type SlotMap = Record<string, SlotEntry>;

const GRILL_SLOTS: SlotMap = {
  friday_6pm: { day: "Friday", label: "6:00 PM", capacity: 6 },
  saturday_5pm: { day: "Saturday", label: "5:00 PM", capacity: 6 },
  sunday_9am: { day: "Sunday", label: "9:00 AM", capacity: 6 },
  sunday_5pm: { day: "Sunday", label: "5:00 PM", capacity: 6 },
  monday_9am: { day: "Monday", label: "9:00 AM", capacity: 6 },
};

const ACTIVITY_SLOTS: SlotMap = {
  saturday_morning: { day: "Saturday", label: "Morning Activities", capacity: 3 },
  saturday_afternoon: { day: "Saturday", label: "Afternoon Activities", capacity: 3 },
  sunday_morning: { day: "Sunday", label: "Morning Activities", capacity: 3 },
  sunday_afternoon: { day: "Sunday", label: "Afternoon Activities", capacity: 3 },
};

const JSON_URL =
  "https://script.google.com/macros/s/AKfycbyWcEU740YCDwedJMoGnA1xy29R4Uu2-Mgu2tzsB7zlUXG5DoOG4rrVHFe8csOTaKOx/exec";

export default function SignUpsClient() {
  const [signUps, setSignUps] = useState<SignUp[]>([]);

  useEffect(() => {
  fetch(JSON_URL + "?t=" + Date.now(), { cache: "no-store" })
    .then((res) => res.json())
    .then((rows: RawSignUpRow[]) => {
      const parsed: SignUp[] = rows
        .map((row): SignUp | null => {
          const slotTypeRaw = row["Slot Type"]?.trim();
          console.log("RAW SLOT TYPE:", slotTypeRaw); // 👈 ADD THIS
          const normalizedSlotType =
            slotTypeRaw === "Food Prep + Grill"
              ? "Food Prep + Grill"
              : slotTypeRaw === "driver"
              ? "Driver"
              : slotTypeRaw === "rider"
              ? "Rider"
              : slotTypeRaw === "activity"
              ? "Activity"
              : slotTypeRaw === "i have a tent"
              ? "I have a tent"
              : null;

          if (!normalizedSlotType) return null;

          const trimmedTime = row["Time"]?.trim() || "";
          const name = row["Name"]?.trim();
          const activityDesc = row["activityDescription"]?.trim();

          return {
            timestamp: row["Timestamp"]?.trim(),
            name:
              normalizedSlotType === "Activity" && activityDesc
                ? `${name} — ${activityDesc}`
                : name,
            slotType: normalizedSlotType,
            time: trimmedTime,
            phoneNumber: row.PhoneNumber || undefined, // now optional
            extraSpots: row.ExtraSpots ? parseInt(row.ExtraSpots) : undefined,
            driver: row.preferredDriver || undefined // <-- NEW
          };
        })
        .filter((entry): entry is SignUp => entry !== null);

      setSignUps(parsed);
    });
}, []);


  // === Group by slotType and time (for Grill/DJ/Activity only) ===
  const groupedByType: Record<SignUp["slotType"], Record<string, string[]>> = {
    "Food Prep + Grill": {},
    Activity: {},
    Driver: {},
    Rider: {},
    "I have a tent": {},
  };

  const allSlotMaps = {
    "Food Prep + Grill": GRILL_SLOTS,
    Activity: ACTIVITY_SLOTS,
  };

  for (const type in allSlotMaps) {
    for (const key in allSlotMaps[type as keyof typeof allSlotMaps]) {
      groupedByType[type as keyof typeof allSlotMaps][key] = [];
    }
  }

  for (const s of signUps) {
    if (groupedByType[s.slotType] && groupedByType[s.slotType][s.time] !== undefined) {
      groupedByType[s.slotType][s.time].push(s.name);
    }
  }

  // === Carpool Logic ===
  type CarpoolSlot = {
    time: string;
    cars: {
      driver: string | null;
      riders: string[];
    }[];
  };

  function buildCarpool(signUps: SignUp[]): CarpoolSlot[] {
    const carpoolSlots: CarpoolSlot[] = [];

    ["from_nyc_fri", "from_dc_fri", "from_nyc_sat", "from_dc_sat", "to_nyc_mon", "to_dc_mon"].forEach(
      (time) => {
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
      }
    );

    return carpoolSlots;
  }

  const carpoolGroups = buildCarpool(signUps);
  const [selectedSlotType, setSelectedSlotType] = useState<SignUp["slotType"] | "">("");
  const [activityDescription, setActivityDescription] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [extraSpots, setExtraSpots] = useState(0);

  // Render helper
  function renderColumn(slotMap: SlotMap, filled: Record<string, string[]>, heading: string) {
    // Group slots by day
    const groupedByDay: Record<string, [string, SlotEntry][]> = {};
    for (const [key, entry] of Object.entries(slotMap)) {
      if (!groupedByDay[entry.day]) groupedByDay[entry.day] = [];
      groupedByDay[entry.day].push([key, entry]);
    }

    return (
      <div className="signup-column">
        <h2>{heading}</h2>
        {Object.entries(groupedByDay).map(([day, slots]) => (
          <div key={day} className="signup-day">
            <h3 style={{ marginBottom: "0.3rem" }}>{day}</h3>
            {slots.map(([key, entry]) => (
              <div key={key} className="slot-line" style={{ marginBottom: "0.2rem" }}>
                <div style={{ fontWeight: 600 }}>{entry.label}</div>
                <div className="name-list">{filled[key]?.join(", ") || "—"}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <main className="site-container">
      <div style={{ maxWidth: "100%", margin: "0 auto", padding: "1rem" }}>
        <h2 style={{ fontSize: "2rem", margin: "2rem 0 1.5rem", textAlign: "center" }}>
          Sign up for something helpful, or burdensome..
        </h2>

        {/* === SIGN-UP FORM === */}
        <form
          action={JSON_URL}
          method="POST"
          target="hidden_iframe"
          onSubmit={() => {
            alert("Thanks for signing up! The page will refresh now.");
            setTimeout(() => window.location.reload(), 500);
          }}
          style={{ marginBottom: "3rem" }}
        >
          <input type="hidden" name="activityDescription" value={activityDescription} />
          <input type="hidden" name="phoneNumber" value={phoneNumber} />
          <input type="hidden" name="extraSpots" value={extraSpots.toString()} />

          <label>
            <p>Name:</p>
            <input type="text" name="name" required />
          </label>

          <label>
            <p>Whatchu signing up for?:</p>
            <select
              name="slotType"
              value={selectedSlotType}
              onChange={(e) => setSelectedSlotType(e.target.value as SignUp["slotType"])}
              required
            >
              <option value="">-- Select an Option --</option>
              <option value="Food Prep + Grill">Food Prep + Grill</option>
              <option value="Driver">Carpool Driver</option>
              <option value="Rider">Carpool Rider</option>
              <option value="Activity">Activity Host</option>
              <option value="I have a tent">I have a tent</option>
            </select>
          </label>

          {selectedSlotType === "Activity" && (
            <label>
              <p>Describe the activity you wanna lead us in:</p>
              <input
                type="text"
                value={activityDescription}
                onChange={(e) => setActivityDescription(e.target.value)}
                required
              />
            </label>
          )}

          {selectedSlotType === "I have a tent" && (
            <>
              <label>
                <p>Your phone number:</p>
                <input
                  type="tel"
                  name="phoneNumberInput"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </label>
              <label>
                <p>How many extra spots in your tent?</p>
                <input
                  type="number"
                  name="extraSpotsInput"
                  value={extraSpots}
                  onChange={(e) => setExtraSpots(Number(e.target.value))}
                  min={0}
                  required
                />
              </label>
            </>
          )}

          {selectedSlotType === "Driver" && (
  <>
    <label>
      <p>Your phone number:</p>
      <input
        type="tel"
        name="driverPhoneNumber"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
    </label>
    <label>
      <p>How many extra seats in your car?</p>
      <input
        type="number"
        name="driverExtraSeats"
        value={extraSpots}
        onChange={(e) => setExtraSpots(Number(e.target.value))}
        min={0}
        required
      />
    </label>
  </>
)}


          {/* Hide time dropdown for tents */}
          {selectedSlotType !== "I have a tent" && (
            <label>
              <p>Time:</p>
              <select
                name="time"
                required
                value={selectedTime}
                onChange={(e) => {
                  setSelectedTime(e.target.value);
                  setSelectedDriver(""); // reset driver when time changes
                }}
              >
                <option value="">-- Select a Time Slot --</option>
                {Object.entries(
                  selectedSlotType ===  "Food Prep + Grill"
                    ? GRILL_SLOTS
                    : selectedSlotType === "Activity"
                    ? ACTIVITY_SLOTS
                    : {
                        from_dc_fri: { day: "Friday", label: "Leaving from DC", capacity: 999 },
                        from_nyc_fri: { day: "Friday", label: "Leaving from NYC", capacity: 999 },
                        from_dc_sat: { day: "Saturday", label: "Leaving from DC", capacity: 999 },
                        from_nyc_sat: { day: "Saturday", label: "Leaving from NYC", capacity: 999 },
                        to_dc_mon: { day: "Monday", label: "Returning to DC", capacity: 999 },
                        to_nyc_mon: { day: "Monday", label: "Returning to NYC", capacity: 999 },
                      }
                ).map(([key, entry]) => (
                  <option key={key} value={key}>
                    {entry.day} – {entry.label}
                  </option>
                ))}
              </select>
            </label>
          )}

          {selectedSlotType === "Rider" && selectedTime && (
            <label>
              <p>Driver of Choice:</p>
              <select
                name="preferredDriver"
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                required
              >
                <option value="">-- Select a Driver --</option>
                {signUps
  .filter((s) => s.slotType === "Driver" && s.time === selectedTime)
  .map((driver, index) => {
    const ridersForDriver = signUps.filter(
      (s) => s.slotType === "Rider" && s.time === selectedTime && s.driver === driver.name
    ).length;

    const availableSeats = (driver.extraSpots || 0) - ridersForDriver;

    return (
      <option key={index} value={driver.name} disabled={availableSeats <= 0}>
        {driver.name} ({availableSeats > 0 ? `${availableSeats} seats left` : "Full"})
      </option>
    );
  })}
              </select>
              <input type="hidden" name="preferredDriver" value={selectedDriver} />
            </label>
          )}

          <br />
          <br />
          <button type="submit">Sign Up</button>
          <iframe name="hidden_iframe" style={{ display: "none" }}></iframe>
        </form>


<div className="dual-column">
          {/* Carpool + Tents Column */}
          <div className="signup-column">
            <h2>Carpool</h2>
            {["from_nyc_fri", "from_dc_fri", "from_nyc_sat", "from_dc_sat", "to_nyc_mon", "to_dc_mon"].map(
              (key) => {
                const group = carpoolGroups.find((g) => g.time === key);
                if (!group) return null;

                const labelMap: Record<string, string> = {
                  from_nyc_fri: "Friday – Leave from NYC",
                  from_dc_fri: "Friday – Leave from DC",
                  from_nyc_sat: "Saturday – Leave from NYC",
                  from_dc_sat: "Saturday – Leave from DC",
                  to_nyc_mon: "Monday – Return to NYC",
                  to_dc_mon: "Monday – Return to DC",
                };

                return (
                  <div key={key} className="signup-day">
                    <h3 style={{ marginBottom: "0.5rem" }}>{labelMap[key]}</h3>
                    {group.cars.length > 0 ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
                              <strong>Riders:</strong> {car.riders.length > 0 ? car.riders.join(", ") : "—"}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p style={{ fontStyle: "italic" }}>No cars yet for this time.</p>
                    )}
                  </div>
                );
              }
            )}
          </div>

          {/* Tents Column */}
          <div className="signup-column">
            <h2>Tents</h2>
            {signUps
              .filter((s) => s.slotType === "I have a tent")
              .map((s) => (
                <div key={s.timestamp}>
                  {s.name} – {s.extraSpots || 0} extra spots – {s.phoneNumber || "No phone"}
                </div>
              ))}
          </div>
        </div>

        {/* === SIGNUP LISTS === */}
        <div className="dual-column">
          {renderColumn(ACTIVITY_SLOTS, groupedByType.Activity, "Activities")}
          {renderColumn(GRILL_SLOTS, groupedByType["Food Prep + Grill"], "Food Prep + Grill")}
        </div>

        
      </div>
    </main>
  );
}
