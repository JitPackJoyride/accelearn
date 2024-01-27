<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	
	export let data;
	console.log(data.skills);

	const formatDate = (date: string) => {
		const dateWithoutTime = date.split("T")[0];
		const d = new Date(dateWithoutTime);

		const day = d.getDate();
		const dayWithSuffix = Intl.DateTimeFormat("en-US", { day: "numeric" }).format(d);

		const month = d.getMonth() + 1;
		const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(d);
		const year = d.getFullYear();

		return `${dayWithSuffix} ${monthName} ${year}`
		return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
	}

</script>

<ul class="grid grid-cols-2 gap-4">
	{#each data.skills as skill}
		<!-- <li>
			<h2>{skill.name}</h2>
			<p>{skill.description}</p>
			<p>{skill.date}</p>
		</li> -->
		<Card.Root class="w-[350px]">
			<Card.Header>
				<Card.Title>{skill.name}</Card.Title>
				<Card.Description>{skill.description}</Card.Description>
			</Card.Header>
			<Card.Footer>
				Complete by {formatDate(skill.date)}
			</Card.Footer>
		</Card.Root>
	{/each}
</ul>
