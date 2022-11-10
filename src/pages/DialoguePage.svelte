<script>
  import Navigation from "../components/Navigation.svelte";
  import InfoOverlay from "../components/InfoOverlay.svelte";
  import { _ } from "../modules/i18n.js";
  import Bubble from "../components/Bubble.svelte";
  import { userData, saveValue, STATION } from "../modules/DataManager";

  export let textPath;
  export let pageIndex, totalPages;
  export let stationNumber;

  export let markComplete = false;
  export let markRealStation = false;

  let overlayOpen = false;
  $: avatarNr = $userData?.avatar;
  $: overlayTextPath = `${stationNumber}.insect${avatarNr}`

  $: if (markComplete) {
    saveValue(`stations.${stationNumber}.stationComplete`, true)
  }

  $: if (markRealStation){
    saveValue(`stations.${stationNumber}.realStation`, STATION)
  }

  $: dialogueText = injectAvatarInfo($_(textPath));
  function injectAvatarInfo(str) {
    const re = /#(\d)/i;
    const match = str.match(re);
    let text = match ? str.replace(re, $_(`${match[1]}.insect${avatarNr}`)) : str;
    return text;
  }
</script>

<Navigation bind:pageIndex {totalPages} station={stationNumber} pageID={textPath}/>
<img id="avatar" on:click={() => overlayOpen = true} alt="Insect Avatar" src="assets/avatar/{$userData?.avatar}.jpg" />
<div class="bubble-container">
  <Bubble text={dialogueText}/>
</div>


{#if overlayOpen}
  <InfoOverlay on:exit = {() => overlayOpen = false} textPath={overlayTextPath} showInsectNames={0 < stationNumber && stationNumber < 5}/>
{/if}

<style>
  #avatar {
    position: absolute;
    top: 260px;
    left: 70px;
    width: 900px;
    clip-path: polygon(1% 0, 99% 2%, 100% 97%, 0 100%);
  }

  .bubble-container {
    display: block;
    position: absolute;
    text-align: left;

    top: 270px;
    left: 850px;
    width: 1050px;
    height: 580px;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
