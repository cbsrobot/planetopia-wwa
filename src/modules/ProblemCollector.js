const API_URL = process.env.IS_PROD === "true" ? process.env.API_URL : process.env.ALT_API_URL;

import { writable, derived } from "svelte/store";
const { ipcRenderer } = require("electron");
const path = require("path");

// Simple electron logger from https://github.com/megahertz/electron-log
// Logs can be found on the desktop
const logger = require("electron-log");

// Library that gets information about latest commit
const git = require('git-last-commit');

// Exports for UI error window
export const showError = writable(false);
const _errorMessage = writable("");
export const errorMessage = derived(_errorMessage, ($errorMessage) => $errorMessage);

export function reportError(message) {
  _errorMessage.set(message);
  showError.set(true);
  logToErrorFile(message);
}

ipcRenderer.on("mainError", (event, response) => {
  reportError(response)
});

ipcRenderer.on("mainLog", (event, response) => {
  console.log(response)
});

setInterval(checkConnection, 1000);
let connected = true;
let lostDate;
function checkConnection() {

  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), 1000);

  fetch(API_URL, { method: 'GET', signal: abortController.signal })
    .then(response => response.ok)
    .then(ok => {
      if (ok && !connected) {
        const offlineTime = (Date.now() - lostDate) / 1000; // in seconds
        logToNetworkFile(`server connection resumed (offline time ${Math.round(offlineTime)}s)`)
        connected = true;
      }
    })
    .catch(error => {
      if (connected) {
        logToNetworkFile("server connection lost")
        connected = false
        lostDate = Date.now()
      }
    });
}


const ifs = require('os').networkInterfaces();
const ipToken = Object.keys(ifs)
  .map(x => ifs[x].filter(x => x.family === 'IPv4' && !x.internal)[0])
  .filter(x => x)[0]?.address.split(".").at(-1) || "000"


const names = ["Intro", "Kleidung", "Wohnen", "Mobilität", "Ernährung", "Auswertung"]
const stationName = names[parseInt(process.env.STATION)]

const date = new Date()
const dateStr = date.toISOString().split('T')[0]
const errorFilePath = `Desktop/${stationName}-IP-${ipToken}/${dateStr}-${stationName}-${ipToken}-Error.log`
const networkfilePath = `Desktop/${stationName}-IP-${ipToken}/${dateStr}-${stationName}-${ipToken}-Network.log`

function logToErrorFile(message) {

  // set right logging path
  logger.transports.file.resolvePath = (variables) => {
    return path.join(variables.home, errorFilePath);
  }

  // logger.debug("---------------------------------------------------")
  // logger.debug("")
  logger.error(message);
  // logger.debug("")

  // // Append recent logs of browser console
  // logger.debug("--------------------Log History--------------------")
  // logger.debug("")
  // console.logHistory.forEach(args => {
  //   logger.debug.apply(logger.debug, args)
  // });
  // logger.debug("")
}

function logToNetworkFile(message) {
  // set right logging path
  logger.transports.file.resolvePath = (variables) => {
    return path.join(variables.home, networkfilePath);
  }
  logger.info(message)
}
logToNetworkFile("Computer started")

// Log latest commit in oder to see if a station did not update
git.getLastCommit(function(err, commit) {
  logToNetworkFile(`Software version (git): ${commit.shortHash}, "${commit.subject}"`)
});