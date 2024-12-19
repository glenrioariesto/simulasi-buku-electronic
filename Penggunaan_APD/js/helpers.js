const info = document.getElementById("information");
const instruction = document.querySelector(".instruction-1");
const checkInstruction = document.getElementById("instruction-1");

const checkButton = document.getElementById("check-button");
const nextButton = document.getElementById("next-button");
const modal = document.getElementById("myModal");
const modalContent = document.getElementById("modal-content");

const overlay = document.querySelector(".overlay-danger");

//sound
const clickSound = document.getElementById("clickOptionSound");
const backgroundSound = document.getElementById("playSoundGame");
const backgroundSimlation = document.getElementById("playSoundInSimulation");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const dropSound = document.getElementById("dropSound");

dropSound.currentTime = 0;

const level = 1;
let delay = 3500;
let correctLevel = 0;
let isPlaying = true;

const soundImage = document.getElementById("sound-image");
const soundImage2 = document.getElementById("sound-image2");
function backgroundSoundGame() {
  soundClick();
  if (!isPlaying) {
    isPlaying = true;
    backgroundSound.pause();
    soundImage.src = "assets/unmute.png";
    soundImage2.src = "assets/unmute.png";
  } else {
    backgroundSound.currentTime = 10;
    backgroundSound.volume = 0.2;
    backgroundSound.play();
    soundImage.src = "assets/mute.png";
    soundImage2.src = "assets/mute.png";
    isPlaying = false;
  }
}
function soundDrop() {
  dropSound.currentTime = 0;
  dropSound.play();
}
function soundClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function soundWin() {
  correctSound.currentTime = 0;
  correctSound.play();
}

function soundLose() {
  wrongSound.currentTime = 0;
  wrongSound.play();
}
function showScene2() {
  document.getElementById("scene1").style.display = "none";
  document.getElementById("scene2").style.display = "flex";
}

function showMenuScene3() {
  soundClick();
  document.getElementById("scene1").style.display = "none";
  document.getElementById("scene3").style.display = "flex";
}
function showScene4() {
  soundClick();
  // Menyembunyikan scene 3 dan menampilkan scene 4
  document.getElementById("scene3").style.display = "none";
  document.getElementById("scene4").style.display = "flex";

  // Menampilkan alat (misalnya helms)
  shuffleHelms();

  // Menambahkan kelas 'show' untuk menampilkan informasi dengan animasi
  info.classList.add("show");

  // Menambahkan kelas untuk animasi untuk instruksi
  instruction.style.animation = "slideIn 2s forwards"; // Memulai animasi slide-in untuk instruksi

  setTimeout(() => {
    // Menghapus kelas 'show' setelah animasi selesai
    info.classList.remove("show");
  }, 10000);
}

document.addEventListener("click", (event) => {
  if (event.target === instruction || event.target === checkInstruction) {
    info.classList.remove("show");
    soundClick();
  }
});

function showScene5() {
  soundClick();
  resetRuangGambar();
  document.getElementById("scene3").style.display = "none";
  document.getElementById("scene5").style.display = "flex";
  document.querySelectorAll("#scene5 .tools .tool").forEach((tool) => {
    addDragListeners(tool);
  });
}

function showScene6() {
  soundClick();
  resetRuangBubut();
  document.getElementById("scene3").style.display = "none";
  document.getElementById("scene6").style.display = "flex";
  document.querySelectorAll("#scene6 .tools .tool").forEach((tool) => {
    addDragListeners(tool);
  });
}

function showScene7() {
  soundClick();
  resetRuangPengecoranLogam();
  document.getElementById("scene3").style.display = "none";
  document.getElementById("scene7").style.display = "flex";
  document.querySelectorAll("#scene7 .tools .tool").forEach((tool) => {
    addDragListeners(tool);
  });
}

function showScene8() {
  soundClick();
  resetRuangKonstruksi();
  document.getElementById("scene3").style.display = "none";
  document.getElementById("scene8").style.display = "flex";
  document.querySelectorAll("#scene8 .tools .tool").forEach((tool) => {
    addDragListeners(tool);
  });
}

function backScene4() {
  soundClick();

  document.getElementById("scene4").style.display = "none";
  document.getElementById("scene3").style.display = "flex";

  info.classList.remove("show");
}

function backScene5() {
  soundClick();

  document.getElementById("scene5").style.display = "none";
  document.getElementById("scene3").style.display = "flex";
}

function backScene6() {
  soundClick();

  document.getElementById("scene6").style.display = "none";
  document.getElementById("scene3").style.display = "flex";
}

function backScene7() {
  soundClick();

  document.getElementById("scene7").style.display = "none";
  document.getElementById("scene3").style.display = "flex";
}

function backScene8() {
  soundClick();

  document.getElementById("scene8").style.display = "none";
  document.getElementById("scene3").style.display = "flex";
}

function openModal(correct, level) {
  modal.style.display = "flex";
  level = level;
  if (correct) {
    soundWin();
    handleCorrect(level);
  } else {
    soundLose();
    handleIncorrect(level);
  }
}

function closeModal() {
  soundClick();
  modal.style.display = "none";
  switch (correctLevel) {
    case 1:
      backScene4();
      correctLevel = 0;
      break;
    case 2:
      backScene5();
      correctLevel = 0;
      break;
    case 3:
      backScene6();
      correctLevel = 0;
      break;
    case 4:
      correctLevel = 0;
      backScene7();
      break;
    case 5:
      backScene8();
      correctLevel = 0;

      break;
    default:
      correctLevel = 0;

      break;
  }
}

function handleCorrect(level) {
  updateModalClass("correct");

  switch (level) {
    case 1:
      resetHelm();
      correctLevel = 1;
      break;
    case 2:
      correctLevel = 2;
      resetRuangGambar();
      break;
    case 3:
      correctLevel = 3;
      resetRuangBubut();
      break;
    case 4:
      correctLevel = 4;
      resetRuangPengecoranLogam();
      break;
    case 5:
      correctLevel = 5;
      resetRuangKonstruksi();
      break;
    default:
      console.warn("Level tidak dikenal untuk jawaban benar!");
      break;
  }
}

function handleIncorrect(level) {
  updateModalClass("wrong");

  switch (level) {
    case 1:
      resetHelm();
      break;
    case 2:
      resetRuangGambar();
      break;
    case 3:
      resetRuangBubut();
      break;
    case 4:
      resetRuangPengecoranLogam();
      break;
    case 5:
      resetRuangKonstruksi();
      break;
    default:
      console.warn("Level tidak dikenal untuk jawaban salah!");
      break;
  }
}

function updateModalClass(type) {
  modalContent.className = `modal-content ${type}`;
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function shuffleHelms() {
  const helmsContainer = document.querySelector(".helms"); // Container helm
  const helms = Array.from(helmsContainer.children); // Ambil semua elemen helm sebagai array

  const shuffledHelms = shuffleArray(helms); // Acak array
  shuffledHelms.forEach((helm) => helmsContainer.appendChild(helm)); // Tambahkan elemen yang diacak kembali ke container
}

function checkHelms() {
  soundClick();
  // Data tool yang benar
  let isCorrect = true;
  const correctOrder = [
    "helm-red",
    "helm-white",
    "helm-green",
    "helm-blue",
    "helm-orange",
    "helm-yellow",
  ];

  // Ambil semua dropzone
  const dropzones = document.querySelectorAll(".dropzone-scene4");

  dropzones.forEach((dropzone, index) => {
    const toolName = dropzone.firstElementChild.getAttribute("data-tool"); // Nama tool dari atribut data
    if (toolName !== correctOrder[index]) {
      isCorrect = false;
    }
  });

  if (isCorrect) {
    openModal(true, 1);
  } else {
    openModal(false, 1);
  }

  return isCorrect;
}
function resetHelm() {
  // Hapus semua helm yang ada
  const helms = document.querySelectorAll(".helm");
  helms.forEach((helm) => {
    // Pastikan helm bisa di-drag lagi
    helm.setAttribute("draggable", "true");

    // Hapus helm dari dropzone jika ada
    const parentDropzone = helm.closest(".dropzone-scene4");
    if (parentDropzone) {
      parentDropzone.removeChild(helm);
    }
  });

  // Kosongkan array droppedTools
  droppedTools = [];

  // Buat helm baru (Contoh helm yang baru akan dibuat dengan ID yang sudah ditentukan)
  const helmData = [
    { id: "helm-green", class: "helm", dataTool: "helm-green" },
    { id: "helm-white", class: "helm", dataTool: "helm-white" },
    { id: "helm-blue", class: "helm", dataTool: "helm-blue" },
    { id: "helm-orange", class: "helm", dataTool: "helm-orange" },
    { id: "helm-yellow", class: "helm", dataTool: "helm-yellow" },
    { id: "helm-red", class: "helm", dataTool: "helm-red" },
  ];

  const helmsContainer = document.querySelector(".helms");

  // Membuat helm baru sesuai data
  helmData.forEach((helm) => {
    const newHelm = document.createElement("div");
    newHelm.id = helm.id;
    newHelm.className = helm.class;
    newHelm.setAttribute("draggable", "true");
    newHelm.setAttribute("data-tool", helm.dataTool);

    // Menambahkan event listener untuk drag
    newHelm.addEventListener("dragstart", drag);

    // Tambahkan helm baru ke kontainer helm
    addDragListeners(newHelm);
    helmsContainer.appendChild(newHelm);
  });

  // Panggil fungsi untuk mengacak urutan helm
  shuffleHelms();
}
function checkRuangGambar() {
  soundClick();
  // Data tool yang benar
  let isCorrect = true;
  const correctTools = ["boots"];

  // Ambil semua dropzone
  const dropzones = document.querySelectorAll(".dropzone.scene-5");

  dropzones.forEach((dropzone) => {
    const children = Array.from(dropzone.children);

    // Jika dropzone kosong, langsung salah
    if (children.length === 0) {
      isCorrect = false;
      return;
    }

    // Cek dan hapus duplikat jika ada
    const toolNames = children.map((child) => child.getAttribute("data-tool"));
    const uniqueToolNames = [...new Set(toolNames)];

    // Jika ada duplikat, hapus yang extra
    if (toolNames.length !== uniqueToolNames.length) {
      console.log("Terdapat tool yang kembar di dropzone!");

      // Hapus elemen duplikat
      toolNames.forEach((toolName, index) => {
        if (toolNames.indexOf(toolName) !== index) {
          dropzone.removeChild(children[index]);
        }
      });
    }

    // Validasi apakah setiap tool termasuk dalam daftar correctTools
    toolNames.forEach((toolName) => {
      if (!correctTools.includes(toolName)) {
        isCorrect = false;
      }
    });
  });

  if (isCorrect) {
    openModal(true, 2);
  } else {
    openModal(false, 2);
  }
}

function resetRuangGambar() {
  // Hapus semua helm yang ada
  const toolsContainer = document.getElementById("tools-ruang-gambar");
  const tools = toolsContainer.querySelectorAll(".tool");

  tools.forEach((tool) => {
    const parentDropzone = tool.closest(".dropzone.scene-5");
    if (parentDropzone) {
      parentDropzone.removeChild(tool); // Hapus dari dropzone
    }
    toolsContainer.appendChild(tool); // Kembalikan ke container tools
    tool.setAttribute("draggable", "true"); // Pastikan draggable diaktifkan
  });

  // Kosongkan array droppedTools
  const dropzones = document.querySelectorAll(".dropzone.scene-5");
  dropzones.forEach((dropzone) => {
    dropzone.innerHTML = ""; // Kosongkan dropzone
  });

  // Buat helm baru (Contoh helm yang baru akan dibuat dengan ID yang sudah ditentukan)
  toolsContainer.innerHTML = "";
  const toolsApdData = [
    { id: "helm", class: "tool helm", dataTool: "helm" },
    { id: "mask", class: "tool mask", dataTool: "mask" },
    { id: "gloves", class: "tool gloves", dataTool: "gloves" },
    { id: "spectacles", class: "tool spectacles", dataTool: "spectacles" },
    { id: "earplug", class: "tool earplug", dataTool: "earplug" },
    { id: "boots", class: "tool boots", dataTool: "boots" },
  ];

  toolsApdData.forEach((toolData) => {
    const toolElement = document.createElement("div");
    toolElement.id = toolData.id;
    toolElement.className = toolData.class;
    toolElement.setAttribute("draggable", "true");
    toolElement.setAttribute("data-tool", toolData.dataTool);

    // Tambahkan event listener untuk drag
    toolElement.addEventListener("dragstart", drag);
    addDragListeners(toolElement);

    toolsContainer.appendChild(toolElement);
  });
}

function checkRuangBubut() {
  soundClick();
  // Data tool yang benar
  let isCorrect = true;
  const correctTools = ["spectacles", "earplug", "boots"];

  // Ambil semua dropzone
  const dropzones = document.querySelectorAll(".dropzone.scene-6");

  dropzones.forEach((dropzone) => {
    const children = Array.from(dropzone.children);

    // Jika dropzone kosong, langsung salah
    if (children.length === 0) {
      isCorrect = false;
      return;
    }

    // Cek dan hapus duplikat jika ada
    const toolNames = children.map((child) => child.getAttribute("data-tool"));
    const uniqueToolNames = [...new Set(toolNames)];

    // Jika ada duplikat, hapus yang extra
    if (toolNames.length !== uniqueToolNames.length) {
      console.log("Terdapat tool yang kembar di dropzone!");

      // Hapus elemen duplikat
      toolNames.forEach((toolName, index) => {
        if (toolNames.indexOf(toolName) !== index) {
          dropzone.removeChild(children[index]);
        }
      });
    }

    // Cek apakah jumlah alat sesuai dengan jumlah correctTools
    if (uniqueToolNames.length !== correctTools.length) {
      console.log("Jumlah alat tidak sesuai!");
      isCorrect = false;
      return;
    }

    // Validasi apakah setiap tool termasuk dalam daftar correctTools
    uniqueToolNames.forEach((toolName) => {
      if (!correctTools.includes(toolName)) {
        isCorrect = false;
      }
    });
  });

  if (isCorrect) {
    openModal(true, 3);
  } else {
    openModal(false, 3);
  }
}

function resetRuangBubut() {
  // Hapus semua helm yang ada
  const toolsContainer = document.getElementById("tools-ruang-bubut");
  const tools = toolsContainer.querySelectorAll(".tool");

  tools.forEach((tool) => {
    const parentDropzone = tool.closest(".dropzone.scene-6");
    if (parentDropzone) {
      parentDropzone.removeChild(tool); // Hapus dari dropzone
    }
    toolsContainer.appendChild(tool); // Kembalikan ke container tools
    tool.setAttribute("draggable", "true"); // Pastikan draggable diaktifkan
  });

  // Kosongkan array droppedTools
  const dropzones = document.querySelectorAll(".dropzone.scene-6");
  dropzones.forEach((dropzone) => {
    dropzone.innerHTML = ""; // Kosongkan dropzone
  });

  // Buat helm baru (Contoh helm yang baru akan dibuat dengan ID yang sudah ditentukan)
  toolsContainer.innerHTML = "";
  const toolsApdData = [
    { id: "helm", class: "tool helm", dataTool: "helm" },
    { id: "mask", class: "tool mask", dataTool: "mask" },
    { id: "gloves", class: "tool gloves", dataTool: "gloves" },
    { id: "spectacles", class: "tool spectacles", dataTool: "spectacles" },
    { id: "earplug", class: "tool earplug", dataTool: "earplug" },
    { id: "boots", class: "tool boots", dataTool: "boots" },
  ];

  toolsApdData.forEach((toolData) => {
    const toolElement = document.createElement("div");
    toolElement.id = toolData.id;
    toolElement.className = toolData.class;
    toolElement.setAttribute("draggable", "true");
    toolElement.setAttribute("data-tool", toolData.dataTool);

    // Tambahkan event listener untuk drag
    toolElement.addEventListener("dragstart", drag);
    addDragListeners(toolElement);
    toolsContainer.appendChild(toolElement);
  });
}

function checkRuangPengecoranLogam() {
  soundClick();

  // Data tool yang benar
  let isCorrect = true;
  const correctTools = ["gloves", "spectacles", "mask", "boots"];

  // Ambil semua dropzone
  const dropzones = document.querySelectorAll(".dropzone.scene-7");

  dropzones.forEach((dropzone) => {
    const children = Array.from(dropzone.children);

    // Jika dropzone kosong, langsung salah
    if (children.length === 0) {
      isCorrect = false;
      return;
    }

    // Cek dan hapus duplikat jika ada
    const toolNames = children.map((child) => child.getAttribute("data-tool"));
    const uniqueToolNames = [...new Set(toolNames)];

    // Jika ada duplikat, hapus yang extra
    if (toolNames.length !== uniqueToolNames.length) {
      console.log("Terdapat tool yang kembar di dropzone!");

      // Hapus elemen duplikat
      toolNames.forEach((toolName, index) => {
        if (toolNames.indexOf(toolName) !== index) {
          dropzone.removeChild(children[index]);
        }
      });
    }

    // Cek apakah jumlah alat sesuai dengan jumlah correctTools
    if (uniqueToolNames.length !== correctTools.length) {
      console.log("Jumlah alat tidak sesuai!");
      isCorrect = false;
      return;
    }

    // Validasi apakah setiap tool termasuk dalam daftar correctTools
    uniqueToolNames.forEach((toolName) => {
      if (!correctTools.includes(toolName)) {
        isCorrect = false;
      }
    });
  });

  if (isCorrect) {
    openModal(true, 4);
  } else {
    openModal(false, 4);
  }
}

function resetRuangPengecoranLogam() {
  // Hapus semua helm yang ada
  const toolsContainer = document.getElementById(
    "tools-ruang-pengecoran-logam"
  );
  const tools = toolsContainer.querySelectorAll(".tool");

  tools.forEach((tool) => {
    const parentDropzone = tool.closest(".dropzone.scene-7");
    if (parentDropzone) {
      parentDropzone.removeChild(tool); // Hapus dari dropzone
    }
    toolsContainer.appendChild(tool); // Kembalikan ke container tools
    tool.setAttribute("draggable", "true"); // Pastikan draggable diaktifkan
  });

  // Kosongkan array droppedTools
  const dropzones = document.querySelectorAll(".dropzone.scene-7");
  dropzones.forEach((dropzone) => {
    dropzone.innerHTML = ""; // Kosongkan dropzone
  });

  // Buat helm baru (Contoh helm yang baru akan dibuat dengan ID yang sudah ditentukan)
  toolsContainer.innerHTML = "";
  const toolsApdData = [
    { id: "helm", class: "tool helm", dataTool: "helm" },
    { id: "mask", class: "tool mask", dataTool: "mask" },
    { id: "gloves", class: "tool gloves", dataTool: "gloves" },
    { id: "spectacles", class: "tool spectacles", dataTool: "spectacles" },
    { id: "earplug", class: "tool earplug", dataTool: "earplug" },
    { id: "boots", class: "tool boots", dataTool: "boots" },
  ];

  toolsApdData.forEach((toolData) => {
    const toolElement = document.createElement("div");
    toolElement.id = toolData.id;
    toolElement.className = toolData.class;
    toolElement.setAttribute("draggable", "true");
    toolElement.setAttribute("data-tool", toolData.dataTool);

    // Tambahkan event listener untuk drag
    toolElement.addEventListener("dragstart", drag);
    addDragListeners(toolElement);
    toolsContainer.appendChild(toolElement);
  });
}

function checkRuangKonstruksi() {
  soundClick();
  // Data tool yang benar
  let isCorrect = true;
  const correctTools = ["gloves", "spectacles", "earplug", "boots"];

  // Ambil semua dropzone
  const dropzones = document.querySelectorAll(".dropzone.scene-8");

  dropzones.forEach((dropzone) => {
    const children = Array.from(dropzone.children);

    // Jika dropzone kosong, langsung salah
    if (children.length === 0) {
      isCorrect = false;
      return;
    }

    // Cek dan hapus duplikat jika ada
    const toolNames = children.map((child) => child.getAttribute("data-tool"));
    const uniqueToolNames = [...new Set(toolNames)];

    // Jika ada duplikat, hapus yang extra
    if (toolNames.length !== uniqueToolNames.length) {
      console.log("Terdapat tool yang kembar di dropzone!");

      // Hapus elemen duplikat
      toolNames.forEach((toolName, index) => {
        if (toolNames.indexOf(toolName) !== index) {
          dropzone.removeChild(children[index]);
        }
      });
    }

    // Cek apakah jumlah alat sesuai dengan jumlah correctTools
    if (uniqueToolNames.length !== correctTools.length) {
      console.log("Jumlah alat tidak sesuai!");
      isCorrect = false;
      return;
    }

    // Validasi apakah setiap tool termasuk dalam daftar correctTools
    uniqueToolNames.forEach((toolName) => {
      if (!correctTools.includes(toolName)) {
        isCorrect = false;
      }
    });
  });

  if (isCorrect) {
    openModal(true, 5);
  } else {
    openModal(false, 5);
  }
}

function resetRuangKonstruksi() {
  // Hapus semua helm yang ada
  const toolsContainer = document.getElementById("tools-ruang-konstruksi");
  const tools = toolsContainer.querySelectorAll(".tool");

  tools.forEach((tool) => {
    const parentDropzone = tool.closest(".dropzone.scene-8");
    if (parentDropzone) {
      parentDropzone.removeChild(tool); // Hapus dari dropzone
    }
    toolsContainer.appendChild(tool); // Kembalikan ke container tools
    tool.setAttribute("draggable", "true"); // Pastikan draggable diaktifkan
  });

  // Kosongkan array droppedTools
  const dropzones = document.querySelectorAll(".dropzone.scene-8");
  dropzones.forEach((dropzone) => {
    dropzone.innerHTML = ""; // Kosongkan dropzone
  });

  // Buat helm baru (Contoh helm yang baru akan dibuat dengan ID yang sudah ditentukan)
  toolsContainer.innerHTML = "";
  const toolsApdData = [
    { id: "helm", class: "tool helm", dataTool: "helm" },
    { id: "mask", class: "tool mask", dataTool: "mask" },
    { id: "gloves", class: "tool gloves", dataTool: "gloves" },
    { id: "spectacles", class: "tool spectacles", dataTool: "spectacles" },
    { id: "earplug", class: "tool earplug", dataTool: "earplug" },
    { id: "boots", class: "tool boots", dataTool: "boots" },
  ];

  toolsApdData.forEach((toolData) => {
    const toolElement = document.createElement("div");
    toolElement.id = toolData.id;
    toolElement.className = toolData.class;
    toolElement.setAttribute("draggable", "true");
    toolElement.setAttribute("data-tool", toolData.dataTool);

    // Tambahkan event listener untuk drag
    toolElement.addEventListener("dragstart", drag);
    addDragListeners(toolElement);
    toolsContainer.appendChild(toolElement);
  });
}

document.addEventListener("DOMContentLoaded", shuffleHelms);

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
