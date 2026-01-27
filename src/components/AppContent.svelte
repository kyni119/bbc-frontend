<script lang="ts">
	import { appState } from '../lib/svelte/app.svelte.ts';

	let { children, id } = $props();
</script>

<div class="flex size-full items-center justify-center" class:hidden={!appState.loading}>
	<span class="loading loading-ring loading-xl size-32"></span>
</div>

<div {id} class="flex size-full flex-col" class:hidden={appState.loading}>
	{@render children()}
</div>
