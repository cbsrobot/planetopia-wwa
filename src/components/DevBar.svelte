<script>
  import { userData, loggedIn, simulateLogIn, logOut } from "../modules/DataManager.js";
  
  export let text = ""

  $: loggedInFlag = $loggedIn ? "🟢" : "🔴";
</script>

<div>
  <span on:click={() => simulateLogIn()}>Log in random</span> | 
  <span on:click={() => simulateLogIn("123")}>Log in with id "123"</span> | 
  {loggedInFlag} {" RFID: " + $userData?.rfid} | 
  <span on:click={() => logOut()}>Log out</span> | {text} 
</div>

<style>
  div {
    position: absolute;
    width: 95%;
    bottom: 15px;
    left: 30px;
    font-size: 1.3rem;
    text-align: start;
  }

  span {
    color: blue;
    cursor: pointer;
  }
</style>
