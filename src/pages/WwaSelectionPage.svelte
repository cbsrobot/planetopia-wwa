<script>
  import Navigation from "../components/Navigation.svelte";
  import Selectable from "../components/Selectable.svelte";
  import { userData, saveValue, globalData } from "../modules/DataManager";
  import { shuffleArray } from "../modules/PageUtils";
  import Bubble from "../components/Bubble.svelte";
  import Button from "../components/Button.svelte";
  import { fly } from "svelte/transition";
  import { _ } from "../modules/i18n.js";

  export let textPath;
  export let pageIndex, totalPages;

  export let stationNumber, questionNumber;
  export let selected = null;

  let nextIncrement = 1;

  let showMore = false;

  let textPathDetailed = modifyTextPath(textPath);
  $: console.log("🚀 ~ textPathDetailed", textPathDetailed);

  let answers = getShuffledAnswers();
  restoreAnswer();

  let textCounter1 = "";
  let textCounter2 = "";
  let textCounter3 = "";
  let textCounterCustom = "";
  updateTextCounter();

  $: neutral = selected === null ? true : false;

  let points = null;

  function getShuffledAnswers() {
    let answers = [
      { textKey: "answer0", points: 0 },
      { textKey: "answer1", points: 1 },
      { textKey: "answer2", points: 2 },
      { textKey: "answer3", points: 3 },
      { textKey: "answer4", points: 4 },
    ];
    const seed = stationNumber + "_" + questionNumber + "_" + $userData?.rfid;
    answers = shuffleArray(answers, seed);
    answers[3] = { textKey: "customAnswer", points: 100 };
    answers = answers.slice(0, 4);
    console.log("🚀 ~ shuffleAnswers ~ answers", answers);
    return answers;
  }

  $: if (selected != null) {
    nextIncrement = selected == 3 ? 1 : 2;
    saveValue(
      `stations.${stationNumber}.questions.${questionNumber}`,
      answers[selected].points
    );

    
    if (selected != 3) {
      saveValue( "wwa.textPath", `${textPathDetailed}.${answers[selected].textKey}` );
      saveValue("wwa.text", $_(textPathDetailed, answers[selected].textKey));
    } else {
      // Special case for custom wwa
      saveValue("wwa.textPath", `${textPath}.customAnswer`);
      saveValue("wwa.text", "");
    }
  }

  function modifyTextPath(textPath) {
    const area_mapping = ["clothes", "living", "mobility", "food", "special"];
    const selected_area = $userData?.stations[stationNumber].questions[1];
    textPath += `.${area_mapping[selected_area]}`;
    if (selected_area != 4) {
      textPath += `.${$userData?.wwa.level}`;
    }
    return textPath;
  }

  function updateTextCounter() {
    let t = $_(textPath, "count");
    let count1 =
      $globalData?.counter[
        `${textPathDetailed.replaceAll(".", "_")}_${answers[0].textKey}`
      ] || 0;
    let count2 =
      $globalData?.counter[
        `${textPathDetailed.replaceAll(".", "_")}_${answers[1].textKey}`
      ] || 0;
    let count3 =
      $globalData?.counter[
        `${textPathDetailed.replaceAll(".", "_")}_${answers[2].textKey}`
      ] || 0;
    const customTextPathDetailed = `${textPath}.customAnswer`
    let countCustom = $globalData?.counter[`${customTextPathDetailed.replaceAll(".", "_")}`] || 0;
    
    console.log("🚀 ~ updateTextCounter ~ `${textPath}.customAnswer`", `${textPath}.customAnswer`);
    console.log("🚀 ~ updateTextCounter ~ countCustom", countCustom);
    textCounter1 = t.replace("##", count1);
    textCounter2 = t.replace("##", count2);
    textCounter3 = t.replace("##", count3);
    textCounterCustom = $_(textPath, "customCount").replace("##", countCustom);
  }

  function restoreAnswer() {
    const points = parseInt(
      $userData?.stations[stationNumber].questions[questionNumber]
    );
    const answerIndex = answers.findIndex((a) => a.points === points);
    selected = answerIndex < 0 ? null : answerIndex;
    if (selected > 1) showMore = true;
  }
</script>

<Navigation
  bind:pageIndex
  {totalPages}
  station={stationNumber}
  pageID={textPath}
  disableNext={neutral}
  {nextIncrement}
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
  <div class="counter-container">
    <div class="counter">{textCounter1}</div>
    <div class="counter">{textCounter2}</div>
  </div>

  {#if showMore}
    <div in:fly|local={{ duration: 600, delay: 0 }} class="answer-container">
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
        customWwa={true}
      />
    </div>
    <div class="counter-container">
      <div class="counter">{textCounter3}</div>
      <div class="counter">{textCounterCustom}</div>
    </div>
  {/if}
  {#if !showMore}
    <div class="button-wrapper">
      <Button
        plain_secondary
        more
        on:click={() => {
          showMore = true;
        }}
        handwritten={false}
      />
    </div>
  {/if}
</div>

<style>
  .content {
    width: 90%;
    height: 66%;
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

  .counter-container {
    display: block;
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .counter {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    font-size: 24px;
    margin-top: -8px;
    margin-left: 25px;
  }

  .button-wrapper {
    margin-top: 40px;
  }
</style>
