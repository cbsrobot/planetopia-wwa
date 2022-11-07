<script>
  // time constants in seconds
  const TIMEOUT_WARNING = 30;
  const TIMEOUT_RESET = 40; 
  const ERROR_TIMEOUT = 600; // TODO: Set to lower value in production

  import { loggedIn, logOut } from "./modules/DataManager.js";
  import { showError, errorMessage } from "./modules/ProblemCollector.js";
  import { interactionDetected, inactiveTime } from "./modules/InteractionObserver.js"
  import PageManager from "./pages/PageManager.svelte";
  import DevBar from "./components/DevBar.svelte";
  import LogInManager from "./pages/LogInManager.svelte";
  import InactiveWarningPage from "./pages/InactiveWarningPage.svelte";
  import ErrorOverlay from "./components/ErrorOverlay.svelte";

  const IS_PROD = Boolean(process.env.IS_PROD === "true");
  const SHOW_DEV_BAR = ! IS_PROD;

  // Log out after specified timeout
  $: if ($loggedIn && $inactiveTime >= TIMEOUT_RESET) { console.log("inactiveTime logOut"); logOut();}

  // Dismiss error message after specified time
  let errorTimeout;
  $: if($showError) errorTimeout = setTimeout(() => { $showError = false }, ERROR_TIMEOUT * 1000);

</script>

<main on:click={interactionDetected} on:mousedown={interactionDetected} class:selectable-text = { ! IS_PROD }>
  {#if $loggedIn}
    <PageManager/>
  {:else}
    <LogInManager/>
  {/if}

  {#if $loggedIn && $inactiveTime >= TIMEOUT_WARNING}
    <InactiveWarningPage/>
  {/if}

  {#if SHOW_DEV_BAR}
    <DevBar text={"inactive: " + Math.round($inactiveTime)} />
  {/if}

  {#if $showError}
    <ErrorOverlay errorMessage={ $errorMessage } on:exit={() => { $showError = false; clearTimeout(errorTimeout) }} />
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

  .selectable-text {
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
