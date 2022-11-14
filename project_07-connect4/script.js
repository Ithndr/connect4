//game object, stores data relating to the game stats
let game = {
    playing: false,
    seconds: 0,
    minutes: 0,
    win: '',
    p1: 0,
    p2: 0,
    posY: 0
}

//initialize some variables relating to the ui and board
let playBtn = document.getElementById('start');
let resBtn = document.getElementById('restart');
let seconds = document.getElementById('seconds');
let minutes = document.getElementById('minutes');
let board = document.getElementById('board');
let showPlayer = document.getElementById("currPlayer");
let rows = document.querySelectorAll('tr');

//defualt color for p1 is red
playerColor = 'red';

//starts and stops timer and will allow the player to make a play
playBtn.addEventListener('click', function (advanceTime) {
    if (game.playing === false) {
        game.playing = true;
        playBtn.innerText = 'Pause';
        playBtn.style.backgroundColor = 'red';
    }
    else {
        ;
        game.playing = false;
        playBtn.innerText = 'Play';
        playBtn.style.backgroundColor = 'green';
    }
})

resBtn.addEventListener('click', function () {
    window.location.reload();
})



//-------------------CREATE A BOARD LOADER HERE FOR LATER WHEN IMPLEMENTING GAME RESET-------------------//
// function makeTable() {
//     for (let i = 0; i < 6; i++) {
//         const newTr = document.createElement("tr");
//         for (let j = 0; j < 7; j++) {
//             const newTd = document.createElement("td");
//             newTr.appendChild(newTd);
//         }
//         board.appendChild(newTr);
//     }
// }
// playBtn.addEventListener('click',makeTable());

//changing board background to the players token, should run after the 'start' button is pressed
function makePlay(event) {
    //dont allow play to be made until game is started
    if (game.playing === false) return;
    const target = event.target;
    let xpos = event.target.innerText;
    if (playerColor === 'red' && target.tagName === 'TD' 
    && target.className !== 'yellow' && target.className !== 'red') {
        dropCoin(playerColor, xpos);
        playerColor = 'yellow'
        showPlayer.innerText = '2\'s turn'
    }
    else if (playerColor === 'yellow' && target.tagName === 'TD' 
    && target.className !== 'red' && target.className !== 'yellow') {
        dropCoin(playerColor, xpos);
        playerColor = 'red';
        showPlayer.innerText = '1\'s turn'
    }
}
board.addEventListener('click', makePlay);

//color will be determinded by which players turn it is, xpos will be the cell in the current row.
//function will check to see the lowest row in that cell position 0-6 (xpos)
function dropCoin(coinColor, xpos) {
    for (let i = 5; i > -1; i--) {
        if (rows[i].children[xpos].className.length)
            continue;
        else
            return rows[i].children[xpos].className = coinColor;
    }

}

//checks for four in a row horizontal, vertical and diagonal
function checkWin() {
    let lastPiece = rows[0].children[0];
    //horizontal check
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 3; j++) {
            //checks initial postion and 3 in front of it to determine if there a 4 of a kind
            //makes sure it isnt blank also*
            if (rows[i].children[j].className === rows[i].children[j + 1].className
                && rows[i].children[j].className === rows[i].children[j + 2].className
                && rows[i].children[j].className === rows[i].children[j + 3].className
                && rows[i].children[j].className !== '') {
                game.win = rows[i].children[j].className;
                // game.playing = false;
            }
        }
    }
    //vertical check
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
            //checks each row with the same column position to check and see if the columns match
            //ignores blank spaces
            if (rows[j].children[i].className === rows[j + 1].children[i].className
                && rows[j].children[i].className === rows[j + 2].children[i].className
                && rows[j].children[i].className === rows[j + 3].children[i].className
                && rows[j].children[i].className !== '') {
                game.win = rows[j].children[i].className;
            }
        }
    }
    //diagonal check
    //checks the diagonal in both directions
    //step up check, checks diagonal like upward staircase
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
            if (rows[j].children[i].className === rows[j + 1].children[i + 1].className
                && rows[j].children[i].className === rows[j + 2].children[i + 2].className
                && rows[j].children[i].className === rows[j + 3].children[i + 3].className
                && rows[j].children[i].className !== '') {
                game.win = rows[j].children[i].className;
            }
        }
    }
    //step down check
    //checks diagonal like downward staircase
    for (let i = 0; i < 3; i++) {
        for (let j = 5; j > 2; j--) {
            if (rows[j].children[i].className === rows[j - 1].children[i + 1].className
                && rows[j].children[i].className === rows[j - 2].children[i + 2].className
                && rows[j].children[i].className === rows[j - 3].children[i + 3].className
                && rows[j].children[i].className !== '') {
                game.win = rows[j].children[i].className;
            }
        }
    }
    //full board check (no win)
    let colCheck = 0;
   for(let i = 0;i<5;i++){
       if(rows[i].children[0].className !== ''
       && rows[i].children[1].className !== ''
       && rows[i].children[2].className !== ''
       && rows[i].children[3].className !== ''
       && rows[i].children[4].className !== ''
       && rows[i].children[5].className !== ''
       && rows[i].children[6].className !== '')
        colCheck++;
   }
   if(colCheck === 6)
    showPlayer.innerText = 'Full Board No Win!'
}

//timer
function advanceTime() {
    if (game.playing === false) {
        return;
    }
    //create timer for minutes and seconds once start is pressed
    seconds.innerText = game.seconds;
    minutes.innerText = game.minutes;
    game.seconds++;
    if (game.seconds === 60) {
        game.minutes++;
        game.seconds = 0;
    }
}
//tick speed
setInterval(function () {
    if (!game.playing) return;
    advanceTime();
    checkWin();
    if (game.win === 'red') {
        showPlayer.innerText = '1 Wins!';
        game.playing = false;
    }
    else if (game.win === 'yellow') {
        showPlayer.innerText = '2 Wins!';
        game.playing = false;
    }
}, 1000)
