// src/page/home/components/venue/Venue.jsx

import { homeContent } from "../../../../config/content/home.content.js";
import styles from "./Venue.module.css";

export function VenueSection() {
  const { venueSection } = homeContent;
  const { id, title, subtitle, paragraphs, addressTitle, addressLines } =
    venueSection;

  return (
    <section id={id} className={styles.section} aria-labelledby="venue-title">
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h2 id="venue-title" className={styles.title}>
            {title}
          </h2>

          <p className={styles.subtitle}>{subtitle}</p>

          <div className={styles.textBlock}>
            {paragraphs.map((text, index) => (
              <p key={index} className={styles.paragraph}>
                {text}
              </p>
            ))}
          </div>

          <div className={styles.addressBlock}>
            <p className={styles.addressLabel}>{addressTitle}</p>
            {addressLines.map((line, index) => (
              <p key={index} className={styles.addressLine}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
