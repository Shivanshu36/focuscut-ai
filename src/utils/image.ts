import { ACCEPTED_TYPES, ACCEPTED_LABEL, MAX_FILE_SIZE } from "@/config/app";

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function validateImageFile(file: File): string | null {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return `Unsupported file type. Please upload ${ACCEPTED_LABEL}.`;
  }
  if (file.size > MAX_FILE_SIZE) {
    return `File is too large. Maximum size is ${formatBytes(MAX_FILE_SIZE)}.`;
  }
  return null;
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not read that image."));
    img.src = src;
  });
}

/** Composite a transparent PNG over a solid colour and return a data URL. */
export async function compositeOnColor(src: string, color: string, mime = "image/jpeg") {
  const img = await loadImage(src);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable in this browser.");
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL(mime, 0.92);
}

export function downloadDataUrl(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/**
 * Local fallback matting used when no n8n webhook is configured yet.
 * Edge-seeded flood fill removes a uniform studio background so the product
 * flow stays demonstrable end to end. Swap in the webhook for production AI.
 */
export async function localBackgroundRemoval(file: File): Promise<string> {
  const src = URL.createObjectURL(file);
  try {
    const img = await loadImage(src);
    const maxSide = 1600;
    const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
    const w = Math.max(1, Math.round(img.naturalWidth * scale));
    const h = Math.max(1, Math.round(img.naturalHeight * scale));

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) throw new Error("Canvas unavailable in this browser.");
    ctx.drawImage(img, 0, 0, w, h);

    const data = ctx.getImageData(0, 0, w, h);
    const px = data.data;
    const visited = new Uint8Array(w * h);
    const stack: number[] = [];

    const seedAt = (x: number, y: number) => {
      const i = y * w + x;
      if (!visited[i]) {
        visited[i] = 1;
        stack.push(i);
      }
    };
    for (let x = 0; x < w; x++) {
      seedAt(x, 0);
      seedAt(x, h - 1);
    }
    for (let y = 0; y < h; y++) {
      seedAt(0, y);
      seedAt(w - 1, y);
    }

    const seeds = stack.slice();
    let sr = 0;
    let sg = 0;
    let sb = 0;
    for (const i of seeds) {
      sr += px[i * 4] ?? 0;
      sg += px[i * 4 + 1] ?? 0;
      sb += px[i * 4 + 2] ?? 0;
    }
    const br = sr / seeds.length;
    const bg = sg / seeds.length;
    const bb = sb / seeds.length;
    const tolerance = 52;

    const matches = (i: number) => {
      const d =
        Math.abs((px[i * 4] ?? 0) - br) +
        Math.abs((px[i * 4 + 1] ?? 0) - bg) +
        Math.abs((px[i * 4 + 2] ?? 0) - bb);
      return d / 3 < tolerance;
    };

    const remove = new Uint8Array(w * h);
    while (stack.length) {
      const i = stack.pop() as number;
      if (!matches(i)) continue;
      remove[i] = 1;
      const x = i % w;
      const y = (i / w) | 0;
      if (x > 0 && !visited[i - 1]) {
        visited[i - 1] = 1;
        stack.push(i - 1);
      }
      if (x < w - 1 && !visited[i + 1]) {
        visited[i + 1] = 1;
        stack.push(i + 1);
      }
      if (y > 0 && !visited[i - w]) {
        visited[i - w] = 1;
        stack.push(i - w);
      }
      if (y < h - 1 && !visited[i + w]) {
        visited[i + w] = 1;
        stack.push(i + w);
      }
    }

    // Feather the cut edge for a cleaner result.
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        if (remove[i]) {
          px[i * 4 + 3] = 0;
          continue;
        }
        let neighbours = 0;
        if (x > 0 && remove[i - 1]) neighbours++;
        if (x < w - 1 && remove[i + 1]) neighbours++;
        if (y > 0 && remove[i - w]) neighbours++;
        if (y < h - 1 && remove[i + w]) neighbours++;
        if (neighbours) px[i * 4 + 3] = Math.round(255 * (1 - neighbours / 6));
      }
    }

    ctx.putImageData(data, 0, 0);
    return canvas.toDataURL("image/png");
  } finally {
    URL.revokeObjectURL(src);
  }
}
