<script>
  import { _ } from "../modules/i18n.js";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import { userData } from "../modules/DataManager";
  // import { userData } from "../modules/PageUtils.js";

  export let textPath;
  export let showInsectNames = true;

  $: avatarNr = $userData.avatar;
  $: name = $_(`insect${avatarNr}.name`);
  $: scientificName = $_(`insect${avatarNr}.scientificName`);
  $: showScientificName = !name.includes(scientificName);
</script>

<div class="background" />
<div class="overlay">
  <button on:click={() => dispatch("exit")}>
    <img src="assets/icons/cancel.svg" alt="" />
  </button>
  <div class="text-wrapper">
    <p>{$_(textPath)}</p>
  </div>
  {#if showInsectNames}
    <span class="name">{name}</span>
    {#if showScientificName}
      <span class="scientific-name">{scientificName}</span>
    {/if}
  {/if}
</div>

<style>
  .background {
    background: #000000;
    opacity: 0.6;
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
  }

  .overlay {
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: 50%;
    min-height: 40%;
    padding: 10rem;
    text-align: start;
    padding: 3rem 4rem 2.6rem 3rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;

    border: 8px solid #2d2d2d;
    box-shadow: 18px 17px 53px rgba(0, 0, 0, 0.25);

    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    border-bottom-right-radius: 225px 15px;
    border-bottom-left-radius: 15px 255px;

    z-index: 101;
  }

  button {
    position: absolute;
    top: 0px;
    right: 0px;

    display: block;
    align-self: center;
    padding: 1rem 1rem;
    margin: 0;
    color: #2d2d2d;
    font-size: 2rem;
    outline: none;

    border: none;
    background-color: transparent;
  }

  button:active {
    background-color: transparent;
  }

  .text-wrapper {
    flex-grow: 1;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  p {
    font-size: 44px;
    width: 100%;
  }

  .name {
    font-size: 34px;
  }

  .scientific-name {
    font-size: 22px;
  }
</style>
