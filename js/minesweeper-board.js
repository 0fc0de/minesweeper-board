
class Minesweeper {
    constructor(boardRowsLength, boardColumnsLength, minesLength) {
        this.boardRowsLength = boardRowsLength;
        this.boardColumnsLength = boardColumnsLength;
        this.minesLength = minesLength;
        this.board = [];
        this.minesPositions = [];
        
        this.init();
    }

    init() {
        this.generateEmptyBoard();
        this.generateMinesPositions();
        this.insertMines();
        this.updateBoardNumbers();
    }

    generateEmptyBoard() {
        for (let y = 0; y < this.boardRowsLength; y++) {
            this.board.push([]);
            for (let x = 0; x < this.boardColumnsLength; x++) {
                this.board[y][x] = 0;
            }
        }
    }

    generateMinesPositions() {
        this.minesPositions = [];
        
        while (this.minesPositions.length < this.minesLength) {
            const y = this.getRandomInt(0, this.boardRowsLength);
            const x = this.getRandomInt(0, this.boardColumnsLength);

            if (!this.isAlreadyAMine([y, x])) {
                this.minesPositions.push([y, x]);
            }
        }
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    isAlreadyAMine(minePosition) {
        return this.minesPositions.join(" ").includes(minePosition.toString());
    }

    insertMines() {
        for (let i = 0; i < this.minesPositions.length; i++) {
            const y = this.minesPositions[i][0];
            const x = this.minesPositions[i][1];
            this.board[y][x] = "M";
        }
    }

    updateBoardNumbers() {
        for (let i = 0; i < this.minesPositions.length; i++) {
            for (let j = 0; j < AROUND_CELL_OPERATORS.length; j++) {
                const minePosition = this.minesPositions[i];
                const around = AROUND_CELL_OPERATORS[j];
                const boardY = minePosition[0] + around[0];
                const boardX = minePosition[1] + around[1];

                if (boardY >= 0 && boardY < this.boardRowsLength &&
                    boardX >= 0 && boardX < this.boardColumnsLength &&
                    typeof this.board[boardY][boardX] === 'number') {
                    this.board[boardY][boardX]++;
                }
            }
        }
    }

    printBoard($board) {
        for (let y = 0; y < this.board.length; y++) {
            const $row = document.createElement('DIV');
            $row.classList.add('row');
            
            for (let x = 0; x < this.board[y].length; x++) {
                const $cell = document.createElement('SPAN');
                $cell.classList.add('cell');

                $cell.innerHTML = this.board[y][x];
                $row.appendChild($cell);
            }

            $board.appendChild($row);
        }
    }
}
