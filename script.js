const colors = ["green", "red", "yellow", "blue"];

const levelDisplay = document.getElementById("level");
const startButton = document.getElementById("start");


let gameSequence = [];
let playerSequence = [];
let level = 0;
let gameRunning = false;

// Identifica qual jogo está rodando.
// Quando o jogador erra, mudamos esse número e
// os setTimeout antigos deixam de funcionar.
let gameId = 0;


// =========================
// INICIAR JOGO
// =========================

function startGame() {

  gameRunning = true;
  gameId++;

  startButtonDisappear();
  levelDisplayAppear();

  gameSequence = [];
  playerSequence = [];
  level = 0;

  levelDisplay.textContent = level;

  nextRound();
}


// =========================
// PRÓXIMA RODADA
// =========================

function nextRound() {

  if (!gameRunning) {
    return;
  }

  playerSequence = [];

  level++;

  levelDisplay.textContent = "Level: " + level;

  const randomColor =
    colors[Math.floor(Math.random() * colors.length)];

  gameSequence.push(randomColor);

  playSequence();
}


// =========================
// MOSTRAR SEQUÊNCIA
// =========================

function playSequence() {

  if (!gameRunning) {
    return;
  }

  // Guarda o ID do jogo atual
  const currentGameId = gameId;

  let delay = 0;

  gameSequence.forEach((color) => {

    setTimeout(() => {

      // Se o jogo acabou ou se esse timeout
      // pertence a um jogo antigo, não faz nada.
      if (!gameRunning || currentGameId !== gameId) {
        return;
      }

      flashColor(color);

    }, delay);

    delay += 600;
  });
}


// =========================
// PISCAR COR
// =========================

function flashColor(color) {

  if (!gameRunning) {
    return;
  }

  const button = document.getElementById(color);

  button.classList.add("active");

  setTimeout(() => {

    if (!gameRunning) {
      button.classList.remove("active");
      return;
    }

    button.classList.remove("active");

  }, 100);

  setTimeout(() => {

    if (gameRunning) {
      playColorSound(color);
    }

  }, 100);
}


// =========================
// CLIQUE DO JOGADOR
// =========================

function handleClick(color) {

  if (!gameRunning) {
    return;
  }

  playerSequence.push(color);

  flashColor(color);

  checkMove(playerSequence.length - 1);
}


// =========================
// VERIFICAR JOGADA
// =========================

function checkMove(index) {

  if (playerSequence[index] !== gameSequence[index]) {

    restartGame();

    return;
  }

  if (playerSequence.length === gameSequence.length) {

    setTimeout(() => {

      if (gameRunning) {
        nextRound();
      }

    }, 1000);
  }
}


// =========================
// REINICIAR / PARAR JOGO
// =========================

function restartGame() {

  // Primeiro para o jogo
  gameRunning = false;

  // MUITO IMPORTANTE:
  // invalida todos os setTimeout antigos
  gameId++;

  startButtonAppear();

  levelDisplay.textContent = "Chegou no level: " + level;

  //levelDisplayDisappear();

  

  // Garante que nenhum quadrado fique aceso
  colors.forEach(color => {

    const button = document.getElementById(color);

    button.classList.remove("active");

  });
}


// =========================
// EVENTOS DOS QUADRADOS
// =========================

colors.forEach(color => {

  document
    .getElementById(color)
    .addEventListener("click", () => handleClick(color));

});


// =========================
// BOTÃO START
// =========================

startButton.addEventListener("click", startGame);


// =========================
// MÚSICA
// =========================

const x = document.getElementById("mozart-song");

function enableLoop() {

  x.loop = true;
  x.load();

}

function playSong(songId) {

  const song = document.getElementById(songId);

  song.play();

}


// =========================
// SOM DAS CORES
// =========================

function playColorSound(color) {

  if (!gameRunning) {
    return;
  }

  const sound = document.getElementById(color + "-sound");

  sound.currentTime = 0;

  sound
    .play()
    .catch(err => console.log("Sound play blocked:", err));

}


// =========================
// BOTÃO START
// =========================

function startButtonDisappear() {

  const button = document.getElementById("start");

  button.style.display = "none";

}

function startButtonAppear() {

  const button = document.getElementById("start");

  button.textContent = "Tente Novamente"
  button.style.display = "";

}


// =========================
// LEVEL
// =========================

function levelDisplayDisappear() {

  levelDisplay.style.display = "none";

}

function levelDisplayAppear() {

  levelDisplay.style.display = "";

}


