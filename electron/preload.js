import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  executeCommand: (options) => {
    const channelId = `cmd_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    
    ipcRenderer.on(`cmd_data_${channelId}`, (_event, data, isError) => {
      if (options.onData) options.onData(data, isError);
    });

    ipcRenderer.once(`cmd_exit_${channelId}`, (_event, code) => {
      if (options.onExit) options.onExit(code);
      ipcRenderer.removeAllListeners(`cmd_data_${channelId}`);
    });

    ipcRenderer.send('execute-command', {
      channelId,
      cmd: options.cmd,
      cwd: options.cwd,
    });
  },
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (filePath, content) => ipcRenderer.invoke('write-file', filePath, content),
  listDirectory: (dirPath) => ipcRenderer.invoke('list-directory', dirPath),
});
