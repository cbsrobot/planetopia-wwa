<script>
  import Button from "./Button.svelte";
  import { logOut } from "../modules/SessionManager.js";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<div class="container top">
  <Button back on:click={() => dispatch("backClick")} />
  <Button home on:click={() => logOut()} />
</div>

<div class="container bottom">
  <Button next on:click={() => dispatch("nextClick")} />
</div>

<style>
  .container {
    width: 95%;
    display: flex;
  }

  .top {
    justify-content: space-between;

    position: absolute;
    top: 5%;
  }

  .bottom {
    justify-content: flex-end;

    position: absolute;
    bottom: 5%;
  }
</style>
