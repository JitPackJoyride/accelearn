<script>
	async function startCall() {
		const response = await fetch('/api/check-in', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();
		if (data.error) {
			alert(data.error);
		} else {
			alert('Call started');
		}
	}
</script>

<button on:click={startCall}>Start call</button>
