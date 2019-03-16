//global variables
var wins = 0;
var loses = 0;
//var state = 0; //0 is no value initiate

//declare the crystal;
var crystal1,crystal2,crystal3,crystal4
var crystalsMap;
var targetScore = 0;
var playerScore = 0;
var state = 0;
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
        $(crystalDOM).append(crystalsMap[tempID].value);
        crystalsMap[tempID].valueDisplay = true;
    }
}

function checkForWin() {
    if(playerScore === targetScore) {//win condition
        state = 1;
        wins++;
        $("#win-number").text(wins);
    } else if(playerScore > targetScore) {
        state = 1;
        loses++;
        $("#lose-number").text(loses);
    }
    if(state === 1) {
        $("#reset").hidden = false;
    }
}

// Assign the value of crystal to the crystal HTML Element 
newGame();
$(".crystal").on("click", function() {
    var isFinished = state === 1;
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