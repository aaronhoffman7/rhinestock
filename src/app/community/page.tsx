"use client";

import { useEffect } from "react";
import { usePageTitle } from "../context/PageTitleContext";

export default function SignUps() {
  const [, setTitle] = usePageTitle();

  useEffect(() => {
    setTitle("Event Sign Ups");
  }, [setTitle]);

  return (
    <main>
      <h2>Sign Up for a Slot</h2>
      <form
        action="https://script.google.com/macros/s/AKfycbxEWFpJNjvzoyuAXC1lglMNoDBOCMLcHTKm0orazuLlJ9ExK5GiiH82c16wfVHombc/exec"
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
      <h2>Current Sign Ups</h2>
      <p>
        View the latest sign-ups <a href="https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit?usp=sharing" target="_blank" rel="noopener noreferrer">in the Google Sheet</a>.
      </p>
    </main>
  );
}
