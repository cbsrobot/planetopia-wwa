<script>
  import Button from "../components/Button.svelte";
    import { getLocalizedText } from "../modules/i18n";
  import { STATION } from "../modules/DataManager";

  
  $: imagePath = `assets/start-background-${STATION}.avif`
  $: text = getText(STATION)

  function getText(station){

    if(station == 0) return "Planetopia"
    if(station == 5) return `${getLocalizedText(String(station), "de")}<br>${getLocalizedText(String(station), "fr")}`

    return `${getLocalizedText(String(station), "de")}<br>${getLocalizedText(String(station), "fr")}<br>${getLocalizedText(String(station), "en")}`
  }

  // let text = "Mobilität<br>Mobilitè<br>Mobility";
  let text = "Planetopia";
</script>

<img src={imagePath} alt="" />
<div class="content">
  <h1>{@html text}</h1>
  <Button plain_primary on:click text="Start" handwritten={false} />
</div>


<style>
  .content{
    width: 40%;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 100px;
  }
  h1{
    font-size: 128px;
    line-height: 120%;
    font-family: 'MANIC', sans-serif;
    font-style: normal;
    font-weight: 400;
    margin-top: -30px;
    margin-bottom: 50px;
    color: #2D2D2D;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
