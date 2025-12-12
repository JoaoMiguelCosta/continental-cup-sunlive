// src/pages/home/Home.jsx
import { HomeHeader } from "./components/Header/Header.jsx";
import { Hero } from "./components/hero/Hero.jsx";
import { MessageSection } from "./components/message/Message.jsx";
import { CompetitionSection } from "./components/competition/Competition.jsx";
import { VenueSection } from "./components/venue/Venue.jsx";
import { HotelSection } from "./components/hotel/Hotel.jsx";
import { SunliveSection } from "./components/sunlive/Sunlive.jsx";
import { HomeOrgPartnersSection } from "./components/HomeOrgPartnersSection/HomeOrgPartnersSection.jsx";
import { HomeContactsSection } from "./components/contacts/HomeContactsSection.jsx";
import { HomeFooter } from "./components/footer/HomeFooter.jsx";
import { BackToTopButton } from "./components/backToTop/BackToTopButton.jsx";

import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <HomeHeader /> {/* ✅ fora do heroRegion */}
      <section className={styles.heroRegion}>
        <Hero />
      </section>
      <MessageSection />
      <CompetitionSection />
      <VenueSection />
      <HotelSection />
      <SunliveSection />
      <HomeOrgPartnersSection />
      <HomeContactsSection />
      <HomeFooter />
      <BackToTopButton />
    </main>
  );
}