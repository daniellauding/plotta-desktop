# Assets

Place your app icons here:

## macOS Icon
- **File**: `icon.icns`
- **Size**: 1024x1024 PNG converted to ICNS
- **Tool**: Use `iconutil` or online converter

## Windows Icon
- **File**: `icon.ico`
- **Sizes**: 16x16, 32x32, 48x48, 64x64, 128x128, 256x256
- **Tool**: Use ImageMagick or online converter

## Creating Icons

### From PNG (macOS):
```bash
# Create iconset
mkdir icon.iconset
sips -z 16 16     icon-1024.png --out icon.iconset/icon_16x16.png
sips -z 32 32     icon-1024.png --out icon.iconset/icon_16x16@2x.png
sips -z 32 32     icon-1024.png --out icon.iconset/icon_32x32.png
sips -z 64 64     icon-1024.png --out icon.iconset/icon_32x32@2x.png
sips -z 128 128   icon-1024.png --out icon.iconset/icon_128x128.png
sips -z 256 256   icon-1024.png --out icon.iconset/icon_128x128@2x.png
sips -z 256 256   icon-1024.png --out icon.iconset/icon_256x256.png
sips -z 512 512   icon-1024.png --out icon.iconset/icon_256x256@2x.png
sips -z 512 512   icon-1024.png --out icon.iconset/icon_512x512.png
sips -z 1024 1024 icon-1024.png --out icon.iconset/icon_512x512@2x.png

# Convert to ICNS
iconutil -c icns icon.iconset -o icon.icns
```

### From PNG (Windows):
```bash
# Using ImageMagick
convert icon.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico
```

## Placeholder Icons

For now, the build will work without icons, but they're highly recommended for a professional look.
