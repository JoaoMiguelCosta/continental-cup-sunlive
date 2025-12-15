// server/services/registrationGoogleSheetsRepository.js
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
let googleAuth;

function getAuth() {
  if (googleAuth) return googleAuth;

  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  let privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    console.warn("[Sheets] Missing GOOGLE_SHEETS_CLIENT_EMAIL or PRIVATE_KEY");
    return null;
  }

  privateKey = privateKey.replace(/\\n/g, "\n");

  googleAuth = new google.auth.GoogleAuth({
    credentials: { client_email: clientEmail, private_key: privateKey },
    scopes: SCOPES,
  });

  return googleAuth;
}

function humanTransport(value) {
  if (value === "airplane") return "Airplane";
  if (value === "car") return "Car";
  return value || "";
}

// ✅ DD-MM-YYYY HH:mm (Europe/Lisbon)
function formatSubmittedAt(isoString) {
  const d = new Date(isoString);

  const parts = new Intl.DateTimeFormat("pt-PT", {
    timeZone: "Europe/Lisbon",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(d);

  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return `${map.day}-${map.month}-${map.year} ${map.hour}:${map.minute}`;
}

function buildRow(reg) {
  const d = reg.data || {};
  const extras = { ...d };

  const pick = (key) => {
    const v = d[key];
    delete extras[key];
    return (v ?? "").toString();
  };

  const transport = pick("transport");

  // ✅ já NÃO envia: reg.id, reg.submittedAt (ISO)
  // ✅ envia 1ª coluna: data/hora formatada
  const row = [
    formatSubmittedAt(reg.submittedAt),
    "27th – 29th November",

    pick("federationClub"),
    pick("country"),

    humanTransport(transport),
    pick("flightNrArrival"),
    pick("flightNrDeparture"),
    pick("arrivalTime"),
    pick("departureTime"),
    pick("dayOfArrival"),
    pick("dayOfDeparture"),

    pick("contactName"),
    pick("phoneNumber"),
    pick("email"),
  ];

  row.push(Object.keys(extras).length ? JSON.stringify(extras) : "");
  return row;
}

export const registrationGoogleSheetsRepository = {
  async append(registration) {
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    if (!spreadsheetId) {
      console.warn("[Sheets] GOOGLE_SHEETS_ID not set – skipping write");
      return;
    }

    const auth = getAuth();
    if (!auth) return;

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const range = process.env.GOOGLE_SHEETS_RANGE || "Registrations!A:Z";

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [buildRow(registration)] },
    });

    console.log("[Sheets] Registration appended");
  },
};
