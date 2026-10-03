import { wedding } from "@/lib/wedding";
import { SectionHead } from "./Ornaments";
import Photo from "./Photo";
import Reveal from "./Reveal";

export default function Story() {
  return (
    <section className="section story" id="story">
      <div className="container">
        <Reveal>
          <SectionHead eyebrow="How it all began" title="Our Love Story" />
        </Reveal>
        <ol className="timeline">
          {wedding.story.map((item) => (
            <Reveal as="li" className="timeline__item" key={item.title}>
              <Photo src={item.photo} className="timeline__photo" />
              <div className="timeline__card">
                <span className="timeline__date">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
