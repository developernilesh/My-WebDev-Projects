const hour = document.getElementById("hour")
const minute = document.getElementById("minute")
const second = document.getElementById("second");
let hr,min,sec,hrRotation,minRotation,secRotation;

setInterval(() => {
    let time = new Date();
    hr = time.getHours();
    min = time.getMinutes();
    sec = time.getSeconds();
    
    hrRotation = 30*hr + min/2;
    minRotation = 6*min;
    secRotation = 6*sec;

    hour.style.transform = `rotate(${hrRotation}deg)`
    minute.style.transform = `rotate(${minRotation}deg)`
    second.style.transform = `rotate(${secRotation}deg)`
}, 1000);