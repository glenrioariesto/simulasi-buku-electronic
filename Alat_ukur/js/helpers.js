let countInstruction = 0;
const information = document.getElementById("information");
const questionContainer = document.getElementById("question-container");
const scene1 = document.getElementById("scene1");
const scene2 = document.getElementById("scene2");
const scene3 = document.getElementById("scene3");
const scene4 = document.getElementById("scene4");

const clickSound = document.getElementById("clickOptionSound");
const backgroundSound = document.getElementById("playSoundGame");
const dropItemsSound = document.getElementById("dropItemsSound");
const dropItemsSound2 = document.getElementById("dropItemsSound2");
const toolsSound = document.getElementById("toolsSound");

const correctSound = document.getElementById("correctSound");
const celebrateSound = document.getElementById("celebrateSound");
const failSound = document.getElementById("failSound");
const failSound2 = document.getElementById("failSound2");

function backgroundSoundGame() {
  backgroundSound.currentTime = 0;
  backgroundSound.volume = 0.2;
  backgroundSound.play();
}
function soundClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function soundDropBolt() {
  dropItemsSound.currentTime = 0;
  dropItemsSound.play();
}

function soundDropWood() {
  dropItemsSound2.currentTime = 0;
  dropItemsSound2.play();
}

function soundTools() {
  toolsSound.currentTime = 0;
  toolsSound.play();
  setTimeout(() => {
    toolsSound.pause(); // Jeda audio
    toolsSound.currentTime = 0; // Reset waktu audio ke awal
  }, 100);
}

function soundCorrect() {
  correctSound.currentTime = 0;
  correctSound.play();
}

function soundCelebrate() {
  celebrateSound.currentTime = 0;
  celebrateSound.play();
}

function soundFail() {
  failSound.currentTime = 0;
  failSound.play();
}

function soundFail2() {
  failSound2.currentTime = 0;
  failSound2.play();
}

function showScene1() {
  scene4.style.display = "none";
  scene1.style.display = "flex";
  const logo = document.getElementById("logo");
  logo.style.transform = "translateX(-50%)";
  logo.style.left = "50%";
}
function showScene2() {
  backgroundSoundGame();
  soundClick();
  scene1.style.display = "none";
  scene2.style.display = "flex";

  const logo = document.getElementById("logo");
  logo.style.transform = "none";
  logo.style.left = "1vw";
}

function showScene3() {
  soundClick();
  scene2.style.display = "none";
  scene3.style.display = "flex";
  if (countInstruction === 0) {
    information.style.display = "flex"; // Pastikan elemen terlihat
    information.classList.add("instruction-1");
  }
}

function showScene4() {
  scene3.style.display = "none";
  scene4.style.display = "flex";
}

function showModal(message, type = "correct") {
  const modal = document.getElementById("myModal");
  const modalContent = modal.querySelector(".modal-content");

  modal.style.display = "flex";
  modalContent.classList.remove("correct", "wrong");
  if (type === "correct") {
    soundCorrect();
    setTimeout(() => {
      soundCelebrate();
    }, 1000);

    modalContent.classList.add("correct");
  } else {
    soundFail();
    soundFail2();
    modalContent.classList.add("wrong");
  }

  document.getElementById("message").innerHTML = message;
}
function closeModal() {
  soundClick();
  document.getElementById("myModal").style.display = "none";
}

document.addEventListener("click", (event) => {
  if (scene3.style.display === "flex") {
    if (information && countInstruction === 0) {
      // Instruction-1 ditampilkan pertama kali
      countInstruction++;
      information.style.display = "flex";
      information.classList.add("instruction-1");
    } else if (information && countInstruction === 1) {
      // Instruction-2 menggantikan instruction-1
      countInstruction++;
      information.classList.remove("instruction-1");
      void information.offsetWidth;
      information.classList.add("instruction-2");
    } else if (information && countInstruction === 2) {
      // Sembunyikan information setelah instruction-2
      information.style.display = "none";
      void information.offsetWidth;

      questionContainer.classList.add("active");
    }
  }
});