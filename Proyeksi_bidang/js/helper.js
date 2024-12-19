let currentSlide = 0;
let currentScene = 0;
const slides = document.querySelectorAll(".panduan"); // Ambil semua panduan
const totalSlides = slides.length;
const clickSound = document.getElementById("clickOptionSound");
const backgroundSound = document.getElementById("playSoundGame");
const dropItemsSound = document.getElementById("dropItemsSound");
const correctSound = document.getElementById("correctSound");
const failSound = document.getElementById("failSound");
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
    backgroundSound.volume = 0.5;
    backgroundSound.play();
    soundImage.src = "assets/mute.png";
    isPlaying = false;
  }
}
function soundClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function soundHover() {
  clickSound.currentTime = 0;
  clickSound.volume = 0.1;
  clickSound.play();
}

function soundDropItems() {
  dropItemsSound.currentTime = 0;
  dropItemsSound.play();
}

function soundCorrect() {
  correctSound.currentTime = 0;
  correctSound.play();
}

function soundFail() {
  failSound.currentTime = 0;
  failSound.play();
}
function showScene1() {
  document.getElementById("scene2").style.display = "none";
  document.getElementById("scene1").style.display = "flex";
}

const showScene2 = () => {
  soundClick();
  document.getElementById("scene1").style.display = "none";
  document.getElementById("scene2").style.display = "flex";
};

const showScene3 = () => {
  soundClick();
  document.getElementById("scene2").style.display = "none";
  document.getElementById("scene3").style.display = "flex";
};

const showBackScene3 = () => {
  soundClick();
  currentScene = 0;
  document.getElementById("scene2").style.display = "none";
  document.getElementById("scene3").style.display = "flex";
};

const showScene4 = () => {
  soundClick();
  currentScene = 1;
  document.getElementById("scene3").style.display = "none";
  document.getElementById("scene2").style.display = "flex";
};

const showScene5 = () => {
  soundClick();
  document.getElementById("scene2").style.display = "none";
  document.getElementById("scene4").style.display = "flex";
};

const showScene6 = () => {
  currentScene = 2;
  document.getElementById("scene4").style.display = "none";
  document.getElementById("scene2").style.display = "flex";
};

const showScene7 = () => {
  soundClick();
  document.getElementById("scene2").style.display = "none";
  document.getElementById("scene4").style.display = "flex";
};

const showScene8 = () => {
  currentLevel = 0;
  currentScene = 3;
  document.getElementById("scene2").style.display = "none";
  document.getElementById("scene4").style.display = "none";
  document.getElementById("scene5").style.display = "flex";
};

const showScene9 = () => {
  soundClick();
  document.getElementById("scene5").style.display = "none";
  document.getElementById("scene2").style.display = "flex";
};

const showScene10 = () => {
  document.getElementById("scene2").style.display = "none";
  document.getElementById("scene7").style.display = "flex";
};

const backShowScene1 = () => {
  soundClick();
  currentSlide = 0;
  currentScene = 0;
  document.getElementById("scene5").style.display = "none";
  document.getElementById("scene1").style.display = "flex";
  showSlide(currentSlide);
};

const backShowScene1fromScene7 = () => {
  soundClick();
  currentSlide = 0;
  currentScene = 0;
  document.getElementById("scene7").style.display = "none";
  document.getElementById("scene1").style.display = "flex";
  showSlide(currentSlide);
};
// Fungsi untuk menampilkan slide dengan animasi
const showSlide = (index, direction = "right", backSlide = false) => {
  console.log(index);
  console.log(slides.length);

  slides.forEach((slide, i) => {
    // Hapus semua animasi exit sebelumnya
    slide.classList.remove("active", "exit-left", "exit-right");

    if (i === index) {
      // Tampilkan slide dengan animasi masuk
      slide.classList.add("active");
    } else if (direction === "right" && i < index) {
      // Slide keluar ke kiri
      slide.classList.add("exit-left");
    } else if (direction === "left" && i > index) {
      // Slide keluar ke kanan
      slide.classList.add("exit-right");
    }
  });
};

// Fungsi untuk berpindah ke slide berikutnya
const nextSlide = () => {
  soundClick();

  console.log("currentSlide", currentSlide);
  console.log("currentScene", currentScene);
  if (
    currentSlide < totalSlides - 1 &&
    currentSlide === 3 &&
    currentScene === 2
  ) {
    showScene7();
    currentSlide++;
    showSlide(currentSlide, "right");
  } else if (
    currentSlide < totalSlides - 1 &&
    currentSlide === 2 &&
    currentScene === 1
  ) {
    showScene5();
    currentSlide++;
    showSlide(currentSlide, "right");
  } else if (
    currentSlide < totalSlides - 1 &&
    currentSlide === 1 &&
    currentScene === 0
  ) {
    showScene3();
    currentSlide++;
    showSlide(currentSlide, "right");
  } else if (currentSlide < totalSlides - 1) {
    currentSlide++;
    showSlide(currentSlide, "right");
  } else {
    // Pindah ke scene3 saat mencapai slide terakhir
    showScene10();
  }
};
const bidangElements = document.querySelectorAll(".bidang");

// Fungsi untuk berpindah ke slide sebelumnya
const prevSlide = () => {
  soundClick();
  console.log("currentSlide", currentSlide);
  console.log("currentScene", currentScene);
  if (currentSlide > 0 && currentSlide === 4 && currentScene === 3) {
    showScene8();
    showSlide(currentSlide, "left");
  } else if (currentSlide > 0 && currentSlide === 3 && currentScene === 2) {
    // Kembali ke Scene3
    console.log("masuk");
    showScene5();
    setTimeout(() => {
      bidangElements.forEach((element, index) => {
        const newId = `bidang${index + 1}`;
        element.id = newId;
      });
      reshuffleBidangs();
      reset();
    }, 1500);
    currentLevel--;
    checkLevel(currentLevel);
    showSlide(currentSlide, "left");
  } else if (currentSlide > 0 && currentSlide === 2 && currentScene === 1) {
    // Kembali ke Scene1
    showBackScene3();
    showSlide(currentSlide, "left");
  } else if (currentSlide > 0) {
    currentSlide--;
    showSlide(currentSlide, "left");
  } else {
    showScene1();
  }
};

// Tampilkan slide pertama saat halaman dimuat
showSlide(currentSlide);

function hackButton() {
  if (currentLevel === 4) {
    setTimeout(() => {
      setTimeout(() => {
        bidangElements.forEach((element, index) => {
          const newId = `bidang${index + 17}`;
          element.id = newId;
        });
      }, 1500);
      showScene6();
    }, 1500);
  } else if (currentLevel === 9) {
    setTimeout(() => {
      setTimeout(() => {
        bidangElements.forEach((element, index) => {
          const newId = `bidang${index + 1}`;
          element.id = newId;
        });
      }, 1500);
      showScene8();
    }, 1500);
  }
  currentLevel++; // Naikkan level jika benar
  checkLevel(currentLevel);
}
// Navigasi tombol

document.getElementById("nextBtn").addEventListener("click", nextSlide);
document.getElementById("prevBtn").addEventListener("click", prevSlide);

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".button-mulai.scene1");
  if (button) {
    button.addEventListener("click", showScene2);
  }
});
