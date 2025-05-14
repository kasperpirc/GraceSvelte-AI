<script lang="ts">
	export let data;
	let images = data.images;

	let prompt = '';
	let isLoading = false;

	async function onSubmit(event: Event) {
		event.preventDefault();

		isLoading = true;

		isLoading = false;
		prompt = '';
	}
</script>

<main class="container mx-auto px-4 py-8 max-w-6xl"></main>
