<script>
  const { ipcRenderer } = require('electron')
  const fs              = require('fs');
  const { parse }       = require('csv-parse');
  const path            = require('path');
  
  import ProgressIndicator from "./ProgressIndicator.svelte";

  const debug     = true
  const showerror = false
  const apiurl    = 'http://localhost:3000'
  const locale    = ['de', 'fr', 'en']
  const dt        = 600 // default timeout in seconds
  
  let errormsg       = ""
  let rfid           = 'a' //undefined
  let language       = undefined
  let avatarpos      = []
  let bubbleimage    = ""
  let bubblepos      = []
  let pagetext       = ""
  let pagetextpos    = []
  let timer          = dt
  let selectedButton = 0
  
  let showbuttons = false
  let buttonText1 = ""
  let buttonText2 = ""
  let buttonText3 = ""
  let buttonText4 = ""
  
  let page = 0
  let avatar = 1
  // 1: intro, 2: kleidung, 3: wohnen, 4: mobil, 5: auswertung
  let type = process.env.wwastation || 1
  
  // text and translations
  let text = {}
  
  // settings
  let s = {
    1: {
      default: {
        showbuttons:  false,
        bubbleimage: "assets/b1.png",
        textpos:     ["410px", "850px", "900px", "360px"], // top, left, width, height
        avatarpos:   ["250px", "0px", "800px"], // top, left, width
        bubblepos:   ["400px", "680px"] // top, left
      },
      8: {
        showbuttons: true,
        bubbleimage: "assets/b2.png",
        textpos:     ["174px", "700px", "970px", "360px"],
        avatarpos:   ["250px", "0px", "600px"], // top, left, width
        bubblepos:   ["220px", "530px" ] // top, left
      },
      length: 10,
    },
    2: {
      default: { 
      },
      8: { 
      },
      length: 9,
    }
  }

  // read csv for i18n
  fs.createReadStream("./src/text.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      text[row[0]] = [row[1],row[2],row[3]];
  })
  
  // reset timer
  setInterval(() => {
    if (timer > 0) timer--;
    else reset()
  }, 1000);
  
  // simple i18n
  function __(t) {
    return (t in text) ? text[t][locale.indexOf(language ? language : 'de')] : t
  }
  
  // show page to scan rfid
  function reset() {
    timer = dt
    page = 0
    //rfid = undefined
    language = undefined
    selectedButton = 0
  }
  
  // next button
  function handleNext() {
    timer = dt
    page += 1
    if (page > s[type]["length"]) reset();
  }

  // api calls
  function setLanguage (lang) {
    timer = dt
    let dataJson = {}
    fetch(`${apiurl}/api/language`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rfid: rfid,
        language: lang
      })
    })
    .then(resp => {
      if (resp.status === 200) {
        //return resp.json()
        return resp.text()
      } else {
        console.log("Status: " + resp.status)
        showErrorMsg()
        return Promise.reject("server")
      }
    })
    .then(data => {
      dataJson = JSON.parse(data)
      language = dataJson.language
      avatar   = dataJson.avatar
      page     = 1
    })
    .catch(err => {
      if (err === "server") return
        showErrorMsg()
        console.log(err)
    })
  }
  
  function handleGoodClick() {
    //ipcRenderer.send('ping-good', 'ping')
    //goodresponse = 'Waiting..'
  } 

  function handleBadClick() {
    //badresponse = ipcRenderer.sendSync('ping-bad', 'ping')
  }

  ipcRenderer.on('rfid', (event, response) => {
    rfid = response
    //const res = await fetch(apiurl + '/api/language/get', {
    const res = fetch(`${apiurl}/api/language/${rfid}`)
    
    console.log(res)
    //const json = res.json()
    //result = JSON.stringify(json)

  })
  
  // show human error message for x seconds
  function showErrorMsg() {
    errormsg = __('error')
    showerror = true
    setTimeout(function() {
      errormsg = ""
      showerror = false
    }, 5000)
  }

  // get content
  function getContent(){

    if (page in s[type] ) {
      bubblepos   = s[type][page]["bubblepos"]
      pagetextpos = s[type][page]["textpos"]
      avatarpos   = s[type][page]["avatarpos"]
      showbuttons = s[type][page]["showbuttons"]
      bubbleimage = s[type][page]["bubbleimage"]
    } else {
      bubblepos   = s[type]["default"]["bubblepos"]
      pagetextpos = s[type]["default"]["textpos"]
      avatarpos   = s[type]["default"]["avatarpos"]
      showbuttons = s[type]["default"]["showbuttons"]
      bubbleimage = s[type]["default"]["bubbleimage"]
    }
    
    if (showbuttons) {
      buttonText1 = text[`${type}.${page}.1`][locale.indexOf(language ? language : 'en')]
      buttonText2 = text[`${type}.${page}.2`][locale.indexOf(language ? language : 'en')]
      buttonText3 = text[`${type}.${page}.3`][locale.indexOf(language ? language : 'en')]
      buttonText4 = text[`${type}.${page}.4`][locale.indexOf(language ? language : 'en')]
    }
    
    let tmppagetext = (`${type}.${page}` in text ) ? text[`${type}.${page}`][locale.indexOf(language ? language : 'en')] : ""
    // get avatar name / hints
    const re = /#(\d)/i;
    const match = tmppagetext.match(re)
    pagetext = (match) ? tmppagetext.replace(re, text[`m.${avatar}.${match[1]}`][0]) : tmppagetext
  }
  
  $: timeleft = Math.floor(timer)
  $: page, getContent()
  
</script>

<main>
{#if rfid === undefined}
  <img id="logo" alt="" src="assets/l{type}.png">
  <p>Halte deinen Jeton auf den roten Punkt.</p>
  <p>Place ton jeton sur le point rouge.</p>
  <p>Hold your token on the red dot.</p>  
  
{:else if language === undefined}
  <div id="languagewrapper">
    <button id="debutton" on:click={() => setLanguage("de")}>Deutsch</button>
    <button id="frbutton" on:click={() => setLanguage("fr")}>Francais</button>
    <button id="enbutton" on:click={() => setLanguage("en")}>English</button>
  </div>
{:else}
  <img alt="" style="position:absolute; top:{avatarpos[0]}; left:{avatarpos[1]}; width:{avatarpos[2]};" src="assets/avatar/{avatar}.jpg">
  <img alt="" style="position:absolute; top:{bubblepos[0]}; left:{bubblepos[1]};" src="{bubbleimage}">
  <ProgressIndicator position={page} length={s[type]["length"]}/>
  <p id="pagetext" style="top:{pagetextpos[0]}; left:{pagetextpos[1]}; width:{pagetextpos[2]}; height:{pagetextpos[3]}">
    {pagetext}
  </p>
  {#if showbuttons}
  <div class="buttons">
    <button on:click={() => selectedButton = 1} class="{selectedButton === 1 ? 'selected' : ''}">{buttonText1}</button>
    <button on:click={() => selectedButton = 2} class="{selectedButton === 2 ? 'selected' : ''}">{buttonText2}</button>
    <button on:click={() => selectedButton = 3} class="{selectedButton === 3 ? 'selected' : ''}">{buttonText3}</button>
    <button on:click={() => selectedButton = 4} class="{selectedButton === 4 ? 'selected' : ''}">{buttonText4}</button>
  </div>
  {/if}
  <button id="nextbutton" on:click={handleNext} disabled={showbuttons && selectedButton === 0}>{__('next')}</button>
  <button id="stopbutton" on:click={reset}>{__('stop')}</button>
{/if}
{#if debug}
  <p id="debugmsg">D: {language} | page: {page} | avatar: {avatar} | timeleft: {timeleft}</p>
{/if}
{#if showerror}
  <p id="errormsg">{errormsg}</p>
{/if}
</main>

<style>

  /* montserrat-regular - latin */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/montserrat-v25-latin-regular.eot'); /* IE9 Compat Modes */
    src: local(''),
         url('/fonts/montserrat-v25-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('/fonts/montserrat-v25-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
         url('/fonts/montserrat-v25-latin-regular.woff') format('woff'), /* Modern Browsers */
         url('/fonts/montserrat-v25-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
         url('/fonts/montserrat-v25-latin-regular.svg#Montserrat') format('svg'); /* Legacy iOS */
  }

  /* montserrat-800 - latin */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 800;
    src: url('/fonts/montserrat-v25-latin-800.eot'); /* IE9 Compat Modes */
    src: local(''),
         url('/fonts/montserrat-v25-latin-800.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('/fonts/montserrat-v25-latin-800.woff2') format('woff2'), /* Super Modern Browsers */
         url('/fonts/montserrat-v25-latin-800.woff') format('woff'), /* Modern Browsers */
         url('/fonts/montserrat-v25-latin-800.ttf') format('truetype'), /* Safari, Android, iOS */
         url('/fonts/montserrat-v25-latin-800.svg#Montserrat') format('svg'); /* Legacy iOS */
  }

  :global(body) {
    margin: 0px;
    padding: 0px;
    background-color: #EEE;
  }

  :global(a) {
    text-decoration: none;
    color: #551a8b;
  }

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
    font-family: "Montserrat", sans-serif;
    font-size: 2rem;
    background-color: #FFF;
  }

  #logo {
    margin: 300px auto 100px auto;
    width: 200px;
  }
    
  #nextbutton {
    display: block;
    position: absolute;
    right: 120px;
    bottom: 50px;
    min-width: 7em;
  }

  #stopbutton {
    display: block;
    position: absolute;
    right: 120px;
    top: 50px;
  }
  
  #pagetext{
    display: block;
    position: absolute;
    overflow: hidden;
    text-align: left;
    font-size: 3rem;
  }
  
  #errormsg {
    display: block;
    position: absolute;
    left: 10px;
    top: 200px;
    font-size: 1rem;
  }

  #languagewrapper {
    position: absolute;
    top: 300px;
    width: 10%;
    text-align: center;
  }

  #languagewrapper > button {
    margin-top: 2em;
    min-width: 7em;
  }

  #debugmsg {
    display: block;
    position: absolute;
    left: 10px;
    bottom: 10px;
    font-size: 1rem;
    color:#AAA;
  }
  
  .selected {
    background-color: #999;
  }
  
  .buttons {
    position: absolute;
    top: 520px;
    left: 690px;
  }

  .buttons > button {
    display: block;
    min-width: 28em;
    
  }


</style>