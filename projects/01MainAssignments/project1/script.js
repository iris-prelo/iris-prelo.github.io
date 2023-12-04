let letters = [];
let gravity;
let size = 140

const wordNum = 1;

function preload() {
	font = loadFont('font 1.otf');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();
	for (let i = 0; i < wordNum; i++) {
		letters.push(new letter(random(width/2), random(height/2), 1, random(-2, 2), random(-2, 2)));
	}

	gravity = createVector(0, 1.1)

}

function draw() {
	background('#FF6DEF');

  let mY= constrain(mouseY, 0, height)
	gravity.y = mY * 0.001;

	for (let i = 0; i < letters.length; i++) {
		letters[i].update();
		letters[i].display();

	}

}

class letter {

	constructor(x, y, size, vx, vy) {
		this.loc = createVector(x, y);
		this.velocity = createVector(vx, vy);
		this.size = size;
		this.w = this.size
		this.h = this.size;
		this.t = "BOUNCE"
	}

	update() {
		this.velocity.add(gravity);
		this.loc.add(this.velocity);
		
		let speed = abs(this.velocity.y)
		let squashFactor = map(speed,0,25,1,2);
		squashFactor = constrain(squashFactor,1,2);
	
	
		if (this.loc.x + this.velocity.x > width - textWidth(this.t) * 9|| this.loc.x < 0) {
			this.velocity.x = this.velocity.x * -1;
		}

		if (this.loc.y >  height - this.h ) {
			this.loc.y = height - this.size;
			this.velocity.y = this.velocity.y * -1;
	
			
		}
		if ( this.loc.y  < 200+this.h) {
			this.loc.y = 200 + this.size;
			this.velocity.y = this.velocity.y * -1;
		}
		
		/*if (this.loc.y+this.velocity.y> height-30 || this.loc.y < 0) {
		squashFactor = map(speed,0,3, 1, 0.9);
		squashFactor = constrain(squashFactor,0.9,1);
		}*/
		
		this.h = this.size*2*squashFactor;
	
	}
	
	display() {
		push()
		fill('#FFDAFB');
		let x = this.loc.x;
		let y = this.loc.y;
		textSize(size);
		textFont(font);
		translate(x, y)
		scale(1,this.h);
		text(this.t, 0,0);
		pop();
	}

}