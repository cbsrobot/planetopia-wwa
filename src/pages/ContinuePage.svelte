<script>
  import { _ } from "../modules/i18n.js";
  import Button from "../components/Button.svelte";
  import { createEventDispatcher } from "svelte";
  import { userData } from "../modules/DataManager";
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
    {#if ! $userData?.wwa?.confirmed}
      <Button text={$_("station-partly-complete.restart")} on:click={handleRestartClick} handwritten={false}/>
    {/if}
    <Button plain_primary text={$_("station-partly-complete.continue")} on:click={handleContinueClick} handwritten={false}/>
  </div>
</div>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
  }

  .button-container{
    display: flex;
  }
  h2 {
    font-size: 56px;
    width: 60%;
  }
</style>
