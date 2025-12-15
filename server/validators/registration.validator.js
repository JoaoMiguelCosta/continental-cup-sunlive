import { competitionRegistrationSchema } from "../schemas/registrationSchemas.js";

export function validateCompetitionRegistrationBody(body) {
  return competitionRegistrationSchema.safeParse(body);
}
