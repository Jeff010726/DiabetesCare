const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "https://api.xtdiabetescare.com";

type ApiOptions = {
  method?: string;
  body?: unknown;
};

export async function apiRequest<T>(path: string, options: ApiOptions = {}) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: options.method || "GET",
    credentials: "include",
    headers: options.body ? { "Content-Type": "application/json" } : undefined,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
}
