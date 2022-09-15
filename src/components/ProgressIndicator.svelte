<script>
  export let position = 0;
  export let length = 0;
  import Dot from "./Dot.svelte";
</script>

<div id="dots">
  {#each Array(length) as _, i (i)}
    <Dot filled={i < position} />
  {/each}
</div>

<style>
  #dots {
    position: absolute;
    bottom: 60px;
    width: 50%;
  }
</style>
