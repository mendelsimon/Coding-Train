const padding = 8; 
let board;

function setup() {
    let boardSize = 4;
    let padding = 8;
    console.log(boardSize * 100 + boardSize * padding);
    
    let canvasSize = boardSize * 100 + boardSize * padding;
    createCanvas(canvasSize, canvasSize);
    textSize(36);
    textAlign(CENTER, CENTER);
    board = new Board(boardSize, 8);
}

function draw() {
    board.draw();
}

function keyPressed() {
    move_keys = [
        LEFT_ARROW,
        RIGHT_ARROW,
        UP_ARROW,
        DOWN_ARROW,
    ];
    other_keys = [
        'R'.charCodeAt(0),
    ];
    oldBoard = board.copyBoard();
    if (keyCode === LEFT_ARROW) {
        board.left();
    } else if (keyCode === RIGHT_ARROW) {
        board.right();
    } else if (keyCode === UP_ARROW) {
        board.up();
    } else if (keyCode === DOWN_ARROW) {
        board.down();
    } else if (keyCode === 'R'.charCodeAt(0)) {
        board.reset();
    }
    if (move_keys.includes(keyCode) && !board.boardEquals(oldBoard)) {
        board.spawn();
    }
}