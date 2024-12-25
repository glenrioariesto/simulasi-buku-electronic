let caliper1 = document.getElementById("layer1");
let caliper2 = document.getElementById("layer2");
let caliper3 = document.getElementById("layer3");
let caliper4 = document.getElementById("layer4");
let caliper5 = document.getElementById("layer5");
let caliper6 = document.getElementById("layer6");
let caliper7 = document.getElementById("layer7");
let modalImage = document.getElementById("modalImage");
let correctWrongImage = document.getElementById("correctWrong");

const containerBackground = document.querySelector(".container");
let containerWidth = containerBackground.offsetWidth;
let isDragging = false;
const isTabletStandard = window.innerWidth > 932 && window.innerWidth <= 1024;
const isTabletLarge = window.innerWidth > 1024 && window.innerWidth <= 1280;

let scale = isTabletStandard ? 0.5 : isTabletLarge ? 1 : 1;

const zoomStep = 0.1; // Increment zoom per step
const minScale = 1; // Skala minimum
const maxScale = 10; // Skala maksimum
let moveInterval = null;

let currentRotation = 0;
let direction = 0.2;
let leftRotationLimit = -90;
let rightRotationLimit = 15;
let positionX = containerWidth * 0.1; // Posisi awal X (relatif ke ukuran layar)
let positionY = containerWidth * 2; // Posisi awal Y (relatif ke ukuran layar)
let originX = 50; // Posisi awal transformOrigin X dalam persen
let originY = 50;

let level = 0;
let limitLeft = 0;
let limitRight = 0;
// Update posisi alat ukur

const question = document.getElementById("question");
const boltElements = {
  bolt1UK02: document.getElementById("bolt1-UK02"),
  bolt2UK02: document.getElementById("bolt2-UK02"),
  bolt3UK02: document.getElementById("bolt3-UK02"),
  bolt1UK05: document.getElementById("bolt1-UK05"),
  bolt2UK05: document.getElementById("bolt2-UK05"),
  bolt3UK05: document.getElementById("bolt3-UK05"),
  bolt1UKMikro: document.getElementById("bolt1-UKMikro"),
  bolt2UKMikro: document.getElementById("bolt2-UKMikro"),
  kayu1: document.getElementById("kayu-1"),
  kayu2: document.getElementById("kayu-2"),
};

function resetBolts() {
  Object.values(boltElements).forEach((bolt) => {
    bolt.style.display = "none";
  });
}

function updateLimitLeft(limitLevel = 0) {
  containerWidth = containerBackground.offsetWidth;
  resetBolts();

  const isTabletStandardLimit =
    window.innerWidth > 932 && window.innerWidth <= 1024;
  const isTabletLargeLimit =
    window.innerWidth > 1024 && window.innerWidth <= 1280;

  switch (limitLevel) {
    case 1:
      boltElements.bolt1UK02.style.display = "block";
      boltElements.bolt2UK02.style.display = "block";
      boltElements.bolt3UK02.style.display = "block";
      boltElements.bolt1UK02.style.opacity = "0.5";
      boltElements.bolt2UK02.style.opacity = "1";
      boltElements.bolt3UK02.style.opacity = "1";

      // limitLeft = window.innerWidth <= 1000 ? 33 : 33;
      limitLeft = isTabletStandardLimit ? 66 : isTabletLargeLimit ? 33 : 33;

      limitRight = window.innerWidth <= 1000 ? 0.3399 : 0.339;
      level = limitLevel;
      positionX = containerWidth * 0.1;

      break;
    case 2:
      boltElements.bolt1UK02.style.display = "block";
      boltElements.bolt2UK02.style.display = "block";
      boltElements.bolt3UK02.style.display = "block";
      boltElements.bolt1UK02.style.opacity = "1";
      boltElements.bolt2UK02.style.opacity = "0.5";
      boltElements.bolt3UK02.style.opacity = "1";
      limitLeft = isTabletStandardLimit ? 52 : isTabletLargeLimit ? 26 : 26;

      limitRight = window.innerWidth <= 1000 ? 0.3399 : 0.339;
      positionX = containerWidth * 0.1;
      level = limitLevel;

      break;
    case 3:
      boltElements.bolt1UK02.style.display = "block";
      boltElements.bolt2UK02.style.display = "block";
      boltElements.bolt3UK02.style.display = "block";
      boltElements.bolt1UK02.style.opacity = "1";
      boltElements.bolt2UK02.style.opacity = "1";
      boltElements.bolt3UK02.style.opacity = "0.5";
      limitLeft = isTabletStandardLimit ? 62 : isTabletLargeLimit ? 31 : 31;

      limitRight = window.innerWidth <= 1000 ? 0.3399 : 0.339;
      positionX = containerWidth * 0.1;
      level = limitLevel;

      break;
    case 4:
      boltElements.bolt1UK05.style.display = "block";
      boltElements.bolt2UK05.style.display = "block";
      boltElements.bolt3UK05.style.display = "block";
      boltElements.bolt1UK05.style.opacity = "0.5";
      boltElements.bolt2UK05.style.opacity = "1";
      boltElements.bolt3UK05.style.opacity = "1";
      limitLeft = isTabletStandardLimit
        ? 110.499995
        : isTabletLargeLimit
        ? 55
        : 55;
      limitRight = window.innerWidth <= 1000 ? 0.3399 : 0.339;
      positionX = containerWidth * 0.1;
      level = limitLevel;

      break;
    case 5:
      boltElements.bolt1UK05.style.display = "block";
      boltElements.bolt2UK05.style.display = "block";
      boltElements.bolt3UK05.style.display = "block";
      boltElements.bolt1UK05.style.opacity = "1";
      boltElements.bolt2UK05.style.opacity = "0.5";
      boltElements.bolt3UK05.style.opacity = "1";
      limitLeft = isTabletStandardLimit ? 80 : isTabletLargeLimit ? 40 : 40;
      limitRight = window.innerWidth <= 1000 ? 0.3399 : 0.339;
      positionX = containerWidth * 0.1;
      level = limitLevel;

      break;
    case 6:
      boltElements.bolt1UK05.style.display = "block";
      boltElements.bolt2UK05.style.display = "block";
      boltElements.bolt3UK05.style.display = "block";
      boltElements.bolt1UK05.style.opacity = "1";
      boltElements.bolt2UK05.style.opacity = "1";
      boltElements.bolt3UK05.style.opacity = "0.5";
      limitLeft = isTabletStandardLimit ? 74 : isTabletLargeLimit ? 37 : 37;
      limitRight = window.innerWidth <= 1000 ? 0.3399 : 0.339;
      positionX = containerWidth * 0.1;
      level = limitLevel;

      break;
    case 7:
      boltElements.bolt1UKMikro.style.display = "block";
      boltElements.bolt2UKMikro.style.display = "block";
      boltElements.bolt1UKMikro.style.opacity = "0.5";
      boltElements.bolt2UKMikro.style.opacity = "1";
      limitLeft = isTabletStandardLimit ? 82 : isTabletLargeLimit ? 41 : 41;
      limitRight = 0.8882;
      positionY = positionX * -3;
      positionX = containerWidth * 0.11199;
      level = limitLevel;
      break;
    case 8:
      boltElements.bolt1UKMikro.style.display = "block";
      boltElements.bolt2UKMikro.style.display = "block";
      boltElements.bolt1UKMikro.style.opacity = "1";
      boltElements.bolt2UKMikro.style.opacity = "0.5";
      limitLeft = isTabletStandardLimit
        ? 129.9
        : isTabletLargeLimit
        ? 64.4
        : 64.4;
      limitRight = 0.8882;
      positionX = containerWidth * 0.11199;
      level = limitLevel;
      break;
    case 9:
      boltElements.kayu1.style.display = "block";
      boltElements.kayu2.style.display = "block";
      boltElements.kayu1.style.opacity = "0.5";
      boltElements.kayu2.style.opacity = "1";
      level = limitLevel;
      leftRotationLimit = -90;
      rightRotationLimit = 15;
      break;
    case 10:
      boltElements.kayu1.style.display = "block";
      boltElements.kayu2.style.display = "block";
      boltElements.kayu1.style.opacity = "1";
      boltElements.kayu2.style.opacity = "0.5";
      leftRotationLimit = -90;
      rightRotationLimit = 52;
      level = limitLevel;

      break;
    default:
      limitLeft = 0;
      limitRight = window.innerWidth <= 1000 ? 0.3399 : 0.339;
      boltElements.bolt1UK02.style.display = "block";
      boltElements.bolt2UK02.style.display = "block";
      boltElements.bolt3UK02.style.display = "block";
  }
  updatePosition();
}

function setCaliperLevel(levelBolt) {
  updateLimitLeft(levelBolt);
  if (!caliper1 || !caliper2 || !caliper3) return;
  caliper1.className = "layer";
  caliper2.className = "layer";
  caliper3.className = "layer";

  switch (levelBolt) {
    case 1:
    case 2:
    case 3:
      caliper1.classList.add("layer1");
      caliper2.classList.add("layer2");
      caliper3.classList.add("layer3-U02");
      question.innerHTML = `Berapakah ukuran baut tersebut&#44; jika diukur menggunakan
      <br />jangka sorong dengan ketelitian
      <span id="UK-bolt" class="highlight">0,02 mm</span>?`;
      break;
    case 4:
    case 5:
    case 6:
      caliper1.classList.add("layer1");
      caliper2.classList.add("layer2");
      caliper3.classList.add("layer3-U05");

      question.innerHTML = `Berapakah ukuran baut tersebut&#44; jika diukur menggunakan
      <br />jangka sorong dengan ketelitian
      <span id="UK-bolt" class="highlight">0,05 mm</span>?`;

      break;
    case 7:
    case 8:
      createLayer4And5();
      caliper1.classList.add("layer1-mikro");
      caliper2.classList.add("layer2-mikro");
      caliper3.classList.add("layer3-mikro");

      question.innerHTML =
        "Berapakah ukkuran bola tersebut, jika diukur dengan <br> Mikrometer dengan ketelitian 0,01 mm?";

      break;
    case 9:
    case 10:
      scale = 1.4;
      updateZoom();
      removeLayersCreatedByCreateLayer4And5();
      caliper1.classList.add("layer1-kayu");
      caliper2.classList.add("layer2-kayu");
      caliper3.className = "";

      question.innerHTML =
        "Berapakah satuan derajat pada balok kayu tersebut,<br> jika diukur menggunakan busur derajat?";
      break;
    default:
      caliper1.classList.add("layer1");
      caliper2.classList.add("layer2");
      caliper3.classList.add("layer3-U02");
  }
}

function createLayer4And5() {
  const existingLayer5 = document.getElementById("layer5");
  const existingLayer6 = document.getElementById("layer6");
  const existingLayer7 = document.getElementById("layer7");

  if (existingLayer5) existingLayer5.remove();
  if (existingLayer6) existingLayer6.remove();
  if (existingLayer7) existingLayer7.remove();
  const layer5 = document.createElement("div");
  layer5.id = "layer5";
  layer5.className = "layer container";

  const layer6 = document.createElement("div");
  layer6.id = "layer6";
  layer6.className = "layer5-mikro";

  layer5.appendChild(layer6);
  caliper5 = layer5;
  caliper6 = layer6;
  caliper5.style.transform = `translateX(${Math.round(positionX)}px)`;
  caliper6.style.transform = `translatey(${Math.round(positionY)}px)`;

  const layer7 = document.createElement("div");
  layer7.id = "layer7";
  layer7.className = "layer layer6-mikro";
  containerBackground.appendChild(layer5);
  containerBackground.appendChild(layer7);
  caliper7 = layer7;
  caliper7.style.transform = `translateX(${Math.round(positionX)}px)`;
}

function removeLayersCreatedByCreateLayer4And5() {
  const layer5 = document.getElementById("layer5");
  const layer6 = document.getElementById("layer6");
  const layer7 = document.getElementById("layer7");

  if (layer5) layer5.remove();
  if (layer6) layer6.remove();
  if (layer7) layer7.remove();
}
const updatePosition = () => {
  if (level === 9 || level === 10) {
    const rotationStep = 1; // Derajat rotasi per langkah
    const newRotation = currentRotation + direction * rotationStep;
    if (newRotation < leftRotationLimit) {
      currentRotation = leftRotationLimit; // Tidak lebih dari batas kiri
    } else if (newRotation > rightRotationLimit) {
      currentRotation = rightRotationLimit; // Tidak lebih dari batas kanan
    } else {
      currentRotation = newRotation; // Rotasi diperbolehkan
    }
    caliper2.style.transform = `rotate(${currentRotation}deg)`;
  } else {
    caliper1.style.transform = `translateX(${Math.round(positionX)}px)`;
    caliper3.style.transform = `translateX(${Math.round(positionX)}px)`;
    if (!caliper5 || !caliper6 || !caliper7) return;
    caliper5.style.transform = `translateX(${Math.round(positionX)}px)`;
    caliper6.style.transform = `translatey(${Math.round(positionY)}px)`;
    caliper7.style.transform = `translateX(${Math.round(positionX)}px)`;
  }
};

const updateZoom = () => {
  containerBackground.style.transform = `scale(${scale})`;
  containerBackground.style.transformOrigin = `${originX}% ${originY}%`;
};

function moveLeft() {
  soundTools();
  positionX = Math.max(limitLeft, positionX - 1); // Batas kiri
  positionY = positionX * -3.1;
  direction = -0.2;

  updatePosition(); // Perbarui posisi
}

function moveRight() {
  soundTools();
  const maxPositionX = containerWidth - containerWidth * limitRight; // Sesuaikan batas kanan dengan lebar kontainer

  positionX = Math.min(maxPositionX, positionX + 1);
  positionY = positionX * -3.1;
  direction = 0.2;
  updatePosition(); // Perbarui posisi
}

function zoomIn() {
  soundClick();
  if (scale < maxScale) {
    scale += zoomStep;
    updateZoom(); // Perbarui zoom
  }
}

function zoomOut() {
  soundClick();
  if (scale > minScale) {
    scale -= zoomStep;
    updateZoom(); // Perbarui zoom
  }
}
function choosedBolt(bolt = 0) {
  setCaliperLevel(bolt);
  if (bolt >= 1 && bolt <= 8) {
    soundDropBolt();
  } else if (bolt === 9 || bolt === 10) {
    soundDropWood();
  }
  // Hapus elemen layer4 jika sudah ada
  document.getElementById("layer4")?.remove();

  // Peta bolt ke kelas CSS yang sesuai
  const boltClasses = {
    1: "bolt1-U02",
    2: "bolt2-U02",
    3: "bolt3-U02",
    4: "bolt1-U05",
    5: "bolt2-U05",
    6: "bolt3-U05",
    7: "bola1-mikro",
    8: "bola2-mikro",
    9: "kayu-1",
    10: "kayu-2",
  };

  if (boltClasses[bolt]) {
    const newLayer = document.createElement("div");
    newLayer.id = "layer4";
    newLayer.classList.add("layer", boltClasses[bolt]);
    containerBackground.appendChild(newLayer);
  }
}

const correctAnswersMobile = [
  "12.50", //soal1 UK02
  "9.86", //soal2 UK02
  "11.76", //soal3 UK02
  "20.85", //soal1 UK05
  "15.15", //soal2 UK05
  "14.05", //soal3 UK05
  "15.26", //soal1 mikro
  "24.04", //soal2 mikro
  "75.00", //soal1 busur derajat
  "38.00", //soal2 busur derajat
];

const correctAnswersTablet = [
  "12.50", //soal1 UK02
  "9.86", //soal2 UK02
  "11.76", //soal3 UK02
  "20.85", //soal1 UK05
  "15.15", //soal2 UK05
  "14.05", //soal3 UK05
  "15.26", //soal1 mikro
  "24.50", //soal2 mikro
  "105.00", //soal1 busur derajat
  "142.00", //soal2 busur derajat
];

const correctAnswersDev = [
  "12121.00",
  "12121.00",
  "12121.00",
  "12121.00",
  "12121.00",
  "12121.00",
  "12121.00",
  "12121.00",
  "12121.00",
  "12121.00",
];
const answeredCorrectly = Array(correctAnswersMobile.length).fill(false);

function formatAnswer(value) {
  return parseFloat(value).toFixed(2);
}

function checkAnswer() {
  soundClick();
  const answerInput = document.getElementById("answer");
  const answer = formatAnswer(answerInput.value.replace(",", "."));

  const correctMobileAnswer = correctAnswersMobile[level - 1];
  const correctTabletAnswer = correctAnswersTablet[level - 1];
  const correctAnswerDev = correctAnswersDev[level - 1];
  const isCorrectAnswer =
    (answer === correctMobileAnswer ||
      answer === correctAnswerDev ||
      answer === correctTabletAnswer) &&
    !answeredCorrectly[level - 1];

  if (isCorrectAnswer || answeredCorrectly[level - 1]) {
    handleCorrectAnswer();
  } else {
    correctWrongImage.src = "assets/text-popup-salah.png";
    updateModalImage();
    showModal("Jawaban Salah <br>", "wrong");
  }

  answerInput.value = ""; // Reset input
}

function handleCorrectAnswer() {
  answeredCorrectly[level - 1] = true; // Tandai jawaban benar
  correctWrongImage.src = "assets/text-popup-benar.png";

  updateModalImage(); // Update gambar berdasarkan level
  showSuccessMessage(); // Tampilkan pesan sukses
  navigateToNextBolt(); // Navigasi jika semua level tertentu sudah dijawab
}

function updateModalImage() {
  const modalImageSrc = {
    1: "assets/baut1-UK02.webp",
    2: "assets/baut2-UK02.webp",
    3: "assets/baut3-UK02.webp",
    4: "assets/baut1-UK05.webp",
    5: "assets/baut2-UK05.webp",
    6: "assets/baut3-UK05.webp",
    7: "assets/bola-kecil.webp",
    8: "assets/bola-besar.webp",
    9: "assets/plat-1-popup.png",
    10: "assets/plat-2-popup.png",
  };
  const smallerImages = [4, 7, 8];

  modalImage.src = modalImageSrc[level] || "";
  if (smallerImages.includes(level)) {
    modalImage.style.width = "60vw";
    modalImage.style.height = "auto";
  } else {
    modalImage.style.width = "300px";
    modalImage.style.height = "auto";
  }
}

function showSuccessMessage() {
  const successMessages = {
    "02mm":
      "Selamat! kamu telah berhasil menghitung ukuran baut menggunakan Jangka Sorong ketelitian 0,02 mm dengan benar.<br> Silahkan lanjut ke baut selanjutnya ",
    "05mm":
      "Selamat! kamu telah berhasil menghitung ukuran baut menggunakan Jangka Sorong ketelitian 0,05 mm dengan benar.<br> Silahkan lanjut ke baut selanjutnya ",
    "01mm":
      "Selamat! kamu telah berhasil menghitung ukuran baut menggunakan Mikrometer ketelitian 0,01 mm dengan benar.<br> Silahkan lanjut ke baut selanjutnya ",
    degree:
      "Selamat! kamu telah berhasil menghitung derajat menggunakan Busur Derajat dengan benar.",
  };

  if (level >= 1 && level <= 3) {
    showModal(successMessages["02mm"], "correct");
  } else if (level >= 4 && level <= 6) {
    showModal(successMessages["05mm"], "correct");
  } else if (level >= 7 && level <= 8) {
    showModal(successMessages["01mm"], "correct");
  } else if (level >= 9 && level <= 10) {
    showModal(successMessages["degree"], "correct");
  }
}

function navigateToNextBolt() {
  if (answeredCorrectly[8] && answeredCorrectly[9]) {
    setTimeout(() => {
      backScene5();
    }, 2000);
    answeredCorrectly[8] = false;
    answeredCorrectly[9] = false;
  } else if (answeredCorrectly[6] && answeredCorrectly[7]) {
    setTimeout(() => {
      backScene5();
    }, 2000);
    answeredCorrectly[6] = false;
    answeredCorrectly[7] = false;
  } else if (
    answeredCorrectly[3] &&
    answeredCorrectly[4] &&
    answeredCorrectly[5]
  ) {
    setTimeout(() => {
      backScene5();
    }, 2000);
    answeredCorrectly[3] = false;
    answeredCorrectly[4] = false;
    answeredCorrectly[5] = false;
  } else if (
    answeredCorrectly[0] &&
    answeredCorrectly[1] &&
    answeredCorrectly[2]
  ) {
    setTimeout(() => {
      backScene5();
    }, 2000);
    answeredCorrectly[0] = false;
    answeredCorrectly[1] = false;
    answeredCorrectly[2] = false;
  }
}

// Event listener untuk tombol panah kanan dan kiri
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
  }
  updatePosition();
});

// Set posisi awal
updatePosition();
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "+": // Zoom In
    case "=": // Zoom In (Shift + = key)
      if (scale < maxScale) {
        scale += zoomStep;
        updateZoom();
      }
      break;
    case "-": // Zoom Out
      if (scale > minScale) {
        scale -= zoomStep;
        updateZoom();
      }
      break;
  }
});

// Event listener untuk Zoom menggunakan Mouse Wheel
containerBackground.addEventListener("wheel", (event) => {
  event.preventDefault();
  if (event.deltaY < 0 && scale < maxScale) {
    // Scroll ke atas -> Zoom In
    scale += zoomStep;
  } else if (event.deltaY > 0 && scale > minScale) {
    // Scroll ke bawah -> Zoom Out
    scale -= zoomStep;
  }
  updateZoom();
});

containerBackground.addEventListener("mousedown", () => {
  isDragging = true; // Set isDragging ke true
});
// Saat mouse dilepas
window.addEventListener("mouseup", () => {
  isDragging = false; // Set isDragging ke false
});
containerBackground.addEventListener("mousemove", (event) => {
  if (isDragging) {
    // Pastikan hanya aktif saat klik dan tahan
    const rect = containerBackground.getBoundingClientRect();

    // Hitung posisi relatif terhadap kontainer
    const offsetX = ((event.clientX - rect.left) / rect.width) * 100; // Posisi X relatif dalam %
    const offsetY = ((event.clientY - rect.top) / rect.height) * 100; // Posisi Y relatif dalam %

    // Batasi originX dan originY agar tetap dalam batas awal kontainer
    originX = Math.max(0, Math.min(100, offsetX));
    originY = Math.max(0, Math.min(100, offsetY));

    // Perbarui transformasi zoom
    updateZoom();
  }
});

containerBackground.addEventListener("touchmove", (event) => {
  if (isDragging) {
    const touch = event.touches[0];
    const rect = containerBackground.getBoundingClientRect();

    // Hitung posisi relatif terhadap kontainer
    const offsetX = ((touch.clientX - rect.left) / rect.width) * 100;
    const offsetY = ((touch.clientY - rect.top) / rect.height) * 100;

    // Batasi originX dan originY agar tetap dalam batas awal kontainer
    originX = Math.max(0, Math.min(100, offsetX));
    originY = Math.max(0, Math.min(100, offsetY));

    // Perbarui transformasi zoom
    updateZoom();
  }
});

containerBackground.addEventListener("touchend", () => {
  isDragging = false;
});

function startMoveLeft() {
  moveInterval = setInterval(moveLeft, 20); // Menjalankan moveLeft setiap 20ms
}

// Fungsi untuk memulai gerakan terus menerus saat tombol ditekan
function startMoveRight() {
  moveInterval = setInterval(moveRight, 20); // Menjalankan moveRight setiap 20ms
}

// Fungsi untuk menghentikan gerakan saat tombol dilepaskan
function stopMove() {
  clearInterval(moveInterval); // Hentikan interval pergerakan
}

// Menambahkan event listeners ke tombol
document
  .getElementById("leftButton")
  .addEventListener("mousedown", startMoveLeft);
document.getElementById("leftButton").addEventListener("mouseup", stopMove);
document.getElementById("leftButton").addEventListener("mouseleave", stopMove); // Menghentikan jika mouse keluar dari tombol

document
  .getElementById("rightButton")
  .addEventListener("mousedown", startMoveRight);
document.getElementById("rightButton").addEventListener("mouseup", stopMove);
document.getElementById("rightButton").addEventListener("mouseleave", stopMove); // Menghentikan jika mouse keluar dari tombol

document
  .getElementById("leftButton")
  .addEventListener("touchstart", startMoveLeft);
document.getElementById("leftButton").addEventListener("touchend", stopMove);
document.getElementById("leftButton").addEventListener("touchcancel", stopMove);

// Event listener untuk sentuhan pada tombol kanan
document
  .getElementById("rightButton")
  .addEventListener("touchstart", startMoveRight);
document.getElementById("rightButton").addEventListener("touchend", stopMove);
document
  .getElementById("rightButton")
  .addEventListener("touchcancel", stopMove);

containerBackground.addEventListener("touchstart", (event) => {
  isDragging = true;
  event.preventDefault(); // Mencegah default behavior agar drag lebih responsif
});
updatePosition();
updateLimitLeft();
updateZoom();
// Tambahkan event listener untuk mendeteksi perubahan ukuran layar
window.addEventListener("resize", () => {
  const screenWidth = window.innerWidth;
  const isTabletStandardResize =
    window.innerWidth > 932 && window.innerWidth <= 1024;
  const isTabletLargeResize =
    window.innerWidth > 1024 && window.innerWidth <= 1280;

  if (screenWidth <= 1200) {
    scale = isTabletStandardResize ? 0.5 : isTabletLargeResize ? 1 : 1;
  } else {
    console.log("Desktop");
    scale = 2; // Desktop
  }
  updateLimitLeft();
  updateZoom();
});
