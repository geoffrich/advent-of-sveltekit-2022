<script lang="ts">
	import tree from './tree.svg?raw';
	import autoAnimate from '@formkit/auto-animate';
	import ChristmasPresent from './ChristmasPresent.svelte';
	export let presents: string[];
</script>

<div class="container" on:drop on:dragover|preventDefault on:dragenter|preventDefault>
	{@html tree}
	<div class="presents" use:autoAnimate>
		{#each presents as p (p)}
			<ChristmasPresent name={p} />
		{/each}
	</div>
</div>

<style>
	.container {
		position: relative;
		display: flex;
		justify-content: center;
	}

	.container > :global(svg) {
		width: 16rem;
	}

	.presents {
		display: flex;
		align-items: flex-end;
		position: absolute;
		bottom: -2rem;
		gap: -2rem;
	}

	/* Styles the middle present slightly in front of the other two */
	.presents > :global(div):nth-of-type(2) {
		margin-left: -2rem;
		margin-right: -2rem;
		z-index: var(--layer-2);
		margin-bottom: -1rem;
	}
</style>
