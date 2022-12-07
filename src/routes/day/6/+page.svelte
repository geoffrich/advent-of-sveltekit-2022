<script lang="ts">
	import type { PageData } from './$types';
	import type { Product } from '$lib/types';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import ProductSelect from './ProductSelect.svelte';
	import Comparison from './Comparison.svelte';

	export let data: PageData;

	$: products = data.products;

	// populate items from query params, when available
	let selectedId1 = $page.url.searchParams.get('item1');
	let selectedId2 = $page.url.searchParams.get('item2');
	let item1: Product | undefined = data.products.find((p) => p.id.toString() === selectedId1),
		item2: Product | undefined = data.products.find((p) => p.id.toString() === selectedId2);
</script>

<h1>Select items to compare</h1>

<form class="flow" on:submit|preventDefault>
	<ProductSelect id="i1" {products} bind:value={item1} name="item1">
		<svelte:fragment slot="label">Item 1</svelte:fragment>
	</ProductSelect>
	<ProductSelect id="i2" {products} bind:value={item2} name="item2">
		<svelte:fragment slot="label">Item 2</svelte:fragment>
	</ProductSelect>
	{#if !browser}
		<!-- For progressive enhancement, the form does not submit on enter when focusing a select 
        So we need an actual submit input. Hide it when JS is enabled (which unfortunately causes a layout shift)-->
		<input type="submit" />
	{/if}
</form>

{#if item1 && item2}
	{#if item1.id === item2.id}
		<p>These are the same items</p>
	{:else}
		<Comparison {item1} {item2} />
	{/if}
{/if}

<style>
	input {
		display: block;
	}
</style>
