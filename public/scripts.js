document.addEventListener("DOMContentLoaded", () => {
    const startGameButton = document.getElementById("startGame");
    const showRulesButton = document.getElementById("showRules");
    const showAuthButton = document.getElementById("showAuth");
    const gameBoard = document.getElementById("gameBoard");
    const rulesSection = document.getElementById("rulesSection");
    const authSection = document.getElementById("authSection");
    const authForm = document.getElementById("authForm");
    const authTitle = document.getElementById("authTitle");
    const authSubmit = document.getElementById("authSubmit");
    const toggleAuthButton = document.getElementById("toggleAuth");

    let currentPlayer = 'X';
    let gameState = Array(9).fill(null).map(() => Array(9).fill(null));
    let miniBoardWinners = Array(9).fill(null);
    let gameActive = true;
    let nextBoardIndex = -1;

    startGameButton.addEventListener("click", startGame);
    showRulesButton.addEventListener("click", () => showSection('rules'));
    showAuthButton.addEventListener("click", () => showSection('auth'));
    authSubmit.addEventListener("click", handleAuthSubmit);
    toggleAuthButton.addEventListener("click", toggleAuthMode);

    function startGame() {
        gameBoard.style.display = "grid";
        rulesSection.style.display = "none";
        authSection.style.display = "none";
        initializeGameBoard();
    }

    function showSection(section) {
        if (section === 'rules') {
            rulesSection.style.display = 'block';
            authSection.style.display = 'none';
            gameBoard.style.display = 'none';
        } else if (section === 'auth') {
            authSection.style.display = 'block';
            rulesSection.style.display = 'none';
            gameBoard.style.display = 'none';
            authForm.style.display = 'block';
        }
    }

    function toggleAuthMode() {
        if (authTitle.textContent === 'Login') {
            authTitle.textContent = 'Signup';
            authSubmit.textContent = 'Signup';
            toggleAuthButton.textContent = 'Switch to Login';
        } else {
            authTitle.textContent = 'Login';
            authSubmit.textContent = 'Submit';
            toggleAuthButton.textContent = 'Switch to Signup';
        }
    }

    async function handleAuthSubmit(event) {
        event.preventDefault(); 
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        if (authTitle.textContent === 'Login') {
            login(username, password);
        } else {
            signup(username, password);
        }
    }

    async function login(username, password) {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                alert(`Login successful. Wins: ${data.wins}, Losses: ${data.losses}`);
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function signup(username, password) {
        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (response.ok) {
                alert('Signup successful');
            } else {
                alert('Signup failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function initializeGameBoard() {
        gameState = Array(9).fill(null).map(() => Array(9).fill(null));
        miniBoardWinners = Array(9).fill(null);
        gameActive = true;
        nextBoardIndex = -1;
        currentPlayer = 'X';

        const miniBoards = document.querySelectorAll('.mini-board');
        miniBoards.forEach((board, boardIndex) => {
            board.innerHTML = '';
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.dataset.cellIndex = i;
                cell.dataset.boardIndex = boardIndex;
                cell.classList.add('cell');
                cell.addEventListener('click', handleCellClick);
                board.appendChild(cell);
            }
        });
    }

    function handleCellClick(event) {
        const cell = event.target;
        const boardIndex = parseInt(cell.dataset.boardIndex);
        const cellIndex = parseInt(cell.dataset.cellIndex);

        if (gameState[boardIndex][cellIndex] !== null || !gameActive || (nextBoardIndex !== -1 && nextBoardIndex !== boardIndex)) {
            return;
        }

        gameState[boardIndex][cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner(gameState[boardIndex])) {
            miniBoardWinners[boardIndex] = currentPlayer;
            document.getElementById(`board-${boardIndex}`).classList.add(`winner-${currentPlayer}`);
        }

        if (checkWinner(miniBoardWinners)) {
            gameActive = false;
            alert(`${currentPlayer} wins the game!`);
            return;
        }

        if (miniBoardWinners.every(winner => winner !== null)) {
            gameActive = false;
            alert('The game is a draw!');
            return;
        }

        nextBoardIndex = cellIndex;
        if (miniBoardWinners[nextBoardIndex] !== null) {
            nextBoardIndex = -1;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWinner(board) {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winningCombinations.some(combination =>
            combination.every(index => board[index] === currentPlayer)
        );
    }
});
