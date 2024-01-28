<script>
	import { Input } from '$lib/components/ui/input';
	import Countries from './Countries.svelte';
	import { countries } from './countries';
	// Assuming countries are exported from a separate file

	let selectedCountry = countries[0]; // Default to the first country
	export let phoneNumber = '';
</script>

<div class="flex items-center">
	<Countries bind:selectedCountry />
	<Input type="tel" bind:value={phoneNumber} placeholder="Phone number" class="rounded-l-none" />
</div>
