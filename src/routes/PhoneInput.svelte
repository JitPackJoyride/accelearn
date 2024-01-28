<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import Countries from './Countries.svelte';
	import type { Country } from './countries';

	export let selectedCountry: Country;
	export let phoneNumber = '';
</script>

<div class="flex items-center">
	<Countries bind:selectedCountry />
	<Input type="tel" bind:value={phoneNumber} placeholder="Phone number" class="rounded-l-none" />
</div>
