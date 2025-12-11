// src/pages/home/Home.jsx

/**
 * Estrutura da página Home (Continental Cup)
 *
 * - Header
 * - Hero
 * - Secção 1
 * - Secção 2
 * - Secção 3
 * - Secção 4
 * - Secção 5
 * - Secção 6
 * - Secção 7
 */

// import { HomeHeader } from "./components/HomeHeader.jsx";
// import { HeroSection } from "./components/HeroSection.jsx";
// import { SectionOne } from "./components/SectionOne.jsx";
// import { SectionTwo } from "./components/SectionTwo.jsx";
// import { SectionThree } from "./components/SectionThree.jsx";
// import { SectionFour } from "./components/SectionFour.jsx";
// import { SectionFive } from "./components/SectionFive.jsx";
// import { SectionSix } from "./components/SectionSix.jsx";
// import { SectionSeven } from "./components/SectionSeven.jsx";
// import { HomeFooter } from "./components/HomeFooter.jsx";
// // import { ScrollToTopButton } from "../../shared/components/ScrollToTopButton.jsx";

import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      {/* <HomeHeader />
      <HeroSection />

      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix />
      <SectionSeven />

      <HomeFooter />

      {/* botão flutuante para voltar ao topo */}
      {/* <ScrollToTopButton /> */}
      
        Continental Cup · layout em construção.
      
    </main>
  );
}
