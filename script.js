
// //////////////////// THE GAMEBOARD ITSELF //////////////////////////
let gameboard = (function() {
    let board = [];
    const container = document.querySelector(".board"); // need container to append divs to

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            let square = document.createElement("div"); // need to set created element to a variable
            square.classList.add("square"); // give the created div a class name
            square.addEventListener("click", function() {
                console.log(`Square clicked at row ${i} and column ${j}`);
                updateBoard(i, j);
            })
            container.appendChild(square); // need to append each div so it shows in window
            board[i][j] = square; // now each space in a 2d array is attached to a "square" (div)
        
        }
    }
    
    // Method to show the board
    function getBoard() {
    return board;
    }
    
    // Method to update the board
    function updateBoard(i, j) {
    game.checkPlayerTurn();    
    let marker = currentPlayer.marker;
    if (board[i][j].textContent === '') {
        board[i][j].textContent = marker;
        if(checkForWin()) {
            console.log(`CONGRATS ${currentPlayer.name}! YOU WIN!`);
            resetBoard();
        };
        game.nextTurn();
    } else {console.log(`THAT SLOT IS ALREADY TAKEN! TRY AGAIN`)}
    
    return board;
    } 

    // Method to check for win
    function checkForWin() {
        // check through rows
        for (let row = 0; row < 3; row++) {
            if (board[row][0].textContent === currentPlayer.marker && board[row][1].textContent === currentPlayer.marker && board[row][2].textContent === currentPlayer.marker) {
                return true;
            } 
        }
        // check through columns
        for (let col = 0; col < 3; col++) {
            if (board[0][col].textContent === currentPlayer.marker && board[1][col].textContent === currentPlayer.marker && board[2][col].textContent === currentPlayer.marker) {
                return true;
            }
        }
        // check diagonals
        if ((board[0][0].textContent === currentPlayer.marker && board[1][1].textContent === currentPlayer.marker && board[2][2].textContent === currentPlayer.marker) 
         || (board[2][0].textContent === currentPlayer.marker && board[1][1].textContent === currentPlayer.marker && board[0][2].textContent === currentPlayer.marker)) {
            return true;
        } 
        return false;
    }
    // Method to reset each space in the board to 0
    function resetBoard() {
    game.start()
    
    }

    return {
        getBoard,
        updateBoard,
        checkForWin,
        resetBoard
        
    };

})();


// ////////////////////// FUNCTION TO CREATE PLAYER OBJECT //////////////////
function player(name, marker) {
    return { name, marker }
};
const player1 = player('PLAYER 1', 'X');
const player2 = player('PLAYER 2', 'O');


// //////////////////////// LOGIC FOR THE GAME //////////////////////////////
let game = (function() {
    let turn = 0;
    function start() {
        turn = 1;
        console.log(turn)
        return gameboard.getBoard();

    }
    // Method to check which player's turn it is
    function checkPlayerTurn() {
        if (turn % 2 === 0) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    // Method to count number of turns taken - tic tac toe only needs max 9 turns
    function nextTurn() {
        if (turn === 9) {
            console.log(`IT'S A TIE!`);
            return gameboard.resetBoard();
        } else {
            turn += 1;
            return console.log(turn)
        }
        
    }

    return {
        start,
        checkPlayerTurn,
        nextTurn,
    }
})();

// /////////////////////////////// STARTS THE GAME RIGHT AWAY //////////////////////
game.start();

// // win condition example
// gameboard.updateBoard(0, 1)
// gameboard.updateBoard(0, 0)
// gameboard.updateBoard(1, 2)
// gameboard.updateBoard(1, 0)
// gameboard.updateBoard(2, 2)
// gameboard.updateBoard(2, 0)
