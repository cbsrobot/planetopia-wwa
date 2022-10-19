<script>
  import { onDestroy } from "svelte";
  import { loggedIn, attemptedLogin, logOut } from "./modules/DataManager.js";
  import { resetLocale } from "./modules/i18n.js";
  import PageManager from "./pages/PageManager.svelte";
  import DevBar from "./components/DevBar.svelte";
  import LogInPage from "./pages/LogInPage.svelte";
  import InactiveWarningPage from "./pages/InactiveWarningPage.svelte";

  const TIMEOUT_WARNING = 30; // in seconds
  const TIMEOUT_RESET = 40; // in seconds
  const TIMEOUT_RESET_LANGUAGE = 30;

  const IS_PROD = Boolean(process.env.IS_PROD === "true");
  const SHOW_DEV_BAR = ! IS_PROD;

  let lastInteraction = new Date();
  let inactiveTime = 0;

  // Log out after specified timeout
  $: if ($loggedIn && inactiveTime > TIMEOUT_RESET) { console.log("inactiveTime logOut"); logOut();}

  // Reset language choice after specified inactive time
  $: if ( ! $loggedIn && inactiveTime > TIMEOUT_RESET_LANGUAGE) resetLocale();

  // update inactive time every second and set attemptedLogin to false
  const interval = setInterval(() => {
    inactiveTime = (new Date() - lastInteraction) / 1000;
    if (attemptedLogin) attemptedLogin.set(false)
  }, 1000);
  onDestroy(() => clearInterval(interval));

  // resets inactive time
  function interactionDetected() {
    console.log("interactionDetected")
    inactiveTime = 0;
    lastInteraction = new Date();
  }
  $: if ($loggedIn) interactionDetected();
  $: if ($attemptedLogin) interactionDetected();

</script>

<main on:click={interactionDetected} class:selectable-text = { ! IS_PROD }>
  {#if $loggedIn}
    {#if inactiveTime < TIMEOUT_WARNING}
      <PageManager />
    {:else}
      <InactiveWarningPage/>
    {/if}
  {:else}
    <LogInPage/>
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
    background: linear-gradient(236.04deg, rgba(252, 234, 189, 0.504) 33.11%, rgba(172, 232, 210, 0.63) 73.6%), #d2e8e1;
    user-select: none;
  }

  .selectable-text{
    user-select: auto;
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
