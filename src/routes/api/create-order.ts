import { createFileRoute } from "@tanstack/react-router";
import { createRazorpayOrder, RazorpayHttpError } from "@/api/razorpay-server";

export const Route = createFileRoute("/api/create-order")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            amount?: unknown;
            currency?: unknown;
            receipt?: unknown;
          };
          const amount = Number(body.amount);
          const currency = typeof body.currency === "string" ? body.currency.toUpperCase() : "INR";
          const receipt = typeof body.receipt === "string" ? body.receipt.slice(0, 40) : `receipt_${Date.now()}`;

          if (!Number.isInteger(amount) || amount < 100) {
            return Response.json({ error: "Amount must be at least 100 paise." }, { status: 400 });
          }
          if (!/^[A-Z]{3}$/.test(currency)) {
            return Response.json({ error: "Currency must be a valid three-letter code." }, { status: 400 });
          }

          return Response.json(await createRazorpayOrder({ amount, currency, receipt }));
        } catch (error) {
          if (error instanceof RazorpayHttpError) {
            return Response.json({ error: error.message }, { status: error.status });
          }
          console.error(error);
          return Response.json({ error: "Unable to create the payment order." }, { status: 500 });
        }
      },
    }
  },
});