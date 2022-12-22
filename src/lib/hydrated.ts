// https://github.com/sveltejs/kit/issues/4447#issuecomment-1236230570
// updated in the root layout
export let hydrated = false;
export function update() {
	hydrated = true;
}
