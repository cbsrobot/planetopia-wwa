<script>
  import Navigation from "../components/Navigation.svelte";
  import Selectable from "../components/Selectable.svelte";
  import WwaImage from "../components/WwaImage.svelte";
  import { shuffleArray } from "../modules/PageUtils";
  import { userData, saveValue } from "../modules/DataManager";
  import { _ } from "../modules/i18n.js";

  export let textPath;
  export let pageIndex, totalPages;

  export let stationNumber, questionNumber;
  export let selected = null;

  let overlayOpen = false;
  let answers = [
    { textKey: "accept", points: 0 },
    { textKey: "rethink", points: 1 },
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

  $: if (selected != null) {
    saveValue(`stations.${stationNumber}.questions.${questionNumber}`, answers[selected].points)
  }

  //TODO on: nextClicked create stamp before bubbling up
</script>

<Navigation bind:pageIndex={pageIndex} on:nextClicked {totalPages} station={stationNumber} pageID={textPath} disableNext={neutral}/>
<WwaImage textPath="" />

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
    display: block;
    width: 70%;
  }

  p {
    margin-top: 0;
  }
</style>
