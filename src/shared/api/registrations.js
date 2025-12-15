// src/shared/api/registrations.js

const RAW_BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:4000")
  .toString()
  .trim();

// remove barras finais
const BASE = RAW_BASE.replace(/\/+$/, "");

// garante que fica com /api (quer venhas com ou sem /api no env)
const API_ROOT = BASE.endsWith("/api") ? BASE : `${BASE}/api`;

export async function submitCompetitionRegistration(values) {
  let res;

  try {
    res = await fetch(`${API_ROOT}/registrations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
  } catch {
    throw new Error(
      "Servidor indisponível (não foi possível ligar ao backend)."
    );
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = data?.error || "Failed to submit";
    const details = data?.details || null;
    const err = new Error(message);
    err.details = details;
    throw err;
  }

  return data; // { success: true, id }
}
