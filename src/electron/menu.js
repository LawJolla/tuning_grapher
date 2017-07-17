const electron = require('electron');
// Module to control application life.
const { Menu, dialog, BrowserWindow } = electron;
const fs = require('fs');

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open CSV...',
        accelerator: process.platform === 'darwin' ? 'Command+O' : 'Ctrl+O',
        click() {
          const config = {
            properties: ['openFile'],
            filters: [{ name: 'CSV', extensions: ['csv']}]
          };
          const handleFilePath = (path) => {
            fs.readFile(path[0], 'utf8', (err, data) => {
              console.log(err);
              console.log(data);
              const focusedWindow = BrowserWindow.getFocusedWindow();
              focusedWindow.webContents.send('csv:open', data);
            })
          }
          dialog.showOpenDialog(config, handleFilePath);
        }
      },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
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
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  }
];
if (process.platform === 'darwin') {
  menuTemplate.unshift({});
}

module.exports = menuTemplate;