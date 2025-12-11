
import { homeContent } from "../../../../config/content/home.content.js";
import styles from "./Hero.module.css";

export function Hero() {
  const { hero } = homeContent;
  const { titleLines, poweredBy, location, dates, ctas } = hero;

  return (
    <section id={hero.id} className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.titleLine}>{titleLines[0]}</span>
            <span className={styles.titleLineHighlight}>{titleLines[1]}</span>
          </h1>

          <p className={styles.poweredBy}>{poweredBy}</p>
          <p className={styles.location}>{location}</p>
          <p className={styles.dates}>{dates}</p>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.buttonSecondary}
              // lógica do click vem depois
            >
              {ctas.poster.label}
            </button>

            <button
              type="button"
              className={styles.buttonPrimary}
              // lógica do click vem depois
            >
              {ctas.registration.label}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
