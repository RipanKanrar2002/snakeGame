const gameContainer = document.querySelector(".game-container");
const scoreContainer = document.querySelector(".score-container")
let foodX, foodY;
let headX = 12, headY = 12;
let moveInX = 0, moveInY = 0;
let snakeBody = [[12, 12]];
let score = 0;
let headDirection = "up";

function foodLocation() {
  foodX = Math.floor(Math.random() * 25) + 1;
  foodY = Math.floor(Math.random() * 25) + 1;

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeBody[i][0] === foodX && snakeBody[i][1] === foodY) {
      foodLocation();
      return;
    }
  }
}

function gameOver() {
  alert("Game Over!");
  headX = 12;
  headY = 12;
  moveInX = 0;
  moveInY = 0;
  snakeBody = [[12, 12]];
  score = 0;
  scoreContainer.innerHTML = `<b>Press (up/down/left/right) arrow keys to Play.</b>`;
  foodLocation();
}

function renderGame() {
  headX += moveInX;
  headY += moveInY;

  if (headX <= 0 || headX > 25 || headY <= 0 || headY > 25) {
    gameOver();
    return;
  }

  snakeBody.unshift([headX, headY]);

  if (headX === foodX && headY === foodY) {
    score += 5;
    scoreContainer.innerHTML = `<b>Score : ${score}</b>`;
    foodLocation();
  } else {
    snakeBody.pop();
  }

  for (let i = 1; i < snakeBody.length; i++) {
    if (snakeBody[i][0] === headX && snakeBody[i][1] === headY) {
      gameOver();
      return;
    }
  }

  let html = `<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`;
  for (let i = 0; i < snakeBody.length; i++) {
    if (i === 0) {
      html += `<div class="snake head" data-direction="${headDirection}" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]};">
           <span class="eye left"></span>
           <span class="eye right"></span>
         </div>`;

    } else {
      html += `<div class="snake" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
    }
}

  gameContainer.innerHTML = html;
}

if(score<100){
  foodLocation();
  setInterval(renderGame, 150);
}else if(score >= 100 && score<200){
  foodLocation();
  setInterval(renderGame, 100);
}

document.addEventListener("keydown", (e) => {
  scoreContainer.innerHTML = `<b>Score : ${score}</b>`;
  if(e.key === "ArrowUp" && moveInY !== 1){
    moveInX=0;
    moveInY=-1;
    headDirection="up";
  }else if(e.key === "ArrowDown" && moveInY !== -1){
    moveInX=0;
    moveInY=1;
    headDirection="down";
  }else if(e.key === "ArrowLeft" && moveInX !== 1){
    moveInX=-1;
    moveInY=0;
    headDirection="left";
  }else if(e.key === "ArrowRight" && moveInX !== -1){
    moveInX=1;
    moveInY=0;
    headDirection="right";
  }
});
