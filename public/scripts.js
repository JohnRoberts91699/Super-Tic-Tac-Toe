document.addEventListener("DOMContentLoaded", function() {
    let currentPlayer = "X";
    let boardState = Array(9).fill(null).map(() => Array(9).fill(null));
    let miniBoardWinners = Array(9).fill(null);

    function checkMiniBoardWinner(miniBoard) {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (miniBoard[a] && miniBoard[a] === miniBoard[b] && miniBoard[a] === miniBoard[c]) {
                return miniBoard[a];
            }
        }
        return null;
    }

    function updateMiniBoardWinner(miniBoardIndex, winner) {
        const miniBoardElement = document.querySelectorAll('.mini-board')[miniBoardIndex];
        miniBoardElement.classList.add(`winner-${winner}`);
        miniBoardWinners[miniBoardIndex] = winner;
    }

    function checkOverallWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (miniBoardWinners[a] && miniBoardWinners[a] === miniBoardWinners[b] && miniBoardWinners[a] === miniBoardWinners[c]) {
                alert(`Player ${miniBoardWinners[a]} wins the game!`);
                resetGame();
                return true;
            }
        }
        return false;
    }

    function handleCellClick(event) {
        const cell = event.target;
        const miniBoardIndex = parseInt(cell.getAttribute('data-miniboard-index'));
        const cellIndex = parseInt(cell.getAttribute('data-cell-index'));
        
        if (!cell.textContent && !miniBoardWinners[miniBoardIndex]) {
            cell.textContent = currentPlayer;
            boardState[miniBoardIndex][cellIndex] = currentPlayer;
            const miniBoardWinner = checkMiniBoardWinner(boardState[miniBoardIndex]);
            if (miniBoardWinner) {
                updateMiniBoardWinner(miniBoardIndex, miniBoardWinner);
                if (checkOverallWinner()) {
                    return;
                }
            }
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    function generateBoard() {
        const boardContainer = document.getElementById('board');
        boardContainer.innerHTML = ''; // Clear any existing board

        for (let i = 0; i < 9; i++) {
            const miniBoard = document.createElement('div');
            miniBoard.classList.add('mini-board');

            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-miniboard-index', i);
                cell.setAttribute('data-cell-index', j);
                cell.addEventListener('click', handleCellClick);
                miniBoard.appendChild(cell);
            }

            boardContainer.appendChild(miniBoard);
        }
    }

    function resetGame() {
        boardState = Array(9).fill(null).map(() => Array(9).fill(null));
        miniBoardWinners = Array(9).fill(null);
        currentPlayer = "X";
        generateBoard();
    }

    document.getElementById('show-signup').addEventListener('click', function() {
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('signup-container').classList.remove('hidden');
    });

    document.getElementById('show-login').addEventListener('click', function() {
        document.getElementById('signup-container').classList.add('hidden');
        document.getElementById('login-container').classList.remove('hidden');
    });

    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        let username = document.getElementById('login-username').value;
        document.getElementById('username').textContent = username;
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');
        document.getElementById('avatar').classList.remove('hidden');
        generateBoard();
    });

    document.getElementById('signup-form').addEventListener('submit', function(event) {
        event.preventDefault();
    });

    generateBoard();
});
