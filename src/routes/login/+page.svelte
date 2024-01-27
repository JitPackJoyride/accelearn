<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import PhoneInput from './PhoneInput.svelte';

	let phoneNumber = '';

	function handleClickNext() {
		localStorage.setItem('phoneNumber', phoneNumber);
		window.location.href = '/login/phone-call';
	}
</script>

<div class="p-2 overflow-hidden">

	<div class="mb-3 shadow w-full fixed inset-0 h-fit p-4">
		<h2 class="text-3xl font-extrabold tracking-tight lg:text-5xl">
			Accelearn
		</h2>
	</div>

	<div class="overflow-scroll h-full w-full flex flex-col gap-10 justify-center items-center">
		<h1 class="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl mt-20">
			Hi, what is your phone number?
		</h1>

		<PhoneInput bind:phoneNumber />

		{#if phoneNumber}
        	<Button on:click={handleClickNext} class="text-xl">
				Next
			</Button>
		{/if}
	</div>

    
</div>