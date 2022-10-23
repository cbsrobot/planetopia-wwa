const API_URL = process.env.IS_PROD === "true" ?  process.env.API_URL : process.env.ALT_API_URL;

import { writable, derived, readable } from "svelte/store";
import { _, setLocale, resetLocale, locale } from "./i18n.js";
const { ipcRenderer } = require("electron");

const _userData = writable(undefined);
export const userData = derived(_userData, ($_userData) => $_userData);

let currentRfid;
userData.subscribe((userData) => {
  if (userData !== undefined){
    console.log("userData", userData);
    currentRfid = userData?.rfid;  
  } else {
    //TODO: Why is it undefined ?
    console.warn("userData is undefined")
  }
});

let currentLocale
locale.subscribe((loc) => {
  currentLocale = loc
});

export const loggedIn = writable(false);
export const attemptedLogin = writable(false);

const _globalData = writable({});
export const globalData = derived(_globalData, ($_globalData) => $_globalData);

ipcRenderer.on("rfid", (event, response) => {
  console.log(response, "detected")
  logIn(String(response).replace(" ", "").replace("UID:", "").trim());
  attemptedLogin.set(true)
});

export function simulateLogIn(rfid) {
    if(rfid){
      logIn(rfid);
    }else{
      const randomStr = Math.random().toString(16).substr(2, 5);
      logIn(randomStr);
    }
}

function checkActive() {
    fetch(`${API_URL}/api/useractive/${currentRfid}`, {method: 'GET'})
    .then(response => response.json())
    .then(data => {
        if(!data.active){
          console.log("checkActive logOut")
          logOut();
        } 
    })
    .catch(error => console.log(error));
}

let activePing;

function logIn(rfid) {

  // if it is a new rfid chip log out old chip
  if(currentRfid && rfid != currentRfid){
    console.log("logIn forced log out")
    logOut(); 
  }

  const body = {}
  body.logIn = true

  if(currentLocale){
    body.language = currentLocale
  }

  // log in to new session
  var requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({...body}),
  };

  fetch(`${API_URL}/api/users/${rfid}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
        if(!data.language) {
          console.log("Log in failed because language was not set"); 
          return;
        }
        _userData.set(data);
        setLocale(data.language);
        clearInterval(activePing);
        activePing = setInterval(checkActive, 1000);
        loggedIn.set(true)
    })
    .catch((error) => console.log("error", error));
}

export function logOut() {
    loggedIn.set(false)
    attemptedLogin.set(false)
    currentRfid = undefined
    _userData.set(undefined);
    resetLocale();
    console.log("Logged out");
    clearInterval(activePing);
}

export function saveValue(key, value) {
  var requestOptions = {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "key": key,
      "value": value
    })
  };

  fetch(`${API_URL}/api/users/${currentRfid}`, requestOptions)
    .then(response => response.json())
    .then(data => _userData.set(data))
    .catch(error => console.log(error));
}

function getUserDataFromServer() {}

function downloadUserData() {}

function uploadUserData() {}

function downloadGlobalData() {}
