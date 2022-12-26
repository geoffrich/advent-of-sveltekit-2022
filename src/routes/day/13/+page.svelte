<script lang="ts">
	import ChristmasTree from './ChristmasTree.svelte';
	import ChristmasLights from './ChristmasLights.svelte';
	import type { PageData } from './$types';
	import ChristmasOrnament from './ChristmasOrnament.svelte';
	import { page } from '$app/stores';
	import { submitReplaceState } from '$lib/util';

	export let data: PageData;

	let form: HTMLFormElement;

	$: alternate = $page.url.searchParams.has('alternate');

	// note: this won't work without JS because there's no submit button
</script>

<h1>Christmas tree ornaments</h1>
<form bind:this={form} on:submit={submitReplaceState}>
	<label
		><input
			type="checkbox"
			name="alternate"
			checked={alternate}
			on:change={() => form.requestSubmit()}
		/> Alternate ornaments</label
	>
</form>
<div class="grid">
	<div>
		{#if alternate}
			<ChristmasTree size={7}>
				<svelte:fragment slot="lights">
					<ChristmasLights random={data.rng} />
					<ChristmasLights random={data.rng} />
				</svelte:fragment>

				<ChristmasOrnament random={data.rng} slot="even" color="green" />
				<ChristmasOrnament random={data.rng} slot="odd" color="red" />
			</ChristmasTree>
		{:else}
			<ChristmasTree size={7}>
				<svelte:fragment slot="lights">
					<ChristmasLights random={data.rng} />
					<ChristmasLights random={data.rng} />
				</svelte:fragment>

				<ChristmasOrnament random={data.rng} slot="ornaments" />
			</ChristmasTree>
		{/if}
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
