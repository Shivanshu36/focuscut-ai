import { createFileRoute } from "@tanstack/react-router";
import { verifyRazorpaySignature } from "@/api/razorpay-server";

export const Route = createFileRoute("/api/verify-payment")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            razorpay_order_id?: unknown;
            razorpay_payment_id?: unknown;
            razorpay_signature?: unknown;
          };
          const orderId = body.razorpay_order_id;
          const paymentId = body.razorpay_payment_id;
          const signature = body.razorpay_signature;

          if (typeof orderId !== "string" || typeof paymentId !== "string" || typeof signature !== "string") {
            return Response.json({ success: false, error: "Missing payment verification fields." }, { status: 400 });
          }

          const verified = await verifyRazorpaySignature(orderId, paymentId, signature);
          if (!verified) {
            return Response.json({ success: false, error: "Payment signature mismatch." }, { status: 400 });
          }

          return Response.json({ success: true });
        } catch (error) {
          console.error(error);
          return Response.json({ success: false, error: "Unable to verify the payment." }, { status: 500 });
        }
      },
    }
  },
});