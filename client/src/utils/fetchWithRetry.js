export async function fetchWithRetry(url, options, retries = 3, backoff = 300) {
  let lastError;
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      return response; // Return response object to handle it later
    } catch (error) {
      lastError = error;
      if (i < retries - 1) await new Promise((res) => setTimeout(res, backoff));
    }
  }
  throw lastError; // Throw last error occurred after all retries
}
