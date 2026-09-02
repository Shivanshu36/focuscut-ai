import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" aria-label="SnapCut AI home" className={cn("inline-flex items-center", className)}>
      <img
        src="/favicon.png"
        alt="SnapCut AI"
        width={40}
        height={40}
        className="h-9 w-9 sm:h-10 sm:w-10"
      />
    </Link>
  );
}
