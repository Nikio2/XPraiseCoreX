const phrases = [
    "More than one person is late to 7:00",
    "PM is noodling again",
    "Rich pulls his guitar plug with loud pop",
    "Mike prays us out",
    "Someone asks if stuff needs to be put up",
    "Dotty says 'We can come back to that.'",
    "Mike has to be told to turn volume down",
    "PM eats candy",
    "Musical chairs with stage position",
    "Mike forgets to grab music",
    "Rich says a Gen Z phrase or sports reference",
    "Dotty stands and walks away unannounced",
    "Brent breaks out his sassy tone",
    "Brent has to give Rich his cue to sing",
    "Rich leaves his keys on music stand",
    "Mike plays more than one instrument",
    "Dotty shaking her head in disapproval of Brent's octave",
    "PM getting lost in the sauce of his pedal board",
    "LOREM IPSUM",
    "LOREM IPSUM",
    "LOREM IPSUM",
    "LOREM IPSUM",
    "LOREM IPSUM",
    "LOREM IPSUM",
    "1"
];
const ROWS = 5;
const COLS = 5;
const MAX_NUM = 25;

let currentPlayer = 1;
let player1Card;

function createBingoCard() {
    const card = [];
    const usedNumbers = new Set();

    while (phrases.size < ROWS * COLS) {
        const num =
            Math
                .floor(Math.random() *
                    MAX_NUM) + 1;
    }

    const phrasesArray =
        Array.from(phrases);
    for (let i = 0; i < ROWS; i++) {
        card.push(phrasesArray
            .slice(i * COLS, (i + 1) * COLS));
    }

    return card;
}

function displayBingoCard(card, containerId) {
    const container =
        document.getElementById(containerId);
    container.innerHTML = '';

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            const cell =
                document.createElement('div');
            cell.textContent = card[i][j];
            if (card[i][j] === 'X') {
                cell.classList.add('marked');
            }
            container.appendChild(cell);
        }
    }
}

function markNumber(card, number) {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (card[i][j] === number) {
                card[i][j] = 'X';
                return true;
            }
        }
    }
    return false;
}


function checkWin(card) {

    // Check rows and columns for a Bingo pattern 
    for (let i = 0; i < ROWS; i++) {
        let rowFilled = true;
        let colFilled = true;
        for (let j = 0; j < COLS; j++) {
            if (card[i][j] !== 'X') {
                rowFilled = false;
            }
            if (card[j][i] !== 'X') {
                colFilled = false;
            }
        }
        if (rowFilled || colFilled) {
            return true;
        }
    }

    // Check diagonals for a Bingo pattern 
    let diagonal1Filled = true;
    let diagonal2Filled = true;
    for (let i = 0; i < ROWS; i++) {
        if (card[i][i] !== 'X') {
            diagonal1Filled = false;
        }
        if (card[i][COLS - 1 - i] !== 'X') {
            diagonal2Filled = false;
        }
    }
    if (diagonal1Filled || diagonal2Filled) {
        return true;
    }

    return false;
}

document
    .getElementById('startButton')
    .addEventListener('click', () => {
        player1Card = createBingoCard();
        displayBingoCard(player1Card, 'player1Card');
        document
            .getElementById('markButton')
            .disabled = false;
        document
            .getElementById('startButton')
            .disabled = true;
        document
            .getElementById('resetButton')
            .disabled = false;
        document
            .getElementById('numberInput')
            .disabled = false;
        document
            .getElementById('turnDisplay')
            .textContent = 'Player 1\'s Turn';
    });

document
    .getElementById('resetButton')
    .addEventListener('click', () => {
        player1Card = createBingoCard();
        displayBingoCard(player1Card, 'player1Card');
        currentPlayer = 1;
        document
            .getElementById('numberInput')
            .value = '';
        document
            .getElementById('markButton')
            .disabled = false;
        document
            .getElementById('startButton')
            .disabled = true;
        document
            .getElementById('resetButton')
            .disabled = false;
        document
            .getElementById('numberInput')
            .disabled = false;
        document
            .getElementById('turnDisplay')
            .textContent = 'Player 1\'s Turn';
        document
            .getElementById('winDisplay')
            .textContent = ''; // Clear win message 
    });

document.getElementById('markButton')
    .addEventListener('click', () => {
        const numberInput = document
            .getElementById('numberInput');
        const number = parseInt(numberInput.value);

        if (number >= 1 &&
            number <= MAX_NUM) {
            if (markNumber(player1Card, number)) {
                displayBingoCard(player1Card, 'player1Card');

                if (checkWin(player1Card)) {
                    document
                        .getElementById('winDisplay')
                        .textContent =
                        '???? Player 1 has won the game! ????';
                    document
                        .getElementById('markButton')
                        .disabled = true;
                    document
                        .getElementById('numberInput')
                        .disabled = true;
                } else {
                    numberInput.value = '';
                    currentPlayer =
                        currentPlayer === 1 ? 2 : 1;
                    document
                        .getElementById('turnDisplay')
                        .textContent =
                        `Player ${currentPlayer}'s Turn`;
                }
            } else {
                alert(
                    'Number already marked or not found on any player card.');
            }
        } else {
            alert('Please enter a valid number between 1 and 25.');
        }
    });
