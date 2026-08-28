import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Sparkles,
  MousePointerClick,
  Zap,
  Gem,
  Layers,
  Smile,
  ShoppingBag,
  Share2,
  UserRound,
  Megaphone,
  Camera,
  Palette,
  ArrowRight,
  Upload,
  Wand2,
  Download,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BeforeAfterSlider } from "@/components/common/BeforeAfterSlider";
import { UploadDropzone } from "@/components/tool/UploadDropzone";
import { FAQS, PLANS } from "@/config/app";
import { setPendingFile } from "@/lib/pending-upload";
import { toast } from "sonner";
import beforeImg from "@/assets/demo-before.jpg";
import afterImg from "@/assets/demo-after.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SnapCut AI – Remove Image Backgrounds Instantly" },
      {
        name: "description",
        content:
          "Remove image backgrounds instantly using AI. Upload your image and download a clean transparent background in seconds.",
      },
      { property: "og:title", content: "SnapCut AI – Remove Image Backgrounds Instantly" },
      {
        property: "og:description",
        content: "Upload any image and let SnapCut AI remove the background instantly with AI.",
      },
    ],
  }),
  component: Home,
});

const FEATURES = [
  { icon: Sparkles, title: "AI-Powered", text: "Smart AI automatically detects the main subject." },
  {
    icon: MousePointerClick,
    title: "One-Click Removal",
    text: "Remove backgrounds without complicated editing.",
  },
  { icon: Zap, title: "Fast Processing", text: "Get your image processed in seconds." },
  { icon: Gem, title: "High Quality", text: "Preserve image quality and clean subject edges." },
  {
    icon: Layers,
    title: "Transparent Background",
    text: "Download images with transparent PNG backgrounds.",
  },
  { icon: Smile, title: "Easy to Use", text: "No design skills required." },
];

const USE_CASES = [
  { icon: ShoppingBag, title: "E-commerce Products" },
  { icon: Share2, title: "Social Media Content" },
  { icon: UserRound, title: "Profile Pictures" },
  { icon: Megaphone, title: "Marketing Materials" },
  { icon: Camera, title: "Product Photography" },
  { icon: Palette, title: "Creative Design" },
];

const STEPS = [
  { icon: Upload, title: "Upload Your Image", text: "Upload any image from your device." },
  {
    icon: Wand2,
    title: "AI Removes Background",
    text: "Our AI automatically detects and removes the background.",
  },
  {
    icon: Download,
    title: "Download Your Image",
    text: "Preview the result and download your new transparent image.",
  },
];

function Home() {
  const navigate = useNavigate();

  const handleFile = (file: File) => {
    setPendingFile(file);
    navigate({ to: "/remove-background" });
  };

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative isolate">
        <span className="glow-orb animate-float-slow top-[-120px] left-[-80px] h-80 w-80 gradient-brand" />
        <span className="glow-orb animate-float-slow top-40 right-[-100px] h-72 w-72 bg-magenta" />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-violet" aria-hidden /> AI background removal,
              built for speed
            </span>
            <h1 className="mt-5 text-4xl leading-[1.08] font-extrabold sm:text-5xl lg:text-6xl">
              Remove Image Backgrounds in{" "}
              <span className="text-gradient-brand">One Click</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Upload any image and let SnapCut AI remove the background instantly using powerful AI.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="brand" size="xl">
                <Link to="/remove-background">Remove Background Free</Link>
              </Button>
              <Button asChild variant="brandOutline" size="xl">
                <a href="#how-it-works">See How It Works</a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required · 10 free credits on sign up
            </p>
          </div>

          <div className="animate-fade-up">
            <BeforeAfterSlider
              beforeSrc={beforeImg}
              afterSrc={afterImg}
              className="aspect-[4/5] w-full shadow-card sm:aspect-[9/10]"
            />
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Drag the handle to compare original and result
            </p>
          </div>
        </div>
      </section>

      {/* UPLOAD CTA */}
      <section className="mx-auto w-full max-w-4xl px-4 pb-16 sm:px-6">
        <UploadDropzone
          onFile={handleFile}
          onError={(m) => toast.error("Cannot use that file", { description: m })}
        />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          No sign-up required to try it.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="border-y border-border bg-surface/30 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="How it works"
            title="Three steps, a few seconds"
            subtitle="From upload to a clean transparent PNG without opening an editor."
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="rounded-3xl border border-border bg-card p-7 transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-brand shadow-brand">
                    <step.icon className="h-5 w-5 text-primary-foreground" aria-hidden />
                  </span>
                  <span className="text-4xl font-bold text-muted-foreground/25">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Features"
            title="Everything you need to cut out fast"
            subtitle="Purpose-built for people who ship images every day."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <article
                key={f.title}
                className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-violet/60"
              >
                <f.icon className="h-6 w-6 text-violet" aria-hidden />
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="border-y border-border bg-surface/30 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Use cases"
            title="Made for every kind of image"
            subtitle="Product shots, avatars, campaigns and creative work."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {USE_CASES.map((c) => (
              <div
                key={c.title}
                className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
                  <c.icon className="h-5 w-5 text-violet" aria-hidden />
                </span>
                <span className="text-sm font-medium">{c.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Before & after"
              title="Clean edges, even on hair"
              subtitle="SnapCut AI keeps fine detail intact so results look professional straight out of the tool."
            />
            <ul className="mt-6 space-y-3">
              {[
                "Transparent PNG output",
                "Edge refinement on hair and fur",
                "Instant JPG export with any background colour",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-success" aria-hidden /> {item}
                </li>
              ))}
            </ul>
            <Button asChild variant="brand" size="lg" className="mt-8">
              <Link to="/remove-background">
                Try it with your image <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <BeforeAfterSlider
            beforeSrc={beforeImg}
            afterSrc={afterImg}
            className="aspect-[4/5] w-full shadow-card"
          />
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="border-y border-border bg-surface/30 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Pricing"
            title="Start free, scale when you need to"
            subtitle="Simple credit based pricing with no hidden fees."
          />
          <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
            {PLANS.slice(0, 2).map((plan) => (
              <div
                key={plan.id}
                className={`rounded-3xl border p-7 ${plan.popular ? "border-violet bg-card shadow-brand" : "border-border bg-card"}`}
              >
                <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                  {plan.name}
                </h3>
                <p className="mt-3 text-4xl font-bold">
                  {plan.currency}
                  {plan.price}
                  <span className="text-base font-medium text-muted-foreground">
                    {plan.price ? ` / ${plan.period}` : ""}
                  </span>
                </p>
                <ul className="mt-5 space-y-2.5">
                  {plan.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="brandOutline" size="lg">
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <SectionHeading eyebrow="FAQ" title="Questions, answered" />
          <Accordion type="single" collapsible className="mt-10">
            {FAQS.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger className="text-left text-base">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-4xl gradient-brand px-6 py-14 text-center shadow-brand sm:px-12">
          <h2 className="text-3xl font-extrabold text-primary-foreground sm:text-4xl">
            Ready to Remove Your Background?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-primary-foreground/85">
            Upload your image and let AI do the work.
          </p>
          <Button asChild size="xl" className="mt-8 bg-background text-foreground hover:bg-surface">
            <Link to="/remove-background">Try SnapCut AI Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <p className="text-xs font-semibold tracking-[0.18em] text-violet uppercase">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}
