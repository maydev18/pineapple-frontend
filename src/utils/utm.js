export function getUTMParams() {
  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"),
  };
}

export function saveUTMParams() {
  const utms = getUTMParams();

  // Only save if UTM exists
  if (Object.values(utms).some(v => v)) {
    localStorage.setItem("utm_data", JSON.stringify(utms));
  }
}

export function getSavedUTM() {
  const data = localStorage.getItem("utm_data");
  return data ? JSON.parse(data) : {};
}
