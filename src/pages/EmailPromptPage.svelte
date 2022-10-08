<script>
  const { ipcRenderer } = require("electron");
  import { onMount } from "svelte";
  const validator = require("email-validator");

  import Navigation from "../components/Navigation.svelte";
  import WwaImage from "../components/WwaImage.svelte";
  import { userData, setAnswer } from "../modules/DataManager";
  import { _ } from "../modules/i18n.js";

  import Keyboard from "simple-keyboard";
  //import "node_modules/simple-keyboard/build/css/index.css";
  import "../styles/simplekeyboard.css";

  export let textPath;
  export let pageIndex, totalPages;

  export let stationNumber;

  let simpleKeyboard = false;

  let validated = true;

  $: neutral = validated;

  onMount(async () => {
    const keyboard = new Keyboard({
      onChange: (input) => onChange(input),
      onKeyPress: (button) => onKeyPress(button),
      theme: "hg-theme-planetopia",
      layout: {
        default: [
          "` 1 2 3 4 5 6 7 8 9 0 - = _ {bksp}",
          "q w e r t y u i o p { } ! ? | \\",
          "a s d f g h j k l ; ' ~ $ & ^ #",
          "z x c v b n m , . / % * +",
          "@ {space} .com .ch",
        ],
      },
    });
  });

  function onChange(input) {
    document.querySelector(".input").value = input;
    validated = ! validator.validate(input)
    //console.log("Input changed", input);
  }

  function onKeyPress(button) {
    //console.log("Button pressed", button);
  }

  function handleNextClicked() {
    // gather all facts and send email
    let emailaddress = document.querySelector(".input").value;
    if (!validator.validate(emailaddress)) {
      // just to be sure
      console.log("wrong email address");
      pageIndex -= 1;
      return;
    }
    ipcRenderer.send("sendEmail", {
      from: "test@planetopia.ch",
      to: emailaddress,
      subject: "Planetopia",
      html: `<p>${$_("email", "").replace(/(?:\r\n|\r|\n)/g, "<br>")}</p>`,
      //"file": "path/to/pdf"
    });
    //TODO: should it bubble up ?
  }

  let overlayOpen = false;
</script>

<Navigation
  bind:pageIndex
  on:nextClicked={handleNextClicked}
  {totalPages}
  station={stationNumber}
  pageID={textPath}
  disableNext={neutral}
/>
<WwaImage textPath="" />

<div class="content">
  <img
    on:click={() => (overlayOpen = true)}
    alt="Insect Avatar"
    src="assets/avatar/{$userData.avatar}.jpg"
  />
  <p class="question">{$_(textPath, "question")}</p>
</div>
<div class="answer-container">
  <input
    on:focus={() => (simpleKeyboard = true)}
    type="input"
    class="input"
    placeholder={$_(textPath, "textField")}
  />
</div>
<div class:shown={!simpleKeyboard} class="simple-keyboard-container">
  <div class="simple-keyboard" />
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
    position: absolute;
    top: 370px;
    left: 390px;
    display: block;
    width: 60%;
  }

  p {
    margin-top: 0;
  }

  input {
    border-radius: 40px;
    padding: 0.4em 0.8em;
    width: 23em;
  }

  :focus-visible {
    outline: none;
  }

  .simple-keyboard-container {
    position: absolute;
    left: 370px;
    top: 460px;
    width: 1200px;
  }

  .shown {
    display: none;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
</style>
