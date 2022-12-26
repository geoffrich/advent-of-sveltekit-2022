<script lang="ts">
	import type { PRNG } from 'seedrandom';
	import { getContext } from 'svelte';
	let random = getContext<PRNG>('rng');

	const AMPLIFY = 20;
	const offsetY = 16 + (random() * AMPLIFY - AMPLIFY / 2);
	const offsetX = 16 + (random() * AMPLIFY - AMPLIFY / 2);

	export let color: 'green' | 'red' = 'red';
</script>

<div
	style:top="{offsetY}px"
	style:left="{offsetX}px"
	style:background-color={color === 'green' ? 'var(--green-3)' : 'var(--red-6)'}
/>

<style>
	div {
		position: absolute;
		border-radius: var(--radius-round);
		width: 1.5rem;
		height: 1.5rem;
		z-index: 10;
		background-color: var(--green);
	}
</style>
