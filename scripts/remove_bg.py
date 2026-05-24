"""
Extract gold logo from dark background.

Strategy: build an alpha mask using a combination of:
  - luminance (the logo is bright, bg is dark)
  - "goldness" (R + G are high relative to B in gold)
This gives a much cleaner edge than pure threshold.
"""

import sys
from pathlib import Path
import numpy as np
from PIL import Image

src = Path(sys.argv[1])
dst = Path(sys.argv[2])
size = int(sys.argv[3]) if len(sys.argv) > 3 else 512

img = Image.open(src).convert("RGB")
# Center-crop to square first
w, h = img.size
side = min(w, h)
left = (w - side) // 2
top = (h - side) // 2
img = img.crop((left, top, left + side, top + side)).resize(
    (size, size), Image.LANCZOS
)

arr = np.array(img).astype(np.float32)
r, g, b = arr[..., 0], arr[..., 1], arr[..., 2]

# Luminance (perceptual)
lum = 0.299 * r + 0.587 * g + 0.114 * b

# Goldness: gold = high red+green, lower blue. Range 0..1 ish.
gold = np.clip((r + g - 2 * b) / 255.0 + 0.15, 0, 1)

# Combined alpha — luminance pushed by goldness
alpha = lum / 255.0  # 0..1
alpha = alpha * (0.4 + 0.6 * gold)  # boost where it's gold

# Soft threshold curve — push midtones toward extremes
alpha = np.clip((alpha - 0.18) / 0.5, 0, 1)
alpha = alpha ** 0.8  # gamma for smoother edges
alpha = (alpha * 255).astype(np.uint8)

# Final RGBA
rgba = np.dstack([arr.astype(np.uint8), alpha])
Image.fromarray(rgba, "RGBA").save(dst, "PNG", optimize=True)
print(f"Wrote {dst} ({size}x{size})")
