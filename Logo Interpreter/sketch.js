function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(0);
    stroke(255);
    fill(255);
    angleMode(DEGREES);
    turt = new Turtle(width/2, height/2, 0);
    turt.interpret(parse())
}
