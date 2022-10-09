<script>
  import { get } from "svelte/store";
  import Navigation from "../components/Navigation.svelte";
  import Selectable from "../components/Selectable.svelte";
  import { userData, saveValue } from "../modules/DataManager";

  import { _ } from "../modules/i18n.js";

  export let textPath;
  export let pageIndex, totalPages;

  export let stationNumber, questionNumber;

  let textPathDetailed = ""
  let answers = [
    { textKey: "answer0", points: 0 },
    { textKey: "answer1", points: 1 },
    { textKey: "answer2", points: 2 },
    { textKey: "answer3", points: 3 },
    { textKey: "answer4", points: 4 },
  ];
  shuffleArrayBiased(answers);

  let selected = null;

  $: neutral = selected === null ? true : false;

  // Convert points from database back to selected index
    const points = parseInt($userData.stations[stationNumber].questions[questionNumber]);
  $: {
    const answerIndex = answers.findIndex((a) => a.points === points);
    selected = (answerIndex < 0) ? null : answerIndex;
    textPathDetailed = modifyTextPath(textPath)
  }

  $: {
    //saveAnswer(stationNumber, questionNumber, answers, selected)
    if (selected != null) {
      saveValue(`stations.${stationNumber}.questions.${questionNumber}`, answers[selected].points)
      saveValue("wwa", {
        textPath: `${textPathDetailed}.${answers[selected].textKey}`,
        text: $_(textPathDetailed, answers[selected].textKey)
      })
    }
  }

  // Function taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  function shuffleArrayBiased(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    const points = parseInt($userData.stations[stationNumber].questions[questionNumber]);
    const answerIndex = answers.findIndex((a) => a.points === points);
    const selected = (answerIndex < 0) ? null : answerIndex;
    if (selected != null && selected > 1) {
      // place the previousely selected item at the beginning
      [array[0], array[selected]] = [array[selected], array[0]]
    }

  }

  function modifyTextPath(textPath) {
    const level_mapping = ["hard", "medium", "easy"]
    const area_mapping = ["clothes", "living", "mobility", "food", "special"]
    let selected_area = $userData.stations[stationNumber].questions[1] //TODO: do not hardcode
    let sum = 0
    let level = 2
    let answered_count = Object.keys(get(userData).stations[selected_area].questions).length
    if (answered_count) {
      for (const value of Object.values(get(userData).stations[selected_area].questions)){
        sum += value
      }
      let max_points = 4 * answered_count
      let average_points = sum / answered_count
      level = Math.floor(3 / max_points * average_points)
    }
    textPath += `.${area_mapping[selected_area]}`
    if (selected_area != 4) {
      textPath += `.${level_mapping[level]}`
    }
    saveValue("wwa", {
      areaId: selected_area,
      areaText: area_mapping[selected_area],
      levelId: level,
      levelText: level_mapping[level],
    })
    console.debug(textPath)
    return textPath
  }

</script>

<Navigation bind:pageIndex={pageIndex} {totalPages} station={stationNumber} pageID={textPath} disableNext={neutral}/>

<div class="content">
  <p class="question">{$_(textPath)}</p>
  <div class="answer-container">
    <Selectable
      on:click={() => {
        selected = 0;
      }}
      selected={selected == 0}
      text={$_(textPathDetailed, answers[0].textKey)}
    />
    <Selectable
      on:click={() => {
        selected = 1;
      }}
      selected={selected == 1}
      text={$_(textPathDetailed, answers[1].textKey)}
    />
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
    width: 1200px;
  }

  .answer-container {
    display: block;
    width: 70%;
  }

  p {
    margin-top: 0;
  }
</style>
