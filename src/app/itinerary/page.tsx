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
      photo: "/photos/hole.jpg",
      events: [
        { time: "5:00 PM onward", title: "Arrive Friday if it makes sense for your travel logistics! Set up camp, hang out at home or a local bar, drive-in theater maybe??" },
      ]
    },
    {
     day: "Saturday, August 30",
photo: "/photos/ferncliff.jpg",
events: [
  { time: "9:00 AM", title: "Breakfast, set up camp, possible light dinner prep" },
  {
    time: "11:00 AM",
    content: [
      "Explore town, shopping, ",
      { linkText: "mini-hike with river views", linkUrl: "https://maps.app.goo.gl/jShkZBGXfu5LFum38" },
      ", lunch + ice cream, ",
      { linkText: "local swim spot", linkUrl: "https://maps.app.goo.gl/JxDoZvWGs3TH1baT8" },
      ", free play :)"
    ]
  },
  { time: "5:00 PM", title: "Dinner prep, foraging walk??" },
  { time: "6:00 PM", title: "grillin, chillin, sunset dance party" },
  { time: "10:00 PM to late", title: "use ur imagination, rumor of possible Skrillex B2B Dead & Co set" }
]

    },
    {
  day: "Sunday, August 31",
  photo: "/photos/market.jpg",
  events: [
    { time: "9:00 AM", title: "Coffee + chill time" },
    { time: "10:00 AM", title: "brunch + Rhinebeck Farmers Market" },
    {
      time: "12:30 PM",
      content: [
        "visit to ",
        {
          linkText: "pick-your-own",
          linkUrl: "https://maps.app.goo.gl/Pm41MH4FQFRG3FzS6"
        },
        " apples + berry farm and ", 
        {
          linkText: "sip local ciders.",
          linkUrl: "https://maps.app.goo.gl/nLpJPGUw3w7f9iHt6"
        },
      ]
    },
    { time: "6:00 PM", title: "Dinner prep" },
    { time: "10:00 PM- late", title: "wubz and dubz??" }
  ]
},
    {
      day: "Monday, September 1",
      photo: "/photos/home2.jpg",
      events: [
        { time: "8:30 AM", title: "Farewell breakfast" },
        { time: "11:00 AM", title: "Bye byes" }
      ]
    }
  ];

  return (
  <main className="site-container">
 <h2 style={{ fontSize: "2.5rem", margin: "2rem 0 2.5rem", textAlign: "center" }}>
  Tentative Weekend Itinerary
</h2>
 {schedule.map((day, idx) => {
  const isRightAligned =
    day.day.includes("Saturday") || day.day.includes("Monday");

  return (
    <section
      key={idx}
      className={`itinerary-row ${isRightAligned ? "right" : "left"}`}
    >
      {/* Photo and schedule in the same flex container */}
      <div className="itinerary-day">
        <div className="itinerary-photo">
          <img src={day.photo} alt={day.day} />
        </div>

        <div className="itinerary-events">
          <div className="itinerary-date">
            <h2>{day.day}</h2>
          </div>
          <ul>
            {day.events.map((event, i) => (
  <li key={i} className="text-content">
    <p>
      <strong>{event.time}</strong>{" "}
      {event.content
        ? event.content.map((part, idx) =>
            typeof part === "string" ? (
              part
            ) : (
              <a
                key={idx}
                href={part.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#3b82f6", textDecoration: "underline" }}
              >
                {part.linkText}
              </a>
            )
          )
        : `— ${event.title}`}
    </p>
  </li>
))}
          </ul>
        </div>
      </div>
    </section>
  );
})}




</main>
);
}
