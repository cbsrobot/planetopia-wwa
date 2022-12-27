const API_URL = process.env.IS_PROD === "true" ? process.env.API_URL : process.env.ALT_API_URL;
const FETCH_TIMEOUT = 2.0; // in seconds

import { writable, derived } from "svelte/store";
import { _, setLocale, resetLocale, locale } from "./i18n.js";
import { reportError } from "./ProblemCollector.js";
import { interactionDetected } from "./InteractionObserver.js"
const { ipcRenderer } = require("electron");

let envStation = parseInt(process.env.STATION);
export const STATION = envStation != undefined ? envStation : 5;

const _userData = writable(undefined);
export const userData = derived(_userData, ($userData) => $userData);

let currentRfid;
userData.subscribe((userData) => {
  console.log("userData", userData);
  currentRfid = userData?.rfid || undefined
});

let currentLocale
locale.subscribe((loc) => {
  currentLocale = loc
});

// enable caching of the rfid to make login process in LogInManager more user-friendly
// with this functionality the language can be set after putting the rfid token and login will be retried with the cached rfid value
let cachedRfid;
export const rfidCacheEnabled = writable(false);
rfidCacheEnabled.subscribe(rfidCacheActive => {
  if(!rfidCacheActive) cachedRfid = undefined;
});

export const loggedIn = writable(false);

const _globalData = writable({});
export const globalData = derived(_globalData, ($globalData) => $globalData);

globalData.subscribe((globalData) => {
  console.log("globalData", globalData);
});

ipcRenderer.on("rfid", (event, response) => {
  console.log(response, "detected")
  logIn(String(response).replaceAll(" ", "").replace("UID:", "").trim());
  interactionDetected()
});

export function simulateLogIn(rfid) {
  interactionDetected()
    if(rfid){
      logIn(rfid);
    }else{
      const randomStr = Math.random().toString(16).substr(2, 5);
      logIn(randomStr);
    }
}

function checkActive() {

    // Abort request if it takes too long
    const abortController = new AbortController();
    setTimeout(() => abortController.abort(), FETCH_TIMEOUT * 1000);
 
    fetch(`${API_URL}/api/useractive/${currentRfid}`, {method: 'GET', signal: abortController.signal})
    .then(response => response.json())
    .then(data => {
        if(!data.active){
          console.log("checkActive logOut")
          logOut("ANOTHER_STATION_TOOK_OVER");
        } 
    })
    .catch(error => console.log("active check failed:", error));
}

let activePing;

function logIn(rfid) {

  // if it is a new rfid chip log out old chip
  if(currentRfid && rfid != currentRfid){
    console.log("logIn forced log out")
    logOut("LOG_IN_FORCED_LOG_OUT"); 
  }

  const body = {}
  body.logIn = true

  if(currentLocale){
    body.language = currentLocale
  }

  // Abort request if it takes too long
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), FETCH_TIMEOUT * 1000);

  // log in to new session
  var requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: abortController.signal,
    body: JSON.stringify({...body})
  };

  fetch(`${API_URL}/api/users/${rfid}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (!data.language) {
        console.log("Log in failed because language was not set");
        cachedRfid = rfid;
        rfidCacheEnabled.set(true);
        return;
      }
      _userData.set(data);
      loggedIn.set(true);
      setLocale(data.language);
      clearInterval(activePing);
      activePing = setInterval(checkActive, 1000);
      interactionDetected()
      cachedRfid = undefined;
      rfidCacheEnabled.set(false);
      saveStats("LOG_IN")
      getGlobalValue();
    })
    .catch((error) => {
      console.log("error", error)
      reportError("Log in failed: Could not connect to server")
    });
}

export function logOut(details) {
  saveStats("LOG_OUT", details)
  currentRfid = undefined
  loggedIn.set(false)
  _userData.set(undefined);
  resetLocale();
  console.log("Logged out");
  clearInterval(activePing);
  cachedRfid = undefined;
  rfidCacheEnabled.set(false)
}

// Retries the log in with the rfid from cache
// is used to try a second login after the language choice, without having to read rfid chip again
export function retryLogIn(){
  if(cachedRfid) logIn(cachedRfid);
}

export function saveValue(key, value) {

  // Abort request if it takes too long
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), FETCH_TIMEOUT * 1000);

  var requestOptions = {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    signal: abortController.signal,
    body: JSON.stringify({
      "key": key,
      "value": value
    })
  };

  return fetch(`${API_URL}/api/users/${currentRfid}`, requestOptions)
    .then(response => response.json())
    .then(data => _userData.set(data))
    .catch(error => {
      console.log(`Saving failed. Key: ${key}, Value: ${value} | Error: ${error}`)
      reportError("Saving failed: Could not connect to server")
    });
}

export function incrementCounter(key) {

  // Abort request if it takes too long
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), FETCH_TIMEOUT * 1000);

  var requestOptions = {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    signal: abortController.signal,
    body: JSON.stringify({
      "key": key
    })
  };

  fetch(`${API_URL}/api/globalcounter/increment`, requestOptions)
    .then(response => response.json())
    .then(data => _globalData.set(data))
    .catch(error => {
      console.log(error)
      reportError("Counter increment failed: Could not connect to server")
    });}


export function getGlobalValue() {

  // Abort request if it takes too long
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), FETCH_TIMEOUT * 1000);

  var requestOptions = {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
    signal: abortController.signal,
  };

  fetch(`${API_URL}/api/global`, requestOptions)
    .then(response => response.json())
    .then(data => _globalData.set(data))
    .catch(error => {
      console.log(error)
      reportError("Getting global data failed: Could not connect to server")
    });
}

export function saveGlobalValue(key, value) {

  // Abort request if it takes too long
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), FETCH_TIMEOUT * 1000);

  var requestOptions = {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    signal: abortController.signal,
    body: JSON.stringify({
      "key": key,
      "value": value
    })
  };

  fetch(`${API_URL}/api/global`, requestOptions)
    .then(response => response.json())
    .then(data => _globalData.set(data))
    .catch(error => {
      console.log(error)
      reportError("Saving global data failed: Could not connect to server")
    });
}

const ifs = require('os').networkInterfaces();
const ipAdress = Object.keys(ifs)
  .map(x => ifs[x].filter(x => x.family === 'IPv4' && !x.internal)[0])
  .filter(x => x)[0]?.address;

function saveStats(event, details){
  const date = new Date();
  const statsEntry = {event: event, details: details, station: STATION, time: date.toLocaleTimeString(), timestamp: date.toISOString(), ip: ipAdress};

   // Abort request if it takes too long
   const abortController = new AbortController();
   setTimeout(() => abortController.abort(), FETCH_TIMEOUT * 1000);
 
   var requestOptions = {
     method: 'PUT',
     headers: { "Content-Type": "application/json" },
     signal: abortController.signal,
     body: JSON.stringify({
       statsEntry: statsEntry,
     })
   };
 
   fetch(`${API_URL}/api/users/${currentRfid}/stats`, requestOptions)
     .then(response => response.json())
     .catch(error => {
       console.log(error)
       reportError("Saving stats failed: Could not connect to server")
     });
}
