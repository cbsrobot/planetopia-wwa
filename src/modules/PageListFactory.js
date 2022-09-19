
import DialoguePage from "../components/DialoguePage.svelte";
import QuestionPage from "../components/QuestionPage.svelte";

const DEFAULT_STATION = 1;
const STATION = process.env.wwastation || DEFAULT_STATION;

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

const clothesStart = { component: DialoguePage, props: { textPath: "1.dialogue1" } }
const clothesCore = [
  { component: DialoguePage, props: { textPath: "1.dialogue2" } },
  { component: DialoguePage, props: { textPath: "1.dialogue3" } },
  { component: QuestionPage, props: { textPath: "1.question1" } },
  { component: QuestionPage, props: { textPath: "1.question2" } },
  { component: QuestionPage, props: { textPath: "1.question3" } },
  { component: QuestionPage, props: { textPath: "1.question4" } },
  { component: QuestionPage, props: { textPath: "1.question5" } },
  { component: DialoguePage, props: { textPath: "1.dialogue4" } },
]

const livingStart = [];
const livingCore = [];

const mobilityStart = [];
const mobilityCore = [];

const foodStart = [];
const foodCore = [];

const evaluationStart = [];
const evaluationCore = [];


function introComplete(){
  // if(userData.stationComplete[0])
  return false;
}

// based on User Data and station number
export function generatePageList() {
  let pageList = [];

  /*
  if (userData.stationComplete[STATION]) {
    // hier warst du schon
  } else if (false) {
    // has already some answers
    // möchtest du weiterfahren?
  } else {
    // standard case
  }
  */

  switch (STATION) {
    case 0:
      pageList.push(...introCore);
      pageList.push(introEnd[STATION]);
      break;
      
    case 1:
      if(introComplete()){
        pageList.push(clothesStart)
        pageList.push(...clothesCore);
      }else{
        pageList.push(...introCore)
        pageList.push(introEnd[STATION])
        pageList.push(...clothesCore)
      }
      break;
    default:
      throw new Error(STATION + " is not a valid station number")
  }

  return pageList;
}
