<script>
	// Not important for the challenge, but some math fun:
	// Math.random() gives us in the range [0...1] so we multiply
	// so we can get a range [0...AMPLIFY].
	// BUT! We want our lights centered in the tree still, so we
	// subtract (AMPLIFY / 2) so that we're centered over 0
	// and our range is now [(-AMPLIFY / 2)...(AMPLIFY / 2)]
	const AMPLIFY = 15;
	const offsetY = Math.random() * AMPLIFY - AMPLIFY / 2;
	const offsetX = Math.random() * AMPLIFY - AMPLIFY / 2;
	// Should be the same as the length of the animation so that
	// it's evenly distributed
	const MAX_DELAY = 2;
	const twinkleDelay = Math.random() * MAX_DELAY;
</script>

<div
	style:top="{offsetY}px"
	style:left="{offsetX}px"
	style:animation-delay="{twinkleDelay}s"
	class="twinkle"
/>

<style>
	.twinkle {
		animation: twinkle 2s ease-in-out infinite;
		border-radius: var(--radius-round);
		background: var(--yellow-1);
		width: 0.5rem;
		height: 0.5rem;
		position: relative;
		z-index: 20;
		box-shadow: var(--shadow-3);
	}
	@keyframes twinkle {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
