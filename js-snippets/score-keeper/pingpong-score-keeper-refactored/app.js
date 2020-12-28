const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
}
const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
}

const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');
let winningScore = 5;
let isGameOver = false;

function updateScores(player, opponent) {
    if(!isGameOver) {
        // increment score by 1
        player.score += 1;
        if(player.score === winningScore) {
            isGameOver = true;
            // add 'winner' and 'loser classes to display
            player.display.classList.add('winner');
            opponent.display.classList.add('loser');
        }
        // save result in html span object
        player.display.textContent = player.score;
    }
}

p1.button.addEventListener('click', function() {
    updateScores(p1, p2);
})
p2.button.addEventListener('click', function() {
    updateScores(p2, p1);
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
    // loop along all players
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('winner', 'loser');
    }
}