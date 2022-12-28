<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import { flip } from 'svelte/animate';
	import { slide, fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	export let data: PageData;
	export let form: ActionData;

	let name = form?.name ?? '';
	let email = form?.email ?? '';

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

<form
	use:enhance={() => {
		return async ({ update, result }) => {
			if (result.type === 'redirect') {
				// current applyAction doesn't respect data-sveltekit-noscroll - maybe a bug?
				goto(result.location, { invalidateAll: true, noScroll: true, keepFocus: true });
				return;
			}
			await update();
		};
	}}
	action="?/add"
	method="post"
	class="name-form"
>
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

<a href="/day/14/match" class="button">Generate List</a>

<form
	use:enhance={({ data: formData }) => {
		let oldNames = data.names;
		// optimistic UI: preemptively filter out deleted value
		data.names = data.names.filter((n) => n.id.toString() !== formData.get('id'));

		return async ({ update, result }) => {
			if (result.type === 'failure') {
				// load doesn't re-run, so put the original names back
				// this might run into issues with concurrent updates
				data.names = oldNames;
			} else if (result.type === 'redirect') {
				// current applyAction doesn't respect data-sveltekit-noscroll - maybe a bug?
				goto(result.location, { invalidateAll: true, noScroll: true });
				return;
			}
			await update();
		};
	}}
	action="?/delete"
	method="post"
	data-sveltekit-noscroll
>
	<ul class="names">
		{#each data.names as { name, email, id } (id)}
			<li animate:flip transition:fade|local>
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
		flex-basis: 120px;
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

	button,
	.button {
		font-size: var(--font-size-2);
		padding: 0.5rem 1rem;
		color: white;
		background: var(--color);
		appearance: none;
		border: none;
		border-radius: var(--radius-2);
		cursor: pointer;
		text-decoration: none;

		--color: var(--blue-8);
		--hover: var(--blue-9);
	}

	button:hover,
	.button:hover {
		background-color: var(--hover);
	}

	.names button {
		--color: var(--violet-8);
		--hover: var(--violet-9);
	}

	.button {
		--color: var(--red-8);
		--hover: var(--red-9);

		font-size: var(--font-size-3);
		font-weight: 700;
	}
</style>
