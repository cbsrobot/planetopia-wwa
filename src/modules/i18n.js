/*
Reactive i18n module that automatically triggers an update of
all derived translations in the UI whenever the language changes

just import these two functions in the component code
    import { _ , setLocale } from "./i18n.js";

get the translated string by id
    <p>$_("next")<p>

change language
    setLocale("en")

*/

import { parse } from "csv-parse/sync";
const fs = require("fs");
import { writable, derived} from 'svelte/store';

// Synchronously load textData from json file
const rawData = fs.readFileSync("./src/modules/text.csv", "utf8");
const textData = parse(rawData, {
  skip_empty_lines: true,
  columns: true,
});

// store locale in a writable store
const localeStore = writable("de");

// subscribe to localeStore to be able to use the current value
let currentLocale;
localeStore.subscribe(v => {
    currentLocale = v;
});

// create a public derived store which automatically triggers updates whenever the locale changes
export const _ = derived(
	localeStore,
	$localeStore => ((id) => textData.find(r => r.id === id)[currentLocale])
);

// public function to change the language 
export function setLocale(locale) {
  if (locale === "en" || locale === "de" || locale === "fr") {
    localeStore.set(locale);
    console.log("🚀 ~ setLocale ~ currentLocale", currentLocale)
    
  } else {
    throw new Error(locale + " is not a supported locale!");
  }
}
