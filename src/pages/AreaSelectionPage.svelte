<script>
  import Navigation from "../components/Navigation.svelte";
  import Selectable from "../components/Selectable.svelte";
  import { shuffleArray } from "../modules/PageUtils";
  import { userData, saveValue } from "../modules/DataManager";
  import { _ } from "../modules/i18n";

  export let textPath;
  export let pageIndex, totalPages;

  export let stationNumber, questionNumber;

  let overlayOpen = false;
  let answers = [
    { textKey: "answer0", points: 0 },
    { textKey: "answer1", points: 1 },
    { textKey: "answer2", points: 2 },
    { textKey: "answer3", points: 3 },
    { textKey: "special", points: 4 },
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

  $: if (selected != null) {
    saveValue(`stations.${stationNumber}.questions.${questionNumber}`, answers[selected].points)
  }

</script>

<Navigation bind:pageIndex={pageIndex} {totalPages} station={stationNumber} pageID={textPath} disableNext={neutral}/>

<div class="content">
  <img on:click={() => overlayOpen = true} alt="Insect Avatar" src="assets/avatar/{$userData.avatar}.jpg" />
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
    <Selectable
      on:click={() => {
        selected = 4;
      }}
      selected={selected == 4}
      text={$_(textPath, answers[4].textKey)}
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
    margin: 0;
  }
</style>
