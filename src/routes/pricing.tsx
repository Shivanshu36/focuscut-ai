import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CREDIT_PACKS, FAQS, PLANS, type Plan } from "@/config/app";
import { useAuth } from "@/context/AuthContext";
import { startCheckout } from "@/api/payments";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing – SnapCut AI" },
      {
        name: "description",
        content:
          "Simple credit based pricing for AI background removal. Start free, upgrade to Pro or Business when you need more credits.",
      },
      { property: "og:title", content: "Pricing – SnapCut AI" },
      {
        property: "og:description",
        content: "Free plan, Pro at ₹499/month and Business at ₹1499/month.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const { user, setPlan, addCredits } = useAuth();

  const buy = async (
    itemType: "plan" | "credits",
    itemId: string,
    onSuccess: () => void,
  ) => {
    try {
      const result = await startCheckout({
        itemType,
        itemId,
        userName: user?.name,
        userEmail: user?.email,
      });
      if (result.success) {
        onSuccess();
        toast.success("Payment successful");
      }
    } catch (error) {
      toast.error("Payment unavailable", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl">
          Simple, <span className="text-gradient-brand">credit based</span> pricing
        </h1>
        <p className="mt-4 text-muted-foreground">
          Every removal costs one credit. Start free and upgrade only when you need more.
        </p>
      </header>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            current={user?.plan === plan.id}
            onSelect={() =>
              plan.price === 0
                ? undefined
                : buy("plan", plan.id, () => {
                    setPlan(plan.id);
                    addCredits(plan.credits);
                  })
            }
          />
        ))}
      </div>

      <section className="mt-20">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">Need a one-off top-up?</h2>
        <p className="mt-3 text-center text-muted-foreground">
          Credit packs never expire and stack on top of your plan.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {CREDIT_PACKS.map((pack) => (
            <div
              key={pack.id}
              className="rounded-3xl border border-border bg-card p-6 text-center"
            >
              <p className="text-3xl font-bold">{pack.credits}</p>
              <p className="mt-1 text-sm text-muted-foreground">credits</p>
              <p className="mt-4 text-xl font-semibold">
                {pack.currency}
                {pack.price}
              </p>
              <Button
                variant="brandOutline"
                className="mt-5 w-full"
                onClick={() => buy("credits", pack.id, () => addCredits(pack.credits))}
              >
                Buy credits
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-3xl">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">Pricing FAQ</h2>
        <Accordion type="single" collapsible className="mt-8">
          {FAQS.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger className="text-left text-base">{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}

function PlanCard({
  plan,
  current,
  onSelect,
}: {
  plan: Plan;
  current: boolean;
  onSelect: () => void;
}) {
  return (
    <article
      className={cn(
        "relative flex flex-col rounded-3xl border p-8",
        plan.popular ? "border-violet bg-card shadow-brand" : "border-border bg-card",
      )}
    >
      {plan.popular ? (
        <span className="absolute -top-3 left-8 rounded-full gradient-brand px-3 py-1 text-xs font-semibold text-primary-foreground">
          Most popular
        </span>
      ) : null}
      <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        {plan.name}
      </h2>
      <p className="mt-4 text-4xl font-bold">
        {plan.currency}
        {plan.price}
        {plan.price ? (
          <span className="text-base font-medium text-muted-foreground"> / {plan.period}</span>
        ) : null}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{plan.tagline}</p>
      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-sm text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
            {f}
          </li>
        ))}
      </ul>
      {plan.price === 0 ? (
        <Button asChild variant="brandOutline" size="lg" className="mt-8">
          <Link to="/signup">{plan.cta}</Link>
        </Button>
      ) : (
        <Button
          variant={plan.popular ? "brand" : "brandOutline"}
          size="lg"
          className="mt-8"
          disabled={current}
          onClick={onSelect}
        >
          {current ? "Current plan" : plan.cta}
        </Button>
      )}
    </article>
  );
}
