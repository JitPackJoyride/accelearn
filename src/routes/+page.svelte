<script lang="ts">
	import GoalForm from './GoalForm.svelte';
	export let data;
</script>

<GoalForm form={data.form} />
