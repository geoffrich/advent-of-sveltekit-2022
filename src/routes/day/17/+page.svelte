<script>
	import NorthPoleDistance from './NorthPoleDistance.svelte';
</script>

<h1>Renderless North Pole distance</h1>
<p>
	<code>NorthPoleDistance</code> is a renderless component, meaning it only performs some logic and passes
	props to its slot. The consumer of the component can read those props inside the slot (with let:prop)
	and decide what to do with them.
</p>
<div class="flow container">
	<h2>Example 1</h2>
	<NorthPoleDistance let:distance let:toggleUnit let:unit>
		<p>You are currently: {distance} {unit}s away from the North Pole.</p>
		<button class="button-green" on:click={toggleUnit}>Toggle</button>
	</NorthPoleDistance>
	<h2>Example 2</h2>
	<NorthPoleDistance let:distance let:toggleUnit let:unit>
		<div class="example-2 flow">
			<p>Current distance from the North Pole</p>
			<p class="distance">{distance} {unit}</p>
			<button on:click={toggleUnit} class="button-red">
				Switch to {unit === 'km' ? 'miles' : 'km'}
			</button>
		</div>
	</NorthPoleDistance>
</div>

<style>
	.container {
		width: 100%;
		max-width: var(--size-content-2);
	}
	button {
		appearance: none;
		border: none;
		background: none;
		cursor: pointer;
		transition: transform 0.2s ease;
		color: white;
		padding: 0.5rem 1rem;
		border-radius: var(--radius-2);
	}

	.button-green {
		background: var(--green-7);
	}

	.button-red {
		background: var(--red-6);
	}

	button:hover {
		filter: brightness(0.95);
	}

	button:active {
		transform: scale(0.95);
	}

	.example-2 {
		text-align: center;
		border: 2px solid black;
		border-radius: var(--radius-3);
		padding: 1rem;
	}

	.distance {
		font-size: var(--font-size-4);
	}
</style>
