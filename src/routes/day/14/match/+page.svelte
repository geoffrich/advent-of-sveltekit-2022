<script lang="ts">
	import type { PageData } from './$types';
	import { invalidate } from '$app/navigation';
	import { flip } from 'svelte/animate';

	export let data: PageData;
</script>

<h1>Secret Santa List Generator</h1>

<h2>Matches</h2>

<ul>
	{#each data.matches as { giver, receiver, id } (id)}
		<li animate:flip>
			<strong>{giver.name} 🎅</strong> is the Secret Santa of <strong>{receiver.name} 🎁</strong>
		</li>
	{/each}
</ul>

<form>
	<button on:click={() => invalidate(data.key)}>Shuffle</button>
</form>
<a href="/day/14">Go back</a>
