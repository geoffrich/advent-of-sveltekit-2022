<script lang="ts">
	import { scale } from 'svelte/transition';
	import Backward from './icons/Backward.svelte';
	import ChevronLeft from './icons/ChevronLeft.svelte';
	import ChevronRight from './icons/ChevronRight.svelte';
	import Forward from './icons/Forward.svelte';
	import Pause from './icons/Pause.svelte';
	import Play from './icons/Play.svelte';
	import { type SongStore, paused } from './songs';

	// had to wrap audio tag in browser or duration wasn't populated properly
	import { browser } from '$app/environment';
	import { onMount, tick } from 'svelte';
	import { submitReplaceState } from '$lib/util';

	export let selectedSong: SongStore;
	$: playing = !$paused;

	$: progress = currentTime / duration;
	let currentTime = 0;
	let duration = 1;

	// note: this won't work on iOS since you can't adjust volume via JS
	let volume = 0.5;
	let audio: HTMLAudioElement;

	let loading = true;

	function togglePlay() {
		$paused = !$paused;
	}

	$: if (currentTime >= duration) {
		selectedSong.next();
	}

	let timer: number;
	onMount(() => {
		let once = true;

		if (duration === 1 && !isNaN(audio.duration)) {
			// firefox doesn't populate this sometimes for some reason
			duration = audio.duration;
		}

		if (audio.readyState >= 2) {
			// sometimes audio is already ready and canplay event not fired in Firefox
			loading = false;
		}

		// was having issues with regular store autosub for some reason
		// e.g. if ($selectedSong) { offAndOnAgain(); }
		// The statement was not running
		const unsub = selectedSong.subscribe((val) => {
			if (once) {
				// don't run first time to prevent FF error
				// "The play method is not allowed by the user agent or the platform in the current context, possibly because the user denied permission."
				once = false;
				return;
			}
			// reset current time to prevent race condition where next song starts in the middle
			currentTime = 0;

			// wait to set loading state so we don't get a flash of "loading" in the UI
			clearTimeout(timer);
			timer = setTimeout(() => (loading = true), 250);

			// paused doesn't properly update when audio source changes - https://github.com/sveltejs/svelte/issues/5914
			// so toggle it off and then back on on the next tick
			$paused = true;
			tick().then(() => ($paused = false));
		});

		return () => {
			unsub();
		};
	});

	function rw() {
		// need to access element directly due to https://github.com/sveltejs/svelte/issues/6955
		audio.currentTime -= 10;
	}

	function ff() {
		audio.currentTime += 10;
	}

	function handleRangeInput({ target }: InputEvent) {
		if (!target) return;
		volume = (target as HTMLInputElement).valueAsNumber / 100;
	}

	function prettifyTime(time: number) {
		const seconds = Math.floor(time);
		const minutes = Math.floor(seconds / 60);
		const remainder = seconds - minutes * 60;
		return `${minutes.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
	}
</script>

{#if browser}
	<audio
		src={$selectedSong.file}
		bind:paused={$paused}
		bind:volume
		bind:currentTime
		bind:duration
		bind:this={audio}
		on:canplay={() => {
			loading = false;
			clearTimeout(timer);
		}}
	/>
{:else}
	<audio autoplay src={$selectedSong.file} controls class="no-js" />
{/if}

<form class="controls" on:submit={submitReplaceState}>
	<input type="hidden" name="current" value={$selectedSong.id} />
	<div class="progress js-only" style:width="{progress * 100}%" />
	<div class="time js-only">
		<!-- only show when playing because iOS safari won't fire the canplay event if we're not playing -->
		{#if loading && !$paused}
			Loading...
		{:else}
			{prettifyTime(currentTime)} - {prettifyTime(duration)}
		{/if}
	</div>
	<div class="buttons">
		<button aria-label="Previous song" name="change" value="-1"><ChevronLeft /></button>
		<button aria-label="Rewind" on:click={rw} class="js-only" type="button">
			<Backward />
		</button>
		<button
			aria-label={playing ? 'Pause' : 'Play'}
			on:click={togglePlay}
			class="play js-only"
			type="button"
		>
			{#key playing}
				<div transition:scale>
					{#if playing}
						<Pause />
					{:else}
						<Play />
					{/if}
				</div>
			{/key}
		</button>
		<button aria-label="Fast forward" on:click={ff} class="js-only" type="button">
			<Forward />
		</button>
		<button aria-label="Next song" name="change" value="1"><ChevronRight /></button>
	</div>
	<div class="volume js-only">
		<input
			type="range"
			aria-label="Volume"
			style:background="linear-gradient(90deg, rgba(66, 184, 131, 1) 0%, rgba(66, 184, 131, 1) {volume *
				100}%, transparent {volume * 100}%)"
			value={volume * 100}
			on:input={handleRangeInput}
			disabled={!browser}
		/>
		<span
			>{Math.floor(volume * 100)
				.toString()
				.padStart(3, '0')}</span
		>
	</div>
</form>

<style>
	.controls {
		width: 100%;
		position: relative;
		border-radius: var(--radius-2);
		background: var(--gray-8);
		color: white;
		display: grid;
		align-items: center;
		grid-template-columns: 1fr auto 1fr;
		grid-template-areas:
			'p p p'
			'time buttons volume';
		column-gap: 0.5rem;
	}

	@media screen and (max-width: 480px) {
		.controls {
			grid-template-columns: 1fr 1fr;
			grid-template-areas:
				'p p'
				'buttons buttons'
				'time volume';
		}
	}

	.progress {
		background: linear-gradient(90deg, rgba(66, 184, 131, 1) 0%, rgba(0, 48, 255, 1) 100%);
		border-radius: var(--radius-2);
		height: 0.25rem;
		background: var(--gray-4);
		position: relative;
		grid-column: 1 / -1;
		grid-area: p;
	}

	.buttons {
		display: flex;
		align-items: center;
		justify-content: center;
		grid-area: buttons;
	}

	.volume {
		grid-area: volume;
		padding-right: 1rem;
		justify-self: end;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.volume span {
		/* Prevent changing numbers from changing width */
		font-variant-numeric: tabular-nums;
	}

	input[type='range'] {
		-webkit-appearance: none; /* Hides the slider so that custom slider can be made */
		border: rgba(66, 184, 131, 1) 1px solid;
		height: 4px;
		border-radius: 3px;
		width: 6rem;
	}
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 15px;
		width: 15px;
		background: white;
		border-radius: 10px;
	}
	div :global(svg) {
		transition: 0.3s ease all;
		width: 1.5rem;
		height: 1.5rem;
	}
	div :global(svg:hover) {
		opacity: 0.7;
	}

	button {
		cursor: pointer;
		font-family: inherit;
		font-size: 100%;
		font-weight: inherit;
		line-height: inherit;
		color: inherit;
		-webkit-appearance: button;
		background-color: transparent;
		background-image: none;
		text-transform: none;
		border: none;
	}

	.play {
		background: var(--green-6);
		border-radius: var(--radius-round);
		width: 2rem;
		height: 2rem;
		transform: scale(1.5);
		margin: 0 1rem;
	}

	.play :global(svg) {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.time {
		width: 6rem;
		white-space: nowrap;
		grid-area: time;
		padding-left: 1rem;
	}
</style>
