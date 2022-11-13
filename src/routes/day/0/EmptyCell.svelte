<script>
	export let disabled = false;
</script>

<button on:click {disabled}>Place</button>

<style>
	button {
		width: 100%;
		height: 100%;
		appearance: none;
		border: none;
		background: none;
		border-radius: var(--border-size-3);
	}

	button:hover,
	button:focus-visible {
		background-color: var(--gray-2);
		box-shadow: var(--shadow-3);
		cursor: pointer;
	}

	button:focus-visible {
		outline: solid var(--svelte);
	}

	button:disabled {
		cursor: not-allowed;
	}
</style>
