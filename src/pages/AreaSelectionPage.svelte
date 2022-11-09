<script>
  import Navigation from "../components/Navigation.svelte";
  import Selectable from "../components/Selectable.svelte";
  import Bubble from "../components/Bubble.svelte";
  import { userData, saveValue } from "../modules/DataManager";
  import { _ } from "../modules/i18n";

  export let textPath;
  export let pageIndex, totalPages;

  export let stationNumber, questionNumber;
  let selected = null;

  let answers = [
    { textKey: "answer0", points: 0 },
    { textKey: "answer1", points: 1 },
    { textKey: "answer2", points: 2 },
    { textKey: "answer3", points: 3 },
    { textKey: "special", points: 4 },
  ];

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

</script>

<Navigation bind:pageIndex={pageIndex} {totalPages} station={stationNumber} pageID={textPath} disableNext={neutral}/>

<div class="content">
  <div class="question-container">
    <Bubble text={$_(textPath)}/>
  </div>
 
  <div class="answer-container">
    <Selectable
      on:click={() => {
        selected = 0;
      }}
      selected={selected == 0}
      text={$_("1")}
    />
    <Selectable
      on:click={() => {
        selected = 1;
      }}
      selected={selected == 1}
      text={$_("2")}
    />
    <Selectable
      on:click={() => {
        selected = 2;
      }}
      selected={selected == 2}
      text={$_("3")}
    />
    <Selectable
      on:click={() => {
        selected = 3;
      }}
      selected={selected == 3}
      text={$_("4")}
    />
    <Selectable
      on:click={() => {
        selected = 4;
      }}
      selected={selected == 4}
      text={$_(textPath, "special")}
    />
  </div>
</div>

<style>

  .content {
    /* position: absolute; */
    /* top: 20px; */
    width: 80%;
    height: 60%;
    display: flex;
    flex-direction:row;
    justify-content: flex-start;
    align-items: center;
  }

  .question-container{
    box-sizing: border-box;
    padding-top: 30px;
    height:100%;
    width: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: start;
  }

  .answer-container {
    display: block;
    width: 500px;
  }

</style>
