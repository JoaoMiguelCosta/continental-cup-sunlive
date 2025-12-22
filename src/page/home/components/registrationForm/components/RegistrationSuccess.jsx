import styles from "../RegistrationFormModal.module.css";

export function RegistrationSuccess({ onClose }) {
  return (
    <div className={styles.success}>
      <p className={styles.successTitle}>✅ Submitted</p>
      <p className={styles.successText}>
        Your registration was submitted successfully.
      </p>

      <div className={styles.actions}>
        <button type="button" className={styles.primaryBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
