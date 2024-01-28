<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { parseAbsoluteToLocal, toCalendarDate } from '@internationalized/date';
	import { Calendar } from 'lucide-svelte';

	let { data } = $props();
</script>

<div class="space-y-4">
	<h1 class="text-3xl font-bold">Goals</h1>
	<div class="flex flex-col gap-4">
		{#each data.goals as goal}
			<Card.Root>
				<Card.Header>
					<Card.Title>{goal.skill}</Card.Title>
					<Card.Description class="flex items-center gap-1">
						<Calendar class="size-4" />
						<p>{toCalendarDate(parseAbsoluteToLocal(goal.end_date!.toISOString())).toString()}</p>
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<p>Card Content</p>
				</Card.Content>
				<Card.Footer>
					<p>Card Footer</p>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</div>
