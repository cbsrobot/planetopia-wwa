<script>
  const SAVE_TIMEOUT = 0.8; // seconds
  const CHARACTERS_LIMIT = 150;

  import { onMount } from "svelte";
  import Navigation from "../components/Navigation.svelte";
  import { userData, saveValue, globalData } from "../modules/DataManager";
  import { _ } from "../modules/i18n.js";

  import Keyboard from "simple-keyboard";
  //import "node_modules/simple-keyboard/build/css/index.css";
  import "../styles/simplekeyboard.css";

  export let textPath;
  export let pageIndex, totalPages;
  export let stationNumber;

  let keyboard;

  let inputText = $userData.wwa.customText || "";
  $: charsUsedString = `${inputText.length} / ${CHARACTERS_LIMIT} ${$_(
    textPath,
    "chars"
  )}`;
  let wwaInputNode;

  onMount(async () => {
    keyboard = new Keyboard({
      onChange: (input) => onChange(input),
      onKeyPress: (button) => onKeyPress(button),
      inputName: "wwa-input",
      theme: "hg-theme-planetopia",
      layout: {
        default: [
          "1 2 3 4 5 6 7 8 9 0 ! ? {bksp}",
          "q w e r t z u i o p ' ( )",
          "a s d f g h j k l : * / #",
          "{shift} y x c v b n m , . _ - {shift}",
          "{space} @",
        ],
        shift: [
          "1 2 3 4 5 6 7 8 9 0 ! ? {bksp}",
          "Q W E R T Z U I O P ' ( )",
          "A S D F G H J K L : * / #",
          "{shift} Y X C V B N M , . _ - {shift}",
          "{space} @",
        ],
      },
      display: {
        "{shift}": "⇧",
        "{bksp}": "⌫",
        "{space}": " ",
      },
      maxLength: CHARACTERS_LIMIT,
    });
    keyboard.setInput(inputText);
    document.querySelector(".wwa-input").focus();
  });

  let timeoutId;

  function onChange(input) {
    inputText = input;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      saveText();
    }, SAVE_TIMEOUT * 1000);
  }

  function onKeyPress(button) {
    console.log("🚀 ~ onKeyPress ~ button", button);
    //  handle shift and caps lock
    if (button === "{shift}" || button === "{lock}") handleShift();

    const caps = "Q W E R T Z U I O P A S D F G H J K L Y X C V B N M";
    if (caps.includes(button)) {
      keyboard.setOptions({
        layoutName: "default",
      });
    }
  }

  function handleShift() {
    let currentLayout = keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    keyboard.setOptions({
      layoutName: shiftToggle,
    });
  }

  function saveText() {
    console.log("Saving Text");
    saveValue(`wwa.text`, inputText);
    saveValue(`wwa.customText`, inputText);
  }

  function handleNextClicked() {
    saveText();
  }

  let overlayOpen = false;
</script>

<h2 class="title">{$_(textPath)}</h2>
<div class="navigation">
  <Navigation
    bind:pageIndex
    on:nextClicked={handleNextClicked}
    {totalPages}
    station={stationNumber}
    pageID={textPath}
    disableNext={inputText.length < 3}
    stationHidden={true}
    progressHidden={true}
  />
</div>

<div class="content">
  <div class="wwa-container">
    <textarea
      bind:this={wwaInputNode}
      type="input"
      class="wwa-input"
      name="wwa-input"
      value={inputText}
      placeholder={$_(textPath, "textField")}
    />
    <span class="chars-count" class:red={inputText.length >= CHARACTERS_LIMIT}> {charsUsedString} </span >
  </div>
  
</div>
<div class="simple-keyboard-container">
  <div class="simple-keyboard" />
</div>

<style>
  .title {
    font-size: 52px;
    font-weight: 400;
    position: absolute;
    top: 4px;
    left: 0;
    width: 97.5%;
    text-align: center;
    z-index: 1;
    pointer-events: none;
  }

  .content {
    /* position: absolute; */
    /* top: 20px; */
    width: 70%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    z-index: 2;
  }

  .wwa-container {
    width: 60%;
    /* background-image: url("/assets/bubble-base.svg"); */
    margin: 1em;
    /* box-shadow: inset 10px 10px 10px #ddd; */
  }
  .wwa-input {
    padding: 0.8em 1.2em;
    width: 100%;
    height: 300px;
    border: 0px solid #fff;
    margin: 0.9em 0;
    margin-bottom: 0.1em;
    resize: none;
    box-shadow: inset 9px 9px 24px rgba(0, 0, 0, 0.2);
  }

  :focus-visible {
    outline: none;
  }
  .navigation {
    position: absolute;
    top: 0;
    left: 0;
    height: 650px;
    width: 1920px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .simple-keyboard-container {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    z-index: 5;
    font-weight: medium;
  }
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  .chars-count {
    /* color: green; */
    transition: all 0.15s;
    float: right;
    font-size: 24px;
  }

  .red {
    color: rgb(200, 0, 0);
  }
</style>
