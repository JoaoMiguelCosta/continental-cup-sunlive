// src/pages/home/components/hero/Hero.jsx
import { useEffect, useLayoutEffect, useState } from "react";
import { homeContent } from "../../../../config/content/home.content.js";
import styles from "./Hero.module.css";

export function Hero() {
  const { hero } = homeContent;
  const { titleLines, poweredBy, location, dates, ctas, poster } = hero;

  const [isPosterOpen, setIsPosterOpen] = useState(false);
  const [headerH, setHeaderH] = useState(80); // fallback (igual ao teu headerOffset)

  function scrollToCompetition() {
    const el = document.getElementById("cup");
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openPoster() {
    setIsPosterOpen(true);
  }

  function closePoster() {
    setIsPosterOpen(false);
  }

  // ✅ mede a altura real do teu header: <header className={styles.header}>
  useLayoutEffect(() => {
    const headerEl = document.querySelector("header");
    if (!headerEl) return;

    const update = () => {
      const h = Math.round(headerEl.getBoundingClientRect().height);
      if (h > 0) setHeaderH(h);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(headerEl);

    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  // ✅ ESC para fechar
  useEffect(() => {
    if (!isPosterOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closePoster();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isPosterOpen]);

  // ✅ bloqueia scroll da página quando modal abre
  useEffect(() => {
    if (!isPosterOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isPosterOpen]);

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
              onClick={openPoster}
            >
              {ctas.poster.label}
            </button>

            <button
              type="button"
              className={styles.buttonPrimary}
              onClick={scrollToCompetition}
            >
              {ctas.registration.label}
            </button>
          </div>
        </div>
      </div>

      {isPosterOpen && (
        <div
          className={styles.posterOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Poster"
          style={{
            paddingTop: `calc(${headerH}px + 1rem)`, // ✅ nunca sobe para cima do header
          }}
          onMouseDown={(e) => {
            // ✅ clicar fora fecha
            if (e.target === e.currentTarget) closePoster();
          }}
        >
          <div className={styles.posterModal}>
            <button
              type="button"
              className={styles.posterClose}
              onClick={closePoster}
              aria-label="Fechar poster"
              title="Fechar"
            >
              ✕
            </button>

            <img
              className={styles.posterImg}
              src={poster.src}
              alt={poster.alt}
              loading="eager"
            />
          </div>
        </div>
      )}
    </section>
  );
}
