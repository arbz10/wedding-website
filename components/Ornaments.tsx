export function Ornament({ light = false }: { light?: boolean }) {
  return (
    <svg className={`ornament ${light ? "ornament--light" : ""}`} viewBox="0 0 200 40" aria-hidden="true">
      <path d="M5 20 C60 20 140 20 195 20" fill="none" stroke="currentColor" strokeWidth="1" />
      <g fill="currentColor" opacity=".85">
        <path d="M40 20 c6-10 18-12 24-10 c-4 6-14 12-24 10z" />
        <path d="M40 20 c6 10 18 12 24 10 c-4-6-14-12-24-10z" />
        <path d="M136 20 c-6-10-18-12-24-10 c4 6 14 12 24 10z" />
        <path d="M136 20 c-6 10-18 12-24 10 c4-6 14-12 24-10z" />
        <circle cx="100" cy="20" r="4" />
        <circle cx="88" cy="20" r="2" />
        <circle cx="112" cy="20" r="2" />
      </g>
    </svg>
  );
}

export function Heart() {
  return (
    <svg className="icon-heart" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21s-7.5-4.6-10-9.2C.3 8.4 2.2 4 6.3 4c2.3 0 3.9 1.4 5.7 3.4C13.8 5.4 15.4 4 17.7 4 21.8 4 23.7 8.4 22 11.8 19.5 16.4 12 21 12 21z"
        fill="currentColor"
      />
    </svg>
  );
}

const eventIcons = {
  chapel: "M24 6l4 6h-8zM14 20h20v22H14zM10 42h28M20 42V30h8v12M24 12v8",
  glass: "M16 6h16l-2 14a6 6 0 01-12 0zM24 26v14M16 42h16",
  cake: "M8 40h32M12 40V24h24v16M10 24h28M24 8v8M18 16h12l-2 8H20z",
};

export function EventIcon({ name }: { name: keyof typeof eventIcons }) {
  return (
    <div className="event__icon" aria-hidden="true">
      <svg viewBox="0 0 48 48">
        <path d={eventIcons[name]} fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="section__head">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="script">{title}</h2>
      <Ornament />
      {children}
    </header>
  );
}
