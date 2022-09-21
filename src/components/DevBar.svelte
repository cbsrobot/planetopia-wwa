<script>
  import { userData, loggedIn, simulateLogIn, logOut } from "../modules/DataManager.js";
  
  export let text = ""

  $: loggedInFlag = $loggedIn ? "🟢" : "🔴";
</script>

<div>
  <span on:click={() => simulateLogIn()}>Log in</span> | 
  <span on:click={() => logOut()}>Log out</span> |  
  {loggedInFlag} {" RFID: " + $userData?.rfid} | {text}
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
