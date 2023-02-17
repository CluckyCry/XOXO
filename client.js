// DOM Manipulation
// querySelector
const buttons = document.querySelectorAll('.tictactoe');
const turns = document.querySelectorAll('.turn')

const O = turns[0]
const X = turns[1]

const first_turn_display = document.getElementById('firstTurn')

const wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
] // the wins!

const reset = document.getElementById('reset')

let isOn = false;
let won = false
let turn;
let first_turn = 'X'

function checkForWin() {
    let winner = false
    wins.forEach(win=>{
        //console.log(win)
        let match = 0
        let prev = null;
        win.forEach(index=>{
            let button = buttons[index]
            if (!button.value == '') {
            if (prev == null) {
                //console.log('Prev is not there')
                match = 1
                prev = button.value
            }
            else {
                //console.log('Prev is there')
                if (button.value == prev) {
                    match += 1
                }
                else {
                    return null;
                }
            }
            if (match > 2) {
                winner = win;
            }
        }})
    })
    return winner
}

function onClick(event) {
    if (won) {return}
    console.log(!isOn && 'Initiated a game' || 'Game in progress')
    isOn = true;
    let button = event.currentTarget

    if (!button.value == '') {
        return;
    }

    button.style.color = 'white'
    button.value = turn
    turn = (turn == 'X' && 'O') || 'X'
    // check for win...
    const winner = checkForWin() // returns the pattern
    //console.log(winner)
    if (winner) {
        won = true;
        isOn = false;
        // Gotta do something to indicate the winner
        winner.forEach(e=>{
            let button = buttons[e]
            button.style.color = 'green'
        })
        // We have a winner!
        setTimeout(initializeButtons, 3000)
    }
    else {
        // if there is no winner, we check if all the buttons have a value that isn't ''
        let matchings = []
        initializeButtons(keys=>{
            keys.forEach(ind=>{
                let button = buttons[ind]
                if (!button.value == '') {
                    matchings.push(button);
                }
            })
        })
        if (matchings.length >= buttons.length) {
            // draw
            matchings.forEach(btn=>{
                btn.style.color = 'red'
            })
            setTimeout(initializeButtons, 3000)
        }
    }
}

function initializeButtons(callback) {
    if (callback && typeof(callback) == 'function') { // if there is an argument passed as a callback
        callback(Object.keys(buttons))
        return
    }
    turn = first_turn
    won = false

    for (let i = 0; i < buttons.length; i++) {

        const button = buttons[i]
        button.value = ''
        button.style.color = "rgba(0, 0, 0, 0.5)"

        button.removeEventListener('click', onClick)
        // adding event listener
        button.addEventListener('click', onClick);
    }
}

function changeFirst_turn(event) {
    const change = event.currentTarget.value;
    if (change) {
        first_turn = change;
        first_turn_display.innerHTML = `${first_turn} plays first!`

        if (!isOn) {
            turn = first_turn
        }
    }
}

initializeButtons() // initializing buttons
reset.addEventListener('click', initializeButtons)
O.addEventListener('click', changeFirst_turn)
X.addEventListener('click', changeFirst_turn)