class Board {
    tile_colors = {
        0: ['#f9f6f2', '#f9f6f2'],
        2: ['#776e65', '#eee4da'],
        4: ['#776e65', '#ede0c8'],
        8: ['#f9f6f2', '#f2b179'],
        16: ['#f9f6f2', '#f59563'],
        32: ['#f9f6f2', '#f67c5f'],
        64: ['#f9f6f2', '#f65e3b'],
        128: ['#f9f6f2', '#edcf72'],
        256: ['#f9f6f2', '#edcc61'],
        512: ['#f9f6f2', '#edc850'],
        1024: ['#f9f6f2', '#edc53f'],
        2048: ['#f9f6f2', '#edc22e'],
    }

    other_colors = {
        bg: '#000',
        tile_bg: '#fff',
    }

    constructor(boardSize, padding = 8) {
        this.BOARD_SIZE = boardSize;
        this.PADDING = padding;
        this.SQAURE_SIZE = (width - padding * (boardSize + 1)) / boardSize;
        this.reset();
    }

    reset() {
        this.board = [];
        for (let _ = 0; _ < this.BOARD_SIZE; _++) {
            let row = []
            for (let __ = 0; __ < this.BOARD_SIZE; __++) {
                row.push(0);
            }
            this.board.push(row);
        }
    
        this.spawn();
        this.spawn();
    }
    
    draw() {
        background(this.other_colors['bg']);
        for (let row = 0; row < this.BOARD_SIZE; row++) {
            for (let col = 0; col < this.BOARD_SIZE; col++) {
                let value = this.board[row][col];
                let colors = this.tile_colors[value] || ['#fff', '#000'];
                fill(colors[1]);
                let x = col * (this.SQAURE_SIZE + this.PADDING) + this.PADDING;
                let y = row * (this.SQAURE_SIZE + this.PADDING) + this.PADDING;
                
                rect(x, y, this.SQAURE_SIZE, this.SQAURE_SIZE, 10);
                fill(colors[0]);
                if (value !== 0) {
                    text(value, x + this.SQAURE_SIZE / 2, y + this.SQAURE_SIZE / 2);
                }
            }
        }
    }

    left() {
        let oldBoard = board.copyBoard();
        this.board = this.board.map(row => this.combineRow(row));
    }

    right() {
        this.reverseBoard();
        this.left()
        this.reverseBoard();
    }

    up() {
        this.transposeBoard();
        this.left();
        this.transposeBoard();
    }

    down() {
        this.transposeBoard();
        this.reverseBoard();
        this.left();
        this.reverseBoard();
        this.transposeBoard();
    }
    
    shiftRow(row) {
        let size = row.length;
        row = row.filter(x => x !== 0);
        while (row.length < size) {
            row.push(0);
        }
        return row;
    }
    
    combineRow(row) {
        row = this.shiftRow(row);
        for (let i = 0; i < row.length - 1; i++) {
            if (row[i] !== 0 && row[i] === row[i + 1]) {
                row[i] = row[i] * 2;
                row[i + 1] = 0;
                i++;
            }
        }
        row = this.shiftRow(row);
        return row;
    }
    
    transposeBoard() {
        let newBoard = [];
        for (let row = 0; row < this.BOARD_SIZE; row++) {
            let newRow = [];
            for (let col = 0; col < this.BOARD_SIZE; col++) {
                newRow.push(this.board[col][row]);
            }
            newBoard.push(newRow);
        }
        this.board = newBoard;
    }
    
    reverseBoard() {
        this.board.map(row => row.reverse());
    }
    
    spawn() {
        let empties = this.findEmpties();
        if (empties.length === 0) {
            return;
        }
        let space = random(empties);
        let num = random([2, 2, 2, 4]);
        this.board[space[0]][space[1]] = num;
        if (this.isGameOver()) {
            this.reset();
        }
    }
    
    findEmpties() {
        let empties = [];
        for (let row = 0; row < this.BOARD_SIZE; row++) {
            for (let col = 0; col < this.BOARD_SIZE; col++) {
                if (this.board[row][col] === 0) {
                    empties.push([row, col]);
                }
            }
        }
        return empties;
    }
    
    copyBoard() {
        let newBoard = [];
        for (let row = 0; row < this.BOARD_SIZE; row++) {
            let newRow = this.board[row].slice();
            newBoard.push(newRow);
        }
        return newBoard;
    }
    
    boardEquals(oldBoard) {
        for (let row = 0; row < oldBoard.length; row++) {
            for (let col = 0; col < oldBoard.length; col++) {
                if (oldBoard[row][col] !== this.board[row][col]){
                    return false;
                }
            }
        }
        return true;
    }

    isGameOver() {
        for (let row = 0; row < this.BOARD_SIZE; row++) {
            for (let col = 0; col < this.BOARD_SIZE; col++) {
                if ((row < this.BOARD_SIZE - 1 && this.board[row][col] === this.board[row + 1][col])
                    || (col < this.BOARD_SIZE - 1 && this.board[row][col] === this.board[row][col + 1])
                    || this.board[row][col] === 0) {
                        return false;
                }
            }
        }
        return true;
    }
}