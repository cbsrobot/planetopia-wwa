<script>
  import { _ } from "../modules/i18n.js";

  // choose from 5 different variants:
  // with icons: next, back, home
  // without icons: plain-primary, plain-secondary
  export let next = false, back = false, home = false, plain_primary = false, plain_secondary = false;

  export let text = ""
  // TODO: Add correct disabled styling
  export let disabled = false;
  export let hidden = false;

  let defaultText = "Click me!"
  $:{
    if (back) defaultText = $_("back");
    if (next) defaultText = $_("next");
    if (home) defaultText = $_("home");
  }
  $: buttonText = text || defaultText;
</script>

<button on:click class:disabled class:hidden class:next class:back class:home class:plain_primary class:plain_secondary>
  {#if back}
    <img alt="" src="assets/icons/back.svg" />
  {/if}
  <span>{buttonText}</span>
  {#if next}
    <img alt="" src="assets/icons/next.svg" />
  {/if}
  {#if home}
    <img alt="" src="assets/icons/home.svg" />
  {/if}
</button>

<style>
  button {
    display: block;
    align-self: center;
    padding: 1rem 1rem;
    margin: 0 1rem;
    color: #2d2d2d;
    font-size: 2rem;
    outline: none;

    font-family: 'MANIC', sans-serif;
    text-transform: uppercase;

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
    height: 2rem;
    width: 2rem;
  }

  .disabled {
    background-color: #a6a6a6;
    color: #dedede;
    border-color: #dedede;
    pointer-events: none;
  }

  .hidden{
    visibility: hidden;
  }
</style>
