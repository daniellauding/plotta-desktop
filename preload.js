const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  // App info
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getPlatform: () => ipcRenderer.invoke('get-platform'),

  // Update-related APIs
  checkForUpdates: () => ipcRenderer.send('check-for-updates'),
  downloadUpdate: () => ipcRenderer.send('download-update'),
  installUpdate: () => ipcRenderer.send('install-update'),

  // Listen for update events
  onUpdateStatus: (callback) => {
    ipcRenderer.on('update-status', (event, data) => callback(data));
  },

  // Remove listeners
  removeUpdateListener: () => {
    ipcRenderer.removeAllListeners('update-status');
  },

  // Add more APIs here as needed
  isDesktop: true,
});

// Add desktop-specific styling
window.addEventListener('DOMContentLoaded', () => {
  // Add a class to body to indicate this is the desktop app
  document.body.classList.add('electron-app');
});
