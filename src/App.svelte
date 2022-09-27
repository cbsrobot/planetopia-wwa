<script>
  import { onDestroy } from "svelte";
  import { loggedIn, logOut } from "./modules/DataManager.js";
  import PageManager from "./components/PageManager.svelte";
  import DevBar from "./components/DevBar.svelte";
  import LogInPage from "./components/LogInPage.svelte";

  const TIMEOUT_WARNING = 600; // in seconds
  const TIMEOUT_RESET = 610; // in seconds

  const SHOW_DEV_BAR = true;

  let lastInteraction = new Date();
  let inactiveTime = 0;

  // Log out after specified timeout
  $: if ($loggedIn && inactiveTime > TIMEOUT_RESET) logOut();

  // update inactive time every second
  const interval = setInterval(() => {
    inactiveTime = (new Date() - lastInteraction) / 1000;
  }, 1000);
  onDestroy(() => clearInterval(interval));

  // resets inactive time
  function interactionDetected() {
    inactiveTime = 0;
    lastInteraction = new Date();
  }
</script>

<main on:click={interactionDetected}>
  {#if $loggedIn}
    {#if inactiveTime < TIMEOUT_WARNING}
      <PageManager />
    {:else}
      <p>Tap screen or you will be logged out</p>
    {/if}
  {:else}
    <LogInPage />
  {/if}

  {#if SHOW_DEV_BAR}
    <DevBar text={"inactive: " + Math.round(inactiveTime)} />
  {/if}
</main>

<style>
  :global(body) {
    margin: 0px;
    padding: 0px;
    background-color: #eee;
  }

  :global(a) {
    text-decoration: none;
    color: #551a8b;
  }
  main {
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1920px;
    height: 1080px;
    overflow: hidden;
    margin: 0 auto;
    font-family: "Sanuk", sans-serif;
    font-size: 2rem;
    background-color: #f2f2f2;
  }
  @font-face {
    font-family: "MANIC";
    font-style: normal;
    font-weight: normal;
    src: local(""), url("/fonts/MANIC-Regular.woff2") format("woff2");
  }
  @font-face {
    font-family: "Sanuk";
    src: url("/fonts/sanukot-regular-webfont.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
  }
</style>
