import superMario64 from './covers/n64_supermario64.jpg';
import pokemonDiamond from './covers/ds_pokemondiamondversion.jpg';
import majorasMask from './covers/n64_thelegendofzeldamajorasmask.jpg';
import dkc2 from './covers/snes_dkc2final.jpg';
import earthbound from './covers/snes_earthbound.jpg';
import { writable, derived } from 'svelte/store';

export const songs = [
	{
		title: 'Snow Mountain',
		file: 'https://fi.zophar.net/soundfiles/nintendo-64-usf/super-mario-64/11%20Snow%20Mountain.mp3',
		cover: superMario64
	},
	{
		title: 'In a Snow-Bound Land',
		file: 'https://fi.zophar.net/soundfiles/nintendo-snes-spc/donkey-kong-country-2-diddys-kong-quest/25%20In%20a%20Snow-Bound%20Land%20.mp3',
		cover: dkc2
	},
	{
		title: 'Snowman',
		file: 'https://fi.zophar.net/soundfiles/nintendo-snes-spc/earthbound/063%20Snowman.mp3',
		cover: earthbound
	},
	{
		title: 'Snowpoint City (Daytime)',
		file: 'https://fi.zophar.net/soundfiles/nintendo-ds-2sf/pokemon-diamond/163%20Snowpoint%20City%20%28Daytime%29.mp3',
		cover: pokemonDiamond
	},
	{
		title: 'Snowhead Temple',
		file: 'https://fi.zophar.net/soundfiles/nintendo-64-usf/legend-of-zelda-the-majoras-mask/206%20Snowhead%20Temple.mp3',
		cover: majorasMask
	}
];

const selectedIdx = writable(1);
const selectedSongStore = derived(selectedIdx, ($selectedIdx) => songs[$selectedIdx]);

export const selectedSong = {
	subscribe: selectedSongStore.subscribe,
	next: () => {
		selectedIdx.update((curr) => (curr + 1) % songs.length);
	},
	prev: () => {
		selectedIdx.update((curr) => (curr - 1 + songs.length) % songs.length);
	},
	set: (song: typeof songs[0]) => {
		const idx = songs.findIndex((s) => s === song);
		selectedIdx.set(idx);
	}
};

export const paused = writable(true);
