<script lang="ts">
	import ChristmasTree from './ChristmasTree.svelte';
	import ChristmasLights from './ChristmasLights.svelte';
	import type { PageData } from './$types';
	import ChristmasOrnament from './ChristmasOrnament.svelte';

	export let data: PageData;
</script>

<h1>Christmas tree ornaments</h1>
<div class="grid">
	<div>
		<h2>With ornaments slot</h2>

		<ChristmasTree size={7}>
			<svelte:fragment slot="lights">
				<ChristmasLights random={data.rng} />
				<ChristmasLights random={data.rng} />
			</svelte:fragment>

			<ChristmasOrnament random={data.rng} slot="ornaments" />
		</ChristmasTree>
	</div>
	<div>
		<h2>With even/odd slot</h2>
		<ChristmasTree size={7}>
			<svelte:fragment slot="lights">
				<ChristmasLights random={data.rng} />
				<ChristmasLights random={data.rng} />
			</svelte:fragment>

			<ChristmasOrnament random={data.rng} slot="even" color="green" />
			<ChristmasOrnament random={data.rng} slot="odd" color="red" />
		</ChristmasTree>
	</div>
</div>

<style>
	.grid {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 1rem;
		text-align: center;
		flex-direction: column;
		gap: 1rem;
	}

	h2 {
		margin-bottom: 1rem;
	}
</style>
