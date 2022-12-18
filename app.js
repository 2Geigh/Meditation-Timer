let container = document.getElementById("drawContainer");

var hours = 1;
var minutes = 1;
var seconds = 1;
var timeInSeconds = 0;

var timerActive = false;

function gong() {
    var audio = new Audio("gong.mp3");
    audio.loop = false;
    audio.play();
} //plays the gong sound effect

function drawSetup() {

    //Initialises variables
    timerActive = false;
    hours = 1;
    minutes = 1;
    seconds = 1;
    timeInSeconds = 0;

    document.getElementById("drawContainer").innerHTML = ""; //Clears all content in #drawContainer to initialise it

    //creates form for flexbox and start button to go into
    var timeForm = document.createElement("form");
    timeForm.id = "timeForm"
    document.getElementById("drawContainer").appendChild(timeForm);

    //Creates flexbox inside form for the time input boxes to go into
    var flexDiv = document.createElement("div");
    flexDiv.display = "flex";
    //flexDiv.innerHTML = "flexDiv";
    flexDiv.id = "flexDiv";
    document.getElementById("timeForm").appendChild(flexDiv);

    //Creates hour input box
    var hour = document.createElement("input");
    hour.id = "hours"
    hour.type = "number";
    hour.placeholder = "hours";
    hour.min = "0";
    hour.max = "99";
    document.getElementById("flexDiv").appendChild(hour);

    //Creates minute input box
    var minute = document.createElement("input");
    minute.id = "minutes"
    minute.type = "number";
    minute.placeholder = "minutes";
    minute.min = "0";
    minute.max = "999";
    document.getElementById("flexDiv").appendChild(minute);

    //Creates seconds input box
    var second = document.createElement("input");
    second.id = "seconds"
    second.type = "number";
    second.placeholder = "seconds";
    second.min = "0";
    second.max = "9999";
    document.getElementById("flexDiv").appendChild(second);

    //Creates the button to start the timer using the given values of the three time boxes
    var startButton = document.createElement("button");
    startButton.id = "startButton"
    //startButton.type = "submit";
    startButton.innerHTML = "Start";
    startButton.onclick = checkTimeValidity;
    startButton.style.color = "red"; 
    document.getElementById("drawContainer").appendChild(startButton);
}

function checkTimeValidity() {
    var timeValidity = true; //assumes that the inputted time is valid to begin with proir to checking

    timeInSeconds = 0;

    hours = document.getElementById("hours").value;
    minutes = document.getElementById("minutes").value;
    seconds = document.getElementById("seconds").value;

    var timeInputValues = [hours, minutes, seconds];

    //Accounts for empty fields
    if (hours.trim() == "") { hours = 0; }
    if (minutes.trim() == "") { minutes = 0; }
    if (seconds.trim() == "") { seconds = 0; }

    //Converts string input to integer
    hours = parseInt(hours);
    minutes = parseInt(minutes);
    seconds = parseInt(seconds);

    //Checks for invalid input fieds
    if (isNaN(hours) == true) { hours = 0; }
    if (isNaN(minutes) == true) { minutes = 0; }
    if (isNaN(seconds) == true) { seconds = 0; }

    var hoursInSeconds = hours * 60 * 60; //converts hours to seconds
    var minutesInSeconds = minutes * 60; //converts minutes to seconds

    timeInSeconds = seconds + minutesInSeconds + hoursInSeconds; //the total summed time from the three input fields in seconds
    console.log(timeInSeconds);

    //the following checks that the individual inputs are valid
    for (let i = 0; i < timeInputValues.length; i++) {
        if (isNaN(timeInputValues[i]) == true || timeInputValues[i] < 0) {
            timeValidity = false;
            alert("Please enter a valid time.");
            drawSetup();
            break;
        }

        //the following checks if the total time is valid
        else if (timeInSeconds <= 0) {
            timeValidity = false;
            alert("Please enter a valid time.");
            drawSetup();
            break;
        }

        else if (timeInSeconds == 1) {
            timeValidity = false;
            alert("Please input a time greater than one second.");
            drawSetup();
            break;
        }
    }

    if (timeValidity == true) {
        drawCountdown();
    }
}

function drawCountdown() {
    document.getElementById("drawContainer").innerHTML = ""; //Clears all content in #drawContainer to initialise it
    
    var timeDisplay = document.createElement('h3')
    timeDisplay.id = "timeDisplay";
    timeDisplay.innerText = timeInSeconds;
    document.getElementById("drawContainer").appendChild(timeDisplay);

    var buttonFlexSpace = document.createElement("div");
    buttonFlexSpace.display = "flex";
    buttonFlexSpace.id = "buttonFlexSpace";
    document.getElementById("drawContainer").appendChild(buttonFlexSpace);

    var pause = document.createElement("button");
    pause.id = "pauseButton";
    pause.innerText = "Pause"
    pause.onclick = pauseTimer;
    document.getElementById("buttonFlexSpace").appendChild(pause);
    
    var stop = document.createElement("button");
    stop.id = "stopButton";
    stop.innerText = "Stop"
    stop.onclick = stopTimerAndReset;
    document.getElementById("buttonFlexSpace").appendChild(stop);
    
    timeInSeconds = timeInSeconds - 1;
    timerActive = true;
    const timerInterval = setInterval(updateTimeDisplay, 1000);

    function pauseTimer() {
        if (timerActive == true) {
            timerActive = false;
            console.log("PAUSED");
        }

        else if (timerActive == false) {
            timerActive = true;
            console.log("UNPAUSED");
        }
    }

    function stopTimerAndReset() {
        timerActive = false;
        clearInterval(timerInterval);
        drawSetup();
    }
}

function updateTimeDisplay() {
    if ((timerActive == true) && (timeInSeconds >= 0)) {
        timeDisplay.innerText = timeInSeconds;
        timeInSeconds = timeInSeconds - 1;
        console.log("TIMER ACTIVE: ", timerActive);
        console.log(timeInSeconds);
    }

    if (timerActive == false) {
        timeDisplay.innerText = timeInSeconds;
        timeInSeconds = timeInSeconds;
        console.log("TIMER ACTIVE: ", timerActive);
        console.log(timeInSeconds);
    }
}