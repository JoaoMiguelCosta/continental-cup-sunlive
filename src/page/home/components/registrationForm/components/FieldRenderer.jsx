import styles from "../RegistrationFormModal.module.css";

export function FieldRenderer({ field, value, error, onChange, disabled }) {
  const id = `reg-${field.name}`;

  if (field.type === "radio") {
    return (
      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label className={styles.label}>
            {field.label}{" "}
            {field.required ? <span className={styles.req}>*</span> : null}
          </label>
          {error ? <span className={styles.error}>*</span> : null}
        </div>

        <div
          className={styles.radioRow}
          role="radiogroup"
          aria-label={field.label}
        >
          {field.options?.map((opt) => (
            <label key={opt.value} className={styles.radioItem}>
              <input
                type="radio"
                name={field.name}
                value={opt.value}
                checked={value === opt.value}
                onChange={(e) => onChange(field.name, e.target.value)}
                disabled={disabled}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  // suporte opcional para textarea sem te partir config
  const isTextarea = field.type === "textarea";

  return (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <label htmlFor={id} className={styles.label}>
          {field.label}{" "}
          {field.required ? <span className={styles.req}>*</span> : null}
        </label>
        {error ? <span className={styles.error}>*</span> : null}
      </div>

      {isTextarea ? (
        <textarea
          id={id}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
          required={Boolean(field.required)}
          autoComplete="off"
          disabled={disabled}
        />
      ) : (
        <input
          id={id}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          type={field.type}
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
          required={Boolean(field.required)}
          autoComplete="off"
          disabled={disabled}
        />
      )}
    </div>
  );
}
