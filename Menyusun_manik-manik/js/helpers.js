const clickSound = document.getElementById("clickSound");
const backgroundSound = document.getElementById("backgroundSound");
const correctSound = document.getElementById("correctSound");
const celebrateSound = document.getElementById("celebrateSound");
const celebrate2Sound = document.getElementById("celebrate2Sound");
const failSound = document.getElementById("failSound");

let isPlaying = true;
const soundImage = document.getElementById("sound-image");
function backgroundSoundGame() {
  soundClick();
  if (!isPlaying) {
    isPlaying = true;
    backgroundSound.pause();
    soundImage.src = "assets/unmute.webp";
  } else {
    backgroundSound.currentTime = 10;
    backgroundSound.volume = 0.2;
    backgroundSound.play();
    soundImage.src = "assets/mute.webp";
    isPlaying = false;
  }
}
function soundFail() {
  failSound.currentTime = 0;
  failSound.play();
}
function soundWin() {
  correctSound.currentTime = 0;
  correctSound.play();
}

function soundCelebrate() {
  celebrateSound.currentTime = 0;
  celebrateSound.play();
}

function soundCelebrate2() {
  celebrate2Sound.currentTime = 0;
  celebrate2Sound.play();
}

function soundClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function showScene2() {
  soundClick();
  document.getElementById("scene1").style.display = "none";
  document.getElementById("scene2").style.display = "block";
}

function showBackScene1() {
  soundClick();
  document.getElementById("scene2").style.display = "none";
  document.getElementById("scene1").style.display = "flex";
}

function showBackScene1FromScene4() {
  soundClick();
  document.getElementById("scene4").style.display = "none";
  document.getElementById("scene1").style.display = "flex";
  window.location.reload();
}

function showScene3() {
  soundClick();
  document.getElementById("scene2").style.display = "none";
  document.getElementById("scene3").style.display = "flex";
  level = 1;
  isScene3Active = true;
  initializeScene3();
  activateScene3();
  reset();
  
}

function showScene4() {
  document.getElementById("scene3").style.display = "none";
  document.getElementById("scene4").style.display = "flex";
}



function showBackScene2() {
  soundClick();
  deactivateScene3();
  document.getElementById("scene3").style.display = "none";
  document.getElementById("scene2").style.display = "flex";

  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide) => slide.classList.remove("active")); // Hapus semua kelas aktif
  if (slides.length > 0) {
    slides[0].classList.add("active"); // Aktifkan slide pertama
  }

}

function showModal(message, correct, image) {
  document.getElementById("message").innerHTML = message;
  const modalInfo = document.getElementById("imageInfo");
  const modalImage = document.getElementById("modalImage");
  const imageUrl = "assets/allManik2.webp";
  if (image) {
    modalImage.src = imageUrl; // Set URL gambar
    modalImage.style.display = "block"; // Tampilkan gambar
  } else {
    modalImage.style.display = "none"; // Sembunyikan gambar jika tidak ada URL
  }

  const iconCorrectUrl = "assets/checklist.png";
  const iconIncorrectUrl = "assets/close.png";
  if (correct === "correct") {
    modalInfo.src = iconCorrectUrl; // Set URL gambar
    modalInfo.style.display = "block"; // Tampilkan gambar
  } else if (correct === "incorrect") {
    modalInfo.src = iconIncorrectUrl; // Set URL gambar
    modalInfo.style.display = "block"; // Tampilkan gambar
  } else {
    modalInfo.style.display = "none";
  }

  document.getElementById("myModal").style.display = "flex";
  document.getElementById("myModal2").style.display = "none";
}

function showModal2() {
  document.getElementById("myModal").style.display = "none";
  document.getElementById("myModal2").style.display = "flex";
}

function showModal3() {
  document.getElementById("myModal").style.display = "none";
  document.getElementById("myModal2").style.display = "none";
  document.getElementById("myModal3").style.display = "flex";
}
function closeModal() {
  soundClick();
  document.getElementById("myModal").style.display = "none";
}

function closeModal2() {
  soundClick();
  document.getElementById("myModal2").style.display = "none";
}

function closeModal3() {
  soundClick();
  document.getElementById("myModal3").style.display = "none";
}

function resetGame() {
  soundClick();
  reset();
}

function showInfo() {
  // showModal3(
  //   "Klik 2x pada manik-manik di dalam toples <br> untuk mengeluarkannya."
  // );
}

let currentSlide = 0;
let isChangingSlide = false; 
const slides = document.querySelectorAll(".slide");
function changeSlide(direction) {
  if (isChangingSlide) return; 
  isChangingSlide = true; 
  // Hilangkan kelas "active" dari slide saat ini
  soundClick();
  slides[currentSlide].classList.remove("active");
  slides[currentSlide].classList.remove(`slide-image-${currentSlide + 1}`);

  // Hitung slide berikutnya
  currentSlide += direction;
  if (currentSlide >= slides.length) {
    showScene3();
    currentSlide = 0; // Pindah ke scene berikutnya jika sudah mencapai slide terakhir
  } else if (currentSlide < 0) {
    showBackScene1();
    currentSlide = slides.length - 2;  // Mencegah mundur lebih jauh dari slide pertama
  }

  // Tambahkan kelas "active" dan kelas gambar baru ke slide saat ini
  slides[currentSlide].classList.add("active");
  slides[currentSlide].classList.add(`slide-image-${currentSlide + 1}`);
  setTimeout(() => {
    isChangingSlide = false;
  }, 500); 
}
let selectedOption;
function storeAnswer(option) {
  soundClick();
  document.querySelectorAll(".option-btn").forEach((button) => {
    button.classList.remove("active");
  });

  // Tambahkan class 'active' ke tombol yang diklik
  const clickedButton = document.querySelector(
    `.option-btn[data-option="${option}"]`
  );
  if (clickedButton) {
    clickedButton.classList.add("active");
  }

  selectedOption = option; // Store the selected option
}

function checkAnswer() {
  // Only call selectAnswer if an option has been selected
  soundClick();
  if (selectedOption) {
    selectAnswer(selectedOption);
  } else {
    showModal("Pilih jawaban terlebih dahulu!");
  }
  document.querySelectorAll(".option-btn").forEach((button) => {
    button.classList.remove("active");
  });
}
function selectAnswer(option) {
  if ((level === 1 && option === "C") || (level === 2 && option === "B2")) {
    // Tentukan pesan modal berdasarkan level
    let modalMessage;
    if (level === 2) {
      modalMessage =
        "Yay! Jawabanmu benar.<br>Selamat, kamu telah menyelesaikan semua level.";
    } else {
      modalMessage =
        "Yay! Jawabanmu benar,<br>silahkan lanjut ke level berikutnya.";
    }

    showModal(modalMessage, "correct");

    const celebrateElement = document.getElementById("celebrate");

    // Reset the GIF by changing the src
    const gifSrc = celebrateElement.src;
    celebrateElement.style.display = "none"; // Hide it briefly
    celebrateElement.src = "";
    setTimeout(() => {
      soundCelebrate();
      soundCelebrate2();
      soundWin();
      celebrateElement.src = gifSrc; // Reassign src to reload GIF
      celebrateElement.style.display = "block"; // Show it again
    }, 10);

    // Hide the GIF after 2.5 seconds
    setTimeout(() => {
      celebrateElement.style.display = "none";

      if (level === 2) {
        level = 0;
        setTimeout(() => {
          showScene4();
          closeModal();
          closeModal2();
          closeModal3();
        }, 2500);
        currentSlide = 0;
      } else if (level === 1) {
        initManik = initManik2; // Pindah ke inisialisasi level 2
      }

      level++; // Naikkan level
      reset();
    }, 2500);
  } else {
    soundFail();
    showModal(
      "Jawabanmu masih kurang tepat,<br>silakan hitung kembali manik-manik<br>yang sudah tersusun dengan teliti.",
      "incorrect"
    );
  }
  selectedOption = null;
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
  enterFullScreen();
  closeAlert();
  
  
  document.addEventListener('fullscreenchange', onFullScreenChange);
  document.addEventListener('webkitfullscreenchange', onFullScreenChange);
  document.addEventListener('mozfullscreenchange', onFullScreenChange);
  document.addEventListener('msfullscreenchange', onFullScreenChange);

}



// Fungsi untuk menangani pilihan No
function handleNo() {
  // Masukkan logika untuk aksi ketika pengguna memilih "No"
  // console.log("Pengguna memilih No");
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

function onFullScreenChange() {
  // Cek apakah sudah dalam mode layar penuh
  if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
    // Setelah layar penuh diaktifkan, panggil adjustCanvasSize
    adjustCanvasSize();

    // Hapus event listener untuk menghindari pemanggilan berulang
    document.removeEventListener('fullscreenchange', onFullScreenChange);
    document.removeEventListener('webkitfullscreenchange', onFullScreenChange);
    document.removeEventListener('mozfullscreenchange', onFullScreenChange);
    document.removeEventListener('msfullscreenchange', onFullScreenChange);
  }
}

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
