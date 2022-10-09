import { setAnswer } from "./DataManager";

// Function taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function saveAnswer(stationNumber, questionNumber, answers, selection){
    if (selection != undefined) 
        setAnswer(stationNumber, questionNumber, answers[selection].points)
}
