// src/page/home/components/hotel/Hotel.jsx

import { homeContent } from "../../../../config/content/home.content.js";
import styles from "./Hotel.module.css";

export function HotelSection() {
  const { hotelSection } = homeContent;
  const { id, title, video, addressTitle, addressLines, website } =
    hotelSection;

  return (
    <section id={id} className={styles.section} aria-labelledby="hotel-title">
      <div className={styles.overlay}>
        <div className={styles.inner}>
          <div className={styles.card}>
            <div className={styles.media}>
              <div className={styles.videoFrame}>
                <iframe
                  src={video.src}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <div className={styles.content}>
              <h2 id="hotel-title" className={styles.title}>
                {title}
              </h2>

              <div className={styles.addressBlock}>
                <p className={styles.addressLabel}>{addressTitle}</p>
                {addressLines.map((line, index) => (
                  <p key={index} className={styles.addressLine}>
                    {line}
                  </p>
                ))}
              </div>

              <div className={styles.actions}>
                <a
                  href={website.href}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.buttonPrimary}
                >
                  {website.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
