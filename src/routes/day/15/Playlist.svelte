<script lang="ts">
	import { goto } from '$app/navigation';
	import Play from './icons/Play.svelte';
	import Playing from './icons/Playing.svelte';
	import { type SongStore, songs, paused } from './songs';

	export let selectedSong: SongStore;
</script>

<ul>
	{#each songs as song}
		{@const isSelected = song.title === $selectedSong.title}
		{@const isPlaying = !$paused && isSelected}
		<li class:selected={isSelected}>
			<div class="album">
				{#if isSelected}
					<div class="overlay" />
				{/if}
				<div class="icon">
					{#if isPlaying}
						<Playing />
					{:else}
						<Play />
					{/if}
				</div>
				<img src={song.cover} alt="{song.title} cover" />
			</div>
			<div class="title">
				{song.title}
				<a href="?current={song.id}" data-sveltekit-noscroll
					><span class="visually-hidden">Play {song.title}</span></a
				>
			</div>
		</li>
	{/each}
</ul>

<style>
	ul {
		width: 100%;
		padding: 0;
	}

	ul :global(svg) {
		width: 1.5rem;
		height: 1.5rem;
	}

	li {
		color: var(--gray-7);
		cursor: pointer;
		display: flex;
		align-items: center;
		padding-right: 1rem;
		margin-bottom: 2rem;
		gap: 1rem;
		transition: 0.3s ease background;
		position: relative;
	}

	li.selected,
	li:hover {
		background: var(--gray-2);
	}

	.album {
		position: relative;
		border-radius: var(--radius-3);
		overflow: hidden;
	}

	.overlay {
		transition: opacity ease-in 0.3s;
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: var(--gray-8);
		opacity: 0.5;
	}

	.overlay:hover {
		opacity: 0;
	}

	.icon {
		pointer-events: none;
		position: absolute;
		color: white;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	img {
		width: 5rem;
		height: 5rem;
		object-fit: cover;
	}

	a {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
	}
</style>
