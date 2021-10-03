import { onSnake, expandSnake } from './snake.js';
import { randomGridPosition } from './grid.js'

let food = getRandomFoodPosition();
let EXPANSION_RATE = 1;
let foodNum = 0;


export function update() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        food = getRandomFoodPosition();
        foodNum += 1;
    }    
}

export function draw(gameBoard) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

export function updateExpansion() {
    EXPANSION_RATE += 1;
}

function getRandomFoodPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}

export { foodNum, EXPANSION_RATE };
