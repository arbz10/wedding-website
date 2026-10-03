import { wedding, coupleNames } from "@/lib/wedding";
import { Ornament } from "./Ornaments";

export default function Footer() {
  return (
    <footer className="footer">
      <h2 className="script">{coupleNames}</h2>
      <Ornament light />
      <p>
        {wedding.dateShort.replace(/ · /g, ".")} · {wedding.location}
      </p>
      <p className="footer__tag">{wedding.hashtag}</p>
    </footer>
  );
}
