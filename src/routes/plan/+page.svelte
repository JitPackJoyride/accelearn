<script lang="ts">
	export let data;
	console.log(data.skills);
</script>

<ul class="flex flex-col">
	{#each data.skills as skill}
		<li>
			<h2>{skill.name}</h2>
			<p>{skill.description}</p>
			<p>{skill.date}</p>
		</li>
	{/each}
</ul>
