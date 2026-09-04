export function extractData(response, key = null) {
  if (!response) return null;
  if (key && response[key] !== undefined) return response[key];
  if (response.data !== undefined) return response.data;
  return response;
}

export function extractList(response, key) {
  const data = extractData(response, key);
  return Array.isArray(data) ? data : [];
}
