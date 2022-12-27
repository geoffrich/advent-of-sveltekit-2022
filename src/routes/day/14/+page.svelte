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
	Use the form below to add Secret Santa participants to the list. Once you're done, <strong
		>generate list</strong
	> will match the participants.
</p>

<form use:enhance action="?/add" method="post" class="name-form">
	<div class="input">
		<label for="name">Name</label>
		<input id="name" name="name" type="text" bind:value={name} />
	</div>

	<div class="input">
		<label for="email">Email</label>
		<input id="email" name="email" type="email" bind:value={email} />
	</div>

	<button type="button" on:click={prefill}>Pre-fill</button>
	<button type="submit">Add to list</button>
	<button formaction="?/reset" formnovalidate>Reset list</button>
</form>

{#if form?.error}
	<p class="error" in:slide>{form?.error}</p>
{/if}

<a href="/day/14/match">Generate List</a>

<form use:enhance action="?/delete" method="post">
	<ul>
		{#each data.names as { name, email, id } (id)}
			<li animate:flip transition:slide|local>
				<span
					><span class="name">{name}</span>
					<span class="email">{email}</span></span
				><button name="id" value={id}>Delete</button>
			</li>
		{/each}
	</ul>
</form>

<style>
	form {
		width: 100%;
	}

	.name-form {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: end;
	}

	.name-form .input {
		flex-grow: 5;
		flex-basis: 250px;
	}

	input {
		width: 100%;
	}

	.name-form button {
		flex-grow: 1;
		flex-basis: 100px;
	}

	.name-form button[type='submit'] {
		flex-grow: 3;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	ul > * + * {
		margin-top: 1rem;
	}

	li {
		border: 3px solid var(--green-6);
		text-align: center;
		padding: 0.5rem 1rem;
		border-radius: var(--radius-round);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.name {
		font-weight: var(--font-weight-7);
	}

	.email {
		color: var(--gray-6);
	}

	.error {
		background-color: var(--red-7);
		width: 100%;
		color: var(--red-0);
		padding: 0.5rem 1rem;
		border-radius: var(--radius-2);
		text-align: center;
	}
</style>
