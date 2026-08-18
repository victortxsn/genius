const colors = ["green", "red", "yellow", "blue"];
const levelDisplay = document.getElementById("level");
let gameSequence = [];
let playerSequence = [];
let level = 0;

const startButton = document.getElementById("start");

function startGame() {

  startButtonDisappear()

  gameSequence = [];
  playerSequence = [];
  level = 0;

  levelDisplay.textContent = level;

  nextRound();
}

function nextRound() {

  playerSequence = [];
  level++;

  levelDisplay.textContent = "Level: " + level;

  const randomColor = colors[Math.floor(Math.random() * 4)];

  gameSequence.push(randomColor);

  playSequence();
}

function playSequence() {
  let delay = 0;
  gameSequence.forEach((color, index) => {
    setTimeout(() => flashColor(color), delay);
    delay += 600;
  });
}

function flashColor(color) {
  const button = document.getElementById(color);
  button.classList.add("active");
  setTimeout(() => button.classList.remove("active"), 300);
}

function handleClick(color) {
  playerSequence.push(color);
  flashColor(color);
  checkMove(playerSequence.length - 1);
}

function checkMove(index) {
  if (playerSequence[index] !== gameSequence[index]) {
    alert("GAME OVER! Você foi até o nível " + level + ".");
    startGame();
    return;
  }
  if (playerSequence.length === gameSequence.length) {
    setTimeout(nextRound, 1000);
  }
}

colors.forEach(color => {
  document.getElementById(color).addEventListener("click", () => handleClick(color));
});

startButton.addEventListener("click", startGame);

var x = document.getElementById("mozart-song");

function enableLoop() { 
  x.loop = true;
  x.load();
} 

function playSong(songId) {
        const song = document.getElementById(songId);
        song.play();
        }
        
function playColorSound(color) {
  const sound = document.getElementById(color + "-sound");
  sound.currentTime = 0; // restart from beginning
  sound.play().catch(err => console.log("Sound play blocked:", err));
}

function flashColor(color) {
  const button = document.getElementById(color);
  button.classList.add("active");

  // Delay before playing the sound (e.g., 150ms)
  setTimeout(() => {
    playColorSound(color);
  }, 100);

  setTimeout(() => button.classList.remove("active"), 100);
}

function handleClick(color) {
  playerSequence.push(color);
  flashColor(color); // this already plays the sound
  checkMove(playerSequence.length - 1);
}

function startButtonDisappear(){
  const button = document.getElementById("start");
  button.style.display="none";

}



