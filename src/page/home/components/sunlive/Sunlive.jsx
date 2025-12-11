// src/page/home/components/sunlive/Sunlive.jsx

import { homeContent } from "../../../../config/content/home.content.js";
import styles from "./Sunlive.module.css";

export function SunliveSection() {
  const { sunliveSection } = homeContent;
  const { id, title, paragraphs, video, pdf } = sunliveSection;

  return (
    <section id={id} className={styles.section} aria-labelledby="sunlive-title">
      <div className={styles.overlay}>
        <div className={styles.inner}>
          <div className={styles.card}>
            {/* Texto à esquerda */}
            <div className={styles.content}>
              <h2 id="sunlive-title" className={styles.title}>
                {title}
              </h2>

              <div className={styles.textBlock}>
                {paragraphs.map((text, index) => (
                  <p key={index} className={styles.paragraph}>
                    {text}
                  </p>
                ))}
              </div>

              <div className={styles.actions}>
                <a href={pdf.href} download className={styles.buttonPrimary}>
                  {pdf.label}
                </a>
              </div>
            </div>

            {/* Vídeo à direita */}
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
          </div>
        </div>
      </div>
    </section>
  );
}
