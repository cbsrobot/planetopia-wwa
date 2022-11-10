<script>
  const RETURN_TIMEOUT = 10; // in seconds

  import { generatePageList } from "../modules/PageListFactory.js";
  import { loggedIn, userData, logOut, STATION } from "../modules/DataManager.js";
  import InfoPage from "./InfoPage.svelte";
  import ContinuePage from "./ContinuePage.svelte";
  import { onDestroy } from "svelte";

  const STATES = {
    SHOW_PAGES: 1,
    SHOW_CONTINUE: 2,
    SHOW_COMPLETE: 3,
    SHOW_GAME_OVER: 4
  };
  let state = STATES.SHOW_PAGES;

  let timeout;
  $: if (state > 1) {
    timeout = setTimeout(() => {logOut()}, RETURN_TIMEOUT * 1000);
  }
  onDestroy(() => clearTimeout(timeout));

  let pageList = [];
  $: console.log("🚀 ~ pageList", pageList);
  $: if ($loggedIn) {
    pageList = generatePageList();
    state = getState();
    setContinueIndex();
  }

  let pageIndex = 0;
  $: totalPages = pageList.length;
  $: activePage = pageList[pageIndex];

  function getState() {
    const firstPageStationNumber = pageList[0].props.stationNumber;
    const lastPageExists = Boolean($userData?.stations[firstPageStationNumber].lastPage)
    const lastPageNotEqualToFirstPage = Boolean(pageList[0].props.textPath != $userData?.stations[firstPageStationNumber].lastPage)
    const partlyComplete = Boolean(lastPageExists && lastPageNotEqualToFirstPage)

    if ($userData?.stations[5].stationComplete){
      return STATES.SHOW_GAME_OVER
    } if ($userData?.stations[STATION].stationComplete) {
      return STATES.SHOW_COMPLETE;
    } else if (partlyComplete) {
      return STATES.SHOW_CONTINUE;
    } else {
      return STATES.SHOW_PAGES;
    }
  }

  // TODO: Remove logs
  let continuePageIndex = 0;
  function setContinueIndex() {
    console.log("continueIndexRequested")
    console.log("pageList", pageList);
    const firstPageStationNumber = pageList[0].props.stationNumber;
    const lastPageId = $userData?.stations[firstPageStationNumber].lastPage;
    console.log("lastPageId", lastPageId);
    const lastPageIndex = pageList.findIndex((page) => page.props.textPath == lastPageId);
    console.log("lastPageIndex", lastPageIndex);
    if (lastPageIndex >= 0) continuePageIndex = lastPageIndex; 
  }
</script>

{#if state === STATES.SHOW_PAGES}
  <svelte:component this={activePage.component} {...activePage.props} bind:pageIndex {totalPages} />
{:else if state === STATES.SHOW_CONTINUE}
  <ContinuePage continuePageIndex={continuePageIndex} bind:pageIndex on:exit={() => {state = STATES.SHOW_PAGES; clearTimeout(timeout)}} />
{:else if state === STATES.SHOW_COMPLETE}
    {#if STATION == 0 && $userData?.stations[0].realStation != 0 }
      <InfoPage textPath={"intro-completed-elsewhere"} />
    {:else}
      <InfoPage textPath={"station-complete"} />
    {/if}
{:else if state === STATES.SHOW_GAME_OVER}
  <InfoPage textPath={"game-over"} />
{/if}
