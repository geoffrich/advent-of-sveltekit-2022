<script lang="ts">
	import { Move, checkWinner, State } from './util';
	import Icon from './Icon.svelte';
	import EmptyCell from './EmptyCell.svelte';
	import { tick } from 'svelte';

	let board = getEmptyBoard();

	let turn = Move.O;
	let state = State.Playing;
	let boardEl: HTMLElement, statusEl: HTMLElement;

	function place(row: number, col: number) {
		board[row][col] = turn;
		turn = turn === Move.O ? Move.X : Move.O;
		tick().then(focusNextAvailableTile);
	}

	function focusNextAvailableTile() {
		const nextTile = boardEl.querySelector('button:not(:disabled)');
		if (nextTile) {
			(nextTile as HTMLElement).focus();
		} else {
			statusEl.focus();
		}
	}

	$: winner = checkWinner(board);
	$: state = getGameState(winner, board);

	function reset() {
		board = getEmptyBoard();
		tick().then(focusNextAvailableTile);
	}

	function getEmptyBoard() {
		return [
			[Move.Empty, Move.Empty, Move.Empty],
			[Move.Empty, Move.Empty, Move.Empty],
			[Move.Empty, Move.Empty, Move.Empty]
		];
	}

	function getGameState(winner: Move | undefined, board: Move[][]) {
		if (winner) {
			return State.Won;
		} else if (board.every((row) => row.every((col) => col !== Move.Empty))) {
			return State.Draw;
		} else {
			return State.Playing;
		}
	}
</script>

<h1>Tic-tac-toe</h1>

<div class="board" bind:this={boardEl}>
	{#each board as row, r}
		{#each row as col, c}
			<div class="cell">
				{#if col !== Move.Empty}
					<Icon move={col} />
				{:else}
					<EmptyCell on:click={() => place(r, c)} disabled={state !== State.Playing}>
						<span class="visually-hidden">Place row {r + 1} column {c + 1}</span>
					</EmptyCell>
				{/if}
			</div>
		{/each}
	{/each}
</div>

<div class="status" bind:this={statusEl} tabindex="-1">
	{#if state === State.Won}
		{winner} won.
	{:else if state === State.Draw}
		It's a draw!
	{:else}
		It's {turn}'s turn
	{/if}
</div>

{#if state !== State.Playing}
	<button on:click={reset}>Play again?</button>
{/if}

<style>
	.board {
		display: grid;
		grid-template-columns: repeat(3, minmax(auto, 100px));
		grid-template-rows: repeat(3, auto);
		gap: 0.25rem;
		background: var(--gray-4);
	}

	.cell {
		aspect-ratio: 1/1;
		background: white;
		padding: 0.5rem;
		height: 100px;
	}

	.status {
		font-size: var(--size-4);
	}

	button {
		background-color: var(--blue-3);
		border: none;
		border-radius: var(--radius-2);
		padding: 0.25rem 1rem;
		cursor: pointer;
		font-size: var(--size-5);
		color: black;
	}

	button:hover {
		transform: translateY(2px);
	}

	button:active {
		transform: scale(0.95);
		transition: transform 0.3s;
	}
</style>
