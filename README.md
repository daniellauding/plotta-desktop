# Plotta Desktop

Desktop application for Plotta - A collaborative sticky notes canvas built with Electron.

## Features

- 🖥️ Native desktop app for Windows and macOS
- 🔄 Wraps the Plotta web application
- 💾 Persistent window size and position
- 🎨 Native menus and keyboard shortcuts
- 🚀 Fast and lightweight

## Development

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm start
```

### Environment Variables

Create a `.env` file in the root directory (optional):

```
PLOTTA_URL=https://plotta.lovable.app
NODE_ENV=development
```

## Building

### Build for current platform

```bash
npm run build
```

### Build for specific platform

```bash
# macOS
npm run build:mac

# Windows
npm run build:win

# Both platforms
npm run build:all
```

### Build outputs

Built applications will be in the `dist/` directory:
- **macOS**: `.dmg` installer and `.zip` archive
- **Windows**: `.exe` installer and portable `.exe`

## Project Structure

```
plotta-desktop/
├── main.js           # Electron main process
├── preload.js        # Preload script for security
├── package.json      # Dependencies and build config
├── assets/           # Icons and images
│   ├── icon.icns    # macOS icon
│   └── icon.ico     # Windows icon
└── build/           # Build configuration
    └── entitlements.mac.plist
```

## Configuration

The app loads the Plotta web application from the URL specified in `PLOTTA_URL` environment variable, defaulting to `https://plotta.lovable.app`.

To point to a local development server:

```bash
PLOTTA_URL=http://localhost:5173 npm start
```

## Features to Add

- [ ] System tray icon for quick access
- [ ] Global keyboard shortcuts
- [ ] Auto-updates
- [ ] Offline mode with local storage
- [ ] Custom protocol handler (plotta://)
- [ ] Native notifications
- [ ] Export/Import functionality

## Tech Stack

- **Electron** - Desktop app framework
- **electron-builder** - Build and packaging
- **electron-store** - Persistent settings storage

## License

MIT

## Links

- Web App: https://plotta.lovable.app
- GitHub: https://github.com/daniellauding/plotta-desktop
- Issues: https://github.com/daniellauding/plotta-desktop/issues
