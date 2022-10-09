<script>
  import Navigation from "../components/Navigation.svelte";
  import Selectable from "../components/Selectable.svelte";
  import { shuffleArray } from "../modules/PageUtils";
  import { userData, saveValue } from "../modules/DataManager";
  import { _ } from "../modules/i18n.js";

  export let textPath;
  export let pageIndex, totalPages;

  export let stationNumber, questionNumber;

  let overlayOpen = false;
  let answers = [
    { textKey: "yes", points: 0 },
    { textKey: "no", points: 1 },
  ];
  shuffleArray(answers);

  let selected = null;

  $: neutral = selected === null ? true : false;

  const points = parseInt($userData.stations[stationNumber].questions[questionNumber]);
  // Convert points from database back to selected index
  $: {
    const answerIndex = answers.findIndex((a) => a.points === points);
    selected = (answerIndex < 0) ? null : answerIndex;
  }

  //$: saveAnswer(stationNumber, questionNumber, answers, selected)
  $: if (selected != null) {
    saveValue(`stations.${stationNumber}.questions.${questionNumber}`, answers[selected].points)
  }

</script>

<Navigation bind:pageIndex={pageIndex} on:nextClicked {totalPages} station={stationNumber} pageID={textPath} disableNext={neutral}/>

<img id="avatar" on:click={() => overlayOpen = true} alt="Insect Avatar" src="assets/avatar/{$userData.avatar}.jpg" />
<img id="bubble" alt="bubble" src="assets/bubble_small.svg" />


<div class="content">
  <p class="question">{$_(textPath)}</p>
<div class="answer-container">
  <Selectable
    on:click={() => {
      selected = 0;
    }}
    selected={selected == 0}
    text={$_(answers[0].textKey, "")}
  />
  <Selectable
    on:click={() => {
      selected = 1;
    }}
    selected={selected == 1}
    text={$_(answers[1].textKey, "")}
  />
</div>
</div>

<style>

#avatar {
    position: absolute;
    top: 250px;
    left: 0;
    width: 400px;
  }
  #bubble {
    position: absolute;
    top: 200px;
    left: 320px;
    width: 1060px;
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
    z-index: 2;
  }
  .question {
    display: block;
    text-align: left;
    font-size: 52px;
    width: 900px;
  }

  .answer-container {
    position: absolute;
    top: 560px;
    left: 1120px;
    display: block;
    width: 20%;
  }

  p {
    margin-top: 0;
  }
</style>
