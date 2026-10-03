import { wedding } from "@/lib/wedding";
import Photo from "./Photo";

function RsvpBadge() {
  return (
    <a href="#rsvp" className="badge" aria-label="RSVP now">
      <svg className="badge__ring" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M60 60 m-48 0 a48 48 0 1 1 96 0 a48 48 0 1 1 -96 0" />
        </defs>
        <text>
          <textPath href="#badge-circle" textLength="296">
            RSVP NOW · KINDLY REPLY · RSVP NOW · KINDLY REPLY ·
          </textPath>
        </text>
      </svg>
      <span className="badge__dot">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </span>
    </a>
  );
}

export default function Hero() {
  const { heroPhotos } = wedding;

  return (
    <section className="hero" id="home">
      <h1 className="hero__title">
        <span className="hero__kicker">We are getting married</span>
        <span className="hero__names script">
          {wedding.bride.first} <span className="hero__amp">&amp;</span> {wedding.groom.first}
        </span>
      </h1>

      <div className="hero__stage">
        <div className="hero__col hero__col--left">
          <Photo src={heroPhotos.left} className="hero__photo hero__photo--left" />
          <p className="hero__intro">{wedding.heroIntro}</p>
          <p className="hero__address">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 22s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12z" fill="currentColor" />
              <circle cx="12" cy="10" r="2.6" fill="var(--parchment)" />
            </svg>
            {wedding.shortAddress}
          </p>
        </div>

        <div className="hero__col hero__col--center">
          <Photo src={heroPhotos.center} className="hero__photo hero__photo--center" />
          <p className="hero__save">Save the date</p>
          <p className="hero__date">{wedding.dateLong.replace("Saturday · ", "")}</p>
        </div>

        <div className="hero__col hero__col--right">
          <Photo src={heroPhotos.right} className="hero__photo hero__photo--right" />
          <blockquote className="hero__quote">
            <p>{wedding.heroQuote}</p>
          </blockquote>
          <RsvpBadge />
        </div>
      </div>
    </section>
  );
}
