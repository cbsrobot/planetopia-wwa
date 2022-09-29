import DialoguePage from "../components/DialoguePage.svelte";
import QuestionPage from "../components/QuestionPage.svelte";
import StationCompletePage from "../components/StationCompletePage.svelte";
import StationPartlyCompletePage from "../components/StationPartlyCompletePage.svelte";
import { userData } from "./DataManager.js";
import { get } from "svelte/store";

let envStation = parseInt(process.env.STATION);
const STATION = envStation != undefined ? envStation : 3;

const stationComplete = { component: StationCompletePage, props: {} };
const stationPartlyComplete = { component: StationPartlyCompletePage, props: {} };

const introCore = [
  { component: DialoguePage, props: { textPath: "0.dialogue1" } },
  { component: DialoguePage, props: { textPath: "0.dialogue2" } },
  { component: DialoguePage, props: { textPath: "0.dialogue3" } },
  { component: DialoguePage, props: { textPath: "0.dialogue4" } },
  { component: DialoguePage, props: { textPath: "0.dialogue5" } },
  { component: DialoguePage, props: { textPath: "0.dialogue6" } },
  { component: DialoguePage, props: { textPath: "0.dialogue7" } },
  { component: QuestionPage, props: { textPath: "0.question1" } },
  { component: DialoguePage, props: { textPath: "0.dialogue8" } },
  { component: DialoguePage, props: { textPath: "0.dialogue9" } },
  { component: DialoguePage, props: { textPath: "0.dialogue10" } },
];
const introEnd = {
  0: { component: DialoguePage, props: { textPath: "0.dialogueEnd0" } },
  1: { component: DialoguePage, props: { textPath: "0.dialogueEnd1" } },
  2: { component: DialoguePage, props: { textPath: "0.dialogueEnd2" } },
  3: { component: DialoguePage, props: { textPath: "0.dialogueEnd3" } },
  4: { component: DialoguePage, props: { textPath: "0.dialogueEnd4" } },
};

const clothesStart = { component: DialoguePage, props: { textPath: "1.dialogue1" } };
const clothesCore = [
  { component: DialoguePage, props: { textPath: "1.dialogue2" } },
  { component: DialoguePage, props: { textPath: "1.dialogue3" } },
  { component: QuestionPage, props: { textPath: "1.question1" } },
  { component: QuestionPage, props: { textPath: "1.question2" } },
  { component: QuestionPage, props: { textPath: "1.question3" } },
  { component: QuestionPage, props: { textPath: "1.question4" } },
  { component: QuestionPage, props: { textPath: "1.question5" } },
  { component: DialoguePage, props: { textPath: "1.dialogue4" } },
];

const livingStart = { component: DialoguePage, props: { textPath: "2.dialogue1" } };
const livingCore = [
  { component: DialoguePage, props: { textPath: "2.dialogue2" } },
  { component: DialoguePage, props: { textPath: "2.dialogue3" } },
  { component: QuestionPage, props: { textPath: "2.question1" } },
  { component: QuestionPage, props: { textPath: "2.question2" } },
  { component: QuestionPage, props: { textPath: "2.question3" } },
  { component: QuestionPage, props: { textPath: "2.question4" } },
  { component: QuestionPage, props: { textPath: "2.question5" } },
  { component: DialoguePage, props: { textPath: "2.dialogue4" } },
];

const mobilityStart = { component: DialoguePage, props: { textPath: "3.dialogue1" } };
const mobilityCore = [
  { component: DialoguePage, props: { textPath: "3.dialogue2" } },
  { component: DialoguePage, props: { textPath: "3.dialogue3" } },
  { component: QuestionPage, props: { textPath: "3.question1" } },
  { component: QuestionPage, props: { textPath: "3.question2" } },
  { component: QuestionPage, props: { textPath: "3.question3" } },
  { component: QuestionPage, props: { textPath: "3.question4" } },
  { component: QuestionPage, props: { textPath: "3.question5" } },
  { component: DialoguePage, props: { textPath: "3.dialogue4" } },
];

const foodStart = [];
const foodCore = [];

const evaluationStart = [];
const evaluationCore = [];

function introComplete() {
  return get(userData).stations[0].complete;
}

// based on User Data and station number
export function generatePageList() {
  let pageList = [];

  if (get(userData).stations[STATION].complete) {
    // hier warst du schon und hast alles beantwortet
    pageList.push(stationComplete);
  } else if (Object.keys(get(userData).stations[STATION].questions).length > 0) {
    // an ort und stell fortfahren
    pageList.push(stationPartlyComplete)
  } else {
    // standard case
  }

  switch (STATION) {
    case 0:
      pageList.push(...introCore);
      pageList.push(introEnd[STATION]);
      break;

    case 1:
      if (introComplete()) {
        pageList.push(clothesStart);
        pageList.push(...clothesCore);
      } else {
        pageList.push(...introCore);
        pageList.push(introEnd[STATION]);
        pageList.push(...clothesCore);
      }
      break;
    case 2:
      if (introComplete()) {
        pageList.push(livingStart);
        pageList.push(...livingCore);
      } else {
        pageList.push(...introCore);
        pageList.push(introEnd[STATION]);
        pageList.push(...livingCore);
      }
      break;
    case 3:
      if (introComplete()) {
        pageList.push(mobilityStart);
        pageList.push(...mobilityCore);
      } else {
        pageList.push(...introCore);
        pageList.push(introEnd[STATION]);
        pageList.push(...mobilityCore);
      }
      break;
    default:
      throw new Error(STATION + " is not a valid station number");
  }

  pageList = addStationNumbersToProps(pageList);
  pageList = addQuestionNumbersToProps(pageList);
  return pageList;
}

// Utility function that adds "props.stationNumber: 0" (example)
function addStationNumbersToProps(pageList) {
  pageList.forEach((page) => {
    page.props.stationNumber = parseInt(page.props.textPath?.charAt(0));
  });
  return pageList;
}

// Utility function that adds "props.questionNumber: 2" (example)
function addQuestionNumbersToProps(pageList) {
  pageList.forEach((page) => {
    if (page.component == QuestionPage) {
      page.props.questionNumber = parseInt(page.props.textPath?.slice(-1));
    }
  });
  return pageList;
}
