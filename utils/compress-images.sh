#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./to-jpeg.sh [input_dir] [output_dir]
# Defaults:
INPUT_DIR="${1:-input}"
OUTPUT_DIR="${2:-output}"

mkdir -p "$OUTPUT_DIR"
shopt -s nullglob

# Process common photo formats
for f in "$INPUT_DIR"/*.{jpg,jpeg,JPG,JPEG,png,PNG}; do
    [ -e "$f" ] || continue

    base="$(basename "$f")"
    out="$OUTPUT_DIR/${base%.*}.jpg"

    echo "Processing: $f → $out"

    magick "$f" \
        -auto-orient \
        -resize "2560x2560>" \
        -colorspace sRGB \
        -sampling-factor 4:2:0 \
        -interlace Plane \
        -quality 82 \
        "$out"
done

echo "Done. JPEG files are in: $OUTPUT_DIR"
