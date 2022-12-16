let container = document.getElementById("drawContainer");

var hours = 1;
var minutes = 1;
var seconds = 1;
var timeInSeconds = 0;


function gong() {
    var audio = new Audio("gong.mp3");
    audio.loop = false;
    audio.play();
} //plays the gong sound effect

function drawSetup() {

    //Initialises variables
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
    startButton.onclick = drawCountdown;
    startButton.style.color = "red"; 
    document.getElementById("drawContainer").appendChild(startButton);
}

function drawCountdown() {

    timeInSeconds = 0;

    hours = parseInt(document.getElementById("hours").value);
    minutes = parseInt(document.getElementById("minutes").value);
    seconds = parseInt(document.getElementById("seconds").value);

    var hoursInSeconds = hours * 60 * 60; //converts hours to seconds
    var minutesInSeconds = minutes * 60; //converts minutes to seconds

    timeInSeconds = seconds + minutesInSeconds + hoursInSeconds; //the total summed time from the three input fields in seconds
    console.log(timeInSeconds);

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
    document.getElementById("buttonFlexSpace").appendChild(pause);
    
    var stop = document.createElement("button");
    stop.id = "stopButton";
    stop.innerText = "Stop"
    document.getElementById("buttonFlexSpace").appendChild(stop);

    timeInSeconds = timeInSeconds - 1;

    setInterval(updateTimeDisplay, 1000);
}

function updateTimeDisplay() {
    if (timeInSeconds > 0) {
        timeDisplay.innerText = timeInSeconds;
        timeInSeconds = timeInSeconds - 1;
    }
    else {
        timeDisplay.innerText = 0;
        timeInSeconds = 0;
    }
}