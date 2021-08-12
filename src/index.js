const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1500;
canvas.height = 700;

let circleX = 750;
let circleY = 350;
let radius = 20;
let speedX = 5;
let speedY = 5;
let playerX = 750;
let playerY = 675;

function circle() {
    ctx.beginPath();
    ctx.arc(circleX, circleY, radius, 0, Math.PI*2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
    if (circleX - radius < 0 || circleX + radius > canvas.width) {
        speedX *= -1;
    }
    if (circleY - radius < 0 || circleY + radius > canvas.height) {
        speedY *= -1;
    }
    circleY += speedY;
    circleX += speedX;
}

function bar() {
    if (playerX <= 0) { playerX = 0; }
    if (playerX + 250 >= canvas.width) { playerX = canvas.width - 250; }
    ctx.fillStyle = 'blue';
    ctx.fillRect(playerX, playerY, 250, 20);
}

function onMove(event) {
    playerX = event.offsetX - 125;
}

setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circle();
    bar();
}, 20) 

canvas.addEventListener("mousemove", onMove);