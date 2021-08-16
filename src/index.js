const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1500;
canvas.height = 700;

let circleX = getRandomIntInclusive(100, 1400);
let circleY = getRandomIntInclusive(250, 500); // 공 위치 랜덤
let radius = 20;
let speedX = 10;
let speedY = 10;
let playerX = 750;
let playerY = 675;
let num;

let bricks = [];
let brickX = [];
let brickY = [];
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 4; j++) {
        bricks[i] = [];
    }
    for (let j = 0; j < 4; j++) {
        bricks[i][j] = true;
    }
}

let game = false;
let death = false;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} // 랜덤 함수

function circle() {
    ctx.beginPath();
    ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath(); // 공 그리기
    if (game && !death) {
        if (circleX - radius < 0 || circleX + radius > canvas.width) {
            speedX *= -1;
        }
        if (circleY - radius < 0 || (circleY + radius > playerY && circleX + radius > playerX && circleX - radius < playerX + 250)) {
            speedY *= -1;
        } // 벽이나 바에 튕겼을 때
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 4; j++) {
                if (circleY - radius < j * 50 + 50 && circleY + radius > j * 50 + 10 && circleX + radius > i * 185 + 10 && circleX - radius < i * 185 + 185) {
                    if (circleY - 10 < j * 50 + 50 && circleY - 10 > j * 50 + 10) {
                        if (bricks[i][j]) {
                            speedX *= -1
                            circleX += speedX;
                        }
                    }
                    if (bricks[i][j]) {
                        speedY *= -1
                        circleY += speedY;
                    }
                    bricks[i][j] = false;
                }
            }
        } // 공이 벽돌에 튕겼을 때
        if (circleY + radius > canvas.height) {
            if (!death) {
                let input = confirm('gameover\n다시 하시겠습니까?');
                if (input) {
                    location.reload();
                } // 다시 시작
                death = true;
                circleY = canvas.height - radius;
            } // 죽었을 때
        }

        if (!death) {
            circleY += speedY;
            circleX += speedX;
        } // 공 속도
    }
}

function brick() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 4; j++) {
            brickX[i] = i * 185 + 10;
            brickY[j] = j * 50 + 10;
            if (!bricks[i][j]) {
                num++;
                if (num == 32) {
                    alert('❤축하드립니다!❤');
                } // 모두 맞췄을 시
            }
            else {
                num = 0;
            }
            if (bricks[i][j]) {
                ctx.fillStyle = 'blue';
                ctx.fillRect(brickX[i], brickY[j], 175, 40);
            } // 벽돌 그리기
        }
    }
}

function bar() {
    if (playerX <= 0) { playerX = 0; }
    if (playerX + 250 >= canvas.width) { playerX = canvas.width - 250; }
    ctx.fillStyle = 'blue';
    ctx.fillRect(playerX, playerY, 250, 20);
} // 바 그리기

function onMove(event) {
    playerX = event.offsetX - 125;
} // 마우스의 X좌표

function start() {
    if (!game && !death) {
        game = true;
        switch (getRandomIntInclusive(1, 4)) {
            case 1:
                speedX *= 1;
                speedY *= 1;
                break;
            case 2:
                speedX *= 1;
                speedY *= -1;
                break;
            case 3:
                speedX *= -1;
                speedY *= 1;
                break;
            case 4:
                speedX *= -1;
                speedY *= -1;
                break;
        } // 처음 공 방향 랜덤
    }
} // 게임 시작

setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circle();
    bar();
    brick();
}, 20) // 그리기

document.addEventListener('click', start);
document.addEventListener('mousemove', onMove);