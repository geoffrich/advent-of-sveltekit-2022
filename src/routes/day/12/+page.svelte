<script lang="ts">
	let numPresents = 5;
	let step = 1;
	let presents: boolean[] = [];
	// reset the game state when numPresents changes
	// because the solution changes
	$: resetGameState(numPresents);

	// needed to take an explicit dependency on presents here
	// otherwise, it wouldn't re-run when resetting if step didn't change
	$: presents = setEliminatedPresents(step, presents);

	$: finalStep = numPresents - 1;

	function setEliminatedPresents(step: number, oldPresents: boolean[]) {
		if (step > finalStep) return oldPresents;
		// there's probably a more efficient way that doesn't regenerate the entire array on every step
		// ¯\_(ツ)_/¯
		let presents = oldPresents.map(() => false);
		let pIdx = 1;
		for (let i = 0; i < step; i++) {
			let eliminated = pIdx % presents.length;
			while (presents[eliminated] && eliminated < presents.length) {
				eliminated = (eliminated + 1) % presents.length;
			}
			presents[eliminated] = true;
			pIdx += 2;
		}
		return presents;
	}

	function resetGameState(numPresents: number) {
		console.log('reset');
		presents = Array(numPresents).fill(false);
		step = 1;
	}
</script>

<h1>Find Joseph's Gift</h1>
<label for="num">Pick a number from 2 to 30:</label>
<input id="num" type="range" min="2" max="30" bind:value={numPresents} />
<div class="controls">
	<button disabled={step === 1} on:click={() => (step = 1)}>Start</button>
	<button disabled={step === 1} on:click={() => step--}>Prev</button>
	<button disabled={step >= finalStep} on:click={() => step++}>Next</button>
	<button disabled={step >= finalStep} on:click={() => (step = finalStep)}>End</button>
</div>

<p>Step: {step}</p>

<div class="presents">
	{#each presents as eliminated, idx}
		<div class="present" class:eliminated>{idx + 1}</div>
	{/each}
</div>

<style>
	.presents {
		display: grid;
		grid-template-columns: repeat(auto-fit, 50px);
		gap: 1rem;
		width: 100%;
		justify-content: center;
	}

	.present {
		border: 1px solid black;
		display: grid;
		place-items: center;
		aspect-ratio: 1/1;
	}

	.eliminated {
		border-style: dashed;
		border-width: 3px;
	}
</style>
