<script lang="ts">
	export let data;

	let chats = data.chats;
	let sidebarOpen = true;

	let currentChat = chats[0];
</script>

<main class="flex h-screen">
	<!-- Sidebar -->
	<div class="w-64 bg-gray-200 flex flex-col {sidebarOpen ? '' : 'hidden'}">
		{#each chats as c}
			<div>{c.title}</div>
		{/each}
	</div>

	<!-- Messages -->
	<div class="flex-1 lex flex-col">
		<div class="flex justify-start bg-gray-200 border-b">
			<button on:click={() => (sidebarOpen = !sidebarOpen)} class="p-2">x</button>
		</div>
		<div class="flex-1 overflow-y-auto space-y-4">
			{#each currentChat.messages as m}
				<div class="p-4 flex {m.userType == 'human' ? 'justify-end' : 'justify-start'}">
					<div
						class="px-4 py-2 max-w-[80%] rounded-md {m.userType == 'human'
							? 'bg-blue-500'
							: 'bg-gray-200'}"
					>
						{m.content}
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>
