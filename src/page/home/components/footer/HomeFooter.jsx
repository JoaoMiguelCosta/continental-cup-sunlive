// src/pages/home/components/footer/HomeFooter.jsx
import { homeContent } from "../../../../config/content/home.content.js";
import styles from "./HomeFooter.module.css";

export function HomeFooter() {
  const { id, siteLabel, homeTargetId, copyright } = homeContent.footer;

  const handleGoHome = (e) => {
    e.preventDefault();
    const el = document.getElementById(homeTargetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer id={id} className={styles.footer}>
      <div className={styles.inner}>
        <a
          href={`#${homeTargetId}`}
          className={styles.siteLink}
          onClick={handleGoHome}
        >
          {siteLabel}
        </a>

        <p className={styles.copy}>{copyright}</p>
      </div>
    </footer>
  );
}
