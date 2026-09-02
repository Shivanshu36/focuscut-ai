import { createFileRoute } from "@tanstack/react-router";
import { APP_NAME } from "@/config/app";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service – SnapCut AI" },
      {
        name: "description",
        content:
          "The terms that apply when you use SnapCut AI, including credits, acceptable use and refunds.",
      },
      { property: "og:title", content: "Terms of Service – SnapCut AI" },
      { property: "og:description", content: "Terms covering SnapCut AI accounts and credits." },
    ],
  }),
  component: TermsPage,
});

const SECTIONS = [
  {
    title: "Using the service",
    body: "You must be able to form a binding contract to use SnapCut AI. You are responsible for activity that happens under your account.",
  },
  {
    title: "Credits and billing",
    body: "One background removal consumes one credit. Plan credits refresh each billing period; purchased credit packs do not expire. Subscriptions renew until cancelled. We do not store your card, bank or UPI credentials.",
  },
  {
    title: "Acceptable use",
    body: "Do not upload content that is unlawful, infringing, or that you do not have the rights to process. We may suspend accounts that abuse the service or attempt to bypass credit limits.",
  },
  {
    title: "Your content",
    body: "You keep all rights to the images you upload and to the results produced. We only process them to deliver the service.",
  },
  {
    title: "Availability and liability",
    body: "The service is provided on an as-is basis. We work to keep processing fast and reliable but cannot guarantee uninterrupted availability, and our liability is limited to the amount you paid in the last billing period.",
  },
  {
    title: "Refunds",
    body: "Refund eligibility and cancellation rules are described in our Refund and Cancellation Policy. Credits already consumed for completed processing are non-refundable except where required by applicable law.",
  },
];

function TermsPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-extrabold">Terms of Service</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        The agreement between you and {APP_NAME}. Last updated: 2026.
      </p>
      <div className="mt-10 space-y-8">
        {SECTIONS.map((s) => (
          <section key={s.title}>
            <h2 className="text-xl font-semibold">{s.title}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{s.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
