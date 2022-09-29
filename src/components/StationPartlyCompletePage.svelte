<script>
  import { _ } from "../modules/i18n.js";
  import Button from "./Button.svelte";

  export let pageIndex;

  function handleRestartClick() {
    if (pageIndex != undefined) pageIndex += 1;
  }

  function handleContinueClick() {}
</script>

<div class="content">
  <h2>{$_("station-partly-complete")}</h2>
  <div class="button-container">
    <Button text={$_("station-partly-complete.restart")} on:click={handleRestartClick} />
    <Button text={$_("station-partly-complete.continue")} on:click={handleContinueClick} disabled={true} />
  </div>
</div>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button-container{
    display: flex;
  }
  h2 {
    font-size: 56px;
    width: 50%;
  }
</style>
