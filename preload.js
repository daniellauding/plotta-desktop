const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  // App info
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getPlatform: () => ipcRenderer.invoke('get-platform'),

  // Add more APIs here as needed
  isDesktop: true,
});

// Add desktop-specific styling
window.addEventListener('DOMContentLoaded', () => {
  // Add a class to body to indicate this is the desktop app
  document.body.classList.add('electron-app');
});
