export function getParamFromUrl(url, paramName) {
    const queryString = new URL(url).search;
    if (!queryString) return null;
  
    const params = new URLSearchParams(queryString); // Parse query string
    return params.get(paramName);
}