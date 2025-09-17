const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = { x: 50, y: 50, w: 32, h: 32, vy: 0, grounded:false };
let keys = {};
let gravity = 0.5;
let currentLevel = 1;
let tiles = [];

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function loadLevel(level) {
  fetch(`levels/level${level}.level`)
    .then(res => res.json())
    .then(data => {
      tiles = data.tiles;
      player.x = data.start.x;
      player.y = data.start.y;
    });
}

function update() {
  player.vy += gravity;
  player.y += player.vy;

  if (keys["ArrowRight"]) player.x += 3;
  if (keys["ArrowLeft"]) player.x -= 3;
  if (keys[" "] && player.grounded) { player.vy = -10; player.grounded = false; }

  player.grounded = false;
  for (let t of tiles) {
    if (player.x < t.x+t.w &&
        player.x+player.w > t.x &&
        player.y < t.y+t.h &&
        player.y+player.h > t.y) {
        if (player.vy > 0) {
          player.y = t.y - player.h;
          player.vy = 0;
          player.grounded = true;
        }
    }
  }
}

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "red";
  ctx.fillRect(player.x,player.y,player.w,player.h);

  ctx.fillStyle = "green";
  for (let t of tiles) ctx.fillRect(t.x,t.y,t.w,t.h);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loadLevel(currentLevel);
loop();
