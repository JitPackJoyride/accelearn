<script>
    import { onMount } from 'svelte';
    import { countries } from './countries'; // Assuming countries are exported from a separate file

    let selectedCountry = countries[0]; // Default to the first country
    export let phoneNumber = '';
</script>

<div class="flex items-center border-b border-gray-300">
    <select bind:value={selectedCountry} class="p-2 bg-white border-r border-gray-300">
        {#each countries as country}
            <option value={country}>{country.flag} {country.dialCode}</option>
        {/each}
    </select>
    <input type="tel" bind:value={phoneNumber} placeholder="Phone number" class="p-2 flex-grow bg-white" />
</div>
