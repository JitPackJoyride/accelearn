<script>
	import '../app.pcss';
</script>

<div class="mx-auto min-h-full max-w-screen-md px-5 pb-5 pt-2 antialiased">
	<div class="fixed inset-0 h-fit bg-background py-2 shadow">
		<div class="mx-auto max-w-screen-md px-5">
			<a href="/">
				<h2 class="text-3xl font-extrabold tracking-tight lg:text-5xl">Accelearn</h2>
			</a>
		</div>
	</div>
	<div class="mt-14 h-[calc(100%-5rem)] scroll-mt-14">
		<slot />
	</div>
</div>
