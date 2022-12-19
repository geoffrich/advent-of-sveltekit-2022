<script lang="ts">
	// based on https://github.com/ivanhofer/typesafe-i18n#how-do-i-render-a-component-inside-a-translation
	import type { LocalizedString } from 'typesafe-i18n';
	export let message: LocalizedString;

	$: [prefix, infix, postfix] = message.split('<>') as LocalizedString[];

	// render infix only if the message doesn't have any split characters
	$: if (!infix && !postfix) {
		infix = prefix;
		prefix = '' as LocalizedString;
	}
</script>

{prefix}<slot {infix} />{postfix}
