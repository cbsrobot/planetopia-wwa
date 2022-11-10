<script>
  import { _ } from "../modules/i18n.js";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import { userData } from "../modules/DataManager";
  // import { userData } from "../modules/PageUtils.js";

  export let attested = false;
  import { fly } from 'svelte/transition';
</script>

<div class="wwa">
  {#if attested}
    <img in:fly|local={{duration: 2000}} class="attested-stamp" src="assets/attested-stamp.png" alt="" />
  {/if}
  <img class="background" src="assets/wwa-paper-texture.jpg" alt="" />
  <img class="stamp" src="assets/wwa-stamp.jpg" alt="" />
  <p>{$_($userData?.wwa.textPath)}</p> 
</div>

<style>
  .wwa {
    position: absolute;
    width: 800px;
    height: 550px;
    right: 0px;
    top: 300px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    box-shadow: 12px 15px 22px rgba(0, 0, 0, 0.25);
  }
  .background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    z-index: 1;
  }

  .stamp{
    mix-blend-mode: multiply;
    z-index: 2;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: -10px;
  }

  .attested-stamp{
    position: absolute;
    width: 380px;
    top: -132px;
    left: -90px;
    z-index: 2;
    transform: rotate(5.28deg);
  }

  p {
    font-size: 36px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 40px;
    position: relative;
    z-index: 2;
    margin-top: 0;
  }
</style>
