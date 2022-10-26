const fs = require("fs");
const util = require("util");
import { writable, derived } from "svelte/store";

export const showError = writable(false);

const _errorMessage = writable("");
export const errorMessage = derived(_errorMessage, ($errorMessage) => $errorMessage);

export function error(message) {
  console.error(message)

  _errorMessage.set(message);
  showError.set(true);

  // logToFile(message);
}

