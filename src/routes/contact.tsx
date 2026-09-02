import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Mail, MessageSquare, Clock, MapPin, Phone } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact – SnapCut AI" },
      {
        name: "description",
        content: "Get in touch with the SnapCut AI team for support, billing or partnership questions.",
      },
      { property: "og:title", content: "Contact – SnapCut AI" },
      { property: "og:description", content: "Reach the SnapCut AI support team." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error("Check your message", {
        description: parsed.error.issues[0]?.message ?? "Please review the form.",
      });
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", message: "" });
      toast.success("Message sent", { description: "We usually reply within one business day." });
    }, 700);
  };

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <h1 className="text-4xl font-extrabold">
          Talk to <span className="text-gradient-brand">us</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Questions about credits, billing or bulk processing? We're happy to help.
        </p>
        <ul className="mt-8 space-y-5">
          {[
            { icon: Mail, title: "Email", text: "support@snapcut.ai" },
            { icon: Phone, title: "Phone", text: "Add your support phone number" },
            { icon: MapPin, title: "Business address", text: "Add your registered business address" },
            { icon: MessageSquare, title: "Trade name", text: "SnapCut AI" },
            { icon: Clock, title: "Response time", text: "Within one business day" },
          ].map((item) => (
            <li key={item.title} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent">
                <item.icon className="h-4.5 w-4.5 text-violet" aria-hidden />
              </span>
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <form
        onSubmit={submit}
        className="space-y-4 rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-8"
      >
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            maxLength={100}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            maxLength={255}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            rows={6}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            maxLength={1000}
            required
          />
        </div>
        <Button type="submit" variant="brand" size="lg" className="w-full" disabled={sending}>
          {sending ? "Sending..." : "Send message"}
        </Button>
      </form>
    </div>
  );
}
