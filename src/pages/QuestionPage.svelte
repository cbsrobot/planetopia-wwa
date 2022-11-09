<script>
  import Navigation from "../components/Navigation.svelte";
  import Selectable from "../components/Selectable.svelte";
  import { shuffleArray } from "../modules/PageUtils";
  import { userData, saveValue } from "../modules/DataManager";
  import { _ } from "../modules/i18n";
  import Bubble from "../components/Bubble.svelte";

  export let textPath;
  export let pageIndex, totalPages;

  export let stationNumber, questionNumber;
  export let selected = null;

  let answers = [
    { textKey: "answer0", points: 0 },
    { textKey: "answer1", points: 1 },
    { textKey: "answer2", points: 2 },
    { textKey: "answer3", points: 3 },
  ];
  shuffleArray(answers);

  $: neutral = selected === null ? true : false;

  let points = null
  // Convert points from database back to selected index
  $: if (questionNumber in $userData.stations[stationNumber].questions) {
      points = parseInt($userData.stations[stationNumber].questions[questionNumber])
      const answerIndex = answers.findIndex((a) => a.points === points);
      selected = (answerIndex < 0) ? null : answerIndex;
    }

  let syncPending = false;
  
  // call function 'saveAnswer' every time when the selection changes
  $: if (selected != null) saveAnswer();
  function saveAnswer(){
    saveValue(`stations.${stationNumber}.questions.${questionNumber}`, answers[selected].points)
    syncPending = true;
  }

  // Set flag if all questions of a station are complete, execute function when new user data arrives
  // The syncPending flag is used to avoid an endless loop of saving (userData change -> saveQuestionsComplete -> userData change -> ...)
  // Little svelte hack: the syncPending flag is hidden inside a function (syncIsPending) in order to exclude it from reactivity
  // like that calling of saveQuestionsComplete is only dependent on userData change and not on the syncPending flag

  $: if($userData && syncIsPending()) saveQuestionsComplete();
  function saveQuestionsComplete(){
    syncPending = false;
    console.log("questions.length", Object.values($userData.stations[stationNumber].questions).length);
    if(Object.values($userData.stations[stationNumber].questions).length >= 5) {
      saveValue(`stations.${stationNumber}.questionsComplete`, true)
    }
  }
  function syncIsPending() {
    return syncPending;
  }
</script>

<Navigation  bind:pageIndex={pageIndex} {totalPages} station={stationNumber} pageID={textPath} disableNext={neutral}/>

<div class="content">
  <div class="bubble-container">
    <Bubble text={$_(textPath)} />
  </div>
  <div class="answer-container">
    <div class="row">
      <Selectable
        on:click={() => {
          selected = 0;
        }}
        selected={selected == 0}
        text={$_(textPath, answers[0].textKey)}
      />
      <Selectable
        on:click={() => {
          selected = 1;
        }}
        selected={selected == 1}
        text={$_(textPath, answers[1].textKey)}
      />
    </div>
    <div class="row">
      <Selectable
        on:click={() => {
          selected = 2;
        }}
        selected={selected == 2}
        text={$_(textPath, answers[2].textKey)}
      />
      <Selectable
        on:click={() => {
          selected = 3;
        }}
        selected={selected == 3}
        text={$_(textPath, answers[3].textKey)}
      />
    </div>
  </div>
</div>

<style>
  .content {
    /* position: absolute; */
    /* top: 20px; */
    width: 90%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .question {
    display: block;
    text-align: left;
    font-size: 52px;
    width: 1000px;
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
    /* justify-content: space-between; */
    align-items: flex-start;
  }
</style>
