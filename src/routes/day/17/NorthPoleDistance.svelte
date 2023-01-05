<script lang="ts">
	import { getDistanceKm, getDistanceMiles } from './distance';
	import { useGeolocation } from './geolocation';

	const geo = useGeolocation();

	$: ({ coords, isSupported } = $geo);
	$: distance =
		unit === 'km'
			? getDistanceKm(coords.latitude, coords.longitude)
			: getDistanceMiles(coords.latitude, coords.longitude);

	let unit: 'km' | 'mile' = 'mile';

	function toggleUnit() {
		if (unit === 'km') {
			unit = 'mile';
		} else {
			unit = 'km';
		}
	}
</script>

{#if isSupported}
	<slot {distance} {toggleUnit} {unit} />
{:else}
	<p>Waiting for location data...</p>
{/if}
