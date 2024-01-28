<script>
	import '../app.pcss';
</script>

<div class="mx-auto flex min-h-full max-w-screen-md px-5 pb-5 pt-2 antialiased">
	<div class="fixed inset-0 h-fit bg-background py-2 shadow">
		<div class="mx-auto max-w-screen-md px-5">
			<a href="/">
				<h2 class="text-2xl font-extrabold tracking-tight lg:text-3xl">Accelearn</h2>
			</a>
		</div>
	</div>
	<div class="mt-16 min-h-[calc(100dvh-4rem-28px)] flex-1 scroll-mt-16">
		<slot />
	</div>
</div>
<footer class="">
	<p>
		Lack of skills is one of the <a
			href="https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/622214/Time_for_Change_report_-_An_assessement_of_government_policies_on_social_mobility_1997-2017.pdf">
			primary drivers
		</a>
		of rising inequality in the UK.
	</p>
	<p>
		<a
			href="https://assets.publishing.service.gov.uk/media/5c4f25a3e5274a493c308f9e/Adult_skills_report_2019.pdf">
			50% of adults
		</a>
		 in the bottom socio-economic class in the UK had participated in no learning in the last three years,
		compared to 20% in the top group.
	</p>
	<p>It's time to change that.</p>
</footer>
