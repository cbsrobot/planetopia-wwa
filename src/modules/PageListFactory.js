import DialoguePage from "../pages/DialoguePage.svelte";
import QuestionPage from "../pages/QuestionPage.svelte";
import AreaSelectionPage from "../pages/AreaSelectionPage.svelte";
import WwaSelectionPage from "../pages/WwaSelectionPage.svelte";
import WwaConfirmationPage1 from "../pages/WwaConfirmationPage1.svelte";
import WwaConfirmationPage2 from "../pages/WwaConfirmationPage2.svelte";
import EmailAcceptPage from "../pages/EmailAcceptPage.svelte";
import EmailPromptPage from "../pages/EmailPromptPage.svelte";
import ResultPage from "../pages/ResultPage.svelte";
import InfoPage from "../pages/InfoPage.svelte";
import { userData } from "./DataManager.js";
import { get } from "svelte/store";

let envStation = parseInt(process.env.STATION);
export const STATION = envStation != undefined ? envStation : 5;

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
  0: { component: DialoguePage, props: { textPath: "0.dialogueEnd0", markComplete: true, markRealStation: true } },
  1: { component: DialoguePage, props: { textPath: "0.dialogueEnd1", markComplete: true, markRealStation: true } },
  2: { component: DialoguePage, props: { textPath: "0.dialogueEnd2", markComplete: true, markRealStation: true } },
  3: { component: DialoguePage, props: { textPath: "0.dialogueEnd3", markComplete: true, markRealStation: true } },
  4: { component: DialoguePage, props: { textPath: "0.dialogueEnd4", markComplete: true, markRealStation: true } },
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
];

const foodStart = { component: DialoguePage, props: { textPath: "4.dialogue1" } };
const foodCore = [
  { component: DialoguePage, props: { textPath: "4.dialogue2" } },
  { component: DialoguePage, props: { textPath: "4.dialogue3" } },
  { component: QuestionPage, props: { textPath: "4.question1" } },
  { component: QuestionPage, props: { textPath: "4.question2" } },
  { component: QuestionPage, props: { textPath: "4.question3" } },
  { component: QuestionPage, props: { textPath: "4.question4" } },
  { component: QuestionPage, props: { textPath: "4.question5" } },
];

const stationEndings = {
  A: [ { component: DialoguePage, props: { textPath: "dialogueEndA", markComplete: true, stationNumber: STATION } } ],
  B: [ { component: DialoguePage, props: { textPath: "dialogueEndB", markComplete: true, stationNumber: STATION } } ],
  allComplete: [
    { component: DialoguePage, props: { textPath: "dialogueEndAllComplete1", stationNumber: STATION} },
    { component: DialoguePage, props: { textPath: "dialogueEndAllComplete2", stationNumber: STATION } },
    { component: DialoguePage, props: { textPath: "dialogueEndAllComplete3", markComplete: true, stationNumber: STATION} }
  ]
}

const evaluationStart = {
  firstLogIn: { component: InfoPage, props: { textPath: "5.dialogueStart1" } },
  noAnswers: { component: InfoPage, props: { textPath: "5.dialogueStart2" } },
  notAllAnswers: { component: DialoguePage, props: { textPath: "5.dialogueStart3" } },
  allComplete: { component: DialoguePage, props: { textPath: "5.dialogueStart4" } },
};

const evaluationCore = [
  { component: DialoguePage, props: { textPath: "5.dialogue2" } },
  { component: DialoguePage, props: { textPath: "5.dialogue3" } },
  { component: DialoguePage, props: { textPath: "5.dialogue4" } },
  { component: DialoguePage, props: { textPath: "5.dialogue5" } },
  { component: DialoguePage, props: { textPath: "5.dialogue6" } },
  { component: DialoguePage, props: { textPath: "5.dialogue7" } },
  { component: ResultPage, props: { textPath: "5.result" } },
  { component: AreaSelectionPage, props: { textPath: "5.areaSelection1" } }, // question_id 1
  { component: DialoguePage, props: { textPath: "5.dialogue8" } },
  { component: WwaSelectionPage, props: { textPath: "5.wwaSelection2" } }, // question_id 2
  { component: DialoguePage, depends: { "question_id": 1, "options": ["5.dialogueClothes", "5.dialogueLiving", "5.dialogueMobility", "5.dialogueFood", "5.dialogueSpecial", "5.dialogueGeneral"] }, props: { textPath: "5" } },
  { component: WwaConfirmationPage1, props: { textPath: "5.wwaConfirmation3" } },
  // { component: WwaConfirmationPage2, props: { textPath: "5.wwaConfirmation4" } },
  { component: DialoguePage, props: { textPath: "5.dialogue9" } },
  { component: EmailAcceptPage, props: { textPath: "5.emailAccept5" } },
  { component: EmailPromptPage, props: { textPath: "5.emailPrompt6" } },
  { component: DialoguePage, props: { textPath: "5.dialogue10", markComplete: true } },
];



function introComplete() {
  return get(userData).stations[0].stationComplete;
}

function anyStationHasAnswer() {
  // return amount of station besides station intro and evaluation that have an answer
  var answered = Object.fromEntries(
    Object.entries(get(userData).stations).filter(([k, v]) => {
      let questions = {};
      if ("questions" in v) {
        questions = Object.entries(v.questions).filter(([kk, vv]) => vv != null)
      };
      return k > 0 && k < 5 && Object.keys(questions).length
    })
  );
  return Object.keys(answered).length;
}

function getCompletedStationsCount() {
  // return amount of station besides station intro and evaluation that are complete
  var completed = Object.fromEntries(
    Object.entries(get(userData).stations).filter(([k, v]) =>
      k > 0 && k < 5 && v.questionsComplete == true
    )
  );
  return Object.keys(completed).length;
}

function getStationEnding() {
  let count = getCompletedStationsCount();
  if(count == 0) {
    return stationEndings.A
  } else if (count < 3){
    return stationEndings.B
  } else {
    return stationEndings.allComplete
  }

}

// based on User Data and station number
export function generatePageList() {

  let pageList = [];
  let stationEnding = getStationEnding()

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
      pageList.push(...stationEnding)
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
      pageList.push(...stationEnding)
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
      pageList.push(...stationEnding)
      break;
    case 4:
      if (introComplete()) {
        pageList.push(foodStart);
        pageList.push(...foodCore);
      } else {
        pageList.push(...introCore);
        pageList.push(introEnd[STATION]);
        pageList.push(...foodCore);
      }
      pageList.push(...stationEnding)
      break;
    case 5:
      if (!introComplete()) {
        pageList.push(evaluationStart.firstLogIn);
      } else if (getCompletedStationsCount() === 0) {
        pageList.push(evaluationStart.noAnswers);
      } else if (getCompletedStationsCount() < 4) {
        pageList.push(evaluationStart.notAllAnswers);
        pageList.push(...evaluationCore);
      } else {
        pageList.push(evaluationStart.allComplete);
        pageList.push(...evaluationCore);
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
    if(page.props.stationNumber == undefined) {
      page.props.stationNumber = parseInt(page.props.textPath?.charAt(0));
    }
    
  });
  return pageList;
}

// Utility function that adds "props.questionNumber: 2" (example)
// TODO: Remove non QuestionPages?
function addQuestionNumbersToProps(pageList) {
  pageList.forEach((page) => {
    if (page.component == QuestionPage
      || page.component == AreaSelectionPage
      || page.component == WwaSelectionPage
      || page.component == WwaConfirmationPage1
      || page.component == WwaConfirmationPage2
      || page.component == EmailAcceptPage
    ) {
      page.props.questionNumber = parseInt(page.props.textPath?.slice(-1));
      page.props.selected = null;
    }
  });
  return pageList;
}
