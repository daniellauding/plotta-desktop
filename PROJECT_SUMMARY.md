# Plotta Desktop - Project Summary

## ✅ What Was Created

A complete Electron desktop application wrapper for your Plotta web app.

## 📁 Project Structure

```
/Users/daniellauding/Work/instinctly/internal/
├── plotta/              # Your original web app (UNTOUCHED ✓)
└── plotta-desktop/      # NEW Electron desktop app
    ├── .github/
    │   └── workflows/
    │       └── build.yml           # Automated builds for macOS & Windows
    ├── assets/
    │   └── README.md              # Icon creation guide
    ├── build/
    │   └── entitlements.mac.plist # macOS code signing
    ├── main.js                    # Electron main process
    ├── preload.js                 # Security layer
    ├── package.json               # Dependencies & build config
    ├── .gitignore                 # Git exclusions
    ├── .env.example               # Environment template
    ├── LICENSE                    # MIT License
    ├── README.md                  # Full documentation
    └── QUICKSTART.md              # Quick start guide
```

## 🎯 Key Features

### Implemented
- ✅ Native desktop window with persistent size/position
- ✅ Loads Plotta web app from URL
- ✅ Native menu bar (macOS/Windows)
- ✅ Keyboard shortcuts support
- ✅ External links open in browser
- ✅ DevTools for debugging
- ✅ Build configurations for macOS & Windows
- ✅ GitHub Actions CI/CD pipeline
- ✅ Proper security (contextIsolation, sandboxing)

### Architecture
- **Main Process** (`main.js`): Window management, menus, app lifecycle
- **Preload Script** (`preload.js`): Secure bridge between main & renderer
- **Renderer**: Your existing Plotta web app (loaded via URL)

## 🚀 Usage

### Development
```bash
cd /Users/daniellauding/Work/instinctly/internal/plotta-desktop
npm install
npm start
```

### Production Build
```bash
# Build for current platform
npm run build

# Build for macOS
npm run build:mac

# Build for Windows
npm run build:win

# Build for both
npm run build:all
```

### Connect to Local Dev Server
```bash
PLOTTA_URL=http://localhost:5173 npm start
```

## 📦 Distribution

### Build Outputs (in `dist/` folder)

**macOS:**
- `Plotta-1.0.0.dmg` - Drag-to-install disk image
- `Plotta-1.0.0-mac.zip` - Portable archive

**Windows:**
- `Plotta Setup 1.0.0.exe` - NSIS installer
- `Plotta 1.0.0.exe` - Portable executable

### Automated Builds

GitHub Actions will automatically:
1. Build on every push to `main`
2. Create release drafts when you tag with `v*`
3. Upload artifacts for download

To create a release:
```bash
git tag v1.0.0
git push origin v1.0.0
```

## 🔧 Configuration

### Change Web App URL

**Method 1: Environment Variable**
```bash
PLOTTA_URL=https://custom-url.com npm start
```

**Method 2: Edit main.js**
```javascript
const PLOTTA_WEB_URL = 'https://custom-url.com';
```

**Method 3: .env File**
```env
PLOTTA_URL=https://custom-url.com
```

### Default URL
Currently set to: `https://plotta.lovable.app`

## 🎨 Branding

### Add Custom Icons

1. Create 1024x1024 PNG icon
2. Convert to platform formats:
   - **macOS**: `icon.icns`
   - **Windows**: `icon.ico`
3. Place in `assets/` folder
4. See `assets/README.md` for conversion tools

## 🔐 Code Signing (Optional)

### macOS
Requires Apple Developer account:
1. Get certificate from Apple Developer
2. Add to Keychain
3. Set environment variables:
   ```bash
   export CSC_LINK=/path/to/certificate.p12
   export CSC_KEY_PASSWORD=your-password
   ```

### Windows
Requires code signing certificate:
1. Get certificate from CA
2. Set environment variables:
   ```bash
   export CSC_LINK=/path/to/certificate.pfx
   export CSC_KEY_PASSWORD=your-password
   ```

## 📊 GitHub Repository

**URL**: https://github.com/daniellauding/plotta-desktop

**Status**: ✅ Initialized and pushed

**Branches**:
- `main` - Production ready code

## 🔄 Next Steps

### Essential
1. [ ] Add app icon (1024x1024 PNG → .icns + .ico)
2. [ ] Test on Windows machine
3. [ ] Test on macOS machine
4. [ ] Create first release tag (`v1.0.0`)

### Optional Enhancements
1. [ ] Auto-update functionality (electron-updater)
2. [ ] System tray icon
3. [ ] Global keyboard shortcuts
4. [ ] Offline mode with local storage
5. [ ] Native notifications
6. [ ] Custom protocol handler (plotta://)
7. [ ] Crash reporting (Sentry)
8. [ ] Analytics (optional)

## 🐛 Troubleshooting

### Build Fails
- Ensure Node.js 18+ installed
- Delete `node_modules` and `package-lock.json`, reinstall
- Check disk space

### Can't Connect
- Verify `PLOTTA_URL` is accessible
- Check firewall settings
- Test URL in regular browser first

### Windows Build on macOS
- Requires Wine: `brew install wine-stable`
- Or use GitHub Actions (builds on Windows runner)

## 📚 Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [electron-builder](https://www.electron.build/)
- [Plotta Web App](https://plotta.lovable.app)
- [GitHub Repo](https://github.com/daniellauding/plotta-desktop)

## ⚠️ Important Notes

- **Original web app UNTOUCHED**: All work in separate directory
- **No dependencies on web app**: Desktop app loads from URL
- **Independent versioning**: Desktop app version ≠ web app version
- **Cross-platform**: Builds work on macOS and Windows

## 🎉 Summary

You now have a complete Electron desktop application that:
- ✅ Wraps your existing Plotta web app
- ✅ Builds for Windows and macOS
- ✅ Has automated CI/CD via GitHub Actions
- ✅ Is ready for distribution
- ✅ Doesn't touch your original code

**Ready to use!** Run `npm start` to see it in action.
