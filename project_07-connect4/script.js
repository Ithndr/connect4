//game object, stores data relating to the game stats
let game = {
    playing: false,
    seconds: 0,
    minutes: 0,
    win: false,
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
//defualt color for p1 is red
playerColor = 'red';

//starts and stops timer and will allow the player to make a play
playBtn.addEventListener('click', function (advanceTime) {
    if (game.playing === false) {
        game.playing = true;
        playBtn.innerText = 'Pause';
    }
    else {
        ;
        game.playing = false;
        playBtn.innerText = 'Play';
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
    console.log(event.target.innerText);
    console.log(board.children);
    if (playerColor === 'red' && event.target.tagName === 'TD') {
        target.className = 'red';
        playerColor = 'yellow'
        showPlayer.innerText = '2\'s turn'
    }
    else if (playerColor === 'yellow' && event.target.tagName === 'TD') {
        target.className = 'yellow';
        playerColor = 'red';
        showPlayer.innerText = '1\'s turn'
    }

}
board.addEventListener('click', makePlay);
let pos = makePlay.target;
console.log(pos);
//will bring peice down to lowest point possible in column
function pieceGrav() {
    for (let i = 5; i > -1; i--) {
        if(board.children[i].className.length)
            continue;
        else
            board.children[i].className = playerColor;
    }
}

//checks for four in a row horizontal, vertical and diagonal
function checkWin() {
    //horizontal check

    //vertical check

    //diagonal check

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
    advanceTime()
}, 1000)
