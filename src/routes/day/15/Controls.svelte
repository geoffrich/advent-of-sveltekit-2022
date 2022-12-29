<script lang="ts">
	import { scale } from 'svelte/transition';
	import Backward from './icons/Backward.svelte';
	import ChevronLeft from './icons/ChevronLeft.svelte';
	import ChevronRight from './icons/ChevronRight.svelte';
	import Forward from './icons/Forward.svelte';
	import Pause from './icons/Pause.svelte';
	import Play from './icons/Play.svelte';
	import { selectedSong, paused } from './songs';
	// had to wrap in browser or duration wasn't populated properly
	import { browser } from '$app/environment';
	import { tick } from 'svelte';
	$: playing = !$paused;

	$: progress = currentTime / duration;
	let currentTime = 0;
	let duration = 1;
	let played: TimeRanges;

	// TODO: go to next track once finished
	// TODO: better mobile layout

	let volume = 0.5;
	let audio: HTMLAudioElement;

	function togglePlay() {
		$paused = !$paused;
	}

	function offAndOnAgain() {
		// paused doesn't properly reset - https://github.com/sveltejs/svelte/issues/5914
		$paused = !$paused;
		tick().then(() => ($paused = !$paused));
	}

	// was getting a permissions issue in Firefox if I triggered this on initial hydration
	$: if ($selectedSong && played && played.length > 0) {
		offAndOnAgain();
	}

	function prev() {
		selectedSong.prev();
	}

	function rw() {
		// need to access element directly due to https://github.com/sveltejs/svelte/issues/6955
		audio.currentTime -= 10;
	}

	function ff() {
		audio.currentTime += 10;
	}

	function next() {
		selectedSong.next();
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
		bind:played
	/>
{/if}
<div class="controls">
	<div class="progress" style:width="{progress * 100}%" />
	<div class="buttons">
		<button aria-label="Previous song" on:click={prev}><ChevronLeft /></button>
		<button aria-label="Rewind" on:click={rw}>
			<Backward />
		</button>
		<button aria-label={playing ? 'Pause' : 'Play'} on:click={togglePlay} class="play">
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
		<button aria-label="Fast forward" on:click={ff}>
			<Forward />
		</button>
		<button aria-label="Next song" on:click={() => next()}><ChevronRight /></button>
	</div>
	<input
		type="range"
		aria-label="Volume"
		style:background="linear-gradient(90deg, rgba(66, 184, 131, 1) 0%, rgba(66, 184, 131, 1) {volume *
			100}%, transparent {volume * 100}%)"
		value={volume * 100}
		on:input={(e) => (volume = e.target.value / 100)}
	/>
	<div class="time">
		{prettifyTime(currentTime)} - {prettifyTime(duration)}
	</div>
</div>

<style>
	.controls {
		width: 100%;
		position: relative;
		border-radius: var(--radius-2);
		background: var(--gray-8);
		color: white;
	}
	.progress {
		background: linear-gradient(90deg, rgba(66, 184, 131, 1) 0%, rgba(0, 48, 255, 1) 100%);
		border-radius: var(--radius-2);
		height: 0.25rem;
		background: var(--gray-4);
		position: relative;
	}

	.buttons {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	input[type='range'] {
		-webkit-appearance: none; /* Hides the slider so that custom slider can be made */
		border: rgba(66, 184, 131, 1) 1px solid;
		background: v-bind(volumneGradient);
		height: 4px;
		border-radius: 3px;
		position: absolute;
		right: 1rem;
		width: 6rem;
		top: 50%;
		transform: translateY(-50%);
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
		position: absolute;
		left: 1rem;
		width: 6rem;
		top: 50%;
		white-space: nowrap;
		transform: translateY(-50%);
	}
</style>
