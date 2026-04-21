let totalSeconds: number = 60;

const decreaseButton = document.getElementById("timer-decrease") as HTMLButtonElement
const increaseButton = document.getElementById("timer-increase") as HTMLButtonElement
const startButton = document.getElementById('start-btn') as HTMLButtonElement
const stopButton = document.getElementById('stop-btn') as HTMLButtonElement

const hourElement = document.getElementById('hr') as HTMLElement
const minElement = document.getElementById('min') as HTMLElement
const secElement = document.getElementById('sec') as HTMLElement

async function initializePopup(){
    try {
        const response = await browser.runtime.sendMessage({command: "getStatus"})
        
        if (response) {
            totalSeconds = response.timeLeft
            updateDisplay()
            console.log("Data received and UI updated!")
            if (totalSeconds > 0){
                startTimer()
            }
        }
    }catch (error) {
        console.error("Background script didn't respond")
    }

}

initializePopup()
startButton.addEventListener('click', ()=>{
    console.log("The button was clicked!")
    
    browser.runtime.sendMessage({command: "start", seconds: totalSeconds} ) 
    startTimer()
})

stopButton.addEventListener('click', ()=>{
    stopTimer()
})


class Timer {
    private hours: number;
    private mins: number;
    private secs: number;

    public constructor(hours: number, mins: number, secs: number){
        this.hours = hours;
        this.mins = mins;
        this.secs = secs
    }

}



function decrease(){
    console.log("Decreasing the timer")
    if(totalSeconds >=60){
        totalSeconds -= 60;
        updateDisplay()
    }
}

function increase(){
    console.log("Decreasing the timer")
        totalSeconds += 60;
        updateDisplay()
}
decreaseButton.addEventListener("click", decrease)
increaseButton.addEventListener("click", increase)


function updateDisplay(){
    const minutes = Math.floor(totalSeconds/60) 
    
    if(minElement){
        minElement.textContent = minutes.toString()
    }

    const seconds = totalSeconds % 60
    if(secElement){
        secElement.textContent = seconds.toString()
    }
}


let timerInterval: number | null = null;

function startTimer(){
    if (timerInterval !== null) return;
    timerInterval = setInterval(() => {
        console.log("Timer tick")
        if (totalSeconds >0 ) {
            totalSeconds--;
            updateDisplay();
        } else {
            stopTimer();
        }
    }, 1000)
}

function stopTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}