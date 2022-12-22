<script lang="ts">
	import cats from './cats.jpeg';
	import svelte from './svelte.png';
	import piano from './piano.jpg';
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import { confetti } from '@neoconfetti/svelte';
	import { reducedMotion } from '$lib/reducedMotion';

	export let form: ActionData;

	$: clueNum = +($page.url.searchParams.get('clue') || 0);

	let clues = [
		"I've been playing piano for over 20 years 🎹",
		"I'm a member of the Svelte core team 🔶",
		'I have two cats 🐱'
	];

	let images = [piano, svelte, cats];

	let alts = ['Piano', 'Svelte machine', 'Two cats sitting on a staircase'];
</script>

<h1>Secret Santa</h1>

<p>Can you guess who I am? 🤫</p>

{#each { length: clueNum } as _, idx}
	<div in:slide class="flow">
		<h2>Clue {idx + 1}</h2>

		<p>{clues[idx]}</p>
		<img src={images[idx]} alt={alts[idx]} />
	</div>
{/each}

{#if clueNum === 3}
	<p>Do you know who I am? (Hint: it's the person who made this website!)</p>
	{#if form?.success && !$reducedMotion}
		<div use:confetti />
	{/if}
	<form method="post" class="flow" use:enhance>
		<label for="guess">Guess</label>
		<input id="guess" name="guess" autofocus={!!form?.error} />
		{#if form?.error}
			<p class="error">{form?.error}</p>
		{:else if form?.success}
			<p class="correct">Correct!</p>
		{/if}
	</form>
{:else}
	<form data-sveltekit-noscroll>
		<input type="hidden" name="clue" value={clueNum + 1} />
		<button>Next clue</button>
	</form>
{/if}

<style>
	img {
		max-width: 350px;
		width: 100%;
	}

	form p,
	h2 {
		text-align: center;
	}

	.error {
		color: var(--red-7);
	}

	.correct {
		color: var(--green-8);
	}
</style>
