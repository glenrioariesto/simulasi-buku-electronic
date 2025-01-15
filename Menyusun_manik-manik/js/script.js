const {
  Common,
  Engine,
  Body,
  Bodies,
  Composite,
  Constraint,
  Mouse,
  MouseConstraint,
  Events,
} = Matter;

let engine;
let bodies = [];
let ground;
let num = 17;
let radius = 50;
let length = 110;
let chains = [];
let mouse, mouseConstraint;
let bgImage;
let textureYellowCircle;
let textureRedRectangle;
let textureBlueStar;
let meja;
let leftToplesWall = { x: 100, y: 200, width: 20, height: 300 };
let textureGreenHexagon;
let level = 1;

let initManik = [
  "Merah",
  "Hijau",
  "Kuning",
  "Biru",
  "Merah",
  "Hijau",
  "Kuning",
  "Biru",
  "Merah",
  "Hijau",
  "Kuning",
  "Merah",
  "Kuning",
  "Kuning",
  "Merah",
  "Kuning",
  "Kuning",
];

const initManik2 = [
  "Merah",
  "Hijau",
  "Kuning",
  "Biru",
  "Kuning",
  "Kuning",
  "Kuning",
  "Kuning",
  "Biru",
  "Biru",
  "Biru",
  "Biru",
  "Biru",
  "Biru",
  "Biru",
  "Biru",
  "Biru",
  "Hijau",
  "Hijau",
  "Hijau",
  "Hijau",
  "Hijau",
  "Hijau",
  "Hijau",
  "Hijau",
  "Merah",
  "Merah",
  "Merah",
  "Merah",
  "Merah",
  "Merah",
];

const correctOrder1 = [
  "Merah",
  "Hijau",
  "Kuning",
  "Biru",
  "Merah",
  "Hijau",
  "Kuning",
  "Biru",
  "Merah",
  "Hijau",
  "Kuning",
  "Merah",
  "Kuning",
  "Merah",
  "Kuning",
];

const correctOrder2 = [
  "Merah",
  "Hijau",
  "Kuning",
  "Biru",
  "Merah",
  "Hijau",
  "Kuning",
  "Biru",
  "Merah",
  "Hijau",
  "Kuning",
  "Biru",
  "Merah",
  "Hijau",
  "Kuning",
  "Biru",
  "Merah",
  "Hijau",
  "Kuning",
  "Biru",
  "Merah",
  "Hijau",
  "Biru",
  "Merah",
  "Hijau",
  "Biru",
  "Hijau",
  "Biru",
  "Hijau",
  "Biru",
];

let defaultConnections = [
  { from: "Merah", to: "Hijau", fromIndex: 0, toIndex: 1 },
  { from: "Hijau", to: "Kuning", fromIndex: 1, toIndex: 2 },
  { from: "Kuning", to: "Biru", fromIndex: 2, toIndex: 3 },
];
const collisionSound = new Howl({
  src: [
    "assets/sounds/zapsplat_multimedia_alert_bell_chime_notification_metallic_high_pitched_001_54047.mp3",
  ], // Path ke file suara
  volume: 0.1, // Atur volume suara
});
const connectSound = new Howl({
  src: [
    "assets/sounds/zapsplat_household_shaving_foam_can_plastic_lid_pop_off_002_64376.mp3",
  ], // Ganti dengan lokasi file suara Anda
  volume: 0.5, // Atur volume suara sesuai keinginan
});

let selectedBall = null;
let connectionsCount = {}; // Object to track the number of connections per ball
let leftWall, rightWall, topWall, bottomWall;

function preload() {
  if (!isScene3Active) return;

  // Load the background image before the sketch starts
  bgImage = loadImage("assets/background-game.svg"); // Replace with the correct path to your image
  textureYellowCircle = loadImage("assets/marble-hijau-bulat.webp");
  textureRedRectangle = loadImage("assets/marble-merah-kotak.webp");
  textureGreenHexagon = loadImage("assets/marble-hijau-polygon.webp");
  textureBlueStar = loadImage("assets/marble-biru-bintang.webp");
  meja = loadImage("assets/meja-marble.svg");
}

let isScene3Active = false;
let canvasElement;

function setup() {
  canvasElement = createCanvas(windowWidth, windowHeight);
  canvasElement.parent("scene3");
  canvasElement.style("display", "none");
}

function initializeScene3() {
  // console.log("initializeScene3", isScene3Active);
  if (!isScene3Active) return;
  canvasElement.style("display", "block");


  if (typeof polyDecomp !== 'undefined') {
    Common.setDecomp(polyDecomp);
  }
  engine = Engine.create();
  
  // Mouse control setup
  mouse = Mouse.create(document.body);
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2, // Tentukan kekakuan constraint
      render: { visible: false }, // Menghilangkan render visual constraint jika diperlukan
    },
  });

  Events.on(engine, "collisionStart", function (event) {
    event.pairs.forEach(function (pair) {
      // Memeriksa jika dua objek bertabrakan
      if (pair.bodyA && pair.bodyB) {
        collisionSound.play(); // Mainkan suara saat tabrakan
      }
    });
  });
  // Create balls that are initially not connected
  for (let i = 0; i < num; i++) {
    let x;
    let y;

    // Tentukan posisi bola pertama dan bola terakhir
    if (i === 0) {
      x = width / 2; // Posisi bola pertama (misalnya di kiri)
      y = height / 8; // Posisi Y bola pertama
    } else {
      // Posisi bola lainnya berada di tengah-tengah bola pertama dan bola terakhir
      let xStart = width / 4 + 150;
      let xEnd = width;
      x = random(xStart, xEnd); // Menggunakan lerp untuk interpolasi posisi X
      y = random(0, height - 150); // Posisi Y bola lainnya bisa acak
    }

    // Jika bola pertama atau terakhir, buat dia statis
    let fixed = i === 0;

    // Untuk bola selain bola pertama dan terakhir, atur fisik supaya bisa memantul
    let ballOptions = {
      isStatic: fixed, // Bola pertama dan terakhir statis
      label: initManik[i],
      angle: random(TWO_PI),

      render: {
        sprite: {
          texture: "", // Default texture, will be updated based on the label
        },
      },
    };
    // Create different shapes based on the label
    if (initManik[i] === "Kuning") {
      // Create a circle for "Kuning"
      bodies[i] = Bodies.circle(x, y, radius, ballOptions);
      bodies[i].render.sprite.texture = bgImage;
    } else if (initManik[i] === "Hijau") {
      bodies[i] = Bodies.polygon(x, y, 6, radius, ballOptions);
      bodies[i].render.sprite.texture = bgImage;
    } else if (initManik[i] === "Merah") {
      // Create a rectangle for "Merah"
      bodies[i] = Bodies.rectangle(x, y, radius * 2, radius * 2, ballOptions); // Rectangle
      bodies[i].render.sprite.texture = bgImage;
    } else if (initManik[i] === "Biru") {
      // Create a custom star for "Biru" (using circle temporarily for simplicity)
      let starVertices = createBalancedStarVertices(
        radius,
        outerRatio,
        innerRatio,
        nPoints
      );
      bodies[i] = Bodies.fromVertices(x, y, [starVertices], ballOptions, true);
      bodies[i].render.sprite.texture = bgImage;
    }

    connectionsCount[i] = 0; // Inisialisasi koneksi untuk setiap bola
  }

  // Create ground
  ground = Bodies.rectangle(width / 2, height - 50, width, 10, {
    isStatic: true,
  });
  // Create walls for toples
  let wallOptions = { isStatic: true };

  Composite.add(engine.world, [ground, mouseConstraint]);

  // Create boundaries to prevent balls from going out of canvas

  topWall = Bodies.rectangle(width / 2, 0, width, 10, wallOptions);
  leftWall = Bodies.rectangle(0, height / 2, 10, height, wallOptions);
  rightWall = Bodies.rectangle(width, height / 2, 10, height, wallOptions);
  bottomWall = Bodies.rectangle(width / 2, height, width, 10, wallOptions);

  Composite.add(engine.world, [leftWall, rightWall, bottomWall, topWall]);

  // Add bodies to world
  Composite.add(engine.world, bodies);

  initializeBalls();
}



function initializeBalls() {
  for (let i = 0; i < defaultConnections.length; i++) {
    let connection = defaultConnections[i];
    let fromIndex = connection.fromIndex;
    let toIndex = connection.toIndex;

    // Ambil posisi bola asal
    let fromBallPos = bodies[fromIndex].position;

    // Tentukan posisi baru untuk bola tujuan
    let newToBallPos = createVector(fromBallPos.x + 50, fromBallPos.y + 100);

    // Pindahkan bola tujuan ke posisi baru
    Body.setPosition(bodies[toIndex], {
      x: newToBallPos.x,
      y: newToBallPos.y,
    });

    // Simpan urutan koneksi
    connectedBallsOrder.push({
      from: connection.from,
      to: connection.to,
      fromIndex: fromIndex,
      toIndex: toIndex,
    });

    // Buat constraint untuk menghubungkan bola
    let options = {
      bodyA: bodies[fromIndex],
      bodyB: bodies[toIndex],
      length: length,
    };
    let chain = Constraint.create(options);
    Composite.add(engine.world, chain);
    chains.push(chain);

    // Perbarui jumlah koneksi bola
    updateConnectionCount(fromIndex);
    updateConnectionCount(toIndex);
  }
}
function getColorByLabel(label) {
  const colorMap = {
    Kuning: "#ef562f",
    Hijau: "#14976b",
    Merah: "#f9d531",
    Biru: "#2b67af",
  };
  return colorMap[label] || "#000000"; // Default ke hitam jika label tidak dikenal
}

function getTriangleVertices(x, y, size) {
  let h = (size * sqrt(3)) / 2; // Tinggi segitiga sama sisi
  return [
    { x: x - size / 2, y: y + h / 2 }, // Titik kiri bawah
    { x: x + size / 2, y: y + h / 2 }, // Titik kanan bawah
    { x: x, y: y - h / 2 }, // Titik atas
  ];
}
function drawTriangle(x, y, size) {
  let h = (size * sqrt(3)) / 2; // Tinggi segitiga sama sisi
  // Menggambar segitiga dengan posisi pusat dan rotasi
  beginShape();
  vertex(x - size / 2, y + h / 2); // Titik kiri bawah
  vertex(x + size / 2, y + h / 2); // Titik kanan bawah
  vertex(x, y - h / 2); // Titik atas
  endShape(CLOSE);
}
let outerRatio = 1; // Ratio untuk titik luar (disarankan 1)
let innerRatio = 0.2;
let nPoints = 5;
function createBalancedStarVertices(radius, outerRatio, innerRatio, nPoints) {
  let angle = TWO_PI / nPoints;
  let halfAngle = angle / 10.0;
  let vertices = [];

  for (let i = 0; i < nPoints; i++) {
    let outerX = radius * outerRatio * cos(i * angle);
    let outerY = radius * outerRatio * sin(i * angle);
    vertices.push({ x: outerX, y: outerY });

    let innerX = radius * innerRatio * cos(i * angle + halfAngle);
    let innerY = radius * innerRatio * sin(i * angle + halfAngle);
    vertices.push({ x: innerX, y: innerY });
  }

  return vertices;
}

function draw() {
  if (!isScene3Active) return;
  if (bgImage) {
    // console.log("draw");
    background(bgImage);
    // Menggambar chains pertama (di belakang objek)
    for (let chain of chains) {
      let x1 = chain.bodyA.position.x;
      let y1 = chain.bodyA.position.y;
      let x2 = chain.bodyB.position.x;
      let y2 = chain.bodyB.position.y;
      line(x1, y1, x2, y2); // Menggambar chain antara dua bodies
    }

    // Menyisipkan gambar di dalam kotak
    for (let i = 0; i < bodies.length; i++) {
      let x1 = bodies[i].position.x;
      let y1 = bodies[i].position.y;

      // Menentukan warna berdasarkan label
      let color = getColorByLabel(bodies[i].label);
      fill(color);

      // Menggunakan tekstur berdasarkan label
      push(); // Mulai transformasi (untuk rotasi dan translasi)
      translate(x1, y1); // Pindahkan ke posisi objek
      rotate(bodies[i].angle); // Rotasi sesuai dengan sudut objek

      if (bodies[i].label === "Kuning") {
        imageMode(CENTER);
        image(textureYellowCircle, 0, 0, radius * 2, radius * 2); // Menggambar tekstur untuk Kuning
      } else if (bodies[i].label === "Hijau") {
        imageMode(CENTER);
        image(textureGreenHexagon, 0, 0, radius * 2, radius * 2); // Menggambar tekstur untuk Hijau
      } else if (bodies[i].label === "Merah") {
        imageMode(CENTER);
        image(textureRedRectangle, 0, 0, radius * 2, radius * 2); // Menggambar tekstur untuk Merah
      } else if (bodies[i].label === "Biru") {
        imageMode(CENTER);
        image(textureBlueStar, 0, 0, radius * 2.5, radius * 2.5); // Menggambar tekstur untuk Biru
      }

      pop(); // Kembali ke transformasi sebelumnya
    }
    fill(0);
    imageMode(CORNER);
    image(meja, 0, height - 60, width, 100);
  }
}



function activateScene3() {
  isScene3Active = true;
  radius = window.innerWidth > 1000 ? 50 : 25;
  length = window.innerWidth > 1000 ? 100 : 50;
  preload();
  initializeScene3();
}

function deactivateScene3() {
  isScene3Active = false;
  Composite.clear(engine.world, true);
}

function checkBallOrder() {
  soundClick();
  // Urutan bola berdasarkan posisi X-nya
  let connectedBallOrder = [];
  console.log(connectedBallsOrder);
  for (let i = 0; i < connectedBallsOrder.length; i++) {
    if (i === 0) {
      connectedBallOrder.push(connectedBallsOrder[i].from);
    }
    connectedBallOrder.push(connectedBallsOrder[i].to);
  }
  console.log("Urutan bola berdasarkan koneksi:", connectedBallOrder);
  let isConnectedCorrect = false;
  switch (level) {
    case 1:
      isConnectedCorrect =
        connectedBallOrder.length === correctOrder1.length &&
        connectedBallOrder.every((label, i) => label === correctOrder1[i]);
      break;
    case 2:
      isConnectedCorrect =
        connectedBallOrder.length === correctOrder2.length &&
        connectedBallOrder.every((label, i) => label === correctOrder2[i]);
      break;
  }

  if (isConnectedCorrect && level === 1) {
    showModal2();
  } else if (isConnectedCorrect && level === 2) {
    showModal3();
  } else {
    showModal(
      `Urutan manik-manik yang kamu rangkai<br>masih salah. berikut adalah <br>urutan manik-manik yang benar!`,
      "",
      true
    );
  }
}
let connectedBallsOrder = [];
let clickCount = 0;
let lastClickedBall = null;
let lastClickTime = 0;
function mousePressed() {
  let mousePos = createVector(mouseX, mouseY);
  let clickedBall = null;

  for (let i = 0; i < bodies.length; i++) {
    let ballPos = createVector(bodies[i].position.x, bodies[i].position.y);
    let distance = dist(mousePos.x, mousePos.y, ballPos.x, ballPos.y);
    let tolerance = 5;
    if (distance < radius + tolerance) {
      clickedBall = i;
      console.log(clickedBall);
      break;
    }
  }

  if (clickedBall !== null) {
    let currentTime = millis(); // Dapatkan waktu saat ini
    let timeSinceLastClick = currentTime - lastClickTime;

    // Deteksi Double-Click (dalam 300 ms)
    if (lastClickedBall === clickedBall && timeSinceLastClick < 300) {
      console.log(`Double-click pada bola ${bodies[clickedBall].label}`);
      handleDoubleClick(clickedBall);
      clickCount = 0; // Reset klik
    } else {
      // Single Click
      console.log(`Single click pada bola ${bodies[clickedBall].label}`);
      handleSingleClick(clickedBall);
      clickCount = 1;
    }

    // Update status klik terakhir
    lastClickTime = currentTime;
    lastClickedBall = clickedBall;
    // Validasi koneksi pertama
  }
}

function handleDoubleClick(clickedBall) {
  // Logika untuk double-click
  console.log(`Menangani double-click untuk bola ${bodies[clickedBall].label}`);

  // Putuskan hubungan jika double-click
  let connectionIndex = connectedBallsOrder.findIndex(
    (connection) =>
      connection.fromIndex === clickedBall || connection.toIndex === clickedBall
  );

  if (connectionIndex !== -1) {
    Composite.remove(engine.world, chains[connectionIndex]);
    chains.splice(connectionIndex, 1);
    const removedConnection = connectedBallsOrder.splice(connectionIndex, 1)[0];
    console.log("Hubungan diputus");

    const { fromIndex, toIndex } = removedConnection;

    if (connectionsCount[fromIndex]?.count) {
      connectionsCount[fromIndex].count -= 1;
      if (connectionsCount[fromIndex].count === 0) {
        delete connectionsCount[fromIndex];
      }
    }

    if (connectionsCount[toIndex]?.count) {
      connectionsCount[toIndex].count -= 1;
      if (connectionsCount[toIndex].count === 0) {
        delete connectionsCount[toIndex];
      }
    }
    connectSound.play();

    selectedBall = null;
    clickedBall = null;
  }
}

function handleSingleClick(clickedBall) {
  if (selectedBall === null) {
    selectedBall = clickedBall;
    console.log(`Bola terpilih: ${bodies[selectedBall].label}`);
    if (connectedBallsOrder.length === 0 && clickedBall !== 0) {
      selectedBall = null;
    }
  } else if (selectedBall !== clickedBall) {
    if (!isAlreadyConnected(selectedBall, clickedBall)) {
      // Tentukan `from` dan `to` dengan logika prioritas dan fallback
      if (
        getConnectionCount(selectedBall) < getMaxConnections(selectedBall) &&
        getConnectionCount(clickedBall) < getMaxConnections(clickedBall)
      ) {
        let from, to;
        const selectedLabel = bodies[selectedBall].label;
        const clickedLabel = bodies[clickedBall].label;
        let initialSelectedBall = selectedBall;
        let initialClickedBall = clickedBall;

        // Koneksi berikutnya, prioritas pada derajat, lalu fallback ke alfabet
        if (connectedBallsOrder.length === 0) {
          if (selectedBall < clickedBall) {
            from = bodies[selectedBall].label;
            to = bodies[clickedBall].label;
          } else {
            from = bodies[clickedBall].label;
            to = bodies[selectedBall].label;
          }
        } else if (
          getConnectionCount(selectedBall) > getConnectionCount(clickedBall)
        ) {
          from = selectedLabel;
          to = clickedLabel;
        } else if (
          getConnectionCount(selectedBall) < getConnectionCount(clickedBall)
        ) {
          from = clickedLabel;
          to = selectedLabel;
        } else {
          // Fallback ke alfabet jika derajat sama
          from = selectedLabel < clickedLabel ? selectedLabel : clickedLabel;
          to = selectedLabel < clickedLabel ? clickedLabel : selectedLabel;
        }
        if (connectedBallsOrder.length > 0) {
          let lastConnection =
            connectedBallsOrder[connectedBallsOrder.length - 1];
          let lastBallIndex = lastConnection.toIndex;

          // Pastikan bola berikutnya terkait dengan koneksi terakhir
          if (clickedBall === lastBallIndex || selectedBall === lastBallIndex) {
            if (clickedBall === lastBallIndex) {
              initialSelectedBall = clickedBall;
              initialClickedBall = selectedBall;

              console.log(`Koneksi 1 ditambahkan: ${from} -> ${to}`);
            } else {
              initialSelectedBall = selectedBall;
              initialClickedBall = clickedBall;
              console.log(`Koneksi 2 ditambahkan: ${from} -> ${to}`);
            }
          } else {
            selectedBall = null;
            console.log("Koneksi harus mengikuti koneksi terakhir");
            return;
          }
        } else {
          initialSelectedBall =
            selectedBall > clickedBall ? clickedBall : selectedBall;
          initialClickedBall =
            clickedBall < selectedBall ? selectedBall : clickedBall;
        }

        connectedBallsOrder.push({
          from,
          to,
          fromIndex: initialSelectedBall,
          toIndex: initialClickedBall,
        });

        console.log(`Koneksi ditambahkan: ${from} -> ${to}`);
        console.log("Urutan koneksi:", connectedBallsOrder);

        if (getConnectionCount(selectedBall) > 0) {
          let selectedBallPos = bodies[selectedBall].position;
          let newClickedBallPos = createVector(
            selectedBallPos.x + 50,
            selectedBallPos.y - 150
          );

          Body.setPosition(bodies[clickedBall], {
            x: newClickedBallPos.x,
            y: newClickedBallPos.y,
          });
        } else if (getConnectionCount(clickedBall) > 0) {
          let clickedBallPos = bodies[clickedBall].position;
          let newClickedBallPos = createVector(
            clickedBallPos.x + 50,
            clickedBallPos.y - 150
          );

          Body.setPosition(bodies[selectedBall], {
            x: newClickedBallPos.x,
            y: newClickedBallPos.y,
          });
        }

        let options = {
          bodyA: bodies[selectedBall],
          bodyB: bodies[clickedBall],
          length: length,
        };
        connectSound.play();
        let chain = Constraint.create(options);
        Composite.add(engine.world, chain);
        chains.push(chain);

        updateConnectionCount(selectedBall);
        updateConnectionCount(clickedBall);
      }
    }
    selectedBall = null;
  }
}

function updateConnectionCount(ballIndex) {
  if (!connectionsCount[ballIndex]) {
    connectionsCount[ballIndex] = { label: bodies[ballIndex].label, count: 1 };
  } else {
    connectionsCount[ballIndex].count++;
  }
}

function getConnectionCount(ballIndex) {
  return connectionsCount[ballIndex] ? connectionsCount[ballIndex].count : 0;
}
function getMaxConnections(ballIndex) {
  return ballIndex === 0 ? 1 : 2;
}

// Check if two balls are already connected
function isAlreadyConnected(ballA, ballB) {
  return chains.some(
    (chain) =>
      (chain.bodyA === bodies[ballA] && chain.bodyB === bodies[ballB]) ||
      (chain.bodyA === bodies[ballB] && chain.bodyB === bodies[ballA])
  );
}

function reset() {
  switch (level) {
    case 2:
      initManik = [...initManik2];
      num = 31;
      Composite.clear(engine.world);
      activateScene3();
      break;
    default:
      initManik = [...initManik];
      num = 17;
      break;
  }
  // Clear all existing chains (connections)
  for (let i = 0; i < chains.length; i++) {
    Composite.remove(engine.world, [chains[i]]);
  }
  chains = []; // Reset the chains array
  connectionsCount = {}; // Clear the connectionsCount object

  // Reset the connections count

  // Reset the balls to their initial positions if needed
  for (let i = 0; i < bodies.length; i++) {
    let body = bodies[i];
    // Generate a random position for the body

    let x;
    let y;

    // Tentukan posisi bola pertama dan bola terakhir
    if (i === 0) {
      x = width / 2; // Posisi bola pertama (misalnya di kiri)
      y = height / 8; // Posisi Y bola pertama
    } else {
      // Posisi bola lainnya berada di tengah-tengah bola pertama dan bola terakhir
      let xStart = width / 8 + 150;
      let xEnd = width;
      x = random(xStart, xEnd); // Menggunakan lerp untuk interpolasi posisi X
      y = random(0, height - 150); // Posisi Y bola lainnya bisa acak
    }
    let newPos = {
      x,
      y,
    };
    // Reset the body position and angle
    Body.setPosition(body, newPos);
    Body.setAngle(body, random(TWO_PI)); // Randomize the angle again
    body.isStatic = i === 0; // Ensure the first ball is static (i === 0)

    // If the body is dynamic, reset its velocity and force (optional)
    if (!body.isStatic) {
      Body.setVelocity(body, { x: 0, y: 0 }); // Reset velocity
      Body.setAngularVelocity(body, 0); // Reset angular velocity
    }
  }

  // Reset any other state if needed (like selectedBall)
  selectedBall = null;
  connectedBallsOrder = [];
  initializeBalls();
}
function adjustCanvasSize() {
  // Resize canvas sesuai ukuran jendela
  resizeCanvas(windowWidth, windowHeight);

  // Update ground
  ground = Bodies.rectangle(width / 2, height - 50, width, 10, {
    isStatic: true,
  });
  Composite.add(engine.world, [ground]);

  // Update boundary positions
  Composite.remove(engine.world, [leftWall, rightWall, topWall, bottomWall]);

  leftWall = Bodies.rectangle(0, height / 2, 10, height, {
    isStatic: true,
  });
  rightWall = Bodies.rectangle(width, height / 2, 10, height, {
    isStatic: true,
  });
  bottomWall = Bodies.rectangle(width / 2, height, width, 10, {
    isStatic: true,
  });

  Composite.add(engine.world, [leftWall, rightWall, bottomWall]);
}
window.addEventListener("resize", () => {
  adjustCanvasSize();
});

const buttons = document.querySelectorAll(".button-game");
buttons.forEach((button) => {
  button.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault(); // Prevents the default touch behavior
      if (e.target.classList.contains("check")) {
        checkBallOrder();
      } else if (e.target.classList.contains("reset")) {
        resetGame();
      } else if (e.target.classList.contains("info")) {
        showBackScene2();
      }
    },
    { passive: false }
  );
});
const buttonCloseModals = document.querySelectorAll(".btn.close");

buttonCloseModals.forEach((button) => {
  button.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault(); // Prevent default behavior
      const modalId = e.target.getAttribute("id"); // Get the ID of the button
      if (modalId) {
        closeModalById(modalId); // Call a specific closeModal function
      }
    },
    { passive: false }
  );
});

// Function to handle modal closure by ID
function closeModalById(id) {
  if (id === "closeModal") {
    closeModal(); // Handle the first modal
  } else if (id === "closeModal2") {
    closeModal2(); // Handle the second modal
  } else if (id === "closeModal3") {
    closeModal3(); // Handle the third modal
  }
}

const optionButtons = document.querySelectorAll(".option-btn");
optionButtons.forEach((button) => {
  button.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault(); // Prevent default touch behavior
      const option = e.target.getAttribute("data-option");
      if (option) {
        storeAnswer(option); // Call the storeAnswer function with the option
      }
    },
    { passive: false }
  );
});

const checkButtons = document.querySelectorAll(".btn.check");

checkButtons.forEach((button) => {
  button.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault(); // Prevent default touch behavior
      checkAnswer(); // Kirimkan event ke fungsi
    },
    { passive: false }
  );
});

const alertButtons = document.querySelectorAll(".btn-alert");

alertButtons.forEach((button) => {
  button.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault(); // Prevent default touch behavior
      if (button.classList.contains("no")) {
        handleNo();
      } else {
        handleYes();
      }
    },
    { passive: false }
  );
});

const slideButtons = document.querySelectorAll(".button");

slideButtons.forEach((button) => {
  // Tangani event touchstart
  button.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault(); // Mencegah perilaku bawaan
      if (button.classList.contains("prev")) {
        changeSlide(-1);
      } else if (button.classList.contains("next")) {
        changeSlide(1);
      }
    },
    { passive: false }
  );
});
