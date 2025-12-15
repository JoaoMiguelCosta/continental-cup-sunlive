// server/controllers/registration.controller.js
import { registrationService } from "../services/registration.service.js";

export async function createRegistration(req, res, next) {
  try {
    const data = req.validatedBody; // vem validado do middleware

    const result = await registrationService.create({
      form: "competition",
      data,
    });

    return res.status(201).json({ success: true, id: result.id });
  } catch (err) {
    return next(err);
  }
}
