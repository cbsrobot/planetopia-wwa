<script>
  import { generatePageList } from "../modules/PageListFactory.js";
  import { loggedIn, userData } from "../modules/DataManager.js";

  import StationIndicator from "./StationIndicator.svelte";

  let pagesList = [];
  $: if ($loggedIn) pagesList = generatePageList();
  $: totalPages = pagesList.length;

  let pageIndex = 0;
  $: activePage = pagesList[pageIndex];
</script>

<svelte:component this={activePage.component} {...activePage.props} bind:pageIndex {totalPages} />
{#if activePage.props.stationNumber}
  <StationIndicator station={activePage.props.stationNumber} />
{/if}
