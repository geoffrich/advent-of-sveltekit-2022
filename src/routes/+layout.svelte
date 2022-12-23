<script lang="ts">
	import './app.css';
	import { page } from '$app/stores';

	$: day = $page.data.day;
</script>

<svelte:head>
	{#if day}
		<title>Advent of SvelteKit - Day {day}</title>
	{:else}
		<title>Advent of SvelteKit</title>
	{/if}
</svelte:head>

<div class="container">
	<header>
		<a href="/" class="home">Advent of <span class="svelte">SvelteKit</span> 2022</a>
	</header>

	<main>
		<slot />
	</main>

	<footer>
		<p>Solutions by <a href="https://geoffrich.net">Geoff Rich</a></p>
	</footer>
</div>

<style>
	header,
	footer {
		margin: 0 auto;
		max-width: var(--size-content-3);
	}

	footer {
		padding-bottom: 1rem;
	}

	header {
		width: 100%;
		text-align: center;
	}

	.home {
		font-size: var(--font-size-fluid-2);
		font-weight: var(--font-weight-7);
	}

	header a {
		color: black;
	}

	.svelte {
		color: var(--svelte);
	}

	.container {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr auto;
		height: 100%;
		justify-content: start;
	}

	main {
		max-width: var(--size-content-3);
		margin: 0 auto 1rem auto;
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
</style>
