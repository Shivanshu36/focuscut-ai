import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { CREDITS } from "@/config/app";
import { AuthShell } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account – SnapCut AI" },
      {
        name: "description",
        content: `Create a free SnapCut AI account and get ${CREDITS.signupBonus} credits to start removing backgrounds.`,
      },
      { property: "og:title", content: "Create Account – SnapCut AI" },
      {
        property: "og:description",
        content: `Get ${CREDITS.signupBonus} free credits when you sign up for SnapCut AI.`,
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2 || !email.trim() || password.length < 6) {
      toast.error("Check your details", {
        description: "Enter your name, a valid email and a password of at least 6 characters.",
      });
      return;
    }
    setLoading(true);
    try {
      await signup(name.trim(), email.trim(), password);
      toast.success("Account created", {
        description: `${CREDITS.signupBonus} free credits added.`,
      });
      navigate({ to: "/dashboard" });
    } catch (error) {
      toast.error("Could not sign up", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle={`Get ${CREDITS.signupBonus} free credits instantly.`}
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-violet hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            autoComplete="new-password"
            required
          />
        </div>
        <Button type="submit" variant="brand" size="lg" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Create Account
        </Button>
      </form>
    </AuthShell>
  );
}
