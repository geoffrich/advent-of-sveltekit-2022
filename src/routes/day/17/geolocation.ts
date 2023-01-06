import { browser } from '$app/environment';
import { readable } from 'svelte/store';

export const geolocation = readable<GeolocationCoordinates>(
	{
		accuracy: 0,
		latitude: Infinity,
		longitude: Infinity,
		altitude: null,
		altitudeAccuracy: null,
		heading: null,
		speed: null
	},
	(set) => {
		if (browser) {
			let watcher = navigator.geolocation.watchPosition((pos) => set(pos.coords));

			return () => {
				navigator.geolocation.clearWatch(watcher);
			};
		}
	}
);
