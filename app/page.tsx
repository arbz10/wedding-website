import BackToTop from "@/components/BackToTop";
import Couple from "@/components/Couple";
import Events from "@/components/Events";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Rsvp from "@/components/Rsvp";
import SaveTheDate from "@/components/SaveTheDate";
import Story from "@/components/Story";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Couple />
        <Story />
        <SaveTheDate />
        <Events />
        <Gallery />
        <Rsvp />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
