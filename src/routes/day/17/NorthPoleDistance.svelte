<script lang="ts">
	import { getDistanceKm, getDistanceMiles } from './distance';
	import { geolocation } from './geolocation';

	$: distance =
		unit === 'km'
			? getDistanceKm($geolocation.latitude, $geolocation.longitude)
			: getDistanceMiles($geolocation.latitude, $geolocation.longitude);

	let unit: 'km' | 'mile' = 'mile';

	function toggleUnit() {
		if (unit === 'km') {
			unit = 'mile';
		} else {
			unit = 'km';
		}
	}
</script>

{#if isNaN(distance)}
	<p>Waiting for location data...</p>
{:else}
	<slot {distance} {toggleUnit} {unit} />
{/if}
