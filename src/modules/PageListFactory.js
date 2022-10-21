import DialoguePage from "../pages/DialoguePage.svelte";
import QuestionPage from "../pages/QuestionPage.svelte";
import AreaSelectionPage from "../pages/AreaSelectionPage.svelte";
import WwaSelectionPage from "../pages/WwaSelectionPage.svelte";
import WwaConfirmationPage1 from "../pages/WwaConfirmationPage1.svelte";
import WwaConfirmationPage2 from "../pages/WwaConfirmationPage2.svelte";
import EmailAcceptPage from "../pages/EmailAcceptPage.svelte";
import EmailPromptPage from "../pages/EmailPromptPage.svelte";
import InfoPage from "../pages/InfoPage.svelte";
import { userData } from "./DataManager.js";
import { get } from "svelte/store";

let envStation = parseInt(process.env.STATION);
export const STATION = envStation != undefined ? envStation : 3;

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
  { component: DialoguePage, props: { textPath: "0.dialogue10", markComplete: true, stationCompleted: 0 } },
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
  { component: DialoguePage, props: { textPath: "1.dialogue4", markComplete: true, stationCompleted: 1 } },
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
  { component: DialoguePage, props: { textPath: "2.dialogue4", markComplete: true, stationCompleted: 2 } },
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
  { component: DialoguePage, props: { textPath: "3.dialogue4", markComplete: true, stationCompleted: 3 } },
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
  { component: DialoguePage, props: { textPath: "4.dialogue4" } },
  { component: DialoguePage, props: { textPath: "4.dialogue5" } },
  { component: DialoguePage, props: { textPath: "4.dialogue6", markComplete: true, stationCompleted: 4 } },
];

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
  { component: AreaSelectionPage, props: { textPath: "5.areaSelection1" } }, // question_id 1
  { component: DialoguePage, props: { textPath: "5.dialogue8" } },
  { component: WwaSelectionPage, props: { textPath: "5.wwaSelection2" } }, // question_id 2
  { component: DialoguePage, depends: {"question_id":1, "options": ["5.dialogueClothes", "5.dialogueLiving", "5.dialogueMobility", "5.dialogueFood", "5.dialogueSpecial", "5.dialogueGeneral"]}, props: { textPath: "5" } },  
  { component: WwaConfirmationPage1, props: { textPath: "5.wwaConfirmation3" }, conditionalJump:[null, 7] },
  { component: WwaConfirmationPage2, props: { textPath: "5.wwaConfirmation4" }, conditionalJump:[null, 7] },
  { component: DialoguePage, props: { textPath: "5.dialogue9" } },
  { component: EmailAcceptPage, props: { textPath: "5.emailAccept5" }, conditionalJump:[null, 16] },
  { component: EmailPromptPage, props: { textPath: "5.emailPrompt6" } },
  { component: DialoguePage, props: { textPath: "5.dialogue10", markComplete: true, stationCompleted: 5 } },
];

function introComplete() {
  return get(userData).stations[0].complete;
}

function anyStationHasAnswer() {
  // return amount of station besides station intro and evaluation that have an answer
  var answered = Object.fromEntries(
    Object.entries(get(userData).stations).filter(([k,v]) => { 
      let questions = {};
      if ("questions" in v) {
        questions = Object.entries(v.questions).filter(([kk,vv]) => vv != null)
      }; 
      return k > 0 && k < 5 && Object.keys(questions).length
    })
  );
  return Object.keys(answered).length;
}

function anyStationComplete() {
  // return amount of station besides station intro and evaluation that are complete
  var completed = Object.fromEntries(
    Object.entries(get(userData).stations).filter(([k,v]) => 
      k > 0 && k < 5 && v.complete == true
    )
  );
  return Object.keys(completed).length;
}

// based on User Data and station number
export function generatePageList() {
  let pageList = [];

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
    case 4:
      if (introComplete()) {
        pageList.push(foodStart);
        pageList.push(...foodCore);
      } else {
        pageList.push(...introCore);
        pageList.push(introEnd[STATION]);
        pageList.push(...foodCore);
      }
      break;
    case 5:
      if ( !introComplete()) {
        pageList.push(evaluationStart.firstLogIn);
      } else if (anyStationHasAnswer() === 0) {
        pageList.push(evaluationStart.noAnswers);
      } else if (anyStationComplete() === 0) {
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
    page.props.stationNumber = parseInt(page.props.textPath?.charAt(0));
  });
  return pageList;
}

// Utility function that adds "props.questionNumber: 2" (example)
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
