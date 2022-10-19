<script>
  const { ipcRenderer } = require("electron");
  const validator = require("email-validator");
  
  import { onMount } from "svelte";
  
  import Navigation from "../components/Navigation.svelte";
  import WwaImage from "../components/WwaImage.svelte";
  import { userData } from "../modules/DataManager";
  import { _ } from "../modules/i18n.js";

  import Keyboard from "simple-keyboard";
  //import "node_modules/simple-keyboard/build/css/index.css";
  import "../styles/simplekeyboard.css";

  export let textPath;
  export let pageIndex, totalPages;
  export let stationNumber;

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
    document.querySelector(".input").focus();
  });

  function onChange(input) {
    document.querySelector(".input").value = input;
    validated = ! validator.validate(input)
    // console.log("Input changed", input);
  }

  function onKeyPress(button) {
    // stub
    // console.log("Button pressed", button);
  }

  function handleNextClicked() {
    // gather all facts and send email
    let emailaddress = document.querySelector(".input").value;
    if (!validator.validate(emailaddress)) {
      // check once more
      console.log("wrong email address");
      pageIndex -= 1;
      return;
    }
    ipcRenderer.send("sendEmail", {
      "mailOptions": {
        from: "test@planetopia.ch",
        to: emailaddress,
        subject: "Planetopia",
        html: `<p>${$_("email", "").replace(/(?:\r\n|\r|\n)/g, "<br>")}</p>`,
      },
      "avatar": $userData.avatar,
      "wwaText": $userData.wwa.text,
      "areaText": $userData.wwa.areaText,
      "wwaNumber": "D - " + Math.floor(Math.random() * 10000) //TODO: fix it
    });
    //TODO: should it bubble up 
  }

  let overlayOpen = false;

  // TODO add Newsletter option
</script>

<Navigation bind:pageIndex on:nextClicked={handleNextClicked} {totalPages} station={stationNumber} pageID={textPath} disableNext={neutral} />
<img id="avatar" on:click={() => overlayOpen = true} alt="Insect Avatar" src="assets/avatar/{$userData.avatar}.jpg" />
<img id="bubble" alt="bubble" src="assets/bubble_small.svg" />
<WwaImage textPath="" />

<div class="content">
  <p class="question">{$_(textPath, "question")}</p>
  <div class="answer-container">
    <input type="input" class="input" placeholder={$_(textPath, "textField")} />
  </div>
  <div class="simple-keyboard-container">
    <div class="simple-keyboard" />
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
    top: 310px;
    left: 285px;
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
    left: 260px;
    top: 460px;
    width: 1200px;
    box-shadow: rgb(0 0 0 / 20%) 20px 20px 30px;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }
</style>
