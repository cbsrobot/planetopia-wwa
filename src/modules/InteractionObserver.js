import { writable, derived } from "svelte/store";

const _inactiveTime = writable(0);
export const inactiveTime = derived(_inactiveTime, ($inactiveTime) => $inactiveTime);

let interval;
export function interactionDetected() {
  _inactiveTime.set(0)
  clearInterval(interval)
  interval = setInterval(() => {
    _inactiveTime.update(t => t + 1)
  }, 1000);
}