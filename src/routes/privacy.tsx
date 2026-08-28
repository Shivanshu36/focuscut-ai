import { createFileRoute } from "@tanstack/react-router";
import { APP_NAME } from "@/config/app";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy – SnapCut AI" },
      {
        name: "description",
        content:
          "How SnapCut AI collects, processes and stores uploaded images and account information.",
      },
      { property: "og:title", content: "Privacy Policy – SnapCut AI" },
      { property: "og:description", content: "Our approach to your data and uploaded images." },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  {
    title: "Information we collect",
    body: "We collect the account details you provide (name and email) and the images you upload for processing. We do not collect payment card details; payments are handled by our payment provider.",
  },
  {
    title: "How we use your images",
    body: "Uploaded images are used solely to generate your background-removed result. They are not sold, shared with advertisers, or used to train third-party models.",
  },
  {
    title: "Storage and retention",
    body: "Processed files are held in temporary storage only as long as needed to deliver your download, then removed automatically. Account data is retained while your account is active.",
  },
  {
    title: "Cookies and local storage",
    body: "We use browser storage to keep you signed in and remember your credits and recent activity on this device. No advertising cookies are used.",
  },
  {
    title: "Your rights",
    body: "You may request access to, correction of, or deletion of your account data at any time by contacting support.",
  },
  {
    title: "Contact",
    body: "For privacy questions, email support@snapcut.ai and we will respond within one business day.",
  },
];

function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-extrabold">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        How {APP_NAME} handles your data. Last updated: 2026.
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
