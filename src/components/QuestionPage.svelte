<script>
  import Navigation from "./Navigation.svelte";
  //   import { userData } from "../modules/DataManager";
  import { _ } from "../modules/i18n.js";

  export let textPath;
  export let pageIndex, totalPages;
</script>

<Navigation bind:pageIndex {totalPages} />
<p class="question">{$_(textPath)}</p>
<div class="answer-container">
  <p class="answer">{$_(textPath, "answer0")}</p>
  <p class="answer">{$_(textPath, "answer1")}</p>
  <p class="answer">{$_(textPath, "answer2")}</p>
  <p class="answer">{$_(textPath, "answer3")}</p>
</div>

<style>
  .question {
    display: block;
    position: absolute;
    text-align: left;
    font-size: 3rem;

    top: 150px;
    width: 1000px;
  }

  .answer-container{
    display: block;
    position: absolute;
    top: 400px;
  }

  .answer {
    text-align: left;
  }
</style>
