/***************** ENEMIES ******************/

// Enemies class
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x > 505)
      this.x = -100; // This is negative so the enemy starts out of the screen.
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/***************** PLAYER ******************/

// Player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

// Resets the position of the player
Player.prototype.startOver = function() {
    this.x = 200;
    this.y = 400;
};

// Prevents the player from going beyond the frame of the canvas
// TODO : implement this behaviour in handleInput instead
// This function also handles the victory message if the player reaches the water
Player.prototype.update = function() {
    if (this.x > 404)
      this.x = 404;
    if (this.x < 0)
      this.x = 0;
    if (this.y > 435)
      this.y = 435;
    if (this.y <= 0) {
      alert("Congratulations!");
      this.startOver();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dt) {
    var step = 50;
    switch (dt) {
        case 'left' :
        this.x -= step;
        break;
        case 'right' :
        this.x += step;
        break;
        case 'up' :
        this.y -= step;
        break;
        case 'down' :
        this.y += step;
        break;
    }
};

/******************* INSTANTIATING OBJECTS ********************/

var enemy2 = new Enemy(0, 145, 200),
    enemy3 = new Enemy(0, 225, 100),
    enemy4 = new Enemy(0, 60, 500);

var allEnemies = [];
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// detects collisions between the player and the enemy
// andf alerts "Game Over" message
function checkCollisions () {
allEnemies.forEach(function(enemy) {
  if(enemy.x < player.x + 50 &&
    enemy.x + 70 > player.x &&
    enemy.y < player.y + 50 &&
    enemy.y + 70 > player.y) {
      alert('Ouch! Try again…');
      player.startOver();
    }
  });
}