export function validateForm(sections, values) {
  const errors = {};

  for (const s of sections) {
    for (const f of s.fields) {
      const v = (values[f.name] ?? "").toString().trim();

      if (f.required && !v) errors[f.name] = "Required";

      if (f.type === "email" && v) {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        if (!ok) errors[f.name] = "Invalid email";
      }
    }
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
}
