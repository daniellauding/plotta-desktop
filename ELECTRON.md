# Plotta Desktop App (Electron)

Plotta is now available as a desktop application with automatic updates!

## Features

- ✅ **Auto-Updates**: Automatically checks for and downloads updates
- ✅ **Offline Support**: Works without internet connection (with local data)
- ✅ **Native Performance**: Better performance than web version
- ✅ **System Integration**: Native notifications and menu bar
- ✅ **Cross-Platform**: Available for macOS, Windows, and Linux

## Development

### Running in Development Mode

```bash
npm run electron:dev
```

This will:
1. Start the Vite dev server on port 8080
2. Wait for the server to be ready
3. Launch Electron with hot-reload enabled

### Building for Production

#### Build for Current Platform
```bash
npm run electron:build
```

#### Build for Specific Platforms

**macOS:**
```bash
npm run electron:build:mac
```
Outputs: DMG and ZIP files in `release/`

**Windows:**
```bash
npm run electron:build:win
```
Outputs: NSIS installer and portable EXE in `release/`

**Linux:**
```bash
npm run electron:build:linux
```
Outputs: AppImage and DEB packages in `release/`

## Auto-Updates Setup

### 1. GitHub Releases (Recommended)

The app is configured to use GitHub releases for distribution:

1. **Update package.json**:
   ```json
   "build": {
     "publish": {
       "provider": "github",
       "owner": "your-github-username",
       "repo": "plotta"
     }
   }
   ```

2. **Generate GitHub Token**:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Create token with `repo` scope
   - Set environment variable: `export GH_TOKEN=your_token_here`

3. **Build and Publish**:
   ```bash
   npm run electron:build
   ```

4. **Create GitHub Release**:
   - Tag the release (e.g., `v1.0.0`)
   - Upload the build files from `release/` folder
   - electron-builder will automatically upload to releases if GH_TOKEN is set

### 2. How Auto-Updates Work

1. **On App Launch**: Checks for updates after 3 seconds
2. **Update Available**: Shows notification in bottom-right corner
3. **Download**: User clicks "Download Update" button
4. **Install**: After download, user clicks "Restart & Install"
5. **Automatic**: App restarts and installs the update

### 3. Update Notifications

The app shows a beautiful notification when updates are available:

- **Update Available**: Shows version number and download button
- **Downloading**: Shows progress bar with percentage
- **Ready to Install**: Shows restart button
- **Dismissible**: Users can dismiss and update later

## File Structure

```
plotta/
├── electron/
│   ├── main.js          # Main Electron process
│   └── preload.js       # Preload script (security bridge)
├── src/
│   ├── components/
│   │   └── UpdateNotification.tsx  # Update UI component
│   └── types/
│       └── electron.d.ts # TypeScript definitions
├── dist/                # Built web app (Vite output)
└── release/             # Built desktop apps (Electron output)
```

## Icons

Place your app icons in the `build/` folder:

- **macOS**: `build/icon.icns` (512x512 or larger)
- **Windows**: `build/icon.ico` (256x256 or larger)
- **Linux**: `build/icon.png` (512x512 or larger)

You can use [electron-icon-builder](https://www.npmjs.com/package/electron-icon-builder) to generate icons:

```bash
npx electron-icon-builder --input=./icon.png --output=./build
```

## Code Signing (Production)

### macOS

1. Get Apple Developer Certificate
2. Create entitlements file: `build/entitlements.mac.plist`
3. Sign with:
   ```bash
   export APPLEID=your@email.com
   export APPLEIDPASS=your-app-specific-password
   npm run electron:build:mac
   ```

### Windows

1. Get code signing certificate
2. Set environment variables:
   ```bash
   export CSC_LINK=path/to/certificate.p12
   export CSC_KEY_PASSWORD=certificate_password
   npm run electron:build:win
   ```

## Troubleshooting

### Update Not Working

- Check that `GH_TOKEN` is set correctly
- Ensure GitHub release is published (not draft)
- Check app version matches release tag (e.g., `1.0.0` → `v1.0.0`)
- Look at Electron DevTools console for error messages

### Build Fails

- Run `npm run postinstall` to rebuild native dependencies
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check that icon files exist in `build/` folder

### App Won't Start

- Check that `dist/` folder exists and has files: `npm run build`
- Look for errors in Terminal/Console
- Try running in dev mode first: `npm run electron:dev`

## Environment Variables

- `GH_TOKEN`: GitHub token for publishing releases
- `NODE_ENV`: Set to `development` for dev mode
- `CSC_LINK`: Path to code signing certificate (production)
- `CSC_KEY_PASSWORD`: Certificate password (production)

## Updating the App Version

1. Update `package.json` version: `"version": "1.0.1"`
2. Build new version: `npm run electron:build`
3. Create GitHub release with tag `v1.0.1`
4. Users will automatically receive update notification

## Security

- ✅ Context isolation enabled
- ✅ Node integration disabled
- ✅ Preload script for safe IPC
- ✅ CSP headers in production
- ✅ No remote code execution

## Performance

The Electron app includes optimizations:

- Lazy loading of windows
- GPU acceleration for transforms
- Efficient IPC communication
- Memoized React components
- RAF-throttled pan updates

## Support

For issues or questions:
- Check GitHub Issues
- Review Electron DevTools console
- Enable verbose logging in `electron/main.js`
