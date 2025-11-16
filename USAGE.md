# How to Use Plotta Desktop

## 🎯 Quick Start

### Option 1: Development Mode (Local)

Test with your local development server:

```bash
# 1. Start your Plotta web app dev server (in the plotta/ directory)
cd /Users/daniellauding/Work/instinctly/internal/plotta
npm run dev

# 2. Start the desktop app (in the plotta-desktop/ directory)
cd /Users/daniellauding/Work/instinctly/internal/plotta-desktop
npm start
```

The app will automatically load `http://localhost:8081` (or whatever port your dev server uses).

### Option 2: Production Build

Use your deployed Netlify app:

```bash
# Build the app
npm run pack:mac

# Run the built app
open dist/mac-arm64/Plotta.app
```

This will load `https://plotta.netlify.app` (or `https://plotta.io` when DNS is ready).

## 🌐 Changing the URL

### Method 1: Environment Variable (Recommended)

```bash
# Use a custom URL
PLOTTA_URL=https://plotta.io npm start

# Use staging
PLOTTA_URL=https://staging.plotta.netlify.app npm start

# Use localhost with custom port
PLOTTA_URL=http://localhost:3000 npm start
```

### Method 2: Edit main.js

Open `main.js` and change line 15:

```javascript
const PLOTTA_WEB_URL = process.env.PLOTTA_URL || 'https://your-custom-url.com';
```

### Method 3: .env File

Create a `.env` file:

```env
PLOTTA_URL=https://plotta.io
```

Then run:
```bash
npm start
```

## 🔄 Auto-Detection

The app automatically detects the environment:

- **Development Mode** (`npm start`): Loads `http://localhost:8081`
- **Production Build** (`open dist/`): Loads `https://plotta.netlify.app`

## 📱 How It Works

```
┌─────────────────────────────────┐
│   Electron Desktop App          │
│   (Native Window)               │
│                                 │
│  ┌───────────────────────────┐  │
│  │                           │  │
│  │   Plotta Web App         │  │
│  │   (Loaded from URL)      │  │
│  │                           │  │
│  │   - Canvas                │  │
│  │   - Stickies             │  │
│  │   - All features         │  │
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
│  Native Features:               │
│  - Menu Bar                     │
│  - Window Controls              │
│  - Keyboard Shortcuts           │
│  - Persistent Window Size       │
└─────────────────────────────────┘
```

## 🚀 Distribution Workflow

### For Users (Simple)

1. Build the app:
   ```bash
   npm run build:mac
   ```

2. Share the DMG:
   ```bash
   dist/Plotta-1.0.0.dmg
   ```

3. Users install like any Mac app:
   - Double-click DMG
   - Drag to Applications
   - Done! (Loads plotta.netlify.app automatically)

### For You (Development)

1. Make changes to your web app in `plotta/`
2. Deploy to Netlify
3. Desktop app automatically gets the updates (it's loading from URL)
4. No need to rebuild desktop app unless you change Electron code

## 🔧 Troubleshooting

### Can't Connect to Web App

**Problem:** App shows "Publish or update your Lovable project"

**Solutions:**
1. Check the URL is correct:
   ```bash
   # Development
   PLOTTA_URL=http://localhost:8081 npm start

   # Production
   PLOTTA_URL=https://plotta.netlify.app npm start
   ```

2. Verify your web app is deployed:
   - Visit https://plotta.netlify.app in a browser
   - Make sure it loads correctly

3. Check your local dev server is running:
   ```bash
   cd /Users/daniellauding/Work/instinctly/internal/plotta
   npm run dev
   ```

### Wrong Port

If your dev server runs on a different port (e.g., 5173, 3000):

```bash
PLOTTA_URL=http://localhost:YOUR_PORT npm start
```

### Network Issues

The app needs internet to load from Netlify. For offline:
1. Use localhost development mode
2. Or implement offline mode (future feature)

## 🎨 Customization

### Update Branding

When DNS is ready for `plotta.io`, update `main.js`:

```javascript
const PLOTTA_WEB_URL = process.env.PLOTTA_URL || (isDev ? 'http://localhost:8081' : 'https://plotta.io');
```

Then rebuild:
```bash
npm run build:mac
```

### Add Custom Features

Want to add desktop-specific features?
- Edit `main.js` - Main process (menus, windows)
- Edit `preload.js` - Bridge to web app
- Edit `package.json` - Build configuration

## 📊 Current Configuration

**Development URL:** `http://localhost:8081`
**Production URL:** `https://plotta.netlify.app`
**Future URL:** `https://plotta.io` (when DNS ready)

## ✨ Tips

1. **Keep it simple:** Desktop app just wraps your web app
2. **Update web app:** Changes auto-reflect (no desktop rebuild needed)
3. **Test locally:** Always test with localhost first
4. **Build once:** Only rebuild desktop when changing Electron code

## 🎯 Common Commands

```bash
# Development
npm start                    # Load localhost:8081

# Custom URL
PLOTTA_URL=https://plotta.io npm start

# Build
npm run pack:mac            # Fast build for testing
npm run build:mac           # Full DMG installer

# Clean
rm -rf dist/                # Remove old builds
rm -rf node_modules/        # Clean install
npm install                 # Reinstall
```
