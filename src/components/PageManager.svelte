<script>
  import { generatePageList, STATION } from "../modules/PageListFactory.js";
  import { loggedIn, userData } from "../modules/DataManager.js";
  import StationCompletePage from "../components/StationCompletePage.svelte";
  import StationPartlyCompletePage from "../components/StationPartlyCompletePage.svelte";

  const STATES = {
    SHOW_PAGES: 1,
    SHOW_PARTLY_COMPLETE: 2,
    SHOW_COMPLETE: 3,
  };
  let state = STATES.SHOW_PAGES;

  let pageList = [];
  $: if ($loggedIn) {
    pageList = generatePageList();
    setState();
    setContinueIndex();
  }

  let pageIndex = 0;
  $: totalPages = pageList.length;
  $: activePage = pageList[pageIndex];
  $: console.log("🚀 ~ activePage", activePage)

  function setState() {
    if ($userData.stations[STATION].complete) {
      state = STATES.SHOW_COMPLETE;
    } else if (Object.keys($userData.stations[STATION].questions).length > 0) {
      state = STATES.SHOW_PARTLY_COMPLETE;
    } else {
      state = STATES.SHOW_PAGES;
    }
  }
  let continuePageIndex = 0;
  function setContinueIndex() {
    const lastPageId = $userData.stations[STATION].lastPage;
    const lastPageIndex = pageList.findIndex((page) => page.props.textPath == lastPageId);
    continuePageIndex = lastPageIndex;
  }

  
</script>

{#if state === STATES.SHOW_PAGES}
  <svelte:component this={activePage.component} {...activePage.props} bind:pageIndex {totalPages} />
{:else if state === STATES.SHOW_PARTLY_COMPLETE}
  <StationPartlyCompletePage continuePageIndex={5} bind:pageIndex on:exit={() => (state = STATES.SHOW_PAGES)} />
{:else if state === STATES.SHOW_COMPLETE}
  <StationCompletePage />
{/if}
