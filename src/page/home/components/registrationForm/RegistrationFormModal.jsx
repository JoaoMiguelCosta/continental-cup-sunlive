import styles from "./RegistrationFormModal.module.css";
import { submitCompetitionRegistration } from "../../../../shared/api/registrations.js";

import { useEscapeToClose } from "./hooks/useEscapeToClose.js";
import { useLockBodyScroll } from "./hooks/useLockBodyScroll.js";
import { useRegistrationForm } from "./hooks/useRegistrationForm.js";

import { RegistrationForm } from "./components/RegistrationForm.jsx";
import { RegistrationSuccess } from "./components/RegistrationSuccess.jsx";

export function RegistrationFormModal({ isOpen, onClose, content }) {
  const sections = content?.sections ?? [];

  const {
    values,
    errors,
    serverError,
    submitted,
    isSubmitting,
    setField,
    isFormValid,
    onSubmit,
  } = useRegistrationForm({
    isOpen,
    sections,
    submitFn: submitCompetitionRegistration,
  });

  useEscapeToClose(isOpen, onClose, isSubmitting);
  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  const onBackdropMouseDown = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div className={styles.overlay} onMouseDown={onBackdropMouseDown}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <div className={styles.modalHeader}>
          <div className={styles.titles}>
            <h2 className={styles.title}>{content?.title}</h2>
            <p className={styles.subtitle}>{content?.subtitle}</p>
          </div>

          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close form"
            title="Close"
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          {submitted ? (
            <RegistrationSuccess onClose={onClose} />
          ) : (
            <RegistrationForm
              sections={sections}
              values={values}
              errors={errors}
              serverError={serverError}
              isSubmitting={isSubmitting}
              isFormValid={isFormValid}
              setField={setField}
              onClose={onClose}
              onSubmit={onSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}
