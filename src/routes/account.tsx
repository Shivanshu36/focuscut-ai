import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { PLANS } from "@/config/app";
import { PageSkeleton, SignedOut } from "./dashboard";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account – SnapCut AI" },
      { name: "description", content: "Manage your SnapCut AI profile, plan and credits." },
      { property: "og:title", content: "Account – SnapCut AI" },
      { property: "og:description", content: "Manage your SnapCut AI profile and billing." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { user, ready, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (!ready) return <PageSkeleton />;
  if (!user) return <SignedOut />;

  const plan = PLANS.find((p) => p.id === user.plan);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2 || !email.trim()) {
      toast.error("Check your details");
      return;
    }
    updateProfile({ name: name.trim(), email: email.trim() });
    toast.success("Profile updated");
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">Account</h1>
      <p className="mt-1 text-muted-foreground">Manage your profile and subscription.</p>

      <form
        onSubmit={save}
        className="mt-8 space-y-4 rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-8"
      >
        <h2 className="text-lg font-semibold">Profile</h2>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button type="submit" variant="brand">
          Save changes
        </Button>
      </form>

      <section className="mt-6 rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-8">
        <h2 className="text-lg font-semibold">Plan & credits</h2>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-bold">{plan?.name ?? "Free"}</p>
            <p className="text-sm text-muted-foreground">{user.credits} credits remaining</p>
          </div>
          <Button asChild variant="brandOutline">
            <Link to="/pricing">Manage plan</Link>
          </Button>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-8">
        <h2 className="text-lg font-semibold">Session</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Signed in as {user.email}. Logging out keeps your saved data on this device.
        </p>
        <Button
          variant="destructive"
          className="mt-4"
          onClick={() => {
            logout();
            toast.success("Logged out");
            navigate({ to: "/" });
          }}
        >
          <LogOut className="mr-2 h-4 w-4" /> Log out
        </Button>
      </section>
    </div>
  );
}
