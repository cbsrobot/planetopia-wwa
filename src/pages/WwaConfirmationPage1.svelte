<script>
  import Navigation from "../components/Navigation.svelte";
  import WwaImage from "../components/WwaImage.svelte";
  import { _ } from "../modules/i18n.js";
  import Bubble from "../components/Bubble.svelte";
  import Button from "../components/Button.svelte";
  import { fly } from 'svelte/transition';

  export let textPath;
  export let pageIndex, totalPages;

  export let stationNumber;

  let nextHidden = true
  let showButtons = true;
  let showAttestedStamp = false;

  function handleConfirmClick(){
    nextHidden = false;
    showButtons = false;
    showAttestedStamp = true;
  }
</script>

<Navigation bind:pageIndex {nextHidden} {totalPages} station={stationNumber} pageID={textPath}/>
<WwaImage attested={showAttestedStamp}/>
<div class="content">
  <div class="bubble-container">
    <Bubble text={$_(textPath)} />
  </div>
  {#if showButtons}
    <div out:fly|local={{duration: 600}} class="buttons-container">
      <Button no text={$_("5.wwaConfirmation4", "rethink")} on:click={() => {pageIndex -= 1 }} handwritten={false} />
      <Button yes text={$_("5.wwaConfirmation4", "accept")} on:click={handleConfirmClick} handwritten={false} />
    </div>
  {/if}
 
</div>

<style>
  .content{
    position: absolute;
    width: 960px;
    height: 450px;
    top: 50%;
    transform: translateY(-50%);
    left: 140px;
  }

  .buttons-container{
    margin-top: 30px;
    box-sizing: border-box;
    padding-right: 40px;
    display: flex;
    justify-content:flex-end;
    width: 95%;
    margin-left: auto; 
    margin-right: 0;
  }
</style>
