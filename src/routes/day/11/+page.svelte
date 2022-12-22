<script>
	import ChristmasTree from './ChristmasTree.svelte';
	import ChristmasLights from './ChristmasLights.svelte';
</script>

<h1>Christmas tree lights</h1>
<div>
	<ChristmasTree size={7}>
		<ChristmasLights />
		<ChristmasLights />
	</ChristmasTree>
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
