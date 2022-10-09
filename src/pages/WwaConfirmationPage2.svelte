<script>
  import Navigation from "../components/Navigation.svelte";
  import Selectable from "../components/Selectable.svelte";
  import { shuffleArray, saveAnswer } from "../modules/PageUtils";
  import { userData } from "../modules/DataManager";
  import { _ } from "../modules/i18n.js";

  export let textPath;
  export let pageIndex, totalPages;

  export let stationNumber, questionNumber;

  let overlayOpen = false;
  let answers = [
    { textKey: "accept", points: 0 },
    { textKey: "rethink", points: 1 },
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

  $: saveAnswer(stationNumber, questionNumber, answers, selected)

  //TODO on: nextClicked create stamp before bubbling up
</script>

<Navigation bind:pageIndex={pageIndex} on:nextClicked {totalPages} station={stationNumber} pageID={textPath} disableNext={neutral}/>

<img on:click={() => overlayOpen = true} alt="Insect Avatar" src="assets/avatar/{$userData.avatar}.jpg" />

<div class="content">
  <p class="question">{$_(textPath)}</p>
  <div class="answer-container">
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
</div>

<style>

  img {
    position: absolute;
    top: 250px;
    left: 0;
    width: 400px;
  }

  .content {
    /* position: absolute; */
    /* top: 20px; */
    width: 70%;
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
    width: 900px;
  }

  .answer-container {
    display: block;
    width: 70%;
  }

  p {
    margin-top: 0;
  }
</style>
