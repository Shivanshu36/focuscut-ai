type RazorpayConfig = {
  keyId: string;
  keySecret: string;
};

type RuntimeEnv = Record<string, string | undefined>;

type RuntimeGlobals = {
  process?: { env?: RuntimeEnv };
  __APP_ENV__?: RuntimeEnv;
  __env__?: RuntimeEnv;
};

export function resolveRuntimeEnvValue(name: string): string | undefined {
  const globalWithEnv = globalThis as typeof globalThis & RuntimeGlobals;
  const candidates: Array<RuntimeEnv | undefined> = [
    globalWithEnv.process?.env,
    globalWithEnv.__APP_ENV__,
    globalWithEnv.__env__,
    typeof import.meta !== "undefined" ? ((import.meta as { env?: RuntimeEnv }).env ?? undefined) : undefined,
  ];

  for (const candidate of candidates) {
    const value = candidate?.[name];
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
  }

  return undefined;
}

function getRazorpayConfig(): RazorpayConfig {
  const keyId = resolveRuntimeEnvValue("RAZORPAY_KEY_ID") ?? resolveRuntimeEnvValue("VITE_RAZORPAY_KEY_ID");
  const keySecret = resolveRuntimeEnvValue("RAZORPAY_KEY_SECRET");

  if (!keyId || !keySecret) {
    throw new Error("Razorpay server credentials are not configured.");
  }

  return { keyId, keySecret };
}

function authorizationHeader(config: RazorpayConfig): string {
  return `Basic ${btoa(`${config.keyId}:${config.keySecret}`)}`;
}

export async function createRazorpayOrder(input: {
  amount: number;
  currency: string;
  receipt: string;
}) {
  const config = getRazorpayConfig();
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: authorizationHeader(config),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (response.status === 401) {
    throw new RazorpayHttpError("Razorpay authentication failed.", 401);
  }
  if (!response.ok) {
    throw new RazorpayHttpError("Razorpay could not create the order.", 500);
  }

  const order = (await response.json()) as {
    id?: string;
    amount?: number;
    currency?: string;
  };
  if (!order.id || order.amount === undefined || !order.currency) {
    throw new RazorpayHttpError("Razorpay returned an invalid order.", 500);
  }

  return { order_id: order.id, amount: order.amount, currency: order.currency };
}

export async function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string) {
  const { keySecret } = getRazorpayConfig();
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(keySecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const digest = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${orderId}|${paymentId}`),
  );
  const expected = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");

  if (expected.length !== signature.length) return false;
  let difference = 0;
  for (let index = 0; index < expected.length; index += 1) {
    difference |= expected.charCodeAt(index) ^ signature.charCodeAt(index);
  }
  return difference === 0;
}

export class RazorpayHttpError extends Error {
  constructor(message: string, public readonly status: 401 | 500) {
    super(message);
  }
}