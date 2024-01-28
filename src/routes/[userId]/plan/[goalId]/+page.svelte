<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { parseAbsoluteToLocal, toCalendarDate } from '@internationalized/date';
	import { capitalCase } from 'case-anything';

	let { data } = $props();
</script>

<main class="flex flex-col gap-4">
	<div>
		<h2 class="text-2xl font-bold">{capitalCase(data.plan.skill ?? '')}</h2>
		<div class="flex items-center gap-1 text-sm text-muted-foreground">
			{@render calendar()}
			<p>
				{toCalendarDate(parseAbsoluteToLocal(data.plan.end_date?.toISOString() ?? '')).toString()}
			</p>
		</div>
	</div>
	<div class="flex flex-col">
		<p class="text-sm text-muted-foreground">Current Capability</p>
		<p class="text-pretty">{data.plan.current_capability}</p>
	</div>
	<div class="flex flex-col">
		<p class="text-sm text-muted-foreground">Target Capability</p>
		<p class="text-pretty">{data.plan.target_capability}</p>
	</div>
	<div class="flex flex-col gap-2">
		<h3 class="text-2xl font-semibold">Plan</h3>
		<div class="flex flex-col gap-4">
			{#each data.plan.skills as skill}
				<Card.Root>
					<Card.Header>
						<Card.Title>{capitalCase(skill.name)}</Card.Title>
						<div class="flex items-center gap-1 text-sm text-muted-foreground">
							{@render calendar()}
							<p>
								{toCalendarDate(
									parseAbsoluteToLocal(new Date(skill.date).toISOString())
								).toString()}
							</p>
						</div>
					</Card.Header>
					<Card.Content>
						<p class="text-pretty">{skill.description}</p>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</div>
</main>

{#snippet calendar()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide-icon lucide lucide-calendar size-4">
		<!--ssr:19--><!--ssr:21--><!--ssr:22-->
		<path d="M8 2v4"><!--ssr:23--><!--ssr:23--></path>
		<!--ssr:22--><!--ssr:21--><!--ssr:24--><!--ssr:25-->
		<path d="M16 2v4"><!--ssr:26--><!--ssr:26--></path>
		<!--ssr:25--><!--ssr:24--><!--ssr:27--><!--ssr:28-->
		<rect width="18" height="18" x="3" y="4" rx="2"><!--ssr:29--><!--ssr:29--></rect>
		<!--ssr:28--><!--ssr:27--><!--ssr:30--><!--ssr:31-->
		<path d="M3 10h18"><!--ssr:32--><!--ssr:32--></path>
		<!--ssr:31--><!--ssr:30--><!--ssr:19--><!--ssr:20--><!--ssr:33--><!--ssr:33--><!--ssr:20-->
	</svg>
{/snippet}
