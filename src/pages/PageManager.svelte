<script>
  import { generatePageList, STATION } from "../modules/PageListFactory.js";
  import { loggedIn, userData, saveValue } from "../modules/DataManager.js";
  import InfoPage from "./InfoPage.svelte";
  import ContinuePage from "./ContinuePage.svelte";

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
  $: activePage = getActivePageAndUpdateTextPath(pageIndex);
  $: console.log("🚀 ~ activePage", activePage)

  function getActivePageAndUpdateTextPath(pageIndex){
    if ("depends" in pageList[pageIndex] ) {
      let question_id = pageList[pageIndex].depends.question_id
      let selected_wwa = $userData.stations[STATION].questions[question_id]
      pageList[pageIndex].props.textPath = pageList[pageIndex].depends.options[selected_wwa]
    }
    return pageList[pageIndex]
  }

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

  function handleNextClicked() {
    // handle pageIndex accordingly
    const previousPageIndex = pageIndex - 1
    if ("conditionalJump" in pageList[previousPageIndex] ) {
      const answer = $userData.stations[STATION].questions[pageList[previousPageIndex].props.questionNumber]
      const jumpToIndex = pageList[previousPageIndex].conditionalJump[answer]
      if (jumpToIndex) {
        //TODO clear previous saved data
        //saveValue(stationNumber, questionNumber, points)
        pageIndex = jumpToIndex
      }
    }
  }

  
</script>

{#if state === STATES.SHOW_PAGES}
  <svelte:component on:nextClicked={handleNextClicked} this={activePage.component} {...activePage.props} bind:pageIndex {totalPages} />
{:else if state === STATES.SHOW_PARTLY_COMPLETE}
  <ContinuePage continuePageIndex={continuePageIndex} bind:pageIndex on:exit={() => (state = STATES.SHOW_PAGES)} />
{:else if state === STATES.SHOW_COMPLETE}
  <InfoPage textPath={"station-complete"} />
{/if}
