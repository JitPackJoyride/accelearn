<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { isEmptyString } from 'is-what';
	import PhoneInput from './PhoneInput.svelte';
	import { countries } from './countries';

	let selectedCountry = countries[0];
	let phoneNumber = '';

	function handleClickNext() {
		localStorage.setItem('phoneNumber', phoneNumber);
		goto(`/${encodeURIComponent(selectedCountry.dialCode)}${phoneNumber}`, {});
	}
</script>

<div class="flex h-full flex-col items-center justify-center gap-5">
	<h1
		class="max-w-[20ch] text-balance text-center text-5xl font-extrabold tracking-tight lg:text-5xl">
		Hi, what is your phone number?
	</h1>
	<PhoneInput bind:selectedCountry bind:phoneNumber />
	<Button on:click={handleClickNext} disabled={isEmptyString(phoneNumber)} class="text-xl">
		Next
	</Button>
</div>
