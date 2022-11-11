<script>
  import Navigation from "../components/Navigation.svelte";
  import WwaImage from "../components/WwaImage.svelte";
  import { _ } from "../modules/i18n.js";
  import Bubble from "../components/Bubble.svelte";
  import Button from "../components/Button.svelte";
  import { fly } from 'svelte/transition';
  import { saveValue, userData } from "../modules/DataManager";

  export let textPath;
  export let pageIndex, totalPages;

  export let stationNumber;

  const STATES = {
    DEFAULT: 1,
    CONFIRMED: 2,
  }
  let state = STATES.DEFAULT;


  let backHidden;
  let nextHidden;
  let showButtons;
  let showAttestedStamp;

  $: setAttributes(state)
  function setAttributes(state){
    if(state == STATES.DEFAULT){
      backHidden = false;
      nextHidden = true
      showButtons = true;
      showAttestedStamp = false;
    }else if(state == STATES.CONFIRMED){
      backHidden = true
      nextHidden = false;
      showButtons = false;
      showAttestedStamp = true;
    }
  }

  function handleConfirmClick(){
    state = STATES.CONFIRMED
    saveValue(`wwa.confirmed`, true)
  }

  $: if($userData?.wwa?.confirmed != undefined){
    if($userData?.wwa?.confirmed) {
      state = STATES.CONFIRMED
    }else{
      state = STATES.DEFAULT
    }
  }
</script>

<Navigation bind:pageIndex {nextHidden} {backHidden} {totalPages} station={stationNumber} pageID={textPath}/>
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
