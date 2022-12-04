<script lang="ts">
	import { fly } from 'svelte/transition';
	export let key: any;

	const distance = 50;
	const duration = 700;

	const common = { duration, opacity: 1 };
</script>

{#key key}
	<dd in:fly={{ y: -1 * distance, ...common }} out:fly|local={{ y: distance, ...common }}>
		<slot />
	</dd>
{/key}

<style>
	dd {
		font-size: var(--font-size-5);
		grid-area: var(--area);
		overflow: hidden;
		display: block;
	}
</style>
