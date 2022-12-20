<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte';
	import Tree from '~icons/twemoji/christmas-tree';
	import Map from '~icons/twemoji/world-map';
	import CarbonLanguage from '~icons/carbon/language';
	import USFlag from '~icons/twemoji/flag-united-states?raw';
	import GermanFlag from '~icons/twemoji/flag-germany?raw';
	import JapaneseFlag from '~icons/twemoji/flag-japan?raw';
	import WrapTranslation from './WrapTranslation.svelte';
	import { submitReplaceState } from '$lib/util';
	import type { PageData } from './$types';

	export let data: PageData;

	const flagMap = {
		en: USFlag,
		de: GermanFlag,
		'ja-JP': JapaneseFlag
	};

	const daysUntilChristmas = Math.floor(
		(data.target.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
	);
</script>

<section>
	<div class="header">
		<Tree />
		{$LL.happyHolidays()}
		<Map />
	</div>
	<p>
		<WrapTranslation
			message={$LL.christmasIsComing({
				date: data.target,
				time: $LL.day({ days: daysUntilChristmas })
			})}
			let:infix
		>
			<span class="days">{infix}</span>
		</WrapTranslation>
	</p>
	<form class="lang-picker" on:submit|preventDefault={submitReplaceState}>
		<input type="hidden" name="locale" value={data.nextLocale} />
		<button class="icon-button" aria-label="Change language"><CarbonLanguage /></button>
		<p class="lang">{@html flagMap[$locale]} {$LL.language()}</p>
	</form>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		line-height: var(--font-lineheight-5);
	}

	.header {
		font-size: var(--font-size-5);
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.icon-button {
		width: 32px;
		height: 32px;
		border-radius: var(--radius-round);
		border: var(--border-size-1) solid transparent;
		cursor: pointer;
		transition: all 300ms;
		background-color: transparent;
	}

	.icon-button:hover {
		border-color: var(--green-7);
		color: var(--green-6);
	}

	.days {
		color: var(--green-7);
	}

	.lang-picker {
		display: grid;
		grid-template-columns: 120px 120px;
		width: 100%;
		justify-content: center;
		justify-items: center;
	}

	.lang {
		display: flex;
		align-items: center;
		gap: 5px;
	}
</style>
