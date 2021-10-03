import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, snakeBody, increaseSnakeSpeed } from './snake.js';
import { update as updateFood, draw as drawFood, foodNum, updateExpansion, EXPANSION_RATE } from './food.js';
import { outsideGrid } from './grid.js';

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');
let updatedSnakeSpeed = SNAKE_SPEED;
const score = document.getElementById('score');
const level = document.getElementById('level');

function main(currentTime) {
    if (gameOver) {
        console.log(updatedSnakeSpeed);
        console.log(EXPANSION_RATE);
        if (confirm(`You lost. Your snake is ${snakeBody.length} segments long! Press ok to restart`)) {
            window.location = '/'
        }
        return
    }
    if (foodNum % 3 === 0 && foodNum !== 0) {
        if (SNAKE_SPEED === updatedSnakeSpeed) {
            updatedSnakeSpeed += 3;
            updateExpansion();
        }
    }
    if (foodNum % 3 === 1 && foodNum !== 1) {
        if (SNAKE_SPEED !== updatedSnakeSpeed) {
            increaseSnakeSpeed();
        }
    }
    

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / updatedSnakeSpeed) return;
    lastRenderTime = currentTime;
    
    update()
    draw()
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
    updateScore();
    updateLevel();
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

function updateScore() {
    if (snakeBody.length === 1) {
        score.innerText = "000"; 
    } else if (snakeBody.length > 1 && snakeBody.length < 10) {
        score.innerText = "00" + snakeBody.length;
    } else if (snakeBody.length >= 10 && snakeBody.length < 100) {
        score.innerText = "0" + snakeBody.length;
    } else {
        score.innerText = snakeBody.length;
    }
}

function updateLevel() {
    level.innerText = EXPANSION_RATE;
}

export { updatedSnakeSpeed };
