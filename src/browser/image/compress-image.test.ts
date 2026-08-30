import { afterEach, describe, expect, it, vi } from "vitest";
import { compressImage } from "./index.js";

interface CanvasCapture {
  width: number;
  height: number;
  convertToBlobArgs: { type?: string; quality?: number } | undefined;
}

const captured: CanvasCapture = { width: 0, height: 0, convertToBlobArgs: undefined };

function installCanvasMocks(options?: {
  blobSize?: number;
  bitmap?: { width: number; height: number };
  nullContext?: boolean;
}) {
  const { blobSize = 10, bitmap = { width: 1000, height: 500 } } = options ?? {};
  vi.stubGlobal("createImageBitmap", (_file: File) =>
    Promise.resolve({ ...bitmap, close: vi.fn() }),
  );
  vi.stubGlobal(
    "OffscreenCanvas",
    class {
      width: number;
      height: number;
      constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        captured.width = width;
        captured.height = height;
      }
      getContext() {
        return options?.nullContext ? null : { drawImage: vi.fn() };
      }
      convertToBlob(args: { type?: string; quality?: number }) {
        captured.convertToBlobArgs = args;
        return Promise.resolve(new Blob([new Uint8Array(blobSize)]));
      }
    },
  );
}

const makeFile = (type: string, bytes = 100, name = "photo.img") =>
  new File([new Uint8Array(bytes)], name, { type });

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("compressImage", () => {
  it("scales down to maxWidth preserving the aspect ratio", async () => {
    installCanvasMocks();
    await compressImage(makeFile("image/jpeg"), { maxWidth: 500 });
    expect(captured.width).toBe(500);
    expect(captured.height).toBe(250);
  });

  it("scales down to maxHeight preserving the aspect ratio", async () => {
    installCanvasMocks();
    await compressImage(makeFile("image/jpeg"), { maxHeight: 250 });
    expect(captured.width).toBe(500);
    expect(captured.height).toBe(250);
  });

  it("applies both constraints when both bind", async () => {
    installCanvasMocks();
    await compressImage(makeFile("image/jpeg"), { maxWidth: 500, maxHeight: 100 });
    expect(captured.width).toBe(200);
    expect(captured.height).toBe(100);
  });

  it("never upscales when the image is already within bounds", async () => {
    installCanvasMocks();
    await compressImage(makeFile("image/jpeg"), { maxWidth: 4000, maxHeight: 4000 });
    expect(captured.width).toBe(1000);
    expect(captured.height).toBe(500);
  });

  it("defaults to JPEG at quality 0.8 for non-PNG input", async () => {
    installCanvasMocks();
    const result = await compressImage(makeFile("image/webp"));
    expect(captured.convertToBlobArgs).toEqual({ type: "image/jpeg", quality: 0.8 });
    expect(result.type).toBe("image/jpeg");
  });

  it("keeps PNG as PNG by default and honours an explicit type", async () => {
    installCanvasMocks();
    await compressImage(makeFile("image/png"));
    expect(captured.convertToBlobArgs?.type).toBe("image/png");
    await compressImage(makeFile("image/png"), { type: "image/webp" });
    expect(captured.convertToBlobArgs?.type).toBe("image/webp");
  });

  it("keeps the original file name on the compressed output", async () => {
    installCanvasMocks();
    const result = await compressImage(makeFile("image/jpeg", 100, "pic.jpg"));
    expect(result.name).toBe("pic.jpg");
  });

  it("returns the original file when compression came out larger", async () => {
    installCanvasMocks({ blobSize: 500 });
    const original = makeFile("image/png", 100);
    await expect(compressImage(original)).resolves.toBe(original);
  });

  it("throws when a 2d context cannot be created", async () => {
    installCanvasMocks({ nullContext: true });
    await expect(compressImage(makeFile("image/jpeg"))).rejects.toThrow(
      "Failed to get canvas context",
    );
  });
});
