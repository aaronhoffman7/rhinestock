"use client";

import { useEffect, useState } from "react";
import { usePageTitle } from "../context/PageTitleContext";

type SignUp = {
  name: string;
  slotType: "Grilling" | "DJ";
  time: string;
};

export default function SignUps() {
  const [, setTitle] = usePageTitle();
  const [signUps, setSignUps] = useState<SignUp[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    slotType: "Grilling" as "Grilling" | "DJ",
    time: ""
  });

  useEffect(() => {
    setTitle("Event Sign Ups");
  }, [setTitle]);

  return (
    <main>
      <h2>Sign Up for a Slot</h2>
      <form action="https://script.google.com/macros/s/AKfycbxEWFpJNjvzoyuAXC1lglMNoDBOCMLcHTKm0orazuLlJ9ExK5GiiH82c16wfVHombc/exec" method="POST" target="hidden_iframe" onSubmit={() => alert("Thanks for signing up!")}>
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
      {signUps.length === 0 && <p>No sign-ups yet. Be the first!</p>}
      <ul>
        {signUps.map((s, i) => (
          <li key={i}>
            <strong>{s.name}</strong> signed up for <em>{s.slotType}</em> at <strong>{s.time}</strong>
          </li>
        ))}
      </ul>
    </main>
  );
}
