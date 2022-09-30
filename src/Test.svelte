<script>
  import { _ , setLocale } from "./modules/i18n.js";
  // setLocale("de")

  // import ProgressIndicator from "./ProgressIndicator.svelte";
  // import Button from "./Button.svelte";
  // import Navigation from "./components/Navigation.svelte";
  // import PageManager from './components/PageManager.svelte';
  // import DevView from './components/DevView.svelte';
  // import StationIndicator from './components/StationIndicator.svelte';
  // import Selectable from './components/Selectable.svelte';
  // import QuestionPage from "./components/QuestionPage.svelte";
  import LogInPage from "./components/LogInPage.svelte";

</script>

<main>
  
  <!-- <ProgressIndicator position={5} length={9}/> -->
  <!-- <StationIndicator/> -->
  <!-- <Selectable></Selectable> -->
  <!-- <QuestionPage textPath="1.question4" pageIndex={3} totalPages={11}/> -->
  <LogInPage/>

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
    font-family: "Sanuk", sans-serif;
    font-size: 2rem;
    background: linear-gradient(236.04deg, rgba(252, 234, 189, 0.504) 33.11%, rgba(172, 232, 210, 0.63) 73.6%), #D2E8E1;
  }
  @font-face {
    font-family: "MANIC";
    font-style: normal;
    font-weight: normal;
    src: local(""), url("/fonts/MANIC-Regular.woff2") format("woff2");
  }
  @font-face {
    font-family: "Sanuk";
    src: url("/fonts/sanukot-regular-webfont.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
  }
</style>
