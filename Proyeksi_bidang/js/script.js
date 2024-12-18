import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js";

// Scene setup
const scene = new THREE.Scene();
let objectView = 7;
let contrast = 0.5;
let camera = new THREE.PerspectiveCamera(
  objectView,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// camera.position.set(0, 0, 100);
camera.position.set(-100, 50, 50);

camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("myCanvas"),
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0); // Transparan

// Add directional lights with a loop to avoid repetition
const lights = [];
const lightPositions = [
  [50, 50, 50],
  [-50, 50, 50],
  [50, -50, 50],
  [50, 50, -50],
  [-50, -50, -50],
];
lightPositions.forEach((pos) => {
  const light = new THREE.DirectionalLight(0xffffff, contrast);
  light.position.set(...pos);
  scene.add(light);
  lights.push(light);
});

const pointLight = new THREE.PointLight(0xffffff, 0.6, 50);
pointLight.position.set(0, 0, 120);
scene.add(pointLight);

const group = new THREE.Group();
scene.add(group);
let NumberofObject = 1;
let objectUrl = "";
let object;
let isRotating = false;
const currentRotation = new THREE.Quaternion();
let targetCorrectRotation = new THREE.Quaternion();
const initialRotation = new THREE.Euler(
  THREE.MathUtils.degToRad(90),
  THREE.MathUtils.degToRad(0),
  THREE.MathUtils.degToRad(180)
);

let correctRotation1 = new THREE.Euler(
  THREE.MathUtils.degToRad(-90),
  THREE.MathUtils.degToRad(-90),
  THREE.MathUtils.degToRad(-90)
);
currentRotation.setFromEuler(initialRotation);
targetCorrectRotation.setFromEuler(correctRotation1);

// Fungsi untuk mengubah quaternion menjadi sudut Euler
const toDegrees = (rad) => ((rad * 180) / Math.PI) % 360;

const getRotationAngles = (quaternion) => {
  const euler = new THREE.Euler().setFromQuaternion(quaternion);
  return {
    x: toDegrees(euler.x),
    y: toDegrees(euler.y),
    z: toDegrees(euler.z),
  };
};
let targetAngles = getRotationAngles(targetCorrectRotation);

const getCorrectRotation = (objectNumber) => {
  switch (objectNumber) {
    case 1:
      return new THREE.Euler(
        THREE.MathUtils.degToRad(-90),
        THREE.MathUtils.degToRad(0),
        THREE.MathUtils.degToRad(0)
      );
    case 2:
      return new THREE.Euler(
        THREE.MathUtils.degToRad(0),
        THREE.MathUtils.degToRad(0),
        THREE.MathUtils.degToRad(0)
      );
    case 3:
      return new THREE.Euler(
        THREE.MathUtils.degToRad(0),
        THREE.MathUtils.degToRad(0),
        THREE.MathUtils.degToRad(0)
      );
    default:
      return new THREE.Euler(-90, -90, -90); // Default rotation
  }
};

// Fungsi untuk memuat objek GLTF
const loadObject = (objectNumber) => {
  // Tentukan URL berdasarkan objek yang dipilih
  switch (objectNumber) {
    case 1:
      NumberofObject = 1;
      objectUrl = "alat1.glb";
      objectView = 70;
      contrast = 0.5;
      break;
    case 2:
      NumberofObject = 2;
      objectUrl = "alat2.glb";
      objectView = 7;
      contrast = 0.9;
      break;
    case 3:
      NumberofObject = 3;
      objectUrl = "alat3.glb";
      objectView = 7;
      contrast = 1;
      break;
    default:
      NumberofObject = 3;
      objectUrl = "";
      objectView = 7;
      contrast = 1;
      break;
  }
  camera.fov = objectView;
  camera.updateProjectionMatrix();
  // Hapus objek lama jika ada
  if (group.children.length > 0) {
    group.remove(group.children[0]);
  }
  if (!objectUrl) {
    console.warn("Object URL is empty. Skipping object load.");
    return;
  }

  // Memuat objek baru
  const gltfLoader = new GLTFLoader();
  gltfLoader.load(objectUrl, (gltf) => {
    object = gltf.scene;
    group.add(object);
    correctRotation1 = getCorrectRotation(objectNumber);
    targetCorrectRotation.setFromEuler(correctRotation1);
    targetAngles = getRotationAngles(targetCorrectRotation);
    group.rotation.set(initialRotation.x, initialRotation.y, initialRotation.z);

    object.traverse((child) => {
      if (child.isMesh) child.material.side = THREE.DoubleSide;
    });
    lights.forEach((light) => {
      light.intensity = contrast; // Update the intensity
    });
  });
};

// Handle rotation from button clicks
window.viewObject = (view) => {
  soundClick();
  const rotations = {
    kiri: [0, -90, 0],
    kanan: [0, 90, 0],
    atas: [0, 0, -90],
    bawah: [0, 0, 90],
    putarKiri: [-90, 0, 0],
    putarKanan: [90, 0, 0],
  };

  if (rotations[view]) {
    const [x, y, z] = rotations[view].map((angle) =>
      THREE.MathUtils.degToRad(angle)
    );
    const rotationQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(x, y, z)
    );
    currentRotation.multiplyQuaternions(rotationQuat, currentRotation);
    isRotating = true;
  }
  console.log(currentRotation);
  console.log(targetCorrectRotation);
};
const winStatus = {
  alat1: false,
  alat2: false,
  alat3: false,
};
// Check if the current rotation matches the initial rotation
window.checkRotation = () => {
  soundClick();
  const currentAngles = getRotationAngles(group.quaternion);

  const isWithinTolerance = (angle1, angle2, tolerance = 5) =>
    Math.abs(angle1 - angle2) <= tolerance;
  console.log(currentAngles, targetAngles);
  const isRotationMatching =
    isWithinTolerance(currentAngles.x, targetAngles.x) &&
    isWithinTolerance(currentAngles.y, targetAngles.y) &&
    isWithinTolerance(currentAngles.z, targetAngles.z);

  switch (NumberofObject) {
    case 1:
      if (isRotationMatching) {
        const loadAlat1 = document.getElementById("loadAlat1");
        loadAlat1.classList.add("success");
        winStatus.alat1 = true;
        openModal("assets/jawaban-benar.png");
      } else {
        openModal("assets/jawaban-salah.png");
      }
      break;
    case 2:
      if (isRotationMatching) {
        const loadAlat2 = document.getElementById("loadAlat2");
        loadAlat2.classList.add("success");
        winStatus.alat2 = true;
        openModal("assets/jawaban-benar.png");
      } else {
        openModal("assets/jawaban-salah.png");
      }
      break;
    case 3:
      if (isRotationMatching) {
        const loadAlat3 = document.getElementById("loadAlat3");
        loadAlat3.classList.add("success");
        winStatus.alat3 = true;
        openModal("assets/jawaban-benar.png");
      } else {
        openModal("assets/jawaban-salah.png");
      }
      break;
    default:
      break;
  }
  if (winStatus.alat1 && winStatus.alat2 && winStatus.alat3) {
    backShowScene1fromScene7();
    loadObject(0);
    document.getElementById("loadAlat1").classList.remove("success");
    document.getElementById("loadAlat2").classList.remove("success");
    document.getElementById("loadAlat3").classList.remove("success");
  }
};

function animate() {
  requestAnimationFrame(animate);

  if (isRotating) {
    group.quaternion.slerp(currentRotation, 0.1);
    if (group.quaternion.angleTo(currentRotation) < 0.01) isRotating = false;
  }

  renderer.render(scene, camera);
}
animate();

const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const openModal = (src) => {
  modalImage.src = src; // Setel gambar modal
  modal.style.display = "flex"; // Tampilkan modal
};

const closeModal = () => {
  modalImage.src = ""; // Hapus gambar agar tidak ada flash
  modal.style.display = "none";
};

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.getElementById("modalButton").addEventListener("click", closeModal);

document.getElementById("loadAlat1").addEventListener("click", () => {
  soundClick();
  loadObject(1);
});
document.getElementById("loadAlat2").addEventListener("click", () => {
  soundClick();
  loadObject(2);
});
document.getElementById("loadAlat3").addEventListener("click", () => {
  soundClick();
  loadObject(3);
});
