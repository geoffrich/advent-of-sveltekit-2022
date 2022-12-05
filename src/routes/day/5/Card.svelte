<script lang="ts">
	import santa from './santa.svg';

	import { page } from '$app/stores';
	import { fly, fade } from 'svelte/transition';

	let to = $page.url.searchParams.get('to') ?? 'John';
	let from = $page.url.searchParams.get('from') ?? 'Joana';
</script>

<div class="card" in:fly={{ y: 20 }}>
	<div class="inner">
		<img src={santa} alt="Santa claus" />
		<div class="flow details">
			<h1>Happy Holidays!</h1>
			<div class="to label">TO: {to}</div>
			<div class="from label">FROM: {from}</div>
		</div>
	</div>
</div>

<form in:fade class="flow">
	<label for="to">To</label>
	<input id="to" name="to" bind:value={to} maxlength="30" />

	<label for="from">From</label>
	<input id="from" name="from" bind:value={from} maxlength="30" />
	<input type="submit" hidden />
</form>

<style>
	.card {
		width: 100%;
		max-width: 42rem;
		padding: 1rem;
		border-radius: var(--radius-2);
		background: var(--red-5);
		color: white;
	}

	.inner {
		border: var(--border-size-2) solid var(--gray-2);
		border-radius: var(--radius-2);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		/* Use flex-wrap instead of explicit breakpoints */
		flex-wrap: wrap;
		padding: 1rem;
	}

	img {
		max-width: 12em;
		flex-basis: 1;
	}

	.details {
		flex-basis: 2;
	}

	h1 {
		font-family: var(--font-serif);
		font-weight: 400;
		font-size: var(--font-size-6);
	}

	.label {
		background: white;
		color: black;
		padding: 0.5rem;
		border-radius: var(--radius-2);
	}

	.to {
		--flow-space: 1rem;
	}

	.from {
		--flow-space: 0.5rem;
	}

	label {
		display: block;
	}

	form,
	input {
		width: 100%;
	}

	input {
		background: var(--gray-1);
		border-radius: var(--radius-2);
		border: var(--border-size-2) solid var(--gray-3);
		--flow-space: 0.1rem;
		transition: outline-offset 250ms ease-out;
	}
</style>
