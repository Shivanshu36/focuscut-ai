import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, ImageIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { downloadDataUrl } from "@/utils/image";
import { toast } from "sonner";

export const Route = createFileRoute("/history")({
  head: () => ({ meta: [{ title: "History – SnapCut AI" }] }),
  component: HistoryPage,
});

function HistoryPage() {
  const { history, ready } = useAuth();

  const download = async (item: (typeof history)[number]) => {
    try {
      await downloadDataUrl(item.thumbnail, `${item.name.replace(/\.[^.]+$/, "")}-snapcut.png`);
    } catch {
      toast.error("Download failed", { description: "Please try again." });
    }
  };

  if (!ready) return null;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">Image History</h1>
          <p className="mt-2 text-muted-foreground">Your background-removed images are stored on this device.</p>
        </div>
        <Button asChild variant="brand">
          <Link to="/remove-background"><Sparkles className="mr-2 h-4 w-4" /> Remove Background</Link>
        </Button>
      </header>

      {history.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-border bg-surface/50 p-12 text-center">
          <ImageIcon className="mx-auto h-9 w-9 text-muted-foreground" aria-hidden />
          <p className="mt-4 font-medium">No images yet</p>
          <Button asChild variant="brand" className="mt-6"><Link to="/remove-background">Upload an image</Link></Button>
        </div>
      ) : (
        <ul className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {history.map((item) => (
            <li key={item.id} className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="checkerboard flex h-44 items-center justify-center">
                <img src={item.thumbnail} alt={item.name} className="h-full object-contain" />
              </div>
              <div className="flex items-center justify-between gap-2 p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => void download(item)} aria-label={`Download ${item.name}`}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}