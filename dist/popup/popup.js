"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let totalSeconds = 60;
const decreaseButton = document.getElementById("timer-decrease");
const increaseButton = document.getElementById("timer-increase");
const startButton = document.getElementById('start-btn');
const stopButton = document.getElementById('stop-btn');
const hourElement = document.getElementById('hr');
const minElement = document.getElementById('min');
const secElement = document.getElementById('sec');
function initializePopup() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield browser.runtime.sendMessage({ command: "getStatus" });
            if (response) {
                totalSeconds = response.timeLeft;
                updateDisplay();
                console.log("Data received and UI updated!");
                if (totalSeconds > 0) {
                    startTimer();
                }
            }
        }
        catch (error) {
            console.error("Background script didn't respond");
        }
    });
}
initializePopup();
startButton.addEventListener('click', () => {
    console.log("The button was clicked!");
    browser.runtime.sendMessage({ command: "start", seconds: totalSeconds });
    startTimer();
});
stopButton.addEventListener('click', () => {
    stopTimer();
});
class Timer {
    constructor(hours, mins, secs) {
        this.hours = hours;
        this.mins = mins;
        this.secs = secs;
    }
}
function decrease() {
    console.log("Decreasing the timer");
    if (totalSeconds >= 60) {
        totalSeconds -= 60;
        updateDisplay();
    }
}
function increase() {
    console.log("Decreasing the timer");
    totalSeconds += 60;
    updateDisplay();
}
decreaseButton.addEventListener("click", decrease);
increaseButton.addEventListener("click", increase);
function updateDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    if (minElement) {
        minElement.textContent = minutes.toString();
    }
    const seconds = totalSeconds % 60;
    if (secElement) {
        secElement.textContent = seconds.toString();
    }
}
let timerInterval = null;
function startTimer() {
    if (timerInterval !== null)
        return;
    timerInterval = setInterval(() => {
        console.log("Timer tick");
        if (totalSeconds > 0) {
            totalSeconds--;
            updateDisplay();
        }
        else {
            stopTimer();
        }
    }, 1000);
}
function stopTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}
