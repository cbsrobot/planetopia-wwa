<script>
  import { _ } from "../modules/i18n.js";
  import Button from "../components/Button.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let pageIndex;
  $: console.log("🚀 ~ pageIndex", pageIndex)
  export let continuePageIndex

  function handleRestartClick() {
    pageIndex = 0;
    dispatch("exit")
  }

  function handleContinueClick() {
    pageIndex = continuePageIndex;
    dispatch("exit")
  }
</script>

<div class="content">
  <h2>{$_("station-partly-complete")}</h2>
  <div class="button-container">
    <Button text={$_("station-partly-complete.restart")} on:click={handleRestartClick} handwritten={false}/>
    <Button plain_primary text={$_("station-partly-complete.continue")} on:click={handleContinueClick} handwritten={false}/>
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
    width: 60%;
  }
</style>
