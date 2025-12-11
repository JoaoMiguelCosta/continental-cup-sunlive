// src/page/home/components/Header/header.jsx

/**
 * Header principal da Home (Continental Cup)
 * - logo Sunlive à esquerda
 * - navegação com itens do conteúdo (homeContent.header.navItems)
 */

import { homeContent } from "../../../../config/content/home.content.js";
import styles from "./header.module.css";

export function HomeHeader() {
  const { header } = homeContent;
  const { logo, navItems } = header;

  function handleNavClick(targetId) {
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const offset = window.scrollY + rect.top;
    const headerOffset = 80; // ajusta depois se mudares a altura do header

    window.scrollTo({
      top: offset - headerOffset,
      behavior: "smooth",
    });
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logoWrapper}>
          <img src={logo.src} alt={logo.alt} className={styles.logoImage} />
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={
                item.variant === "highlight"
                  ? styles.navLinkHighlight
                  : styles.navLink
              }
              onClick={() => handleNavClick(item.targetId)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
