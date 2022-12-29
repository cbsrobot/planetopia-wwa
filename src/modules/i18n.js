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
import { writable, derived } from "svelte/store";

// Synchronously load textData from csv file
const rawData = fs.readFileSync("public/assets/translations.csv", "utf8");
const textData = parse(rawData, {
  skip_empty_lines: true,
  columns: true,
});

// store locale in a writable store
const _locale = writable(undefined);
export const locale = derived(_locale, ($locale) => $locale);

// subscribe to localeStore to be able to use the current value
let currentLocale;
_locale.subscribe((v) => {
  currentLocale = v;
});

// create a public derived store which automatically triggers updates whenever the locale changes
export const _ = derived(_locale, ($locale) => (key, ext) => {
  let id = ext ? [key, ext].join(".") : key;
  if(currentLocale){
    return getLocalizedText(id, currentLocale)
  }else{
    console.log("i18n: could not provide translation because locale was not set")
    return ""
  }
});

// public function to change the language
export function setLocale(locale) {
  if (locale === "en" || locale === "de" || locale === "fr") {
    _locale.set(locale);
  } else {
    throw new Error(`i18n: ${locale} is not a supported locale!`);
  }
}

export function getLocalizedText(id, locale) {
  if (!(locale === "en" || locale === "de" || locale === "fr")) {
    console.log("invalid locale parameter", locale);
    return "";
  }

  let translations = textData.find((r) => r.id === id);
  if (translations) {
    return translations[locale];
  } else {
    console.log(`i18n: ${id} not found in textData`);
    return "";
  }
}

export function resetLocale() {
  _locale.set(undefined);
}

export function formatNumber(number){
  if(currentLocale === "de") return new Intl.NumberFormat('de-CH').format(number)
  if(currentLocale === "fr") return new Intl.NumberFormat('de-CH').format(number)
  if(currentLocale === "en") return new Intl.NumberFormat('en-GB').format(number)
  return number;
}