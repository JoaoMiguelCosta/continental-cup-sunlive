import styles from "../RegistrationFormModal.module.css";
import { FieldRenderer } from "./FieldRenderer.jsx";

export function SectionFields({ section, values, errors, setField, disabled }) {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{section.title}</h3>

      <div className={styles.fields}>
        {section.fields.map((field) => (
          <FieldRenderer
            key={field.name}
            field={field}
            value={values[field.name]}
            error={errors[field.name]}
            onChange={setField}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
