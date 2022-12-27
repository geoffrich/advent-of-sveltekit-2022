<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import { flip } from 'svelte/animate';
	import { slide } from 'svelte/transition';

	export let data: PageData;
	export let form: ActionData;

	let name = '';
	let email = '';

	function prefill() {
		name = data.fake.name;
		email = data.fake.email;
	}
</script>

<h1>Secret Santa List Generator</h1>

<p>
	You can add people's names to this list. Using the button generate, a list of matches for each
	other will be created.
</p>

<form use:enhance action="?/add" method="post">
	{#if form?.error}
		<p>{form?.error}</p>
	{/if}
	<div>
		<label for="name">Name</label>
		<input id="name" name="name" type="text" bind:value={name} />
	</div>

	<div>
		<label for="email">Email</label>
		<input id="email" name="email" type="email" bind:value={email} />
	</div>

	<button type="button" on:click={prefill}>Pre-fill</button>
	<button>Add to list</button>
	<button formaction="?/reset" formnovalidate>Reset list</button>
</form>

<a href="/day/14/match">Generate List</a>

<form use:enhance action="?/delete" method="post">
	<ul>
		{#each data.names as { name, email, id } (id)}
			<li animate:flip transition:slide|local>
				{name}
				{email} <button name="id" value={id}>Delete</button>
			</li>
		{/each}
	</ul>
</form>
