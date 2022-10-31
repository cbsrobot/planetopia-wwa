<script>
  export let text = ""
</script>

<div>
  <img viewBox="0 0 250 250" class="bubble-base" alt="bubble" src="assets/bubble-base.svg" />
  <img viewBox="0 0 250 250" class="bubble-spike" alt="bubble" src="assets/bubble-spike.svg" />
  <p>{text}</p>
</div>


<style>

  div{
    width: 90%;
    height: fit-content;
    position: relative;
    filter: drop-shadow(11px 18px 22px rgba(0, 0, 0, 0.25));
    left: 40px;
  }

  p{
    box-sizing:content-box;
    position: relative;
    text-align: left;
    font-size: 52px;
   
    color: #2D2D2D;
    z-index: 2;
    padding-top: 50px;
    padding-bottom: 50px;
    padding-right: 60px;
    padding-left: 80px;
    margin: 0;

    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .bubble-base{
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    object-fit: fill;
    z-index: 1;
  }

  .bubble-spike{
    position: absolute;
    top: 50px;
    left: -80px;
  }


</style>