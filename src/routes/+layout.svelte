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
