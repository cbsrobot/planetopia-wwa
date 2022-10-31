<script>
  import Navigation from "../components/Navigation.svelte";
  import { userData } from "../modules/DataManager";
  import { _ } from "../modules/i18n";

  export let textPath;
  export let pageIndex, totalPages;

  export let stationNumber;

  

</script>

<Navigation  bind:pageIndex={pageIndex} {totalPages} station={stationNumber} pageID={textPath}/>

<div class="content">
  <!-- {$_("1")}
  {$_("2")}
  {$_("3")}
  {$_("4")} -->
  <img src="assets/results-placeholder.png" alt="">
</div>

<style>
  .content {
    /* position: absolute; */
    /* top: 20px; */
    width: 90%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  img{
    pointer-events: none;
  }
  .question {
    display: block;
    text-align: left;
    font-size: 52px;
    width: 1000px;
  }

  .answer-container {
    display: block;
    width: 100%;
  }

  .row {
    display: flex;
    /* justify-content: space-between; */
    align-items: flex-start;
  }
</style>
