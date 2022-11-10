<script>
  import { _ } from "../modules/i18n.js";
  import { userData } from "../modules/DataManager";
  // import { userData } from "../modules/PageUtils.js";
  import { fly } from 'svelte/transition';

  export let attested = false;

  let wwaNumberStr = "D - 000001" // TODO: Get Number from userData
  
</script>

<div class="wwa">
  {#if attested}
    <img in:fly|local={{duration: 2000}} class="attested-stamp" src="assets/attested-stamp.png" alt="" />
  {/if}
  <img class="background" src="assets/wwa-paper-texture.jpg" alt="" />
  <div class="wwa-stamp-wrapper">
    <img class="wwa-stamp" src="assets/wwa-stamp.jpg" alt="" />
    <span class="wwa-number">{wwaNumberStr}</span>
  </div>
  <p>{$_($userData?.wwa.textPath)}</p> 
</div>

<style>
  .wwa {
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translateY(-50%);

    width: 800px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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

  .wwa-stamp-wrapper{
    z-index: 2;
   
    width: 98%;
    margin-top: 10px;
    margin-bottom: -10px;
    mix-blend-mode: multiply;
    position: relative;
  }

  .wwa-stamp{
    box-sizing: border-box;
    width: 100%
  }

  .wwa-number{
    position: absolute;
    bottom: 45px;
    left: 0;
    width: 100%;
    font-size: 28px;
    text-transform: uppercase;
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
    margin-bottom: 40px;
  }
</style>
