import { wedding } from "@/lib/wedding";
import { EventIcon, SectionHead } from "./Ornaments";
import Reveal from "./Reveal";

export default function Events() {
  return (
    <section className="section events" id="events">
      <div className="container">
        <Reveal>
          <SectionHead eyebrow="When & where" title="Wedding Events" />
        </Reveal>
        <div className="events__grid">
          {wedding.events.map((e) => (
            <Reveal as="article" className="event" key={e.title}>
              <EventIcon name={e.icon} />
              <h3>{e.title}</h3>
              <p className="event__time">
                {wedding.eventDay}
                <br />
                {e.time}
              </p>
              <p>
                {e.place}
                <br />
                {e.address}
              </p>
              <a className="btn btn--outline" href={e.map} target="_blank" rel="noopener noreferrer">
                View Map
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal className="dresscode">
          <p>
            <strong>Dress code:</strong> {wedding.dressCode}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
