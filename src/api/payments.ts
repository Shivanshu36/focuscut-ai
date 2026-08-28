import { apiRequest, isBackendConfigured } from "@/api/client";
import { RAZORPAY_KEY_ID, APP_NAME } from "@/config/app";

type RazorpayOrder = {
  orderId: string;
  amount: number;
  currency: string;
  keyId?: string;
};

type CheckoutArgs = {
  itemId: string;
  itemType: "plan" | "credits";
  amount: number;
  userName?: string;
  userEmail?: string;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/** Order creation and verification always happen server-side (n8n). */
export const createOrder = (args: CheckoutArgs) =>
  apiRequest<RazorpayOrder>("payments/create-order", { body: args });

export const verifyPayment = (payload: Record<string, unknown>) =>
  apiRequest<{ success: boolean; credits?: number; plan?: string }>("payments/verify", {
    body: payload,
  });

/**
 * Opens Razorpay Checkout. Secrets never touch the browser: only the
 * publishable key id is used here, verification is done by the backend.
 */
export async function startCheckout(args: CheckoutArgs) {
  if (!isBackendConfigured()) {
    throw new Error("Payments are not connected yet. Configure VITE_N8N_API_URL to enable them.");
  }

  const order = await createOrder(args);
  const ready = await loadRazorpayScript();
  if (!ready) throw new Error("Could not load Razorpay Checkout. Please retry.");

  return new Promise<{ success: boolean; credits?: number; plan?: string }>((resolve, reject) => {
    const rzp = new window.Razorpay!({
      key: order.keyId ?? RAZORPAY_KEY_ID,
      order_id: order.orderId,
      amount: order.amount,
      currency: order.currency ?? "INR",
      name: APP_NAME,
      description: args.itemType === "plan" ? `${args.itemId} plan` : `${args.itemId} credit pack`,
      prefill: { name: args.userName ?? "", email: args.userEmail ?? "" },
      theme: { color: "#6C2CF4" },
      handler: (response: Record<string, unknown>) => {
        verifyPayment({ ...response, itemId: args.itemId, itemType: args.itemType })
          .then(resolve)
          .catch(reject);
      },
      modal: {
        ondismiss: () => reject(new Error("Payment cancelled.")),
      },
    });
    rzp.open();
  });
}
