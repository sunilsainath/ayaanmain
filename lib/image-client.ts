// Browser-side image downscaling and compression.
//
// Uploads were failing with "Image must be under 2MB" because the server (and
// the pre-check in the admin UI) rejects anything larger. Rather than raise the
// cap and serve multi-megabyte hero images, we shrink the picture in the browser
// before it is sent. This also means phone photos of several MB just work.
//
// No dependency: uses createImageBitmap + canvas, which every current browser
// supports. Falls back to <img> + object URL where createImageBitmap is missing.

export type CompressOptions = {
  /** Longest edge the image is allowed to keep. Never upscales. */
  maxWidth?: number;
  maxHeight?: number;
  /** Starting quality for lossy encodes. */
  quality?: number;
  /** Hard ceiling for the produced file. */
  maxBytes?: number;
};

const DEFAULTS: Required<CompressOptions> = {
  maxWidth: 2560,
  maxHeight: 1600,
  quality: 0.85,
  maxBytes: 1.8 * 1024 * 1024,
};

type Decoded = { source: CanvasImageSource; width: number; height: number; release: () => void };

async function decode(file: File): Promise<Decoded> {
  if (typeof createImageBitmap === "function") {
    try {
      const bmp = await createImageBitmap(file);
      return { source: bmp, width: bmp.width, height: bmp.height, release: () => bmp.close?.() };
    } catch {
      /* fall through to <img> */
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Could not read that image"));
      el.src = url;
    });
    return {
      source: img,
      width: img.naturalWidth,
      height: img.naturalHeight,
      release: () => URL.revokeObjectURL(url),
    };
  } catch (e) {
    URL.revokeObjectURL(url);
    throw e;
  }
}

function toBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), type, quality));
}

/**
 * Returns a file guaranteed to be within `maxBytes` where the browser allows it.
 * If the source is already small enough and within the size bounds, it is
 * returned untouched so we do not re-encode good images.
 */
export async function compressImage(file: File, opts: CompressOptions = {}): Promise<File> {
  const cfg = { ...DEFAULTS, ...opts };
  if (!file.type.startsWith("image/")) return file;
  // Animated GIFs would be flattened to one frame — leave them alone.
  if (file.type === "image/gif") return file;

  const { source, width, height, release } = await decode(file);
  try {
    const scale = Math.min(1, cfg.maxWidth / width, cfg.maxHeight / height);
    const targetW = Math.max(1, Math.round(width * scale));
    const targetH = Math.max(1, Math.round(height * scale));

    const alreadySmall = file.size <= cfg.maxBytes && scale === 1;
    if (alreadySmall) return file;

    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    // White matte so transparent PNGs do not turn black when encoded as JPEG.
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, targetW, targetH);
    ctx.drawImage(source, 0, 0, targetW, targetH);

    const wantsAlpha = false; // photos for the carousel; JPEG is smaller and always safe
    const types = wantsAlpha ? ["image/webp", "image/jpeg"] : ["image/jpeg", "image/webp"];
    let best: Blob | null = null;

    for (const type of types) {
      let quality = cfg.quality;
      for (let attempt = 0; attempt < 6; attempt++) {
        const blob = await toBlob(canvas, type, quality);
        if (!blob) break;
        if (!best || blob.size < best.size) best = blob;
        if (blob.size <= cfg.maxBytes) {
          return new File([blob], rename(file.name, type), { type: blob.type || type, lastModified: Date.now() });
        }
        quality = Math.max(0.55, quality - 0.1);
      }
    }

    if (best && best.size <= cfg.maxBytes) {
      return new File([best], rename(file.name, best.type), { type: best.type, lastModified: Date.now() });
    }
    // Still too large at maximum compression — hand back the smallest attempt so
    // the caller's error message can report a real size.
    if (best) throw new Error(`Image is still ${(best.size / 1024 / 1024).toFixed(1)}MB after compression — please export it smaller`);
    return file;
  } finally {
    release();
  }
}

function rename(name: string, mime: string): string {
  const ext = mime === "image/webp" ? "webp" : "jpg";
  const base = String(name || "image").replace(/\.[^.]+$/, "");
  return `${base}.${ext}`;
}

export function formatBytes(n: number): string {
  if (n >= 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)}MB`;
  return `${Math.max(1, Math.round(n / 1024))}KB`;
}