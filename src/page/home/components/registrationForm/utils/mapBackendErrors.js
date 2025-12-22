export function mapBackendDetailsToErrors(details) {
  if (!Array.isArray(details)) return {};
  const next = {};
  for (const d of details) {
    if (!d?.field) continue;
    next[d.field] = d.message || "Invalid";
  }
  return next;
}
