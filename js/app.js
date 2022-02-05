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
  return false;
};

// Execution of Game Engine
const gameEngine = () => {
  // Reset the game on Collision
  if (onCollide(snakeArray)) {
    gameOverSound.play();
    musicSound.pause();
    inputDirection = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again!");
    snakeArray = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
  }

  // If Snake has eaten the food => increment the score & regenerate the food.
  if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
    foodSound.play();
    snakeArray.unshift({
      x: snakeArray[0].x + inputDirection.x,
      y: snakeArray[0].y + inputDirection.y,
    });
    let a = 2;
    let b = 16;
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
window.requestAnimationFrame(main); // calling the main method
window.addEventListener("keydown", (e) => {
  // User Interaction with keyboard buttons
  inputDirection = { x: 0, y: 1 }; //Start the game when key is down
  moveSound.play(); //play sound on starting the game
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDirection.x = 0;
      inputDirection.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDirection.x = 0;
      inputDirection.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDirection.x = -1;
      inputDirection.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDirection.x = 1;
      inputDirection.y = 0;
      break;

    default:
      break;
  }
});
