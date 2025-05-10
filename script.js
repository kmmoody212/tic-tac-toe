
// //////////////////// THE GAMEBOARD ITSELF //////////////////////////
let gameboard = (function() {
    let board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i][j] = 0;
        }
    }
    
    // create method to get board
    function getBoard() {
    return board;
    }

    // create method to update the board
    function updateBoard(i, j) {
    game.checkPlayerTurn();    
    let marker = currentPlayer.marker;
    if (board[i][j] === 0) {
        board[i][j] = marker;
        if(checkForWin()) {
            console.log(`CONGRATS ${currentPlayer.name}! YOU WIN!`);
            resetBoard();
        };
        game.nextTurn();
    } else {console.log(`THAT SLOT IS ALREADY TAKEN! TRY AGAIN`)}
    
    return console.log(board);
    } 

    // create method to check for win
    function checkForWin() {
        // check through rows
        for (let row = 0; row < 3; row++) {
            if (board[row][0] === currentPlayer.marker && board[row][1] === currentPlayer.marker && board[row][2] === currentPlayer.marker) {
                return true;
            } 
        }
        // check through columns
        for (let col = 0; col < 3; col++) {
            if (board[0][col] === currentPlayer.marker && board[1][col] === currentPlayer.marker && board[2][col] === currentPlayer.marker) {
                return true;
            }
        }
        // check diagonals
        if ((board[0][0] === currentPlayer.marker && board[1][1] === currentPlayer.marker && board[2][2] === currentPlayer.marker) 
         || (board[2][0] === currentPlayer.marker && board[1][1] === currentPlayer.marker && board[0][2] === currentPlayer.marker)) {
            return true;
        } 
        return false;
    }

    function resetBoard() {
    board[0][0] = 0;
    board[0][1] = 0;
    board[0][2] = 0;
    board[1][0] = 0;
    board[1][1] = 0;
    board[1][2] = 0;
    board[2][0] = 0;
    board[2][1] = 0;
    board[2][2] = 0;
    game.start()
    
    }

    return {
        getBoard,
        updateBoard,
        resetBoard,
        checkForWin
    };

})();



function player(name, marker) {
    return { name, marker }
};
const player1 = player('PLAYER', 'X');
const player2 = player('PLAYER 2', 'O');



let game = (function() {
    let turn = 0;
    function start() {
        turn = 1;
        
        return console.log(gameboard.getBoard())

    }

    function checkPlayerTurn() {
        if (turn % 2 === 0) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    // function squareSelect(i, j) {
    //     gameboard.updateBoard(i, j);
    //     console.log(turn);
    //     return console.log(gameboard.getBoard());
    // }

    function nextTurn() {
        if (turn === 9) {
            console.log(`IT'S A TIE!`);
            return gameboard.resetBoard();
        } else {
            return turn += 1;
        }
        
    }

    return {
        start,
        checkPlayerTurn,
        // squareSelect,
        nextTurn,
    }
}());

game.start();

// // win condition example
// gameboard.updateBoard(0, 1)
// gameboard.updateBoard(0, 0)
// gameboard.updateBoard(1, 2)
// gameboard.updateBoard(1, 0)
// gameboard.updateBoard(2, 2)
// gameboard.updateBoard(2, 0)
