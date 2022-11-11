<script>
  import Navigation from "../components/Navigation.svelte";
  import Selectable from "../components/Selectable.svelte";
  import { userData, saveValue, globalData } from "../modules/DataManager";
  import Bubble from "../components/Bubble.svelte";
  import Button from "../components/Button.svelte";
  import { fly } from 'svelte/transition';

  import { _ } from "../modules/i18n.js";

  export let textPath;
  export let pageIndex, totalPages;

  export let stationNumber, questionNumber;
  export let selected = null;

  let showMore = false;

  let textPathDetailed = modifyTextPath(textPath);
  let answers = [
    { textKey: "answer0", points: 0 },
    { textKey: "answer1", points: 1 },
    { textKey: "answer2", points: 2 },
    { textKey: "answer3", points: 3 },
    { textKey: "answer4", points: 4 },
  ];
  shuffleArrayBiased(answers);

  let textCounter1 = ""
  let textCounter2 = ""
  updateTextCounter()

  $: neutral = selected === null ? true : false;

  let points = null;
  // Convert points from database back to selected index
  $: if (questionNumber in $userData?.stations[stationNumber].questions) {
    points = parseInt(
      $userData?.stations[stationNumber].questions[questionNumber]
    );
    const answerIndex = answers.findIndex((a) => a.points === points);
    selected = answerIndex < 0 ? null : answerIndex;
  }

  $: if (selected != null) {
      saveValue(`stations.${stationNumber}.questions.${questionNumber}`, answers[selected].points)
      saveValue("wwa.textPath", `${textPathDetailed}.${answers[selected].textKey}`)
      saveValue("wwa.text", $_(textPathDetailed, answers[selected].textKey))
  }

  function updateTextCounter(){
    let t = $_(textPath, "count")
    let count1 = $globalData?.counter[`${textPathDetailed.replaceAll('.','_')}_${answers[0].textKey}`] || 0
    let count2 = $globalData?.counter[`${textPathDetailed.replaceAll('.','_')}_${answers[1].textKey}`] || 0
    textCounter1 = t.replace("##", count1)
    textCounter2 = t.replace("##", count2)
  }

  // Function taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  function shuffleArrayBiased(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    const points = parseInt(
      $userData?.stations[stationNumber].questions[questionNumber]
    );
    const answerIndex = answers.findIndex((a) => a.points === points);
    const selected = answerIndex < 0 ? null : answerIndex;
    if (selected != null && selected > 1) {
      // place the previousely selected item at the beginning
      [array[0], array[selected]] = [array[selected], array[0]];
    }
  }

  function modifyTextPath(textPath) {
    const area_mapping = ["clothes", "living", "mobility", "food", "special"]
    const selected_area = $userData?.stations[stationNumber].questions[1]
    textPath += `.${area_mapping[selected_area]}`
    if (selected_area != 4) {
      textPath += `.${$userData?.wwa.level}`
    }
    //console.debug(textPath)
    return textPath
  }
</script>

<Navigation
  bind:pageIndex
  {totalPages}
  station={stationNumber}
  pageID={textPath}
  disableNext={neutral}
/>

<div class="content">
  <div class="bubble-container">
    <Bubble text={$_(textPath)} />
  </div>
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

  {#if showMore}
    <div in:fly|local={{duration: 600, delay:0}} class="answer-container">
      <Selectable
        on:click={() => {
          selected = 2;
        }}
        selected={selected == 2}
        text={$_(textPathDetailed, answers[2].textKey)}
      />
      <Selectable
        on:click={() => {
          selected = 3;
        }}
        selected={selected == 3}
        text={$_(textPathDetailed, answers[3].textKey)}
      />
    </div>
  {/if}
  {#if ! showMore}
    <div class="button-wrapper">
      <Button plain_secondary more on:click={() => { showMore = true}} handwritten={false}/>
    </div>
  {/if}
  
  <div class="answer-container">
    <div class="counter">{textCounter1}</div>
    <div class="counter">{textCounter2}</div>
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

  .bubble-container {
    width: 1100px;
    margin-bottom: 40px;
  }

  .answer-container {
    display: block;
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .counter {
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    margin: 1rem;
  }

  .button-wrapper{
    margin-top: 40px;
  }
</style>
