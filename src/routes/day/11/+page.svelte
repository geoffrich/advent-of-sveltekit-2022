<script lang="ts">
	import ChristmasTree from './ChristmasTree.svelte';
	import ChristmasLights from './ChristmasLights.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Christmas tree lights</h1>
<div>
	<ChristmasTree size={7}>
		<ChristmasLights random={data.rng} />
		<ChristmasLights random={data.rng} />
	</ChristmasTree>
</div>

<style>
	div {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-bottom: 1rem;
	}
</style>
