const { app, BrowserWindow, dialog } = require('electron')
const path = require('path')
const fs = require('fs');

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  dialog.showOpenDialog(window, {properties: ['openFile']})
  .then((res) => {
      if (!res.canceled) {

        fs.copyFile(res.filePaths[0], 'src/source/source.java', (err) => {
          
          if (err) throw err;
          console.log('source.txt was copied to destination.txt');
        });
        

      } else {
          console.log("No file selected!");
      }
  }).then(() => {
    window.loadFile('view/index.html')
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

