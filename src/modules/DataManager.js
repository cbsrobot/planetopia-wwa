const API_URL = process.env.API_URL || "http://localhost:3000";

const DEFAULT_STATION = 0;
const STATION = process.env.wwastation || DEFAULT_STATION;

import { writable, derived, readable } from "svelte/store";
import { _, setLocale } from "./i18n.js";
const { ipcRenderer } = require("electron");

const _userData = writable(undefined);
export const userData = derived(_userData, ($_userData) => $_userData);

let currentRfid;
userData.subscribe((userData) => {
  currentRfid = userData?.rfid;
});

export const loggedIn = writable(false);

const _globalData = writable({});
export const globalData = derived(_globalData, ($_globalData) => $_globalData);

ipcRenderer.on("rfid", (event, response) => {
  logIn(response.split(":")[1]);
});

export function simulateLogIn() {
    const randomStr = Math.random().toString(16).substr(2, 8);
    logIn(randomStr);
}

function checkActive() {
    fetch(`${API_URL}/api/users/${currentRfid}/logged-in-station`, {method: 'GET'})
    .then(response => response.json())
    .then(data => {
        console.log("ping", data)
        if(data.loggedInStation != STATION){
            logOut();
        }
    })
    .catch(error => console.log('error', error));
}

let activePing;

function logIn(rfid) {
  var requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      logIn: true,
      station: STATION,
    }),
  };

  fetch(`${API_URL}/api/users/${rfid}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
        console.log("Data:", data)
        _userData.set(data);
        clearInterval(activePing);
        activePing = setInterval(checkActive, 1000);
        loggedIn.set(true)
    })
    .catch((error) => console.log("error", error));
}

export function logOut() {
    loggedIn.set(false)
    _userData.set(undefined);
    console.log("Logged out");
    clearInterval(activePing);
}

export function setLanguage(language) {
  // send language to server
  // post request with currentRfid

  // on response setLocale in i18n
  const locale = "fr";
  setLocale(locale);
}

export function setAnswer() {}

function getUserDataFromServer() {}

function downloadUserData() {}

function uploadUserData() {}

function downloadGlobalData() {}
