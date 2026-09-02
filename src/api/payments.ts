type RazorpayOrder = {
  order_id: string;
  amount: number;
  currency: string;
};

type RazorpaySuccess = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

async function readResponse<T>(response: Response): Promise<T> {
  const body = (await response.json()) as { error?: string } & T;
  if (!response.ok) throw new Error(body.error ?? "Payment request failed.");
  return body;
}

export async function startCheckout(args: {
  amount: number;
  itemId: string;
  userName?: string;
  userEmail?: string;
  onSuccess: (result: RazorpaySuccess) => void;
}) {
  const orderResponse = await fetch("/api/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: Math.round(args.amount * 100), currency: "INR", receipt: args.itemId }),
  });
  const order = await readResponse<RazorpayOrder>(orderResponse);
  if (!(await loadRazorpayScript())) throw new Error("Could not load the payment checkout.");

  return new Promise<void>((resolve, reject) => {
    const checkout = new window.Razorpay!({
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      order_id: order.order_id,
      amount: order.amount,
      currency: order.currency,
      name: "SnapCut AI",
      description: args.itemId,
      prefill: { name: args.userName ?? "", email: args.userEmail ?? "" },
      handler: async (result: RazorpaySuccess) => {
        try {
          const verificationResponse = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result),
          });
          await readResponse<{ success: boolean }>(verificationResponse);
          args.onSuccess(result);
          resolve();
        } catch (error) {
          reject(error);
        }
      },
      modal: { ondismiss: () => reject(new Error("Payment cancelled.")) },
    });
    checkout.open();
  });
}