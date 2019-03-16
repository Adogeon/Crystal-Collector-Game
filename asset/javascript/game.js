//global variables
var wins = 0;
var loses = 0;
//var state = 0; //0 is no value initiate

//declare the crystal;
var crystal1,crystal2,crystal3,crystal4
var crystalsMap;
var targetScore = 0;
var playerScore = 0;
var isFinished = false;
class crystal {
    constructor(str) {
        this.id = str;
        this.htmlEl = this.getCrystalHTMLEl();
        this.value = (Math.floor(Math.random()*11))+1;
        this.valueDisplay = false;
    }
    getCrystalHTMLEl() {
        var IDStr = "#"+this.id;
        return $(IDStr);
    }
    updateCrystalValue() {
        this.htmlEl.attr("value",this.value);
    }
}

function randomMulNum() {
    return Math.floor(Math.random()*5);
}

function newGame() {
    crystal1 = new crystal("crystal-1");
    crystal2 = new crystal("crystal-2");
    crystal3 = new crystal("crystal-3");
    crystal4 = new crystal("crystal-4");

    crystalsMap = {
        "crystal-1":crystal1,
        "crystal-2":crystal2,
        "crystal-3":crystal3,
        "crystal-4":crystal4
    }

    while (targetScore === 0) {//prevent edge case of this just equal to 0
        targetScore = crystal1.value*randomMulNum() + crystal2.value*randomMulNum() + crystal3.value*randomMulNum() + crystal4.value*randomMulNum()
    }

    $("#target-num").append(targetScore);
}

function updateScore(crystalDOM) {
    var newValue = crystalsMap[crystalDOM.id].value;
    playerScore += newValue;
    $("#score-num").text(playerScore);
}

function displayCrystalValue(crystalDOM) {
    var tempID = crystalDOM.id;
    if(!crystalsMap[tempID].valueDisplay) {
        $(crystalDOM).append('<span class="crystal-value">'+crystalsMap[tempID].value+'</span>');
        crystalsMap[tempID].valueDisplay = true;
    }
}

function checkForWin() {
    if(playerScore === targetScore) {//win condition
        isFinished = true;
        wins++;
        $("#win-number").text(wins);
        $("#result").html('<i class="far fa-smile-beam text-success text-center fa-4x"></i>');
        $("#reset").removeClass("hidden");
    } else if(playerScore > targetScore) {
        isFinished = true;
        loses++;
        $("#lose-number").text(loses);
        $("#result").html('<i class="far fa-tired text-danger text-center fa-4x"></i>');
        $("#reset").removeClass("hidden");
    }
}

// Assign the value of crystal to the crystal HTML Element 


$(document).ready(function() {
    newGame();
})

$("#reset").on("click", function() {
    if(isFinished) {
        targetScore = 0
        playerScore = 0;
        $(".crystal-value").remove();
        $("#result").empty();
        $("#target-num").empty();
        $("#score-num").empty();
        $("#reset").addClass("hidden");
        isFinished = false;
        newGame();
    }
})

$(".crystal").on("click", function() {
    if (!isFinished) { 
        displayCrystalValue(this); 
        updateScore(this);
        checkForWin();
    }
})


//Debug and test arena


// on click event for crystal button
//    if value not set randomize value for crystal
//    display value on the crystal image
//    if value already set, add the value to player score 
//    update score on the player score section
//    if the score match, display win
//    if the score over, display lost

// on click reset
// reset all the global variables and html