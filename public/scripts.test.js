// Function to simulate making a move in the game
function simulateMove(boardState, miniBoardIndex, cellIndex, player) {
    boardState[miniBoardIndex][cellIndex] = player;
}

// Test for making a valid move
function testValidMove() {
    let boardState = Array(9).fill(null).map(() => Array(9).fill(null));
    simulateMove(boardState, 0, 0, "X");
    console.assert(boardState[0][0] === "X", "Test failed: Valid move should place 'X' in the correct position.");
    console.log("testValidMove passed.");
}

// Test for preventing an invalid move
function testInvalidMove() {
    let boardState = Array(9).fill(null).map(() => Array(9).fill(null));
    simulateMove(boardState, 0, 0, "X");
    simulateMove(boardState, 0, 0, "O"); // Trying to overwrite the same spot
    console.assert(boardState[0][0] === "X", "Test failed: Invalid move should not overwrite existing move.");
    console.log("testInvalidMove passed.");
}

// Test for winning a mini-board
function testMiniBoardWin() {
    let boardState = Array(9).fill(null).map(() => Array(9).fill(null));
    simulateMove(boardState, 0, 0, "X");
    simulateMove(boardState, 0, 1, "X");
    simulateMove(boardState, 0, 2, "X");
    let miniBoardWinner = checkMiniBoardWinner(boardState[0]);
    console.assert(miniBoardWinner === "X", "Test failed: X should win the mini-board.");
    console.log("testMiniBoardWin passed.");
}

// Test for draw in a mini-board
function testMiniBoardDraw() {
    let boardState = [
        ["X", "O", "X"],
        ["X", "O", "O"],
        ["O", "X", "X"]
    ];
    let miniBoardWinner = checkMiniBoardWinner(boardState);
    console.assert(miniBoardWinner === null, "Test failed: This mini-board should be a draw.");
    console.log("testMiniBoardDraw passed.");
}

// Test for winning the overall game
function testOverallGameWin() {
    let miniBoardWinners = ["X", "X", "X", null, null, null, null, null, null];
    let overallWinner = checkOverallWinner(miniBoardWinners);
    console.assert(overallWinner === "X", "Test failed: X should win the overall game.");
    console.log("testOverallGameWin passed.");
}

// Run all tests
function runTests() {
    testValidMove();
    testInvalidMove();
    testMiniBoardWin();
    testMiniBoardDraw();
    testOverallGameWin();
}

runTests();
