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
  body?: BodyInit | unknown;
  timeoutMs?: number;
  signal?: AbortSignal;
};

/**
 * Thin wrapper around the n8n webhook layer.
 * Every network call goes through here so timeouts, errors and the base URL
 * are handled in exactly one place.
 */
export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const target = path.startsWith("http")
    ? path
    : `${N8N_API_URL}/${path.replace(/^\//, "")}`;
  if (!isBackendConfigured() && !path.startsWith("http")) {
    throw new ApiError("Backend is not configured. Set VITE_N8N_API_URL to enable this feature.");
  }

  const { method = "POST", body, timeoutMs = 60_000, signal } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  signal?.addEventListener("abort", () => controller.abort());

    const isBinary = body instanceof Blob;

  try {
    const init: RequestInit = { method, signal: controller.signal };
    if (body !== undefined) {
      init.body = isBinary || body instanceof FormData ? body : JSON.stringify(body);
      if (!isBinary && !(body instanceof FormData)) {
        init.headers = { "Content-Type": "application/json" };
      } else if (isBinary) {
        init.headers = { "Content-Type": (body as Blob).type || "application/octet-stream" };
      }
    }

    const response = await fetch(target, init);

    if (!response.ok) {
      throw new ApiError(`Request failed (${response.status}).`, response.status);
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.startsWith("image/")) return (await response.blob()) as T;
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
