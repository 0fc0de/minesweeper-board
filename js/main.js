const AROUND_CELL_OPERATORS = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
];
const minesweeper = new Minesweeper(9, 9, 10);
const $board = document.getElementById('board');
const $btn = document.getElementById('btn');

minesweeper.printBoard($board);

$btn.addEventListener('click', () => {
    $board.innerHTML = "";
    minesweeper.init();
    minesweeper.printBoard($board);
});