const clickSound = document.getElementById("clickOptionSound");
const backgroundSound = document.getElementById("playSoundGame");
const dropItemsSound = document.getElementById("dropItemsSound");
const playGame = document.getElementById("playGame");
const correctSound = document.getElementById("correctSound");
const failSound = document.getElementById("failSound");
let stopHandler = null;

function soundWin() {
  correctSound.currentTime = 0;
  correctSound.play();
}

function soundFail() {
  failSound.currentTime = 0;
  failSound.play();
}

function soundClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}
function soundDropItems() {
  dropItemsSound.currentTime = 0;
  dropItemsSound.play();
}
function soundPlayGame() {
  const startTime = 0; // Waktu mulai dalam detik
  const endTime = 3; // Waktu berakhir dalam detik

  // Set waktu mulai
  playGame.currentTime = startTime;

  // Fungsi untuk mengulang audio saat mencapai endTime
  stopHandler = () => {
    if (playGame.currentTime >= endTime) {
      playGame.currentTime = startTime; // Kembali ke awal segmen
      playGame.play(); // Mulai ulang
    }
  };

  // Tambahkan event listener untuk memantau waktu pemutaran
  playGame.addEventListener("timeupdate", stopHandler);

  // Mulai pemutaran
  playGame.play().catch((error) => {
    console.error("Audio playback error:", error);
  });
}

function stopSoundPlayGame() {
  // Periksa apakah audio sedang berjalan
  if (!playGame.paused) {
    // Hentikan audio
    playGame.pause();
    playGame.currentTime = 0; // Kembali ke awal
  }

  // Hapus event listener untuk menghentikan looping
  if (stopHandler) {
    playGame.removeEventListener("timeupdate", stopHandler);
    stopHandler = null; // Reset variabel handler
  }
}

function showScene2() {
  backgroundSound.currentTime = 0;
  backgroundSound.volume = 0.2;
  backgroundSound.play();
  soundClick();
  document.getElementById("scene1").style.display = "none";
  document.getElementById("scene2").style.display = "block";
}

let scene2 = 0;
function showScene3() {
  soundClick();
  scene2++;
  switch (scene2) {
    case 1:
      const bg = document.getElementById("announcement-container");
      bg.style.backgroundImage =
        "url('assets/background-pop-up-announcement-2.png')";
      break;
    case 2:
      document.getElementById("scene3").style.display = "flex";
      document.getElementById("scene2").style.display = "none";
      break;
    default:
      break;
  }
}

function showScene4() {
  const scene4 = document.getElementById("scene4");

  if (scene4) {
    // Tambahkan konten HTML ke dalam elemen
    scene4.innerHTML = `
      <div id="announcement-container" class="announcement-container announcement-1">
        <div class="announcement">
          <div
            class="button-scene button-selesai"
            onclick="showBackScene1()"
          ></div>
        </div>
      </div>
    `;
  } else {
    console.error("Element with id 'scene4' not found.");
  }
  document.getElementById("scene3").style.display = "none";
  document.getElementById("scene4").style.display = "flex";
}

function showBackScene1() {
  document.getElementById("scene4").style.display = "none";
  document.getElementById("scene1").style.display = "flex";
  window.location.reload();
}
function showModal(answer) {
  // Menampilkan modal
  stopSoundPlayGame();

  const modal = document.getElementById("myModal");
  modal.style.display = "flex";

  // Menyiapkan konten modal
  const modalContent = document.getElementById("modalContent");

  if (answer) {
    // Jika jawaban benar, tampilkan pesan benar dan ubah kelas modalContent
    modalContent.classList.remove("incorrect");
    modalContent.classList.add("correct");
  } else {
    // Jika jawaban salah, tampilkan pesan salah dan ubah kelas modalContent
    modalContent.classList.remove("correct");
    modalContent.classList.add("incorrect");
  }
}

function closeModal() {
  // clickSound.currentTime = 0;
  // clickSound.play();
  if (level === 3) {
    showScene4();
  }
  soundClick();
  resetCables();
  document.getElementById("myModal").style.display = "none";
}
