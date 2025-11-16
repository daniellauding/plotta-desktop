# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies

```bash
cd /Users/daniellauding/Work/instinctly/internal/plotta-desktop
npm install
```

### 2. Run the App

```bash
npm start
```

The desktop app will launch and load your Plotta web app.

### 3. Build Installers

```bash
# For your current platform (macOS)
npm run build

# For Windows (on macOS with Wine installed)
npm run build:win

# For both platforms
npm run build:all
```

## 📁 Project Location

```
/Users/daniellauding/Work/instinctly/internal/
├── plotta/          # Your web app (UNTOUCHED)
└── plotta-desktop/  # New Electron app (THIS PROJECT)
```

## 🔧 Development Tips

### Run with Local Dev Server

If you want to test with your local Plotta development server:

```bash
PLOTTA_URL=http://localhost:5173 npm start
```

### Enable DevTools

DevTools are automatically open in development mode. To toggle:
- macOS: `Cmd + Option + I`
- Windows: `Ctrl + Shift + I`

### Debugging

Check the Electron console for any errors:
```bash
# Run with debug output
DEBUG=* npm start
```

## 📦 Build Outputs

After running `npm run build`, check the `dist/` folder:

**macOS:**
- `Plotta-1.0.0.dmg` - Installer for macOS
- `Plotta-1.0.0-mac.zip` - Portable archive

**Windows:**
- `Plotta Setup 1.0.0.exe` - Installer for Windows
- `Plotta 1.0.0.exe` - Portable executable

## 🎨 Customization

### Change App Icon

1. Create a 1024x1024 PNG icon
2. Convert to `.icns` (macOS) and `.ico` (Windows)
3. Place in `assets/` folder
4. See `assets/README.md` for detailed instructions

### Change Web App URL

Edit `main.js` line 13:
```javascript
const PLOTTA_WEB_URL = 'https://your-custom-url.com';
```

Or use environment variable:
```bash
PLOTTA_URL=https://staging.plotta.app npm start
```

## 🐛 Troubleshooting

### App Won't Start
- Check Node.js version: `node --version` (needs 18+)
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Build Fails
- Make sure electron-builder is installed: `npm install electron-builder --save-dev`
- Check you have enough disk space for builds

### Can't Connect to Web App
- Verify the URL in `.env` or environment variable
- Check your internet connection
- Try loading the URL in a regular browser first

## 🔗 Next Steps

1. Push to GitHub: `git push -u origin main`
2. Set up GitHub Actions for automated builds
3. Configure code signing for macOS/Windows
4. Add auto-update functionality

## 📚 Resources

- [Electron Docs](https://www.electronjs.org/docs)
- [electron-builder Docs](https://www.electron.build/)
- [Plotta Web App](https://plotta.lovable.app)
