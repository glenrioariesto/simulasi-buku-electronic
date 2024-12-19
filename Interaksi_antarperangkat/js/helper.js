const clickSound = document.getElementById("clickOptionSound");
const backgroundSound = document.getElementById("playSoundGame");
const dropItemsSound = document.getElementById("dropItemsSound");
const playGame = document.getElementById("playGame");
const correctSound = document.getElementById("correctSound");
const failSound = document.getElementById("failSound");
let stopHandler = null;
let isPlaying = true;
const soundImage = document.getElementById("sound-image");
function backgroundSoundGame() {
  soundClick();
  if (!isPlaying) {
    isPlaying = true;
    backgroundSound.pause();
    soundImage.src = "assets/unmute.png";
  } else {
    backgroundSound.currentTime = 10;
    backgroundSound.volume = 0.2;
    backgroundSound.play();
    soundImage.src = "assets/mute.png";
    isPlaying = false;
  }
}

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
function showCustomAlert(message) {
  const alertBox = document.getElementById("customAlert");
  const alertText = alertBox.querySelector(".alert-text");
  alertText.textContent = message;
  alertBox.style.display = "block"; // Menampilkan alert
}

// Fungsi untuk menangani pilihan Yes
function handleYes() {
  // Masukkan logika untuk aksi ketika pengguna memilih "Yes"
  console.log("Pengguna memilih Yes");
  enterFullScreen();
  closeAlert();
}

// Fungsi untuk menangani pilihan No
function handleNo() {
  // Masukkan logika untuk aksi ketika pengguna memilih "No"
  console.log("Pengguna memilih No");
  closeAlert();
}

// Fungsi untuk menutup alert
function closeAlert() {
  const alertBox = document.getElementById("customAlert");
  alertBox.style.display = "none"; // Menyembunyikan alert
}

// Memanggil showCustomAlert setelah halaman dimuat
window.onload = function () {
  showCustomAlert("Apakah Anda ingin masuk ke mode layar penuh?");
};

function enterFullScreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  } else {
    alert("Browser ini tidak mendukung full screen.");
  }
}

function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
