import { useEffect, useMemo, useState } from "react";
import styles from "./RegistrationFormModal.module.css";

function buildInitialValues(sections) {
  const values = {};
  for (const s of sections) {
    for (const f of s.fields) values[f.name] = "";
  }
  return values;
}

export function RegistrationFormModal({ isOpen, onClose, content }) {
  const sections = content?.sections ?? [];

  const initialValues = useMemo(() => {
    return buildInitialValues(sections);
  }, [sections, isOpen]);

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    setValues(initialValues);
    setErrors({});
    setSubmitted(false);
  }, [isOpen, initialValues]);

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));

    // limpa erro do campo ao editar
    setErrors((e) => {
      if (!e[name]) return e;
      const copy = { ...e };
      delete copy[name];
      return copy;
    });
  };

  const validate = () => {
    const nextErrors = {};

    for (const s of sections) {
      for (const f of s.fields) {
        const v = (values[f.name] ?? "").toString().trim();

        if (f.required && !v) nextErrors[f.name] = "Required";

        if (f.type === "email" && v) {
          const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          if (!ok) nextErrors[f.name] = "Invalid email";
        }
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  // ✅ Submit só ativa se o form estiver válido (em tempo real)
  const isFormValid = useMemo(() => {
    for (const s of sections) {
      for (const f of s.fields) {
        const v = (values[f.name] ?? "").toString().trim();

        if (f.required && !v) return false;

        if (f.type === "email" && v) {
          const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          if (!ok) return false;
        }
      }
    }
    return true;
  }, [sections, values]);

  if (!isOpen) return null;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

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
          >
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          {submitted ? (
            <div className={styles.success}>
              <p className={styles.successTitle}>✅ Submitted</p>
              <p className={styles.successText}>
                Your registration was captured locally. Next step: connect this
                to your backend/email.
              </p>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className={styles.form}>
              {sections.map((section) => (
                <div key={section.title} className={styles.section}>
                  <h3 className={styles.sectionTitle}>{section.title}</h3>

                  <div className={styles.fields}>
                    {section.fields.map((f) => {
                      const id = `reg-${f.name}`;
                      const err = errors[f.name];

                      if (f.type === "radio") {
                        return (
                          <div key={f.name} className={styles.field}>
                            <div className={styles.labelRow}>
                              <label className={styles.label}>
                                {f.label}{" "}
                                {f.required ? (
                                  <span className={styles.req}>*</span>
                                ) : null}
                              </label>

                              {err ? (
                                <span className={styles.error}>*</span>
                              ) : null}
                            </div>

                            <div
                              className={styles.radioRow}
                              role="radiogroup"
                              aria-label={f.label}
                            >
                              {f.options?.map((opt) => (
                                <label
                                  key={opt.value}
                                  className={styles.radioItem}
                                >
                                  <input
                                    type="radio"
                                    name={f.name}
                                    value={opt.value}
                                    checked={values[f.name] === opt.value}
                                    onChange={(e) =>
                                      setField(f.name, e.target.value)
                                    }
                                  />
                                  <span>{opt.label}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={f.name} className={styles.field}>
                          <div className={styles.labelRow}>
                            <label htmlFor={id} className={styles.label}>
                              {f.label}{" "}
                              {f.required ? (
                                <span className={styles.req}>*</span>
                              ) : null}
                            </label>

                            {err ? (
                              <span className={styles.error}>*</span>
                            ) : null}
                          </div>

                          <input
                            id={id}
                            className={`${styles.input} ${
                              err ? styles.inputError : ""
                            }`}
                            type={f.type}
                            value={values[f.name]}
                            onChange={(e) => setField(f.name, e.target.value)}
                            required={Boolean(f.required)}
                            autoComplete="off"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.secondaryBtn}
                  onClick={onClose}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={styles.primaryBtn}
                  disabled={!isFormValid}
                  aria-disabled={!isFormValid}
                  title={
                    !isFormValid
                      ? "Preenche todos os campos obrigatórios"
                      : "Submit"
                  }
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
