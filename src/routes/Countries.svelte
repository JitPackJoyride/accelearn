<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils';
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { tick } from 'svelte';
	import { countries, type Country } from './countries';

	export let selectedCountry: Country;

	let open = false;
	let value = '';
	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			role="combobox"
			aria-expanded={open}
			class="justify-between rounded-r-none border-r-0">
			{selectedCountry.flag}
			{selectedCountry.dialCode}
			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="p-0">
		<Command.Root>
			<Command.Input placeholder="Search..." />
			<Command.Empty>Country not supported.</Command.Empty>
			<Command.Group>
				{#each countries as country}
					<Command.Item
						value={country.code}
						onSelect={(currentValue) => {
							value = currentValue;
							closeAndFocusTrigger(ids.trigger);
						}}>
						<Check class={cn('mr-2 h-4 w-4', value !== country.code && 'text-transparent')} />
						{country.flag}
						{country.dialCode}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
