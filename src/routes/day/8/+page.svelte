<script lang="ts">
	import LL, { setLocale, locale } from '$i18n/i18n-svelte';
	import Tree from '~icons/twemoji/christmas-tree';
	import Map from '~icons/twemoji/world-map';
	import CarbonLanguage from '~icons/carbon/language';
	import USFlag from '~icons/twemoji/flag-united-states?raw';
	import GermanFlag from '~icons/twemoji/flag-germany?raw';
	import JapaneseFlag from '~icons/twemoji/flag-japan?raw';
	import type { Locales } from '$i18n/i18n-types';
	import { loadLocaleAsync } from '$i18n/i18n-util.async.js';
	import WrapTranslation from './WrapTranslation.svelte';

	const flagMap = {
		en: USFlag,
		de: GermanFlag,
		'ja-JP': JapaneseFlag
	};

	const locales: Locales[] = ['en', 'de', 'ja-JP'];
	let localeIdx = 0;

	async function changeLocale() {
		localeIdx = (localeIdx + 1) % locales.length;
		const newLocale = locales[localeIdx];
		await loadLocaleAsync(newLocale);
		setLocale(newLocale);
	}

	const christmas = new Date('2022/12/25');
	const daysUntilChristmas = 3; // TODO
</script>

<section class="flex flex-col items-center leading-loose text-center">
	<div class="header">
		<Tree />
		{$LL.happyHolidays()}
		<Map />
	</div>
	<p>
		<WrapTranslation
			message={$LL.christmasIsComing({
				date: christmas,
				time: $LL.day({ days: daysUntilChristmas })
			})}
			let:infix
		>
			<span class="days">{infix}</span>
		</WrapTranslation>
	</p>
	<div class="lang-picker">
		<button class="icon-button" on:click={changeLocale}><CarbonLanguage /></button>
		<p class="lang">{@html flagMap[$locale]} {$LL.language()}</p>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		line-height: var(--font-lineheight-5);
	}

	section :global(svg) {
		display: inline-block;
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
