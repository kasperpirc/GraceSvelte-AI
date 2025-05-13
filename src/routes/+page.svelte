<script lang="ts">
	let response = '';
	let input = '';
	let loading = false;

	let type: 'joke' | 'image' = 'joke';
	let history = [
		['human', 'Hello!'],
		['assistant', 'How are you?']
	];

	async function handleSubmit() {
		loading = true;

		history = [...history, ['human', input]];
		input = '';

		const result = await fetch('/api/chat', {
			method: 'POST',
			body: JSON.stringify({ history })
		});
		const data = await result.json();

		loading = false;
		history = [...history, ['assistant', data.message]];
	}
</script>

<main class="flex flex-col items-center justify-center h-screen">
	{#each history as [role, message]}
		<div
			class="w-full p-4 text-center"
			class:bg-blue-100={role === 'human'}
			class:bg-green-100={role === 'assistant'}
		>
			{message}
		</div>
	{/each}

	<form on:submit={handleSubmit} class="flex gap-2 max-w-md mx-auto mt-4">
		<input
			bind:value={input}
			class="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-96"
			placeholder="Type your message..."
		/>
		<button
			type="submit"
			class="w-24 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
			disabled={loading}
		>
			{loading ? '...' : 'Send'}
		</button>
	</form>
</main>
