const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1500;
canvas.height = 700;

let circleX = 750;
let circleY = 350;

setInterval(function () {
    ctx.arc(circleX, circleY, 20, 0, Math.PI*2);
    ctx.fillStyle = "blue";
    ctx.fill();
}, 20)