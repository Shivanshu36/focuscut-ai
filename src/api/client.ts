import { N8N_API_URL } from "@/config/app";

export class ApiError extends Error {
  status: number | undefined;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const isBackendConfigured = () => Boolean(N8N_API_URL);

type RequestOptions = {
  method?: string;
  body?: unknown;
  timeoutMs?: number;
  signal?: AbortSignal;
};

/**
 * Thin wrapper around the n8n webhook layer.
 * Every network call goes through here so timeouts, errors and the base URL
 * are handled in exactly one place.
 */
export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (!isBackendConfigured()) {
    throw new ApiError("Backend is not configured. Set VITE_N8N_API_URL to enable this feature.");
  }

  const { method = "POST", body, timeoutMs = 60_000, signal } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  signal?.addEventListener("abort", () => controller.abort());

  const isForm = body instanceof FormData;

  try {
    const init: RequestInit = { method, signal: controller.signal };
    if (body !== undefined) {
      init.body = isForm ? (body as FormData) : JSON.stringify(body);
      if (!isForm) init.headers = { "Content-Type": "application/json" };
    }

    const response = await fetch(`${N8N_API_URL}/${path.replace(/^\//, "")}`, init);

    if (!response.ok) {
      throw new ApiError(`Request failed (${response.status}).`, response.status);
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) return (await response.json()) as T;
    return (await response.text()) as unknown as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if ((error as Error).name === "AbortError") {
      throw new ApiError("The request timed out. Please try again.");
    }
    throw new ApiError("Network error. Check your connection and try again.");
  } finally {
    clearTimeout(timer);
  }
}
