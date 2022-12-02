<script lang="ts">
	import type { ProductsResult } from './types';
	import { fade } from 'svelte/transition';

	export let data: ProductsResult;
	export let query: string;

	$: showNext = data.skip + data.limit < data.total;
	$: showPrev = data.skip > 0;
</script>

{#if data.products && data.products.length > 0}
	<p>Showing {data.skip + 1} - {data.skip + data.limit} of {data.total} results</p>
	<ul in:fade={{ duration: 200 }}>
		{#each data.products as product (product.id)}
			<li>{product.title} - ${product.price}</li>
		{/each}
	</ul>
	<div class="links">
		{#if showPrev}
			<a href="?q={query}&skip={data.skip - 30}">Previous Page</a>
		{/if}
		{#if showNext}
			<a href="?q={query}&skip={data.skip + 30}">Next Page</a>
		{/if}
	</div>
{:else}
	<p>No results!</p>
{/if}

<style>
	ul {
		list-style-type: disc;
		align-self: start;
	}

	.links {
		display: flex;
		gap: 1rem;
	}
</style>
