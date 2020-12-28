const resetButton = document.querySelector('#reset');
const p1Button = document.querySelector('#p1Button');
const p2Button = document.querySelector('#p2Button');
const p1Display = document.querySelector('#p1Display');
const p2Display = document.querySelector('#p2Display');
const winningScoreSelect = document.querySelector('#playto');

// set initial variables
let p1Score = 0;
let p2Score = 0;
let winningScore = 5;
let isGameOver = false;

p1Button.addEventListener('click', function() {
    if(!isGameOver) {
        // increment score by 1
        p1Score += 1;
        if(p1Score === winningScore) {
            isGameOver = true;
            // add 'winner' and 'loser classes to display
            p1Display.classList.add('winner');
            p2Display.classList.add('loser');
        }
        // save result in html span object
        p1Display.textContent = p1Score;
    }
})

p2Button.addEventListener('click', function() {
    if(!isGameOver) {
        // increment score by 1
        p2Score += 1;
        if(p2Score === winningScore) {
            isGameOver = true;
            // add 'winner' and 'loser classes to display
            p2Display.classList.add('winner');
            p1Display.classList.add('loser');
        }
        // save result in html span object
        p2Display.textContent = p2Score;
    }
})

winningScoreSelect.addEventListener('change', function() {
    winningScore = parseInt(this.value);
    reset(); // here, we are executing reset function !
})

// here, we aren't executing 'reset', we're passing a reference !
// so, no parenthesis to use !
resetButton.addEventListener('click', reset);

function reset() {
    // reinitialize variables to 0
    isGameOver = false;
    p1Score = 0;
    p2Score = 0;
    // update display
    p1Display.textContent = 0;
    p2Display.textContent = 0;
    // remove format classes added (if any)
    p1Display.classList.remove('winner', 'loser');
    p2Display.classList.remove('winner', 'loser');
}