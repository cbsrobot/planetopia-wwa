<script>
  import { _, locale, setLocale } from "../modules/i18n.js";
  import Button from "./Button.svelte";
  import StationIndicator from "./StationIndicator.svelte";
</script>

<StationIndicator station={parseInt(process.env.STATION)} text={false} />
{#if ! $locale}
  <div class="language-container">
    <Button on:click={() => setLocale("de")} plain_primary handwritten = {false} text="Deutsch" />
    <Button on:click={() => setLocale("fr")} plain_primary handwritten = {false} text="Français" />
    <Button on:click={() => setLocale("en")} plain_primary handwritten = {false} text="English" />
  </div>
{:else}
  <div class="jeton-container">
    <h2>{$_("jeton")}</h2>
    <p>{$_("no-jeton")}</p>
    <img src="assets/jeton.jpg" alt="" />
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
    width: 70%;
  }

  img {
    padding-top: 40px;
    width: 20%;
    height: auto;
    mix-blend-mode: multiply;
  }
</style>
