import { apiRequest } from "@/api/client";
import { REMOVE_BACKGROUND_WEBHOOK_URL } from "@/config/app";

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

async function normalize(payload: WebhookResponse | string | Blob): Promise<string | null> {
  if (payload instanceof Blob) {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : null);
      reader.onerror = () => reject(new Error("The AI service returned an unreadable image."));
      reader.readAsDataURL(payload);
    });
  }
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
  const payload = await apiRequest<WebhookResponse | string | Blob>(REMOVE_BACKGROUND_WEBHOOK_URL, {
    body: file,
    timeoutMs: 90_000,
    ...(options.signal ? { signal: options.signal } : {}),
  });

  const imageUrl = await normalize(payload);
  if (!imageUrl) throw new Error("The AI service returned an unexpected response.");
  return { imageUrl, provider: "n8n" };
}
