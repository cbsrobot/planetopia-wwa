<script>
  export let filled = false;
  const FILLS = ["rgb(255,255,255)", "rgb(0,0,0)"]
</script>

<svg width="26" height="26">
  <g>
    <circle cx="13" cy="13" r="10" stroke="black" 
    stroke-width="3" fill="{FILLS[filled + 0]}"></circle>
  </g> 
</svg>

<style>
  svg {
    margin: 0 0.2em;
  }
</style>