//variable declarations
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["blue", "green", "red", "yellow"];
var randomChosenColor;
var level = 0;
var index = 0;


//game start logic
$("body").on("keydown",function(){
    //put startOver before nextSequence since nextSequence doesnt clear everything and continues with current values if 
    //user are inputting the correct patterns.
    startOver();
    nextSequence();
})

//Keeps track of what index we are on so we can compare if the values are the same.
$("div[type=button]").on("click", function(){
   var userChosenColor = this.id;
   userClickedPattern.push(userChosenColor);
   playSound(userChosenColor);
   animatePress(userChosenColor);
   checkAnswer(index);
   index++;
})


//Functions---------
//play sounds for pattern and user clicks
function playSound(name){
    var playRandomColorSound = new Audio('sounds/' +name + '.mp3');
    playRandomColorSound.play();
}

function nextSequence(){
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    playSound(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColor);
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
}

function animatePress(currentColor){
    var activeButton = document.querySelector("#"+ currentColor);
    activeButton.classList.add("pressed");
    setTimeout(function(){
        activeButton.classList.remove("pressed");
    },100)
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function(){
                //we set index here to zero since we know the sequence is complete and correct.
                //if we were to set it elsewhere then the logic wouldnt make sense
                index = 0;
                nextSequence();
            },1000)
        }
    }   
    else{
        playSound("wrong");
        document.querySelector("body").classList.add("game-over");
        setTimeout(function(){
            document.querySelector("body").classList.remove("game-over");
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart");
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    index = 0;
}