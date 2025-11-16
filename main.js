const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');
const { autoUpdater } = require('electron-updater');

// Initialize electron-store for persistent settings
const store = new Store();

let mainWindow;

// Configure auto-updater
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

// Check if running in development mode
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

// Your deployed web app URL - always use production URL
// Set PLOTTA_URL env variable to override (e.g., for localhost testing)
const PLOTTA_WEB_URL = process.env.PLOTTA_URL || 'https://app.plotta.io';

function createWindow() {
  // Get saved window bounds or use defaults
  const windowBounds = store.get('windowBounds', {
    width: 1400,
    height: 900,
  });

  mainWindow = new BrowserWindow({
    ...windowBounds,
    minWidth: 800,
    minHeight: 600,
    movable: true,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
    },
    titleBarStyle: process.platform === 'darwin' ? 'default' : undefined, // Standard title bar
    backgroundColor: '#1a1a1a',
    show: false, // Don't show until ready
    frame: true, // Show window frame
  });

  // Load the web app
  console.log('🚀 Loading Plotta from:', PLOTTA_WEB_URL);
  mainWindow.loadURL(PLOTTA_WEB_URL);

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Save window bounds on resize/move
  mainWindow.on('resize', saveBounds);
  mainWindow.on('move', saveBounds);

  // Handle window close
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Open external links in browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Create application menu
  createMenu();
}

function saveBounds() {
  if (mainWindow) {
    store.set('windowBounds', mainWindow.getBounds());
  }
}

function createMenu() {
  const template = [
    {
      label: 'Plotta',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            await shell.openExternal('https://github.com/daniellauding/plotta-desktop');
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Auto-updater event handlers
autoUpdater.on('checking-for-update', () => {
  console.log('Checking for update...');
  sendStatusToWindow('checking-for-update');
});

autoUpdater.on('update-available', (info) => {
  console.log('Update available:', info);
  sendStatusToWindow('update-available', info);
});

autoUpdater.on('update-not-available', (info) => {
  console.log('Update not available:', info);
  sendStatusToWindow('update-not-available');
});

autoUpdater.on('error', (err) => {
  console.error('Update error:', err);
  sendStatusToWindow('update-error', err);
});

autoUpdater.on('download-progress', (progressObj) => {
  console.log(`Download progress: ${progressObj.percent}%`);
  sendStatusToWindow('download-progress', progressObj);
});

autoUpdater.on('update-downloaded', (info) => {
  console.log('Update downloaded:', info);
  sendStatusToWindow('update-downloaded', info);
});

function sendStatusToWindow(event, data) {
  if (mainWindow) {
    mainWindow.webContents.send('update-status', { event, data });
  }
}

// App lifecycle
app.whenReady().then(() => {
  createWindow();

  // Check for updates after 3 seconds (don't check immediately)
  if (!isDev) {
    setTimeout(() => {
      autoUpdater.checkForUpdates();
    }, 3000);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('get-platform', () => {
  return process.platform;
});

ipcMain.on('check-for-updates', () => {
  if (!isDev) {
    autoUpdater.checkForUpdates();
  }
});

ipcMain.on('download-update', () => {
  if (!isDev) {
    autoUpdater.downloadUpdate();
  }
});

ipcMain.on('install-update', () => {
  if (!isDev) {
    autoUpdater.quitAndInstall(false, true);
  }
});
