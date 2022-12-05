<script>
	const titles = [
		'Tic-tac-toe',
		'Gift search bar',
		'Christmas joke generator',
		'Christmas countdown',
		'Recursive Christmas tree',
		'Gift label'
	];
</script>

<p>
	The <a href="https://adventofvue.com/">Advent of Vue</a> challenges, but in
	<a href="https://kit.svelte.dev/">SvelteKit</a>. Code for my solutions is available on
	<a href="https://github.com/geoffrich/advent-of-sveltekit-2022">GitHub</a>.
</p>
<p>
	Many of the solutions work without JavaScript through the magic of ✨ progressive enhancement ✨
</p>
<ol start="0">
	{#each titles as title, idx}
		<li>
			<a href="/day/{idx}">{title}</a>
			<a
				class="code"
				href="https://github.com/geoffrich/advent-of-sveltekit-2022/tree/main/src/routes/day/{idx}/+page.svelte"
				>(code) <span class="visually-hidden">for solution {idx}</span></a
			>
		</li>
	{/each}
</ol>

<style>
	.code {
		font-size: var(--font-size-0);
	}

	ol {
		align-self: start;
	}
</style>
