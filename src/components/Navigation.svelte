<script>
  import { logOut, setLastPage} from "../modules/DataManager.js";
  import Button from "./Button.svelte";
  import ProgressIndicator from "./ProgressIndicator.svelte";
  import StationIndicator from "./StationIndicator.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let pageIndex;
  export let totalPages;

  export let station;
  export let pageID;

  export let nextIncrement = 1;
  export let backIncrement = -1;

  export let disableNext = false;

  $: setLastPage(station, pageID)

  function handleBackClick() {
    if (pageIndex != undefined) pageIndex += backIncrement;
  }

  // TODO: Coordinate behaviour with revisit -> UX Testing
  function handleHomeClick(){
    logOut();
  }

  function handleNextClick() {
    if (pageIndex != undefined) pageIndex += nextIncrement;
    dispatch("nextClicked");
  }
</script>

{#if station != undefined}
  <StationIndicator station={station} />
{/if}

<div class="container top">
  <Button back hidden={pageIndex < 1} on:click={handleBackClick} />
  <Button home on:click={handleHomeClick} />
</div>

<div class="container bottom">
  <Button next on:click={handleNextClick} disabled={disableNext} hidden={pageIndex >= totalPages - 1} />
</div>
<ProgressIndicator position={pageIndex + 1} length={totalPages} />

<style>
  .container {
    width: 95%;
    display: flex;
  }

  .top {
    justify-content: space-between;

    position: absolute;
    top: 5%;
  }

  .bottom {
    justify-content: flex-end;

    position: absolute;
    bottom: 5%;
  }
</style>
