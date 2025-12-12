// src/page/home/components/competition/Competition.jsx

import { useState } from "react";
import { homeContent } from "../../../../config/content/home.content.js";

import { RegistrationFormModal } from "../registrationForm/RegistrationFormModal.jsx";
import styles from "./Competition.module.css";

export function CompetitionSection() {
  const { competitionSection } = homeContent;
  const { id, badge, title, paragraphs, mainCtas, downloadNote, categoryCtas } =
    competitionSection;

  const [isFormOpen, setIsFormOpen] = useState(false);

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
          {/* ✅ Só fica 1 botão (dourado) e abre o formulário */}
          <button
            type="button"
            className={styles.buttonMain}
            onClick={() => setIsFormOpen(true)}
          >
            {mainCtas.registrationForm.label}
          </button>
        </div>

        <p className={styles.note}>{downloadNote}</p>

        <div className={styles.categoryActions}>
          <button
            type="button"
            className={`${styles.categoryButton} ${styles.categoryButtonMag}`}
          >
            {categoryCtas.mag.label}
          </button>

          <button
            type="button"
            className={`${styles.categoryButton} ${styles.categoryButtonWag}`}
          >
            {categoryCtas.wag.label}
          </button>
        </div>
      </div>

      {/* ✅ Modal do formulário (centrado e acima do header) */}
      <RegistrationFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        content={competitionSection.registrationModal}
      />
    </section>
  );
}
