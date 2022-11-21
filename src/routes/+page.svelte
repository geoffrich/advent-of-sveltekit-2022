<script>
	const MAX_DAY = 0;
</script>

<main>
	<p>
		The <a href="https://adventofvue.com/">Advent of Vue</a> challenges, but in
		<a href="https://kit.svelte.dev/">SvelteKit</a>. Code for my solutions is available on
		<a href="https://github.com/geoffrich/advent-of-sveltekit-2022">GitHub</a>
	</p>
	<ul>
		{#each { length: MAX_DAY + 1 } as _, idx}
			<li><a href="/day/{idx}">Day {idx}</a></li>
		{/each}
	</ul>
</main>

<style>
	main {
		padding: 1rem;
		max-width: var(--size-content-3);
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
