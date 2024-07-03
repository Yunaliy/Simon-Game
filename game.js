let buttonColor = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let start = false;

$('html').on('keydown', function () {
  if (!start) {
    $('#level-title').text('Level ' + level);
    nextSequence();
    start = true;
  }
});

function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
}

$('.btn').on('click', function () {
  $('#level-title').text('Level ' + level);

  let userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    $('h1').text('Game Over, Press any key to Restart');
    $('#input').removeClass('hidden');
    startOver();
  }
}
function nextSequence() {
  $('#input').addClass('hidden');
  userClickedPattern = [];
  level++;
  $('#level-title').text('Level ' + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  $('#' + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

// for playing the button sound
function playSound(name) {
  let buttonSound = new Audio('sounds/' + name + '.mp3');
  buttonSound.play();
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');
  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}
