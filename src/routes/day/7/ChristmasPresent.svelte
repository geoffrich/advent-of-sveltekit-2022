<script lang="ts">
	import tallRedGift from './tall-red-gift.svg?raw';
	import smallRedGift from './small-red-gift.svg?raw';
	import blueGift from './blue-gift.svg?raw';

	export let name: string;

	const map: Record<string, string> = {
		'tall-red-gift': tallRedGift,
		'small-red-gift': smallRedGift,
		'blue-gift': blueGift
	};
</script>

<!-- TIL: draggable is enumerated, so "true" and "false" -->
<div draggable="true" on:dragstart on:click>
	{@html map[name]}
</div>

<style>
	div :global(svg) {
		width: 8rem;
	}
</style>
