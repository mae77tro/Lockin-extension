"use strict";
let timeLeft = 0;
let timerRunning = false;
browser.runtime.onMessage.addListener((message) => {
    if (message.command === "start") {
        timeLeft = message.seconds;
        startBackgroundTimer();
    }
    else if (message.command === "getStatus") {
        return Promise.resolve({ timeLeft, timerRunning });
    }
});
function startBackgroundTimer() {
    timerRunning = true;
    const interval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
        }
        else {
            clearInterval(interval);
            timerRunning = false;
        }
    }, 1000);
}
