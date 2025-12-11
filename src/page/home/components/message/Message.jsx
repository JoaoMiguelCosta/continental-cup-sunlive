// src/page/home/components/message/Message.jsx

import { homeContent } from "../../../../config/content/home.content.js";
import styles from "./Message.module.css";

export function MessageSection() {
  const { messageSection } = homeContent;
  const { paragraphs, author, id } = messageSection;

  return (
    <section id={id} className={styles.section} aria-label="Message from CEO">
      <div className={styles.card}>
        {paragraphs.map((text, index) => (
          <p key={index} className={styles.paragraph}>
            {text}
          </p>
        ))}
      </div>

      <div className={styles.authorBlock}>
        <div className={styles.avatarRing}>
          <div className={styles.avatarInner}>
            <img src={author.photo.src} alt={author.photo.alt} />
          </div>
        </div>

        <p className={styles.authorName}>{author.name}</p>
        <p className={styles.authorRole}>{author.role}</p>
      </div>
    </section>
  );
}
