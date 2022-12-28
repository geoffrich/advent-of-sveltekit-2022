<script lang="ts">
	import type { PageData } from './$types';
	import { invalidate } from '$app/navigation';
	import { flip } from 'svelte/animate';

	export let data: PageData;
</script>

<h1>Secret Santa List Generator</h1>

<h2>Matches</h2>

<ul>
	{#each data.matches as { giver, receiver, id } (id)}
		<li animate:flip>
			<strong>{giver.name} 🎅</strong> is the Secret Santa of <strong>{receiver.name} 🎁</strong>
		</li>
	{/each}
</ul>

<form>
	<button on:click={() => invalidate(data.key)}>Shuffle 🎲</button>
</form>
<a href="/day/14">Go back</a>

<style>
	ul {
		width: 100%;
		list-style: none;
		margin: 0;
		padding: 1rem;
		border: 2px solid var(--gray-6);
		border-radius: var(--radius-3);
	}

	ul > * + * {
		margin-top: 0.5rem;
	}

	button,
	a {
		font-size: var(--font-size-2);
		padding: 0.5rem 1rem;
		color: white;
		background: var(--color);
		appearance: none;
		border: none;
		border-radius: var(--radius-2);
		cursor: pointer;
		text-decoration: none;

		--color: var(--red-8);
		--hover: var(--red-9);
	}

	button:hover {
		background-color: var(--hover);
	}

	a {
		--color: var(--green-8);
		--hover: var(--green-9);
	}
</style>
