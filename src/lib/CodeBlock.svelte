<script lang="ts">
	import Prism from 'prismjs';
	import 'prism-svelte';
	import 'prismjs/themes/prism-tomorrow.css';
	import { fade } from 'svelte/transition';

	export let source: string;
	export let lang: string;

	$: highlighted = Prism.highlight(source, Prism.languages[lang === 'ts' ? 'js' : lang], lang);
</script>

<pre in:fade><code>{@html highlighted}</code></pre>

<style>
	pre {
		white-space: pre-wrap;
		background: var(--gray-8);
		color: var(--gray-2);
		padding: 0.5rem;
		border-radius: var(--radius-3);
		tab-size: 2rem;
	}
</style>
