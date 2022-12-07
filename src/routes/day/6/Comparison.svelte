<script lang="ts">
	import type { Product } from '$lib/types';

	export let item1: Product;
	export let item2: Product;

	let cheap: Product, expensive: Product;
	$: {
		if (item1.price < item2.price) {
			cheap = item1;
			expensive = item2;
		} else {
			cheap = item2;
			expensive = item1;
		}
	}

	$: multiplier = Math.floor(expensive.price / cheap.price);
</script>

<p>
	You can get <strong>{multiplier}x</strong> <em>{cheap.title}</em> for about the same price as a
	single
	<em>{expensive.title}</em>
</p>
