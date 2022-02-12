// constants
const foodSound = new Audio("../assets/music/food.mp3");
const gameOverSound = new Audio("../assets/music/gameover.mp3");
const moveSound = new Audio("../assets/music/move.mp3");
const musicSound = new Audio("../assets/music/music.mp3");

// variables
let inputDirection = { x: 0, y: 0 };
let speed = 5;
let lastPaintTime = 0;
let snakeArray = [{ x: 6, y: 7 }];
let food = { x: 13, y: 15 };
let score = 0;

// Main Method
const main = (currentTime) => {
  window.requestAnimationFrame(main);
  if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = currentTime;
  gameEngine();
};

// Game Functionalities

// On Collision Method
const onCollide = (snakeArray) => {
  //if snake collide with itself
  for (let i = 1; i < snakeArray.length; i++) {
    if (
      snakeArray[i].x === snakeArray[0].x &&
      snakeArray[i].y === snakeArray[0].y
    ) {
      return true;
    }
  }
  // if you bump into wall
  if (
    snakeArray[0].x >= 18 ||
    snakeArray[0].x <= 0 ||
    snakeArray[0].y >= 18 ||
    snakeArray[0].y <= 0
  ) {
    return true;
  }
};

// Execution of Game Engine
const gameEngine = () => {
  // Reset the game on Collision
  if (onCollide(snakeArray)) {
    gameOverSound.play();
    musicSound.pause();
    inputDirection = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again!");
    // snakeArray = [{ x: 13, y: 15 }];
    snakeArray = [{ x: 6, y: 7 }];
    musicSound.play();
    score = 0;
    scoreBoard.innerHTML = "Score: " + score;
  }

  // If Snake has eaten the food => increment the score & regenerate the food.
  if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > highScoreVal) {
      highScoreVal = score;
      localStorage.setItem("highScore", JSON.stringify(highScoreVal));
      maxScore.innerHTML = "MaxScore: " + highScoreVal;
    }
    scoreBoard.innerHTML = "Score: " + score;
    // Add new segment in a snake Array using unshift() - Add an element in the front side of an array
    snakeArray.unshift({
      x: snakeArray[0].x + inputDirection.x,
      y: snakeArray[0].y + inputDirection.y,
    });

    // Generate random coordinates between 2 to 16 from the origin(0,0)
    let a = 2;
    let b = 16;
    //generate integer value always (below code)
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //Moving the snake
  for (let i = snakeArray.length - 2; i >= 0; i--) {
    snakeArray[i + 1] = { ...snakeArray[i] };
  }
  snakeArray[0].x += inputDirection.x;
  snakeArray[0].y += inputDirection.y;

  // Display the snake
  board.innerHTML = "";
  snakeArray.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y; // y axis is displaying the row in board
    snakeElement.style.gridColumnStart = e.x; // x axis is displaying the column in board
    index === 0
      ? snakeElement.classList.add("head")
      : snakeElement.classList.add("snake");
    board.appendChild(snakeElement);
  });

  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y; // y axis is displaying the row in board
  foodElement.style.gridColumnStart = food.x; // x axis is displaying the column in board
  foodElement.classList.add("food");
  board.appendChild(foodElement);
};

// Starting point of the game

//Transition property on the food.
// It fires at every 2000ms.
let foodElement = document.getElementById("food");
setInterval(() => {
  foodElement.style.transform = "scale(1.2)";
  foodElement.style.transition = "transform ease-in-out";
}, 250);

// Get the max score from local storage once game is loaded.
let highScore = localStorage.getItem("highScore");
if (highScore === null) {
  highScoreVal = 0;
  localStorage.setItem("highScore", JSON.stringify(highScoreVal));
} else {
  highScoreVal = JSON.parse(highScore);
  maxScore.innerHTML = "MaxScore: " + highScoreVal;
}

// Request Animation Frame is for animation, callback function (main) fired more than 60 times in a sec.
window.requestAnimationFrame(main); // calling the main method
window.addEventListener("keydown", (e) => {
  // User Interaction with keyboard buttons
  inputDirection = { x: 0, y: 1 }; //Start the game when key is down
  moveSound.play(); //play sound on starting the game
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

// End
