// server/services/registrationFileRepository.js
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "..", "data");
const REGISTRATIONS_FILE = path.join(DATA_DIR, "registrations.json");

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(REGISTRATIONS_FILE);
  } catch {
    await fs.writeFile(REGISTRATIONS_FILE, "[]", "utf8");
  }
}

async function readAll() {
  await ensureFile();
  const raw = await fs.readFile(REGISTRATIONS_FILE, "utf8");

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeAll(items) {
  await ensureFile();
  await fs.writeFile(
    REGISTRATIONS_FILE,
    JSON.stringify(items, null, 2),
    "utf8"
  );
}

export const registrationFileRepository = {
  async save({ form, data }) {
    const record = {
      id: `${form}-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      form,
      data,
    };

    const all = await readAll();
    all.push(record);
    await writeAll(all);

    return record;
  },

  async getAll() {
    return readAll();
  },
};
