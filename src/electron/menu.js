const electron = require('electron');
// Module to control application life.
const { Menu, dialog, BrowserWindow } = electron;
const fs = require('fs');

const isMac = process.platform === 'darwin';

const menuTemplate = (window) => {
  return (
      [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open CSV...',
          accelerator: isMac ? 'Command+O' : 'Ctrl+O',
          click() {
            const config = {
              properties: ['openFile'],
              filters: [{ name: 'CSV', extensions: ['csv']}]
            };
            const handleFilePath = (path) => {
              fs.readFile(path[0], 'utf8', (err, data) => {
                console.log(err);
                console.log(data);
                window.webContents.send('csv:open', data);
              })
            }
            dialog.showOpenDialog(config, handleFilePath);
          }
        },
        {
          label: 'Quit',
          accelerator: isMac ? 'Command+Q' : 'Ctrl+Q',
          click() {
            app.quit();
          }
        },
      ]
    },
    {
      label: 'Development',
      submenu: [
        {
          label: 'Toggle Dev Tools',
          accelerator: 'Command+T',
          click() {
            window.toggleDevTools();
          }
        }
      ]
    }
  ]
  );
}

module.exports = menuTemplate;