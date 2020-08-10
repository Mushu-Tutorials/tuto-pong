class Vec {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Rect {
  constructor(width, height) {
    this.pos = new Vec;
    this.size = new Vec(width, height);
  }
}

class Ball extends Rect {
  constructor() {
    super(10, 10);
    this.vel = new Vec;
  }
}

const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');
// console.log(context);

const ball = new Ball;
console.log(ball);
ball.pos.x = 100;
ball.pos.y = 50;
ball.vel.x = 100;
ball.vel.y = 100;

let lastTime;

function callBack(millis) {
  if (lastTime) {
    // / 1000 -> Conversion des millisecondes en secondes
    update((millis - lastTime) / 1000);
  }
  lastTime = millis;
  requestAnimationFrame(callBack);
}

// Animate the Ball
function update(deltaTime) {
  ball.pos.x += ball.vel.x * deltaTime;
  ball.pos.y += ball.vel.y * deltaTime;

  // Background
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Ball
  context.fillStyle = '#fff';
  context.fillRect(ball.pos.x, ball.pos.y, ball.size.x, ball.size.y);
}

callBack();