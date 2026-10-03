"use client";

import { wedding, coupleNames } from "@/lib/wedding";
import Photo from "./Photo";
import Reveal from "./Reveal";

const icsDate = (d: string | number) =>
  new Date(d).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

function downloadIcs() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding//RSVP//EN",
    "BEGIN:VEVENT",
    `UID:${icsDate(wedding.start)}-wedding`,
    `DTSTAMP:${icsDate(Date.now())}`,
    `DTSTART:${icsDate(wedding.start)}`,
    `DTEND:${icsDate(wedding.end)}`,
    `SUMMARY:${coupleNames.replace(/&/g, "and")}'s Wedding`,
    `LOCATION:${wedding.location.replace(/,/g, "\\,")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: "wedding.ics" });
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function SaveTheDate() {
  return (
    <section className="banner">
      <Photo src={wedding.bannerImage} className="banner__bg" />
      <div className="banner__overlay" />
      <Reveal className="banner__content">
        <p className="eyebrow">Save the date</p>
        <h2 className="script">{wedding.dateShort}</h2>
        <button type="button" className="btn btn--light" onClick={downloadIcs}>
          Add to Calendar
        </button>
      </Reveal>
    </section>
  );
}
