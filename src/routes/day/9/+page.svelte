<script>
	import tree from './tree.svg';
	import presents from './presents';
	// one-line sparkle!
	import { flip } from 'svelte/animate';
	import { submitReplaceState } from '$lib/util';
	import { page } from '$app/stores';

	// not sure if there's a way to conditionally pass a form input
	$: sorted = $page.url.searchParams.get('sort') === 'true';

	const sortedPresents = [...presents].sort((a, b) => {
		return a.dimensions.width * a.dimensions.height - b.dimensions.width * b.dimensions.height;
	});

	$: displayPresents = sorted ? sortedPresents : presents;
</script>

<form class="container" on:submit={submitReplaceState}>
	<div>
		<img src={tree} alt="Christmas tree" />
	</div>
	<div class="presents">
		{#each displayPresents as present (present.id)}
			<img animate:flip src={present.src} alt="Present {present.id}" />
		{/each}
	</div>
	<input type="hidden" name="sort" value={!sorted} />
	<button>Toggle sort</button>
</form>

<style>
	.container {
		max-width: var(--size-content-2);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.presents {
		display: flex;
		justify-content: center;
		align-items: center;
		/* Let things go down on an extra line */
		flex-wrap: wrap;
	}

	button {
		max-width: 160px;
		font-size: var(--font-size-3);
		padding: 0.5rem 1rem;
		color: white;
		background: black;
		appearance: none;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background-color: var(--gray-8);
	}
</style>
