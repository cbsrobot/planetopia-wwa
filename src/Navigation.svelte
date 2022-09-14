<script>
  import Button from "./Button.svelte";
</script>

<div class="container top">
  <Button back />
  <Button home />
</div>

<div class="container bottom">
  <Button next />
</div>

<style>
  .container {
    width: 95%;
    display: flex;
  }

  .top{
    justify-content: space-between;
    
    position: absolute;
    top: 5%;
  }

  .bottom{
    justify-content:flex-end;
  
    position: absolute;
    bottom: 5%;
  }
</style>
