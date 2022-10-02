<script>
  import Navigation from "../components/Navigation.svelte";
  import InfoOverlay from "../components/InfoOverlay.svelte";
  import { _ } from "../modules/i18n.js";

  import { userData } from "../modules/DataManager";

  export let textPath;
  export let pageIndex, totalPages;
  export let stationNumber;

  let overlayOpen = false;
  $: avatarNr = $userData.avatar;
  $: overlayTextPath = `${stationNumber}.insect${avatarNr}`

  $: dialogueText = injectAvatarInfo($_(textPath));
  function injectAvatarInfo(str) {
    const re = /#(\d)/i;
    const match = str.match(re);
    let text = match ? str.replace(re, $_(`${match[1]}.insect${avatarNr}`)) : str;
    return text;
  }
</script>

<Navigation bind:pageIndex {totalPages} station={stationNumber} pageID={textPath}/>
<img on:click={() => overlayOpen = true} alt="Insect Avatar" src="assets/avatar/{$userData.avatar}.jpg" />
<p id="dialogue">{dialogueText}</p>

{#if overlayOpen}
  <InfoOverlay on:exit = {() => overlayOpen = false} textPath={overlayTextPath}/>
{/if}

<style>
  img {
    position: absolute;
    top: 250px;
    left: 0;
    width: 800px;
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
