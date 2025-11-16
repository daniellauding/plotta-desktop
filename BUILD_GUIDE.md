# Build Guide

## 🚀 Quick Development Build (FAST - 30 seconds)

For testing and development, use the **pack** command which skips installer creation:

```bash
# Just build the .app (macOS) - NO DMG, NO signing
npm run pack:mac

# Result: dist/mac-arm64/Plotta.app (ready to run!)
```

**What you get:**
- ✅ Runnable `.app` file in `dist/mac-arm64/`
- ✅ Fast build (~30 seconds after first time)
- ✅ Perfect for testing
- ❌ No installer (.dmg)
- ❌ Not signed or notarized

## 📦 Full Production Build (SLOW - 5+ minutes)

For distribution to users, use the full build:

```bash
# Creates DMG installer with signing
npm run build:mac
```

**What you get:**
- ✅ Professional `.dmg` installer
- ✅ Code signed (if certificates configured)
- ✅ Ready for distribution
- ❌ Slow (~5-10 minutes)

## ⚡ Build Comparison

| Command | Speed | Output | Use Case |
|---------|-------|--------|----------|
| `npm run pack:mac` | ⚡ Fast (30s) | `Plotta.app` | Development/Testing |
| `npm run build:mac` | 🐌 Slow (5-10min) | `Plotta.dmg` | Distribution |

## 🎯 Recommended Workflow

1. **Development Phase:**
   ```bash
   npm run pack:mac
   open dist/mac-arm64/Plotta.app
   ```

2. **Final Release:**
   ```bash
   npm run build:mac
   # DMG will be in dist/Plotta-1.0.0.dmg
   ```

## 🔧 Build Optimizations

### Speed Improvements Made:
- ✅ Disabled code signing (`hardenedRuntime: false`)
- ✅ Disabled Gatekeeper (`gatekeeperAssess: false`)
- ✅ Normal compression (instead of maximum)
- ✅ Only essential files included
- ✅ Added fast `pack:mac` command

### First Build vs Subsequent Builds:
- **First build**: ~5 minutes (downloads Electron binaries)
- **Subsequent pack**: ~30 seconds
- **Subsequent full build**: ~2-5 minutes

## 🪟 Windows Builds

```bash
# Fast unpacked build
npm run pack:win

# Full installer
npm run build:win
```

**Note:** Windows builds on macOS require Wine installed:
```bash
brew install wine-stable
```

Or use GitHub Actions which builds on native Windows.

## 📂 Build Output Locations

### Fast Pack Build:
```
dist/
├── mac-arm64/
│   └── Plotta.app          ← Double-click to run!
└── mac-x64/
    └── Plotta.app
```

### Full Build:
```
dist/
├── Plotta-1.0.0.dmg        ← Installer
├── Plotta-1.0.0-mac.zip    ← Archive
└── mac-arm64/
    └── Plotta.app          ← Also here
```

## 🐛 Troubleshooting

### Build Stuck?
- Press `Ctrl+C` to cancel
- Use `npm run pack:mac` instead of `npm run build:mac`

### Out of Disk Space?
- Clear old builds: `rm -rf dist/`
- Clear npm cache: `npm cache clean --force`

### Still Slow?
First build is always slow (downloads ~100MB). Subsequent builds are much faster.

## ✨ Summary

**For daily development:**
```bash
npm run pack:mac  # Fast!
```

**For releases/distribution:**
```bash
npm run build:mac  # Slow but complete
```
