<script>
  import Navigation from "../components/Navigation.svelte";
  import WwaImage from "../components/WwaImage.svelte";
  import { _ } from "../modules/i18n.js";
  import Bubble from "../components/Bubble.svelte";
  import Button from "../components/Button.svelte";

  export let textPath;
  export let pageIndex, totalPages;

  export let stationNumber;
</script>

<Navigation bind:pageIndex nextHidden {totalPages} station={stationNumber} pageID={textPath}/>
<WwaImage/>
<div class="content">
  <div class="bubble-container">
    <Bubble text={$_(textPath)} />
  </div>
  <div class="buttons-container">
    <Button no text={$_(textPath, "rethink")} on:click={() => {pageIndex -= 3 }} handwritten={false} />
    <Button yes text={$_(textPath, "accept")} on:click={() => {pageIndex += 1 }} handwritten={false} />
  </div>
</div>

<style>
  .content{
    position: absolute;
    width: 1000px;
    top:350px;
    left: 100px;
  }

  .buttons-container{
    margin-top: 30px;
    box-sizing: border-box;
    padding-right: 50px;
    display: flex;
    justify-content: end;
    width: 100%;
  }
</style>
