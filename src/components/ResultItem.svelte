<script>
  // import { userData } from "../modules/PageUtils";
  import { userData } from "../modules/DataManager";
  import { _ } from "../modules/i18n";

  export let area = 2;

  let colors = ["", "#30EFC1", "#9BEF30", "#D4EF30", "#EFC530"];

  let questions = Object.values($userData.stations[area].questions)
  let sum = questions.reduce((a,b) => a+b, 0)
  let average = sum / questions.length
  let score = 15 - average * 5
  let barSize = (score/15)*0.95 + 0.05;
</script>

<div class="item" class:disabled={questions.length < 1}>
  <img class="item-background" alt="" src="assets/result-item.svg" />
  <img class="icon" alt="" src={`assets/icons/${area}.svg`} />
  <div class="item-right">
    <span>{$_(String(area))}</span>
    <div class="bar-wrapper">
      <div
        class="bar bar-1"
        style="background-color: {colors[area]}; opacity: 0.18"
      />
      <div
        class="bar bar-2"
        class:no-animation={questions.length < 1}
        style="background-color: {colors[area]}; width:{barSize * 100}%"
      />
    </div>
  </div>
</div>

<style>
  .item {
    /* background-color: aliceblue; */
    display: flex;
    align-items: center;
    position: relative;
    height: 120px;
  }

  .disabled {
    opacity: 0.3;
    filter: grayscale(100%);
    animation: none !important;
  }

  .item-background {
    position: absolute;
    top: 0;
    left: 0;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  .item-right {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 32px 0 16px;
    z-index: 2;
  }

  span {
    margin-bottom: 8px;
  }

  .bar-wrapper {
    height: 20px;
    width: 91%;
    position: relative;
    margin-left: 2px;
  }

  .bar {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  @keyframes animateProgressBar {
    0% {
      transform: scaleX(0);
    }
    100% {
      transform: scaleX(1);
    }
  }

  .bar-1 {
    background-color: rgba(48, 239, 193, 0.15);
  }

  .bar-2 {
    background-color: #30efc1;
    animation: 3.5s ease-in-out 0s 1 animateProgressBar;
    transform-origin: center left;
  }

  .no-animation{
    animation: none;
  }

  .icon {
    padding: 12px;
    padding-top: 14px;
    height: 60px;
    width: 60px;
    z-index: 2;
    margin-left: 26px;
  }
</style>
