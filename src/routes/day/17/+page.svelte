<script>
	import NorthPoleDistance from './NorthPoleDistance.svelte';
</script>

<div>
	<h2>Example 1</h2>
	<NorthPoleDistance let:distance let:toggleUnit let:unit>
		<p>You are currently: {distance} {unit}s away from the North Pole.</p>
		<button on:click={toggleUnit}>Toggle</button>
	</NorthPoleDistance>
	<h2>Example 2</h2>
	<NorthPoleDistance let:distance let:toggleUnit let:unit>
		<p>Current distance from the North Pole</p>
		<p>{distance} {unit}</p>
		<button on:click={toggleUnit}>
			Switch to {unit === 'km' ? 'miles' : 'km'}
		</button>
	</NorthPoleDistance>
</div>
