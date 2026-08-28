import { useRef, useState } from "react";
import { UploadCloud, ImageIcon } from "lucide-react";
import { ACCEPTED_LABEL, ACCEPTED_TYPES, MAX_FILE_SIZE } from "@/config/app";
import { formatBytes, validateImageFile } from "@/utils/image";
import { cn } from "@/lib/utils";

type Props = {
  onFile: (file: File) => void;
  onError: (message: string) => void;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  className?: string;
};

export function UploadDropzone({
  onFile,
  onError,
  title = "Drop your image here",
  subtitle = "or click to upload",
  compact = false,
  className,
}: Props) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    const error = validateImageFile(file);
    if (error) {
      onError(error);
      return;
    }
    onFile(file);
  };

  return (
    <div
      className={cn(
        "group relative rounded-3xl border-2 border-dashed border-border bg-surface/60 text-center transition-all",
        "hover:border-violet hover:bg-surface",
        dragging && "border-violet bg-accent/60 ring-4 ring-ring/25",
        compact ? "p-8" : "p-10 sm:p-14",
        className,
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
        aria-label="Upload an image"
      />

      <div className="mx-auto flex max-w-md flex-col items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-brand shadow-brand">
          {dragging ? (
            <ImageIcon className="h-7 w-7 text-primary-foreground" aria-hidden />
          ) : (
            <UploadCloud className="h-7 w-7 text-primary-foreground" aria-hidden />
          )}
        </span>

        <div>
          <p className="text-lg font-semibold sm:text-xl">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex h-11 items-center justify-center rounded-xl gradient-brand px-6 text-sm font-semibold text-primary-foreground shadow-brand transition-transform hover:-translate-y-0.5"
        >
          Choose an image
        </button>

        <p className="text-xs text-muted-foreground">
          {ACCEPTED_LABEL} · up to {formatBytes(MAX_FILE_SIZE)}
        </p>
      </div>
    </div>
  );
}
