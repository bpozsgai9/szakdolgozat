const { app, BrowserWindow, dialog, Notification } = require('electron')
const path = require('path')
const fs = require('fs')
const appIcon = 'src/pic/osa.ico'

//cmd args
const process = require('process')
let args = process.argv

const createWindow = () => {
  const window = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: appIcon
  })

  //értesítés
  let sourceNotification = new Notification({
    title: 'Notification from OSA:\nLoad Source File',
    body: 'Please choose a source file to analyze!',
    icon: appIcon
  })


  let outputNotification = new Notification({
    title: 'Notification from OSA:\nLoad Graph File',
    body: 'Please choose a json file to analyze!',
    icon: appIcon
  })

  //fájl másolása
  function copyFileByResponse(response, source) {
    if (!response.canceled) {
      fs.copyFile(response.filePaths[0], path.join(__dirname, source), (err) => {

        if (err) throw err;
        console.log('Copied!');
      });

    } else {
      console.log("No file selected!");
      app.quit()
    }
  }

  function copyFileBySource(from, to) {
    fs.copyFile(from, path.join(__dirname, to), (err) => {

      if (err) throw err;
      console.log('Copied!');
    });
  }

  //forrás dialóg, ha nincs arg
  if (args[1] == null && args[2] == null) {

    sourceNotification.show()
    dialog.showOpenDialog(window, { properties: ['openFile'] })
      .then(sourceRes => copyFileByResponse(sourceRes, 'src/source/source.java'))
      .then(() => {

        //gráf dialóg
        outputNotification.show()
        dialog.showOpenDialog(window, { properties: ['openFile'] })
          .then(graphRes => copyFileByResponse(graphRes, 'src/source/output.json'))
          .then(() => window.loadFile('view/index.html'))
      })

  } else {

    new Promise((resolve) => {
      copyFileBySource(args[1], 'src/source/source.java')
      resolve();
    })
    .then(() => copyFileBySource(args[2], 'src/source/output.json'))
    .finally(() => window.loadFile('view/index.html'))

  }
}

app.whenReady()
  .then(() => {
    createWindow()

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

app.on('window-all-closed', () => {

  fs.unlinkSync(path.join(__dirname, 'src/source/source.java'))
  fs.unlinkSync(path.join(__dirname, 'src/source/output.json'))
  if (process.platform !== 'darwin') app.quit()
})

