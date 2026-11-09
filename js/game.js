const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const startBtn = document.getElementById('start-btn');

let lastHole;
let timeUp = false;
let score = 0;
let countdown;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes); 
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(500, 1000); 
    const hole = randomHole(holes);
    hole.querySelector('.mole').classList.add('active');
    
    setTimeout(() => {
        hole.querySelector('.mole').classList.remove('active');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    if (timeUp) return;
    startBtn.disabled = true;
    startBtn.innerText = "Игра идёт...";
    
    score = 0;
    scoreElement.innerText = "Счёт: 0";
    timeElement.innerText = "Время: 30 сек.";
    timeUp = false;
    
    peep();
    
    let timeLeft = 30;
    clearInterval(countdown);
    countdown = setInterval(() => {
        timeLeft--;
        timeElement.innerText = "Время: " + timeLeft + " сек.";
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timeUp = true;
            startBtn.disabled = false;
            startBtn.innerText = "Начать заново";
            timeElement.innerText = "Время вышло!";
            alert("Игра окончена! Ваш счёт: " + score);
        }
    }, 1000);
}

function whack(e) {
    if (!e.isTrusted) return; 
    if (!e.target.classList.contains('mole')) return; 
    
    score++;
    scoreElement.innerText = "Счёт: " + score;
    e.target.classList.remove('active');
}

moles.forEach(mole => mole.addEventListener('click', whack));
startBtn.addEventListener('click', startGame);