import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js";
const scene1 = new THREE.Scene();
const camera1 = new THREE.PerspectiveCamera(65, 1, 0.1, 1000);
camera1.position.set(-100, -5, 0);
camera1.lookAt(0, 0, 0);

const renderer1 = new THREE.WebGLRenderer({
  canvas: document.getElementById("myCanvas-scene3-1"),
  alpha: true,
});
const renderer2 = new THREE.WebGLRenderer({
  canvas: document.getElementById("myCanvas-scene3-2"),
  alpha: true,
});

const scene2 = new THREE.Scene();
const camera2 = new THREE.PerspectiveCamera(65, 1, 0.1, 1000);
camera2.position.set(-100, -5, 0);
camera2.lookAt(0, 0, 0);

renderer1.setPixelRatio(window.devicePixelRatio);
renderer2.setPixelRatio(window.devicePixelRatio);

const updateSize = () => {
  const size = window.innerWidth <= 1200 ? 150 : 300; // Adjust size based on window width
  renderer1.setSize(size, size);
  renderer2.setSize(size, size);
  camera1.aspect = window.innerWidth / window.innerHeight;
  camera1.updateProjectionMatrix();
  camera2.aspect = window.innerWidth / window.innerHeight;
  camera2.updateProjectionMatrix();
};

// Event listener for window resize
window.addEventListener("resize", updateSize);

// Initial size update
updateSize();

const addLights = (scene) => {
  const lightPositions = [
    [50, 50, 50],
    [-50, 50, 50],
    [50, -50, 50],
    [50, 50, -50],
    [-50, -50, -50],
  ];
  lightPositions.forEach((pos) => {
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(...pos);
    scene.add(light);
  });

  const pointLight = new THREE.PointLight(0xffffff, 0.6, 50);
  pointLight.position.set(0, 0, 120);
  scene.add(pointLight);
};
addLights(scene1);
addLights(scene2);

const group1 = new THREE.Group();
const group2 = new THREE.Group();
scene1.add(group1);
scene2.add(group2);
group1.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
group2.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
const loadObject = (sceneGroup, objectUrl) => {
  const loader = new GLTFLoader();
  loader.load(objectUrl, (gltf) => {
    const object = gltf.scene;
    sceneGroup.add(object);
    object.traverse((child) => {
      if (child.isMesh) child.material.side = THREE.DoubleSide;
    });
  });
};

// Muat objek untuk masing-masing scene
loadObject(group1, "alat1.glb");
loadObject(group2, "alat1.glb");

const animate = () => {
  requestAnimationFrame(animate);
  renderer1.render(scene1, camera1);
  renderer2.render(scene2, camera2);
};
animate();

// Kontrol rotasi dengan GSAP
document.getElementById("btn-depan-eropa").addEventListener("click", () => {
  soundClick();
  gsap.to(group1.rotation, {
    x: THREE.MathUtils.degToRad(-90),
    y: 0,
    z: 0,
    duration: 1,
    ease: "power2.inOut",
  });
});

document.getElementById("btn-kiri-eropa").addEventListener("click", () => {
  soundClick();
  gsap.to(group1.rotation, {
    x: THREE.MathUtils.degToRad(-90),
    y: 0, // Rotasi -90 derajat di sumbu Y
    z: THREE.MathUtils.degToRad(90),
    duration: 1,
    ease: "power2.inOut",
  });
});

document.getElementById("btn-bawah-eropa").addEventListener("click", () => {
  soundClick();
  gsap.to(group1.rotation, {
    x: THREE.MathUtils.degToRad(-90),
    y: THREE.MathUtils.degToRad(90),
    z: 0,
    duration: 1,
    ease: "power2.inOut",
  });
});

// Scene 2: Mengontrol kamera
document.getElementById("btn-depan-amerika").addEventListener("click", () => {
  soundClick();
  gsap.to(camera2.position, {
    x: -100,
    y: 0,
    z: 0, // Kamera berada di depan objek
    duration: 1,
    ease: "power2.inOut",
    onUpdate: () => camera2.lookAt(0, 0, 0), // Pastikan kamera mengarah ke pusat
  });
});

document.getElementById("btn-kanan-amerika").addEventListener("click", () => {
  soundClick();
  gsap.to(camera2.position, {
    x: 0, // Kamera berada di kanan objek
    y: 0,
    z: 100,
    duration: 1,
    ease: "power2.inOut",
    onUpdate: () => camera2.lookAt(0, 0, 0), // Pastikan kamera mengarah ke pusat
  });
});

document.getElementById("btn-atas-amerika").addEventListener("click", () => {
  soundClick();
  gsap.to(camera2.position, {
    x: 0,
    y: 100, // Kamera berada di atas objek
    z: 0,
    duration: 1,
    ease: "power2.inOut",
    onUpdate: () => camera2.lookAt(1, 0, 0), // Pastikan kamera mengarah ke pusat
  });
});
