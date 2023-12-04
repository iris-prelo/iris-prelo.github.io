var song;
let spinning = true;
let roulette;

let words = [];
let angles = [];
let segmentColor = [];
let speed = 0;
let volumeMap = {}; 

function preload() {
  song = loadSound("song.mp3");
  font = loadFont('font 2.otf');
  words = ["99", "90", "80", "70", "60", "50", "40", "30", "20", "10", "MUTE", "100"];
  angles = [PI / 8, PI / 8, PI / 8, PI / 8, PI / 8, PI / 8, PI / 8, PI / 8, PI / 8, PI / 8, PI / 2, PI / 4];
  console.log(angles);
  segmentColor = ['#878787', '#57FFE9', '#878787', '#57FFE9', '#878787', '#57FFE9', '#878787', '#57FFE9', '#878787', '#57FFE9', '#FF0000', '#ffffff'];

  volumeMap = {
    "99": 0.9,
    "90": 0.9,
    "80": 0,
    "70": 0,
    "60": 0,
    "50": 0,
    "40": 0.1,
    "30": 0.1,
    "20": 0.2,
    "10": 0.3,
    "MUTE": 0.4,
    "100": 0.6
  };
}

function setup() {
  createCanvas(800, 800);
  background(0);

  textFont(font);
  textAlign(CENTER, CENTER);

  roulette = new Roulette(350);

  getAudioContext().suspend();

  song.play();
  song.loop();
}

function draw() {
  background(0);
	textSize(28);
  fill('#FFFFFF');
  text("PRESS KEY TO SPIN ME", 400, 150);
  text("IF YOU WANT TO ADJUST THE VOLUME", 400, 660);
  fill('#FFFFFF');
  triangle(570, 345, 590, 325, 596, 345);

  push();
  translate(400, 400);
  roulette.display();
  pop();

 
  let triangleCoordinates = createVector(570, 345);
  let closestWord = findClosestObject(triangleCoordinates, words, roulette);
  let v = volumeMap[closestWord];
  song.setVolume(v);
	

}

function mousePressed() {
  userStartAudio();
}

function keyPressed() {
  speed = 1 + random(0.2);
}

class Roulette {
  constructor(radius) {
    this.x = 0;
    this.y = 0;
    this.radius = radius;
    this.angle = 0;
    noStroke();
  }

  update() {
    this.angle += speed;

    if (speed > 0) {
      speed = speed - 0.005;
    } else {
      speed = 0;
      let currentAngle = this.angle;
    }
  }

  display() {
    this.update();
    rotate(this.angle);
    fill('#FFFFFF');
    circle(0, 0, this.radius);
    let currentAngle = PI;

    for (let i = 0; i < words.length; i++) {
      fill(segmentColor[i]);
      arc(this.x, this.y, this.radius, this.radius, currentAngle, currentAngle + angles[i]);

      push();
      textAlign(CENTER);
      textSize(43);
      fill('#000000');
      rotate((currentAngle - PI) + angles[i] / 2);
      translate(-this.radius * 0.4, 0);
      rotate(-PI / 2);
      text(words[i], 0, 0);
      pop();

      currentAngle += angles[i];
    }

    fill('#000000');
    circle(0, 0, 100);
  }
}

function findClosestObject(point, words, roulette) {
  let closestWord = "";
  let closestDist = Infinity;

  for (let i = 0; i < words.length; i++) {
    let angle = (PI - roulette.angle) + i * PI / 8;
    let radius = roulette.radius;
    let x = roulette.x + cos(angle) * radius;
    let y = roulette.y + sin(angle) * radius;

    let d = dist(point.x, point.y, x, y);

    if (d < closestDist) {
      closestDist = d;
      closestWord = words[i];
    }
  }

  return closestWord;
}
