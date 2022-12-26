<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { flip } from 'svelte/animate';
	import { slide } from 'svelte/transition';

	export let data: PageData;
</script>

<h1>Secret Santa List Generator</h1>

<p>
	You can add people's names to this list. Using the button generate, a list of matches for each
	other will be created.
</p>

<form use:enhance action="?/add" method="post">
	<div>
		<label for="name">Name</label>
		<input id="name" name="name" type="text" value={data.fake.name} required />
	</div>

	<div>
		<label for="email">Email</label>
		<input id="email" name="email" type="email" value={data.fake.email} required />
	</div>

	<button>Add to list</button>
</form>
<form use:enhance action="?/reset" method="post">
	<button>Reset list</button>
</form>

<form use:enhance action="?/delete" method="post">
	<ul>
		{#each data.names as { name, email, id } (id)}
			<li animate:flip transition:slide>
				{name}
				{email} <button name="id" value={id}>Delete</button>
			</li>
		{/each}
	</ul>
</form>
