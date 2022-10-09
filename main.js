// Modules to control application life and create native browser window
const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const rpath = require("path");
const serve = require("electron-serve");
const loadURL = serve({ directory: "public" });
const nodemailer = require("nodemailer");
const pdf = require("pdf-creator-node");
const fs = require("fs");
const os = require('os');
const { SerialPort, ReadlineParser } = require("serialport");
require("dotenv").config();

const tmpdirPath = os.tmpdir();
const tempdir = fs.realpathSync(tmpdirPath);

let serport;
let parser;
const baudRate = 9600;
let allowedPorts = [
  "/dev/tty.usbmodem143101",
  "/dev/tty.usbmodem143201",
  "/dev/tty.usbmodem144101",
  "COM1",
  "COM2",
  "COM3",
  "/dev/ttyACM0",
  "/dev/ttyACM1"
];

async function listSerialPorts() {
  if (serport) return;
  await SerialPort.list().then((ports, err) => {
    if (err) return;
    ports.some((p) => {
      if (allowedPorts.includes(p.path)) {
        let path = p.path;
        serport = new SerialPort({ path, baudRate });

        serport.on("error", function (err) {
          console.log("SerialPort Error", err);
          serport = undefined;
          parser = undefined;
        });

        parser = serport.pipe(new ReadlineParser());
        parser.on("data", (data) => {
          mainWindow.webContents.send("rfid", data);
        });
      }
    });
  });
}

setInterval(() => {
  listSerialPorts();
}, 5000);

//const { SerialPort, ReadlineParser } = require('serialport')
//const allowedSerialPorts = ["/dev/tty.usbmodem143201"]
//console.log(SerialPort.list())

// Run the command.
//const { portStatus, portList } = listPorts(true);

//let port;
//let parser;

//const path = '/dev/tty.usbmodem143201'
//const baudRate = 9600
//const port = new SerialPort({ path, baudRate })
//const parser = port.pipe(new ReadlineParser())

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
      preload: rpath.join(__dirname, "preload.js"),
      enableRemoteModule: true,
      contextIsolation: false,
    },
    icon: rpath.join(__dirname, "public/favicon.png"),
    show: false,
    autoHideMenuBar: true,
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
  //parser.on('data', data => {
  //  mainWindow.webContents.send('rfid', data);
  //})

  ipcMain.on("sendEmail", (event, mailOptions) => {
    createPdf(mailOptions);
    sendEmail(mailOptions);
    event.returnValue = "email_was_sent"
  });

  //mainWindow.webContents.openDevTools()
  mainWindow.webContents.on("before-input-event", (event, input) => {
    /*
    if (input.control && input.key.toLowerCase() === 'i') {
        console.log('Pressed Control+I')
        event.preventDefault()
    }
    */

    if (input.key.toLowerCase() === "0") {
      mainWindow.webContents.openDevTools();
      event.preventDefault();
    }

    if (input.key.toLowerCase() === "9") {
      mainWindow.setKiosk(!mainWindow.kiosk);
      event.preventDefault();
    }

    if (input.key === "Escape") {
      app.quit();
    }
  });

  // This block of code is intended for development purpose only.
  // Delete this entire block of code when you are ready to package the application.
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5000/");
  } else {
    loadURL(mainWindow);
  }

  // Uncomment the following line of code when app is ready to be packaged.
  // loadURL(mainWindow);

  // Open the DevTools and also disable Electron Security Warning.
  // process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // Emitted when the window is ready to be shown
  // This helps in showing the window gracefully.
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//app.on('ready', createWindow);

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  function enterKiosk() {
    mainWindow.setKiosk(!mainWindow.kiosk);
  }

  if (process.env.IS_PROD === "true") setTimeout(enterKiosk, 500);
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
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

function createPdf(params){
  // Read HTML Template
  const html = fs.readFileSync(__dirname + "/public/templates/template.html", "utf8");
  const avatar = fs.readFileSync(__dirname + `/public/assets/avatar/${params.avatar}.jpg`).toString('base64');
  const stamp = fs.readFileSync(__dirname + "/public/assets/cert/stamp.svg").toString('base64');

  let options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    /*
    header: {
      height: "45mm",
      contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
    },
    footer: {
      height: "28mm",
      contents: {
          first: 'Cover page',
          2: 'Second page', // Any page number is working. 1-based index
          default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          last: 'Last Page'
      }
    }
    */
  };

  let document = {
    html: html,
    data: {
      apiurl: process.env.IS_PROD === "true" ?  process.env.API_URL : process.env.ALT_API_URL,
      avatar: avatar,
      stamp: stamp,
      params: params,
    },
    path: `${tempdir}/wwa.pdf`,
    type: "",
  };

  pdf.create(document, options)
    .then((res) => {
      console.debug(res);
    })
    .catch((error) => {
      console.error(error);
    });
}

function sendEmail(params) {
  var transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  if (process.env.EMAIL_TO !== "") {
    // override user inpout with env setting
    params.mailOptions.to = process.env.EMAIL_TO
    console.info(`Email address was overriden by env variable with ${process.env.EMAIL_TO}`)
  }
  
  params.mailOptions.attachments = [{   // file on disk as an attachment
    filename: "Planetopia.pdf",
    path: `${tempdir}/wwa.pdf`
  }]

  transporter.sendMail(params.mailOptions, function (err, info) {
    if (err) { 
      console.error(err);
    } else {
      console.debug(info);
    }
  });
}
