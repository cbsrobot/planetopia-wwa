<script>
  import { _ } from "../modules/i18n.js";

  // choose from 5 different variants:
  // with icons: next, back, home
  // without icons: plain-primary, plain-secondary
  export let next = false, end = false, back = false, home = false, yes = false, no = false, more = false;
  export let plain_primary = false, plain_secondary = false, handwritten = true;

  export let text = ""
  // TODO: Add correct disabled styling
  export let disabled = false;
  export let hidden = false;

  let defaultText = "Click me!"
  $:{
    if (back) defaultText = $_("back");
    if (next) defaultText = $_("next");
    if (end) defaultText = $_("end");
    if (home) defaultText = $_("home");
    if (yes) defaultText = $_("yes");
    if (no) defaultText = $_("no");
    if (more) defaultText = $_("show-more");
  }
  $: buttonText = text || defaultText;
</script>

<button on:click class:disabled class:hidden class:next class:end class:back class:home class:yes class:no class:plain_primary class:plain_secondary class:handwritten>
  {#if back}
    <img alt="" src="assets/icons/back.svg" />
  {/if}
  {#if yes}
    <img alt="" src="assets/icons/yes.svg" />
  {/if}
  {#if no}
    <img alt="" src="assets/icons/no.svg" />
  {/if}
  {#if more}
    <img alt="" src="assets/icons/plus.svg" />
  {/if}
  <span>{buttonText}</span>
  {#if next}
    <img alt="" src="assets/icons/next.svg" />
  {/if}
  {#if end}
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

    border: solid 5px;

    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    border-bottom-right-radius: 225px 15px;
    border-bottom-left-radius: 15px 255px;
  }

  .handwritten{
    font-family: 'MANIC', sans-serif;
    text-transform: uppercase;
  }

  .plain_primary,
  .next,
  .end,
  .yes {
    background-color: #2d2d2d;
    color: white;
    border-color: white;
  }

  .plain_primary:active,
  .next:active,
  .end:active,
  .yes:active {
    background-color: hsla(0, 0%, 18%, 0.6);
  }

  .plain_secondary,
  .back,
  .home,
  .no {
    border-color: #2d2d2d;
  }

  span {
    padding: 0 0.5rem;
  }

  img {
    padding: 0 0.3rem;
    height: 2rem;
    width: 2rem;
    position: relative;
    top: 0.2rem
  }

  .disabled {
    background-color: #a6a6a6;
    color: #dedede;
    border-color: #dedede;
    pointer-events: none;
  }

  .disabled img{
    opacity: 0.6;
  }

  .hidden{
    visibility: hidden;
  }
</style>
