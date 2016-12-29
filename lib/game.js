'use strict';

var getRandomInt = function(value) {
	return Math.floor((Math.random() * value));
}

class Battleship {

	constructor(boardSize) {
		this.boardSize = boardSize;
		this.restart();
	}

	restart() {
		this.shipCount = 0;
		this.movesId = 0;
		this.boards = {'1': this._createBoard(), '2': this._createBoard()};
		this.setCurrentPlayerTurn('1');
		this.moves = [];
	}

	setCurrentPlayerTurn(player) {
		this.currentPlayerTurn = player;
		this.gameState = `Player ${player} turn`;
	}

	_createBoard() {
		var board = new Array(this.boardSize);
		for (var idx = 0; idx < this.boardSize; idx++) {
			board[idx] = new Array(this.boardSize);
			for (var columnIdx = 0; columnIdx < this.boardSize; columnIdx++) {
				board[idx][columnIdx] = {hit: false, row: idx, column: columnIdx};
			}
		}
		this.populateBoardWithRandomShips(board);
		return board;
	}

	populateBoardWithRandomShips(board) {
		/* Carrier */
		this.addShipToBoard(board, {char: 'C', size: 5});
		/* Battleship */
		this.addShipToBoard(board, {char: 'B', size: 4});
		this.addShipToBoard(board, {char: 'B', size: 4});
		/* Cruiser */
		this.addShipToBoard(board, {char: 'R', size: 3});
		this.addShipToBoard(board, {char: 'R', size: 3});
		this.addShipToBoard(board, {char: 'R', size: 3});
		/* Submarine */
		this.addShipToBoard(board, {char: 'S', size: 3});
		this.addShipToBoard(board, {char: 'S', size: 3});
		this.addShipToBoard(board, {char: 'S', size: 3});
		this.addShipToBoard(board, {char: 'S', size: 3});
		/* Destroyer */
		this.addShipToBoard(board, {char: 'D', size: 2});
		this.addShipToBoard(board, {char: 'D', size: 2});
		this.addShipToBoard(board, {char: 'D', size: 2});
		this.addShipToBoard(board, {char: 'D', size: 2});
		this.addShipToBoard(board, {char: 'D', size: 2});
	}

	addShipToBoard(board, shipData) {
		shipData.index = this.shipCount++;
		shipData.hit = false;
		
		var row, column, horizontal = getRandomInt(2);
		do {
			if (horizontal) {
				row = getRandomInt(this.boardSize);
				column = getRandomInt(this.boardSize - shipData.size);
			} else {
				row = getRandomInt(this.boardSize - shipData.size);
				column = getRandomInt(this.boardSize);
			}
		} while(this.checkOverlap(board, horizontal, row, column, shipData.size));

		for (var piece = 0; piece < shipData.size; piece++) {
			var pieceData = JSON.parse(JSON.stringify(shipData));
			pieceData.hit = false;
			pieceData.row = row;
			pieceData.column = column;

			board[row][column] = pieceData;
			if (horizontal) column++;
			else row++;
		}
	}

	checkOverlap(board, horizontal, row, column, size) {
		for (var piece = 0; piece < size; piece++) {
			if (board[row][column].char) {
				return true;
			}
			if (horizontal) column++;
			else row++;
		}
		return false;
	}

	makeMove(player, row, column) {
		if (this.currentPlayerTurn == player) {
			var board = this.getOtherPlayerBoard(player);
			board[row][column].hit = true;
			this.setCurrentPlayerTurn(player == '1' ? '2' : '1');
			this.moves.unshift({player: player, piece: board[row][column], id: this.movesId++});
			if (!this.isAlive(this.currentPlayerTurn)) {
				this.currentPlayerTurn = '0';
				this.gameState = `Player ${player} is a Winner!`;
			}
		}

		return this.getGameState(player);
	}

	isAlive(player) {
		var board = this.getPlayerBoard(player);
		return board.find((rows) => rows.find((cell) => cell.char && !cell.hit));
	}

	getPlayerBoard(player) {
		return this.boards[player];
	}

	getOtherPlayerBoard(player) {
		return this.getPlayerBoard(player == '1' ? '2' : '1');
	}

	getCurrentPlayerTurn() {
		return this.currentPlayerTurn;
	}

	getGameMoves() {
		return this.moves;
	}

	getGameState(player) {
		return {
			myTurn: this.getCurrentPlayerTurn() == player,
			myBoard: this.getPlayerBoard(player),
			enemyBoard: this.getOtherPlayerBoard(player),
			moves: this.getGameMoves(),
			gameState: this.gameState
		}
	}
}

module.exports = Battleship;