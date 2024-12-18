let draggedBidang;
let currentLevel = 0;
let correctOrder = [
  "bidang1", //soal 1
  "bidang2", //soal 1
  "bidang3", //soal 1
  "bidang4", //soal 2
  "bidang5", //soal 2
  "bidang6", //soal 2
  "bidang7", //soal 3
  "bidang8", //soal 3
  "bidang9", //soal 3
  "bidang10", //soal 4
  "bidang11", //soal 4
  "bidang12", //soal 4
  "bidang13", //soal 5
  "bidang14", //soal 5
  "bidang15", //soal 5
  "bidang17", //soal 6
  "bidang18", //soal 6
  "bidang19", //soal 6
  "bidang20", //soal 7
  "bidang21", //soal 7
  "bidang22", //soal 7 kembar dengan bidang28
  "bidang28", //soal 7  kembar dengan bidang22
  "bidang23", //soal 8
  "bidang24", //soal 8
  "bidang25", //soal 8
  "bidang26", //soal 9
  "bidang27", //soal 9
  "bidang28", //soal 9 kembar dengan bidang22
  "bidang22", //soal 9 kembar dengan bidang28
  "bidang29", //soal 10
  "bidang18", //soal 10
  "bidang30", //soal 10
];

let questionRanges = [
  [0, 3], // Soal 1: Elemen 0, 1, 2
  [3, 6], // Soal 2: Elemen 3, 4, 5
  [6, 9], // Soal 3: Elemen 6, 7, 8
  [9, 12], // Soal 4: Elemen 9, 10, 11
  [12, 15], // Soal 5: Elemen 12, 13, 14
  [15, 18], // Soal 6: Elemen 15, 16, 17
  [18, 22], // Soal 7: Elemen 18, 19, 20, 21
  [22, 25], // Soal 8: Elemen 22, 23, 24
  [25, 29], // Soal 9: Elemen 25, 26, 27, 28
  [29, 32], // Soal 10: Elemen 29, 30,
];

let dropboxIds = [];

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  soundClick();
  draggedBidang = event.target;
}

function drop(event) {
  event.preventDefault();
  soundDropItems(); // Memainkan suara saat elemen di-drop
  // Cari elemen dropbox terdekat jika target bukan dropbox langsung
  let dropbox = event.target;
  while (dropbox && !dropbox.classList.contains("dropbox")) {
    dropbox = dropbox.parentElement;
  }

  // Jika tidak ditemukan dropbox, keluar dari fungsi
  if (!dropbox) return;

  // Hapus elemen pertama dalam dropbox jika sudah ada
  if (dropbox.firstChild) {
    dropbox.removeChild(dropbox.firstChild);
  }

  // Clone elemen yang di-drag
  const clonedBidang = draggedBidang.cloneNode(true);

  // Atur posisi elemen baru di tengah dropbox
  clonedBidang.style.position = "absolute";
  clonedBidang.style.top = "50%";
  clonedBidang.style.left = "50%";
  clonedBidang.style.transform = "translate(-50%, -50%)";
  clonedBidang.style.width = "100%";
  clonedBidang.style.height = "100%";

  // Tambahkan elemen ke dalam dropbox
  dropbox.appendChild(clonedBidang);
  clonedBidang.setAttribute("draggable", "true");

  // Periksa apakah semua dropbox sudah terisi
  const allDropboxes = document.querySelectorAll(".dropbox");
  if (allDropboxesFilled(allDropboxes)) {
    checkOrder(allDropboxes); // Periksa urutan jika semua dropbox terisi
  }
}

function allDropboxesFilled(dropboxes) {
  // Cek setiap dropbox, pastikan ada child element (bidang) di dalamnya
  return Array.from(dropboxes).every((zone) => zone.hasChildNodes());
}

document.querySelectorAll(".bidang").forEach((bidang) => {
  // Touch event handlers for mobile
  bidang.addEventListener(
    "touchstart",
    function (event) {
      soundClick();
      event.preventDefault();
      draggedBidang = event.target;

      let touch = event.touches[0];
      draggedBidang.style.position = "absolute";
      draggedBidang.style.left =
        touch.pageX - draggedBidang.offsetWidth / 2 + "px";
      draggedBidang.style.top =
        touch.pageY - draggedBidang.offsetHeight / 2 + "px";
      draggedBidang.style.zIndex = 1000;
      document.body.appendChild(draggedBidang);
    },
    false
  );

  bidang.addEventListener("touchmove", function (event) {
    event.preventDefault();
    let touch = event.touches[0];
    draggedBidang.style.left =
      touch.pageX - draggedBidang.offsetWidth / 2 + "px";
    draggedBidang.style.top =
      touch.pageY - draggedBidang.offsetHeight / 2 + "px";
  });
  bidang.addEventListener("touchend", function (event) {
    let dropboxes = document.querySelectorAll(".dropbox");

    dropboxes.forEach((zone) => {
      let rect = zone.getBoundingClientRect();
      let bidangRect = draggedBidang.getBoundingClientRect();
      // Calculate the center points
      const zoneCenterX = rect.left + rect.width / 2;
      const zoneCenterY = rect.top + rect.height / 2;
      const bidangCenterX = bidangRect.left + bidangRect.width / 2;
      const bidangCenterY = bidangRect.top + bidangRect.height / 2;

      // Calculate the distance between the bidang and the dropzone center
      const distance = Math.hypot(
        bidangCenterX - zoneCenterX,
        bidangCenterY - zoneCenterY
      );

      // Define a threshold distance for a successful drop
      const threshold = rect.width / 2; // Adjust this threshold as needed

      if (distance < threshold) {
        soundDropItems();
        let dropbox = zone;

        // Check if the dropbox is valid by finding the closest parent with the class "dropbox"
        while (dropbox && !dropbox.classList.contains("dropbox")) {
          dropbox = dropbox.parentElement;
        }

        // If no valid dropbox is found, exit the function
        if (!dropbox) return;

        // Remove the first child of the dropbox (if any)
        if (dropbox.firstChild) {
          dropbox.removeChild(dropbox.firstChild);
        }
        let frame = document.querySelector(".frame-right");
        let clonedBidang = draggedBidang.cloneNode(true);
        clonedBidang.style.position = "static";
        clonedBidang.style.left = "0";
        clonedBidang.style.top = "0";
        clonedBidang.setAttribute("draggable", "true");

        frame.appendChild(clonedBidang);
        draggedBidang.style.position = "static";
        draggedBidang.style.left = "0";
        draggedBidang.style.top = "0";
        draggedBidang.style.width = "100%";
        draggedBidang.style.height = "100%";
        zone.appendChild(draggedBidang);
        draggedBidang.setAttribute("draggable", "true");
        isDropped = true;

        if (allDropboxesFilled(dropboxes)) {
          checkOrder(dropboxes); // Panggil checkOrder setelah semua dropbox terisi
        }
      }
    });
  });
});

function checkOrder(dropzone) {
  dropboxIds = [];
  // Ambil semua dropbox
  let dropboxes = document.querySelectorAll(".dropbox");
  dropboxes.forEach((zone) => {
    let child = zone.firstChild;
    if (child) {
      dropboxIds.push(child.id); // Mengambil ID bidang yang ada dalam dropbox
    } else {
      dropboxIds.push(null); // Jika dropbox kosong
    }
  });

  // Memeriksa apakah urutannya sesuai
  let [levelStart, levelEnd] = questionRanges[currentLevel];
  let currentLevelOrder = correctOrder.slice(levelStart, levelEnd);
  let userAnswers = dropboxIds.slice(0, levelEnd - levelStart);

  if (currentLevel === 6) {
    currentLevelOrder = ["bidang20", "bidang21", ["bidang22", "bidang28"]];
  } else if (currentLevel === 8) {
    currentLevelOrder = ["bidang26", "bidang27", ["bidang22", "bidang28"]];
  }
  // Memeriksa apakah urutan bidang sesuai dengan urutan yang benar untuk level saat ini
  let correct = arraysEqualWithOR(currentLevelOrder, userAnswers);

  if (correct) {
    setTimeout(() => {
      soundCorrect();
      openModal("assets/jawaban-benar.png");

      reshuffleBidangs();
      reset();
      const bidangElements = document.querySelectorAll(".bidang");
      if (currentLevel === 4) {
        setTimeout(() => {
          setTimeout(() => {
            bidangElements.forEach((element, index) => {
              const newId = `bidang${index + 17}`;
              element.id = newId;
            });
            reshuffleBidangs();
            reset();
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
            reshuffleBidangs();
            reset();
          }, 1500);
          showScene8();
        }, 1500);
      }
      currentLevel++; // Naikkan level jika benar
      checkLevel(currentLevel);
    }, 1000);
  } else {
    setTimeout(() => {
      soundFail();
      openModal("assets/jawaban-salah.png");
      reshuffleBidangs();
      reset();
    }, 1000);
  }
}

function arraysEqualWithOR(correctArray, userArray) {
  if (correctArray.length !== userArray.length) return false;

  for (let i = 0; i < correctArray.length; i++) {
    if (Array.isArray(correctArray[i])) {
      // Cek apakah elemen pengguna cocok dengan salah satu elemen alternatif
      if (!correctArray[i].includes(userArray[i])) {
        return false;
      }
    } else {
      if (correctArray[i] !== userArray[i]) {
        return false;
      }
    }
  }
  return true;
}

function reset() {
  const dropboxes = document.querySelectorAll(".dropbox");
  dropboxes.forEach((zone) => {
    const child = zone.firstChild;
    if (child) {
      child.remove();
    }
  });
  dropboxIds = [];
}

function shuffleArray(array, iterations = 5) {
  for (let k = 0; k < iterations; k++) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

function reshuffleBidangs() {
  const frameRight = document.querySelector(".frame-right");
  const bidangElements = Array.from(frameRight.querySelectorAll(".bidang"));

  // Ambil elemen yang ada dan urutkan ulang secara acak
  shuffleArray(bidangElements);

  // Kosongkan kontainer terlebih dahulu
  frameRight.innerHTML = "";

  // Masukkan elemen yang telah di-reshuffle kembali ke dalam kontainer
  bidangElements.forEach((bidang) => {
    frameRight.appendChild(bidang);
  });
}
reshuffleBidangs();

function checkLevel(level = 0) {
  const img = document.getElementById("soalImage");
  switch (level) {
    case 0:
      img.src = "assets/1.png";
      break;
    case 1:
      img.src = "assets/2.png";
      break;
    case 2:
      img.src = "assets/3.png";
      break;
    case 3:
      img.src = "assets/4.png";
      break;
    case 4:
      img.src = "assets/5.png";
      break;
    case 5:
      img.src = "assets/level2/11.png";
      break;
    case 6:
      img.src = "assets/level2/12.png";
      break;
    case 7:
      img.src = "assets/level2/13.png";
      break;
    case 8:
      img.src = "assets/level2/14.png";
      break;
    case 9:
      img.src = "assets/level2/15.png";
      break;
    default:
      currentLevel = 0;
      img.src = "assets/1.png";
      break;
  }
}

const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const openModal = (src) => {
  modalImage.src = src; // Setel gambar modal
  modal.style.display = "flex"; // Tampilkan modal
};

const closeModal = () => {
  soundClick();
  modalImage.src = ""; // Hapus gambar agar tidak ada flash
  modal.style.display = "none";
};

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.getElementById("modalButton").addEventListener("click", closeModal);
