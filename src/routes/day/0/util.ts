export enum Move {
	X = 'X',
	O = 'O',
	Empty = ''
}

export enum State {
	Playing,
	Draw,
	Won
}

export function checkWinner(board: Move[][]) {
	for (const row of board) {
		if (row.every((v) => v === Move.X) || row.every((v) => v === Move.O)) {
			return row[0];
		}
	}

	for (let i = 0; i < board[0].length; i++) {
		if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
			return board[0][i];
		}
	}

	if (board[1][1] === Move.Empty) {
		return;
	}

	if (board[0][0] === board[1][1] && board[1][1] == board[2][2]) {
		return board[0][0];
	}

	if (board[0][2] && board[0][2] === board[1][1] && board[1][1] == board[2][0]) {
		return board[0][2];
	}
}
