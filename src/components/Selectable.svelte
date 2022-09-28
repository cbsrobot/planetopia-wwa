<script>
  export let selected = false;
  export let neutral = true;
  export let text = "Some text";
</script>

<button on:click class:selected class:neutral>
  <div>{text}</div>
  <img alt="" src="assets/icons/tick.svg" class:hidden = {!selected}/>
</button>

<style>
  button {
    display: flex;
    align-items: center;
    justify-content: space-between;

    align-self:stretch;
    padding: 1rem 1rem;
    margin: 1rem 1rem;
    color: #2d2d2d;
    font-size: 36px;
    outline: none;

    font-family: "Sanuk", sans-serif;
    background-color: hsla(0, 0%, 0%, 0);

    border: solid 5px;
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    border-bottom-right-radius: 225px 15px;
    border-bottom-left-radius: 15px 255px;

    width:100%;
  }

  .selected{
    box-shadow: 0 0 0 3px #2d2d2d;
    background-color: white;
  }

  .neutral{
    background-color: #f5f5f5;
  }

  div {
    padding: 0 0.5rem;
    display: inline;
    overflow-wrap: break-word;
    text-align: start;
  } 

  img {
    padding: 1rem 0.5rem;
    height: 2rem;
    width: 2rem;
  }

  button:active {
    background-color: white;
  } 

  .hidden{
    visibility: hidden;
  }

</style>
