<script>
  import { _ } from "../modules/i18n.js";

  export let selected = false;
  export let text = "Some text";

  export let customWwa = false;
  $: if (customWwa) {
    text = $_("5.wwaSelection2.createCustom")
  }

  $: neutral = selected != true;
</script>

<button on:click class:selected class:neutral class:customWwa>
  <div>
    {#if customWwa}
      <img class="pencil" alt="" src="assets/icons/pencil.svg" />
    {/if}
    {text}
  </div>
  <img class="tick" alt="" src="assets/icons/tick.svg" class:hidden={!selected}
  />
</button>

<style>
  button {
    display: flex;
    align-items: center;
    justify-content: space-between;

    align-self: stretch;
    padding: 1rem 1rem;
    margin: 1rem 1rem;
    color: #2d2d2d;
    font-size: 36px;
    outline: none;

    font-family: "Sanuk", sans-serif;
    background-color: hsla(0, 0%, 0%, 0);

    border: solid 5px;
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    border-bottom-right-radius: 225px 15px;
    border-bottom-left-radius: 15px 255px;

    width: 100%;
  }

  .customWwa {
    border-style: dashed;
    /* border: 5px dashed #000000; */
  }

  .selected {
    box-shadow: 0 0 0 3px #2d2d2d;
    border-style: solid;
    background-color: white;
  }

  .neutral {
    background-color: #f5f5f5;
  }

  div {
    padding: 0 0.5rem;
    display: inline;
    overflow-wrap: break-word;
    text-align: start;
  }

  .tick {
    padding: 1rem 0.5rem;
    height: 2.2rem;
    width: 2.2rem;
  }

  .pencil{
    padding: 0 2.8rem;
    position: relative;
    top: 0.22rem;
    left: 0;
    /* width: 2.2rem; */
  }

  button:active {
    background-color: white;
  }

  .hidden {
    visibility: hidden;
  }
</style>
