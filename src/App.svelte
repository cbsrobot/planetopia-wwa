<script>
  import { onDestroy } from 'svelte';
  import PageManager from './components/PageManager.svelte';

  const TIMEOUT_WARNING = 10; // in seconds
  const TIMEOUT_RESET = 20; // in seconds

  let lastInteraction = new Date();
  let inactiveTime = 0;
  // $: if (inactiveTime > TIMEOUT_WARNING) alert("Actung bitte berühre screen");
  
  const interval = setInterval(() => {inactiveTime = (new Date() - lastInteraction)/1000}, 1000);
	onDestroy(() => clearInterval(interval));

  //TODO: if loggedIn && if no timeout
</script>

<main on:click={() => lastInteraction = new Date()}>
  <PageManager/>
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
