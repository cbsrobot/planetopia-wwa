<script>
  const RETURN_TIMEOUT = 10; // in seconds

  import { generatePageList, STATION } from "../modules/PageListFactory.js";
  import { loggedIn, userData, logOut } from "../modules/DataManager.js";
  import InfoPage from "./InfoPage.svelte";
  import ContinuePage from "./ContinuePage.svelte";

  const STATES = {
    SHOW_PAGES: 1,
    SHOW_CONTINUE: 2,
    SHOW_COMPLETE: 3,
  };
  let state = STATES.SHOW_PAGES;

  let timeout;
  $: if(state > 1) {
    timeout = setTimeout(() => { logOut() }, RETURN_TIMEOUT * 1000);
  }

  let pageList = [];
  $: if ($loggedIn) {
    pageList = generatePageList();
    state = getState();
    setContinueIndex();
  }

  let pageIndex = 0;
  $: totalPages = pageList.length;
  $: activePage = getActivePageAndUpdateTextPath(pageIndex);

  function getActivePageAndUpdateTextPath(pageIndex){
    if ("depends" in pageList[pageIndex] ) {
      let question_id = pageList[pageIndex].depends.question_id
      let selected_wwa = $userData.stations[STATION].questions[question_id]
      pageList[pageIndex].props.textPath = pageList[pageIndex].depends.options[selected_wwa]
    }
    return pageList[pageIndex]
  }

  function getState() {
    if ($userData.stations[STATION].complete) {
      return STATES.SHOW_COMPLETE;
    } else if (Object.keys($userData.stations[STATION].questions).length > 0) {
      return STATES.SHOW_CONTINUE;
    } else {
      return STATES.SHOW_PAGES;
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
{:else if state === STATES.SHOW_CONTINUE}
  <ContinuePage continuePageIndex={continuePageIndex} bind:pageIndex on:exit={() => {state = STATES.SHOW_PAGES; clearTimeout(timeout)}} />
{:else if state === STATES.SHOW_COMPLETE}
  <InfoPage textPath={"station-complete"} />
{/if}
