<script lang="ts">
	import './christmas.css';

	interface ChristmasParams {
		style?: 'red' | 'green' | 'red-green';
		duration?: number;
	}

	function christmas(node: HTMLElement, params: ChristmasParams = {}) {
		const { style = 'red-green', duration = 2 } = params;
		node.classList.add('christmas-text');
		node.classList.add(style);
		node.style.animationDuration = `${duration}s`;
	}
</script>

<h1>Custom Christmas Action</h1>
<p>
	The original challenge asked for a <a
		href="https://vuejs.org/guide/reusability/custom-directives.html">custom Vue directive</a
	>. The closest thing in Svelte is an
	<a href="https://svelte.dev/docs#template-syntax-element-directives-use-action">action</a> (though
	this doesn't SSR at all).
</p>
<p>It wouldn't be common to use an action for this sort of thing in Svelte.</p>
<div>
	<p use:christmas>Red + Green (default)</p>
	<p use:christmas={{ style: 'red' }}>Red only</p>
	<p use:christmas={{ style: 'green' }}>Green only</p>
	<p use:christmas={{ duration: 5 }}>Slower Animation</p>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		gap: 1rem;
	}
</style>
