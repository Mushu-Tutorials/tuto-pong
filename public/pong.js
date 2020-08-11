class Vec {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Rect {
  constructor(width, height) {
    this.pos = new Vec();
    this.size = new Vec(width, height);
  }
}

class Ball extends Rect {
  constructor() {
    super(10, 10);
    this.vel = new Vec();
  }
}

const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");
// console.log(context);

const ball = new Ball();
console.log(ball);
ball.pos.x = 100;
ball.pos.y = 50;
ball.vel.x = 100;
ball.vel.y = 100;

let lastTime;

function callBack(millis) {
  if (lastTime) {
    // (x / 1000) -> Conversion des millisecondes en secondes
    update((millis - lastTime) / 1000);
  }
  lastTime = millis;
  requestAnimationFrame(callBack);
}

/**
 * Animate the Ball
 */
function update(deltaTime) {
  ball.pos.x += ball.vel.x * deltaTime;
  ball.pos.y += ball.vel.y * deltaTime;

  /**
   * Detect walls of canvas and bounce ball on it
   * Revert velocity to bounce on wall
   * When bouncing on the wall, we retire the size of the ball to not pass throw the wall
   */
  if (ball.pos.x < 0 || ball.pos.x > canvas.width - ball.size.x) {
    // Velocity of the ball minus his size to connect on the wall
    ball.vel.x = -ball.vel.x - ball.size.x;
  }
  if (ball.pos.y < 0 || ball.pos.y > canvas.height - ball.size.y) {
    // Velocity of the ball minus his size to connect on the wall
    ball.vel.y = -ball.vel.y - ball.size.y;
  }

  /**
   * Background of canvas
   */
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  /**
   * Define the ball view
   */
  context.fillStyle = "#fff";
  context.fillRect(ball.pos.x, ball.pos.y, ball.size.x, ball.size.y);
}

callBack();
