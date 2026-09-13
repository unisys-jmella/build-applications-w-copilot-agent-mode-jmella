export function getApiUrl(component) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const safeName = typeof codespaceName === 'string' ? codespaceName.trim() : '';

  if (safeName) {
    return `https://${safeName}-8000.app.github.dev/api/${component}/`;
  }

  return `http://localhost:8000/api/${component}/`;
}

export function normalizeRecords(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && Array.isArray(payload.records)) {
    return payload.records;
  }

  return [];
}
