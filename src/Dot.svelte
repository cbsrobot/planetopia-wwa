<script>
export let index, page
let fills = ["rgb(0,0,0)","rgb(255,255,255)"]
</script>

<svg width="26" height="26">
  <g>
    <circle cx="13" cy="13" r="10" stroke="black" 
    stroke-width="3" fill="{fills[(index >= page) + 0]}"></circle>
  </g> 
</svg>

<style>
  svg {
    margin: 0 0.2em;
  }
</style>