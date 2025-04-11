let draggedTool;

let levelScene = 0;
const showModal = document.getElementById("myModal");
const dropzonesScene4 = document.querySelectorAll(".dropzone-scene4");
const dropzonesScene5 = document.querySelectorAll(".dropzone.scene-5");
const dropzonesScene6 = document.querySelectorAll(".dropzone.scene-6");
const dropzonesScene7 = document.querySelectorAll(".dropzone.scene-7");
const dropzonesScene8 = document.querySelectorAll(".dropzone.scene-8");
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
    const draggedToolId = draggedTool.id.replace(/-use$/, '');
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
    soundDrop();
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
    soundDrop();
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
    soundDrop();
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
    soundDrop();
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
    soundDrop();
  }
}

// Touch event handlers for mobile
document.querySelectorAll("#scene4 .helms .helm").forEach((helm) => {
  addDragListeners(helm);
});

function addDragListeners(helm) {
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

  helm.addEventListener(
    "touchmove",
    function (event) {
      event.preventDefault();
      let touch = event.touches[0];
      draggedTool.style.left = touch.pageX - draggedTool.offsetWidth / 2 + "px";
      draggedTool.style.top = touch.pageY - draggedTool.offsetHeight / 2 + "px";
    },
    false
  );

  helm.addEventListener("touchend", function (event) {
    const containerToolsScene4 = document.querySelector(".helms");
    const containerToolsScene5 = document.getElementById("tools-ruang-gambar");
    const containerToolsScene6 = document.getElementById("tools-ruang-bubut");
    const containerToolsScene7 = document.getElementById(
      "tools-ruang-pengecoran-logam"
    );
    const containerToolsScene8 = document.getElementById(
      "tools-ruang-konstruksi"
    );

    let droppedInZone = false;

    const targetDropzoneScene4 = Array.from(dropzonesScene4).find((zone) => {
      const rect = zone.getBoundingClientRect();
      const toolRect = draggedTool.getBoundingClientRect();
      return (
        toolRect.left < rect.right &&
        toolRect.right > rect.left &&
        toolRect.top < rect.bottom &&
        toolRect.bottom > rect.top
      );
    });
    const targetDropzoneScene5 = Array.from(dropzonesScene5).find((zone) => {
      const rect = zone.getBoundingClientRect();
      const toolRect = draggedTool.getBoundingClientRect();
      return (
        toolRect.left < rect.right &&
        toolRect.right > rect.left &&
        toolRect.top < rect.bottom &&
        toolRect.bottom > rect.top
      );
    });
    const targetDropzoneScene6 = Array.from(dropzonesScene6).find((zone) => {
      const rect = zone.getBoundingClientRect();
      const toolRect = draggedTool.getBoundingClientRect();
      return (
        toolRect.left < rect.right &&
        toolRect.right > rect.left &&
        toolRect.top < rect.bottom &&
        toolRect.bottom > rect.top
      );
    });
    const targetDropzoneScene7 = Array.from(dropzonesScene7).find((zone) => {
      const rect = zone.getBoundingClientRect();
      const toolRect = draggedTool.getBoundingClientRect();
      return (
        toolRect.left < rect.right &&
        toolRect.right > rect.left &&
        toolRect.top < rect.bottom &&
        toolRect.bottom > rect.top
      );
    });
    const targetDropzoneScene8 = Array.from(dropzonesScene8).find((zone) => {
      const rect = zone.getBoundingClientRect();
      const toolRect = draggedTool.getBoundingClientRect();
      return (
        toolRect.left < rect.right &&
        toolRect.right > rect.left &&
        toolRect.top < rect.bottom &&
        toolRect.bottom > rect.top
      );
    });
    const scene4 = document.getElementById("scene4");
    const scene5 = document.getElementById("scene5");
    const scene6 = document.getElementById("scene6");
    const scene7 = document.getElementById("scene7");
    const scene8 = document.getElementById("scene8");
    if (!targetDropzoneScene4 && scene4.style.display === "flex") {
      draggedTool.style.position = "static";
      containerToolsScene4.appendChild(draggedTool);
      return;
    } else if (!targetDropzoneScene5 && scene5.style.display === "flex") {
      draggedTool.style.position = "static";
      containerToolsScene5.appendChild(draggedTool);
      return;
    } else if (!targetDropzoneScene6 && scene6.style.display === "flex") {
      draggedTool.style.position = "static";
      containerToolsScene6.appendChild(draggedTool);
      return;
    } else if (!targetDropzoneScene7 && scene7.style.display === "flex") {
      draggedTool.style.position = "static";
      containerToolsScene7.appendChild(draggedTool);
      return;
    } else if (!targetDropzoneScene8 && scene8.style.display === "flex") {
      draggedTool.style.position = "static";
      containerToolsScene8.appendChild(draggedTool);
      return;
    }

    if (targetDropzoneScene4) {
      // Pastikan dropzone target tidak sudah penuh
      if (targetDropzoneScene4.hasChildNodes()) {
        draggedTool.style.position = "static";
        containerToolsScene4.appendChild(draggedTool);
        return;
      }
      droppedInZone = true;
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
      soundDrop();
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
      soundDrop();
    } else if (targetDropzoneScene5) {
      // Atur posisi alat sesuai kelasnya
      droppedInZone = true;
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
      draggedTool.style.position = "static";
      containerToolsScene5.appendChild(draggedTool);

      soundDrop();
    } else if (targetDropzoneScene6) {
      // Atur posisi alat sesuai kelasnya
      droppedInZone = true;

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
      draggedTool.style.position = "static";
      containerToolsScene6.appendChild(draggedTool);
      soundDrop();
    } else if (targetDropzoneScene7) {
      // Atur posisi alat sesuai kelasnya
      droppedInZone = true;

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
      draggedTool.style.position = "static";
      containerToolsScene7.appendChild(draggedTool);
      soundDrop();
    } else if (targetDropzoneScene8) {
      // Atur posisi alat sesuai kelasnya
      droppedInZone = true;

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
      draggedTool.style.position = "static";
      containerToolsScene8.appendChild(draggedTool);
      soundDrop();
    }
  });
}

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

let lastTapTime = 0; // Waktu tap terakhir

document.querySelectorAll(".dropzone-scene4").forEach((zone) => {
  zone.addEventListener("touchend", (event) => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastTapTime;

    if (timeDiff < 300 && timeDiff > 0) {
      // Waktu antara dua tap kurang dari 300ms
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
        addDragListeners(tool);
        helms.appendChild(tool);
      }
    }

    lastTapTime = currentTime;
  });
});
