import { createFileRoute, Link } from "@tanstack/react-router";
import { CreditCard, ImageIcon, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { PLANS } from "@/config/app";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard – SnapCut AI" },
      { name: "description", content: "Track your SnapCut AI credits, plan and recent images." },
      { property: "og:title", content: "Dashboard – SnapCut AI" },
      { property: "og:description", content: "Your SnapCut AI credits and image history." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user, ready } = useAuth();

  if (!ready) return <PageSkeleton />;
  if (!user) return <SignedOut />;

  const plan = PLANS.find((p) => p.id === user.plan);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Hi, {user.name.split(" ")[0]}</h1>
          <p className="mt-1 text-muted-foreground">Here's your SnapCut AI activity.</p>
        </div>
        <Button asChild variant="brand" size="lg">
          <Link to="/remove-background">
            <Sparkles className="mr-2 h-4 w-4" /> Remove a background
          </Link>
        </Button>
      </header>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <StatCard icon={Zap} label="Credits remaining" value={String(user.credits)} />
        <StatCard icon={CreditCard} label="Current plan" value={plan?.name ?? "Free"} />
        <StatCard icon={ImageIcon} label="Images processed" value={String(user.history.length)} />
      </div>

      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent images</h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/account">Account settings</Link>
          </Button>
        </div>

        {user.history.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-border bg-surface/50 p-12 text-center">
            <ImageIcon className="mx-auto h-9 w-9 text-muted-foreground" aria-hidden />
            <p className="mt-4 font-medium">No images yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Your processed images will appear here.
            </p>
            <Button asChild variant="brand" className="mt-6">
              <Link to="/remove-background">Upload your first image</Link>
            </Button>
          </div>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {user.history.map((item) => (
              <li
                key={item.id}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="checkerboard flex h-36 items-center justify-center">
                  <img src={item.thumbnail} alt={item.name} className="h-full object-contain" />
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.date).toLocaleDateString()} · {item.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Zap;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <Icon className="h-5 w-5 text-violet" aria-hidden />
      <p className="mt-4 text-3xl font-bold">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function SignedOut() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">You're not logged in</h1>
      <p className="mt-2 text-muted-foreground">Log in to view your credits and history.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Button asChild variant="brand">
          <Link to="/login">Log In</Link>
        </Button>
        <Button asChild variant="brandOutline">
          <Link to="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl animate-pulse px-4 py-16 sm:px-6">
      <div className="h-9 w-56 rounded-lg bg-muted" />
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-32 rounded-3xl bg-muted" />
        ))}
      </div>
    </div>
  );
}
