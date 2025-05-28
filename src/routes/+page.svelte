<script lang="ts">
	import type { Message } from '@prisma/client';

	export let data;

	let messages = [];
	let newMessage = '';
	let isLoading = false;
	let currentChatId: number | null = null;
	let isSidebarOpen = true;
	let chats = data.chats;

	function openNewChat() {
		currentChatId = null;
		messages = [];
	}

	function switchChat(chatId: number) {
		const chat = chats.find((c) => c.id === chatId);
		if (chat) {
			currentChatId = chat.id;
			messages = chat.messages;
		}
	}

	async function handleSubmit() {
		if (!newMessage.trim()) return;

		isLoading = true;
		const userMessage = newMessage;
		messages = [...messages, { content: userMessage, role: 'user', createdAt: new Date() }];
		newMessage = '';

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					message: userMessage,
					chatId: currentChatId
				})
			});

			const data = await response.json();
			messages = [
				...messages,
				{
					content: data.response,
					role: 'assistant',
					createdAt: new Date()
				}
			];

			if (data.chatId !== currentChatId) {
				chats = [
					{ id: data.chatId, title: 'New Chat', createdAt: new Date(), messages: messages },
					...chats
				];
				currentChatId = data.chatId;
			} else {
				// Update the chat in the list
				chats = chats.map((chat) => {
					if (chat.id === currentChatId) {
						return {
							...chat,
							messages: messages
						};
					}
					return chat;
				});
			}
		} catch (error) {
			console.error('Error:', error);
		} finally {
			isLoading = false;
		}
	}

	function formatDate(date: Date) {
		return new Date(date).toLocaleTimeString();
	}

	function formatChatDate(date: Date) {
		return new Date(date).toLocaleDateString();
	}
</script>

<div class="flex h-screen">
	<!-- Sidebar -->
	<div
		class="w-64 bg-gray-100 border-r border-gray-200 flex flex-col {isSidebarOpen ? '' : 'hidden'}"
	>
		<div class="p-4 border-b border-gray-200">
			<div class="flex items-center justify-between mb-4">
				<h2 class="text-lg font-semibold">Chats</h2>
				<button
					on:click={openNewChat}
					class="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
					title="New Chat"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</div>
		<div class="flex-1 overflow-y-auto">
			{#each chats as chat}
				<button
					class="w-full p-4 text-left hover:bg-gray-200 {currentChatId === chat.id
						? 'bg-gray-200'
						: ''}"
					on:click={() => switchChat(chat.id)}
				>
					<div class="font-medium truncate">{chat.title}</div>
					<div class="text-sm text-gray-500">{formatChatDate(chat.createdAt)}</div>
				</button>
			{/each}
		</div>
	</div>

	<!-- Main Chat Area -->
	<main class="flex-1 flex flex-col">
		<!-- Header -->
		<div class="p-4 border-b border-gray-200 flex items-center justify-between">
			<button
				class="p-2 hover:bg-gray-100 rounded-lg"
				on:click={() => (isSidebarOpen = !isSidebarOpen)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>
			<h1 class="text-xl font-semibold">Chat</h1>
		</div>

		<!-- Messages -->
		<div class="flex-1 overflow-y-auto p-4 space-y-4">
			{#each messages as message}
				<div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
					<div
						class="max-w-[80%] rounded-lg p-4 {message.role === 'user'
							? 'bg-blue-500 text-white'
							: 'bg-gray-200 text-gray-800'}"
					>
						<div class="text-sm opacity-75 mb-1">
							{formatDate(message.createdAt)}
						</div>
						{message.content}
					</div>
				</div>
			{/each}
			{#if isLoading}
				<div class="flex justify-start">
					<div class="bg-gray-200 text-gray-800 rounded-lg p-4">Thinking...</div>
				</div>
			{/if}
		</div>

		<!-- Input Form -->
		<form on:submit|preventDefault={handleSubmit} class="p-4 border-t border-gray-200 flex gap-2">
			<input
				type="text"
				bind:value={newMessage}
				placeholder="Type your message..."
				class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<button
				type="submit"
				disabled={isLoading}
				class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
			>
				Send
			</button>
		</form>
	</main>
</div>

<style>
	:global(body) {
		@apply bg-gray-50;
	}
</style>
