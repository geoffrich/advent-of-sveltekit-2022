<script lang="ts">
	import { fade } from 'svelte/transition';
	export let size = 1;
</script>

{#if size > 1}
	<!-- Workaround for https://github.com/sveltejs/svelte/issues/5604 -->
	{#if $$slots.even}
		<svelte:self size={size - 1}>
			<!-- This tripped me up - combining slot= and name= -->
			<slot slot="lights" name="lights" />
			<slot slot="ornaments" name="ornaments" />
			<slot slot="even" name="even" />
			<slot slot="odd" name="odd" />
		</svelte:self>
	{:else}
		<svelte:self size={size - 1}>
			<slot slot="lights" name="lights" />
			<slot slot="ornaments" name="ornaments" />
		</svelte:self>
	{/if}
{/if}
<div class="tree" in:fade={{ delay: size * 100 }}>
	{#each { length: size } as _, idx}
		<div class="leaf">
			<slot name="lights" />
			{#if idx % 2 === 0}
				<slot name="even">
					<slot name="ornaments" />
				</slot>
			{:else}
				<slot name="odd">
					<slot name="ornaments" />
				</slot>
			{/if}
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
