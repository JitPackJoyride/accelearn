<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { isEmptyString } from 'is-what';
	import PhoneInput from './PhoneInput.svelte';

	let phoneNumber = '';

	function handleClickNext() {
		localStorage.setItem('phoneNumber', phoneNumber);
		window.location.href = '/login/phone-call';
	}
</script>

<div class="h-full p-2">
	<div class="fixed inset-0 mb-3 h-fit w-full p-4 shadow">
		<h2 class="text-3xl font-extrabold tracking-tight lg:text-5xl">Accelearn</h2>
	</div>

	<div class="flex h-full w-full flex-col items-center justify-center gap-10">
		<h1 class="mt-20 scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl">
			Hi, what is your phone number?
		</h1>

		<PhoneInput bind:phoneNumber />

		<Button on:click={handleClickNext} disabled={isEmptyString(phoneNumber)} class="text-xl">
			Next
		</Button>
	</div>
</div>
