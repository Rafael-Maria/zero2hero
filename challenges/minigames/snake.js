let player1Wins = 0;
let player1ScoreText = document.createElement('div');
player1ScoreText.style.position = 'absolute';
player1ScoreText.style.top = '10px';
player1ScoreText.style.left = '10px';
player1ScoreText.style.fontSize = '20px';
player1ScoreText.style.color = 'green';
document.body.appendChild(player1ScoreText);

let player2Wins = 0;
let player2ScoreText = document.createElement('div');
player2ScoreText.style.position = 'absolute';
player2ScoreText.style.top = '10px';
player2ScoreText.style.right = '10px';
player2ScoreText.style.fontSize = '20px';
player2ScoreText.style.color = 'blue';
document.body.appendChild(player2ScoreText);
let box = 24;
let canvasSize = 24;
let game;
let d;
let food = {
    x: Math.floor(Math.random() * canvasSize) * box,
    y: Math.floor(Math.random() * canvasSize) * box
};
let gameOverText = document.createElement('div');
gameOverText.style.position = 'absolute';
gameOverText.style.top = '50%';
gameOverText.style.left = '50%';
gameOverText.style.transform = 'translate(-50%, -50%)';
gameOverText.style.fontSize = '30px';
gameOverText.style.color = 'red';
document.body.appendChild(gameOverText);

function startGame() {
    // Initialize all game variables
    d = 'RIGHT';
    score = 3;
    snake = [
        { x: canvasSize * box / 2, y: canvasSize * box / 2 },
        { x: canvasSize * box / 2 - box, y: canvasSize * box / 2 },
        { x: canvasSize * box / 2 - 2 * box, y: canvasSize * box / 2 }
    ];

    d2 = 'RIGHT';
    score2 = 3;
    snake2 = [
        { x: box, y: box },
        { x: box + box, y: box },
        { x: box + 2 * box, y: box }
    ];

    // Start the game loop
    game = setInterval(draw, 100);
}

let score = 3;
let snake = [
    { x: canvasSize * box / 2, y: canvasSize * box / 2 },
    { x: canvasSize * box / 2 - box, y: canvasSize * box / 2 },
    { x: canvasSize * box / 2 - 2 * box, y: canvasSize * box / 2 }
];
snake[0] = { x: canvasSize * box / 2, y: canvasSize * box / 2 };

// Second player
let d2;
let score2 = 3;
let snake2 = [
    { x: box, y: box },
    { x: box + box, y: box },
    { x: box + 2 * box, y: box }
];
snake2[0] = { x: box, y: box };

let canvas = document.getElementById('game-board');
let context = canvas.getContext('2d');
canvas.width = canvasSize * box;
canvas.height = canvasSize * box;

document.addEventListener('keydown', function(event) {
    // First player
    if (event.key === 'a') d = 'LEFT';
    if (event.key === 'w') d = 'UP';
    if (event.key === 'd') d = 'RIGHT';
    if (event.key === 's') d = 'DOWN';

    // Second player
    if (event.key === 'ArrowLeft') d2 = 'LEFT';
    if (event.key === 'ArrowUp') d2 = 'UP';
    if (event.key === 'ArrowRight') d2 = 'RIGHT';
    if (event.key === 'ArrowDown') d2 = 'DOWN';
});

function draw() {
    player1ScoreText.textContent = 'Player 1 Score: ' + score + " Wins: " + player1Wins;
    player2ScoreText.textContent = 'Player 2 Score: ' + score2 + " Wins: " + player2Wins;

    if (score === 0 || score2 === 0) {
        clearInterval(game);
        gameOverText.textContent = score === 0 ? 'Player 2 Wins!' : 'Player 1 Wins!';
        game = undefined; // Add this line
        if (score === 0) {
            player2Wins++;
        } else {
            player1Wins++;
        }
    }
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d === 'LEFT') snakeX = snakeX <= 0 ? canvasSize * box - box : snakeX - box;
    if (d === 'UP') snakeY = snakeY <= 0 ? canvasSize * box - box : snakeY - box;
    if (d === 'RIGHT') snakeX = snakeX >= canvasSize * box - box ? 0 : snakeX + box;
    if (d === 'DOWN') snakeY = snakeY >= canvasSize * box - box ? 0 : snakeY + box;

    // Second player
    let snake2X = snake2[0].x;
    let snake2Y = snake2[0].y;

    if (d2 === 'LEFT') snake2X = snake2X <= 0 ? canvasSize * box - box : snake2X - box;
    if (d2 === 'UP') snake2Y = snake2Y <= 0 ? canvasSize * box - box : snake2Y - box;
    if (d2 === 'RIGHT') snake2X = snake2X >= canvasSize * box - box ? 0 : snake2X + box;
    if (d2 === 'DOWN') snake2Y = snake2Y >= canvasSize * box - box ? 0 : snake2Y + box;

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = (i === 0) ? 'green' : 'white';
        context.fillRect(snake[i].x, snake[i].y, box, box);
        context.strokeStyle = 'red';
        context.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Second player
    for (let i = 0; i < snake2.length; i++) {
        context.fillStyle = (i === 0) ? 'blue' : 'white';
        context.fillRect(snake2[i].x, snake2[i].y, box, box);
        context.strokeStyle = 'red';
        context.strokeRect(snake2[i].x, snake2[i].y, box, box);
    }

    context.fillStyle = 'orange';
    context.fillRect(food.x, food.y, box, box);


    if (snakeX === food.x && snakeY === food.y) {
        score++;
        snake2.pop();
        score2--;
        food = {
            x: Math.floor(Math.random() * canvasSize) * box,
            y: Math.floor(Math.random() * canvasSize) * box
        };
    } else {
        snake.pop();
    }

    if (snake2X === food.x && snake2Y === food.y) {
        score2++;
        snake.pop();
        score--;
        food = {
            x: Math.floor(Math.random() * canvasSize) * box,
            y: Math.floor(Math.random() * canvasSize) * box
        };
    } else {
        snake2.pop();
    }

    let newHead = { x: snakeX, y: snakeY };
    let newHead2 = { x: snake2X, y: snake2Y };

    snake.unshift(newHead);
    snake2.unshift(newHead2);


}

game = setInterval(draw, 100);

document.addEventListener('keydown', function(event) {
    // ... existing code ...

    if (game === undefined) {
        startGame();
        gameOverText.textContent = '';
    }
});


startGame();