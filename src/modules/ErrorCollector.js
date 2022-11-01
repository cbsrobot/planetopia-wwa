import { writable, derived } from "svelte/store";
const { ipcRenderer } = require("electron");

const logger = require("electron-log");
// https://github.com/megahertz/electron-log
// Logs can be found at
//    MacOS: ~/Library/Logs/planetopia-wwa/renderer.log
//    Linux: ~/.config/planetopia-wwa/logs/renderer.log

export const showError = writable(false);

const _errorMessage = writable("");
export const errorMessage = derived(_errorMessage, ($errorMessage) => $errorMessage);

export function reportError(message) {
  logger.error(message);

  _errorMessage.set(message);
  showError.set(true);
}

ipcRenderer.on("mainError", (event, response) => {
  reportError(response)
});

