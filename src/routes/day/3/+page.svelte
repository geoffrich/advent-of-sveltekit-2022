<script lang="ts">
	import { browser } from '$app/environment';
	import { readable, derived } from 'svelte/store';
	import type { PageData } from './$types';
	import Rolling from './Rolling.svelte';

	export let data: PageData;

	const target = browser ? new Date(2022, 11, 25) : data.target;
	const SECONDS_IN_DAY = 60 * 60 * 24;
	const SECONDS_IN_HOUR = 60 * 60;

	const now = readable(data.date, (set) => {
		const id = setInterval(() => set(new Date()), 1000);
		return () => {
			clearInterval(id);
		};
	});

	const remainingSeconds = derived(now, ($now) => {
		return Math.floor((target.getTime() - $now.getTime()) / 1000);
	});

	let days: number, hours: number, minutes: number, seconds: number;

	$: {
		// there has to be an easier way lol
		days = Math.floor($remainingSeconds / SECONDS_IN_DAY);
		hours = Math.floor(($remainingSeconds - SECONDS_IN_DAY * days) / SECONDS_IN_HOUR);
		minutes = Math.floor(
			($remainingSeconds - SECONDS_IN_DAY * days - SECONDS_IN_HOUR * hours) / 60
		);
		seconds = $remainingSeconds - SECONDS_IN_DAY * days - SECONDS_IN_HOUR * hours - 60 * minutes;
	}
</script>

<div class="countdown">
	<h1>Christmas Countdown</h1>
	<dl>
		<dt>Days</dt>
		<Rolling key={days} --area="days">
			{days}
		</Rolling>
		<dt>Hours</dt>
		<Rolling key={hours} --area="hours">
			{hours}
		</Rolling>
		<dt>Minutes</dt>
		<Rolling key={minutes} --area="minutes">
			{minutes}
		</Rolling>
		<dt>Seconds</dt>
		<Rolling key={seconds} --area="seconds">
			{seconds}
		</Rolling>
	</dl>
</div>

<style>
	.countdown {
		box-shadow: var(--shadow-2);
		border-radius: var(--radius-2);
		padding: 1rem;
		text-align: center;
	}

	h1 {
		font-weight: var(--font-weight-4);
		margin-bottom: var(--size-3);
		text-decoration: underline;
		text-decoration-color: var(--svelte);
		text-decoration-thickness: 4px;
	}

	dl {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-areas: 'days hours minutes seconds';
		text-transform: lowercase;
		gap: 0.25rem;
		overflow: hidden;
	}

	dt {
		grid-row: 2;

		/* Allow the rolling number to go behind this row */
		z-index: 1;
		background: white;
	}
</style>
