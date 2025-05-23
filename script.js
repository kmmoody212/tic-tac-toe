
// //////////////////// THE GAMEBOARD ITSELF //////////////////////////
let gameboard = (function() {
    let board = [];
    const container = document.querySelector(".board"); // need container to append divs to
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            let square = document.createElement("div"); // need to set created element to a variable
            square.classList.add("square"); // give the created div a class name
            square.style.fontSize = "2.5rem";
            square.addEventListener("click", function() {
                game.playerTurnMessage();
                updateBoard(i, j);
            })
            container.appendChild(square); // need to append each div so it shows in window
            board[i][j] = square; // now each space in a 2d array is attached to a "square" (div)
            
        }
    }
    
    // Method to show the board - for outside variables to access
    function getBoard() {
    return board;
    }
    
    // Method to update the board
    function updateBoard(i, j) {
    game.checkPlayerTurn(); // first, check which player's turn it is
    let marker = currentPlayer.marker; // marker to be placed belongs to the current player
    if (board[i][j].textContent === '') { // if the content in the target square is blank - 
        board[i][j].textContent = marker; // set the content to player's marker
        if(checkForWin()) { // and if checkForWin() comes back true, do the following:
            showModal();
        } else {
            game.nextTurn();
            game.playerTurnMessage();
        }} else {
            console.log(`THAT SLOT IS ALREADY TAKEN! TRY AGAIN`)}
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

    // Method to reset each space in the board
    function resetBoard() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.textContent = '';
    })
    return game.start();
    }

//  Method to show and hide the modal/popup
    const modal = document.querySelector(".modal-container");
    const button = document.getElementById("restart")
    const winMsg = document.querySelector(".modal-content")
    function showModal() {
       modal.classList.remove("hidden");
       game.winnerMessage();
       console.log("the modal should be showing with the winning message")
    }

    button.addEventListener("click", () => {
            modal.classList.add("hidden");
            winMsg.removeChild(winMsg.firstChild);
            resetBoard();
            console.log("Close Modal worked and game has been reset!")
        })
    
    

    return {
        getBoard,
        updateBoard,
        checkForWin,
        resetBoard,
        showModal,
        
        
    };

})();


// ////////////////////// FUNCTION TO CREATE PLAYER OBJECT //////////////////
function player(name, marker) {
    return { name, marker }
};


const player1 = player('PLAYER 1', "🐸");
const player2 = player('PLAYER 2', "🪰");


// //////////////////////// LOGIC FOR THE GAME //////////////////////////////
let game = (function() {
    let turn = 0;
    function start() {
        turn = 1;
        console.log(turn)
        playerTurnMessage();
        return gameboard.getBoard();

    }

    function playerTurnMessage() {
        let whosTurn = document.querySelector(".player-turn");
        checkPlayerTurn();
        if(turn % 2 === 0 ) {
            whosTurn.textContent = `It's PLAYER 2's turn!`
        } else {
            whosTurn.textContent = `It's PLAYER 1's turn!`
        }
        
    }

    function winnerMessage() {
        let msg = document.querySelector(".modal-content")
        let winMsg = document.createElement("h2");

        if (turn === 9) {
            winMsg.textContent = `IT'S A TIE!!`
        } else {
        winMsg.textContent = `CONGRATS ${currentPlayer.name}! YOU WIN!!!`;
        }
        return msg.insertBefore(winMsg, msg.firstChild)
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
            gameboard.showModal();
        } else {
            turn += 1;
            return console.log(turn)
        }
        
    }


    return {
        start,
        playerTurnMessage,
        winnerMessage,
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
