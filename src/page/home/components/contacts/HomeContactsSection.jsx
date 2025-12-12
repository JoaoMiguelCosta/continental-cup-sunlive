// src/pages/home/components/contacts/HomeContactsSection.jsx
import { homeContent } from "../../../../config/content/home.content.js";
import styles from "./HomeContactsSection.module.css";

export function HomeContactsSection() {
  const { id, address, eventManager, links, gdpr, map } =
    homeContent.contactsSection;

  const handleInternalScroll = (targetId) => (e) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id={id} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Left */}
          <div className={styles.colLeft}>
            <div className={styles.block}>
              <h3 className={styles.heading}>{address.title}</h3>
              {address.lines.map((line) => (
                <p key={line} className={styles.textLine}>
                  {line}
                </p>
              ))}
            </div>

            <div className={styles.block}>
              <h3 className={styles.heading}>{eventManager.title}</h3>
              <p className={styles.textLine}>{eventManager.name}</p>
              <p className={styles.textLine}>
                {eventManager.phoneLabel} {eventManager.phoneValue}
              </p>
              <p className={styles.textLine}>
                {eventManager.emailLabel} {eventManager.emailValue}
              </p>
            </div>

            <a
              className={styles.gdprLink}
              href={gdpr.href}
              target="_blank"
              rel="noreferrer"
            >
              {gdpr.label}
            </a>
          </div>

          {/* Middle */}
          <div className={styles.colMid}>
            <h3 className={styles.heading}>{links.title}</h3>

            <ul className={styles.linksList}>
              {links.items.map((item) => (
                <li key={item.label} className={styles.linkItem}>
                  {item.type === "internal" ? (
                    <a
                      href={`#${item.targetId}`}
                      className={styles.link}
                      onClick={handleInternalScroll(item.targetId)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <a
                      href={item.href}
                      className={styles.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className={styles.colRight}>
            <div className={styles.mapFrame}>
              <iframe
                title={map.title}
                src={map.src}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
