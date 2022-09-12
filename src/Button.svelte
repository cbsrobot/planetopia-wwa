<script>
  const STANDARD_TEXT = "Click me!"
  // choose from 5 different variants:
  // with icons: next, back, home
  // without icons: plain-primary, plain-secondary
  export let next = false, back = false, home = false, plain_primary = false, plain_secondary = false;
  export let text = STANDARD_TEXT;

  // TODO: Add language localization
  $: if (text === STANDARD_TEXT) {
		if(back) text = "Zurück"
    if(next) text = "Weiter"
    if(home) text = "Zum Anfang"
	}

  export let disabled = false;
</script>

<button class:disabled class:next class:back class:home class:plain_primary class:plain_secondary>
  {#if back}
    <img class="icon" alt="" src="assets/icons/back.svg">
  {/if}
  <span>{text}</span>
  {#if next}
    <img class="icon" alt="" src="assets/icons/next.svg">
  {/if}
  {#if home}
    <img class="icon" alt="" src="assets/icons/home.svg">
  {/if}
</button>

<style>
  /* button {
    background-color: silver;
  } */

  .disabled {
    border: 5px solid red;
  }

  button {
    display: block;
    align-self: center;
    padding: 1rem 1rem;
    margin: 0 1rem;
    color: #2D2D2D;
    font-size: 2rem;
    outline: none;

    border:solid 5px;

    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    border-bottom-right-radius: 225px 15px;
    border-bottom-left-radius: 15px 255px;
  }

  .plain_primary, .next{
    background-color: #2D2D2D;
    color: white;
    border-color: white;
  }

  .plain_primary:active, .next:active{
    background-color: hsla(0, 0%, 18%, 0.6);
  }

  .plain_secondary, .back, .home{
    border-color: #2D2D2D;
  }

  span{
    padding: 0 0.5rem;
  }

  img{
    padding: 0 0.3rem;
  }

</style>
