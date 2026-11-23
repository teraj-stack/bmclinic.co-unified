#!/usr/bin/env zsh
set -euo pipefail

export PATH="/Users/krzysztofjarzyna/.gemini/antigravity/scratch/.node/bin:$HOME/.local/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

PROJECT_DIR="/Users/krzysztofjarzyna/.gemini/antigravity/scratch/bmclinics-web"
STANDALONE_DIR="$PROJECT_DIR/.next/standalone"
STATIC_DIR="$PROJECT_DIR/.next/static"
PUBLIC_DIR="$PROJECT_DIR/public"
NODE_BIN="/Users/krzysztofjarzyna/.gemini/antigravity/scratch/.node/bin/node"
RELEASE_DIR="$PROJECT_DIR/release"
APP_NAME="BM Clinics.app"
APP_DIR="$RELEASE_DIR/$APP_NAME"
DMG_STAGE="$RELEASE_DIR/.dmg_stage"
DMG_PATH="$RELEASE_DIR/BM-Clinics-Offline-macOS.dmg"
ZIP_PATH="$RELEASE_DIR/BM-Clinics-Offline-macOS.zip"
ICONSET_DIR="$RELEASE_DIR/.AppIcon.iconset"
ICON_PNG="$RELEASE_DIR/.icon_1024.png"

if [[ ! -f "$STANDALONE_DIR/server.js" ]]; then
  echo "ERROR: Brak zbudowanego .next/standalone/server.js — uruchom najpierw npm run build"
  exit 1
fi

rm -rf "$APP_DIR" "$DMG_STAGE" "$ICONSET_DIR" "$ICON_PNG" "$DMG_PATH" "$ZIP_PATH"
mkdir -p "$APP_DIR/Contents/MacOS" "$APP_DIR/Contents/Resources/app/.next/static" "$APP_DIR/Contents/Resources/app/public" "$APP_DIR/Contents/Resources/bin"

# 1. Copy Next.js standalone server + static assets + public assets + bundled Node runtime
cp -R "$STANDALONE_DIR/." "$APP_DIR/Contents/Resources/app/"
cp -R "$STATIC_DIR/." "$APP_DIR/Contents/Resources/app/.next/static/"
cp -R "$PUBLIC_DIR/." "$APP_DIR/Contents/Resources/app/public/"
cp "$NODE_BIN" "$APP_DIR/Contents/Resources/bin/node"
chmod +x "$APP_DIR/Contents/Resources/bin/node"

# Override .env.local inside the app bundle for standalone offline port 3021
cat > "$APP_DIR/Contents/Resources/app/.env.local" << 'ENVEOF'
NEXTAUTH_URL="http://127.0.0.1:3021"
NEXT_PUBLIC_SITE_URL="http://127.0.0.1:3021"
NEXT_TELEMETRY_DISABLED="1"
ENVEOF

# 2. Generate crisp macOS AppIcon.icns from Bujok Medical logo on obsidian/gold squircle
uv run --with pillow python3 - "$PUBLIC_DIR/brand/logo-bujok-medical.png" "$ICON_PNG" << 'PYICON'
import sys
from PIL import Image, ImageDraw

logo_path, out_path = sys.argv[1], sys.argv[2]
S = 1024
img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
d = ImageDraw.Draw(img)

pad = 64
d.rounded_rectangle(
    [pad, pad, S - pad, S - pad],
    radius=210,
    fill=(21, 20, 17, 255),
    outline=(212, 175, 55, 235),
    width=16,
)
d.rounded_rectangle(
    [pad + 26, pad + 26, S - pad - 26, S - pad - 26],
    radius=188,
    outline=(255, 255, 255, 36),
    width=5,
)

logo = Image.open(logo_path).convert("RGBA")
max_w = S - 260
max_h = S - 260
ratio = min(max_w / logo.width, max_h / logo.height)
new_size = (int(logo.width * ratio), int(logo.height * ratio))
logo = logo.resize(new_size, Image.Resampling.LANCZOS)
ox = (S - new_size[0]) // 2
oy = (S - new_size[1]) // 2
img.alpha_composite(logo, (ox, oy))
img.save(out_path, "PNG")
PYICON

mkdir -p "$ICONSET_DIR"
sips -z 16 16     "$ICON_PNG" --out "$ICONSET_DIR/icon_16x16.png"      >/dev/null
sips -z 32 32     "$ICON_PNG" --out "$ICONSET_DIR/icon_16x16@2x.png"   >/dev/null
sips -z 32 32     "$ICON_PNG" --out "$ICONSET_DIR/icon_32x32.png"      >/dev/null
sips -z 64 64     "$ICON_PNG" --out "$ICONSET_DIR/icon_32x32@2x.png"   >/dev/null
sips -z 128 128   "$ICON_PNG" --out "$ICONSET_DIR/icon_128x128.png"    >/dev/null
sips -z 256 256   "$ICON_PNG" --out "$ICONSET_DIR/icon_128x128@2x.png" >/dev/null
sips -z 256 256   "$ICON_PNG" --out "$ICONSET_DIR/icon_256x256.png"    >/dev/null
sips -z 512 512   "$ICON_PNG" --out "$ICONSET_DIR/icon_256x256@2x.png" >/dev/null
sips -z 512 512   "$ICON_PNG" --out "$ICONSET_DIR/icon_512x512.png"    >/dev/null
cp "$ICON_PNG"                      "$ICONSET_DIR/icon_512x512@2x.png"
iconutil -c icns "$ICONSET_DIR" -o "$APP_DIR/Contents/Resources/AppIcon.icns"
rm -rf "$ICONSET_DIR" "$ICON_PNG"

# 3. Write Info.plist
cat > "$APP_DIR/Contents/Info.plist" << 'PLIST'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleDevelopmentRegion</key>
  <string>pl</string>
  <key>CFBundleDisplayName</key>
  <string>BM Clinics</string>
  <key>CFBundleExecutable</key>
  <string>BMClinics</string>
  <key>CFBundleIconFile</key>
  <string>AppIcon</string>
  <key>CFBundleIdentifier</key>
  <string>local.bmclinics.offline</string>
  <key>CFBundleInfoDictionaryVersion</key>
  <string>6.0</string>
  <key>CFBundleName</key>
  <string>BM Clinics</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>CFBundleShortVersionString</key>
  <string>1.0.0</string>
  <key>CFBundleVersion</key>
  <string>1</string>
  <key>LSMinimumSystemVersion</key>
  <string>12.0</string>
  <key>NSHighResolutionCapable</key>
  <true/>
</dict>
</plist>
PLIST

# 4. Write native macOS executable launcher
cat > "$APP_DIR/Contents/MacOS/BMClinics" << 'LAUNCHER'
#!/usr/bin/env zsh
set -euo pipefail

APP_CONTENTS="$(cd "$(dirname "$0")/.." && pwd)"
RESOURCES_DIR="$APP_CONTENTS/Resources"
APP_SERVER_DIR="$RESOURCES_DIR/app"
NODE_BIN="$RESOURCES_DIR/bin/node"
DATA_DIR="$HOME/Library/Application Support/BMClinics"
LOG_FILE="$HOME/Library/Logs/BMClinics.log"
PID_FILE="$DATA_DIR/server.pid"
PORT="3021"
URL="http://127.0.0.1:${PORT}/"

mkdir -p "$DATA_DIR" "$HOME/Library/Logs"

# Start standalone Next.js server if not already responding
if ! /usr/bin/curl -sf -I "$URL" >/dev/null 2>&1; then
  (
    cd "$APP_SERVER_DIR"
    HOSTNAME="127.0.0.1" \
    PORT="$PORT" \
    NODE_ENV="production" \
    NEXT_TELEMETRY_DISABLED="1" \
    NEXTAUTH_URL="$URL" \
    nohup "$NODE_BIN" "$APP_SERVER_DIR/server.js" >>"$LOG_FILE" 2>&1 &
    echo $! > "$PID_FILE"
  )

  # Wait up to 8 seconds for Next.js standalone readiness
  for _ in {1..40}; do
    if /usr/bin/curl -sf -I "$URL" >/dev/null 2>&1; then
      break
    fi
    sleep 0.2
  done
fi

CHROME_PROFILE="$DATA_DIR/app-profile"
for BROWSER_BIN in \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" \
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" \
  "/Applications/Chromium.app/Contents/MacOS/Chromium"; do
  if [[ -x "$BROWSER_BIN" ]]; then
    nohup "$BROWSER_BIN" --app="$URL" --user-data-dir="$CHROME_PROFILE" --no-first-run >/dev/null 2>&1 &
    exit 0
  fi
done

/usr/bin/open "$URL"
LAUNCHER
chmod +x "$APP_DIR/Contents/MacOS/BMClinics"

# 5. Ad-hoc sign
codesign --force --deep --sign - "$APP_DIR" >/dev/null 2>&1 || true

# 6. Create portable ZIP archive
(cd "$RELEASE_DIR" && /usr/bin/zip -qry "$ZIP_PATH" "$APP_NAME")

# 7. Create macOS .dmg installer
mkdir -p "$DMG_STAGE"
cp -R "$APP_DIR" "$DMG_STAGE/"
ln -s /Applications "$DMG_STAGE/Applications"
cat > "$DMG_STAGE/INSTRUKCJA_INSTALACJI.txt" << 'TXT'
BM CLINICS — NIEZALEŻNA APLIKACJA OFFLINE (macOS Apple Silicon)
===============================================================

1. Przeciągnij ikonę "BM Clinics.app" na folder "Applications" (Aplikacje).
2. Otwórz "BM Clinics" z folderu Aplikacje lub przez Spotlight (Cmd + Spacja).
3. Przy pierwszym uruchomieniu, jeśli macOS zapyta o potwierdzenie:
   kliknij prawym przyciskiem myszy -> Otwórz -> Otwórz.

Aplikacja zawiera wbudowany serwer Next.js 15 + środowisko uruchomieniowe,
działa lokalnie na porcie http://127.0.0.1:3021 i nie wymaga internetu ani Antigravity.
TXT

hdiutil create \
  -volname "BM Clinics Offline" \
  -srcfolder "$DMG_STAGE" \
  -ov \
  -format UDZO \
  "$DMG_PATH" >/dev/null

rm -rf "$DMG_STAGE"

echo "BUILD_COMPLETE"
ls -lh "$RELEASE_DIR"
