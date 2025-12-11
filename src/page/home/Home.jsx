// src/pages/home/Home.jsx

/**
 * Estrutura da página Home (Continental Cup)
 *
 * - Header
 * - Hero
 * - Mensagem (Lucas)
 * - Secção Competition (CUP)
 * - Secção Venue (Velodrome of Sangalhos)
 * - (restantes secções virão depois)
 */

import { HomeHeader } from "./components/Header/Header.jsx";
import { Hero } from "./components/hero/Hero.jsx";
import { MessageSection } from "./components/message/Message.jsx";
import { CompetitionSection } from "./components/competition/Competition.jsx";
import { VenueSection } from "./components/venue/Venue.jsx";
import { HotelSection } from "./components/hotel/Hotel.jsx";
import { SunliveSection } from "./components/sunlive/Sunlive.jsx";

import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.heroRegion}>
        <HomeHeader />
        <Hero />
      </section>

      <MessageSection />
      <CompetitionSection />
      <VenueSection />
      <HotelSection />
      <SunliveSection />
    </main>
  );
}
