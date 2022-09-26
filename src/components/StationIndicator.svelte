<script>
  import { _ } from "../modules/i18n.js";
  export let station = 0;
</script>

<div>
  <img class="icon" alt="" src={`assets/icons/${station}.svg`} />
  <span>{$_(String(station))}</span>
</div>

<style>
  div {
    display: block;
    align-self: center;
    padding: 1rem 1rem;
    margin: 0 1rem;
    color: #2d2d2d;
    font-size: 2rem;
    outline: none;

    font-family: 'MANIC', sans-serif;
    text-transform: uppercase;

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
  }
</style>