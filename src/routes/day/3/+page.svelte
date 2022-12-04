<script lang="ts">
	import { readable, derived } from 'svelte/store';

	const target = new Date(2022, 11, 25);
	const SECONDS_IN_DAY = 60 * 60 * 24;
	const SECONDS_IN_HOUR = 60 * 60;

	const now = readable(new Date(), (set) => {
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
		<dd>{days}</dd>
		<dt>Hours</dt>
		<dd>{hours}</dd>
		<dt>Minutes</dt>
		<dd>{minutes}</dd>
		<dt>Seconds</dt>
		<dd>{seconds}</dd>
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
		text-transform: lowercase;
		gap: 0.25rem;
	}

	dt {
		grid-row: 2;
	}

	dd {
		grid-row: 1;
		font-size: var(--font-size-5);
	}
</style>
