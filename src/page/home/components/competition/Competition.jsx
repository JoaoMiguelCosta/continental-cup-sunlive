// src/pages/home/components/competition/Competition.jsx
import { useEffect, useState } from "react";
import { homeContent } from "../../../../config/content/home.content.js";
import styles from "./Competition.module.css";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfFwQN55VTa0FVSJHl-MD3G4XDdd82Mkb0iJZnQAYO_LhR6GA/viewform?embedded=true";

export function CompetitionSection() {
  const { competitionSection } = homeContent;

  // ❌ downloadNote e categoryCtas ocultos (mantém se precisares depois)
  // const { id, badge, title, paragraphs, mainCtas, downloadNote, categoryCtas } =
  //   competitionSection;

  const { id, badge, title, paragraphs, mainCtas } = competitionSection;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormLoaded, setIsFormLoaded] = useState(false);

  const openModal = () => {
    setIsFormLoaded(false);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Fechar com ESC + bloquear scroll
  useEffect(() => {
    if (!isModalOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isModalOpen]);

  const onOverlayMouseDown = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <section id={id} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.badgeWrapper}>
          <p className={styles.badge}>{badge}</p>
        </div>

        <h2 className={styles.title}>{title}</h2>

        <div className={styles.textBlock}>
          {paragraphs.map((text, index) => (
            <p key={index} className={styles.paragraph}>
              {text}
            </p>
          ))}
        </div>

        <div className={styles.mainActions}>
          <button
            type="button"
            className={styles.buttonMain}
            onClick={openModal}
          >
            {mainCtas.registrationForm.label}
          </button>
        </div>

        {/* ❌ downloadNote oculto (mantém para reativar quando quiseres) */}
        {/*
        <p className={styles.note}>{downloadNote}</p>
        */}

        {/* ❌ categoryCtas oculto (mantém para reativar quando quiseres) */}
        {/*
        <div className={styles.categoryActions}>
          <a
            href={categoryCtas.mag.href}
            download={categoryCtas.mag.filename}
            className={`${styles.categoryButton} ${styles.categoryButtonMag}`}
          >
            {categoryCtas.mag.label}
          </a>

          <a
            href={categoryCtas.wag.href}
            download={categoryCtas.wag.filename}
            className={`${styles.categoryButton} ${styles.categoryButtonWag}`}
          >
            {categoryCtas.wag.label}
          </a>
        </div>
        */}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Registration form"
          onMouseDown={onOverlayMouseDown}
        >
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <p className={styles.modalTitle}>
                {mainCtas.registrationForm.label}
              </p>

              <button
                type="button"
                className={styles.modalClose}
                onClick={closeModal}
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <div
              className={`${styles.modalBody} ${
                isFormLoaded ? styles.modalBodyLoaded : ""
              }`}
            >
              <iframe
                title="Registration form"
                src={FORM_URL}
                className={styles.modalIframe}
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                onLoad={() => setIsFormLoaded(true)}
              >
                A carregar…
              </iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
