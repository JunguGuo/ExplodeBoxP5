var w = window.innerWidth;
var h = window.innerHeight;

let myimg1;
let myimg2;
let myimg = [5];
let value = 0;
let randImg = 0;
let brx, bry, brz;

class brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.thetax = 0.0;
    this.thetay = 0.0;
    this.thetaz = 0.0;
    this.tranx = 0.0;
    this.trany = 0.0;
    this.tranz = 0.0;
  }

  update() {
    this.thetax = 2 * PI * sin(this.x / 10 + 10 * noise(this.y / 100 + time + 1000));
    this.thetay = 2 * PI * sin(this.x / 10 + 10 * noise(this.y / 100 + time + 2000));
    this.thetaz = 2 * PI * sin(this.x / 10 + 10 * noise(this.y / 100 + time + 3000));
    var dr = sqrt(this.x * this.x + this.y * this.y);
    this.tranx =
      (((width / 2 - mouseX) * 10.0 - dr) / 2) *
      lerp(0, noise(dr + time) - 0.5, progression / 100.0);
    this.trany =
      (((height / 2 - mouseY) * 10.0 - dr) / 2) *
      lerp(0, noise(dr + time + 1000) - 0.5, progression / 100.0);
    this.tranz =
      (width - dr + height - dr) *
      lerp(0, noise(dr + time + 2000), progression / 100.0);
  }

  render() {
    push();
    translate(this.x, this.y);
    stroke(255);
    colorMode(RGB);
    fill(124, 0, 255);
    translate(this.tranx, this.trany, this.tranz);
    rotateX(lerp(-2.0 * PI, this.thetax, progression / 100.0));
    rotateY(lerp(-2.0 * PI, this.thetay, progression / 100.0));
    rotateZ(lerp(-2.0 * PI, this.thetaz, progression / 100.0));
    box(dx, dy, 50);
    texture(myimg1);
    textureMode(NORMAL);
    beginShape();

    vertex(-dx / 2, -dy / 2, 25, 0, 0);
    vertex(dx / 2, -dy / 2, 25, 1, 0);
    vertex(dx / 2, dy / 2, 25, 1, 1);
    vertex(-dx / 2, dy / 2, 25, 0, 1);
    endShape();
    pop();
  }
}

let dx, dy, time;
let progression = 0;
let bricks = [];
function preload() {
  myimg1 = loadImage("assets/resource1.png");
  myimg2 = loadImage("assets/invite.png");
  myimg[0] = loadImage("assets/bearhead.jpg");
  myimg[1] = loadImage("assets/eye.jpg");
  myimg[2] = loadImage("assets/void.jpg");
  myimg[3] = loadImage("assets/eye.jpg");
  myimg[4] = loadImage("assets/oldeye.jpg");
}
function setup() {
  pixelDensity(1);
  canvas = createCanvas(w, h, WEBGL);
  gl = this._renderer.GL;
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  colorMode(RGB);
  dx = 400;
  dy = dx * 1.5;
  time = 0.0;
  rectMode(CENTER);
  perspective();

  for (var x = -width / 2; x < width / 2; x += dx + 16) {
    for (var y = -height / 2; y < height / 2; y += dy + 16) {
      bricks.push(new brick(x, y));
    }
  }
}

function draw() {
  directionalLight(235, 235, 235, 0, 0, -1);
  ambientLight(103, 150, 150);
  if (mouseIsPressed && progression < 100) {
    progression += (100 - progression) * 0.12;
    if (progression > 100) progression = 100;
  } else {
    progression += (progression - 101) * 0.12;
    if (progression < 0) progression = 0;
  }
  time += 0.005;
  translate(0, 0, -200);
  background(0);

  push();
  // translate(
  //   -width / 2 + 200,
  //   -height / 2 + (height - (1281 * (width - 400)) / 2207) / 2
  // );
  texture(myimg2);
  plane(width, (1281 * width) / 2207);
  pop();

  // for (let b of bricks) {
  //   b.update();
  //   b.render();
  // }
  if (value==1) {
  push();
  translate(mouseX-width/2, mouseY-height/2, 120);
  rotateX(brx);
  rotateY(bry);
  rotateZ(brz);
  fill(126, 0, 255);
  noStroke();
  box(240, 360, 120);
  textureMode(NORMAL);
  beginShape();
  texture(myimg[randImg]);
  vertex(-120, -180, 60, 0, 0);
  vertex(120, -180, 60, 1, 0);
  vertex(120, 180, 60, 1, 1);
  vertex(-120, 180, 60, 0, 1);
  endShape();
  pop();
}
}

window.onresize = function () {
  // assigns new values for width and height variables
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.size(w, h);
};

function mousePressed() {
  value=1;
  randImg=int(random(5));
  brx=random(-0.3, 0.3);
  bry=random(-0.3, 0.3);
  brz=random(-0.3, 0.3);
}
function mouseReleased() {
  value = 0;
}

function initializeFields() {
  myimg1 = null;
  myimg2 = null;
  myimg = [];
  value = 0;
  randImg = 0;
  brx = 0;
  bry = 0;
  brz = 0;
  x = 0;
  y = 0;
  thetax = 0.0;
  thetay = 0.0;
  thetaz = 0.0;
  tranx = 0.0;
  trany = 0.0;
  tranz = 0.0;
  dx = 0;
  dy = 0;
  time = 0;
  progression = 0;
  bricks = [];
}
