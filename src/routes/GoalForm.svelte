<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Form from '$lib/components/ui/form';
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils';
	import {
		CalendarDate,
		DateFormatter,
		getLocalTimeZone,
		parseDate,
		today,
		type DateValue
	} from '@internationalized/date';
	import { Calendar as CalendarIcon } from 'lucide-svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import { goalSchema, type GoalSchema } from './goalSchema';

	export let form: SuperValidated<GoalSchema>;

	const theForm = superForm(form, {
		validators: goalSchema,
		taintedMessage: null
	});

	const { form: formStore } = theForm;
	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});
	let value: DateValue | undefined = $formStore.endDate ? parseDate($formStore.endDate) : undefined;
	let placeholder: DateValue = today(getLocalTimeZone());
</script>

<Form.Root
	method="POST"
	action="?/default"
	controlled
	form={theForm}
	class="space-y-6"
	schema={goalSchema}
	let:config
>
	<Form.Field {config} name="skill">
		<Form.Item>
			<Form.Label>Concept</Form.Label>
			<Form.Input />
			<Form.Description>Describe the concept you want to learn.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="endDate">
		<Form.Item class="flex flex-col">
			<Form.Label>End Date</Form.Label>
			<Popover.Root>
				<Form.Control id="endDate" let:attrs>
					<Popover.Trigger
						id="endDate"
						{...attrs}
						class={cn(
							buttonVariants({ variant: 'outline' }),
							'w-full justify-start pl-4 text-left font-normal',
							!value && 'text-muted-foreground'
						)}
					>
						{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
						<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
					</Popover.Trigger>
				</Form.Control>
				<Popover.Content align="start" class="w-auto p-0" side="bottom">
					<Calendar
						bind:value
						bind:placeholder
						minValue={new CalendarDate(1900, 1, 1)}
						maxValue={today(getLocalTimeZone())}
						calendarLabel="Date of birth"
						initialFocus
						onValueChange={(v) => {
							if (v) {
								$formStore.endDate = v.toString();
							} else {
								$formStore.endDate = '';
							}
						}}
					/>
				</Popover.Content>
			</Popover.Root>
			<Form.Description>When do you want to achieve this goal by?</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Button class="w-full">Submit</Form.Button>
</Form.Root>
