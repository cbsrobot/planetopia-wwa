<script>
  const { ipcRenderer } = require("electron");
  const validator = require("email-validator");
  
  import { onMount } from "svelte";
  
  import Bubble from "../components/Bubble.svelte";
  import Navigation from "../components/Navigation.svelte";
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
      inputName: "email-input",
      theme: "hg-theme-planetopia",
      layout: {
        default: [
          "1 2 3 4 5 6 7 8 9 0 ! ? {bksp}",
          "q w e r t z u i o p { } %",
          "a s d f g h j k l ; _ & #",
          "y x c v b n m , . - * + =",
          "{space} @ .com .ch",
        ]
      },
      display: {
        '{bksp}': '⌫',
        '{space}': ' ',
      }
    });
    document.querySelector(".email-input").focus();
  });

  function onChange(input) {
    document.querySelector(".email-input").value = input;
    validated = ! validator.validate(input)
    // console.log("Input changed", input);
  }

  function onKeyPress(button) {
    // stub
    // console.log("Button pressed", button);
  }

  function handleNextClicked() {
    // gather all facts and send email
    let emailaddress = document.querySelector(".email-input").value;
    if (!validator.validate(emailaddress)) {
      // check once more
      console.log("wrong email address");
      pageIndex -= 1;
      return;
    }
    ipcRenderer.send("sendEmail", {
      "mailOptions": {
        from: "weltwandel@planetopia.ch",
        to: emailaddress,
        subject: "Planetopia",
        html: `<p>${$_("email", "").replace(/(?:\r\n|\r|\n)/g, "<br>")}</p>`,
      },
      "avatar": $userData?.avatar,
      "wwaText": $userData?.wwa.text,
      "areaText": $userData?.wwa.areaText,
      "wwaNumber": "D - 000001", //TODO: fix it
      "language": $userData?.language,
      "newsletter": document.querySelector(".newsletter-input").checked
    });
    //TODO: should it bubble up 
  }

  let overlayOpen = false;

  // TODO add Newsletter option
</script>


<div class="navigation">
  <Navigation bind:pageIndex on:nextClicked={handleNextClicked} {totalPages} station={stationNumber} pageID={textPath} disableNext={neutral} stationHidden={true} progressHidden={true} />
</div>

<div class="content">
  <div class="bubble-container">
    <Bubble text={$_(textPath, "question")} />
  </div>
  <div class="email-container">
    <input type="input" class="email-input" name="email-input" placeholder={$_(textPath, "textField")} />
  </div>
  <div class="newsletter-container">
    <label class="container">
      {$_(textPath, "newsletter")}
      <input type="checkbox" class="newsletter-input" />
      <span class="checkmark"></span>
    </label>
  </div>

</div>
<div class="simple-keyboard-container">
  <div class="simple-keyboard" />
</div>

<style>
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
  .bubble-container {
    width: 1000px;
  }
  .email-container {
    width: 60%;
    background-image: url("/assets/bubble-base.svg");
    margin: 1em;
    box-shadow: inset 10px 10px 10px #ddd;
  }
  .email-input {
    padding: 0.4em 0.8em;
    width: 23em;
    border: 0px solid #FFF;
    margin: 0.9em 0;
  }

  .newsletter-container {
    display: block;
    position: relative;
    padding-left: 68px;
    margin: 0.9em 0;
    cursor: pointer;
    user-select: none;
  }

  .newsletter-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 40px;
    width: 40px;
    background-color: #eee;
    background: url(/assets/checkbox.svg);
    background-size: 40px 40px;
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  .newsletter-container input:checked ~ .checkmark:after {
    display: block;
  }

  .newsletter-container .checkmark:after {
    left: 4px;
    top: -3px;
    width: 40px;
    height: 40px;
    background: url(/assets/checkmark.svg);
    background-size: 40px 40px;

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
  }
  *, *:before, *:after {
    box-sizing: border-box;
  }
</style>
