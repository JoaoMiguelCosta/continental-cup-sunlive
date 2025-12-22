import { useEffect, useMemo, useState } from "react";
import { buildInitialValues } from "../utils/formDefaults.js";
import { validateForm } from "../utils/formValidation.js";
import { mapBackendDetailsToErrors } from "../utils/mapBackendErrors.js";

export function useRegistrationForm({ isOpen, sections, submitFn }) {
  const initialValues = useMemo(() => {
    return buildInitialValues(sections);
  }, [sections, isOpen]);

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setValues(initialValues);
    setErrors({});
    setServerError("");
    setSubmitted(false);
    setIsSubmitting(false);
  }, [isOpen, initialValues]);

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));

    setErrors((e) => {
      if (!e[name]) return e;
      const copy = { ...e };
      delete copy[name];
      return copy;
    });

    if (serverError) setServerError("");
  };

  const validation = useMemo(() => {
    return validateForm(sections, values);
  }, [sections, values]);

  const validateAndSetErrors = () => {
    const { errors: nextErrors, isValid } = validateForm(sections, values);
    setErrors(nextErrors);
    return isValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateAndSetErrors()) return;

    try {
      setIsSubmitting(true);
      await submitFn(values);
      setSubmitted(true);
    } catch (err) {
      const fieldErrors = mapBackendDetailsToErrors(err?.details);
      if (Object.keys(fieldErrors).length) {
        setErrors((prev) => ({ ...prev, ...fieldErrors }));
      }
      setServerError(err?.message || "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    serverError,
    submitted,
    isSubmitting,
    setField,
    isFormValid: validation.isValid,
    onSubmit,
  };
}
