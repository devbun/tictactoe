// o players
// public make move

//o game board
//public functions:
// update display
//private functions:
//check for winner

//o scoreboard
//update
//check for match win/lose/tie

//misc: enter names, restart, 
players = []

function playerCreate(name, symbol, controller) {
    const move = tile => {
        if (gameBoard[tile] == '') {
          gameBoard[tile] = symbol;
          boardUpdate()
          activePlayer = activePlayer == 0 ? 1 : 0;
        }
    }
    return {name, symbol, controller, move} //does controller need public access?
}

function boardNew() {
  gameBoard = ['', '', '', '', '', '', '', '', '']
  boardUpdate()
}

function boardUpdate() {
    console.log('yo')
    board = document.getElementById('board');
    board.innerHTML = '';

    for (let i = 0; i < gameBoard.length; i++) {
        console.log('boi ' + i)
        const tile = document.createElement('div');
        tile.textContent = gameBoard[i];
        tile.setAttribute('id', i);
        tile.classList.add('tile'); 
        tile.setAttribute('onclick', 'makeMove(this.id)');
        board.appendChild(tile);
    }
}

function scoreUpdate() {
    score = document.getElementById('score');
    score.innerHTML = ''
    for (let i = 0; i < players.length; i++) {
        const scorecard = document.createElement('div');
        scorecard.textContent = players[i].name + ': 0' //add player score
        score.appendChild(scorecard)
    }
}

function makeMove(tile) {
    console.log(players[activePlayer].name + tile)
    players[activePlayer].move(tile)
}

//testing
boardNew()
const Conan = playerCreate('Conan', 'X', 'Human');
players.push(Conan);
const Emma = playerCreate('Emma', 'O', 'Human');
players.push(Emma);

var activePlayer = 0

Conan.move(4)
boardUpdate()
console.log(gameBoard)
Conan.move(2)
boardUpdate()
console.log(gameBoard)
scoreUpdate()