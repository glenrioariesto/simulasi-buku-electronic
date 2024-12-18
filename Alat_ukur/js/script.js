let caliper1 = document.getElementById("layer1");
let caliper2 = document.getElementById("layer2");
let caliper3 = document.getElementById("layer3");
let caliper4 = document.getElementById("layer4");
let caliper5 = document.getElementById("layer5");
let caliper6 = document.getElementById("layer6");
let caliper7 = document.getElementById("layer7");
let modalImage = document.getElementById("modalImage");

const containerBackground = document.querySelector(".container");
let containerWidth = containerBackground.offsetWidth;
let isDragging = false;
let scale = 1; // Skala awal untuk zoom
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

const answerBolt = document.getElementById("UK-bolt");
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

  switch (limitLevel) {
    case 1:
      boltElements.bolt2UK02.style.display = "block";
      boltElements.bolt3UK02.style.display = "block";
      // limitLeft = window.innerWidth <= 1000 ? 33 : 33;
      limitLeft = 33;

      limitRight = window.innerWidth <= 1000 ? 0.3399 : 0.339;
      level = limitLevel;
      positionX = containerWidth * 0.1;
      break;
    case 2:
      boltElements.bolt1UK02.style.display = "block";
      boltElements.bolt3UK02.style.display = "block";
      // limitLeft = window.innerWidth <= 1000 ? 27 : 55;
      limitLeft = 27;
      limitRight = window.innerWidth <= 1000 ? 0.3399 : 0.339;
      positionX = containerWidth * 0.1;
      level = limitLevel;

      break;
    case 3:
      boltElements.bolt1UK02.style.display = "block";
      boltElements.bolt2UK02.style.display = "block";
      // limitLeft = window.innerWidth <= 1000 ? 31 : 64;
      limitLeft = 31;
      limitRight = window.innerWidth <= 1000 ? 0.3399 : 0.339;
      positionX = containerWidth * 0.1;
      level = limitLevel;

      break;
    case 4:
      boltElements.bolt2UK05.style.display = "block";
      boltElements.bolt3UK05.style.display = "block";
      // limitLeft = window.innerWidth <= 1000 ? 55 : 110;
      limitLeft = 55;
      limitRight = window.innerWidth <= 1000 ? 0.3399 : 0.339;
      positionX = containerWidth * 0.1;
      level = limitLevel;

      break;
    case 5:
      boltElements.bolt1UK05.style.display = "block";
      boltElements.bolt3UK05.style.display = "block";
      // limitLeft = window.innerWidth <= 1000 ? 40 : 80;
      limitLeft = 40;
      limitRight = window.innerWidth <= 1000 ? 0.3399 : 0.339;
      positionX = containerWidth * 0.1;
      level = limitLevel;

      break;
    case 6:
      boltElements.bolt1UK05.style.display = "block";
      boltElements.bolt2UK05.style.display = "block";
      // limitLeft = window.innerWidth <= 1000 ? 37 : 76;
      limitLeft = 37;
      limitRight = window.innerWidth <= 1000 ? 0.3399 : 0.339;
      positionX = containerWidth * 0.1;
      level = limitLevel;

      break;
    case 7:
      boltElements.bolt2UKMikro.style.display = "block";
      // limitLeft = window.innerWidth <= 1000 ? 40 : 80;
      limitLeft = 40;
      limitRight = 0.8882;
      positionX = containerWidth * 0.11199;
      level = limitLevel;
      break;
    case 8:
      boltElements.bolt1UKMikro.style.display = "block";
      // limitLeft = window.innerWidth <= 1000 ? 64 : 127;
      limitLeft = 64;
      limitRight = 0.8882;
      positionX = containerWidth * 0.11199;
      level = limitLevel;
      break;
    case 9:
      boltElements.kayu2.style.display = "block";
      level = limitLevel;
      leftRotationLimit = -90;
      rightRotationLimit = 15;
      break;
    case 10:
      leftRotationLimit = -90;
      rightRotationLimit = 52;
      boltElements.kayu1.style.display = "block";
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
      answerBolt.innerText = "0,02 mm";
      break;
    case 4:
    case 5:
    case 6:
      caliper1.classList.add("layer1");
      caliper2.classList.add("layer2");
      caliper3.classList.add("layer3-U05");

      answerBolt.innerText = "0,05 mm";

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
      caliper3.remove();

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
    console.log("new", newRotation);
    if (newRotation < leftRotationLimit) {
      currentRotation = leftRotationLimit; // Tidak lebih dari batas kiri
    } else if (newRotation > rightRotationLimit) {
      currentRotation = rightRotationLimit; // Tidak lebih dari batas kanan
    } else {
      currentRotation = newRotation; // Rotasi diperbolehkan
    }
    console.log("current", currentRotation);
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
  positionY = positionX * -5;
  direction = -0.2;

  updatePosition(); // Perbarui posisi
}

function moveRight() {
  soundTools();
  const maxPositionX = containerWidth - containerWidth * limitRight; // Sesuaikan batas kanan dengan lebar kontainer

  positionX = Math.min(maxPositionX, positionX + 1);
  positionY = positionX * -3;
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
const correctAnswersDesktop = [
  "12.70",
  "10.40",
  "12.10",
  "20.40",
  "15.15",
  "14.35",
  "1",
  "1",
  "1",
  "10",
];
const correctAnswersMobile = [
  "12.44",
  "10.18",
  "11.68",
  "20.80",
  "15.15",
  "14.00",
  "1",
  "1",
  "1",
  "10",
];

const correctAnswersDev = [
  "111.00",
  "111.00",
  "111.00",
  "111.00",
  "111.00",
  "111.00",
  "111.00",
  "111.00",
  "111.00",
  "111.00",
];
const answeredCorrectly = Array(correctAnswersDesktop.length).fill(false);

function formatAnswer(value) {
  return parseFloat(value).toFixed(2);
}

function checkAnswer() {
  soundClick();
  const answerInput = document.getElementById("answer");
  const answer = formatAnswer(answerInput.value.replace(",", "."));

  const correctDesktopAnswer = correctAnswersDesktop[level - 1];
  const correctMobileAnswer = correctAnswersMobile[level - 1];
  const correctAnswerDev = correctAnswersDev[level - 1];
  const isCorrectAnswer =
    (answer === correctDesktopAnswer ||
      answer === correctMobileAnswer ||
      answer === correctAnswerDev) &&
    !answeredCorrectly[level - 1];

  if (isCorrectAnswer || answeredCorrectly[level - 1]) {
    handleCorrectAnswer();
  } else {
    showModal("Jawaban Salah", "wrong");
  }

  answerInput.value = ""; // Reset input
}

function handleCorrectAnswer() {
  answeredCorrectly[level - 1] = true; // Tandai jawaban benar
  updateModalImage(); // Update gambar berdasarkan level
  showSuccessMessage(); // Tampilkan pesan sukses
  navigateToNextBolt(); // Navigasi jika semua level tertentu sudah dijawab
}

function updateModalImage() {
  const modalImageSrc = {
    1: "assets/baut1-UK02.png",
    2: "assets/baut2-UK02.png",
    3: "assets/baut3-UK02.png",
    4: "assets/baut1-UK05.png",
    5: "assets/baut2-UK05.png",
    6: "assets/baut3-UK05.png",
    7: "assets/bola-kecil.png",
    8: "assets/bola-besar.png",
    9: "assets/kayu-1.png",
    10: "assets/kayu-2.png",
  };

  const smallerImages = [4, 7, 8];
  const heightPriorityImages = [9, 10];
  modalImage.src = modalImageSrc[level] || "";
  if (smallerImages.includes(level)) {
    modalImage.style.width = "150px";
    modalImage.style.height = "auto";
  } else if (heightPriorityImages.includes(level)) {
    modalImage.style.width = "auto";
    modalImage.style.height = "150px";
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
    showScene4();
  } else if (answeredCorrectly[6] && answeredCorrectly[7]) {
    choosedBolt(9);
    caliper1.style.transform = `translateX(0px)`;
  } else if (
    answeredCorrectly[3] &&
    answeredCorrectly[4] &&
    answeredCorrectly[5]
  ) {
    choosedBolt(7);
  } else if (
    answeredCorrectly[0] &&
    answeredCorrectly[1] &&
    answeredCorrectly[2]
  ) {
    choosedBolt(4);
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

  if (screenWidth <= 1200) {
    scale = 1; // Tablet
  } else {
    scale = 2; // Desktop
  }
  updateLimitLeft();
  updateZoom();
});
