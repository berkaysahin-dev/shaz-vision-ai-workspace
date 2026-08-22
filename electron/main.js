import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import fs from 'fs/promises';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1200,
    minHeight: 800,
    titleBarStyle: 'hidden',
    titleBarOverlay: false,
    frame: false,
    backgroundColor: '#05070B',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

// ==========================================
// IPC HANDLERS FOR REAL TERMINAL & FILESYSTEM
// ==========================================

// 1. Open Directory Dialog
ipcMain.handle('select-directory', async () => {
  if (!mainWindow) return null;
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
    title: 'Select Project Workspace Directory',
  });
  if (result.canceled || !result.filePaths.length) return null;
  return result.filePaths[0];
});

// 2. Real Shell Command Execution (PowerShell on Windows, Bash on Unix)
ipcMain.on('execute-command', (event, { channelId, cmd, cwd }) => {
  const isWindows = process.platform === 'win32';
  const shell = isWindows ? 'powershell.exe' : 'bash';
  const args = isWindows ? ['-NoLogo', '-NoProfile', '-Command', cmd] : ['-c', cmd];
  const workDir = cwd || process.cwd();

  try {
    const child = spawn(shell, args, {
      cwd: workDir,
      env: { ...process.env, FORCE_COLOR: '1' },
    });

    child.stdout.on('data', (data) => {
      event.sender.send(`cmd_data_${channelId}`, data.toString(), false);
    });

    child.stderr.on('data', (data) => {
      event.sender.send(`cmd_data_${channelId}`, data.toString(), true);
    });

    child.on('close', (code) => {
      event.sender.send(`cmd_exit_${channelId}`, code || 0);
    });

    child.on('error', (err) => {
      event.sender.send(`cmd_data_${channelId}`, `[Process Error: ${err.message}]\n`, true);
      event.sender.send(`cmd_exit_${channelId}`, 1);
    });
  } catch (err) {
    event.sender.send(`cmd_data_${channelId}`, `[Execution Exception: ${err.message}]\n`, true);
    event.sender.send(`cmd_exit_${channelId}`, 1);
  }
});

// 3. Read File from disk
ipcMain.handle('read-file', async (_event, filePath) => {
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch (err) {
    return null;
  }
});

// 4. Write File to disk
ipcMain.handle('write-file', async (_event, filePath, content) => {
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    return true;
  } catch (err) {
    return false;
  }
});

// 5. List Directory
ipcMain.handle('list-directory', async (_event, dirPath) => {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    return entries.map((e) => ({
      name: e.name,
      isDirectory: e.isDirectory(),
      path: path.join(dirPath, e.name),
    }));
  } catch (err) {
    return [];
  }
});

// App Lifecycle
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
