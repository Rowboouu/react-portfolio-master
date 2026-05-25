"""
Process a logo PNG: auto-trim transparent edges, then generate
multiple sized outputs.

Usage:
  python process_logo.py <src> <dst> <max-dimension> [mode]

  mode = "fit"     -> preserve content aspect, longest side = max-dimension
  mode = "square"  -> pad to square, output is <max>x<max>
"""

import sys
from pathlib import Path
import numpy as np
from PIL import Image

src = Path(sys.argv[1])
dst = Path(sys.argv[2])
max_dim = int(sys.argv[3])
mode = sys.argv[4] if len(sys.argv) > 4 else "fit"

img = Image.open(src).convert("RGBA")
arr = np.array(img)

# If the image has no real transparency (Gemini-style flat PNG), do
# saturation-based bg removal. Works regardless of how many bg colors
# there are (uniform, checkered, gradient) as long as the logo is
# more colorful than the bg.
if arr[..., 3].mean() > 250:
    rgb = arr[..., :3].astype(np.float32)

    # Saturation: range across channels — 0 for any grey/white, high for
    # colored pixels. The logo is red (high sat), bg is grey/white (sat=0).
    sat = rgb.max(axis=-1) - rgb.min(axis=-1)

    # Smooth alpha ramp: sat <= 8 -> transparent, sat >= 55 -> opaque.
    alpha = np.clip((sat - 8) / 47 * 255, 0, 255).astype(np.uint8)

    # Sample an average bg color from clearly-unsaturated pixels for
    # edge de-matting (so anti-aliased edges don't carry a pink tint).
    bg_mask = sat < 5
    if bg_mask.any():
        bg_color = rgb[bg_mask].mean(axis=0)
    else:
        bg_color = np.array([240.0, 240.0, 240.0])

    # Solve for fg RGB at edge pixels: original = fg*a + bg*(1-a) so
    # fg = (original - bg*(1-a)) / a. Only apply where alpha > 0.
    a = alpha.astype(np.float32) / 255.0
    a3 = np.repeat(a[..., None], 3, axis=-1)
    safe_a = np.where(a3 > 0.01, a3, 1.0)
    fg = (rgb - bg_color * (1 - a3)) / safe_a
    fg = np.clip(fg, 0, 255).astype(np.uint8)
    arr[..., :3] = np.where(a3 > 0.01, fg, arr[..., :3])
    arr[..., 3] = alpha

    img = Image.fromarray(arr, "RGBA")

# Auto-trim transparent edges
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

w, h = img.size

if mode == "square":
    side = max(w, h)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(img, ((side - w) // 2, (side - h) // 2))
    img = square.resize((max_dim, max_dim), Image.LANCZOS)
else:  # fit
    if w >= h:
        new_w = max_dim
        new_h = round(h * max_dim / w)
    else:
        new_h = max_dim
        new_w = round(w * max_dim / h)
    img = img.resize((new_w, new_h), Image.LANCZOS)

img.save(dst, "PNG", optimize=True)
print(f"Wrote {dst} ({img.size[0]}x{img.size[1]}, mode={mode})")
