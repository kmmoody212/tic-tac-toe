
// //////////////////// THE GAMEBOARD ITSELF //////////////////////////
let gameboard = (function() {
    let board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i][j] = 0;
        }
    }
       
    return board;

})();

// console.log(gameboard);

// //////////////////// FUNCTION TO CREATE PLAYERS //////////////////////////

function player(name, marker) {
    return { name, marker }
};
const player1 = player('Player 1', 'X');
const player2 = player('Player 2', 'O');

// //////////////////// FUNCTION TO UPDATE THE GAMEBOARD ////////////////////////
function updateBoard(i, j, marker) {
    this.marker = player.marker;
    return gameboard[i][j] = marker;
    } 

