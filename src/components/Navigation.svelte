<script>
  import { logOut, saveValue} from "../modules/DataManager.js";
  import Button from "./Button.svelte";
  import ProgressIndicator from "./ProgressIndicator.svelte";
  import StationIndicator from "./StationIndicator.svelte";
  import { fly } from 'svelte/transition';
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let pageIndex;
  export let totalPages;

  export let station;
  export let pageID;

  export let nextIncrement = 1;
  export let backIncrement = -1;

  export let disableNext = false;
  export let disableEnd = false;
  export let backHidden = false;
  export let homeHidden = false;
  export let nextHidden = false;
  export let endHidden = false;
  export let stationHidden = false;
  export let progressHidden = false;

  $: saveValue(`stations.${station}.lastPage`, pageID)

  function handleBackClick() {
    if (pageIndex != undefined) pageIndex += backIncrement;
  }

  // TODO: Coordinate behaviour with revisit -> UX Testing
  function handleHomeClick(){
    console.log("handleHomeClick logOut")
    logOut();
  }

  function handleNextClick() {
    if (pageIndex != undefined) pageIndex += nextIncrement;
    dispatch("nextClicked");
  }

  function handleEndClick() {
    logOut()
    dispatch("endClicked");
  }
</script>

{#if station != undefined && !stationHidden}
  <StationIndicator station={station} />
{/if}

<div class="container top">
  <Button back hidden={backHidden || pageIndex < 1} on:click={handleBackClick} />
  <Button home hidden={homeHidden} on:click={handleHomeClick} />
</div>

<div class="container bottom">
{#if !nextHidden && pageIndex < totalPages - 1}
  <div in:fly|local={{duration: 1000, delay: 800}}>
    <Button next on:click={handleNextClick} disabled={disableNext} />
  </div>
{/if}
{#if !endHidden && pageIndex >= totalPages - 1}
  <Button end on:click={handleEndClick} disabled={disableEnd} />
{/if}
</div>
{#if !progressHidden}
  <ProgressIndicator position={pageIndex + 1} length={totalPages} />
{/if}

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
