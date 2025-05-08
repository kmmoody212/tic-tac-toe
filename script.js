
// MAKE A GAMEBOARD THAT GOES IN AN ARRAY -AN ARRAY OF SQUARES(SPACES) 3x3

let gameboard = (function() {
    board = [];

    for (i = 0; i < 3; i++) {
        board[i] = [];
        for (j = 0; j < 3; j++) {
            board[i][j] = 0;
        }
    }
    return board;
}

)();

console.log(gameboard);

