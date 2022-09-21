<script>
  import Navigation from "./Navigation.svelte";
  import { _ } from "../modules/i18n.js";

  import { userData } from "../modules/DataManager";

  export let textPath;
  export let pageIndex, totalPages;

  $: dialogueText = injectAvatarInfo($_(textPath));

  function injectAvatarInfo(str) {
    // get avatar hints
    const re = /#(\d)/i;
    const match = str.match(re);
    const avatarNr = $userData.avatar;
    let text = match ? str.replace(re, $_(`${match[1]}.insect${avatarNr}`)) : str;
    return text;
  }
</script>

<Navigation bind:pageIndex {totalPages} />
<img alt="Insect Avatar" src="assets/avatar/{$userData.avatar}.jpg" />
<p id="dialogue">{dialogueText}</p>

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
