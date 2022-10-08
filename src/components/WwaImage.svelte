<script>
  import { _ } from "../modules/i18n.js";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let textPath;
</script>

<div class="wwa">
  <img src="assets/wwa.png" alt="" />
  <p>{$_(textPath)}</p>
</div>

<style>
  img {
    position: absolute;
    left: 100px;
    bottom: -40px;
  }

  p {
    font-size: 44px;
    width: 100%;
  }
</style>
