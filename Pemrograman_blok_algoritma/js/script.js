// Posisi mobil dan rotasi
let mapSize = {
  x: window.innerWidth <= 1240 ? 490 : 1120, // Width
  y: window.innerWidth <= 1240 ? 350 : 800, // Height
};
let moveSpeed = mapSize.x / 7;
let carSize = moveSpeed;
let carPosition = { x: moveSpeed, y: moveSpeed * 3 };
let carRotation = 0; // rotasi mobil (dalam derajat)
let level = 1;
let finishPosition = {
  x: moveSpeed * 5,
  y: moveSpeed * 2,
};
let isCrashed = false;
let isDragging = false;

const instructionArea = document.getElementById("instructionArea");
const carSound = document.getElementById("carPlaySound");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

function playCarSound() {
  carSound.currentTime = 0;
  carSound.play().catch((error) => {
    carSound.play().catch((error) => {
      carSound.play().catch((error) => {
        console.error("Audio playback error:", error);
      })
    })
  });
}

function stopCarSound() {
  carSound.pause();
  carSound.currentTime = 0;
}

// Elemen mobil
const car = document.getElementById("car");

// Fungsi untuk memperbarui posisi mobil
function updateCarPosition() {
  car.style.left = carPosition.x + "px";
  car.style.top = carPosition.y + "px";
  car.style.transform = `rotate(${carRotation}deg)`; // rotasi mobil
}

// Fungsi untuk menjalankan instruksi// Fungsi untuk menjalankan instruksi
let combinedInstructions = [];
let isExecuting = false; // Flag untuk melacak status eksekusi
let timeoutIds = [];

function executeInstructions() {
  if (isExecuting) return; // Cegah eksekusi ganda
  isExecuting = true; // Tandai bahwa instruksi sedang berjalan
  updateHoverBlocks(true);

  const car = document.getElementById("car");
  car.style.transition = "top 3s ease, left 3s ease, transform 3s ease";
  const instructions = Array.from(instructionArea.querySelectorAll("div"));

  // Gabungkan instruksi forwardBtn yang berurutan
  combinedInstructions = [];
  let i = 0;
  while (i < instructions.length) {
    if (instructions[i].id === "forwardBtn") {
      let count = 1;
      while (
        i + count < instructions.length &&
        instructions[i + count].id === "forwardBtn"
      ) {
        count++;
      }
      combinedInstructions.push({ id: "forwardBtn", speed: count * moveSpeed });
      i += count;
    } else {
      combinedInstructions.push({ id: instructions[i].id });
      i++;
    }
  }

  timeoutIds = []; // Simpan ID timeout untuk pembatalan

  combinedInstructions.forEach((instruction, index) => {
    const delay = index * 1500;

    timeoutIds.push(
      setTimeout(() => {
        if (!isExecuting || isCrashed) {
          console.log("Eksekusi berhenti karena tabrakan atau pembatalan.");
          stopAllTimeouts(timeoutIds); // Hentikan semua timeout
          isExecuting = false; // Reset flag
          combinedInstructions = []; // Hapus instruksi
          return;
        }
        if (instruction.id === "leftBtn") {
          stopCarSound();
          turnLeft();
        } else if (instruction.id === "rightBtn") {
          stopCarSound();
          turnRight();
        } else if (instruction.id === "forwardBtn") {
          // Mainkan suara hanya saat forward
          playCarSound();
          moveForward(instruction.speed);

          // Jadwalkan penghentian suara setelah forward selesai
          timeoutIds.push(
            setTimeout(() => {
              stopCarSound();
            }, (instruction.speed / moveSpeed) * 1000)
          );
        }
      }, delay)
    );
  });

  // Fungsi untuk menghentikan semua timeout
  function stopAllTimeouts(timeoutIds) {
    timeoutIds.forEach((id) => clearTimeout(id));
  }

  // Reset setelah semua instruksi selesai
  timeoutIds.push(
    setTimeout(() => {
      isExecuting = false; // Reset flag
      combinedInstructions = []; // Hapus instruksi

      // Aktifkan kembali tombol setelah eksekusi selesai
      const resetBtn = document.getElementById("resetBtn");
      const startBtn = document.getElementById("startBtn");
      resetBtn.removeAttribute("disabled");
      resetBtn.style.opacity = 1;
      resetBtn.style.pointerEvents = "auto";
      startBtn.removeAttribute("disabled");
      startBtn.style.opacity = 1;
      startBtn.style.pointerEvents = "auto";
     

      // Pastikan suara berhenti jika belum dihentikan
    }, combinedInstructions.length * 1500)
  );
}

// Gerakkan mobil ke kiri (rotasi)
function turnLeft() {
  carRotation -= 90;
  updateCarPosition();
}

// Gerakkan mobil ke kanan (rotasi)
function turnRight() {
  carRotation += 90;
  updateCarPosition();
}

let restrictedRoutes = [];
function updateRestrictedRoutes() {
  switch (level) {
    case 1:
      restrictedRoutes = [
        // Rute yang terbatas 1
        { x: 0, y: moveSpeed },
        { x: moveSpeed, y: moveSpeed },
        { x: moveSpeed * 2, y: moveSpeed },
        { x: moveSpeed * 3, y: moveSpeed },
        { x: moveSpeed * 4, y: moveSpeed },
        { x: moveSpeed * 5, y: moveSpeed },
        { x: moveSpeed * 6, y: moveSpeed },
        //Rute yang terbatas 2
        { x: 0, y: moveSpeed * 2 },
        //Rute yang terbatas 3
        { x: 0, y: moveSpeed * 3 },
        { x: moveSpeed, y: moveSpeed * 3 },
        { x: moveSpeed * 2, y: moveSpeed * 3 },
        { x: moveSpeed * 3, y: moveSpeed * 3 },
        { x: moveSpeed * 4, y: moveSpeed * 3 },
        { x: moveSpeed * 5, y: moveSpeed * 3 },
        { x: moveSpeed * 6, y: moveSpeed * 3 },
        //Rute yang terbatas 4
        { x: moveSpeed * 6, y: moveSpeed * 2 },
      ];
      break;
    case 2:
      restrictedRoutes = [
        // Rute yang terbatas 1
        { x: 0, y: 0 },
        { x: moveSpeed, y: 0 },
        { x: moveSpeed * 2, y: 0 },
        { x: moveSpeed * 3, y: 0 },
        { x: moveSpeed * 4, y: 0 },
        { x: moveSpeed * 5, y: 0 },
        { x: moveSpeed * 6, y: 0 },
        //Rute yang terbatas 2
        { x: moveSpeed * 6, y: 0 },
        { x: moveSpeed * 6, y: moveSpeed },
        { x: moveSpeed * 6, y: moveSpeed * 2 },
        { x: moveSpeed * 6, y: moveSpeed * 3 },
        { x: moveSpeed * 6, y: moveSpeed * 4 },
        //Rute yang terbatas 3
        { x: 0, y: moveSpeed * 2 },
        { x: moveSpeed, y: moveSpeed * 2 },
        { x: moveSpeed * 2, y: moveSpeed * 2 },
        { x: moveSpeed * 3, y: moveSpeed * 2 },
        { x: moveSpeed * 4, y: moveSpeed * 2 },
        //Rute yang terbatas 4
        { x: moveSpeed * 4, y: moveSpeed * 3 },
        { x: moveSpeed * 4, y: moveSpeed * 4 },
      ];
      break;
    case 3:
      restrictedRoutes = [
        // Rute yang terbatas 1
        { x: moveSpeed * 3, y: 0 },
        { x: moveSpeed * 4, y: 0 },
        { x: moveSpeed * 5, y: 0 },
        { x: moveSpeed * 6, y: 0 },
        //Rute yang terbatas 2
        { x: 0, y: moveSpeed * 2 },
        { x: moveSpeed, y: moveSpeed * 2 },
        { x: moveSpeed * 2, y: moveSpeed * 2 },
        { x: moveSpeed * 2, y: moveSpeed },
        //Rute yang terbatas 3
        { x: 0, y: moveSpeed * 4 },
        { x: moveSpeed, y: moveSpeed * 4 },
        { x: moveSpeed * 2, y: moveSpeed * 4 },
        { x: moveSpeed * 3, y: moveSpeed * 4 },
        { x: moveSpeed * 4, y: moveSpeed * 4 },
        //Rute yang terbatas 4
        { x: moveSpeed * 6, y: moveSpeed * 2 },
        { x: moveSpeed * 5, y: moveSpeed * 2 },
        { x: moveSpeed * 4, y: moveSpeed * 2 },
        { x: moveSpeed * 4, y: moveSpeed * 3 },
      ];
      break;
    case 4:
      restrictedRoutes = [
        // Rute yang terbatas 1
        { x: 0, y: moveSpeed * 3 },
        { x: moveSpeed, y: moveSpeed * 3 },
        { x: moveSpeed * 2, y: moveSpeed * 3 },
        { x: moveSpeed * 3, y: moveSpeed * 3 },
        { x: moveSpeed * 4, y: moveSpeed * 3 },
        { x: moveSpeed * 5, y: moveSpeed * 3 },
        //Rute yang terbatas 2
        { x: 0, y: 0 },
        { x: 0, y: moveSpeed },
        { x: 0, y: moveSpeed * 2 },
        { x: 0, y: moveSpeed * 3 },
        //Rute
        { x: moveSpeed * 2, y: moveSpeed },
        { x: moveSpeed * 3, y: moveSpeed },
        { x: moveSpeed * 4, y: moveSpeed },
        { x: moveSpeed * 5, y: moveSpeed },
        { x: moveSpeed * 6, y: moveSpeed },
      ];
      break;
    case 5:
      restrictedRoutes = [
        // Rute yang terbatas 1
        { x: moveSpeed * 5, y: 0 },
        { x: moveSpeed * 5, y: moveSpeed },
        { x: moveSpeed * 5, y: moveSpeed * 2 },
        { x: moveSpeed * 5, y: moveSpeed * 3 },
        //Rute yang terbatas 2
        { x: moveSpeed, y: moveSpeed * 2 },
        { x: moveSpeed, y: moveSpeed * 3 },
        { x: moveSpeed * 2, y: moveSpeed * 3 },
        { x: moveSpeed * 3, y: moveSpeed * 3 },
        //rute yang terbatas 3
        { x: 0, y: 0 },
        { x: moveSpeed, y: 0 },
        { x: moveSpeed * 2, y: 0 },
        { x: moveSpeed * 3, y: 0 },
        { x: moveSpeed * 3, y: moveSpeed },
      ];
      break;
    case 6:
      restrictedRoutes = [
        // Rute yang terbatas 1
        { x: moveSpeed * 5, y: moveSpeed * 3 },
        { x: moveSpeed * 5, y: moveSpeed * 4 },
        //Rute yang terbatas 2
        { x: 0, y: moveSpeed * 4 },
        { x: moveSpeed, y: moveSpeed * 4 },
        //Rute
        { x: moveSpeed * 2, y: moveSpeed },
        { x: moveSpeed * 3, y: moveSpeed },
        { x: moveSpeed * 4, y: moveSpeed },
        { x: moveSpeed * 5, y: moveSpeed },
        { x: moveSpeed * 6, y: moveSpeed },
        { x: moveSpeed, y: moveSpeed * 2 },
        { x: moveSpeed * 2, y: moveSpeed * 2 },
        { x: moveSpeed * 3, y: moveSpeed * 2 },
        { x: moveSpeed * 3, y: moveSpeed * 3 },
      ];
      break;
    default:
      restrictedRoutes = [];
      break;
  }
}

function isRestrictedArea(carPosition) {
  for (let i = 0; i < restrictedRoutes.length; i++) {
    const restricted = restrictedRoutes[i];
    if (
      Math.abs(carPosition.x - restricted.x) < carSize / 2 &&
      Math.abs(carPosition.y - restricted.y) < carSize / 2
    ) {
      return true; // Tabrakan dengan area terlarang
    }
  }
  return false; // Tidak ada tabrakan
}

// Gerakkan mobil maju
function moveForward(speed = moveSpeed) {
  const radians = (carRotation % 360) * (Math.PI / 180);
  let totalSteps = Math.ceil(speed / moveSpeed);

  for (let i = 1; i <= totalSteps; i++) {

    if (checkCarFinished(carPosition)) {
      totalSteps = i;
      showModal(
        "Selamat! Kamu telah menyelesaikan simulasi <br> pemrograman blok di level ini."
      );
      stopCarSound();
      soundWin();
      combinedInstructions = [];
      isExecuting = false;
      timeoutIds = [];
      return;
    }

    // Hitung posisi mobil setelah langkah ini
    let newX = Math.round(carPosition.x + Math.cos(radians) * moveSpeed);
    let newY = Math.round(carPosition.y + Math.sin(radians) * moveSpeed);

    if (newX > mapSize.x) {
      newX = mapSize.x;
    }
    if (newX < 0) {
      newX = 0;
    }
    if (newY > mapSize.y) {
      newY = mapSize.y;
    }
    if (newY < 0) {
      newY = 0;
    }

    // Jika posisi berada di area terlarang, berhenti
    if (isRestrictedArea({ x: newX, y: newY })) {
      setTimeout(() => {
        showModal(
          "Mobilmu berada di jalur yang salah.<br> Kamu hebat! Namun algoritma pemrograman blok<br> yang kamu susun masih kurang tepat. <br>Silahkan ulangi!"
        );
        soundFail();
        resetPosition();
        stopCarSound();
      }, 3000);
      isCrashed = true;
      combinedInstructions = [];
      isExecuting = false;
      timeoutIds = [];
      return;
    }

    if (
      newX >= 0 &&
      newX <= mapSize.x - carSize &&
      newY >= 0 &&
      newY <= mapSize.y - carSize
    ) {
      // Perbarui posisi mobil setelah langkah ini
      carPosition.x = newX;
      carPosition.y = newY;
      updateCarPosition();
      // Periksa finish
      if (checkCarFinished(carPosition)) {
        totalSteps = i;
        level += 1;
        stopCarSound();
        updateFinishPosition();
        updateRestrictedRoutes();
        setTimeout(() => {
          showModal(
            "Selamat! Kamu telah menyelesaikan simulasi <br> pemrograman blok di level ini."
          );
          soundWin();
        }, 2000);
        combinedInstructions = [];
        isExecuting = false;
        timeoutIds = [];
        return; // Jika sudah finish, keluar dari fungsi
      }
    } else if (!checkCarFinished(carPosition)) {
      setTimeout(() => {
        showModal(
          "Mobilmu berada di jalur yang salah.<br> Kamu hebat! Namun algoritma pemrograman blok<br> yang kamu susun masih kurang tepat. <br>Silahkan ulangi!"
        );
        stopCarSound();
        soundFail();
        resetPosition();
      }, 3000);
      isCrashed = true;
      combinedInstructions = [];
      isExecuting = false;
      timeoutIds = [];
      return;
    }
    
  }
}

function checkCarFinished(carPosition) {
  if (
    Math.abs(carPosition.x - finishPosition.x) < carSize / 2 &&
    Math.abs(carPosition.y - finishPosition.y) < carSize / 2
  ) {
    return true;
  }
  return false;
}

function updateFinishPosition() {
  const finish = document.getElementById("finish");

  switch (level) {
    case 1:
      finishPosition = {
        x: moveSpeed * 5,
        y: moveSpeed * 2,
      };
      break;
    case 2:
      finishPosition = {
        x: moveSpeed * 5,
        y: moveSpeed * 4,
      };
      break;
    case 3:
      finishPosition = {
        x: moveSpeed * 6,
        y: moveSpeed,
      };
      break;
    case 4:
      finishPosition = {
        x: moveSpeed * 6,
        y: 0,
      };
      break;
    case 5:
      finishPosition = {
        x: moveSpeed * 4,
        y: 0,
      };
      break;
    case 6:
      finishPosition = {
        x: moveSpeed * 6,
        y: 0,
      };
      break;
    default:
      break;
  }

  finish.style.left = finishPosition.x + "px";
  finish.style.top = finishPosition.y + "px";

  return finishPosition;
}

// Fungsi untuk mereset posisi mobil
function resetPosition() {
  const car = document.getElementById("car");
  car.style.transition = "none";
  switch (level) {
    case 1:
      carPosition = { x: moveSpeed, y: moveSpeed * 2 };
      carRotation = 0;
      break;
    case 2:
      carPosition = { x: 0, y: moveSpeed };
      carRotation = 0;
      break;
    case 3:
      carPosition = { x: 0, y: moveSpeed * 3 };
      carRotation = 0;
      break;
    case 4:
      carPosition = { x: 0, y: moveSpeed * 4 };
      carRotation = 0;
      break;
    case 5:
      carPosition = { x: moveSpeed * 6, y: 0 };
      carRotation = 90;
      break;
    case 6:
      carPosition = { x: moveSpeed * 6, y: moveSpeed * 4 };
      carRotation = -90;
      break;
    default:
      break;
  }
  updateCarPosition();
  instructionArea.innerHTML = "";
  isCrashed = false;
  updateHoverBlocks();
}
function addInstruction(buttonId) {
  soundClick();
  const originalButton = document.getElementById(buttonId);
  const buttonClone = originalButton.cloneNode(true);

  buttonClone.removeAttribute("onclick");
  buttonClone.addEventListener("click", () => {
    buttonClone.remove(); // Hanya menghapus tombol
    updateHoverBlocks(); // Perbarui posisi hover setelah instruksi dihapus
  });

  const instructionArea = document.getElementById("instructionArea");
  instructionArea.appendChild(buttonClone);
  instructionArea.scrollTop = instructionArea.scrollHeight;

  updateHoverBlocks();
}

function updateHoverBlocks(play = false) {
  let instructions = [];
  if (!play) {
    instructions = Array.from(
      document.getElementById("instructionArea").querySelectorAll("div")
    );
  }

  let blockTop = carPosition.y;
  let blockLeft = carPosition.x;
  let blockRotation = 90;

  switch (level) {
    case 1:
      blockRotation = 90;
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      blockRotation = 90;
      break;
    case 5:
      blockRotation = 0;
      break;
    case 6:
      blockRotation = 180;
      break;
    default:
      break;
  }

  const map = document.getElementById("map");

  // Bersihkan semua hover sebelumnya
  document.querySelectorAll(".hover-block").forEach((block) => block.remove());

  instructions.forEach((instruction) => {
    const hover = document.createElement("div");
    hover.classList.add("hover-block");
    hover.style.position = "absolute";
    hover.style.width = `${carSize}px`;
    hover.style.height = `${carSize}px`;

    if (instruction.id === "leftBtn") {
      blockRotation += 90;
    } else if (instruction.id === "rightBtn") {
      blockRotation -= 90;
    } else if (instruction.id === "forwardBtn") {
      blockTop += moveSpeed * Math.cos((blockRotation * Math.PI) / 180);
      blockLeft += moveSpeed * Math.sin((blockRotation * Math.PI) / 180);
    }

    blockLeft = Math.max(0, Math.min(blockLeft, map.offsetWidth - carSize));
    blockTop = Math.max(0, Math.min(blockTop, map.offsetHeight - carSize));

    hover.style.backgroundColor = isRestrictedArea({
      x: blockLeft,
      y: blockTop,
    })
      ? "rgba(225, 0, 0, 0.5)"
      : "rgba(0, 0, 0, 0.5)";
    hover.style.transform = `rotate(${blockRotation}deg)`;
    hover.style.left = `${blockLeft}px`;
    hover.style.top = `${blockTop}px`;

    map.appendChild(hover);
  });
}
// Drag-and-drop event handlers
// function allowDrop(event) {
//   event.preventDefault();
// }

// function drag(event) {
//   event.dataTransfer.setData("text", event.target.id);
// }

// function drop(event) {
//   event.preventDefault();
//   const data = event.dataTransfer.getData("text");
//   button.removeAttribute("draggable");
//   button.addEventListener("click", () => button.remove());
//   instructionArea.appendChild(button);
// }

// function enableTouchDrag(control) {
//   control.addEventListener(
//     "touchstart",
//     (event) => {
//       const touch = event.touches[0];
//       isDragging = true;
//       const clone = control.cloneNode(true);

//       const computedStyles = window.getComputedStyle(control);
//       clone.style.backgroundImage = computedStyles.backgroundImage;
//       clone.style.backgroundRepeat = computedStyles.backgroundRepeat;
//       clone.style.backgroundSize = computedStyles.backgroundSize;
//       clone.style.backgroundPosition = computedStyles.backgroundPosition;

//       clone.style.position = "absolute";
//       clone.style.left = touch.clientX - 40 + "px";
//       clone.style.top = touch.clientY - 20 + "px";
//       clone.removeAttribute("draggable");
//       clone.id = "dragClone";
//       document.body.appendChild(clone);

//       const moveHandler = (moveEvent) => {
//         if (isDragging) {
//           const touchMove = moveEvent.touches[0];
//           let instructionArea = document.getElementById("instructionArea");
//           let element = document.elementFromPoint(
//             touchMove.clientX,
//             touchMove.clientY
//           );
//           if (element && element.id === "instructionArea") {
//             instructionArea.style.background = "";
//             instructionArea.style.background = "#ccc";
//           }

//           clone.style.position = "absolute";
//           clone.style.left = touchMove.clientX - 40 + "px"; //tambahakan 40 untuk posisi x
//           clone.style.top = touchMove.clientY - 20 + "px";
//         }
//       };

//       const endHandler = () => {
//         if (isDragging) {
//           const dropRect = instructionArea.getBoundingClientRect();
//           const cloneRect = clone.getBoundingClientRect();

//           if (
//             cloneRect.left < dropRect.right &&
//             cloneRect.right > dropRect.left &&
//             cloneRect.top < dropRect.bottom &&
//             cloneRect.bottom > dropRect.top
//           ) {
//             const newButton = control.cloneNode(true);
//             newButton.addEventListener("click", () => newButton.remove());
//             instructionArea.appendChild(newButton);
//           }
//           document.removeEventListener("touchmove", moveHandler);
//           document.removeEventListener("touchend", endHandler);
//         }
//         if (isDragging) {
//           isDragging = false;
//           document.body.removeChild(clone);
//         }
//       };

//       document.addEventListener("touchmove", moveHandler);
//       document.addEventListener("touchend", endHandler);
//     },
//     {
//       passive: false,
//     }
//   );
// }

// Menambahkan fungsi touch pada setiap tombol kontrol
// document.querySelectorAll(".controls div").forEach((control) => {
//   if (
//     control.id === "leftBtn" ||
//     control.id === "forwardBtn" ||
//     control.id === "rightBtn"
//   ) {
//     enableTouchDrag(control);
//   }
// });

// Event listener untuk tombol
document.getElementById("startBtn").addEventListener("click", () => {
  soundClick();
  executeInstructions();

  resetBtn.setAttribute("disabled", true);
  resetBtn.style.opacity = 0.5;
  resetBtn.style.pointerEvents = "none";
  startBtn.setAttribute("disabled", true);
  startBtn.style.opacity = 0.5;
  startBtn.style.pointerEvents = "none";
});
document.getElementById("resetBtn").addEventListener("click", () => {
  soundClick();
  combinedInstructions = [];
  isExecuting = false;
  timeoutIds = [];
  stopCarSound();
  resetPosition();
});

// Update moveSpeed saat resize
window.addEventListener("resize", () => {
  mapSize.x = window.innerWidth <= 1240 ? 490 : 1120;
  mapSize.y = window.innerWidth <= 1240 ? 350 : 800; // Height
  moveSpeed = mapSize.x / 7;
  carSize = moveSpeed;
  updateRestrictedRoutes();
  finishPosition = updateFinishPosition();
  resetPosition();
});

// Inisialisasi awal
updateRestrictedRoutes();
resetPosition();
