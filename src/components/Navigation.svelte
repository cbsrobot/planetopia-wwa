<script>
  import Button from "./Button.svelte";
  import { logOut } from "../modules/DataManager.js";
  import ProgressIndicator from "./ProgressIndicator.svelte";

  export let pageIndex;
  export let totalPages;

  export let nextIncrement = 1;
  export let backIncrement = -1;

  function handleBackClick() {
    if (pageIndex != undefined) pageIndex += backIncrement;
  }

  function handleNextClick() {
    if (pageIndex != undefined) pageIndex += nextIncrement;
  }
</script>

<div class="container top">
  <Button back hidden={pageIndex < 1} on:click={handleBackClick} />
  <Button home on:click={() => logOut()} />
</div>

<div class="container bottom">
  <Button next hidden={pageIndex >= totalPages-1 } on:click={handleNextClick} />
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
