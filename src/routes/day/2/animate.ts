// use WAAPI to animate the details opening/closing
// adapted from https://css-tricks.com/how-to-animate-the-details-element-using-waapi/
// can't use Svelte transitions since the elements are already in the DOM
export default function animate(
	el: HTMLDetailsElement,
	options: KeyframeAnimationOptions = { duration: 250, easing: 'ease-out' }
) {
	el.addEventListener('click', handleClick);
	const summary = el.querySelector('summary');
	const content = el.querySelector('.content') as HTMLDivElement;
	let animation: Animation;

	function handleClick(e: Event) {
		// only trigger on details/summary clicks (not form submit)
		if (e.target !== el && e.target !== summary) return;
		e.preventDefault();
		el.style.overflow = 'hidden';

		if (el.open) {
			shrink();
		} else {
			el.style.height = `${el.offsetHeight}px`;
			el.open = true;
			window.requestAnimationFrame(expand);
		}
	}

	function shrink() {
		if (!summary || !content) return;
		if (animation) animation.cancel();

		const startHeight = el.offsetHeight;
		const endHeight = summary.offsetHeight;
		animate(startHeight, endHeight, false);
	}

	function expand() {
		if (!summary || !content) return;
		if (animation) animation.cancel();

		const startHeight = el.offsetHeight;
		const endHeight = summary.offsetHeight + content.offsetHeight;
		animate(startHeight, endHeight, true);
	}

	function animate(start: number, end: number, open: boolean) {
		const keyframes = {
			height: [`${start}px`, `${end}px`]
		};
		animation = el.animate(keyframes, options);
		animation.onfinish = () => {
			el.open = open;
			el.style.height = el.style.overflow = '';
		};
	}

	return {
		destroy: () => {
			el.removeEventListener('click', handleClick);
		}
	};
}
