<script lang="ts">
	import { submitReplaceState } from '$lib/util';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ presents, step } = data);

	$: finalStep = presents.length - 1;

	let form: HTMLFormElement;
</script>

<h1>Find Joseph's Gift</h1>
<form on:submit={submitReplaceState} bind:this={form}>
	<label for="num">Pick a number from 2 to 30:</label>
	<input
		id="num"
		type="range"
		min="2"
		max="30"
		name="presents"
		on:input={() => form.requestSubmit()}
	/>

	<div class="controls">
		<button disabled={step === 1} name="step" value="1">Start</button>
		<button disabled={step === 1} name="step" value={step - 1}>Prev</button>
		<button disabled={step >= finalStep} name="step" value={step + 1}>Next</button>
		<button disabled={step >= finalStep} name="step" value={finalStep}>End</button>
	</div>
</form>

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

	form {
		display: contents;
	}

	.controls {
		display: flex;
		gap: 0.5rem;
	}
</style>
