<script>
	import { days } from './days';
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
	{#each days as day, idx}
		<li>
			<a href="/day/{idx}">{day}</a>
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
