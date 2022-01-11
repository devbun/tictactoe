//misc: enter names, restart, 

const allEqual = arr => arr.every( v => v === arr[0] )

function playerCreate(name, symbol, controller) {
    let score = 0;

    const getScore = () => score;

    const addScore = () => {
        score += 1
        scoreUpdate()
    }

    const move = tile => {
        if (gameBoard[tile] == '' && canMove == true) {
          gameBoard[tile] = symbol;
          boardUpdate()
          checkerWinner()
        }
    }

    return {name, symbol, controller, score, move, getScore, addScore} //does controller need public access?
}

function swapPlayer() {
    activePlayer = activePlayer == 0 ? 1 : 0;
    document.getElementById('textbox').textContent = `It is ${players[activePlayer].name}'s turn.`
    document.getElementById('textbox').style.color = activePlayer == 0 ? 'var(--colour-playerX)' : 'var(--colour-playerO)'
    //if active player is ai have them do move

    if (players[activePlayer].controller == 'CPU') {
        while (true) {
            let trymove = Math.floor(Math.random() * gameBoard.length)
            console.log('random tile' + trymove)
            if (gameBoard[trymove] == '') {
                makeMove(trymove)
                break
            }
        }
    }
}

function boardNew() {
  gameBoard = ['', '', '', '', '', '', '', '', '']
  canMove = true
  swapPlayer()
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
        tile.style.color = gameBoard[i] == 'X' ? 'var(--colour-playerX)' : 'var(--colour-playerO)';
        board.appendChild(tile);
    }
}

function previewMove(id) {
    tile = document.getElementById(id);
    if (gameBoard[id] == '') {
        tile.textContent = players[activePlayer].symbol
        tile.style.color = "gray"
    }
}

function unpreviewMove(id) {
    tile = document.getElementById(id);
    if (gameBoard[id] == '') {
        tile.textContent = ''
    }
}

function scoreUpdate() {
    score = document.getElementById('score');
    score.innerHTML = ''
    for (let i = 0; i < players.length; i++) {
        const scorecard = document.createElement('div');
        scorecard.textContent = `${players[i].name}: ${players[i].getScore()} win`;
        if (players[i].getScore() !== 1) {
            scorecard.textContent += 's'
        }
        score.appendChild(scorecard)
    }
}

function makeMove(tile) {
    //console.log(players[activePlayer].name + tile)
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
        
        textbox = document.getElementById('textbox')

        textbox.textContent = players[activePlayer].name + ' wins!'
        textbox.style.color = activePlayer == 0 ? 'var(--colour-playerX)' : 'var(--colour-playerO)'

        players[activePlayer].addScore()

        canMove = false

        console.log("win button test")

        nextRoundButton()

       } else if (!gameBoard.includes('')) { 
        document.getElementById('textbox').textContent = `It's a draw!`
        canMove = false

        nextRoundButton()
       } else {

       swapPlayer()

       }
}

function nextRoundButton() {
    const nextRound = document.createElement('div');
    nextRound.textContent = `Next Round`
    nextRound.classList.add('btn'); 
    nextRound.setAttribute('onclick', 'boardNew()');
    textbox.appendChild(nextRound);
}

//TODO: Turn controller, AI, next game button, proper reset

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