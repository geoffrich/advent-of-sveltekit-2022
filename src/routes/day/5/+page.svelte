<script lang="ts">
	import Card from './Card.svelte';
	import source from './Card.svelte?raw';
	import CodeBlock from '$lib/CodeBlock.svelte';
	import { fade } from 'svelte/transition';
</script>

<Card />
<CodeBlock {source} transition={fade} />
