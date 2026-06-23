#!/bin/bash
# Bump the cache-busting version across all pages, then commit+deploy as usual.
# Usage: ./bump_version.sh [version]   (default: today's date + .1, e.g. 2026-06-23.1)
set -e
cd "$(dirname "$0")"
V="${1:-$(date +%Y-%m-%d).1}"
for f in index.html chapter_*.html; do
  sed -i -E \
    -e "s|(name=\"site-version\" content=\")[^\"]*(\")|\1$V\2|" \
    -e "s|(gita\.css\?v=)[^\"]*|\1$V|" \
    -e "s|(gita\.js\?v=)[^\"]*|\1$V|" \
    "$f"
done
echo "bumped site-version + asset ?v= to: $V"
