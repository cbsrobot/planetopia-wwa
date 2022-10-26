<script>
  import { _ } from "../modules/i18n.js";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let textPath;
</script>

<div class="background" />
<div class="overlay">
  <button on:click={() => dispatch("exit")}>
    <img src="assets/icons/cancel.svg" alt="" />
  </button>
  <p>{$_(textPath)}</p>
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
  }

  .overlay {
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: 50%;
    height: 40%;
    padding: 10rem;
    text-align: center;
    padding: 4rem;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 8px solid #2d2d2d;
    box-shadow: 18px 17px 53px rgba(0, 0, 0, 0.25);

    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    border-bottom-right-radius: 225px 15px;
    border-bottom-left-radius: 15px 255px;
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

  p {
    font-size: 44px;
    width: 100%;
  }
</style>
