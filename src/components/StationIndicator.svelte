<script>
  import { _ } from "../modules/i18n.js";
  export let station = 0;
  export let text = true;
</script>

<div>
  <img class="icon" alt="" src={`assets/icons/${station}.svg`} />
  {#if text}
    <span>{$_(String(station))}</span>
  {/if}
</div>

<style>
  div {
    display: block;
    align-self: center;
    padding: 1rem 1rem;
    margin: 0 1rem;
    color: #2d2d2d;
    outline: none;

    font-family: "MANIC", sans-serif;
    font-size: 3.5rem;

    position: absolute;
    width: 95%;
    top: 40px;
    text-align: center;
    pointer-events: none;
  }

  span {
    padding: 0 0.5rem;
  }

  img {
    padding: 0;
    height: 2rem;
    width: 2rem;
  }
</style>
