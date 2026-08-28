import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/common/Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Remove image backgrounds instantly with AI — simple, fast, and professional.
          </p>
        </div>

        <FooterCol title="Product">
          <FooterLink to="/remove-background">Remove Background</FooterLink>
          <FooterLink to="/pricing">Pricing</FooterLink>
          <FooterLink to="/dashboard">Dashboard</FooterLink>
        </FooterCol>

        <FooterCol title="Support">
          <FooterLink to="/faq">FAQ</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
          <FooterLink to="/account">Account</FooterLink>
        </FooterCol>

        <FooterCol title="Legal">
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
          <FooterLink to="/terms">Terms of Service</FooterLink>
        </FooterCol>
      </div>
      <div className="border-t border-border/70 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SnapCut AI. All rights reserved.
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {children}
      </Link>
    </li>
  );
}
