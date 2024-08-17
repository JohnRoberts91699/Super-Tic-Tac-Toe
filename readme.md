# Super-Tic-Tac-Toe

**[Live Demo](https://your-deployed-site-url.com)**

## Description

Super-Tic-Tac-Toe is an advanced version of the classic Tic-Tac-Toe game. It features a 9x9 grid, divided into nine 3x3 mini-boards. Players take turns placing their marks on the grid, and the location of a player's move determines where the next player must place their mark. The game adds layers of strategy by introducing the concept of mini-board victories, which contribute to winning the overall game.

## Features

- **9x9 Game Grid**: The game board is made up of nine 3x3 grids, allowing for a more complex and strategic gameplay.
- **Mini-Board Victories**: Players can win individual 3x3 mini-boards, and winning a certain number of these can lead to an overall victory.
- **Dynamic Player Moves**: Each player's move determines where the next player must place their mark.
- **Draw Conditions**: The game accounts for draw scenarios in both mini-boards and the overall game.
- **User Authentication**: Players can sign up, log in, and have their game stats tracked.
- **Win/Loss Tracking**: The application tracks wins and losses for each player during their session.

### Why These Features Were Chosen

- **9x9 Grid & Mini-Board Victories**: To add complexity and strategy beyond the standard Tic-Tac-Toe.
- **User Authentication & Stats Tracking**: To personalize the game experience and make it competitive by keeping track of performance.
- **Draw Conditions**: To handle edge cases where neither player wins, enhancing the game's robustness.

## Tests

### Location
The tests for the Super-Tic-Tac-Toe application are located in the `test.js` file.

### Running Tests
To run the tests, open the `test.js` file in a browser or use Node.js by running the following command in the terminal:

```bash
node test.js
