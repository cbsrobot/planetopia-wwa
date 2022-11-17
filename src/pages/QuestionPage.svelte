<script>
  import Navigation from "../components/Navigation.svelte";
  import Selectable from "../components/Selectable.svelte";
  import { shuffleArray } from "../modules/PageUtils";
  import { saveValue, userData } from "../modules/DataManager";
  // import { userData } from "../modules/PageUtils";
  import { _ } from "../modules/i18n";
  import Bubble from "../components/Bubble.svelte";

  export let textPath;
  export let pageIndex, totalPages;
  export let stationNumber, questionNumber;

  let answers = [
    { textKey: "answer0", points: 0 },
    { textKey: "answer1", points: 1 },
    { textKey: "answer2", points: 2 },
    { textKey: "answer3", points: 3 },
  ];
  
  let enableNext = false;

  $: shuffleAnswers(stationNumber, questionNumber)
  function shuffleAnswers(station, question){
    const answersSorted = answers.sort((a, b) => a.points - b.points)
    const seed = station + "_" + question + "_" + $userData?.rfid;
    answers = shuffleArray(answersSorted, seed);
  }

  function selectAnswer(answerIndex){
    enableNext = (answerIndex >= 0 && answerIndex < answers.length) ? true : false;
    answers.forEach((answer, i) => {
      answer.selected = Boolean(i == answerIndex)
    })
    answers = answers;  // trigger svelte reactivity
  }
  
  function getSelectedAnswer(){
    return answers.find(a => a.selected);
  }

  let syncPending = false;

  function saveAnswer(){
    const answer = getSelectedAnswer()
    if(answer){
      saveValue(`stations.${stationNumber}.questions.${questionNumber}`, answer.points)
      syncPending = true;
    }
  }

  $: restoreAnswer($userData, stationNumber, questionNumber)
  function restoreAnswer(){
    const points = parseInt($userData?.stations[stationNumber].questions[questionNumber])
    const answerIndex = answers.findIndex(a => a.points === points);
    selectAnswer(answerIndex)
    
    // Log it
    if (Number.isNaN(points)) {
      console.log("Restored unselected answer state")
    } else {
      console.log(`Restored answer ${points} (at index ${answerIndex})`)
    }
  }

  // Set flag if all questions of a station are complete, execute function when new user data arrives
  // The syncPending flag is used to avoid an endless loop of saving (userData change -> saveQuestionsComplete -> userData change -> ...)
  // Little svelte hack: the syncPending flag is hidden inside a function (syncIsPending) in order to exclude it from reactivity
  // like that calling of saveQuestionsComplete is only dependent on userData change and not on the syncPending flag

  $: if($userData && syncIsPending()) saveQuestionsComplete();
  function saveQuestionsComplete(){
    syncPending = false;
    if(Object.values($userData?.stations[stationNumber].questions).length >= 5) {
      saveValue(`stations.${stationNumber}.questionsComplete`, true)
    }
  }
  function syncIsPending() {
    return syncPending;
  }
</script>

<Navigation  bind:pageIndex={pageIndex} {totalPages} station={stationNumber} pageID={textPath} disableNext={! enableNext}/>
<div class="content">
  <div class="bubble-container">
    <Bubble text={$_(textPath)} />
  </div>
  <div class="answer-container">
    <div class="row">
      <Selectable on:click={() => { selectAnswer(0); saveAnswer(); }} selected={ answers[0].selected } text={$_(textPath, answers[0].textKey)} />
      <Selectable on:click={() => { selectAnswer(1); saveAnswer(); }} selected={ answers[1].selected } text={$_(textPath, answers[1].textKey)} />
    </div>
    <div class="row">
      <Selectable on:click={() => { selectAnswer(2); saveAnswer(); }} selected={ answers[2].selected } text={$_(textPath, answers[2].textKey)} />
      <Selectable on:click={() => { selectAnswer(3); saveAnswer(); }} selected={ answers[3].selected } text={$_(textPath, answers[3].textKey)} />
    </div>
  </div>
</div>

<style>
  .content {
    width: 90%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .bubble-container{
    width: 1200px;
    margin-bottom: 50px;
  }

  .answer-container {
    display: block;
    width: 100%;
  }

  .row {
    display: flex;
    align-items: flex-start;
  }
</style>
