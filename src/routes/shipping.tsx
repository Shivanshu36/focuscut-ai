import { createFileRoute } from "@tanstack/react-router";
import { APP_NAME } from "@/config/app";

export const Route = createFileRoute("/shipping")({
  head: () => ({ meta: [{ title: "Shipping and Delivery Policy – SnapCut AI" }] }),
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-extrabold">Shipping and Delivery Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">How {APP_NAME} delivers its digital service. Last updated: 2026.</p>
      <div className="mt-10 space-y-8">
        <section><h2 className="text-xl font-semibold">Digital delivery</h2><p className="mt-2 leading-relaxed text-muted-foreground">SnapCut AI is an online, digital-only service. We do not sell or ship physical goods, and no shipping address or delivery fee is collected.</p></section>
        <section><h2 className="text-xl font-semibold">Result delivery</h2><p className="mt-2 leading-relaxed text-muted-foreground">After a successful background-removal request, the processed image is delivered in your browser through a secure result link. Most results are available within a few seconds, though processing time can vary with image size and provider availability.</p></section>
        <section><h2 className="text-xl font-semibold">Payment and credit delivery</h2><p className="mt-2 leading-relaxed text-muted-foreground">After a payment is confirmed, purchased credits or plan benefits are added to your SnapCut AI account. If they do not appear, contact support@snapcut.ai with your payment ID.</p></section>
        <section><h2 className="text-xl font-semibold">Delivery issues</h2><p className="mt-2 leading-relaxed text-muted-foreground">For interrupted processing, an unavailable result or missing credits, contact support@snapcut.ai. We will investigate and provide the result, restore the credit, or process an eligible refund.</p></section>
      </div>
    </article>
  );
}