<script>
	import ChristmasTree from './ChristmasTree.svelte';
</script>

<h1>Recursive Christmas Tree</h1>
<div>
	<ChristmasTree size={7} />
</div>

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
