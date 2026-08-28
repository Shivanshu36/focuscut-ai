import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Sparkles, X, LayoutDashboard, User as UserIcon, LogOut, Coins } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/remove-background", label: "Remove Background" },
  { to: "/pricing", label: "Pricing" },
  { to: "/faq", label: "FAQ" },
] as const;

export function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6"
        aria-label="Main"
      >
        <div className="flex items-center gap-8">
          <Logo />
          <ul className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                  activeOptions={{ exact: link.to === "/" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <span className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium">
                <Coins className="h-4 w-4 text-violet" aria-hidden />
                {user.credits} credits
              </span>
              <Button asChild variant="ghost" size="sm">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex h-9 w-9 items-center justify-center rounded-full gradient-brand text-sm font-semibold text-primary-foreground"
                    aria-label="Account menu"
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="truncate">{user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account">
                      <UserIcon className="mr-2 h-4 w-4" /> Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => logout()}>
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm" variant="brand">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
          <Button asChild size="sm" variant="brandOutline">
            <Link to="/remove-background">
              <Sparkles className="mr-1.5 h-4 w-4" /> Remove Background
            </Link>
          </Button>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-muted-foreground hover:bg-surface hover:text-foreground"
                  activeProps={{ className: "text-foreground bg-surface" }}
                  activeOptions={{ exact: link.to === "/" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 grid gap-2">
              {user ? (
                <>
                  <Button asChild variant="secondary" onClick={() => setOpen(false)}>
                    <Link to="/dashboard">Dashboard ({user.credits} credits)</Link>
                  </Button>
                  <Button asChild variant="brand" onClick={() => setOpen(false)}>
                    <Link to="/remove-background">Remove Background</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="secondary" onClick={() => setOpen(false)}>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild variant="brand" onClick={() => setOpen(false)}>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </li>
          </ul>
          <p className="sr-only">{pathname}</p>
        </div>
      ) : null}
    </header>
  );
}
