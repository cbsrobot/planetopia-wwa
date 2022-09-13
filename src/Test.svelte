<script>
  import ProgressIndicator from "./ProgressIndicator.svelte";
  import Button from "./Button.svelte";
  import { _ , setLocale } from "./i18n.js";
</script>

<main>
  <Button home on:click={() => setLocale("en")} />
  <ProgressIndicator position={5} length={9}/>
</main>

<style>
  main {
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1920px;
    height: 1080px;
    overflow: hidden;
    margin: 0 auto;
    font-family: "Montserrat", sans-serif;
    font-size: 2rem;
    background-color: #f2f2f2;
  }
</style>
