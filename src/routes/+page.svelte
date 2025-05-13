<script lang="ts">
	export let data;
	let images = data.images;

	let prompt = '';
	let isLoading = false;

	async function onSubmit(event: Event) {
		event.preventDefault();

		isLoading = true;

		const response = await fetch('/api/generate', {
			method: 'POST',
			body: prompt
		});

		const data = await response.json();
		images = [data.image, ...images];
		isLoading = false;
		prompt = '';
	}
</script>

<main class="container mx-auto px-4 py-8 max-w-6xl">
	<h1 class="text-3xl font-bold text-center mb-8 text-indigo-700">AI Image Generator</h1>

	<form class="mb-12 max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md" on:submit={onSubmit}>
		<div class="flex flex-col md:flex-row gap-3">
			<input
				type="text"
				name="prompt"
				placeholder="Describe the image you want to generate..."
				class="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
				required
				bind:value={prompt}
			/>
			<button
				type="submit"
				class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-indigo-400"
				disabled={isLoading}
			>
				<span>{isLoading ? 'Generating...' : 'Generate'}</span>
			</button>
		</div>
	</form>

	<h2 class="text-2xl font-semibold mb-6 text-gray-800">Your Generated Images</h2>

	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
		{#each images as image}
			<div
				class="relative aspect-square overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white"
			>
				<img
					src={`data:image/png;base64,${image.base64}`}
					alt={image.prompt}
					class="w-full h-full object-cover"
				/>
				<div
					class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4"
				>
					<p class="text-white text-sm font-medium line-clamp-2">{image.prompt}</p>
				</div>
			</div>
		{/each}
	</div>

	{#if images.length === 0}
		<div class="text-center py-12 text-gray-500">
			<p>No images generated yet. Create your first one!</p>
		</div>
	{/if}
</main>
