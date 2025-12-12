// src/pages/home/components/HomeOrgPartnersSection/HomeOrgPartnersSection.jsx
import { homeContent } from "../../../../config/content/home.content.js";
import styles from "./HomeOrgPartnersSection.module.css";

export function HomeOrgPartnersSection() {
  const { id, organizationTitle, partnersTitle, organization, partners } =
    homeContent.orgPartnersSection;

  return (
    <section id={id} className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{organizationTitle}</h2>

        <div className={styles.logosRow}>
          {organization.map((logo) => (
            <div key={logo.alt} className={styles.logoCard}>
              <img src={logo.src} alt={logo.alt} loading="lazy" />
            </div>
          ))}
        </div>

        <h2 className={`${styles.title} ${styles.titleSpacing}`}>
          {partnersTitle}
        </h2>

        <div className={styles.logosRow}>
          {partners.map((logo) => (
            <div key={logo.alt} className={styles.logoCard}>
              <img src={logo.src} alt={logo.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
