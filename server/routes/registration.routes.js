// server/routes/registration.routes.js
import { Router } from "express";
import { createRegistration } from "../controllers/registration.controller.js";
import { validateCompetitionRegistration } from "../middlewares/validateRequest.js";

export const router = Router();

/**
 * POST /api/registrations
 * (form único do Continental Cup: competition registration)
 */
router.post("/", validateCompetitionRegistration, createRegistration);
