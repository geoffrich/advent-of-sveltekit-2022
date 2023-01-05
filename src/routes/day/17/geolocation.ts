import { browser } from '$app/environment';
import { writable } from 'svelte/store';

interface ConfigurableNavigator {
	navigator?: Navigator;
}

interface UseGeolocationOptions extends Partial<PositionOptions>, ConfigurableNavigator {
	immediate?: boolean;
}

interface UseGeolocationValue {
	isSupported: boolean | undefined;
	coords: GeolocationPosition['coords'];
	locatedAt: number | null;
	error: GeolocationPositionError | null;
}

const defaultNavigator = browser ? window.navigator : undefined;

// based on https://github.com/vueuse/vueuse/blob/25f6e30f17953bf6f4d5f6fe421aef1d5574b4bf/packages/core/useGeolocation/index.ts
// might be a Sveltier way
// also don't need all the options
export function useGeolocation(options: UseGeolocationOptions = {}) {
	const {
		enableHighAccuracy = true,
		maximumAge = 30000,
		timeout = 27000,
		navigator = defaultNavigator,
		immediate = true
	} = options;

	const isSupported = navigator && 'geolocation' in navigator;
	const coords: GeolocationPosition['coords'] = {
		accuracy: 0,
		latitude: Infinity,
		longitude: Infinity,
		altitude: null,
		altitudeAccuracy: null,
		heading: null,
		speed: null
	};

	const store = writable<UseGeolocationValue>({
		isSupported,
		coords,
		locatedAt: null,
		error: null
	});

	function updatePosition(position: GeolocationPosition) {
		console.log(position.coords);
		store.set({
			isSupported,
			locatedAt: position.timestamp,
			coords: position.coords,
			error: null
		});
	}

	let watcher: number;

	function resume() {
		if (isSupported) {
			watcher = navigator!.geolocation.watchPosition(
				updatePosition,
				(err) => store.update((val) => ({ ...val, error: err })),
				{
					enableHighAccuracy,
					maximumAge,
					timeout
				}
			);
		}
	}

	if (immediate) resume();

	function pause() {
		if (watcher && navigator) navigator.geolocation.clearWatch(watcher);
	}

	return {
		subscribe: store.subscribe,
		resume,
		pause
	};
}
