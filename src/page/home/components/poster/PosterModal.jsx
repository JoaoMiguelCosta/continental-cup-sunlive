import { useEffect } from "react";
import { createPortal } from "react-dom";

import styles from "./PosterModal.module.css";

export function PosterModal({ isOpen, onClose, src, alt = "Poster" }) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Poster"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className={styles.card}>
        <button
          type="button"
          className={styles.close}
          aria-label="Fechar poster"
          title="Fechar"
          onClick={onClose}
        >
          ×
        </button>

        <img className={styles.image} src={src} alt={alt} />
      </div>
    </div>,
    document.body
  );
}
