// constants
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");

let direction = { x: 0, y: 0 };
let speed = 2;
let lastPaintTime = 0;
let snakeArray = [
  {x: 13, y: 15}
]

// Game functions
const main = (currentTime) => {
  window.requestAnimationFrame(main);
  if((currentTime - lastPaintTime)/1000 < 1/speed) {
    return;
  }
  lastPaintTime = currentTime;
  gameEngine();
};

const gameEngine = () => {


  // Display the snake and food
  board.innerHTML = "";
  snakeArray.forEach((e, index) => {
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    snakeElement.classList.add('food')
    board.appendChild(snakeElement);
  })
}

// Starting point

window.requestAnimationFrame(main);
