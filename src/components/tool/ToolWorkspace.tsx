import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Download, RotateCcw, Sparkles, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadDropzone } from "@/components/tool/UploadDropzone";
import { OutOfCreditsDialog } from "@/components/tool/OutOfCreditsDialog";
import { BeforeAfterSlider } from "@/components/common/BeforeAfterSlider";
import { removeBackground } from "@/api/backgroundRemoval";
import { useAuth } from "@/context/AuthContext";
import { CREDITS } from "@/config/app";
import { compositeOnColor, downloadDataUrl } from "@/utils/image";
import { takePendingFile } from "@/lib/pending-upload";
import { cn } from "@/lib/utils";

type Stage = "upload" | "processing" | "result" | "error";

const BACKGROUNDS = [
  { id: "transparent", label: "Transparent", color: null },
  { id: "white", label: "White", color: "#FFFFFF" },
  { id: "black", label: "Black", color: "#0F0A1F" },
] as const;

const GUEST_KEY = "snapcut.guestRuns";

export function ToolWorkspace() {
  const { user, consumeCredit, addHistory } = useAuth();
  const [stage, setStage] = useState<Stage>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [background, setBackground] = useState<string>("transparent");
  const [customColor, setCustomColor] = useState("#6C2CF4");
  const [showCredits, setShowCredits] = useState(false);
  const busy = useRef(false);

  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
    };
  }, [originalUrl]);

  const guestRunsLeft = () => {
    if (typeof window === "undefined") return CREDITS.guestFreeRuns;
    const used = Number(localStorage.getItem(GUEST_KEY) ?? "0");
    return Math.max(0, CREDITS.guestFreeRuns - used);
  };

  const process = useCallback(
    async (incoming: File) => {
      if (busy.current) return;

      if (user) {
        if (!consumeCredit()) {
          setShowCredits(true);
          return;
        }
      } else if (guestRunsLeft() <= 0) {
        setShowCredits(true);
        return;
      }

      busy.current = true;
      setFile(incoming);
      setStage("processing");
      setMessage(null);
      setProgress(8);

      const preview = URL.createObjectURL(incoming);
      setOriginalUrl(preview);

      const ticker = setInterval(() => setProgress((p) => Math.min(92, p + Math.random() * 12)), 400);

      try {
        const { imageUrl } = await removeBackground(incoming);
        setResultUrl(imageUrl);
        setProgress(100);
        setStage("result");
        setBackground("transparent");
        if (user) {
          addHistory({ name: incoming.name, status: "completed", thumbnail: imageUrl });
        } else {
          localStorage.setItem(GUEST_KEY, String(Number(localStorage.getItem(GUEST_KEY) ?? "0") + 1));
        }
        toast.success("Background removed", { description: "Your transparent image is ready." });
      } catch (error) {
        const text = error instanceof Error ? error.message : "Processing failed. Please try again.";
        setMessage(text);
        setStage("error");
        toast.error("Processing failed", { description: text });
      } finally {
        clearInterval(ticker);
        busy.current = false;
      }
    },
    [addHistory, consumeCredit, user],
  );

  useEffect(() => {
    const pending = takePendingFile();
    if (pending) void process(pending);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = () => {
    setStage("upload");
    setFile(null);
    setResultUrl(null);
    setOriginalUrl(null);
    setProgress(0);
    setMessage(null);
  };

  const download = async (format: "png" | "jpg") => {
    if (!resultUrl) return;
    try {
      const base = (file?.name ?? "snapcut").replace(/\.[^.]+$/, "");
      if (format === "png" && background === "transparent") {
        downloadDataUrl(resultUrl, `${base}-snapcut.png`);
        return;
      }
      const color =
        background === "custom"
          ? customColor
          : (BACKGROUNDS.find((b) => b.id === background)?.color ?? "#FFFFFF");
      const url = await compositeOnColor(
        resultUrl,
        color,
        format === "png" ? "image/png" : "image/jpeg",
      );
      downloadDataUrl(url, `${base}-snapcut.${format}`);
    } catch {
      toast.error("Download failed", { description: "Please try again." });
    }
  };

  const activeColor =
    background === "custom"
      ? customColor
      : (BACKGROUNDS.find((b) => b.id === background)?.color ?? null);

  return (
    <>
      <OutOfCreditsDialog open={showCredits} onOpenChange={setShowCredits} />

      {stage === "upload" ? (
        <UploadDropzone
          title="Upload an Image"
          subtitle="Drag and drop your image here, or click to browse."
          onFile={process}
          onError={(m) => toast.error("Cannot use that file", { description: m })}
        />
      ) : null}

      {stage === "processing" ? (
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-10">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
            {originalUrl ? (
              <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-border">
                <img
                  src={originalUrl}
                  alt="Uploaded preview"
                  className="h-64 w-full object-cover opacity-70"
                />
                <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.16),transparent)]" />
              </div>
            ) : null}
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Loader2 className="h-5 w-5 animate-spin text-violet" aria-hidden />
              Removing background with AI...
            </div>
            <Progress value={progress} className="h-2 w-full" />
            <p className="text-sm text-muted-foreground">
              This usually takes just a few seconds. Please keep this tab open.
            </p>
          </div>
        </div>
      ) : null}

      {stage === "error" ? (
        <div className="rounded-3xl border border-destructive/40 bg-surface p-10 text-center shadow-card">
          <AlertTriangle className="mx-auto h-10 w-10 text-destructive" aria-hidden />
          <h2 className="mt-4 text-xl font-semibold">We couldn't process that image</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{message}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="brand" onClick={() => file && process(file)}>
              <RotateCcw className="mr-2 h-4 w-4" /> Retry
            </Button>
            <Button variant="brandOutline" onClick={reset}>
              Upload a different image
            </Button>
          </div>
        </div>
      ) : null}

      {stage === "result" && resultUrl && originalUrl ? (
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <BeforeAfterSlider
            beforeSrc={originalUrl}
            afterSrc={resultUrl}
            className="aspect-[4/5] w-full sm:aspect-[4/3]"
          />

          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-border bg-surface p-6 shadow-card">
              <h2 className="text-lg font-semibold">Change Background</h2>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {BACKGROUNDS.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setBackground(bg.id)}
                    className={cn(
                      "rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
                      background === bg.id
                        ? "border-violet bg-accent"
                        : "border-border hover:border-violet/70",
                    )}
                  >
                    {bg.label}
                  </button>
                ))}
                <button
                  onClick={() => setBackground("custom")}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
                    background === "custom"
                      ? "border-violet bg-accent"
                      : "border-border hover:border-violet/70",
                  )}
                >
                  Custom
                  <input
                    type="color"
                    value={customColor}
                    aria-label="Custom background colour"
                    onChange={(e) => {
                      setCustomColor(e.target.value);
                      setBackground("custom");
                    }}
                    className="h-5 w-5 cursor-pointer rounded border-0 bg-transparent p-0"
                  />
                </button>
              </div>

              <div
                className={cn(
                  "mt-4 flex h-40 items-center justify-center overflow-hidden rounded-2xl border border-border",
                  activeColor ? "" : "checkerboard",
                )}
                style={activeColor ? { backgroundColor: activeColor } : undefined}
              >
                <img src={resultUrl} alt="Result preview" className="h-full object-contain" />
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface p-6 shadow-card">
              <h2 className="text-lg font-semibold">Download</h2>
              <div className="mt-4 grid gap-2">
                <Button variant="brand" size="lg" onClick={() => download("png")}>
                  <Download className="mr-2 h-4 w-4" /> Download PNG
                </Button>
                <Button variant="brandOutline" size="lg" onClick={() => download("jpg")}>
                  <Download className="mr-2 h-4 w-4" /> Download JPG
                </Button>
                <Button variant="ghost" onClick={reset}>
                  <Sparkles className="mr-2 h-4 w-4" /> Remove Another Background
                </Button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                JPG exports use the selected background colour. PNG keeps transparency.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
