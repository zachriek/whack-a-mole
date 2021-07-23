const dirt = document.querySelectorAll('.dirt');
const mole = document.querySelectorAll('.mole');
const startButton = document.querySelector('.start');
const scoreBoard = document.querySelector('.score');
const audioPop = document.querySelector('#audioPop');
const finishedMessage = document.querySelector('.finished-message');
const finishedMessage1 = document.querySelector('.finished-message-1');
const finishedMessage2 = document.querySelector('.finished-message-2');
const closeMessage = document.querySelector('.close-message');

let previousDirt;
let finished;
let score;

function randomDirt(dirt) {
	const random = Math.floor(Math.random() * dirt.length);
	const rdirt = dirt[random];

	if ( rdirt == previousDirt ) {
		randomDirt(dirt);
	}
	previousDirt = rdirt;
	return rdirt;
}

function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function spawnMole() {
	const rdirt = randomDirt(dirt);
	const rtime = randomTime(300, 1000);
	rdirt.classList.add('up');
	setTimeout(function () {
		rdirt.classList.remove('up');
		if ( finished == false ) {
			spawnMole();
		}
	}, rtime);
}

function start() {
	finished = false;
	score = 0;
	scoreBoard.innerHTML = 0;
	spawnMole();
	playTime = 10000;
	setTimeout(function () {
		finished = true;
		finishedMessage1.innerHTML = `Permainan Selesai!`;
		finishedMessage2.innerHTML = `Selamat Anda mendapatkan ${score} Skor!`;
		closeMessage.innerHTML = `Click to close!`;
		finishedMessage.style.display = 'flex';
		finishedMessage.addEventListener('click', function() {
			closeMessage.innerHTML = 'Wait...';
			setTimeout(function () {
				finishedMessage.style.display = 'none';
			}, 3500);
		});
	}, playTime);
}

function punch() {
	score++;
	audioPop.play();
	this.parentNode.classList.remove('up');
	scoreBoard.innerHTML = score;
}

startButton.addEventListener('click', start);
mole.forEach(mole => mole.addEventListener('click', punch));