document.addEventListener('DOMContentLoaded', () => {
    const bigTable = document.querySelector('.big_table');
    const turnDisplay = document.getElementById('turn');
    const newGameButton = document.getElementById('newGame');
    const startGameButton = document.getElementById('startGameButton');

    let currentPlayer = 'red';
    let gameActive = false;

    const toggleTurn = () => {
        currentPlayer = currentPlayer === 'red' ? 'blue' : 'red';
        turnDisplay.textContent = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}’s turn…`;
        turnDisplay.className = currentPlayer;
    };

    const handleCellClick = (e) => {
        if (!gameActive) return;

        const cell = e.target;
        if (cell.classList.contains('filled')) return;

        cell.classList.add('filled', currentPlayer);
        toggleTurn();
    };

    const startGame = () => {
        gameActive = true;
        bigTable.style.display = 'table';
        turnDisplay.style.display = 'block';
        newGameButton.style.display = 'block';
        startGameButton.style.display = 'none';
    };

    const resetGame = () => {
        document.querySelectorAll('.little_table td').forEach(cell => {
            cell.classList.remove('filled', 'red', 'blue');
        });
        currentPlayer = 'red';
        gameActive = true;
        turnDisplay.textContent = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}’s turn…`;
        turnDisplay.className = currentPlayer;
    };

    bigTable.addEventListener('click', handleCellClick);
    startGameButton.addEventListener('click', startGame);
    newGameButton.addEventListener('click', resetGame);

    // Authentication
    const loginForm = document.getElementById('login');
    const signupForm = document.getElementById('signup');
    const showSignupButton = document.getElementById('showSignupButton');
    const showLoginButton = document.getElementById('showLoginButton');
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    showSignupButton.addEventListener('click', () => {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    showLoginButton.addEventListener('click', () => {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    loginButton.addEventListener('click', async () => {
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (data.success) {
            alert('Login successful');
            document.getElementById('auth').style.display = 'none';
            document.getElementById('game').style.display = 'block';
        } else {
            alert(data.message);
        }
    });

    signupButton.addEventListener('click', async () => {
        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('signupPassword').value;

        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (data.success) {
            alert('Signup successful');
            signupForm.style.display = 'none';
            loginForm.style.display = 'block';
        } else {
            alert(data.message);
        }
    });
});
