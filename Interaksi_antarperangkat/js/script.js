let draggedSoftware;
let level = 1;
let containerDevice = document.getElementById("controls-device");

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  draggedSoftware = event.target;
  const dropbox = draggedSoftware.closest(".dropbox");
  if (dropbox) {
    dropbox.classList.remove("no-border");
  }
}

function drop(event) {
  event.preventDefault();

  if (
    event.target.classList.contains("dropbox") &&
    !event.target.hasChildNodes()
  ) {
    clonedSoftware = draggedSoftware.cloneNode(true);
    const dropbox = draggedSoftware.closest(".dropbox");
    if (dropbox) {
      return;
    }
    containerDevice.appendChild(clonedSoftware);
    draggedSoftware.style.position = "absolute";
    draggedSoftware.style.top = "50%";
    draggedSoftware.style.left = "50%";
    draggedSoftware.style.transform = "translate(-50%, -50%)";

    event.target.appendChild(draggedSoftware);
    soundDropItems();
  }
}
function addDragListeners(device) {
  // Touch event handlers for mobile
  device.addEventListener(
    "touchstart",
    function (event) {
      event.preventDefault();
      draggedSoftware = event.target;
      const dropzone = draggedSoftware.closest(".dropbox");
      if (dropzone) {
        dropzone.classList.remove("no-border");
      }

      let touch = event.touches[0];
      draggedSoftware.style.position = "absolute";
      draggedSoftware.style.left =
        touch.pageX - draggedSoftware.offsetWidth / 2 + "px";
      draggedSoftware.style.top =
        touch.pageY - draggedSoftware.offsetHeight / 2 + "px";
      document.body.appendChild(draggedSoftware);
    },
    false
  );

  device.addEventListener("touchmove", function (event) {
    event.preventDefault();
    let touch = event.touches[0];
    draggedSoftware.style.left =
      touch.pageX - draggedSoftware.offsetWidth / 2 + "px";
    draggedSoftware.style.top =
      touch.pageY - draggedSoftware.offsetHeight / 2 + "px";
    draggedSoftware.style.width = "100px";
    draggedSoftware.style.height = "70px !important"; // Removed "!important" (not valid in JS)
  });

  device.addEventListener("touchend", function (event) {
    let dropzones = document.querySelectorAll(".dropbox");

    dropzones.forEach((zone) => {
      let rect = zone.getBoundingClientRect();
      let deviceRect = draggedSoftware.getBoundingClientRect();
      // Calculate the center points
      const zoneCenterX = rect.left + rect.width / 2;
      const zoneCenterY = rect.top + rect.height / 2;
      const deviceCenterX = deviceRect.left + deviceRect.width / 2;
      const deviceCenterY = deviceRect.top + deviceRect.height / 2;

      // Calculate the distance between the dragged device and the dropzone center
      const distance = Math.hypot(
        deviceCenterX - zoneCenterX,
        deviceCenterY - zoneCenterY
      );

      // Define a threshold distance for a successful drop
      const threshold = rect.width / 2; // Adjust this threshold as needed

      if (!zone.hasChildNodes()) {
        zone.classList.remove("no-border");
      }

      if (distance < threshold) {
        if (!zone.hasChildNodes()) {
          clonedSoftware = draggedSoftware.cloneNode(true);

          // Tambahkan event listener untuk elemen yang di-clone
          addDragListeners(clonedSoftware);

          const dropbox = draggedSoftware.closest(".dropbox");
          if (dropbox) {
            return;
          }
          clonedSoftware.style.position = "static";
          clonedSoftware.style.left = "0";
          clonedSoftware.style.top = "0";
          clonedSoftware.setAttribute("draggable", "true");
          containerDevice.appendChild(clonedSoftware);

          draggedSoftware.style.position = "static";
          draggedSoftware.style.left = "0";
          draggedSoftware.style.top = "0";
          draggedSoftware.style.transform = "translate(-25%, -15%)";

          zone.classList.add("no-border");
          zone.appendChild(draggedSoftware);

          soundDropItems();
        }
      }
    });
  });
}

document.querySelectorAll(".device").forEach((device) => {
  addDragListeners(device);
});
function addCableAnimation(cable, container, index) {
  return new Promise((resolve) => {
    if (!cable || !container) {
      console.error(`Cable or container at index ${index} not found.`);
      resolve(); // Resolve immediately to prevent further issues
      return;
    }
    cable.classList.add("animate");
    cable.addEventListener(
      "animationend",
      () => {
        cable.classList.remove("animate");
        container.classList.add("correct");
        resolve(); // Animasi kabel selesai
      },
      { once: true }
    );
  });
}

function checkConditions(level) {
  const elements = {
    dvr: document.getElementById(level === 1 ? "drop-dvr" : "drop-dvr-level2")
      .children[0]?.id,
    router: document.getElementById(
      level === 1 ? "drop-router" : "drop-router-level2"
    ).children[0]?.id,
    cctvAnalog: document.getElementById(
      level === 1 ? "drop-cctv-analog" : "drop-cctv-analog-level2"
    ).children[0]?.id,
    cctvAnalog2: document.getElementById(
      level === 1 ? "drop-cctv-analog2" : "drop-cctv-analog2-level2"
    ).children[0]?.id,
  };

  // Additional conditions for level 2
  if (level === 2) {
    elements.cctvWireless = document.getElementById(
      "drop-cctv-wireless-level2"
    ).children[0]?.id;
    elements.cctvWireless2 = document.getElementById(
      "drop-cctv-wireless2-level2"
    ).children[0]?.id;
    elements.modem =
      document.getElementById("drop-modem-level2").children[0]?.id;
    elements.internet = document.getElementById(
      "drop-internet-level2"
    ).children[0]?.id;
  }

  // Level 1 specific conditions
  if (
    elements.dvr === "dvr" &&
    elements.router === "router" &&
    elements.cctvAnalog2 === "cctv-analog" &&
    elements.cctvAnalog === "cctv-analog" &&
    level === 1
  ) {
    return true;
  } else if (
    elements.cctvAnalog === "cctv-analog" &&
    elements.cctvAnalog2 === "cctv-analog" &&
    elements.cctvWireless === "cctv-wireless" &&
    elements.cctvWireless2 === "cctv-wireless" &&
    elements.dvr === "dvr" &&
    elements.router === "router" &&
    elements.modem === "modem" &&
    elements.internet === "internet" &&
    level === 2
  ) {
    return true;
  }
  // Level 2 specific conditions (if needed)
  return false;
}

function runSimulation() {
  soundClick();
  soundPlayGame();
  const cables = document.querySelectorAll(".flow");
  const cableContainers = document.querySelectorAll(".cable-container");

  const animationPromises = [];

  // Handle first two cables together
  [0, 1].forEach((index) => {
    animationPromises.push(
      addCableAnimation(cables[index], cableContainers[index], index)
    );
  });

  // Handle cables 8 and 9 together, after cables 0 and 1
  [7, 8].forEach((index) => {
    animationPromises.push(
      addCableAnimation(cables[index], cableContainers[index], index)
    );
  });

  // Handle cables 10 and 11 together, after cables 8 and 9
  [9, 10].forEach((index) => {
    animationPromises.push(
      new Promise((resolve) => {
        setTimeout(() => {
          addCableAnimation(cables[index], cableContainers[index], index).then(
            resolve
          );
        }, 1500); // Adjust this delay as necessary
      })
    );
  });

  if (level === 2) {
    [5, 6].forEach((index) => {
      animationPromises.push(
        new Promise((resolve) => {
          setTimeout(() => {
            addCableAnimation(
              cables[index],
              cableContainers[index],
              index
            ).then(resolve);
          }, (index - 1) * 1000); // Adjust this delay as necessary
        })
      );
    });
  }
  const ignoredIndices =
    level === 1 ? [0, 1, 6, 7, 8, 9, 10] : [0, 1, 5, 6, 7, 8, 9, 10];
  const delay = level === 1 ? 1500 : 1100;
  // Handle remaining cables one by one
  cables.forEach((cable, index) => {
    if (!ignoredIndices.includes(index)) {
      console.log(index);
      console.log(index - 1);
      animationPromises.push(
        new Promise((resolve) => {
          setTimeout(() => {
            addCableAnimation(cable, cableContainers[index], index).then(
              resolve
            );
          }, (index - 1) * delay);
        })
      );
    }
  });

  // Check conditions based on the level
  if (checkConditions(level)) {
    Promise.all(animationPromises).then(() => {
      const sinyal = document.getElementById(
        level === 1 ? "drop-sinyal" : "drop-sinyal-level2"
      );
      sinyal.style.display = "block"; // Tampilkan sinyal

      setTimeout(() => {
        sinyal.style.display = "none"; // Sembunyikan sinyal setelah 3 detik
        showModal(true);
        if (level === 1) {
          setupSimulationLevel2();
          soundWin();
          level = 2;
        } else if (level === 2) {
          soundWin();
          level = 3;
        }
      }, 4000);
    });
  } else {
    Promise.all(animationPromises).then(() => {
      soundFail();
      showModal(false);
    });
  }
}

function shuffleDevices() {
  const container = document.getElementById("controls-device");
  const devices = Array.from(container.getElementsByClassName("device"));

  // Mengacak array devices
  for (let i = devices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [devices[i], devices[j]] = [devices[j], devices[i]]; // Tukar elemen
  }

  // Menambahkan elemen yang sudah diacak kembali ke container
  devices.forEach((device) => container.appendChild(device));
}
function resetCables() {
  const cableContainers = document.querySelectorAll(".cable-container");
  cableContainers.forEach((container) => {
    container.classList.remove("correct");
  });
}

function resetDropboxes() {
  const dropboxes = document.querySelectorAll(".dropbox");
  dropboxes.forEach((zone) => {
    const child = zone.firstChild;
    if (child) {
      child.remove();
    }
  });
}

function resetSimulation() {
  document.querySelectorAll(".device").forEach((device) => {
    addDragListeners(device);
  });
  soundClick();
  resetCables();
  resetDropboxes();
  shuffleDevices();
}

function setupSimulationLevel2() {
  const container = document.getElementById("container-dropbox");

  // Remove existing dropboxes to avoid duplicates (if needed)
  container.innerHTML = "";

  // Define new dropboxes with their ids for Level 2
  const dropboxes = [
    "drop-cctv-analog-level2",
    "drop-cctv-analog2-level2",
    "drop-cctv-wireless-level2",
    "drop-cctv-wireless2-level2",
    "drop-dvr-level2",
    "drop-router-level2",
    "drop-modem-level2",
    "drop-internet-level2",
    "drop-sinyal-level2",
  ];

  // Loop through the dropbox ids and create the dropboxes dynamically
  dropboxes.forEach((id) => {
    const dropbox = document.createElement("div");
    dropbox.classList.add("dropbox");
    dropbox.id = id;
    dropbox.addEventListener("dragover", allowDrop);
    dropbox.addEventListener("drop", drop);
    // Append the new dropbox to the container
    container.appendChild(dropbox);
  });

  const cables = [
    { id: "cable-1-level2", flowDirection: "left" },
    { id: "cable-2-level2", flowDirection: "right" },
    { id: "cable-3-level2", flowDirection: "down" },
    { id: "cable-4-level2", flowDirection: "down" },
    { id: "cable-5-level2", flowDirection: "left" },
    { id: "cable-6-level2", flowDirection: "down" },
    { id: "cable-7-level2", flowDirection: "left" }, // New cable
    { id: "cable-8-level2", flowDirection: "down", dashed: true }, // New cable with dashed
    { id: "cable-9-level2", flowDirection: "down", dashed: true }, // New cable with dashed
    { id: "cable-10-level2", flowDirection: "right", dashed: true }, // New cable with dashed
    { id: "cable-11-level2", flowDirection: "right", dashed: true }, // New cable with dashed
  ];

  // Loop through the cables and create them dynamically
  cables.forEach(({ id, flowDirection, dashed }) => {
    const cable = document.createElement("div");
    cable.id = id;
    cable.classList.add("cable-container");

    // If the cable has 'dashed' property, add the 'dashed' class
    if (dashed) {
      cable.classList.add("dashed");
    }

    // Create the cable line and flow direction
    const cableLine = document.createElement("div");
    cableLine.classList.add("cable-line");

    const flow = document.createElement("div");
    flow.classList.add("flow", flowDirection);
    cableLine.appendChild(flow);
    cable.appendChild(cableLine);

    // Append the new cable to the container
    container.appendChild(cable);
  });
}

document.querySelectorAll(".dropbox").forEach((dropbox) => {
  dropbox.addEventListener("dragover", allowDrop);
  dropbox.addEventListener("drop", drop);
});
document.addEventListener("DOMContentLoaded", function () {
  shuffleDevices(); // Fungsi acak dipanggil ketika DOM siap
});
