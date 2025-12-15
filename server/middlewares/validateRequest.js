import { validateCompetitionRegistrationBody } from "../validators/registration.validator.js";

export function validateCompetitionRegistration(req, res, next) {
  const result = validateCompetitionRegistrationBody(req.body);

  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    return res.status(400).json({ error: "Validation failed", details });
  }

  req.validatedBody = result.data;
  next();
}
