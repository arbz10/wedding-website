import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Jost } from "next/font/google";
import { coupleNames, wedding } from "@/lib/wedding";
import "./globals.css";

const script = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-script-face" });
const serif = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif-face",
});
const sans = Jost({ weight: ["300", "400", "500"], subsets: ["latin"], variable: "--font-sans-face" });

export const metadata: Metadata = {
  title: `${coupleNames} — Wedding Invitation`,
  description: `Join us on ${wedding.dateLong} at ${wedding.venue}. Event details, our story, gallery and RSVP.`,
};

export const viewport: Viewport = { themeColor: "#fbf8f3" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${script.variable} ${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
