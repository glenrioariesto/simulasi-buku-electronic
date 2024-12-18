let draggedTool;

let levelScene = 0;
const showModal = document.getElementById("myModal");

function allowDrop(event) {
  event.preventDefault();
}

// Drag start
function drag(event) {
  draggedTool = event.target;
}

// Drop tool into dropzone
function drop(event) {
  event.preventDefault();

  // Tentukan dropzone untuk scene4 dan scene5
  const dropzonesScene4 = document.querySelectorAll(".dropzone-scene4");
  const dropzonesScene5 = document.querySelectorAll(".dropzone.scene-5");
  const dropzonesScene6 = document.querySelectorAll(".dropzone.scene-6");
  const dropzonesScene7 = document.querySelectorAll(".dropzone.scene-7");
  const dropzonesScene8 = document.querySelectorAll(".dropzone.scene-8");

  // Cari dropzone yang menjadi target
  const targetDropzoneScene4 = Array.from(dropzonesScene4).find((zone) => {
    const rect = zone.getBoundingClientRect();
    return (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    );
  });

  const targetDropzoneScene5 = Array.from(dropzonesScene5).find((zone) => {
    const rect = zone.getBoundingClientRect();
    return (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    );
  });

  const targetDropzoneScene6 = Array.from(dropzonesScene6).find((zone) => {
    const rect = zone.getBoundingClientRect();
    return (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    );
  });

  const targetDropzoneScene7 = Array.from(dropzonesScene7).find((zone) => {
    const rect = zone.getBoundingClientRect();
    return (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    );
  });

  const targetDropzoneScene8 = Array.from(dropzonesScene8).find((zone) => {
    const rect = zone.getBoundingClientRect();
    return (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    );
  });

  // Jika tidak ada dropzone target untuk kedua scene, kembalikan alat ke posisi semula
  if (
    !targetDropzoneScene4 &&
    !targetDropzoneScene5 &&
    !targetDropzoneScene6 &&
    !targetDropzoneScene7 &&
    !targetDropzoneScene8
  ) {
    return;
  }

  // Logika untuk scene4
  if (targetDropzoneScene4) {
    // Pastikan dropzone target tidak sudah penuh
    if (targetDropzoneScene4.hasChildNodes()) {
      return;
    }

    const newTool = document.createElement("div");

    // Ambil ID dari draggedTool dan tambahkan -use sesuai yang di css
    const draggedToolId = draggedTool.id;
    const newToolId = `${draggedToolId}-use`;
    // Atur posisi alat
    newTool.id = newToolId;
    newTool.className = draggedTool.className;
    newTool.setAttribute("draggable", "true");
    newTool.setAttribute("data-tool", draggedToolId);
    newTool.style.position = "static";
    newTool.style.zIndex = 10;

    newTool.setAttribute("draggable", "true");

    // Tambahkan event listener untuk drag ulang
    newTool.addEventListener("dragstart", drag);
    // Nonaktifkan fitur draggable pada elemen yang sudah didrop

    // Tambahkan alat ke dropzone target
    targetDropzoneScene4.appendChild(newTool);
    draggedTool.remove();

    // Validasi apakah semua dropzone di scene4 sudah terisi
    const allHelms = document.querySelectorAll(".helms .helm");
    const allDropzonesFilled = Array.from(dropzonesScene4).every((zone) =>
      zone.hasChildNodes()
    );
    const unplacedHelms = Array.from(allHelms).filter(
      (helm) => !helm.closest(".dropzone-scene4")
    );

    if (allDropzonesFilled && unplacedHelms.length <= 1) {
      checkHelms();
    }
  }

  // Logika untuk scene5
  else if (targetDropzoneScene5) {
    // Atur posisi alat sesuai kelasnya

    const newTool = document.createElement("div");

    // Ambil ID dari draggedTool dan tambahkan -use sesuai yang di css
    const draggedToolId = draggedTool.id;
    const newToolId = `${draggedToolId}-use`;
    // Atur posisi alat
    newTool.id = newToolId;
    newTool.className = draggedTool.className + "-use";
    newTool.setAttribute("draggable", "true");
    newTool.setAttribute("data-tool", draggedToolId);

    newTool.setAttribute("draggable", "true");

    // Tambahkan event listener untuk drag ulang
    newTool.addEventListener("dragstart", drag);
    // Nonaktifkan fitur draggable pada elemen yang sudah didrop

    // Tambahkan alat ke dropzone target
    targetDropzoneScene5.appendChild(newTool);
  } else if (targetDropzoneScene6) {
    // Atur posisi alat sesuai kelasnya

    const newTool = document.createElement("div");

    // Ambil ID dari draggedTool dan tambahkan -use sesuai yang di css
    const draggedToolId = draggedTool.id;
    const newToolId = `${draggedToolId}-use`;
    // Atur posisi alat
    newTool.id = newToolId;
    newTool.className = draggedTool.className + "-use";
    newTool.setAttribute("draggable", "true");
    newTool.setAttribute("data-tool", draggedToolId);

    newTool.setAttribute("draggable", "true");

    // Tambahkan event listener untuk drag ulang
    newTool.addEventListener("dragstart", drag);
    // Nonaktifkan fitur draggable pada elemen yang sudah didrop

    // Tambahkan alat ke dropzone target
    targetDropzoneScene6.appendChild(newTool);
  } else if (targetDropzoneScene7) {
    // Atur posisi alat sesuai kelasnya

    const newTool = document.createElement("div");

    // Ambil ID dari draggedTool dan tambahkan -use sesuai yang di css
    const draggedToolId = draggedTool.id;
    const newToolId = `${draggedToolId}-use`;
    // Atur posisi alat
    newTool.id = newToolId;
    newTool.className = draggedTool.className + "-use";
    newTool.setAttribute("draggable", "true");
    newTool.setAttribute("data-tool", draggedToolId);

    newTool.setAttribute("draggable", "true");

    // Tambahkan event listener untuk drag ulang
    newTool.addEventListener("dragstart", drag);
    // Nonaktifkan fitur draggable pada elemen yang sudah didrop

    // Tambahkan alat ke dropzone target
    targetDropzoneScene7.appendChild(newTool);
  } else if (targetDropzoneScene8) {
    // Atur posisi alat sesuai kelasnya

    const newTool = document.createElement("div");

    // Ambil ID dari draggedTool dan tambahkan -use sesuai yang di css
    const draggedToolId = draggedTool.id;
    const newToolId = `${draggedToolId}-use`;
    // Atur posisi alat
    newTool.id = newToolId;
    newTool.className = draggedTool.className + "-use";
    newTool.setAttribute("draggable", "true");
    newTool.setAttribute("data-tool", draggedToolId);

    newTool.setAttribute("draggable", "true");

    // Tambahkan event listener untuk drag ulang
    newTool.addEventListener("dragstart", drag);
    // Nonaktifkan fitur draggable pada elemen yang sudah didrop

    // Tambahkan alat ke dropzone target
    targetDropzoneScene8.appendChild(newTool);
  }
}

// Touch event handlers for mobile
document.querySelectorAll(".helms .helm").forEach((helm) => {
  helm.addEventListener(
    "touchstart",
    function (event) {
      event.preventDefault();
      draggedTool = event.target;
      draggedTool.style.position = "absolute";
      let touch = event.touches[0];
      draggedTool.style.left = touch.pageX - draggedTool.offsetWidth / 2 + "px";
      draggedTool.style.top = touch.pageY - draggedTool.offsetHeight / 2 + "px";
      document.body.appendChild(draggedTool);
    },
    false
  );

  helm.addEventListener("touchmove", function (event) {
    event.preventDefault();
    let touch = event.touches[0];
    draggedTool.style.left = touch.pageX - draggedTool.offsetWidth / 2 + "px";
    draggedTool.style.top = touch.pageY - draggedTool.offsetHeight / 2 + "px";
  });

  helm.addEventListener("touchend", function (event) {
    let dropzones = document.querySelectorAll(".dropzone-scene4");
    draggedTool.classList.add("clone-draggedTool");
    dropzones.forEach((zone) => {
      let rect = zone.getBoundingClientRect();
      let toolRect = draggedTool.getBoundingClientRect();
      // Calculate the center points
      const isInDropZone =
        toolRect.left < rect.right &&
        toolRect.right > rect.left &&
        toolRect.top < rect.bottom &&
        toolRect.bottom > rect.top;

      // Calculate the distance between the tool and the dropzone center

      if (isInDropZone && !zone.hasChildNodes()) {
        const newTool = document.createElement("div");

        // Ambil ID dari draggedTool dan tambahkan -use sesuai yang di css
        const draggedToolId = draggedTool.id;
        const newToolId = `${draggedToolId}-use`;
        // Atur posisi alat
        newTool.id = newToolId;
        newTool.className = draggedTool.className;
        newTool.setAttribute("draggable", "true");
        newTool.setAttribute("data-tool", draggedToolId);
        newTool.style.position = "static";
        newTool.style.zIndex = 10;

        zone.appendChild(newTool);
        draggedTool.remove();

        const allHelms = document.querySelectorAll(".helms .helm");
        const allDropzonesFilled = Array.from(dropzones).every((zone) => {
          return zone.hasChildNodes();
        });
        const unplacedHelms = Array.from(allHelms).filter((helm) => {
          return !helm.closest(".dropzone-scene4");
        });

        if (allDropzonesFilled && unplacedHelms.length <= 1) {
          showModal.style.display = "flex";
          checkButton.style.display = "flex";
        } else {
          showModal.style.display = "none";
          checkButton.style.display = "none";
        }
        // dropSound.currentTime = 0;
        // dropSound.play();
      }
    });
  });
});
document.querySelectorAll(".dropzone-scene4").forEach((zone) => {
  zone.addEventListener("dblclick", (event) => {
    const tool = event.target;

    // Check if the clicked element is a tool (helm) and is currently in a dropzone
    if (tool && tool.classList.contains("helm")) {
      // Return the tool to the helms container
      const helms = document.querySelector(".helms");
      tool.style.position = "static";
      tool.style.zIndex = 10;

      const originalId = tool.id.replace("-use", "");
      tool.setAttribute("data-tool", originalId);
      tool.id = originalId;
      tool.addEventListener("dragstart", drag);
      tool.setAttribute("draggable", "true"); // Make it draggable again
      helms.appendChild(tool);
    }
  });
});
