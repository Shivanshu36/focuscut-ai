import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/config/app";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ – SnapCut AI" },
      {
        name: "description",
        content:
          "Answers about SnapCut AI pricing, supported formats, processing speed, credits and image privacy.",
      },
      { property: "og:title", content: "FAQ – SnapCut AI" },
      { property: "og:description", content: "Common questions about SnapCut AI answered." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-center text-4xl font-extrabold">
        Frequently asked <span className="text-gradient-brand">questions</span>
      </h1>
      <Accordion type="single" collapsible className="mt-10">
        {FAQS.map((item) => (
          <AccordionItem key={item.q} value={item.q}>
            <AccordionTrigger className="text-left text-base">{item.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-12 rounded-3xl border border-border bg-surface p-8 text-center">
        <p className="font-medium">Still have a question?</p>
        <Button asChild variant="brand" className="mt-4">
          <Link to="/contact">Contact support</Link>
        </Button>
      </div>
    </div>
  );
}
