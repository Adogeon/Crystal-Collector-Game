//global variables
var wins = 0;
var loses = 0;
//var state = 0; //0 is no value initiate

//declare the crystal;
var crystal1,crystal2,crystal3,crystal4
var crystals = [];
var targetNum = 0;
var playerScore = 0;
var state = 0;
class crystal {
    constructor(str) {
        this.id = str;
        this.htmlEl = this.getCrystalHTMLEl();
        this.value = (Math.floor(Math.random()*11))+1;
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

    crystals = [crystal1,crystal2,crystal3,crystal4]

    while (targetNum === 0) {//prevent edge case of this just equal to 0
        targetNum = crystal1.value*randomMulNum() + crystal2.value*randomMulNum() + crystal3.value*randomMulNum() + crystal4.value*randomMulNum()
    }

    $("#target-num").append(targetNum);
}

function updateScore(crystalEl) {
    var newValue = 0;
    console.log(crystalEl.id);
    crystals.forEach(function(element) {
        console.log(element.getCrystalHTMLEl().id);
        if(element.id === crystalEl.id) {
            newValue = element.value;
        }
    })
    playerScore += newValue;
    
}

function

// Assign the value of crystal to the crystal HTML Element 
newGame();
$(".crystal").on("click", function() {
    if (state < 2) { 
        if(state === 0) {
            // shown the crystal value & add the score to value
            console.log("clicking");
            console.log(this.id);
            switch (this.id) {
                case "crystal-1":
                    //show crystal value
                    //problem: how to display the value, on top of the crystal or somewhere else ?
                    $(this).append(crystal1.value);
                    break;
                case "crystal-2":
                    $(this).append(crystal2.value);
                    break;
                case "crystal-3":
                    $(this).append(crystal3.value);
                    break;
                case "crystal-4":
                    $(this).append(crystal4.value);
                    break;
            }
            state = 1; 
        }   
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