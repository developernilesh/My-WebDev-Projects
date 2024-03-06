let displayHour = document.getElementById("hour");
let displayMinute = document.getElementById("minute");
let displaySecond = document.getElementById("second");
let displayMilisecond = document.getElementById("milisecond");

let milisec = 0;
let sec = 0;
let min = 0;
let hrs = 0;
let timeInterval;

function resumeHandler(){
    timeInterval = setInterval(updateTimer, 10);
}

function pauseHandler(){
    clearInterval(timeInterval);
}

function resetHandler(){
    clearInterval(timeInterval);
    milisec = 0;
    sec = 0;
    min = 0;
    hrs = 0;
    renderUI();
}

function updateTimer() {
    milisec++;
    if(milisec === 100){
        milisec = 0;
        sec++;
        if(sec === 60){
            sec = 0;
            min++;
            if(min === 60){
                min = 0;
                hrs++;
                if(hrs === 60){
                    resetHandler();
                }
            }
        }   
    }
    renderUI()
}

function renderUI(){
        displayMilisecond.innerHTML = displayManager(milisec);
        displaySecond.innerHTML = displayManager(sec);
        displayMinute.innerHTML = displayManager(min);
        displayHour.innerHTML = displayManager(hrs);
}

function displayManager(time){
    if(time < 10 ){
        return ("0"+ time);
    }
    else{
        return time;
    }
}