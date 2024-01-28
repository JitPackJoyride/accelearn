<script>
	import '../app.pcss';
</script>

<div class="mx-auto h-full max-w-screen-md px-5 py-2 antialiased">
	<div class="fixed inset-0 h-fit p-2 shadow">
		<div class="mx-auto max-w-screen-md px-5">
			<h2 class="text-3xl font-extrabold tracking-tight lg:text-5xl">AcceLearn</h2>
		</div>
	</div>
	<div class="mt-20 h-[calc(100%-5rem)] scroll-mt-20">
		<slot />
	</div>
</div>
