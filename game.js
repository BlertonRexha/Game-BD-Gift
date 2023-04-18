const canvas = document.createElement("canvas");
canvas.width = 1200;
canvas.height = 650;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
const validKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "p"];
let isGameStoped = true;
let onPlaying = null;
let keyDown = null;
let challenge = 0;
let gameResult = 0;

// emojy settings
let emojyReady = false;
let emojySpeed = 1;
const emojy = {
  x: canvas.width / 2 - 25,
  y: canvas.height / 2 - 25,
};
let emojiImage = new Image();
emojiImage.onload = () => {
  emojyReady = true;
};
emojiImage.src = "images/hungry.svg";

// cake settings
let cakeReady = false;
const cake = {};
let cakeImage = new Image();
cakeImage.onload = () => {
  cakeReady = true;
};
cakeImage.src = "images/cake.svg";

getRandomInt = (min = 1, max = 5) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

addEventListener("keydown", ({ key }) => {
  if (validKeys.includes(key) && !isGameStoped) keyDown = key;
});

drawPlayButton = (buttonText = "Play") => {
  const [x, y, w, h] = [canvas.width / 2 - 100, canvas.height - 100, 200, 50];
  ctx.roundRect(x, y, w, h, 5);
  ctx.fillStyle = "#579dff";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#579dff";
  ctx.stroke();
  ctx.closePath();
  ctx.font = "24px Arial";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.fillText(buttonText, x + w / 2, y + 13);
};

isInsidePlayAgain = (pos, rect) =>
  pos.x > rect.x &&
  pos.x < rect.x + rect.w &&
  pos.y < rect.y + rect.h &&
  pos.y > rect.y;

playAgain = () => {
  isGameStoped = false;
  emojy.x = canvas.width / 2 - 25;
  emojy.y = canvas.height / 2 - 25;
  emojiImage.src = "images/hungry.svg";
  play();
};

canvas.addEventListener("click", (evt) => {
  const clientRect = canvas.getBoundingClientRect();
  const [x, y] = [evt.clientX - clientRect.left, evt.clientY - clientRect.top];
  if (
    isInsidePlayAgain(
      { x, y },
      {
        x: canvas.width / 2 - 100,
        y: canvas.height - 100,
        w: 200,
        h: 50,
      }
    )
  ) {
    playAgain();
  }
});

changeGameFinal = (gameRes) => {
  isGameStoped = true;
  keyDown = null;
  emojiImage.src = `images/${gameRes === "win" ? "happy" : "cry"}.svg`;
  clearInterval(onPlaying);
  setTimeout(() => {
    render();
  }, 0);
};

setResult = (val = 1) => {
  if (val === -1 && gameResult <= 1) changeGameFinal("lost");
  else gameResult += val;

  if (gameResult === challenge) changeGameFinal("win");
};

borderHit = () => {
  keyDown = null;
  emojiImage.src = "images/dead.svg";
  setResult(-1);
  setTimeout(() => {
    if (gameResult) emojiImage.src = "images/hungry.svg";
  }, 500);
};

updateDirection = () => {
  if (isGameStoped) return;
  switch (keyDown) {
    case "ArrowUp":
      if (emojy.y > 0) emojy.y -= emojySpeed;
      else borderHit();
      break;
    case "ArrowRight":
      if (emojy.x < 1150) emojy.x += emojySpeed;
      else borderHit();
      break;
    case "ArrowDown":
      if (emojy.y < 600) emojy.y += emojySpeed;
      else borderHit();
      break;
    case "ArrowLeft":
      if (emojy.x > 0) emojy.x -= emojySpeed;
      else borderHit();
      break;

    default:
      break;
  }

  if (
    emojy.x <= cake.x + 50 &&
    cake.x <= emojy.x + 50 &&
    emojy.y <= cake.y + 50 &&
    cake.y <= emojy.y + 50
  ) {
    setResult(1);
    if (!isGameStoped) resetCakePosition();
  }
};

getMousePos = (event) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

resetCakePosition = () => {
  cake.x = 25 + Math.random() * (canvas.width - 200);
  cake.y = 25 + Math.random() * (canvas.height - 100);
};

setBackgroundColor = (color) => {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

renderImages = () => {
  if (emojyReady) ctx.drawImage(emojiImage, emojy.x, emojy.y, 50, 50);
  if (cakeReady && !isGameStoped) ctx.drawImage(cakeImage, cake.x, cake.y);
};

writeText = () => {
  ctx.fillStyle = "#fdfdfd";
  ctx.font = "16px Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(gameResult + " Result", 5, 10);
  ctx.fillText(challenge + " Challenge", 5, 30);
  ctx.fillText("Povered by: Blerton Rexha", 5, 630);
};

drawResult = () => {
  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.lineWidth = 5;
  ctx.moveTo(10, 645);
  ctx.lineTo((gameResult * (canvas.width - 20)) / challenge + 10, 645);
  ctx.stroke();
};

render = () => {
  setBackgroundColor("#161a1d");
  renderImages();
  writeText();
  drawResult();
  updateDirection();
  if (isGameStoped) {
    drawPlayButton("Play Again");
  }
};

play = () => {
  challenge = getRandomInt();
  gameResult = 0;
  resetCakePosition();
  onPlaying = setInterval(render, 1);
};

render();
drawPlayButton();
