import styles from "../RegistrationFormModal.module.css";
import { SectionFields } from "./SectionFields.jsx";

export function RegistrationForm({
  sections,
  values,
  errors,
  serverError,
  isSubmitting,
  isFormValid,
  setField,
  onClose,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {serverError ? (
        <p className={styles.serverError} role="alert">
          {serverError}
        </p>
      ) : null}

      {sections.map((section) => (
        <SectionFields
          key={section.title}
          section={section}
          values={values}
          errors={errors}
          setField={setField}
          disabled={isSubmitting}
        />
      ))}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={styles.primaryBtn}
          disabled={!isFormValid || isSubmitting}
          aria-disabled={!isFormValid || isSubmitting}
          title={
            !isFormValid
              ? "Preenche todos os campos obrigatórios"
              : isSubmitting
                ? "A enviar..."
                : "Submit"
          }
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
