<script>
  import Navigation from "../components/Navigation.svelte";
  import Selectable from "../components/Selectable.svelte";
  import { userData, setAnswer } from "../modules/DataManager";
  import { _ } from "../modules/i18n.js";

  export let textPath;
  export let pageIndex, totalPages;

  export let stationNumber, questionNumber;

  let answers = [
    { textKey: "answer0", points: 0 },
    { textKey: "answer1", points: 1 },
    { textKey: "answer2", points: 2 },
    { textKey: "answer3", points: 3 },
  ];
  shuffleArray(answers);

  let selected = null;

 
  $: neutral = selected === null ? true : false;

  // Convert points from database back to selected index
  $: {
    const points = parseInt($userData.stations[stationNumber].questions[questionNumber]);
    const answerIndex = answers.findIndex((a) => a.points === points);
    selected = (answerIndex < 0) ? null : answerIndex;
  }

  $: saveAnswer(selected)
  function saveAnswer(selection){
    if(selection != undefined) setAnswer(stationNumber, questionNumber, answers[selection].points)
  }



  // Function taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
</script>

<Navigation  bind:pageIndex={pageIndex} {totalPages} station={stationNumber} pageID={textPath} disableNext={neutral}/>

<div class="content">
  <p class="question">{$_(textPath)}</p>
  <div class="answer-container">
    <div class="row">
      <Selectable
        on:click={() => {
          selected = 0;
        }}
        {neutral}
        selected={selected == 0}
        text={$_(textPath, answers[0].textKey)}
      />
      <Selectable
        on:click={() => {
          selected = 1;
        }}
        {neutral}
        selected={selected == 1}
        text={$_(textPath, answers[1].textKey)}
      />
    </div>
    <div class="row">
      <Selectable
        on:click={() => {
          selected = 2;
        }}
        {neutral}
        selected={selected == 2}
        text={$_(textPath, answers[2].textKey)}
      />
      <Selectable
        on:click={() => {
          selected = 3;
        }}
        {neutral}
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
