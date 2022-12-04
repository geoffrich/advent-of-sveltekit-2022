<script lang="ts">
	import { fade } from 'svelte/transition';
	export let size = 1;
</script>

{#if size > 1}
	<svelte:self size={size - 1} />
{/if}
<div class="tree" in:fade={{ delay: size * 100 }} style:--color="var(--green-{size})">
	{#each { length: size } as _}
		<div class="leaf" />
	{/each}
</div>

<style>
	.tree {
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-shrink: 1;
	}

	.leaf {
		position: relative;
		border-radius: var(--radius-round);
		background: var(--color);
		width: var(--size-9);
		height: var(--size-9);
		margin: -0.5rem;
		flex-shrink: 1;
	}
</style>
