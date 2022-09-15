<script>
  import Navigation from "./Navigation.svelte";
  //   import { userData } from "../modules/DataManager";
  let userData = { avatar: 3 };

  export let dialogueText = "Listen to my dialogue";
  export let pageIndex;
</script>


<Navigation on:nextClick={() => pageIndex++} on:backClick={() => pageIndex--} />
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
