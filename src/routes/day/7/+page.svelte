<script lang="ts">
	import ChristmasTree from './ChristmasTree.svelte';
	import ChristmasPresent from './ChristmasPresent.svelte';
	import autoAnimate from '@formkit/auto-animate';

	let presents = ['small-red-gift', 'blue-gift', 'tall-red-gift'];
	let underTheTree: string[] = [];

	function startDrag(event: DragEvent, index: number) {
		console.log('start', index);
		const dt = event.dataTransfer!;
		dt.dropEffect = 'move';
		dt.effectAllowed = 'move';
		dt.setData('index', index);
	}
	function onDrop(event: DragEvent) {
		const index = event.dataTransfer!.getData('index');
		const [removed] = presents.splice(index, 1);
		underTheTree.push(removed);
		presents = presents;
		underTheTree = underTheTree;
	}
</script>

<h1>Drag the presents under the tree!</h1>
<!-- Component event forwarding! -->
<ChristmasTree presents={underTheTree} on:drop={onDrop} />
<div class="wrapper">
	<div class="presents" use:autoAnimate>
		{#each presents as p, idx (p)}
			<ChristmasPresent name={p} on:dragstart={(e) => startDrag(e, idx)} />
		{/each}
	</div>
</div>

<style>
	.wrapper {
		padding-top: 2rem;
		margin-top: 4rem;
		background: var(--gray-1);
		width: 100%;
	}
	.presents {
		display: flex;
		align-items: flex-end;
		justify-content: center;
	}
</style>
