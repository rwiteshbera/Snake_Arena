// Game Constants and Variables
var inputDirection = {
  x: 0,
  y: 0,
};
const eat = new Audio("../audios/eating.wav"); // When the snake eats food
const gameOver = new Audio("../audios/gameOver.wav"); // When the game is over
const backgroundMusic = new Audio("../audios/bg-bit-music.mp3"); // Background Music
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArray = [
  {
    x: 13,
    y: 15,
  },
];

let food = {
  x: 6,
  y: 7,
};

// Game Functions
function main(current_time) {
  window.requestAnimationFrame(main);
  if ((current_time - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = current_time;
  gameEngine();
}

// Create collide function
function isCollide(snakeArray) {

  // If you collide with yourself
  for (let i = 1; i < snakeArray.length; i++) {
    if (snakeArray[0].x === snakeArray[i].x && snakeArray[0].y === snakeArray[i].y) {
    backgroundMusic.pause();
    gameOver.play();
      return true;
    }
  }

  // If you collide with the walls
  if (snakeArray[0].x < 0 || snakeArray[0].x > 18 || snakeArray[0].y < 0 || snakeArray[0].y > 18) {
      backgroundMusic.pause();
    gameOver.play();
    return true;
  }
}

function gameEngine() {
  // Update the snake array
  if (isCollide(snakeArray)) {
    alert("Game Over. Press any key to play again!");
    inputDirection = { x: 0, y: 0 };
    snakeArray = [
      {
        x: 12,
        y: 12,
      },
    ];
    backgroundMusic.play();
    score = 0;
  }

  // If you have eaten the food, increment the score and regenerate the food
  if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
    eat.play();
    score++;
    if(score>highScore){
        // set the high score
        highScore = score;
        localStorage.setItem("highScore",score);
        highScoreBox.innerHTML = "High Score: " + highScore;
    }
    scoreBox.innerHTML = "Score: " + score;

    // Increase the speed
    if (score % 5 === 0) {
      speed++;
    }

    snakeArray.unshift({
      x: snakeArray[0].x + inputDirection.x,
      y: snakeArray[0].y + inputDirection.y,
    });
    let a = 2;
    let b = 16;
    food = {
      // Generating random number betweeen a and b
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Move the snake
  for (let i = snakeArray.length - 1; i > 0; i--) {
    snakeArray[i].x = snakeArray[i - 1].x;
    snakeArray[i].y = snakeArray[i - 1].y;
  }

  snakeArray[0].x += inputDirection.x;
  snakeArray[0].y += inputDirection.y;

  // Render the snake
  board.innerHTML = ""; //Clean the board

  snakeArray.forEach((e, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("snakeHead");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // Display the food
  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Display the score
let highScore = localStorage.getItem("highScore");
if (highScore === null) {
    localStorage.setItem("highScore", 0);
}
else {
    highScoreBox.innerHTML = "High Score: " + highScore;
}  // Display the high score

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDirection = { x: 0, y: 1 }; // Start the game
  backgroundMusic.play();

  switch (e.key) {
    case "ArrowUp":
      inputDirection.x = 0;
      inputDirection.y = -1;
      break;

    case "ArrowDown":
      inputDirection.x = 0;
      inputDirection.y = 1;
      break;

    case "ArrowLeft":
      inputDirection.x = -1;
      inputDirection.y = 0;
      break;

    case "ArrowRight":
      inputDirection.x = 1;
      inputDirection.y = 0;
      break;

    default:
      break;
  }
});
