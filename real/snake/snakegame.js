var gameCanvas = document.getElementById('snake').getContext('2d');
var snakeSize = 10;
var width = 250;
var height = 250;
var score = 0;
var snake;
var food;


// Draw Module
var drawModule = (function(){

  var bodySnake = function(x,y) {
    gameCanvas.fillStyle = 'green';
    gameCanvas.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    gameCanvas.strokeStyle = 'darkGreen';
    gameCanvas.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
  }

  var fruit = function(x,y) {
    gameCanvas.fillStyle = 'yellow';
    gameCanvas.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    gameCanvas.strokeStyle = 'black';
    gameCanvas.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
  }

  var scoreText = function() {
    var score_text = "Score: " + (score * 10);
    gameCanvas.fillStyle = 'blue';
    gameCanvas.fillText(score_text, 145, height + 10);
  }

  var drawSnake = function() {
    var length = 4;
    snake = [];
    for(var i = length - 1; i >= 0; i--) {
      snake.push({x:i, y:0});
    }
  }

  var createFood = function() {
    food = {
      x: Math.floor((Math.random() * (width / snakeSize)) ),
      y: Math.floor((Math.random() * (height / snakeSize)) )
    }

    for(var i = 0; i < snake.length; i++) {
      var snakeX = snake[i].x;
      var snakeY = snake[i].y;

      if(food.x === snakeX || food.y === snakeY || food.y === snakeY && food.x === snakeX) {
        food.x = Math.floor((Math.random() * (width / snakeSize)));
        food.y = Math.floor((Math.random() * (height / snakeSize)));
      }
    }
  }

  var checkCollision = function(x, y, array) {
    for(var i = 0; i < array.length; i++) {
      if(array[i].x === x && array[i].y === y)
      return true;
    }
    return false;
  }

  var paint = function() {
    // border to the canvas
    gameCanvas.fillStyle = 'white';
    gameCanvas.fillRect(0, 0, width + 50, height + 50);
    gameCanvas.strokeStyle = 'black';
    gameCanvas.strokeRect(0, 0, width, height);

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    // make it move
    if(direction == 'right') {
      snakeX++;
    } else if (direction == 'left') {
      snakeX--;
    } else if (direction == 'up') {
      snakeY--;
    } else if(direction == 'down') {
      snakeY++;
    }

    // if it collides the game has to end.
    if(snakeX == -1 || snakeX == width / snakeSize || snakeY == -1 || snakeY == height / snakeSize || checkCollision(snakeX, snakeY, snake)) {
      //console.log("its over");
      gameCanvas.clearRect(0,0, width, height);
      gameLoop = clearInterval(gameLoop);
      init();
      return;
    }

    // eats
    if(snakeX == food.x && snakeY == food.y) {
      var tail = {
        x: snakeX,
        y: snakeY
      }
      score++;
      createFood();
    } else {
      var tail = snake.pop();
      tail.x = snakeX;
      tail.y = snakeY;
    }
    snake.unshift(tail);

    // create a square for each element in the snake array
    for(var i = 0; i < snake.length; i++) {
      bodySnake(snake[i].x, snake[i].y);
    }

    // create food
    fruit(food.x, food.y);

    scoreText();
  }


  // Init function
  var init = function() {
    score = 0;
    direction = 'right';
    drawSnake();
    createFood();
    gameLoop = setInterval(paint,80);
  }

  return {
    init : init
  };
}());

// Keycode Controls
(function(window, document, drawModule, undefined) {
  document.onkeydown = function(event) {
    keyCode = event.keyCode;

    switch(keyCode) {
      case 37:
      if(direction != 'right') {
        direction = 'left';
      }
      break;

      case 38:
      if(direction != 'down') {
        direction = 'up';
      }
      break;

      case 39:
      if(direction != 'left') {
        direction = 'right';
      }
      break;

      case 40:
      if(direction != 'up') {
        direction = 'down';
      }
      break;
    }
  }
})(window, document, drawModule);

drawModule.init();
