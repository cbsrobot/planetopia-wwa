# Planetopia Client Application

# Setup

Clone github repo
```
git clone https://github.com/cbsrobot/planetopia-wwa.git
cd planetopia-wwa
```

Add a .env file on the root level with following content
```shell
STATION=0                         # station id 0-5
IS_PROD=false                     # used for dev
API_URL=http://10.7.0.111:3000    # host running planetopia-server
ALT_API_URL=http://127.0.0.1:3000 # alternative api url for dev
EMAIL_HOST=smtp.server.domain     # email provider
EMAIL_USER=user@provider.domain   # email login
EMAIL_PASSWORD=password           # email password
EMAIL_TO=user@provider.domain     # used to override user input and send all emails to this address
```
-> replace email data with correct credentials

# Developement

```
git pull  
npm i  
npm run electron-dev  
```

# Startup Script

Startup script to run autostart on Linux

```shell
#!/bin/bash

export OPENSSL_CONF=/dev/null # used for phantomjs see: https://github.com/ariya/phantomjs/issues/15449
export DISPLAY=:0
export PATH=/home/planetopia-12/.nvm/versions/node/v16.17.1/bin:$PATH
echo $(date) startup >> /home/planetopia-12/startup.log
source /home/planetopia-12/.nvm/nvm.sh
/home/planetopia-12/.nvm/nvm.sh
cd /home/planetopia-12/Documents/planetopia-wwa
git pull >> /home/planetopia-12/startup.log
npm i 2>&1 >> /home/planetopia-12/startup.log
npm run electron-dev 2>&1 >> /home/planetopia-12/startup.log
```

# Troubleshoot

* On Linux allow user to access serial port : `sudo usermod -a -G dialout $USER`
* if node-html-pdf thows an error (using phantomjs) add following line before starting the app: `export OPENSSL_CONF=/dev/null`

<br>
<hr>
<h3>Original Template Readme<h3>
<hr>
<br>
<br>


<div align="center">
<img alt="Electron Svelte Crossover Banner" src="https://raw.githubusercontent.com/soulehshaikh99/assets/master/create-electron-framework-app/readme/svg/Electron_Svelte.svg" width="580" />
</div>
<br />
The boilerplate code to get started creating Cross-platform Desktop Apps with Electron and Svelte as front-end technology.
<br />
<br />
<div align="center">

[![forthebadge](http://forthebadge.com/images/badges/built-by-developers.svg)](http://forthebadge.com)&nbsp;&nbsp;&nbsp;&nbsp;[![forthebadge](http://forthebadge.com/images/badges/makes-people-smile.svg)](http://forthebadge.com)<br />

[![forthebadge](http://forthebadge.com/images/badges/uses-html.svg)](http://forthebadge.com)&nbsp;&nbsp;&nbsp;[![forthebadge](http://forthebadge.com/images/badges/uses-css.svg)](http://forthebadge.com)&nbsp;&nbsp;&nbsp;[![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

</div>

## ✒️ Overview

The aim of this project is to provide Web Developers using `svelte` the power to create cross-platform desktop apps using `electron`.

#### 🧐 What packages does the project use?

**`electron`** enables you to create desktop applications with pure JavaScript by providing a runtime with rich native (operating system) APIs. You could see it as a variant of the Node.js runtime that is focused on desktop applications instead of web servers.

**`electron-builder`** is used as a complete solution to package and build a ready for distribution (supports Numerous target formats) Electron app with "auto update" support out of the box.

**`electron-serve`** is used for Static file serving for Electron apps.

**`svelte`** is a radical new approach to building user interfaces. Whereas traditional frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app. Instead of using techniques like virtual DOM diffing, Svelte writes code that surgically updates the DOM when the state of your app changes.

**`concurrently`** is used to run multiple commands concurrently.

**`wait-on`** is used as it can wait for sockets, and http(s) resources to become available.
<br />

## 🚀 Getting Started

**Note:** If you wish to use npm over yarn then modify `package.json` by replacing `yarn` with `npm` in `electron-dev` and `preelectron-pack` scripts.
But I strongly recommend using <em>yarn</em> as it is a better choice when compared to <em>npm</em>.

### 🤓 Use this boilerplate

```bash
# Clone the Project

# Use degit scaffolding tool
$ npx degit soulehshaikh99/create-svelte-electron-app create-svelte-electron-app
# or GitHub CLI Users
$ gh repo clone https://github.com/soulehshaikh99/create-svelte-electron-app.git
# or Normal Git Users
$ git clone https://github.com/soulehshaikh99/create-svelte-electron-app.git

# Switch location to the cloned directory
$ cd create-svelte-electron-app

# Install dependencies
$ yarn # or npm install

# Run your app
$ yarn electron-dev # or npm run electron-dev

# Package Your App
$ yarn electron-pack # or npm run electron-pack
```

### 💫 Create this boilerplate from scratch (Manual Setup)

#### 1) Use degit scaffolding tool to get started with svelte template.

```bash
$ npx degit sveltejs/template create-svelte-electron-app
```

#### 2) Switch to project directory

```bash
$ cd create-svelte-electron-app
```

#### 3) Move all dependencies to devDependencies using IDE / Text Editor

```bash
# It should look something like this
"dependencies": {}
"devDependencies": {
  "@rollup/plugin-commonjs": "^17.0.0",
  "@rollup/plugin-node-resolve": "^11.0.0",
  "rollup": "^2.3.4",
  "rollup-plugin-css-only": "^3.1.0",
  "rollup-plugin-livereload": "^2.0.0",
  "rollup-plugin-svelte": "^7.0.0",
  "rollup-plugin-terser": "^7.0.0",
  "sirv-cli": "^1.0.0"
  "svelte": "^3.0.0"
}
```

#### 4) Install & Update all Dependencies at the same time

```bash
$ yarn add --dev @rollup/plugin-commonjs@latest @rollup/plugin-node-resolve@latest rollup@latest rollup-plugin-css-only@latest rollup-plugin-livereload@latest rollup-plugin-svelte@latest rollup-plugin-terser@latest sirv-cli@latest svelte@latest
# npm i -D @rollup/plugin-commonjs@latest @rollup/plugin-node-resolve@latest rollup@latest rollup-plugin-css-only@latest rollup-plugin-livereload@latest rollup-plugin-svelte@latest rollup-plugin-terser@latest sirv-cli@latest svelte@latest
```

#### 5) Install Development Dependencies

```bash
$ yarn add --dev electron electron-builder wait-on concurrently
# npm i -D electron electron-builder wait-on concurrently
```

#### 6) Install Production Dependency

```bash
$ yarn add electron-serve # or npm i electron-serve
```

#### 7) Your dependencies should look something like this

```json
"dependencies": {
  "electron-serve": "^1.1.0"
},
"devDependencies": {
  "@rollup/plugin-commonjs": "^20.0.0",
  "@rollup/plugin-node-resolve": "^13.0.4",
  "concurrently": "^6.2.1",
  "electron": "^13.1.9",
  "electron-builder": "^22.11.7",
  "rollup": "^2.56.2",
  "rollup-plugin-css-only": "^3.1.0",
  "rollup-plugin-livereload": "^2.0.5",
  "rollup-plugin-svelte": "^7.1.0",
  "rollup-plugin-terser": "^7.0.2",
  "sirv-cli": "^1.0.12",
  "svelte": "^3.42.1",
  "wait-on": "^6.0.0"
}
```

#### 8) Download the app icon

[favicon.png](https://raw.githubusercontent.com/soulehshaikh99/assets/master/framework-icons/svelte/favicon.png) and place it in the public directory, overwriting the original (the original one is too small for packaging app, electron-builder will raise an error).

#### 9) Create main.js file (serves as entry point for Electron App's Main Process)

```bash
# Windows Users
$ fsutil file createnew main.js 0
# notepad main.js

# Linux and macOS Users
$ touch main.js
```

#### 10) Paste the below code in main.js file

```js
// Modules to control application life and create native browser window
const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const serve = require('electron-serve');
const loadURL = serve({ directory: 'public' });

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
            preload: path.join(__dirname, 'preload.js'),
            // enableRemoteModule: true,
            // contextIsolation: false
        },
        icon: path.join(__dirname, 'public/favicon.png'),
        show: false
    });

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
```

#### 11) Create main.js file (serves as entry point for Electron App's Main Process)

```bash
# Windows Users
$ fsutil file createnew preload.js 0
# notepad preload.js

# Linux and macOS Users
$ touch preload.js
```

#### 12) Paste the below code in preload.js file

```js
console.log('Hello from preload.js file!');
```

#### 13) Update the script section of `package.json`

```bash
# Add this scripts
"electron": "wait-on http://localhost:5000 && electron .",
"electron-dev": "concurrently \"yarn run dev\" \"yarn run electron\"",
"preelectron-pack": "yarn run build",
"electron-pack": "electron-builder"

# You should end up with something similar
"scripts": {
  "build": "rollup -c",
  "dev": "rollup -c -w",
  "start": "sirv public --no-clear",
  "electron": "wait-on http://localhost:5000 && electron .",
  "electron-dev": "concurrently \"yarn run dev\" \"yarn run electron\"",
  "preelectron-pack": "yarn run build",
  "electron-pack": "electron-builder"
}
```

#### 14) Add the following configuration in `package.json`

**Note:** build configuration is used by electron-builder, modify it if you wish to add more packaging and native distribution options for different OS Platforms.

```bash
"name": "create-svelte-electron-app",   # By default it is svelte-app
"main": "main.js",  # Application Entry Point, please verify entry point is set to main.js
"build": {
  "icon": "public/favicon.png",
  "productName": "Svelte and Electron App",
  "files": [
    "public/**/*",
    "main.js"
  ],
  "win": {},  # Windows Specific Configuration
  "linux": {},  # Linux Specific Configuration
  "mac": {}  # MacOs Specific Configuration
}
```

#### 15) Test drive your app

```bash
# Run your app
$ yarn electron-dev # or npm run electron-dev

# Package Your App
$ yarn electron-pack # or npm run electron-pack
```

### 💯 Result

<div align="center">
<img alt="Electron Svelte Window Screeenshot" src="https://raw.githubusercontent.com/soulehshaikh99/assets/master/create-electron-framework-app/readme/png/create-svelte-electron-app.png" />
</div>

<h3>😍 Made with ❤️ from Souleh</h3>

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
<br/>

<h3>📋 License: </h3>
Licensed under the <a href="https://github.com/soulehshaikh99/create-svelte-electron-app/blob/master/LICENSE">MIT License</a>.
