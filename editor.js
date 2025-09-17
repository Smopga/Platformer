const canvas = document.getElementById("editor");
const ctx = canvas.getContext("2d");
let tiles = [];

canvas.addEventListener("click", e => {
  let rect = canvas.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  tiles.push({x:x, y:y, w:50, h:20});
  draw();
});

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "green";
  for (let t of tiles) ctx.fillRect(t.x,t.y,t.w,t.h);
}

function downloadLevel() {
  let level = { start:{x:50,y:50}, tiles:tiles };
  let blob = new Blob([JSON.stringify(level,null,2)], {type:"application/json"});
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "level.level";
  a.click();
}

document.getElementById("fileInput").addEventListener("change", function(e){
  let file = e.target.files[0];
  let reader = new FileReader();
  reader.onload = () => {
    tiles = JSON.parse(reader.result).tiles;
    draw();
  };
  reader.readAsText(file);
});
