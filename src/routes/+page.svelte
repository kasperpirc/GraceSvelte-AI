<script lang="ts">
	let response = '';
	let input = '';
	let loading = false;

	let type: 'joke' | 'image' = 'joke';

	async function handleSubmit() {
		loading = true;
		const result = await fetch('/api/' + type, {
			method: 'POST',
			body: input
		});
		const data = await result.json();

		loading = false;
		input = '';
		response = data.message;
	}
</script>

<main class="flex flex-col items-center justify-center h-screen">
	<div class="w-full p-4 text-center">
		{response}
	</div>

	<form on:submit={handleSubmit} class="flex gap-2 max-w-md mx-auto mt-4">
		<select bind:value={type}>
			<option value="joke">Joke</option>
			<option value="image">Image</option>
		</select>
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
