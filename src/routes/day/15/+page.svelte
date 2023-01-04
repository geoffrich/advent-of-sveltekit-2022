<script lang="ts">
	import Playlist from './Playlist.svelte';
	import Controls from './Controls.svelte';
	import type { PageData } from './$types';
	import { makeSongStore } from './songs';

	export let data: PageData;

	const selectedSong = makeSongStore(data.current);

	$: selectedSong.set(data.current);

	$: if (data.change < 0) {
		selectedSong.prev();
	} else if (data.change > 0) {
		selectedSong.next();
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fi.zophar.net/" />
</svelte:head>

<h1>
	Christmas <a href="https://en.wikipedia.org/wiki/Video_game_music">VGM</a> Radio
</h1>
<Playlist {selectedSong} />
<Controls {selectedSong} />

<style>
	a {
		color: var(--red-7);
	}
</style>
