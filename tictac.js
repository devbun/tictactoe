//misc: enter names, restart, 

const allEqual = arr => arr.every( v => v === arr[0] )

function playerCreate(name, symbol, controller) {
    let score = 0;

    const getScore = () => score;

    const addScore = () => {
        score += 1
    }

    const move = tile => {
        if (gameBoard[tile] == '') {
          gameBoard[tile] = symbol;
          boardUpdate()
          checkerWinner()
          activePlayer = activePlayer == 0 ? 1 : 0;
        }
    }

    return {name, symbol, controller, score, move, getScore, addScore} //does controller need public access?
}

function boardNew() {
  gameBoard = ['', '', '', '', '', '', '', '', '']
  var activePlayer = Math.random() //ONLY works for 2 player
  boardUpdate()
  scoreUpdate()
}

function boardUpdate() {
    console.log('yo')
    board = document.getElementById('board');
    board.classList.add('board'); 
    board.innerHTML = '';

    for (let i = 0; i < gameBoard.length; i++) {
        // console.log('boi ' + i)
        const tile = document.createElement('div');
        tile.textContent = gameBoard[i];
        tile.setAttribute('id', i);
        tile.classList.add('tile'); 
        tile.setAttribute('onclick', 'makeMove(this.id)');
        tile.setAttribute('onmouseover', 'previewMove(this.id)');
        tile.setAttribute('onmouseout', 'unpreviewMove(this.id)');
        board.appendChild(tile);
    }
}

function previewMove(id) {
    tile = document.getElementById(id);
    console.log("preview for " + id)
    if (gameBoard[id] == '') {
        tile.textContent = players[activePlayer].symbol
        tile.style.color = "gray"
    }
}

function unpreviewMove(id) {
    tile = document.getElementById(id);
    console.log("unpreview for " + id)
    if (gameBoard[id] == '') {
        tile.textContent = ''
        tile.style.color = "black"
    }
}

function scoreUpdate() {
    score = document.getElementById('score');
    score.innerHTML = ''
    for (let i = 0; i < players.length; i++) {
        const scorecard = document.createElement('div');
        scorecard.textContent = `${players[i].name} (${players[i].symbol}): ${players[i].getScore()} wins`;
        score.appendChild(scorecard)
    }
}

function makeMove(tile) {
    console.log(players[activePlayer].name + tile)
    players[activePlayer].move(tile)
}

function checkerWinner() {
    if (
        //Horizontal
       (allEqual( [gameBoard[0], gameBoard[1], gameBoard[2], players[activePlayer].symbol ])) || 
       (allEqual( [gameBoard[3], gameBoard[4], gameBoard[5], players[activePlayer].symbol ])) || 
       (allEqual( [gameBoard[6], gameBoard[7], gameBoard[8], players[activePlayer].symbol ])) || 

       //vertical
       (allEqual( [gameBoard[0], gameBoard[3], gameBoard[6], players[activePlayer].symbol ])) || 
       (allEqual( [gameBoard[1], gameBoard[4], gameBoard[7], players[activePlayer].symbol ])) || 
       (allEqual( [gameBoard[2], gameBoard[5], gameBoard[8], players[activePlayer].symbol ])) || 

       //Diagonal
       (allEqual( [gameBoard[0], gameBoard[4], gameBoard[8], players[activePlayer].symbol ])) || 
       (allEqual( [gameBoard[2], gameBoard[4], gameBoard[6], players[activePlayer].symbol ])) 
       ) {
        console.log('feeeeesh')
        alert(players[activePlayer].name + ' wins!')
        players[activePlayer].addScore()
        boardNew()
       } else if (!gameBoard.includes('')) { 
        alert('Draw!')
        boardNew()
       }
}

//TODO: Turn controller, AI, next game button

function startGame() {
    let p1Name = document.getElementById('name1').value;
    let p1Controller = document.getElementById('CPU1').checked ? 'CPU' : 'Human';

    let p2Name = document.getElementById('name2').value;
    let p2Controller = document.getElementById('CPU2').checked ? 'CPU' : 'Human';

    document.getElementById('startup').style.display = 'none'

    newGame(p1Name, p1Controller, p2Name, p2Controller)
}

function newGame(player_1_name, player_1_controller, player_2_name, player_2_controller) {
    players = []

    const PlayerX = playerCreate(player_1_name, 'X', player_1_controller);
    players.push(PlayerX);
    const PlayerO = playerCreate(player_2_name, 'O', player_2_controller);
    players.push(PlayerO);

    boardNew()
}

var activePlayer = 0