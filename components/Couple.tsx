import { wedding } from "@/lib/wedding";
import { SectionHead } from "./Ornaments";
import Photo from "./Photo";
import Reveal from "./Reveal";

type Person = typeof wedding.bride;

function PersonCard({ person, role }: { person: Person; role: string }) {
  return (
    <Reveal as="article" className="person">
      <div className="person__frame">
        <Photo src={person.photo} className="person__photo">
          <span className="person__initial" aria-hidden="true">
            {person.first[0]}
          </span>
        </Photo>
      </div>
      <h3 className="script">{person.full}</h3>
      <p className="person__role">{role}</p>
      <p>{person.bio}</p>
      <div className="socials">
        <a href={person.instagram} aria-label={`${person.first} on Instagram`}>IG</a>
        <a href={person.facebook} aria-label={`${person.first} on Facebook`}>FB</a>
      </div>
    </Reveal>
  );
}

export default function Couple() {
  return (
    <section className="section couple" id="couple">
      <div className="container">
        <Reveal>
          <SectionHead eyebrow="Happy couple" title="Bride & Groom" />
        </Reveal>
        <div className="couple__grid">
          <PersonCard person={wedding.bride} role="The Bride" />
          <Reveal className="couple__amp script">
            <span aria-hidden="true">&amp;</span>
          </Reveal>
          <PersonCard person={wedding.groom} role="The Groom" />
        </div>
      </div>
    </section>
  );
}
