import { wedding } from "@/lib/wedding";
import { Heart } from "./Ornaments";
import Reveal from "./Reveal";

export default function Intro() {
  return (
    <section className="section intro" id="intro">
      <Reveal className="container narrow">
        <Heart />
        <p className="intro__quote">
          “{wedding.quote[0]}
          <br />
          {wedding.quote[1]}”
        </p>
        <p className="intro__text">{wedding.invitation}</p>
      </Reveal>
    </section>
  );
}
