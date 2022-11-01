<script>
  const TIMEOUT_RESET_LANGUAGE = 20;

  import { _, locale, setLocale, resetLocale } from "../modules/i18n.js";
  import { loggedIn } from "../modules/DataManager";
  import { inactiveTime } from "../modules/InteractionObserver.js"
  import { STATION } from "../modules/PageListFactory";
  import Button from "../components/Button.svelte";
  import StationIndicator from "../components/StationIndicator.svelte";
  
  // Reset language choice after specified inactive time
  $: if ( ! $loggedIn && $inactiveTime >= TIMEOUT_RESET_LANGUAGE) resetLocale();
  
</script>

<StationIndicator station={STATION} text={false} />
{#if !$locale}
  <div class="language-container">
    <Button on:click={() => setLocale("de")} plain_primary handwritten={false} text="Deutsch" />
    <Button on:click={() => setLocale("fr")} plain_primary handwritten={false} text="Français" />
    <Button on:click={() => setLocale("en")} plain_primary handwritten={false} text="English" />
  </div>
{:else}
  <div class="jeton-container">
    <h2>{$_("jeton")}</h2>
    <p>{$_("no-jeton")}</p>
    <img src="assets/jeton.png" alt="" />
  </div>
{/if}

<style>
  .language-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 35%;
    width: 80%;
  }

  .jeton-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 60%;
    width: 80%;
    pointer-events: none;
  }

  h2 {
    font-size: 56px;
  }

  p {
    font-size: 40px;
    width: 75%;
  }

  img {
    padding-top: 40px;
    width: 22%;
    height: auto;
  }
</style>
