<script lang="ts">
	import type { Product } from '$lib/types';

	export let id: string;
	export let products: Product[];
	export let value: Product | undefined = undefined;
	export let name: string;

	let selectedId: number = value ? value.id : -1;

	// sync Product with the selected id
	// we bind to the ID since we need to use it like an actual form
	$: value = products.find((p) => p.id === selectedId);
</script>

<label for={id}><slot name="label" /></label>
<!-- Needed autocomplete off, otherwise Firefox would mess with the selected option 
https://stackoverflow.com/questions/4831848/firefox-ignores-option-selected-selected -->
<select {id} bind:value={selectedId} {name} autocomplete="off">
	<option disabled value={-1} selected={selectedId === -1}>Select an item</option>

	{#each products as p}
		<!-- Need the actual selected attribute for SSR -->
		<option value={p.id} selected={p.id === selectedId}>{p.title} - ${p.price}</option>
	{/each}
</select>

<style>
	label {
		display: block;
	}

	select {
		--flow-space: 0;
		padding: 0.5rem;
		border: 2px solid var(--gray-7);
	}
</style>
