// server/routes/index.js
import { Router } from "express";
import { router as registrationRouter } from "./registration.routes.js";

export const router = Router();

router.use("/registrations", registrationRouter);
