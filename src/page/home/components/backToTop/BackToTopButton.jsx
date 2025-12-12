// src/pages/home/components/backToTop/BackToTopButton.jsx
import { useEffect, useState } from "react";
import { homeContent } from "../../../../config/content/home.content.js";
import styles from "./BackToTopButton.module.css";

export function BackToTopButton() {
  const homeTargetId = homeContent?.hero?.id ?? "home";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 350);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const el = document.getElementById(homeTargetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleClick}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
    >
      <span className={styles.icon} aria-hidden="true">
        ▲
      </span>
    </button>
  );
}
