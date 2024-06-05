let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let btns = ["red", "green", "yellow", "purple"];
let scores = [];

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if(started == false) {
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("game-flash");
    setTimeout(function () {
        btn.classList.remove("game-flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("user-flash");
    setTimeout(function () {
        btn.classList.remove("user-flash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if(gameSeq[idx] == userSeq[idx]) {
        if(idx == gameSeq.length - 1) {
            setTimeout(levelUp, 1000);
            
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        scores.push(level);
        updateHighScore();
        reset();
        let body = document.querySelector("body");
        body.style.backgroundColor = "red";
        setTimeout(function () {
            body.style.backgroundColor = "white"
        }, 250);
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let useColor = btn.getAttribute("id");
    userSeq.push(useColor);
    let idx = userSeq.length-1;
    checkAns(idx);
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}

function updateHighScore() {
    let max = 0;
    for(el of scores) {
        if(max < el) {
            max = el;
        }
    }

    let highScore = document.querySelector(".high-score");
    highScore.textContent = `High Score : ${max}`;
}