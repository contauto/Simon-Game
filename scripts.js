const buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level" + " " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  if (started) {
    let chosenColor = $(this).attr("id");
    userPattern.push(chosenColor);
    playSound(chosenColor);
    animatePress(chosenColor);
    checkAnswer(userPattern.length - 1);
  }
  else{
    $("#level-title").css("color", "red");
    playSound("wrong");
    setTimeout(() => {
        $("#level-title").css("color", "white");
    }, 200);
  }
});

function nextSequence() {
  userPattern = [];
  level++;
  $("#level-title").text("Level" + " " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  $("#" + randomColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomColor);
}

playSound = (name) => {
  let audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
};

animatePress = (color) => {
  $("#" + color).addClass("pressed");
  setTimeout(() => {
    $("#" + color).removeClass("pressed");
  }, 100);
};

checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (gamePattern.length === userPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over. Press any key to restart.");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
};

startOver = () => {
  level = 0;
  started = false;
  gamePattern = [];
};
