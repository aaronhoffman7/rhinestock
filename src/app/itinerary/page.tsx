"use client";

import { useEffect } from "react";
import { usePageTitle } from "../context/PageTitleContext";

export default function ItineraryPage() {
  const [, setTitle] = usePageTitle();

  useEffect(() => {
    setTitle("Itinerary");
  }, [setTitle]);

  const schedule = [
    {
      day: "Friday, August 29",
      events: [
        { time: "5:00 PM on", title: "Arrive Friday if it makes sense for your travel logistics!" },
      ]
    },
    {
      day: "Saturday, August 30",
      events: [
        { time: "9:00 AM", title: "Breakfast bar opens" },
        { time: "11:00 AM", title: "Set up camp, explore town, shopping, lunch, free play :) " },
        { time: "4:00 PM", title: "Dinner prep" },
        { time: "5:00 PM", title: "grillin, chillin, sunset dance party" },
        { time: "10:00 PM to late", title: "use ur imagination" }
      ]
    },
    {
      day: "Sunday, August 31",
      events: [
        { time: "9:00 AM", title: "Coffee + chill time" },
        { time: "10:30 AM", title: "brunch!" },
        { time: "12:30 PM", title: "free play: excursions, hammock naps, etc." },
        { time: "8:00 PM", title: "Dinner" },
        { time: "10:00 PM- late", title: "wubz and dubz" }
      ]
    },
    {
      day: "Monday, September 1",
      events: [
        { time: "8:30 AM", title: "Farewell breakfast" },
        { time: "11:00 AM", title: "Bye byes" }
      ]
    }
  ];

  return (
  <main className="site-container">
  <h2 className="tagline">Tentative Weekend Itinerary</h2>
  {schedule.map((day, idx) => (
    <section key={idx} className="itinerary-row">
      <div className="itinerary-day">
        <div className="itinerary-date">
          <h2>{day.day}</h2>
        </div>
        <div className="itinerary-events">
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {day.events.map((event, i) => (
              <li key={i} className="text-content">
                <p>
                  <strong>{event.time}</strong> — {event.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  ))}
</main>
);
}
