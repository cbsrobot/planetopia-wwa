<script>
  // Animation timing in seconds
  const CIRCLE_ANIMATION_DURATION = 1.5; 
  const CIRCLE_ANIMATION_STAGGER = 0.1; 
  const ITEM_ANIMATION_DURATION = 1.0;
  const ITEM_ANIMATION_STAGGER = 0.75;

  import Navigation from "../components/Navigation.svelte";
  import ResultItem from "../components/ResultItem.svelte";
  import { userData, saveValue } from "../modules/DataManager";
  // import { userData } from "../modules/PageUtils";
  import { _ } from "../modules/i18n";
  import p5 from "p5";
  import { onMount } from "svelte";
  import { fly } from 'svelte/transition';

  export let textPath;
  export let pageIndex, totalPages;

  export let stationNumber;

  let canvasWrapper;

  let colors = [
    "rgba(179, 179, 179, 0.2)",
    "#30EFC1",
    "#9BEF30",
    "#D4EF30",
    "#EFC530",
  ];

  let visData = [];
  console.log("userData", $userData);
  let total_points = 0;
  let questions_answered = 0;
  for (let s = 1; s <= 4; s++) {
    for (let i = 1; i <= 5; i++) {
      let points = $userData?.stations[s].questions[i];
      if (points != undefined) {
        visData.push({ color: colors[s], size: points });
        total_points += points;
        questions_answered += 1;
      } else {
        visData.push({ color: colors[0], size: 3 });
      }
    }
  }
  
  const levels = ["hard", "medium", "easy"]
  const avg_points = total_points / (questions_answered * 3)

  saveValue("wwa", {
    "totalPoints": total_points,
    "questionsAnswered": questions_answered,
    "level": levels[Math.floor(2.999 * avg_points)]
  })

  onMount(() => {
    let sketch = (p5) => {

      let time = 0;
      let staggerArray = Array(20).fill(0);

      function easeInOutQuad(x) {
        return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
      }

      p5.setup = () => {
        p5.createCanvas(700, 700);
        p5.angleMode(p5.DEGREES);
        p5.rectMode(p5.BOTTOM);
      };

      p5.draw = () => {
        p5.clear();
        p5.fill(139, 171, 203);
        p5.strokeWeight(0);

        time += p5.deltaTime / 1000;

        let animationProgress = p5.map(time, 0, CIRCLE_ANIMATION_DURATION, 0, 1.0001, true);

        if (animationProgress <= 1) {
          staggerArray.forEach((_, i) => {
            setTimeout(() => {
              staggerArray[i] = animationProgress;
            }, i * CIRCLE_ANIMATION_STAGGER * 1000);
          });
        }

        const OFFSET = 140;
        const HEIGHT_MULTIPLIER = 50;

        const angleStep = 360 / visData.length;

        for (let i = 0; i < visData.length; i = i + 1) {
          p5.push();
          p5.fill(p5.color(visData[i].color));
          // inverse points because low points are good and high points are bad
          let size = p5.map(visData[i].size, 0, 3, 3, 0) + 1;
          let finalHeight = size * HEIGHT_MULTIPLIER;
          let animatedHeight = finalHeight * easeInOutQuad(staggerArray[i]);
          p5.translate(p5.width / 2, p5.height / 2);
          p5.rotate(angleStep * i + 180);
          const barWidth = 18;
          p5.rect(-barWidth / 2, OFFSET, barWidth, animatedHeight);
          p5.pop();
        }
      };
    };
    new p5(sketch, canvasWrapper);
  });
</script>

<Navigation
  bind:pageIndex
  {totalPages}
  station={stationNumber}
  pageID={textPath}
/>

<div class="content">
  <div class="canvas-wrapper" bind:this={canvasWrapper}>
    <img class="radial-blur" alt="" src="assets/radial-blur.png" />
    <img class="logo" alt="" src="assets/planetopia-logo.png" />
  </div>
  <div class="items-wrapper">
   
    {#each [1, 2, 3, 4] as area, i}
      <div in:fly="{{ delay: i * ITEM_ANIMATION_STAGGER * 1000, y: 40, duration: ITEM_ANIMATION_DURATION * 1000 }}">
        <ResultItem {area} />
      </div>
    {/each}
    
  </div>
</div>

<style>
  .content {
    width: 85%;
    height: 700px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .canvas-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .radial-blur {
    position: absolute;
    top: 50%;
    left: 50%;

    height: 1500px;
    width: 1500px;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .logo {
    position: absolute;
    top: 50%;
    left: 50%;

    height: 171px;
    width: 169px;
    transform: translate(-50%, -50%);
  }

  :global(canvas) {
    z-index: 1;
  }

  .items-wrapper {
    width: 780px;
    height: 82%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
