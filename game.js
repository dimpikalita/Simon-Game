var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// $("button").on("click", nextSequence);
$(document).on("keypress", function() {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function() {
  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    console.log("wrong");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      document.querySelector("body").classList.remove("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColour);

  $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    document.querySelector("#" + currentColor).classList.remove("pressed");
  }, 100);
}

function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}
