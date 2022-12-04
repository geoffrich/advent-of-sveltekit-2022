<script>
	import ChristmasTree from './ChristmasTree.svelte';
	import source from './ChristmasTree.svelte?raw';
	import CodeBlock from '$lib/CodeBlock.svelte';
</script>

<h1>Recursive Christmas Tree</h1>
<div>
	<ChristmasTree size={7} />
</div>

<CodeBlock {source} />

<style>
	div {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-bottom: 1rem;
	}
</style>
