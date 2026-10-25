#!/usr/bin/env bash
# Chrome refuses to start as root without --no-sandbox, and the design-taste-frontend
# scripts have no way to pass extra flags. Point CHROME_PATH here when running as root.
exec "${REAL_CHROME_PATH:-/opt/pw-browsers/chromium-1194/chrome-linux/chrome}" --no-sandbox "$@"
