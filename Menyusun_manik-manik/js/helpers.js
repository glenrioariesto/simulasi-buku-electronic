const clickSound = document.getElementById("clickSound");
const backgroundSound = document.getElementById("backgroundSound");
const correctSound = document.getElementById("correctSound");
const celebrateSound = document.getElementById("celebrateSound");
const celebrate2Sound = document.getElementById("celebrate2Sound");
const failSound = document.getElementById("failSound");

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

function soundBackground() {
  backgroundSound.currentTime = 0;
  backgroundSound.play();
}

function showScene2() {
  soundClick();
  soundBackground();
  document.getElementById("scene1").style.display = "none";
  document.getElementById("scene2").style.display = "block";
}

function showScene3() {
  soundClick();
  document.getElementById("scene2").style.display = "none";
  document.getElementById("scene3").style.display = "flex";
}

function showBackScene1() {
  document.getElementById("scene3").style.display = "none";
  document.getElementById("scene1").style.display = "flex";
}

function showBackScene2() {
  soundClick();
  document.getElementById("scene3").style.display = "none";
  document.getElementById("scene2").style.display = "flex";

  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide) => slide.classList.remove("active")); // Hapus semua kelas aktif
  if (slides.length > 0) {
    slides[0].classList.add("active"); // Aktifkan slide pertama
  }
  currentSlide = 0;
}

function showModal(message, correct, image) {
  document.getElementById("message").innerHTML = message;
  const modalInfo = document.getElementById("imageInfo");
  const modalImage = document.getElementById("modalImage");
  const imageUrl = "assets/allManik2.png";
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
const slides = document.querySelectorAll(".slide");

function changeSlide(direction) {
  soundClick();
  slides[currentSlide].classList.remove("active");
  currentSlide += direction;

  if (currentSlide >= slides.length) {
    showScene3(); // Pindah ke scene berikutnya jika sudah mencapai slide terakhir
    return;
  } else if (currentSlide < 0) {
    currentSlide = 0; // Mencegah mundur lebih jauh dari slide pertama
  }

  slides[currentSlide].classList.add("active");
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
        showBackScene1();
        currentSlide = 0;
        document.getElementById("myModal3").style.display = "none";
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