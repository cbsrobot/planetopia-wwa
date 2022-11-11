// Function taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function wwaNumberFormatter(s){
  return `D - ${String(s).padStart(8, '0')}`
}

import { writable } from "svelte/store";

const data = JSON.parse(`{
  "rfid": "123",
  "avatar": 1,
  "stations": {
    "0": {
      "questions": {
        "1": 1
      },
      "lastPage": "0.dialogueEnd3",
      "complete": true
    },
    "1": {
      "questions": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      }
    },
    "2": {
      "questions": {
        
      }
    },
    "3": {
      "questions": {
        "1": 3,
        "2": 3,
        "3": 3
      },
      "lastPage": "3.question2"
    },
    "4": {
      "questions": {
        "1": 2,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 0
      }
    },
    "5": {
      "questions": {
        "1": 1,
        "2": 2,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "lastPage": "5.dialogue7",
      "complete": false
    }
  },
  "wwa": {
    "textPath": "5.wwaSelection2.living.easy.answer2",
    "text": "By this time next month I will have purchased a kettle and will no longer boil water in a pan."
  },
  "loggedInIP": "127.0.0.1",
  "language": "en"
}`)

export const userData = writable(data);

