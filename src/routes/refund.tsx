import { createFileRoute } from "@tanstack/react-router";
import { APP_NAME } from "@/config/app";

export const Route = createFileRoute("/refund")({
  head: () => ({ meta: [{ title: "Refund and Cancellation Policy – SnapCut AI" }] }),
  component: RefundPage,
});

const SECTIONS = [
  ["Digital service", "SnapCut AI provides an immediate digital image-processing service. There is no physical product, shipping charge or delivery address required."],
  ["Credit packs", "Unused credit packs do not expire and may be refunded within 7 days of purchase when none of the purchased credits have been used. Once a credit is used for a completed background removal, that credit is non-refundable except where required by applicable law."],
  ["Subscriptions", "You may cancel a recurring plan before the next renewal through your account or by contacting support. Cancellation stops future renewals; the current billing period remains available until it ends. Refunds for a partially used period are assessed case by case."],
  ["Failed or duplicate payments", "If your payment succeeds but credits are not added, or if you believe you were charged more than once, contact support@snapcut.ai with your payment details. We will investigate and, where appropriate, issue the correction or refund through the payment processor."],
  ["How to request a refund", "Email support@snapcut.ai within the applicable period with your account email, payment ID and reason for the request. We aim to respond within one business day. Approved refunds are returned to the original payment method, subject to processor and banking timelines."],
];

function RefundPage() {
  return <PolicyPage title="Refund and Cancellation Policy" intro={`Refund rules for ${APP_NAME} digital credits and subscriptions.`} sections={SECTIONS} />;
}

function PolicyPage({ title, intro, sections }: { title: string; intro: string; sections: string[][] }) {
  return <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6"><h1 className="text-4xl font-extrabold">{title}</h1><p className="mt-3 text-sm text-muted-foreground">{intro} Last updated: 2026.</p><div className="mt-10 space-y-8">{sections.map(([heading, body]) => <section key={heading}><h2 className="text-xl font-semibold">{heading}</h2><p className="mt-2 leading-relaxed text-muted-foreground">{body}</p></section>)}</div></article>;
}