import { apiRequest, isBackendConfigured } from "@/api/client";
import { localBackgroundRemoval } from "@/utils/image";

export type RemovalResult = {
  /** PNG with transparent background (URL or data URL). */
  imageUrl: string;
  /** Which engine produced the result. */
  provider: "n8n" | "local";
};

type WebhookResponse = {
  imageUrl?: string;
  url?: string;
  image?: string;
  base64?: string;
};

function normalize(payload: WebhookResponse | string): string | null {
  if (typeof payload === "string") {
    return payload.startsWith("http") || payload.startsWith("data:") ? payload : null;
  }
  const value = payload.imageUrl ?? payload.url ?? payload.image ?? payload.base64;
  if (!value) return null;
  if (value.startsWith("http") || value.startsWith("data:")) return value;
  return `data:image/png;base64,${value}`;
}

/**
 * Sends the image to the n8n webhook, which calls the configured AI provider.
 * The provider can be swapped inside n8n without touching the frontend.
 */
export async function removeBackground(
  file: File,
  options: { signal?: AbortSignal } = {},
): Promise<RemovalResult> {
  if (!isBackendConfigured()) {
    return { imageUrl: await localBackgroundRemoval(file), provider: "local" };
  }

  const form = new FormData();
  form.append("image", file, file.name);

  const payload = await apiRequest<WebhookResponse | string>("remove-background", {
    body: form,
    timeoutMs: 90_000,
    ...(options.signal ? { signal: options.signal } : {}),
  });

  const imageUrl = normalize(payload);
  if (!imageUrl) throw new Error("The AI service returned an unexpected response.");
  return { imageUrl, provider: "n8n" };
}
