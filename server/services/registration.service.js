// server/services/registration.service.js
import { registrationFileRepository } from "./registrationFileRepository.js";
import { registrationGoogleSheetsRepository } from "./registrationGoogleSheetsRepository.js";

export const registrationService = {
  async create({ form, data }) {
    // 1) guarda sempre em ficheiro (backup local)
    const saved = await registrationFileRepository.save({ form, data });

    // 2) tenta enviar para Google Sheets (se falhar, não quebra o pedido)
    try {
      await registrationGoogleSheetsRepository.append(saved);
    } catch (err) {
      console.error("[Sheets] Failed to append registration:", err.message);
    }

    return { id: saved.id };
  },
};
