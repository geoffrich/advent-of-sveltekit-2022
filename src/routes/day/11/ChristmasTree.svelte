<script lang="ts">
	import { fade } from 'svelte/transition';
	export let size = 1;
</script>

{#if size > 1}
	<svelte:self size={size - 1}>
		<slot />
	</svelte:self>
{/if}
<div class="tree" in:fade={{ delay: size * 100 }}>
	{#each { length: size } as _}
		<div class="leaf">
			<slot />
		</div>
	{/each}
</div>

<style>
	.tree {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.leaf {
		position: relative;
		border-radius: var(--radius-round);
		background: var(--green-6);
		width: var(--size-9);
		height: var(--size-9);
		margin: -0.5rem;
		display: flex;
		justify-content: center;
		place-items: center;
	}
</style>
