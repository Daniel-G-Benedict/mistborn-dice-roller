var dice = 2;
var rollResults = [];
var lastChecked;
var resultsString = new String;
var resultsImages = new Array;

// variables to check for doubles
var doubles = 0;
var nudges = 0;

function addDice()  {
    ++dice;
    console.log("Now rolling " + dice + " dice");
    document.getElementById("diceCounter").innerHTML =  dice;
};

function removeDice()  {
    if (dice > 2) {
        --dice;
    }
    console.log("Now rolling " + dice + " dice");
    document.getElementById("diceCounter").innerHTML = dice;
};


function makeResultsString(n) {

    resultsString = resultsString + n.toString()  + " , ";
}

function placeImage(n) {

    // get the results inner HTML
    var resultsNodeHTML = document.getElementById("results").innerHTML
    
    // add a new image to it
    document.getElementById("results").innerHTML = resultsNodeHTML + "<img src='Assets/DiceFace__"+ n + ".jpg' alt='diceResult_"+ n + "' width='60' height='60'>";
}


// A function to check for doubles
function checkDoubles(n) {
    // if the roll is a six, it is a nudge.
    if (n == 6) {
        ++nudges;
    }
    // if the roll is not a six, check for doubles
    if (n != 6) {
        if (n == lastChecked) {
            doubles = n;
        }
        if (doubles > n) {
            return;
        }
    }

    lastChecked = n;
}

function rollDice() {
    // status check
    console.log("Rolling " + dice + " dice");
    // Roll once for each die the roller has opted for
    for (let rollNum  = 0; rollNum < dice; rollNum++) {
        // each roll should have a random value from 1 -> 6
        var roll = Math.floor(Math.random() * 6 + 1);
        // the resulting number is put into an array
        rollResults.push(roll);
        // status check
        //console.log(rollResults);
    }

    // sort the results numerically
    rollResults.sort(function(a,b){return b-a})
    console.log(rollResults);

    rollResults.forEach(checkDoubles);
    //rollResults.forEach(makeResultsString);

    document.getElementById("results").innerHTML = "";

    rollResults.forEach(placeImage)

    //console.log(resultsString);

    //console.log("Highest roll : " + doubles);
    //console.log("Nudges : " +  nudges);

    document.getElementById("summary").innerHTML = "Highest roll : " + doubles + "<br>" + "Nudges : " + nudges;
    //document.getElementById("results").innerHTML = resultsString;

    rollResults =  [];
    nudges = 0;
    doubles = 0;
    //console.log(rollResults);
};



// Check the fairness of the rolling mathematics by printing a random test.
function  checkFair() {
    var fairRolls = Math.floor(Math.random() *1000 + 1);
    var fairResults = [];

    var totalDiceRolled = 0;

    var one = 0;
    var two  = 0;
    var three = 0;
    var four = 0;
    var five =  0;
    var six = 0;

    console.log("Number of times tested : " + fairRolls);

    for (i = 0; i < fairRolls; i++) {

        eval("roll_" + i + " = []");

        console.log(eval("roll_"+i));

        var fairRollsDice = Math.floor(Math.random() * 10 + 1);

        totalDiceRolled = totalDiceRolled + fairRollsDice;

        for (j = 0; j<fairRollsDice; j++) {
            var roll = Math.floor(Math.random() * 6 + 1);
            eval("roll_" + i).push(roll);
            fairResults.push(eval("roll_"+i));
            //console.log(fairResults.length);

            if (roll === 1) {
                ++one;
            }
            if (roll === 2) {
                ++two;
            }
            if (roll === 3) {
                ++three;
            }
            if (roll === 4) {
                ++four;
            }
            if (roll === 5) {
                ++five;
            }
            if (roll === 6) {
                ++six;
            }

        }
    }

    document.getElementById("fairCheck").innerHTML = "Don't trust me? Well, you just tested " 
                                                        + fairRolls  +  " rolls. <br><br> are you proud? <br><br>"  + 
                                                        "There were " +  totalDiceRolled + " total  dice rolled.";

    document.getElementById("resultsTable").innerHTML = "<tr><th>Number   </th><th>Instances  </th></tr>"
                                                        + "<tr><td>  1 </td><td>" + one  + "</td></tr>"
                                                        + "<tr><td>  2 </td><td>" + two  + "</td></tr>"
                                                        + "<tr><td>  3 </td><td>" + three  + "</td></tr>"
                                                        + "<tr><td>  4 </td><td>" + four  + "</td></tr>"
                                                        + "<tr><td>  5 </td><td>" + five  + "</td></tr>"
                                                        + "<tr><td>  6 </td><td>" + six  + "</td></tr>";
}
