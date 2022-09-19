<script>
  import Navigation from "./Navigation.svelte";
  import { _ } from "../modules/i18n.js";
  
  //   import { userData } from "../modules/DataManager";
  let userData = { avatar: 3 };

  export let textPath;
  export let pageIndex, totalPages;

  $: dialogueText = $_(textPath)

</script>


<Navigation bind:pageIndex={pageIndex} {totalPages} />
<img alt="Insect Avatar" src="assets/avatar/{userData.avatar}.jpg" />
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
