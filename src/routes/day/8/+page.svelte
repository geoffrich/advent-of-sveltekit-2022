<script lang="ts">
	import LL, { setLocale, locale } from '$i18n/i18n-svelte';
	import Tree from '~icons/twemoji/christmas-tree';
	import Map from '~icons/twemoji/world-map';
	import USFlag from '~icons/twemoji/flag-united-states?raw';
	import GermanFlag from '~icons/twemoji/flag-germany?raw';
	import JapaneseFlag from '~icons/twemoji/flag-japan?raw';
	import type { Locales } from '$i18n/i18n-types';

	const flagMap = {
		en: USFlag,
		de: GermanFlag,
		'ja-JP': JapaneseFlag
	};

	const locales: Locales[] = ['en', 'de', 'ja-JP'];
	let localeIdx = 0;

	function changeLocale() {
		localeIdx = (localeIdx + 1) % locales.length;
		setLocale(locales[localeIdx]);
	}

	const christmas = new Date('2022/12/25');
	const daysUntilChristmas = 3; // TODO

	// TODO: Style the time part of the christmasIsComing string. (Hint: use i18n-t and the slot syntax)
</script>

<section class="flex flex-col items-center leading-loose text-center">
	<div class="header">
		<Tree />
		{$LL.happyHolidays()}
		<Map />
	</div>
	<p>{$LL.christmasIsComing({ date: christmas, time: $LL.day(daysUntilChristmas) })}</p>
	<button on:click={changeLocale}>Change Locale</button>
	<p>{@html flagMap[$locale]} {$LL.language()}</p>
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
		/*
  @apply text-xl
    w-32px
    h-32px
    rounded-full
    border-1
    border-transparent
    bg-transparent
    cursor-pointer
    duration-300
    hover:ring-2
    hover:border-green-500
    hover:ring-green-500
    hover:ring-opacity-40
    hover:text-green-600;
        */
	}
</style>
