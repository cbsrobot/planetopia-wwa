const { ipcRenderer } = require('electron')
import { writable, derived, readable } from "svelte/store";

// TODO: ping amIStillActive every second -> else log out

const _rfid = writable(undefined);
ipcRenderer.on("rfid", (event, response) => {
    _rfid.set(response);
});
export const rfid = derived(_rfid, $_rfid => $_rfid)
export const loggedIn = derived(rfid, $rfid => $rfid ? true : false)

export function logOut(){
    _rfid.set(undefined)
    console.log("Logged out")
}

export function simulateLogIn(){
    const randomStr = Math.random().toString(16).substr(2, 8);
    _rfid.set(randomStr)
    console.log("Logged in with RFID", randomStr)
}