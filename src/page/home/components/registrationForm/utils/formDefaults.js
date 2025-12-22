export function buildInitialValues(sections) {
  const values = {};
  for (const s of sections) {
    for (const f of s.fields) values[f.name] = "";
  }
  return values;
}
