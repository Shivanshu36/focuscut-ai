import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function OutOfCreditsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">You're Out of Credits</DialogTitle>
          <DialogDescription>
            Upgrade your plan to continue removing image backgrounds.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Button asChild variant="brand">
            <Link to="/pricing">View Plans</Link>
          </Button>
          <Button asChild variant="brandOutline">
            <Link to="/pricing" hash="credit-packs">
              Buy Credits
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
