<script>
	import './app.css';
</script>

<svelte:head>
	<title>Advent of SvelteKit</title>
</svelte:head>

<div class="container">
	<header>
		<div>Advent of <s class="vue">Vue</s> <span class="svelte">SvelteKit</span> 2022</div>
	</header>

	<slot />

	<footer>
		<p>Solutions by <a href="https://geoffrich.net">Geoff Rich</a></p>
	</footer>
</div>

<style>
	header,
	footer {
		margin: 0 auto;
		max-width: var(--size-content-3);
	}

	header {
		font-size: var(--font-size-fluid-2);
		font-weight: var(--font-weight-7);
	}

	.svelte {
		color: var(--svelte);
	}

	.vue {
		color: var(--vue);
	}

	.container {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr auto;
		height: 100%;
		justify-content: start;
	}
</style>
