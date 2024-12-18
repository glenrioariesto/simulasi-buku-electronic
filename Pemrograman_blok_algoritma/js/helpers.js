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

let choosenCar = 1;
function showScene2() {
  backgroundSound.play();
  soundClick();
  document.getElementById("scene1").style.display = "none";
  document.getElementById("scene2").style.display = "flex";
}

function showScene1() {
  soundClick();
  document.getElementById("scene1").style.display = "flex";
  document.getElementById("scene2").style.display = "none";
  document.getElementById("scene3").style.display = "none";
  document.getElementById("scene4").style.display = "none";
}

// Fungsi untuk mengurangi volume suara secara bertahap
function fadeOutSound(audioElement, duration) {
  const stepTime = 10; // Waktu tiap langkah dalam milidetik
  const stepVolume = audioElement.volume / (duration / stepTime);

  const fadeInterval = setInterval(() => {
    if (audioElement.volume > stepVolume) {
      audioElement.volume -= stepVolume; // Kurangi volume secara bertahap
    } else {
      audioElement.volume = 0; // Pastikan volume menjadi 0
      audioElement.pause(); // Hentikan suara
      audioElement.currentTime = 0; // Reset ke awal
      clearInterval(fadeInterval); // Hentikan interval
    }
  }, stepTime);
}

function fadeOutSound(audioElement, duration) {
  const stepTime = 50; // Waktu tiap langkah dalam milidetik
  const stepVolume = audioElement.volume / (duration / stepTime);

  const fadeInterval = setInterval(() => {
    if (audioElement.volume > stepVolume) {
      audioElement.volume -= stepVolume; // Kurangi volume secara bertahap
    } else {
      audioElement.volume = 0; // Pastikan volume menjadi 0
      audioElement.pause(); // Hentikan suara
      audioElement.currentTime = 0; // Reset ke awal
      clearInterval(fadeInterval); // Hentikan interval
    }
  }, stepTime);
}
function showScene3() {
  soundClick();

  document.getElementById("scene2").style.display = "none";
  document.getElementById("scene3").style.display = "flex";
}

function showScene4() {
  // Mainkan suara klik
  soundClick();

  // Ambil elemen mobil
  const car = document.querySelector(".car-loading");
  if (car) {
    // Mainkan suara mobil
    const carLoadingSound = document.getElementById("carLoadingSound");
    carLoadingSound.currentTime = 0;
    carLoadingSound.volume = 0.5; // Pastikan volume mulai dari 1
    carLoadingSound.play();

    // Tambahkan kelas animasi untuk mobil
    car.classList.add("move-right-start");
    setTimeout(() => {
      car.classList.remove("move-right-start");
      car.classList.add("move-right-end");
    }, 1000);

    // Tetapkan timeout untuk mengurangi suara bertahap
    setTimeout(() => {
      fadeOutSound(carLoadingSound, 1000); // Durasi fade-out 2 detik

      // Pindah ke Scene 2 setelah suara selesai fade-out
      setTimeout(() => {
        document.getElementById("scene3").style.display = "none";
        document.getElementById("scene4").style.display = "flex";
      }, 1100); // Sesuaikan dengan durasi fade-out
    }, 1000); // Sesuaikan dengan durasi animasi mobil
  }
}

function showScene5() {
  soundCelebrate();
  soundCelebrate2();
  document.getElementById("scene4").style.display = "none";
  document.getElementById("scene5").style.display = "flex";
  document.getElementById("celebrate").style.display = "flex";
}

function chooseCar(carNumber) {
  soundClick();
  console.log(carNumber);
  const car = document.getElementById("car-loading");
  const mainCar = document.getElementById("car");
  if (carNumber == 1) {
    choosenCar = 1;
    car.classList.remove("car-2", "car-3");
    car.classList.add("car-1");
    mainCar.classList.add("car-1");
  } else if (carNumber == 2) {
    choosenCar = 2;
    car.classList.remove("car-1", "car-3");
    car.classList.add("car-2");
    mainCar.classList.add("car-2");
  } else if (carNumber == 3) {
    choosenCar = 3;
    car.classList.remove("car-1", "car-2");
    car.classList.add("car-3");
    mainCar.classList.add("car-3");
  }
}

function showModal(message) {
  document.getElementById("message").innerHTML = message;
  document.getElementById("myModal").style.display = "flex";
}
function closeModal() {
  // clickSound.currentTime = 0;
  // clickSound.play();
  document.getElementById("myModal").style.display = "none";

  const map = document.getElementById("map");
  map.className = "";
  switch (level) {
    case 1:
      map.classList.add("map-level-1");
      break;
    case 2:
      map.classList.add("map-level-2");
      break;
    case 3:
      map.classList.add("map-level-3");
      break;
    case 4:
      map.classList.add("map-level-4");
      break;
    case 5:
      map.classList.add("map-level-5");
      break;
    case 6:
      map.classList.add("map-level-6");
      break;
    default:
      showScene5();
      return;
  }
  resetPosition();
}
