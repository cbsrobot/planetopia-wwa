<script>
  import Bubble from "../components/Bubble.svelte";
  import { _ } from "../modules/i18n.js";
  export let textPath;
  
</script>

<div class="bubble-container">
  <Bubble text={$_(textPath)}/>
</div>

<style>
  .bubble-container {
    width: 1100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }
</style>
