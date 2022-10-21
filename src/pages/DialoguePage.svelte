<script>
  import Navigation from "../components/Navigation.svelte";
  import InfoOverlay from "../components/InfoOverlay.svelte";
  import { _ } from "../modules/i18n.js";

  import { userData, saveValue } from "../modules/DataManager";

  export let textPath;
  export let pageIndex, totalPages;
  export let stationNumber;
  export let markComplete;
  export let stationCompleted;

  let overlayOpen = false;
  $: avatarNr = $userData.avatar;
  $: overlayTextPath = `${stationNumber}.insect${avatarNr}`
  $: if (markComplete) {
      saveValue(`stations.${stationCompleted}.complete`, markComplete)
    }

  $: dialogueText = injectAvatarInfo($_(textPath));
  function injectAvatarInfo(str) {
    const re = /#(\d)/i;
    const match = str.match(re);
    let text = match ? str.replace(re, $_(`${match[1]}.insect${avatarNr}`)) : str;
    return text;
  }
</script>

<Navigation bind:pageIndex {totalPages} station={stationNumber} pageID={textPath} backHidden={markComplete}/>
<img id="avatar" on:click={() => overlayOpen = true} alt="Insect Avatar" src="assets/avatar/{$userData.avatar}.jpg" />
<img id="bubble" alt="bubble" src="assets/bubble_big.svg" />
<p id="dialogue">{dialogueText}</p>

{#if overlayOpen}
  <InfoOverlay on:exit = {() => overlayOpen = false} textPath={overlayTextPath}/>
{/if}

<style>
  #avatar {
    position: absolute;
    top: 250px;
    left: 0;
    width: 800px;
  }
  #bubble {
    position: absolute;
    top: 300px;
    left: 710px;
    width: 1110px;
  }
  #dialogue {
    display: block;
    position: absolute;
    text-align: left;
    font-size: 3rem;

    top: 380px;
    left: 850px;
    width: 900px;
    height: 360px;
  }
</style>
