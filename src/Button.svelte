<script>
  import { _ } from "./i18n.js";

  // choose from 5 different variants:
  // with icons: next, back, home
  // without icons: plain-primary, plain-secondary
  export let next = false, back = false, home = false, plain_primary = false, plain_secondary = false;

  export let text = ""
  export let disabled = false;

  let defaultText = "Click me!"
  $:{
    if (back) defaultText = $_("back");
    if (next) defaultText = $_("next");
    if (home) defaultText = $_("home");
  }
  $: buttonText = text != "" ? text : defaultText;
</script>

<button on:click class:disabled class:next class:back class:home class:plain_primary class:plain_secondary>
  {#if back}
    <img class="icon" alt="" src="assets/icons/back.svg" />
  {/if}
  <span>{buttonText}</span>
  {#if next}
    <img class="icon" alt="" src="assets/icons/next.svg" />
  {/if}
  {#if home}
    <img class="icon" alt="" src="assets/icons/home.svg" />
  {/if}
</button>

<style>
  /* button {
    background-color: silver;
  } */

  .disabled {
    border: 5px solid red;
  }

  button {
    display: block;
    align-self: center;
    padding: 1rem 1rem;
    margin: 0 1rem;
    color: #2d2d2d;
    font-size: 2rem;
    outline: none;

    border: solid 5px;

    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    border-bottom-right-radius: 225px 15px;
    border-bottom-left-radius: 15px 255px;
  }

  .plain_primary,
  .next {
    background-color: #2d2d2d;
    color: white;
    border-color: white;
  }

  .plain_primary:active,
  .next:active {
    background-color: hsla(0, 0%, 18%, 0.6);
  }

  .plain_secondary,
  .back,
  .home {
    border-color: #2d2d2d;
  }

  span {
    padding: 0 0.5rem;
  }

  img {
    padding: 0 0.3rem;
  }
</style>
