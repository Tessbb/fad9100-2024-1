let cols, rows;
let x, y;
let xSpeed, ySpeed;
let noiseScale = 0.03;
let windStrength = 0.006;
let rebuildInterval = 4000;
let lastRebuildTime = 20;

function setup() {
  createCanvas(windowWidth, 700);
  cols = 30;
  rows = 25;
  x = new Array(cols).fill().map(() => new Array(rows));
  y = new Array(cols).fill().map(() => new Array(rows));
  xSpeed = new Array(cols).fill().map(() => new Array(rows));
  ySpeed = new Array(cols).fill().map(() => new Array(rows));

  rebuildFabric();
}

function draw() {
  background(0);

  // Update grid points based on Perlin noise
  // Time-based noise offset
  let noiseOffset = millis() * 0.001;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let angle =
        noise(
          x[i][j] * noiseScale,
          y[i][j] * noiseScale,
          noiseOffset,
        ) * TWO_PI;
      xSpeed[i][j] += cos(angle) * windStrength;
      ySpeed[i][j] += sin(angle) * windStrength;
      x[i][j] += xSpeed[i][j];
      y[i][j] += ySpeed[i][j];
    }
  }

  // Draw lines connecting grid points
  stroke(255);
  strokeWeight(1.5);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (i < cols - 1) {
        line(x[i][j], y[i][j], x[i + 1][j], y[i + 1][j]);
      }
      if (j < rows - 1) {
        line(x[i][j], y[i][j], x[i][j + 1], y[i][j + 1]);
      }
    }
  }

  // Rebuild the fabric periodically
  if (millis() - lastRebuildTime > rebuildInterval) {
    rebuildFabric();
    lastRebuildTime = millis();
  }
}

function rebuildFabric() {
  // Reset grid points to initial positions
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      x[i][j] = map(i, 0, cols - 1, 100, width - 100);
      y[i][j] = map(j, 0, rows - 1, 100, height - 100);
      xSpeed[i][j] = 0;
      ySpeed[i][j] = 0;
    }
  }
}
