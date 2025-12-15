// server/schemas/registrationSchemas.js
import { z } from "zod";

// helpers
const nonEmpty = z.string().trim().min(1, "Required");

const timeHHMM = z
  .string()
  .trim()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid time (HH:MM)");

// <input type="date"> normalmente envia YYYY-MM-DD
// mas aceitamos também DD/MM/YYYY (se mudares o input no futuro)
const dateSchema = z
  .string()
  .trim()
  .refine(
    (v) => /^\d{4}-\d{2}-\d{2}$/.test(v) || /^\d{2}\/\d{2}\/\d{4}$/.test(v),
    "Invalid date (YYYY-MM-DD or DD/MM/YYYY)"
  );

// aceita +, espaços e dígitos; exige pelo menos 7 dígitos no total
const phoneSchema = z
  .string()
  .trim()
  .min(7, "Phone too short")
  .refine((v) => (v.match(/\d/g) || []).length >= 7, "Invalid phone");

const emailOptional = z
  .string()
  .trim()
  .optional()
  .or(z.literal("").transform(() => undefined))
  .refine((v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Invalid email");

// valores reais do teu content (options.value)
const transportSchema = z.enum(["airplane", "car"]);

export const competitionRegistrationSchema = z
  .object({
    // Delegation Info
    federationClub: nonEmpty,
    country: nonEmpty,

    // Transport Info
    transport: transportSchema,

    // deixo opcionais e valido no superRefine (assim "car" não precisa disto)
    flightNrArrival: z.string().trim().optional().default(""),
    flightNrDeparture: z.string().trim().optional().default(""),

    arrivalTime: timeHHMM,
    departureTime: timeHHMM,
    dayOfArrival: dateSchema,
    dayOfDeparture: dateSchema,

    // Personal contacts (nomes reais)
    contactName: nonEmpty,
    phoneNumber: phoneSchema,
    email: emailOptional,
  })
  .superRefine((data, ctx) => {
    // Só exige flight numbers se for airplane
    if (data.transport === "airplane") {
      if (!data.flightNrArrival?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["flightNrArrival"],
          message: "Required",
        });
      }
      if (!data.flightNrDeparture?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["flightNrDeparture"],
          message: "Required",
        });
      }
    }
  })
  // aceita e mantém campos extra, caso o modal ganhe mais fields
  .catchall(z.any());
