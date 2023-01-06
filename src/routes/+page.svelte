<script>
	import { days } from '$lib/days';
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
			<a href="/day/{idx}" class="title">{day.title}</a>
			<span class="code"
				>(<a
					href="https://github.com/geoffrich/advent-of-sveltekit-2022/tree/main/src/routes/day/{idx}/+page.svelte"
					>code<span class="visually-hidden"> for solution {idx}</span></a
				>,
				<a href={day.repo}>challenge<span class="visually-hidden"> for solution {idx}</span></a
				>)</span
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
