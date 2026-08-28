import { Link } from "@tanstack/react-router";
import logo from "@/assets/snapcut-logo.png.asset.json";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" aria-label="SnapCut AI home" className={cn("inline-flex items-center", className)}>
      <img
        src={logo.url}
        alt="SnapCut AI"
        width={180}
        height={44}
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
