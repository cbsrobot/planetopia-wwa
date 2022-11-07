<script>
  const CHOOSE_LANGUAGE_TIME_LIMIT = 6;
  const PUT_TOKEN_TIME_LIMIT = 20;

  import { _, locale, setLocale, resetLocale } from "../modules/i18n.js";
  import { loggedIn, retryLogIn, rfidCacheEnabled} from "../modules/DataManager";
  import { inactiveTime } from "../modules/InteractionObserver.js"
  import Button from "../components/Button.svelte";
  import { STATION } from "../modules/PageListFactory";
  import StationIndicator from "../components/StationIndicator.svelte";
  import StartPage from "./StartPage.svelte";
  
  // Reset after specified time limit
  $: if ( ! $loggedIn && state === STATES.CHOOSE_LANGUAGE && $inactiveTime >= CHOOSE_LANGUAGE_TIME_LIMIT) {
    resetLocale();
    $rfidCacheEnabled = false;
    state = STATES.START
  };

  // Reset after specified time limit
  $: if ( ! $loggedIn && state === STATES.PUT_TOKEN && $inactiveTime >= PUT_TOKEN_TIME_LIMIT) {
    resetLocale();
    $rfidCacheEnabled = false;
    state = STATES.START
  };

  const STATES = {
    START: 1,
    CHOOSE_LANGUAGE: 2,
    PUT_TOKEN: 3,
  };
  let state = STATES.START;

  $: if($locale) state = STATES.PUT_TOKEN;
  $: if($rfidCacheEnabled) {
    state = STATES.CHOOSE_LANGUAGE
  };

  function handleStartClick(){
    state = STATES.CHOOSE_LANGUAGE; 
  }
</script>

<!-- <StationIndicator station={STATION} text={false} /> -->

{#if state === STATES.START}
  <StartPage on:click={handleStartClick}/>
  <!-- <Button plain_primary on:click={handleStartClick} text="Start" handwritten={false}/> -->
  <!-- <img src="assets/l1.png" alt="Startscreen" /> -->
{:else if state === STATES.CHOOSE_LANGUAGE}
  <div class="language-container">
    <Button on:click={() => {setLocale("de"); retryLogIn()}} plain_primary handwritten={false} text="Deutsch" />
    <Button on:click={() => {setLocale("fr"); retryLogIn()}} plain_primary handwritten={false} text="Français" />
    <Button on:click={() => {setLocale("en"); retryLogIn()}} plain_primary handwritten={false} text="English" />
  </div>
{:else if state === STATES.PUT_TOKEN}
<div class="top-container">
  <Button back on:click={() => {resetLocale(); state = STATES.CHOOSE_LANGUAGE}}/>
</div>
  <div class="jeton-container">
    <h2>{$_("jeton")}</h2>
    <p>{$_("no-jeton")}</p>
    <img src="assets/jeton.png" alt="" />
  </div>
{/if}

<style>
  .language-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 35%;
    width: 80%;
  }

  .jeton-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 60%;
    width: 80%;
    pointer-events: none;
  }

  .top-container{
    width: 95%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 5%;
  }

  h2 {
    font-size: 56px;
  }

  p {
    font-size: 40px;
    width: 75%;
  }

  img {
    padding-top: 40px;
    width: 22%;
    height: auto;
  }
</style>
