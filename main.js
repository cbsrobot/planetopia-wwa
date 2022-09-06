// Modules to control application life and create native browser window
const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const rpath = require('path');
const serve = require('electron-serve');
const loadURL = serve({ directory: 'public' });

const { SerialPort, ReadlineParser } = require('serialport')
const path = '/dev/tty.usbserial-14120'
const baudRate = 9600
const port = new SerialPort({ path, baudRate })
const parser = port.pipe(new ReadlineParser())

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function isDev() {
    return !app.isPackaged;
}

function createWindow() {    
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: rpath.join(__dirname, 'preload.js'),
            enableRemoteModule: true,
            contextIsolation: false
        },
        icon: rpath.join(__dirname, 'public/favicon.png'),
        show: false
    });

    /*
    // receive data from renderer
    ipcMain.on('set-title', (event, title) => {
      const webContents = event.sender
      const win = BrowserWindow.fromWebContents(webContents)
      win.setTitle(title)
    })
    */
    
    // send data to renderer
    parser.on('data', data => {
      mainWindow.webContents.send('rfid', data);
    })

    // This block of code is intended for development purpose only.
    // Delete this entire block of code when you are ready to package the application.
    if (isDev()) {
        mainWindow.loadURL('http://localhost:5000/');
    } else {
        loadURL(mainWindow);
    }
    
    // Uncomment the following line of code when app is ready to be packaged.
    // loadURL(mainWindow);

    // Open the DevTools and also disable Electron Security Warning.
    // process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
    // mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });

    // Emitted when the window is ready to be shown
    // This helps in showing the window gracefully.
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow()
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


/*
ipcMain.on('ping-good', event => {
  // It's so good because below have a delay 5s to execute, and this don't lock rendereder :)
  setTimeout(() => {
    console.log('GOOD finshed!')
    // Send reply to a renderer
    event.sender.send('ping-good-reply', 'pong')
  }, 5000)
})
*/

