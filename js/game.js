///// Global Variables

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//// Event Listeners

$(document).keydown(function(event) {
  if (!started) {
    nextSequence();
    started = true;
  }
  else {
    var choice = event.key;
      switch(choice) {
        case "r" :
          choice = "red";
          break;
        case "b" :
          choice = "blue";
          break;
        case "g" :
          choice = "green";
          break;
        case "y" :
          choice = "yellow";
          break;
        default :
          console.log(choice);
    }
    userClickedPattern.push(choice);
    playSound(choice);
    animatePress(choice);
    checkAnswer(userClickedPattern.length - 1);
  }
});


$(".btn").click(function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});



////// Functions

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level: " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Animate and play sound
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(name) {
  var selectedButton = $("#" + name);
  selectedButton.addClass("pressed");
  setTimeout(function(){
    selectedButton.removeClass("pressed");
  }, 100);
}

function checkAnswer(index) {
  if (userClickedPattern[index] === gamePattern[index]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();

  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}
