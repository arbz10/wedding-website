import { wedding } from "@/lib/wedding";
import Countdown from "./Countdown";
import { Ornament } from "./Ornaments";
import Photo from "./Photo";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <Photo src={wedding.heroImage} className="hero__bg" />
      <div className="hero__overlay" />
      <Reveal className="hero__content">
        <p className="eyebrow">We&apos;re getting married</p>
        <h1 className="script hero__names">
          {wedding.bride.first} <span>&amp;</span> {wedding.groom.first}
        </h1>
        <Ornament light />
        <p className="hero__date">{wedding.dateLong}</p>
        <p className="hero__place">{wedding.venue}</p>
        <Countdown to={wedding.start} />
        <a href="#rsvp" className="btn btn--light">
          Kindly RSVP
        </a>
      </Reveal>
      <a href="#intro" className="hero__scroll" aria-label="Scroll down">
        <span />
      </a>
    </section>
  );
}
