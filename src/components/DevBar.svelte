<script>
  import { userData, loggedIn, simulateLogIn, logOut } from "../modules/DataManager.js";
  import { reportError } from "../modules/ProblemCollector.js"; 
  
  export let text = ""

  $: loggedInFlag = $loggedIn ? "🟢" : "🔴";
</script>

<div>
  <span on:click={() => simulateLogIn()}>Log in random</span> | 
  <span on:click={() => simulateLogIn("123")}>Log in with id "123"</span> | 
  <span on:click={() => simulateLogIn("567")}>Log in with id "567"</span> | 
  {loggedInFlag} {" RFID: " + $userData?.rfid} | 
  <span on:click={() => { console.log("Log out Button logOut"); logOut("DEV_LOG_OUT_BUTTON")}}>Log out</span> | {text} |
  <span on:click={() => reportError("test error occured")}>Show error</span> |
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
