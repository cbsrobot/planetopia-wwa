// Show svelte app

import App from './App.svelte';

const app = new App({
	target: document.body,
});



// Modify console.log function globally (in renderer)

const LOG_HISTORY_MAX_SIZE = 10;

console.defaultLog = console.log;
console.logHistory = []

console.log = function(){
	console.defaultLog.apply(console.defaultLog, arguments)
	if(console.logHistory.length >= LOG_HISTORY_MAX_SIZE) console.logHistory.shift();
  console.logHistory.push(arguments)
};

window.addEventListener('error', function(event) {
  console.log('Window:', event.error.stack);
});