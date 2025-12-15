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

function buildRow(reg) {
  const d = reg.data || {};
  const extras = { ...d };

  const pick = (key) => {
    const v = d[key];
    delete extras[key];
    return (v ?? "").toString();
  };

  const transport = pick("transport");

  // colunas principais (legível no Sheets)
  const row = [
    reg.id,
    reg.submittedAt,
    reg.form,

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

  // não perder dados se aparecerem fields novos no futuro
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
