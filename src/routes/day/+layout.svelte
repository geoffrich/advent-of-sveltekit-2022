<script lang="ts">
	import CodeBlock from '$lib/CodeBlock.svelte';
	import type { LayoutData } from './$types';
	import { days } from '$lib/days';
	import { slide } from 'svelte/transition';

	export let data: LayoutData;

	$: day = data.day;

	$: showNext = day < days.length - 1;
	$: showPrev = day > 0;
</script>

<nav class="items" in:slide>
	<svelte:element
		this={showPrev ? 'a' : 'div'}
		class="item"
		href={showPrev ? `/day/${day - 1}` : null}
		aria-hidden={showPrev ? undefined : 'true'}
	>
		<span class="visually-hidden">Previous day</span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
			/>
		</svg>
	</svelte:element>
	{#each days as _, idx}
		{@const isCurrent = idx === day}
		<a class="item" class:current={isCurrent} href="/day/{idx}">{idx}</a>
	{/each}
	<svelte:element
		this={showNext ? 'a' : 'div'}
		class="item"
		href={showNext ? `/day/${day + 1}` : null}
		aria-hidden={showNext ? undefined : 'true'}
	>
		<span class="visually-hidden">Next day</span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
			/>
		</svg>
	</svelte:element>
</nav>

<slot />
<h2>Source code</h2>
{#each data.code as { filename, source }}
	<h3>
		<a
			class="codelink"
			href="https://github.com/geoffrich/advent-of-sveltekit-2022/tree/main/src/routes/day/{day}/{filename}"
			><code>{filename}</code></a
		>
	</h3>
	<CodeBlock {source} />
{/each}

<style>
	h2,
	h3 {
		font-weight: 400;
	}

	h2 {
		margin-top: 2rem;
	}

	code {
		padding: 0.5rem;
		display: block;
		background: var(--gray-2);
		border-radius: var(--radius-2);
	}

	.codelink {
		color: black;
	}

	.item {
		--primary: var(--red-7);
		border-radius: var(--radius-round);
		background: var(--primary);
		height: 2.5rem;
		width: 2.5rem;
		display: grid;
		place-items: center;
		color: white;
		border: 1px solid var(--primary);
		text-decoration: none;
		transition: border 250ms;
		font-weight: 700;
	}

	.item:nth-child(2n) {
		--primary: var(--green-7);
	}

	.item.current {
		border: 3px solid black;
	}

	.items {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.item svg {
		width: var(--size-5);
	}

	/* enforce a11y via CSS! */
	.item[aria-hidden] {
		filter: grayscale();
	}
</style>
