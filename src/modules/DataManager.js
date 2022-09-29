const API_URL = process.env.IS_PROD === "true" ?  process.env.API_URL : "http://localhost:3000";
// const API_URL = process.env.API_URL;
const STATION = process.env.STATION || 0;

import { writable, derived, readable } from "svelte/store";
import { _, setLocale, resetLocale, locale } from "./i18n.js";
const { ipcRenderer } = require("electron");

const _userData = writable(undefined);
export const userData = derived(_userData, ($_userData) => $_userData);

let currentRfid;
userData.subscribe((userData) => {
  currentRfid = userData?.rfid;
});

let currentLocale
locale.subscribe((loc) => {
  currentLocale = loc
});

export const loggedIn = writable(false);

const _globalData = writable({});
export const globalData = derived(_globalData, ($_globalData) => $_globalData);

ipcRenderer.on("rfid", (event, response) => {
  console.log(response, "detected")
  logIn(String(response).replace("UID:", ""));
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
    fetch(`${API_URL}/api/users/${currentRfid}/active`, {method: 'GET'})
    .then(response => response.json())
    .then(data => {
        if(!data.active) logOut();
    })
    .catch(error => console.log('error', error));
}

let activePing;

function logIn(rfid) {

  // if it is a new rfid chip log out old chip (but dont delete the chosen language)
  if(currentRfid && rfid != currentRfid){
    logOut(false); 
  }

  // log in to new session
  var requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      logIn: true,
      language: currentLocale,
    }),
  };

  console.log("🚀 ~ logIn ~ currentLocale", currentLocale)

  fetch(`${API_URL}/api/users/${rfid}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
        console.log("Data:", data)
        _userData.set(data);
        setLocale(data.language);
        clearInterval(activePing);
        activePing = setInterval(checkActive, 1000);
        loggedIn.set(true)
    })
    .catch((error) => console.log("error", error));
}

export function logOut(languageReset = true) {
    loggedIn.set(false)
    _userData.set(undefined);
    if(languageReset) resetLocale();
    console.log("Logged out");
    clearInterval(activePing);
}

export function setAnswer(stationNumber, questionNumber, points) {
  var requestOptions = {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "station": stationNumber,
      "question": questionNumber,
      "points": points,
    })
  };

  fetch(`${API_URL}/api/users/${currentRfid}/answer`, requestOptions)
    .then(response => response.json())
    .then(data => _userData.set(data))
    .catch(error => console.log('error', error));
}

export function setLastPage(stationNumber, lastPageStr) {
  var requestOptions = {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "station": stationNumber,
      "lastPage": lastPageStr,
    })
  };

  fetch(`${API_URL}/api/users/${currentRfid}/last-page`, requestOptions)
    .then(response => response.json())
    .then(data => _userData.set(data))
    .catch(error => console.log('error', error));
}

function getUserDataFromServer() {}

function downloadUserData() {}

function uploadUserData() {}

function downloadGlobalData() {}
