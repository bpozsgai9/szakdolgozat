const { app, BrowserWindow, dialog, Notification } = require('electron')
const path = require('path')
const fs = require('fs');

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: 'src/pic/osa.ico'
  })
  
  //értesítés
  let sourceNotification = new Notification({ 
    title: 'Notification from OSA:\nLoad Source File',
    body: 'Please choose a source file to analyze!'
  })

  //TODO:Ezt nem jelzi ki, innen folytatás
  let outputNotification = new Notification({ 
    title: 'Notification from OSA:\nLoad Graph File',
    body: 'Please choose a json file to analyze!'
  })

  //forrás dialóg
  sourceNotification.show()
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

app.whenReady()
.then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  
  fs.unlinkSync('src/source/source.java');
  if (process.platform !== 'darwin') app.quit()
})

