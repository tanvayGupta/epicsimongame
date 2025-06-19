const colors = ["red", "blue", "green", "yellow"]; // 0 - red, 1 - blue, 2 - green, 3 - yellow
var gamePattern = [];
var gamePatternClone = [];
var userClickedPattern = [];
var userMouseInputEnabled = false;
var userKeyboardInputEnabled = true;
var gameOver = false;
var level = 1;

// for (let lvl = 0; lvl < level; lvl++) {

// }

// startGame();
// gameLogic();



function startGame() {
    userMouseInputEnabled = true;
    userKeyboardInputEnabled = false;
    gameOver = false;
    level = 1;
    $("h1").text("Level " + level);
    $("body").removeClass("game-over");
    gamePattern = [];
    userClickedPattern = [];
    gameFlash();
}


$(".btn").click(function(){
    var userColor = $(this).data('color');
    var userClick = colors.indexOf(userColor);
    gotClicked(userClick);
});

$(document).keydown(function () {
    if (gameOver === true) {
        startGame();
        gameOver = false;
    }
    else if (userKeyboardInputEnabled === true){
        startGame();
    }
});

function gotClicked(userClick) {
    if (userMouseInputEnabled === true && userClickedPattern.length < level) {
        userFlash(userClick);
        var lastIndex = userClickedPattern.length - 1;
        if (userClick !== gamePattern[lastIndex]) {
            gameOver = true;
            userMouseInputEnabled = false;
            var wrongSound = new Audio("assets/sounds/wrong.mp3");
            wrongSound.play();
            // Display Game Over message
            $("h1").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 500);


        }
        if (userClickedPattern.length == level) {
            level++;
            $("h1").text("Level " + level);
            userClickedPattern = [];
            userMouseInputEnabled = false;
            setTimeout(function() {
                gameFlash();
              }, 1000);
            
            
            // console.log("User Clicked Pattern: " + userClickedPattern);
            // console.log("Game Pattern: " + gamePattern);
            // console.log("Level: " + level);

        }

        // userClickedPattern.push(userClick);
        // for (let i = 0; i < userClickedPattern.length; i++) {
        //     if (userClickedPattern[i] != gamePattern[i]) {
        //         gameOver = true;
        //         break;
        //     }
        // }

    }
}

function gameFlash() {
    userMouseInputEnabled = false;
    var randomItem = Math.floor(Math.random() * colors.length);
    $("#" + colors[randomItem]).fadeOut(100).fadeIn(100);
    var sound = new Audio("assets/sounds/" + colors[randomItem] + ".mp3");
    sound.play();
    gamePattern.push(randomItem);
    userMouseInputEnabled = true;
}

function userFlash(userClick) {
    $("#" + colors[userClick]).fadeOut(100).fadeIn(100);
    var sound = new Audio("assets/sounds/" + colors[userClick] + ".mp3");
    sound.play();
    userClickedPattern.push(userClick);
    // console.log("User Clicked: " + userClickedPattern[userClickedPattern.length - 1]);

}
